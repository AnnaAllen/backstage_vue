<template>
<div class="classify_box">
  <div class="title">
    <i class="el-icon-tickets"></i>
    {{$route.query.id? '编辑': '创建'}}小料
  </div>
  <div class="from_box">
    <div>
      <span>添加小料&nbsp;:</span><span style="color:red;">*</span>
      <el-input v-model="classifyFrom.extraName" 
      placeholder="请输入小料" 
      @blur="check"
      @focus="restore"
      :class="errorStyle"
      @change="addClassify()"
      ></el-input>
    </div>
    <br>
    <div>
      <span>小料价格(元)&nbsp;:</span><span style="color:red;">*</span>
      <el-input v-model="classifyFrom.extraPrice" 
      placeholder="请输入小料价格(元)" 
      type="number"
      @blur="check"
      @focus="restore"
      :class="errorStyle"
      @change="addClassify()"
      ></el-input>
    </div>
    <br>
    <el-button class="add-more" style="margin-left: 20px;" @click="addClassify()">{{this.$route.query.status === 0? '修改' : '添加'}}</el-button>
  </div>
</div>
</template>

<script>
import { createExtra, editExtra, changeExtra } from './api'
export default {
  data() {
    return {
      errorStyle: '',
      classifyFrom: {
        extraName: '',
        extraPrice: ''
      }
    }
  },
  methods:{
    check() {
      let extraName = this.classifyFrom?.extraName
      let extraPrice = this.classifyFrom?.extraPrice
      if (!!!extraName ) {
        this.$message.error('小料名不能为空')
        this.errorStyle = 'error_box'
        return false
      }
      if (!!!extraPrice ) {
        this.$message.error('小料价格不能为空')
        this.errorStyle = 'error_box'
        return false
      }
      return true
    },
    restore() {
      this.errorStyle = ''
    },
    // 状态为编辑时
    async getStatus() {
      let status = this.$route.query.status
      let id = this.$route.query.id
      if(status != 0) return
      const res = await editExtra(id)
      if(res.code != 0) {
        this.$message(res.message) 
        return
      }
      this.classifyFrom = res.model
      // console.log(res)
    },
    async addClassify() {
      let input = this.check()
      if(!(!!input)) return
      const res = this.$route.query.status === 0? await changeExtra(this.$route.query.id,this.classifyFrom) : await createExtra(this.classifyFrom)
      if(res.code != 0) {
        this.$message.error(res.message)
        return
      }
      this.$message({
        type: 'success',
        duration: 1500,
        message: '添加成功'
      })
      this.$router.push({
        name: 'extra'
      })
      // console.log(res)
    }
  },
  created() {
    this.getStatus()
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