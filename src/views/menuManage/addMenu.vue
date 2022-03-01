<template>
<div class="add-meun">
  <div class="title">
    <i class="el-icon-tickets"></i>
    {{$route.query.id? '编辑': '创建'}}菜品
  </div>
  <div class="meun-box">
    <div class="meun-name">
      <span>菜品</span>
      <span class="require">*</span>
      <el-input 
      v-model="createAMenu.menu" 
      placeholder="请输入菜品名" 
      @blur="noBlank(1)"
      :class="nameShow? 'special' : ''"
      ></el-input>
      <span v-show="nameShow" style="color: red; font-size: 14px; padding-left: 10px">{{nameMsg}}</span>
    </div>
    <div class="meun-price">
      <span>价格</span>
      <span class="require">*</span>
      <el-input 
      v-model="createAMenu.price" 
      placeholder="请输入价格" 
      @blur="noBlank(2)"
      :class="priceShow? 'special' : ''"
      ></el-input>
      <span v-show="priceShow" style="color: red; font-size: 14px; padding-left: 10px">{{priceMsg}}</span>
    </div>
    <div class="meun-dec">
      <span>商品描述</span>
      <el-input 
      class="textArea_box"
      v-model="createAMenu.describe" 
      placeholder="请输入商品描述" 
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      @blur="noBlank(2)"
      :class="priceShow? 'special' : ''"
      ></el-input>
      <span v-show="priceShow" style="color: red; font-size: 14px; padding-left: 10px">{{priceMsg}}</span>
    </div>
    <div class="meun-price">
      <span>分类</span>
      <span class="require">*</span>
      <el-select 
      v-model="createAMenu.menuType" 
      placeholder="请分类选择"
      @change="changeType"
      class="select"
      :class="selectShow? 'special' : ''"
      >
        <el-option
          v-for="item in options"
          :key="item._id"
          :value="item.classifyName"
          @blur="noBlank(3)"
          >
        </el-option>
      </el-select>
      <i class="el-icon-setting" style="margin-left: 10px;"></i>
      <span v-show="selectShow" style="color: red; font-size: 14px; padding-left: 10px">{{selectMsg}}</span>
    </div>
    <div class="meun-price img_box">
      <span>点击上传图片&nbsp;<span style="color:red">*</span>&nbsp;&nbsp;&nbsp;</span>
      <el-upload
        class="avatar-uploader"
        :action="baseUrl"
        :show-file-list="false"
        :on-success="successUpload"
        >
        <img v-if="createAMenu.menuImage" :src="createAMenu.menuImage" class="avatar">
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload>
      
    </div>
    <!-- <div class="meun-price">
      <span>没有分类？可添加新分类</span>
      <el-input class="new-select" v-model="newSelect" placeholder="请输入分类名"></el-input>
      <el-button class="add-more" style="margin-left: 20px;" @click="setNewSelect">添加</el-button>
    </div> -->
    <el-button v-show="$route.query.id" class="add" @click="editMenu">提交编辑</el-button>
    <el-button v-show="!$route.query.id" class="add" @click="createMenu">创建</el-button>
    <el-button class="cancel" @click="cancelInput">取消</el-button>
  </div>
</div>
</template>

