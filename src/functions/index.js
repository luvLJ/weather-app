const serverless = require('@serverless-devs/fc-http')
const express = require('express')
const app = express()

app.get('/location', (req, res) => {
  res.send('location')
})

app.get('/', (req, res) => {
  res.send('index')
})

exports.handler = serverless(app)