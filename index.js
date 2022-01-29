const express = require('express')
const app = express()
const router = express.Router()
require('dotenv').config()

const account = require('./controllers/account')


app.use(account)





const PORT = process.env.port || 5670
app.listen(PORT, ()=>console.log('plumbing at ',PORT))



