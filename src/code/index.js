const { Server } = require('@webserverless/fc-express')
const express = require('express')
const fs = require('fs')
const path = require('path')

const app = express()

const staticBasePath = './dist'

app.get('/', (req, resp) => {
  resp.sendFile(__dirname + '/dist/index.html')
})

app.all('/*.js', (req, resp) => {
  const filePath = path.join(staticBasePath, req.path)
  resp.setHeader('Content-Type', 'text/javascript')
  resp.send(fs.readFileSync(filePath, 'utf8'))
})

app.all('/*.css', (req, resp) => {
  const filePath = path.join(staticBasePath, req.path)
  resp.setHeader('Content-Type', 'text/css')
  resp.send(fs.readFileSync(filePath, 'utf8'))
})

app.all('/*.png', (req, resp) => {
  const filePath = path.join(staticBasePath, req.path)
  resp.setHeader('Content-Type', 'image/png')
  resp.send(fs.readFileSync(filePath))
})

app.all('/*.woff', (req, resp) => {
  const filePath = path.join(staticBasePath, req.path)
  resp.setHeader('Content-Type', 'application/x-font-woff')
  resp.send(fs.readFileSync(filePath))
})

app.all('/*.ttf', (req, resp) => {
  const filePath = path.join(staticBasePath, req.path)
  resp.setHeader('Content-Type', 'font/ttf')
  resp.send(fs.readFileSync(filePath))
})

// app.listen(3000, () => console.log('serving on http://localhost:3000/'))
const server = new Server(app)

module.exports.handler = function (req, res, context) {
  server.httpProxy(req, res, context)
}