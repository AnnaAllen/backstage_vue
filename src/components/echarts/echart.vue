<template>
  <div class="echart">
    <div class="export-chart">
      <div class="echart-title" @mouseover="show = true">
        <slot name="title"></slot>
       <el-dropdown trigger="click" @command="handleCommand">
          <span class="el-dropdown-link" v-show="show">
            <i class="el-icon-more"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item icon="el-icon-plus" command="a">导出图表</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
      <div class="echart-box" ref="echart-box" @mouseover="show = false"></div>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts'
import domtoimage from 'dom-to-image';
export default {
  props: {
    option: {
      type: Object,
      defalut: {}
    },
    chartIndex: {
      type: [String, Number],
      defalut: 0
    }
  },
  watch: {
    chartIndex(newIndex, oldIndex) {
      console.log(newIndex)
    }
  },
  data() {
    return {
      show: false
    }
  },
  methods: {
    drawEchart() {
      let echartDom = this.$refs['echart-box']
      let myChart = echarts.init(echartDom)
      this.option && myChart.setOption(this.option)
      window.addEventListener("resize",function(){
          myChart.resize();
      });
    },
    handleCommand(command) {
      // this.$message('click on item ' + command);
      if(command === 'a') this.operate()
    },
    // 导出图表
    operate() {
      let node = document.getElementsByClassName('export-chart')[this.chartIndex]
      // domtoimage.toBlob(node)
      //   .then(function (blob) {
      //       window.saveAs(blob, 'chart.png');
      //   })
      //   .catch(function (error) {
      //     console.error('oops, something went wrong!', error);
      //   })

      domtoimage.toJpeg(node, { quality: 0.95 })
        .then(function (dataUrl) {
            var link = document.createElement('a');
            link.download = 'chart.jpeg';
            link.href = dataUrl;
            link.click();
        });
      // console.log(document.getElementsByClassName('container')[this.chartIndex])
    }
  },
  mounted() {
    this.drawEchart()
    // console.log('chartIndex',this.chartIndex)
  }
}
</script>

<style scoped lang="less">
  .echart{
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .export-chart{
      background-color: #fff;
    }
    .echart-title{
      background-color: #fff;
      border: 1px dashed #999;
      box-sizing: border-box;
      padding: 0 20px;
      height: 50px;
      font-size: 26px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .opetate-icon{
        color: #999;
      }
    }
    .echart-box{
      background-color: rgb(241, 239, 239);
      width: 400px;
      height: 400px;
      display: inline-block;
    }
  }
</style>