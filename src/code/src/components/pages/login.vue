<template>
  <div id="login-wrap">
    <p>login</p>
    <el-input class="form-item" v-model="userName" placeholder='用户名' autocomplete="new-password"></el-input>
    <el-input class="form-item" v-model="password" placeholder='密码' show-password autocomplete="new-password"></el-input>
    <el-button class="form-item" type="primary">登陆</el-button>
    <a href="/register">注册</a>
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
#login-wrap {
  margin-top: 20vh;
  width: 100%;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
}
.form-item{
  width: 20%;
}
</style>
