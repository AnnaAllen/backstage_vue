<template>
  <div class="order">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="进行中" name="first">
        <c-order @end="end" v-if="doingOrder.length!=0" :doingOrder="doingOrder" :activeName="'doing'"></c-order>
        <el-empty v-show="doingOrder.length==0" description="还没有人点单哦"></el-empty>
      </el-tab-pane>
      <el-tab-pane label="已完结" name="second">
        <c-order v-if="doneOrder.length!=0" :doingOrder="doneOrder" :activeName="'done'"></c-order>
        <el-empty v-show="doneOrder.length==0" description="还没有人点单哦"></el-empty>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import {getDoingOrder} from './api'
import cOrder from './c-order.vue'
export default {
  components: {
    cOrder
  },
  data() {
    return {
      activeName: 'first',
      doingOrder: [],
      doneOrder: []
    }
  },
  methods: {
    handleClick(tab, event) {
      if(tab.index == 0) {
        this.activeName = 'first'
        return
      }
      this.activeName = 'second'
    },
    end() {
      this.getDoingOrderData()
      console.log(111)
    },
    async getDoingOrderData() {
      const res = await getDoingOrder({status: 'doing'})
      this.doingOrder = res.model
      const done = await getDoingOrder({status: 'done'})
      this.doneOrder = done.model
      console.log(this.doneOrder)
    }
  },
  mounted() {
    this.getDoingOrderData()
  }
}
</script>

<style lang="less" scoped>

</style>