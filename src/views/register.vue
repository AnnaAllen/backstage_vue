<template>
	<div class="register">
    <div class="big-box">
      <div class="middle">
        <div class="title">
          <div class="title-main">通用点单系统</div>
          <div class="title-small">Universal ordering system</div>
        </div>
      </div>
      <div class="form-box">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
          <el-form-item>
            <div class="form-title">用户{{isLogin?'登录':'注册'}}</div>
          </el-form-item>
          <el-form-item label="用户名" prop="userName">
            <el-input v-model="ruleForm.userName" placeholder="请输入名称" prefix-icon="el-icon-user"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input v-model="ruleForm.password" placeholder="请输入密码" :show-password="true" prefix-icon="el-icon-lock">
              <!-- <i slot="suffix" class="el-input__icon el-icon-lock"></i> -->
            </el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="userEmail" v-show="!isLogin">
            <el-input v-model="ruleForm.userEmail" placeholder="请输入邮箱" prefix-icon="el-icon-tickets"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="onSubmit">立即{{isLogin?'登录':'注册'}}</el-button>
          </el-form-item>
        </el-form>
        <div class="form-tip" @click="changeRegister">{{isLogin?'还没有注册？注册':'已有账号？登录'}}</div>
      </div>
    </div>
	</div>
</template>

<script>
import { userLogin, userRegister } from './manageMember/api'
export default {
	data() {
    var validateEmail = (rule, value, callback) => {
      if(!this.isLogin) {
        if (value === '') {
          callback(new Error('请输入邮箱'))
          return
        }
        if(value && !value.match(/\w+@\w+.[com]/))  {
          callback(new Error('请输入正确邮箱'))
          this.ruleForm.userEmail = ''
          return
        }
      }
        callback()
    }
    return {
      ruleForm: {
        userName: '',
        password: '',
        userEmail: ''
      },
      rules: {
        userName: [
          { required: true, message: '请输入名称', trigger: 'blur' },
          { max: 20, message: '最多输入20个字', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { max: 20, message: '最多输入20个字', trigger: 'blur' }
        ],
        userEmail: [
          { validator: validateEmail, trigger: 'blur' },
          // { max: 20, message: '最多输入20个字', trigger: 'blur' }
        ],
      },
      isLogin: true
    }
	},
	methods: {
    changeRegister() {
      this.isLogin = !this.isLogin
      this.ruleForm = {
        userName: '',
        password: '',
        userEmail: ''
      }
    },
    onSubmit() {
      this.$refs.ruleForm.validate( async(valid) => {
        if (valid) {
          try {
            if(this.isLogin) {
              const res = await userLogin(this.ruleForm)
              this.$message({
                message: res.message,
                type: 'success'
              })
              console.log( document.cookie )
              this.$router.push('/menuManage/menuList')
              return
            }
            const res = await userRegister(this.ruleForm)
            console.log()
            this.$message({
              message: res.message,
              type: 'success'
            });
            this.$router.push('/menuManage/menuList')
          } catch(err) {
            console.log(err)
          }
        } else {
          return false;
        }
      });
    }
  },
  created() {
    // this.noNull()
  }
}
</script>
<style scoped lang='less'>
  .register{
    width: 100vw;
    height: 100vh;
    background-image: url('../assets/bg.jpg');
    background: cover;
    .big-box{
      // margin: 0 auto;
      box-sizing: border-box;
      padding: 20px;
      position: relative;
      top: 15%;
      // left: 30%;
      margin: 0 auto;
      background-color: white;
      display: flex;
      justify-content: center;
      width: 800px;
      height: 450px;
      align-items: center;
      border-radius: 10px;
    }
    .middle{
      // background: skyblue;
      // flex: 2;
      border-right: 1px dashed #6c8dae;
      height: 360px;
      // margin: auto;
      display: flex;
      align-items: center;
      .title{
        color: #6c8dae;
        height: 80px;
        width: 300px;
        text-align: center;
        display: block;
        &-main{
          font-size: 35px;
          font-weight: bold;
        }
        &-small{
          margin-top: 10px;
          // font-size: 25px;
        }
      }
    }
    .form-box{
      // flex: 3;
      width: 500px;
      text-align: center;
      .form-title{
        // margin: 20px;
        color: #6c8dae;
        font-size: 25px;
      }
      .form-tip{
        cursor: pointer;
        text-align: right;
        color: #6c8dae;
        font-size: 12px;
      }
      .el-button{
        width: 90%;
        background: #6c8dae;
        color: white;
      }
    }
  }
</style>
