<template>
  <div class="bar-echart">
    <el-card class="box-card">
      <div class="bar-options">
        <div class="title">数据中心</div>
        <div class="options">
          <el-date-picker
            v-model="dataCenterTime"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
        </div>
      </div>
      <vue-echarts class="bar" :option="overviewOption" style="height: 400px; width: 100%;"/>
    </el-card>
  </div>
</template>

<script>
import {reactive,toRefs, onMounted} from 'vue'
import {VueEcharts} from 'vue3-echarts'
export default {
  components: {
    VueEcharts
  },
  setup() {
    const state = reactive({
      overviewOption: {},
      dataCenterTime: []
    })

    onMounted(() => {
      // 总览
      state.overviewOption = {
        legend: {},
        tooltip: {},
        dataset: {
            dimensions:  ['product', '成交量', '退款量', '净笔数'],
            source: [
                ['1月', 43.3, 85.8, 93.7],
                ['2月', 83.1, 73.4, 55.1],
                ['3月', 86.4, 65.2, 82.5],
                ['4月', 72.4, 53.9, 39.1],
                ['5月', 72.4, 53.9, 39.1],
                ['6月', 72.4, 53.9, 39.1],
                ['7月', 72.4, 53.9, 39.1],
                ['8月', 72.4, 53.9, 39.1],
                ['9月', 72.4, 53.9, 39.1],
                ['10月', 72.4, 53.9, 39.1],
                ['11月', 72.4, 53.9, 39.1],
                ['12月', 72.4, 53.9, 39.1]
            ]
        },
        color: ['#20c997', '#007bff', '#dc3545'],
        xAxis: {
            type: 'category',
            axisTick: {
                show: false // 不显示坐标轴刻度线
            },
        },
        yAxis: {
            show: true, // 不显示坐标轴线、坐标轴刻度线和坐标轴上的文字
            axisTick: {
                show: false // 不显示坐标轴刻度线
            },
            axisLine: {
                show: false // 不显示坐标轴线
            },
            splitLine: {
                show: true // 不显示网格线
            },
        },
        series: [
            {type: 'bar'},
            {type: 'bar'},
            {type: 'bar'}
        ]
      }
    })


    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss">
  .bar-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    .title {
      font-size: 20px;
      font-weight: 600;
    }
  }
</style>