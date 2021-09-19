<template>
  <div id="index-wrap">
    <card
      v-for="item in cityList"
      :key="item.province+item.city+item.area"
      :cityInfo="item"
      @destroy-card="deleteCard"
      @throw-error="throwError"></card>
    <create v-if="isCreate" @open-init="isCreate = false"></create>
    <init v-else @close-init="isCreate = true" @add-card="addCard"></init>
    <el-dialog :visible.sync="visible" title="重复添加"><p>您已经添加过该地区</p></el-dialog>
    <el-dialog
      v-for="e in errors"
      :key="e.code"
      title="错误"
      @close="clearErrors"
      :visible="true"
    ><p>{{e.description}}</p></el-dialog>
  </div>
</template>

<script>
import card from '../comps/card.vue'
import init from '../comps/init.vue'
import create from '../comps/create.vue'

export default {
  name: 'Index',
  components: {
    card,
    create,
    init
  },
  data () {
    return {
      isCreate: true,
      visible: false,
      cityList: [{
        province: '北京市',
        city: '市辖区',
        area: '朝阳区'
      }],
      errors: [],
      errorInCards: []
    }
  },
  methods: {
    // delete card component, identified by city key (province+city+area)
    deleteCard (cityKey) {
      for (const i in this.cityList) {
        const curObj = this.cityList[i]
        let key = ''
        for (const p in curObj) key += curObj[p]
        if (cityKey === key) {
          this.cityList.splice(i, 1)
          break
        }
      }
    },
    // add card instance
    addCard (cityInfo) {
      if (this.isLegal(cityInfo, this.cityList)) {
        this.cityList.push(cityInfo)
        this.isCreate = true
      } else {
        this.visible = true
      }
    },
    // judge if two objects are with same property and value
    isEqual (obj1, obj2) {
      const keys1 = Object.keys(obj1)
      const keys2 = Object.keys(obj2)
      if (keys1.length !== keys2.length) return false
      for (let i = 0; i < keys1.length; i++) {
        const val1 = obj1[keys1[i]]
        const val2 = obj2[keys2[i]]
        if (val1 !== val2) return false
      }
      return true
    },
    // judge if obj is legal to be added in array (elements in array should be unique)
    isLegal (obj, arr) {
      for (const item of arr) {
        if (this.isEqual(obj, item)) return false
      }
      return true
    },
    // throw-error event,
    // add error in error list,
    // add cityKey with error in citykey list
    throwError (error, cityKey) {
      this.errorInCards.push(cityKey)
      this.errors.push(error)
    },
    // close dialog event,
    // delete the card with problem
    // clear all error informations
    clearErrors () {
      console.log('trigger callback')
      for (const cityKey of this.errorInCards) this.deleteCard(cityKey)
      this.errorInCards = []
      this.errors = []
    }
  }
}
</script>

<style scoped>
#index-wrap {
  text-align: center;
  margin-top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
