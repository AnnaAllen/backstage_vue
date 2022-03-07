<template>
<div class="classify_box">
  <div class="title">
    <i class="el-icon-tickets"></i>
    编辑管理员信息
  </div>
  <div class="from_box">
    <div>
      <span>管理员名字&nbsp;:</span><span style="color:red;">*</span>
      <el-input v-model="classifyFrom.userName" 
      :class="errorStyle"
      ></el-input>
    </div>
    <br>
    <div>
      <span>管理员密码&nbsp;:</span><span style="color:red;">*</span>
      <el-input v-model="classifyFrom.password"
      placeholder="请输入新的密码"
      :class="errorStyle"
      ></el-input>
    </div>
    <br>
    <div>
      <span>管理员邮箱&nbsp;:</span><span style="color:red;">*</span>
      <el-input v-model="classifyFrom.userEmail"
      placeholder="请输入新的邮箱"
      :class="errorStyle"
      ></el-input>
    </div>
    <br>
    <div>
      <span>管理员微信号&nbsp;:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>
      <el-input v-model="classifyFrom.weChatNumBer"
      placeholder="请输入新的微信号"
      :class="errorStyle"
      ></el-input>
    </div>
    <br>
    <el-button style="margin-left: 20px;" @click="restore">取消</el-button>
    <el-button class="add-more" style="margin-left: 20px;" @click="addClassify()">修改</el-button>
  </div>
</div>
</template>

<script>
import { getAAdmin, editAAdmin } from './api'
// import { mixin } from '../../components/mixins/mixins' // mixins导入时要使用结构导入
export default {
  // mixins: [mixin],
  data() {
    return {
      errorStyle: '',
      id: this.$route.query.id,
      classifyFrom: {
        userEmail: '',
        userName: '',
        password: '',
        weChatNumBer: ''
      }
    }
  },
  methods:{
    check() {
      const classifyFrom = this.classifyFrom
      let noNull = {
        userEmail: '',
        userName: '',
        password: ''
      }
      // console.log(111)
      for(let i in noNull) {
        if(!(!!classifyFrom[i])) {
          // console.log(i,!!classifyFrom[i])
          return false
        }
      }
      return true
      // console.log(this.classifyFrom)
    },
    restore() {
      this.$router.go(-1)
    },
    // 获取管理员信息
    async getAdminMsg() {
      const res = await getAAdmin(this.id)
      this.classifyFrom = res.model
      // this.classifyFrom.password = ''
      console.log(res)
    },
    // 修改管理员信息
    async addClassify() {
      // console.log(this.check())
      if(!this.check()) {
        this.$message.error('请填写完整表单')
        return
      }
      const res = await editAAdmin(this.id,this.classifyFrom)
      if(res.code === 0) {
        this.$message.success('修改成功')
        this.$router.push({
          name: 'manageMember'
        })
      }
    }
  },
  created() {
    this.getAdminMsg()
  }
}
</script>
<style lang="less">
  .el-form-item__label{
    color: #999999;
  }
  .el-input{
    display: inline-block;
    width: 50%;
  }
</style>
<style scoped lang='less'>
.classify_box{
  text-align: center;
  width: 50%;
  margin: auto;
  .error_box{
    outline: none;
    border: 1px solid red;
    border-radius: 5px;
  }
  .from_box{
    span{
      color: #999999;
    }
    span:nth-child(2n){
      margin-right: 20px;
      margin-left: 10px;
    }
    .add-more{
      background-color: #87CEEB;
      color: white;
    }
  }
  .title{
    font-size: 20px;
    padding: 20px;
    color: #87CEEB;
  }
  
}
</style>