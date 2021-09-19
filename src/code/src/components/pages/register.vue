<template>
  <div id="register-wrap">
    <p>register</p>
    <el-input class="form-item" placeholder='用户名' v-model="userName" autocomplete="new-password"></el-input>
    <el-input class="form-item" placeholder='密码' v-model="password" show-password autocomplete="new-password"></el-input>
    <el-button class="form-item" type="primary">注册</el-button>
    <a href="/login">登陆</a>
  </div>
</template>

<script>
export default {
  data () {
    return {
      userName: '',
      password: ''
    }
  }
}
</script>

<style scoped>
#register-wrap{
  margin-top: 20vh;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.form-item {
  width: 20%;
}
</style>
