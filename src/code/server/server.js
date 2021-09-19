const express = require('express')
const {User} = require('./models.js')

const app = express()

app.use(express.json())

//测试用：拉取所有用户
app.get('/api/users', async (req, res) => {
  const users = await User.find()
  res.send(users)
})

//注册
app.post('/api/register', async (req, res) => {
  const user = await User.create({
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email
  }).catch(err => {
    res.send('repeat username')
  })
  res.send(user)
})

app.listen(3000, () => console.log('http://localhost:3000'))