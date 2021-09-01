const axios = require('axios')

const url = 'http://express.weather-fc-http-service.1829387232348461.cn-hangzhou.fc.devsapp.net'
const now = new Date()

axios.get(
  url,
  {
    headers: {
      "x-fc-date": now.toUTCString()
    }
  }
).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})