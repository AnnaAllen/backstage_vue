<template>
<div class="classify_box">
  <div class="title">
    <i class="el-icon-tickets"></i>
    {{$route.query.id? '编辑': '创建'}}分类
  </div>
  <div class="from_box">
    <span>添加分类&nbsp;:</span><span style="color:red;">*</span>
    <el-input v-model="classifyFrom.classifyName" 
    placeholder="请输入分类" 
    @blur="check"
    @focus="restore"
    :class="errorStyle"
    @change="addClassify()"
    ></el-input>
    <el-button class="add-more" style="margin-left: 20px;" @click="addClassify()">添加</el-button>
  </div>
</div>
</template>

<script>
import { createClassify } from './api'
export default {
  data() {
    return {
      errorStyle: '',
      classifyFrom: {
        classifyName: ''
      }
    }
  },
  methods:{
    check() {
      let input = this.classifyFrom?.classifyName
      if (!!!input ) {
        this.$message.error('分类不能为空')
        this.errorStyle = 'error_box'
        return false
      }
    },
    restore() {
      this.errorStyle = ''
    },
    async addClassify() {
      let input = this.classifyFrom?.classifyName
      if(!!!input) return
      const res = await createClassify(this.classifyFrom)
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
        name: 'classify'
      })
      // console.log(res)
    }
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
    span:nth-child(2){
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