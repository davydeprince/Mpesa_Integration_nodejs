const express = require('express')
const env = require('dotenv').config()
const path = require('path')
const router = require('./router/route')
const bodyParser = require('body-parser')
const app = express();



app.use(express.static(path.join(__dirname, 'public')))

app.set('view engine', 'ejs')
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : true }))

app.set('views', path.join(__dirname, 'user'))


app.use('/', router);

const port = process.env.PORT;

app.listen(port,() =>{
   console.log(`app listens to port ${port}`)
})

