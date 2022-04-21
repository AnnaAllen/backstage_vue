<template>
  <div class="c-order">
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="商品名称" v-for="(item,index) in props.row.children" :key="index">
              <div class="shop-info">
                <div>{{ item.cup.menu }}</div>
                <div>{{item.detail.size + '/' + item.detail.sugar + '/' + item.detail.tem}}</div>
                <div>x{{item.num}} &nbsp; &nbsp; ￥{{item.price}}</div>
                <div>添加小料：{{item.detail.extra.extraName}} x1 ￥1</div>
              </div>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        prop="createOrderTime">
      </el-table-column>
      <el-table-column
        label="就餐方式"
        prop="eatType">
      </el-table-column>
      <el-table-column
        label="订单编号"
        prop="orderId">
      </el-table-column>
      <el-table-column
        label="点餐人"
        prop="userName">
      </el-table-column>
      <el-table-column label="操作" v-if="activeName =='doing'">
        <template slot-scope="scope">
          <el-button
            size="mini"
            style="background-color: #6c8dae; color: white;"
            @click="handleEdit(scope.$index, scope.row)">完成</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import {finishOrder} from './api'
export default {
  props: {
    doingOrder: {
      type: Array,
      default: []
    },
    activeName: {
      type: String,
      default: ''
    }
  },
  data() {
    return{
      tableData: []
    } 
  },
  methods: {
    optionOrderData() {
        this.tableData = this.doingOrder.map(item => {
        return {
          createOrderTime: item.createOrderTime.slice(0,10),
          eatType: JSON.parse(item.eatType).name,
          orderId: item.orderId,
          userName: item.userName,
          children: JSON.parse(item.orderItem),
          orderInfo: '查看详情',
          _id: item._id
        }
      })
    },
    async handleEdit(index, row) {
      const res = await finishOrder({_id: row._id})
      this.$emit('end')
    }
  },
  mounted() {
    // console.log(this.activeName,'c-order');
    // console.log(this.doingOrder,'c-order');
    this.optionOrderData()
  }
}
</script>
<style scoped lang='less'>
.order{
  .el-form{
    margin-left: 60px;
  }
  .el-form--inline .el-form-item{
    margin-left: 20px;
    display: inline;
  }
  .shop-info{
    display: flex;
    div{
      margin-left: 20px;
    }
    div:nth-child(1) {
      font-weight: bold;
    }
    div:nth-child(4) {
      margin-left: 40px;
      color: #6c8dae;
    }
  }
}
</style>