<template>
  <div class="Home">
   <bar-echart class="bar" />
   <div class="line">
      <chart-line  />
      <chart-pie />
      <chart-line  />
    </div>
  </div>
</template>

<script>
import BarEchart from '@/components/Echart/BarEchart.vue'
import ChartPie from '@/components/Echart/ChartPie.vue'
import ChartLine from '@/components/Echart/ChartLine.vue'
export default {
  components: {
    BarEchart,
    ChartPie,
    ChartLine
  },
  setup() {
    
  }
}
</script>

<style lang="scss" scoped>
  .Home {
    width: 100%;
    box-sizing: border-box;
    .bar {
      width: 100%;
    }
    .line {
      width: 100%;
      margin-top: 10px;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      // height: 400px;
      .line-chart {
        height: 400px;
      }
    }
  }
</style>