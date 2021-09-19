<template>
  <div id="create-wrap" @click="startInit">
    <i class="add-btn el-icon-circle-plus-outline"></i>
  </div>
</template>

<script>
export default {
  methods: {
    startInit () {
      this.$emit('open-init')
    }
  }
}
</script>

<style scoped>
#create-wrap{
  width: 36em;
  height: 4em;
  border-radius: 4px;
  border: dashed 2px #67C23A;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}
.add-btn{
  color: #67C23A;
  font-size: 2em;
}
</style>
