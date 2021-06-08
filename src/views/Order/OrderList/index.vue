<template>
  <div class="order-list">
    <el-button @click="routerTo">点击跳转第三层</el-button>
  </div>
</template>

<script setup>
  // import { getCurrentInstance } from "vue";
  // const { proxy } = getCurrentInstance();
  import { useRoute, useRouter } from "vue-router";
  const router = useRouter()
  // console.log('proxy', proxy);
  const routerTo = () => {
    router.push({path:'/order-goods-list'})
  }
</script>