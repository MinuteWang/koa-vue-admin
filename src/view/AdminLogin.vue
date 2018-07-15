<template>
  <div class="login-container">
    <el-form ref="form" :model="form" label-width="50px" class="login-form">
      <el-form-item>
        <h2>超级卡券管理平台</h2>
      </el-form-item>
      <el-form-item label="账号">
        <el-input v-model="form.accout"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from '@/api/user'
export default {
  data () {
    return {
      form: {}
    }
  },
  methods: {
    onSubmit () {
      login(this.form).then(res => {})
    }
  }
}
</script>

<style lang="scss" scoped>
.login-container {
  background: url("~@/assets/img/bg.jpg") no-repeat center center/cover;
  width: 100%;
  height: 100%;
}
.login-form {
  width: 400px;
  margin: auto;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  height: 300px;
  background-color: #fff;
  padding: 20px 40px;
  border-radius: 5px;
  box-shadow: 4px 2px 12px rgba($color: #000000, $alpha: 0.2);
}
</style>
