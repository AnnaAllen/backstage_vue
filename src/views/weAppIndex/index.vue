<template>
  <div class="we-app">
    <div class="we-app-swiper">
      <div class="we-app-swiper__title">首页轮播图 <el-button size="mini" @click="reUpdate">{{showUpdataBox?'取消':'重新上传'}}</el-button></div>
      <!-- 回显时无图片则显示上传图标 -->
      <div class="we-app-swiper__content we-app-border" v-if="showUpdataBox">
        <el-upload
          :action="baseUrl"
          list-type="picture-card"
          :on-success="successUpload"
          >
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
      <!-- 有图片则展示图片 -->
      <div v-else class="we-app-swiper__image we-app-border">
        <img v-for="(item,index) in getImage" :key="index" :src="item">
      </div>
    </div>
    <div class="we-app-swiper">
      <div class="we-app-swiper__title">本店热销</div>
      <div class="we-app-swiper__content">
        <div class="we-app-border">
          <div class="we-app-swiper__content-select" v-for="(item,index) in allClassify" :key="index">
            <div class="we-app-swiper__content-select-classify">
              {{index}}
            </div>
            <div class="check-box">
              <el-checkbox v-for="menu in item" :key="menu._id" v-model="menu.isHot">{{menu.menu}}</el-checkbox>
            </div>  
          </div>
        </div>
        <!-- <div class="we-app-swiper__content-table">
          <el-table
            :data="tableData"
            style="width: 100%">
            <el-table-column
              label="名称"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.extraName }}</span>
              </template>
            </el-table-column>
              <el-table-column
              label="价格"
              width="180">
              <template slot-scope="scope">
                <span style="margin-left: 10px">￥{{ scope.row.extraPrice }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div> -->
      </div>
    </div>
    <div class="submit">
      <el-button @click="submit">确定更改</el-button>
    </div>
  </div>
</template>

<script>
import { getClassify, getMenuList, setIndexPage, getIndexVal } from './api'
export default {
  data() {
    return {
      baseUrl: 'http://localhost:3000/admin/api/uploads',
      dialogImageUrl: [],
      dialogVisible: false,
      swiperArr: [],
      tableData: [],
      checkList: [],
      allClassify: [],
      selectItem: [],
      menu: [],
      getImage: [], // 回显的轮播图图片
      hotItems: [], // 热销物品的id
      showUpdataBox: false
    };
  },
  methods: {
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    // 图片上传成功
    successUpload(file) {
      // console.log(file)
      // this.createAMenu.menuImage = file.url
      this.swiperArr.push(file.url)
      console.log(this.swiperArr)
    },
    // 复选框发生变化
    changeCheck(val) {
      // console.log(val)
      val.forEach(item => {
        // console.log(item)
        this.menu.forEach(menu => {
          if(item == menu.menu) this.selectItem.push(menu._id)
        })
      })
      this.selectItem = [...new Set(this.selectItem)]
      console.log(this.selectItem)
    },
    // 重新上传首页轮播图
    reUpdate() {
      this.showUpdataBox = !this.showUpdataBox
      // console.log(this.showUpdataBox)
    },
    // 获取全部分类后遍历
    async getAllClassify() {
      const classify = await getClassify()
      const allMenu = await getMenuList()
      let a = {}
      classify.forEach( item => {
        allMenu.forEach( (menu,index) => {
          // console.log(this.hotItems.indexOf(menu._id) >= 0)
          if(this.hotItems.indexOf(menu._id) >= 0) allMenu[index].isHot = true
          if(item.classifyName == menu.menuType && item.classifyName in a) {
            a[item.classifyName].push(menu)
            return
          }
          if(item.classifyName == menu.menuType) {
            a[item.classifyName] = []
            a[item.classifyName].push(menu)
          } 
        })
      })
      this.allClassify = a
      this.menu = allMenu
      console.log(this.allClassify)
    },
    // 获取首页的值
    async getHomePage() {
      const res = await getIndexVal()
      this.getImage = res.swiperArr
      this.hotItems = res.hotShop
      this._id = res._id
      // console.log(this.hotItems)
      if(this.getImage.length == 0) {
        this.showUpdataBox = true
      } else {
        this.showUpdataBox = false
      }
      this.getAllClassify()
    },
    // 提交修改
    async submit() {
      let hotShopItem = []
      Object.values(this.allClassify).forEach(item => {
        hotShopItem.push(...item)
      })
      let hotShop = hotShopItem.filter(item => item.isHot).map(item => { return item })
      if(this.swiperArr.length == 0) this.swiperArr = this.getImage
      const res = await setIndexPage({hotShop, swiperArr:this.swiperArr, id:this._id})
      console.log(res);
    }
  },
  mounted() {
    this.getHomePage()
  }
}
</script>

<style lang="less" scoped>
.we-app{
  .el-button{
    background: #6c8dae;
    color: white;
  }
  .we-app-border{
    // border: 1px solid #6c8dae;
  }
  .we-app-swiper{
    margin-bottom: 20px;
    &__title{
      margin-bottom: 10px;
      font-size: 25px;
      color: #081f3e;
      // background-color: #081f3e;
      // font-weight: bold;
    }
    &__content{
      // padding: 10px;
      &-select{
        padding: 10px 20px;
        &-group{
          padding: 20px 10px;
        }
      }
      &-table{}
    }
    &__image{
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      img{
        width: 150px;
        height: 150px;
        margin: 10px;
        border-radius: 10px;
      }
    }
  }
}

</style>