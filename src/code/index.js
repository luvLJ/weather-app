const { Server } = require('@webserverless/fc-express')
const express = require('express')
const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

const app = express()
const staticBasePath = './dist/static/'

app.all('/', (req, resp) => {
  resp.setHeader('Content-Type', 'text/html')
  try {
    console.log('\n***test fc internal endpoint***')
    const res = execSync('curl --connect-timeout 3 https://1.cn-hangzhou-internal.fc.aliyuncs.com')
    console.log()
    console.log(res.toString('utf8'))
  } catch (e) {
    console.log('error when exec curl command.')
  }
  resp.send(fs.readFileSync('./dist/index.html', 'utf8'))
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
  resp.send(fs.readFileSync(filePath, 'utf8'))
})

const server = new Server(app)

module.exports.handler = function (req, res, context) {
  server.httpProxy(req, res, context)
}