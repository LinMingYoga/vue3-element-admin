<template>
  <el-container class="container">
    <el-aside :style="defaultHeight" :width="asideWidth">
      <el-affix :z-index="1200">
        <div class="aside-logo" @click="onRefresh">
          <el-image class="logo-image" :src="logo" fit="contain" />
          <span :class="[isCollapse ? 'is-collapse' : '']">
            <span>后台管理系统1</span>
          </span>
        </div>
      </el-affix>
      <el-menu
        class="aside-menu"
        router
        :default-active="$route.path"
        :collapse="isCollapse"
        background-color="#001529"
        text-color="#fff"
        active-text-color="#fff"
      >
        <div v-for="menu in routers" :key="menu">
          <el-menu-item
            v-if="menu.children && menu.children.length === 1"
            :index="menu.children[0].path"
          >
            <i :class="menu.children[0].icon"></i>
            <template #title>
              {{ menu.children[0].name }}
            </template>
          </el-menu-item>
          <el-submenu v-else-if="menu.children" :index="menu.path">
            <template #title>
              <i :class="menu.icon"></i>
              <span :class="[isCollapse ? 'is-collapse' : '']">{{
                menu.name
              }}</span>
            </template>
            <el-menu-item
              v-for="child in menu.children"
              :key="child"
              :index="child.path"
            >
              <i :class="child.icon"></i>
              <template #title>
                {{ child.name }}
              </template>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </el-aside>
    <el-container class="container-main">
      <el-header>
        <div class="hader-row-left">
          <div class="header-collapse" @click="onCollapse">
            <i :class="[isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold']" />
          </div>
          <div class="header-breadcrumb">
            <el-breadcrumb
              separator="/"
              v-if="this.$route.matched[0].path != '/main'"
            >
              <!-- <el-breadcrumb-item :to="{ path: '/' }">工作台</el-breadcrumb-item> -->
              <el-breadcrumb-item
                v-for="(matched, m) in this.$route.matched"
                :key="m"
              >
                {{ matched.name }}
              </el-breadcrumb-item>
            </el-breadcrumb>
            <el-breadcrumb separator="/" v-else>
              <el-breadcrumb-item>工作台</el-breadcrumb-item>
            </el-breadcrumb>
          </div>
        </div>
        <HeadMenu></HeadMenu>
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
    <el-backtop target=".el-main"></el-backtop>
  </el-container>
</template>
<script>
import { onBeforeMount, reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import HeadMenu from "@/components/HeadMenu.vue";
import Logo from "@/assets/logo.png";

export default {
  components: {
    HeadMenu,
  },
  setup() {
    const router = useRouter();
    const state = reactive({
      logo: Logo,
      isCollapse: false,
      asideWidth: "220px",
      defaultHeight: {
        height: "",
      },
      routers: [],
    });

    onBeforeMount(() => {
      state.routers = router.options.routes;
    });

    const onCollapse = () => {
      if (state.isCollapse) {
        state.asideWidth = "220px";
        state.isCollapse = false;
      } else {
        state.isCollapse = true;
        state.asideWidth = "64px";
      }
    };

    const onRefresh = () => {
      router.push({ path: "main" });
    };

    return {
      ...toRefs(state),
      onCollapse,
      onRefresh,
    };
  },
};
</script>
<style lang="scss">
.container {
  width: 100%;
  height: 100%;
  background: rgb(245, 247, 249);
  .el-aside {
    width: 100%;
    // height: 100vh;
    transition: all 0.5s;
    background-color: #001529;
    overflow-y: auto;
    overflow-x: hidden;

    .aside-logo {
      height: 59px;
      color: white;
      cursor: pointer;
      .logo-image {
        width: 40px;
        height: 40px;
        top: 12px;
        padding-left: 12px;
      }
      .logo-name {
        font-size: 20px;
        font-weight: bold;
        padding: 2px;
      }
    }
    .aside-menu:not(.el-menu--collapse) {
      width: 220px;
      .el-menu-item.is-active {
        background-color: #006699 !important;
      }
    }
    .is-collapse {
      display: none;
    }
  }

  .el-aside::-webkit-scrollbar {
    width: 0px;
  }
  .container-main {
    display: flex;
    flex-direction: column;
    .el-header {
      width: 100%;
      // flex: 1;
      height: 60px;
      background: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 24px;
      .hader-row-left {
        display: flex;
        height: 100%;
        align-items: center;
      }
      .header-collapse {
        cursor: pointer;
      }
      .header-breadcrumb {
        margin-left: 10px;
      }
      .header-menu {
        text-align: right;
      }
    }
    .el-main {
      overflow-y: auto;
      display: flex;
      padding: 10px;
      flex: 1;
    }
    .el-main::-webkit-scrollbar {
      width: 0px;
    }
  }
}
</style>