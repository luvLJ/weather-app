<template>
  <div id="init-wrap">
    <el-col :span="22">
      <div class="board">
        <p class="board-title" style="color:#909399">选择城市</p>
        <el-cascader
          class="selector"
          :options="options"
          v-model="selectedOptions">
        </el-cascader>
        <div v-if="selectedOptions.length" class="verify">
          <p class="msg">
            <span style="user-select:none">查询</span>
            <span
              style="user-select:none"
              v-for="id in selectedOptions"
              :key="id"><b>{{code2text[id]+" "}}</b></span>
            <span style="user-select:none">天气消息</span>
          </p>
          <el-button type="success" icon="el-icon-check" @click="addCard" circle></el-button>
        </div>

      </div>
    </el-col>
    <el-col :span="2"><div class="btn-list"><i class="btn-close el-icon-close" @click="closeInit"></i></div></el-col>
  </div>
</template>

<script>
import { regionData, CodeToText } from 'element-china-area-data'

export default {
  data () {
    return {
      options: regionData,
      selectedOptions: [],
      code2text: CodeToText
    }
  },
  methods: {
    closeInit () {
      this.$emit('close-init')
    },
    addCard () {
      this.$emit('add-card', {
        province: this.code2text[this.selectedOptions[0]],
        city: this.code2text[this.selectedOptions[1]],
        area: this.code2text[this.selectedOptions[2]]
      })
    }
  }
}
</script>

<style scoped>
#init-wrap{
  width: 48em;
  height: 16em;
  margin-bottom: 4em;
}
.board{
  height: 16em;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.selector{
  width: 50%;
}
.btn-list{
  height: 16em;
}
.btn-close{
  color: #F56C6C;
  font-size: 2em;
  cursor: pointer;
}
.msg{
  color: #303133;
  margin: 2em 0 2em 0;
}
</style>
