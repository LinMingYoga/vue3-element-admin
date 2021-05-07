<template>
  <div class="pie-chart">
    <el-card class="box-card">
      <div class="bar-options">
        <div class="title">
          总用户率
        </div>
      </div>
      <vue-echarts :option="payTypeOPtion" style="height: 330px;"/>
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
      payTypeOPtion: {}
    })

    onMounted(() => {
      // 支付类型
      state.payTypeOPtion = {
        title: {},
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c}￥ ({d}%)'
        },
        color: ['#dc3545', '#007bff', '#28a745'],
        series: [
            {
                name: '支付渠道',
                type: 'pie',
                radius: '90%',
                avoidLabelOverlap: false,
                roseType: 'radius',
                center: ['50%', '50%'],
                itemStyle:{
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label:{
                    show: true,
                    position: 'inner'
                },
                labelLine: {
                    show:false
                },
                data: [
                    {value: 335, name: '微信'},
                    {value: 310, name: '支付宝'},
                    {value: 274, name: '银联'}
                ].sort(function (a, b) {
                    return a.value - b.value;
                })
            }
        ]
      }
    })

    return {
      ...toRefs(state)
    }
  }
}
</script>

<style lang="scss" scoped>
  .box-card {
    width: 420px;
  }
</style>