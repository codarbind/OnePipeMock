const express = require('express')
const router = express.Router()
const axios = require('axios');
const md5 = require('md5')
const API_KEY = process.env.ONEPIPE_APIKEY
const API_SECRET = process.env.ONEPIPE_SECRET
const crypto = require('crypto')


router.use(express.urlencoded({ extended: true }))

router.post('/collect',(req,res)=>{

  let firstname, surname

  firstname = 'Jiuyt'
  surname = 'Posip'

//data validation
let { type, pan, cvv, expDate, pin, account_number, email, mobile_no} = req.body

if(!(type && pan && cvv && expDate && pin && account_number && email && mobile_no)) return res.send({message:'supply all compulsory inputs'})

let request_ref = JSON.stringify(Math.random()* 1000000000000000000).slice(0,12)
let transaction_ref = JSON.stringify(Math.random()* 2000000000000000000).slice(0,12)
let plainText = `${pan};${cvv};${expDate};${pin}`

function encrypt(secretKey, plainText) {
    const bufferedKey = Buffer.from(secretKey, 'utf16le');

    const key = crypto.createHash('md5').update(bufferedKey).digest();
    const newKey = Buffer.concat([key, key.slice(0, 8)]);
    const IV = Buffer.alloc(8, '\0');

    const cipher = crypto.createCipheriv('des-ede3-cbc', newKey, IV).setAutoPadding(true);
    return cipher.update(plainText, 'utf8', 'base64') + cipher.final('base64');
}

let authSecure = encrypt(API_SECRET,plainText)


 data = JSON.stringify({
  "request_ref": request_ref,
  "request_type": "transfer_funds",
  "auth": {
    "type": type,
    "secure": authSecure,
    "auth_provider": "DemoProvider",
    "route_mode": null
  },
  "transaction": {
    "mock_mode": "inspect",
    "transaction_ref": transaction_ref,
    "transaction_desc": "making payments",
    "transaction_ref_parent": null,
    "amount": 0,
    "customer": {
      "customer_ref": account_number,//"DemoApp_Customer007",
      "firstname": firstname,
      "surname": surname,
      "email": email,
      "mobile_no": mobile_no
    },
    "meta": null,
    "details": null
  }
});

var config = {
  method: 'post',
  url: 'https://api.onepipe.io/v2/transact',
  headers: { 
    'Authorization': `Bearer ${API_KEY}`, 
    'Signature': md5(`${request_ref};${API_SECRET}`), 
    'Content-Type': 'application/json'
  },
  data : data
};

axios(config)
.then(function (response) {
  //console.log(JSON.stringify({successResponse:response.data}))
  res.status(200).json({message:'success',successResponse:response.data})
})
.catch(function (error) {
  console.log({error})
  res.status(400).json({message:'there was an error'})
});

	console.log('payment from wallet pipe')
	
})

module.exports = router