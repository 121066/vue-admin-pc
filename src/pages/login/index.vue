<template>
  <div class="login">
    <div class="login_in p_cenetr focus d_center">
      <div class="d_center title">登 录</div>
      <el-form class="login_form" ref="formLogin" :rules="rules" label-width="60px" :model="formLogin">
        <el-form-item label="用户:" prop="userName">
          <el-input prefix-icon="el-icon-user-solid" v-model="formLogin.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="passWord">
          <el-input prefix-icon="el-icon-unlock" v-model="formLogin.passWord" clearable type="password"></el-input>
        </el-form-item>
      </el-form>
      <div class="login_btn">
        <el-button type="primary" :loading="isLoading" @click="setLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import { setCookies } from '@/utils/cookies'
export default {
  data() {
    return {
      labelPosition: 'left',
      isLoading: false,
      formLogin: {
        userName: '',
        passWord: ''
      },
      rules: {
        userName: [
          {
            required: true, message: '请输入用户名', trigger: 'blur'
          }
        ],
        passWord: [
          {
            required: true, message: '请输入密码', trigger: 'blur'
          }, {
            min: 3, max: 8, message: '密码长度在3到8之间', trigger: 'blur'
          }
        ]
      }
    }
  },
  methods: {
    setLogin() {
      this.isLoading = !this.isLoading
      this.$refs.formLogin.validate((valid) => {
        if (valid) {
          setCookies('web-token', 'admin-pc')
          this.$router.push('/home')
        } else {
          this.$message.warning('登录失败')
        }
      })
      this.isLoading = !this.isLoading
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  width: 100vw;
  background-image: url("@/assets/bgc.jpg");
  background-size: 100% 100%;
}
.login_in {
  width: 400px;
  height: 300px;
  background: #fff;
  transition: ease-in-out 0.5s;
}
.login_form {
  width: 350px;
  padding: 30px 20px 20px 20px;
}
.login_btn {
  .el-button {
    width: 120px;
  }
}
.title {
  font-weight: bold;
  font-size: 18px;
}
</style>