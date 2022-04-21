<template>
  <div class="test">
    <div class="demo-title">a test demo</div>
    <div class="option">
      <el-button @click="add()">添加一个</el-button>
      <el-button @click="del()">删除一个</el-button>
    </div>
    <div class="item">
      <grid-layout
        :layout.sync="layout"
        :col-num="12"
        :row-height="30"
        :is-draggable="true"
        :is-resizable="true"
        :is-mirrored="false"
        :vertical-compact="true"
        :margin="[10, 10]"
        :use-css-transforms="true"
      >

        <grid-item class="grid-item" v-for="item in layout"
          :x="item.x"
          :y="item.y"
          :w="item.w"
          :h="item.h"
          :i="item.i"
          :key="item.i"
          @resize="resizeEvent"
          :ref="item.i"
          >
            {{item.i}}
        </grid-item>
    </grid-layout>
    </div>
  </div>
</template>

<script>
import VueGridLayout from 'vue-grid-layout';
export default {
  components: {
    GridLayout: VueGridLayout.GridLayout,
    GridItem: VueGridLayout.GridItem
  },
  data() {
    return {
      layout: [
        {"x":0,"y":0,"w":2,"h":2,"i":"0"},
      ],
      arr: [1,2,3,4]
    }
  },
  methods: {
    add() {
      let b = this.layout[this.layout.length-1]
      let a = {
        'x': b.x >= 10 ? 0: b.x+2,
        'y': b.h + 2,
        'w': 2,
        'h': b.h,
        'i': this.layout.length.toString()
      }
      this.layout.push(a)
      console.log(this.layout)
      // let a = this.arr[this.arr.length-1]
      // a = this.arr.length+1
      // this.arr.push(a)
    },
    del() {
      this.layout.splice(this.layout.length-1,1)
    },
    resizeEvent(i, newH, newW, newHPx, newWPx) {
      let height= this.$refs[i].offsetHeight
      console.log(newHPx, height)
    }
  }
}
</script>

<style lang="less" scoped>
  .grid-item{
    background-color: rgba(1,1,1,.1);
  }
</style>