<script>
import { setMenuItem, getAMenu, editMenuItem, getClassify } from './api'
export default {
  data() {
    return {
      baseUrl: 'http://localhost:3000/admin/api/uploads',
      dialogVisible: false,
      options: [],
      createAMenu: {
        menu: '',
        price: '',
        menuType: '',
        menuTypeId: '',
        menuImage: '',
        describe: ''
      },
      menuTypeId: '',
      newSelect: '',
      nameShow: false,
      priceShow: false,
      selectShow: false,
      nameMsg: '不能为空',
      priceMsg: '不能为空',
      selectMsg: '不能为空',
      disabled: false,
    }
  },
  methods: {
    // 编辑菜单信息
    async editMenu() {
      const data = await editMenuItem(this.$route.query.id, this.createAMenu)
      console.log(data)
      this.$message({
        message: '编辑成功',
        type: 'success'
      });
      this.$router.push({
        name: 'menuList'
      })
    },
    // 获取菜单信息
    async getAMenuData() {
      const data = await getAMenu(this.$route.query.id)
      this.createAMenu = data
    },
    // 获取分类
    async getMenuType() {
      const res = await getClassify()
      this.options = res
      // console.log(res)
    },
    // 获取分类的id
    changeType(item){
      this.noBlank(3)
      let index = this.options.map(item => {
        return item.classifyName
      }).indexOf(item)
      this.createAMenu.menuTypeId = this.options[index]._id
    },
    // 提交创建的菜单
    async createMenu() {
      if (this.createAMenu.menu === '') {
        this.noBlank(1)
      } else if (this.createAMenu.price === '') {
        this.noBlank(2)
      } else if (this.createAMenu.menuType === '') {
        this.noBlank(3)
      }else if (this.createAMenu.menuType === '') {
        this.noBlank(4)
      } else {
        const data = await setMenuItem(this.createAMenu)
        this.$message({
          message: '创建成功',
          type: 'success'
        });
        this.$router.push({
          name: 'menuList'
        })
      }
    },
    // 图片上传成功
    successUpload(file) {
      console.log(file)
      this.createAMenu.menuImage = file.url
    },
    // 判断表单不为空
    noBlank(n) {
      if(n === 1) {
        console.log(this.createAMenu.menu)
        if(this.createAMenu.menu === '') {
          this.nameShow = true
        } else {
          this.nameShow = false
        }
      } else if (n === 2) {
        console.log(this.createAMenu.price)
        if(this.createAMenu.price === '') {
          this.priceShow = true
        } else {
          this.priceShow = false
        }
      } else if (n === 3) {
        console.log(this.createAMenu.menuType)
        if(this.createAMenu.menuType === '') {
          this.selectShow = true
        } else {
          this.selectShow = false
        }
      } else if (n === 4) {
        console.log(this.createAMenu.menuType)
        if(this.createAMenu.menuType === '') {
          this.selectShow = true
        } else {
          this.selectShow = false
        }
      }
    },
    // 清空表单
    cancelInput() {
      this.createAMenu = {
        menu: '',
        price: '',
        menuType: '',
        menuTypeId: '',
        menuImage: '',
        describe: ''
      }
    },
    // 新建分类
    setNewSelect() {
      console.log(this.newSelect)
    }
  },
  created() {
    if(this.$route.query.id) {
      this.getAMenuData()
    }
    this.getMenuType()
  }
}
</script>
<style scoped lang='less'>
.img_box{
  padding-bottom: 20px;
  margin: auto;
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  .upload_img{
    margin: auto;
    width: 150px;
    height: 150px;
    // border: 1px dotted #999999;
    text-align: center;
    line-height: 150px;
  }
  img{
    width: 150px;
    height: 150px;
  }
}
.meun-dec{
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .textArea_box{
    width: 32%;
    margin-left: 20px;
  }
}
.special{
  border: 1px solid red;
  border-radius: 6px;
}
.require{
  color: red;
  padding-left: 5px;
}
.add-more{
  background-color: rgb(247, 215, 166);
  color: white;
}
.select{
  width: 28% !important;
}
.new-select{
  width: 200px !important;
}
.title {
  font-size: 20px;
  padding: 20px;
  color: #87CEEB;
}
.add-meun {
  text-align: center;
  color: #999999;
  .meun-box {
    .add{
      background-color: skyblue;
      color: white;
    }
    .cancel{
      background-color: #F4F4F5;
      color: #999999;
    }
  }
}
.el-button {
  border: none;
  letter-spacing: 1px;
  display: inline;
}
.el-input, .el-select {
  width: 30%;
  margin-left: 20px;
  margin-bottom: 20px;
  // border-radius: 5px;
}

</style>