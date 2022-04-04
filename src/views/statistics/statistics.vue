<template>
<div class="statistic">
  <el-row type="flex" justify="center" align="middle">
    <el-col :span="8">
      <div class="container" @click="setChartIndex(0)">
        <echart-box :chartIndex = chartIndex :option="pieOption">
           <template v-slot:title>{{title.echart1}}</template>
        </echart-box>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="container" @click="setChartIndex(1)">
        <echart-box :chartIndex = chartIndex :option="lineOption">
          <template v-slot:title>{{title.echart2}}</template>
        </echart-box>
      </div>
    </el-col>
    <el-col :span="8">
      <div class="container" @click="setChartIndex(2)">
        <echart-box :chartIndex = chartIndex :option="barOption">
          <template v-slot:title>{{title.echart3}}</template>
        </echart-box>
      </div>
    </el-col>
  </el-row>
</div>
</template>

<script>
import EchartBox from '../../components/echarts/echart.vue'
const color = ['#1f3864','#6c8dae','#944f72','#fec000','#91c7ae','#749f83','#ca8622','#bda29a','#6e7074',]
export default {
  components: {
    EchartBox
  },
  data() {
    return {
      pieOption: {
        color: color,
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: [
          {
            name: 'Access From',
            type: 'pie',
            radius: ['40%', '75%'],
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center'
            },
            emphasis: {
              label: {
                show: true,
                fontSize: '40',
                fontWeight: 'bold'
              }
            },
            data: [
              { value: 1048, name: '蜜桃四季春' },
              { value: 735, name: '黑糖珍珠奶茶' },
              { value: 580, name: '奶茶冻奶茶' },
              { value: 484, name: '满杯奶盖' },
              { value: 300, name: '超级奶盖烧茶' }
            ]
          }
        ]
      },
      lineOption: {
        color: '#91c7ae',
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [150, 230, 224, 218, 135, 147, 260],
            type: 'line'
          }
        ]
      },
      barOption: {
        color: color,
        xAxis: {
          type: 'category',
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 150, 80, 70, 110, 130],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            }
          }
        ]
      },
      title: {
        echart1: '最受用户喜爱奶茶',
        echart2: '当周销量',
        echart3: '小料最畅销榜'
      },
      show: false,
      chartIndex: 0, // 当前活跃图表
    }
  },
  methods: {
    setChartIndex(index) {
      this.chartIndex = index
      // console.log(this.chartIndex)
    }
  }
}
</script>
<style scoped lang='less'>
.statistic{
  .container{
    background: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
  }
}
</style>