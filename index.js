const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()

const account = require('./controllers/account')
const balance = require('./controllers/balance')
const statement = require('./controllers/statement')
const collect = require('./controllers/collect')

app.use(account)
app.use(balance)
app.use(statement)
app.use(collect)



const PORT = process.env.port || 5670
app.listen(PORT, ()=>console.log('plumbing at ',PORT))



