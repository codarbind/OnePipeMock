const express = require('express')
const router = express.Router()
const axios = require('axios');
const md5 = require('md5')
const API_KEY = process.env.ONEPIPE_APIKEY
const API_SECRET = process.env.ONEPIPE_SECRET


router.use(express.urlencoded({ extended: true }))

router.post('/account',(req,res)=>{

//data validation
let { auth_provider, amount, firstname, surname, middlename, email, mobile_no, name_on_account, dob, gender, title, address_line_1, address_line_2, city, state, country} = req.body

if(!( auth_provider && amount && firstname && surname && email && mobile_no && name_on_account && dob && gender && title && address_line_1 && city && state && country)) return res.send({message:'supply all compulsory inputs'})

let request_ref = JSON.stringify(Math.random()* 1000000000000000000).slice(0,12)
let transaction_ref = JSON.stringify(Math.random()* 2000000000000000000).slice(0,12)
let customer_ref = JSON.stringify(Math.random()* 3000000000000000000).slice(0,12)

 data = JSON.stringify({
  "request_ref": request_ref,
  "request_type": "open_account",
  "auth": {
    "type": null,
    "secure": null,
    "auth_provider": auth_provider,
    "route_mode": null
  },
  "transaction": {
    "mock_mode": "inspect",
    "transaction_ref": transaction_ref,
    "transaction_desc": "mocking opening account transaction",
    "transaction_ref_parent": null,
    "amount": 0,
    "customer": {
      "customer_ref": customer_ref,//"DemoApp_Customer007",
      "firstname": firstname,
      "surname": surname,
      "email": email,
      "mobile_no": mobile_no
    },
    "meta": {
      "a_key": "a_meta_value_1",
      "another_key": "a_meta_value_2"
    },
    "details": {
      "name_on_account": name_on_account,
      "middlename": middlename,
      "otp_override": true,
      "dob": dob,
      "gender": gender,
      "title": title,
      "address_line_1": address_line_1,
      "address_line_2": address_line_2,
      "city": city,
      "state": state,
      "country": country
    }
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
  console.log(JSON.stringify({successResponse:response.data}))
  res.status(200).json({message:'success',successResponse:response.data})
})
.catch(function (error) {
  console.log({error})
  res.status(400).json({message:'there was an error'})
});

	console.log('open account route')
	
})

module.exports = router