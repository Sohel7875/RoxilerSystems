const express = require('express')
const cors = require('cors')
require('dotenv').config()
const dbConnection =require('./dbConnection/dbConnection')
const productTransactionRouter = require('./router/productTransactoin.router')

const app = express()

app.use(cors({
    origin:process.env.CLIENT_URL,
    methods:['GET']
}))
app.use(express.json())
dbConnection()

app.use('/api/v8', productTransactionRouter)

const PORT = process.env.PORT || 3000

app.listen(PORT,() =>{
    console.log('server is running',PORT)
})