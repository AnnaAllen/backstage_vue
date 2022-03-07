<template>
	<div class="register">
    <el-container>
      <el-header style="font-size: 18px; color: white; background: skyblue;">
        <span>点单管理系统</span>
      </el-header>
      <el-main>
        <div class="reg_box">
          <el-tabs type="border-card" :value="tabName">
            <el-tab-pane label="用户登录" name="register">
              <div class="userName">
                <span>用户名:</span><span>*</span>
                <el-input class="input" v-model="userReg.userName" placeholder="请输入内容"></el-input>
              </div>
              <div class="userName">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;密码:</span><span>*</span>
                <el-input class="input" v-model="userReg.password" placeholder="请输入内容"></el-input>
              </div>
              <div style="text-align:center;">
                <el-button class="register_but" @click="adminLogin(0)">登录</el-button>
                <span class="login_box"><i class="el-icon-mobile-phone"></i>微信扫码登录</span>
              </div>
            </el-tab-pane>
            <el-tab-pane label="用户注册" name="login">
              <div class="userName">
                <span>用户名:</span><span>*</span>
                <el-input class="input" v-model="login.userName" placeholder="请输入内容"></el-input>
              </div>
              <div class="userName">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;密码:</span><span>*</span>
                <el-input class="input" v-model="login.password" placeholder="请输入内容"></el-input>
              </div>
              <div class="userName">
                <span>&nbsp;&nbsp;&nbsp;&nbsp;邮箱:</span><span>*</span>
                <el-input class="input" v-model="login.userEmail" placeholder="请输入内容"></el-input>
              </div>
              <div style="text-align:center;">
                <el-button class="register_but" @click="adminLogin(1)">注册</el-button>
                <span class="login_box"><i class="el-icon-mobile-phone"></i>微信扫码注册</span>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-main>
    </el-container>
	</div>
</template>

<script>
import { userLogin, userRegister } from './manageMember/api'
export default {
	data() {
    return {
      tabName: 'login',
      userReg:{
        userName: '',
        password: ''
      },
      login: {
        userName: '',
        password: '',
        userEmail: ''
      }
    }
	},
	methods: {
    // 判空
    noNull(n) {
      let key = Object.keys(n)
      let blank = key.map((item,index) => {
        if(n[item] === '') return index
        return null
      }).filter(n => n !== null)
      return blank
    },
    // 注册
    async adminLogin(n) {
      let hasBlank = n == 1 ? this.noNull(this.login) : this.noNull(this.userReg)
      if(hasBlank.length > 0) {
        this.$message.error('请填写完整信息')
        return
      }
      const res = n == 1 ? await userLogin(this.login) : await userRegister(this.userReg)
      let msg = n == 1 ? '注册成功' : '登录成功'
      this.$message.success(msg)
      res.token && sessionStorage.setItem('token', res.token)
      // console.log(res)
      this.$router.push({
        name: 'menuList'
      })
    },
	},
  created() {
    // this.noNull()
  }
}
</script>
<style scoped lang='less'>
	.el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }
  
  .register{
    position: relative;
    .login_box{
      position: absolute;
      right: 20px;
      font-size: 14px;
      color: #999;
    }
    .login_box:hover{
      color: #87CEEB;
      cursor: pointer;
    }
    .reg_box{
      width: 30%;
      margin: auto;
      .userName{
        padding-bottom: 20px;
        display: flex;
        justify-content: center;
        align-items: center;
        span:nth-child(2){
          margin-right: 20px;
          margin-left: 10px;
          color: red;
        }
        .input{
          width: 75%;
        }
      }
    }
    .register_but{
      margin: auto;
      text-align: center;
      background-color: #87CEEB;
      color: white;
    }
  }
</style>
