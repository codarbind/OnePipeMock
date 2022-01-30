const express = require('express')
const router = express.Router()
const axios = require('axios');
const md5 = require('md5')
const API_KEY = process.env.ONEPIPE_APIKEY
const API_SECRET = process.env.ONEPIPE_SECRET


router.use(express.urlencoded({ extended: true }))

router.post('/balance',(req,res)=>{

//data validation
let {auth_provider, customer_ref, amount, firstname, surname, middlename, email, mobile_no} = req.body

if(!(auth_provider && customer_ref && amount && firstname && surname && email && mobile_no)) return res.send({message:'supply all compulsory inputs'})

let request_ref = JSON.stringify(Math.random()* 1000000000000000000).slice(0,12)
let transaction_ref = JSON.stringify(Math.random()* 2000000000000000000).slice(0,12)


 data = JSON.stringify({
  "request_ref": request_ref,
  "request_type": "get_balance",
  "auth": {
    "type": null,
    "secure": null,
    "auth_provider": auth_provider,
    "route_mode": null
  },
  "transaction": {
    "mock_mode": "inspect",
    "transaction_ref": transaction_ref,
    "transaction_desc": "mocking getting of account balance",
    "transaction_ref_parent": null,
    "amount": 0,
    "customer": {
      "customer_ref": customer_ref,//"DemoApp_Customer007",
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
  console.log(JSON.stringify({successResponse:response.data}))
  res.status(200).json({message:'success',successResponse:response.data})
})
.catch(function (error) {
  console.log({error})
  res.status(400).json({message:'there was an error'})
});

	console.log('account balance route')
	
})

module.exports = router