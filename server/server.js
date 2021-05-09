const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose') 
require("dotenv").config()

const app = express()
app.use(cors())
const port = 3001

app.get('/', (req, res) => {
  res.send('Hello World!')
  console.log(req)
})
console.log("Server Started")
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

//set up mongoose
console.log("Connecting to MongoDb")
console.log(process.env.MONGODB_URI)
mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true, useUnifiedTopology: true}, err => {
  if (err) return console.error(err);
  console.log("MongoDb connection established")
})