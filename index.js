const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()

const account = require('./controllers/account')
const balance = require('./controllers/balance')

app.use(account)
app.use(balance)




const PORT = process.env.port || 5670
app.listen(PORT, ()=>console.log('plumbing at ',PORT))



