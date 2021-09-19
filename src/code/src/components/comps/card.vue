<template>
  <div id="card-wrap">
    <el-col :span="22">
      <div class="card">
        <el-col :span="15">
          <div class="main">
            <div class="top">
              <img class="weather-icon" :src="iconPath" :alt="status">
              <div class="cur-info">
                <p class="info city">{{city}}</p>
                <p class="info temprature">{{temprature}}</p>
                <p class="info date">{{date}}</p>
              </div>
            </div>
            <div class="bottom">
              <el-col
                :span="4"
                v-for="item in nextHours"
                :key="item.time"
                class="nextHoursItem"
              >
                <p class="next-item">{{item.time}}</p>
                <p class="next-item">{{item.temp+'&#8451;'}}</p>
                <img class="next-icon" :src="item.icon" :alt="item.status">
              </el-col>
            </div>
          </div>
        </el-col>
        <el-col :span="9">
          <div class="forecast">
            <div
              v-for="item in futureList"
              :key="item.date"
              class="forecast-item"
            >
              <el-col :span="8"><p class="fore-i">{{item.date}}</p></el-col>
              <el-col :span="8"><p class="fore-i">{{item.tempMin+'~'+item.tempMax}}</p></el-col>
              <el-col :span="8"><img class="fore-icon" :src="item.iconPath" :alt="item.status"></el-col>
            </div>
          </div>
        </el-col>
      </div>
    </el-col>
    <el-col :span="2"><div class="btn-list"><i class="delete-btn el-icon-delete" @click="destroy"></i></div></el-col>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      city: null,
      temprature: '查询中',
      iconPath: '/static/img/bw-128/999.png',
      localId: null,
      date: null,
      status: '',
      nextHours: null,
      futureList: null,
      key: '71484ed1867447ca92a5a5649989f3f5'
    }
  },
  props: [
    'cityInfo'
  ],
  methods: {
    // initialize current info
    initCur () {
      this.city = `${this.cityInfo.province} ${this.cityInfo.city} ${this.cityInfo.area}`
      const now = new Date()
      this.date = `${now.getMonth() + 1}-${now.getDate()}`
      this.queryCur(this.localId)
    },
    // query location id
    async queryLocationId (province, city, area) {
      const params = {
        location: area === '市辖区' ? city : area,
        adm: city === '市辖区' ? province : city
      }
      const url = `https://geoapi.qweather.com/v2/city/lookup?location=${params.location}&adm=${params.adm}&key=${this.key}`
      const res = await axios.get(url)
      if (res.data.code === '404') {
        const exception = {
          code: 404,
          description: '抱歉没有该地区的天气信息'
        }
        throw exception
      }
      this.localId = res.data.location[0].id
    },
    // qurry current weather
    async queryCur (localId) {
      const url = `https://devapi.qweather.com/v7/weather/now?key=${this.key}&location=${localId}`
      const res = await axios.get(url)
      this.status = res.data.now.text
      this.temprature = res.data.now.temp
      this.iconPath = `/static/img/bw-128/${res.data.now.icon}.png`
    },
    // initialize nextHours array containing weather info in next hours
    async initNextHours (localId) {
      const arr = []
      const url = `https://devapi.qweather.com/v7/weather/24h?key=${this.key}&location=${localId}`
      const res = await axios.get(url)
      const rawData = res.data.hourly
      for (let i = 0; i < 6; i++) {
        arr.push({
          time: this.formatTime(rawData[i].fxTime),
          icon: `/static/img/bw-128/${rawData[i].icon}.png`,
          temp: rawData[i].temp,
          status: rawData[i].text
        })
      }
      this.nextHours = arr
    },
    // initialize forecast list
    async initFutureList (localId) {
      const arr = []
      const url = `https://devapi.qweather.com/v7/weather/7d?key=${this.key}&location=${localId}`
      const res = await axios.get(url)
      const rawData = res.data.daily

      for (let i = 1; i < 7; i++) {
        arr.push({
          date: this.formatDate(rawData[i].fxDate),
          tempMax: rawData[i].tempMax,
          tempMin: rawData[i].tempMin,
          iconPath: `/static/img/bw-128/${rawData[i].iconDay}.png`,
          status: rawData[i].textDay
        })
      }

      this.futureList = arr
    },
    formatTime (time) {
      const splitByT = time.split('T')
      const splitByAdd = splitByT[1].split('+')
      return splitByAdd[0]
    },
    formatDate (date) {
      const splitByDash = date.split('-')
      return `${splitByDash[1]}-${splitByDash[2]}`
    },
    destroy () {
      this.$emit('destroy-card', this.cityInfo.province + this.cityInfo.city + this.cityInfo.area)
    },
    // initialize card
    async init () {
      await this.queryLocationId(this.cityInfo.province, this.cityInfo.city, this.cityInfo.area)
      this.initCur()
      this.initNextHours(this.localId)
      this.initFutureList(this.localId)
    }
  },
  created () {
    this.init().catch(e => {
      if (e.hasOwnProperty('code')) {
        console.log('catched the 404 error')
        this.$emit('throw-error', e, this.cityInfo.province + this.cityInfo.city + this.cityInfo.area)
      }
    })
  }
}
</script>

<style scoped>
p{
  color: #606266;
  margin: 0.6em auto 0 auto;
}
#card-wrap{
  width: 48em;
  height: 16em;
  margin-bottom: 4em;
}
.card{
  height: 16em;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
.btn-list{
  height: 16em;
}
.main{
  height: 16em;
  /* background: #e5e9f2; */
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.top{
  width: 90%;
  height: 60%;
  border-bottom: solid 2px #F2F6FC;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
}
.cur-info{
  display: flex;
  flex-direction: column;
}
.info{
  color: #303133;
  user-select: none;
}
.bottom{
  width: 100%;
  height: 40%;
  /* background: #E6A23C; */
}
.nextHoursItem{
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
}
.next-item{
  margin-top: 0;
  user-select: none;
}
.next-icon{
  width: 1.5em;
  height: 1.5em;
}
.forecast{
  height: 16em;
  /* background: #99a9bf; */
  border-radius: 4px;
  border-left: solid 2px #F2F6FC;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
}
.forecast-item{
  color: #606266;
  display: flex;
  align-items: center;
}
.fore-i{
  margin-top: 0;
  user-select: none;
}
.fore-icon{
  width: 1.5em;
  height: 1.5em;
}
.city{
  margin-top: 0;
  font-size: 1em;
}
.temprature{
  margin-top: 0;
  font-size: 3em;
}
.date{
  margin-top: 0;
  font-size: 1.2em;
}
.delete-btn{
  color: #F56C6C;
  font-size: 2em;
  cursor: pointer;
}
.weather-icon{
  height: 4em;
  width: 4em;
}
</style>
