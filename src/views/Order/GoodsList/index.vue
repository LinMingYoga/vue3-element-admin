<template>
  <div class="goods-list">
    <div id="xg"></div>
  </div>
</template>

<script>
import { onMounted, onBeforeUnmount, getCurrentInstance, ref } from "vue";
import Player from "xgplayer";

export default {
    setup() {
        const { proxy } = getCurrentInstance();

        let player;
        onMounted(() => {
            initPlayer();
        });

        onBeforeUnmount(() => {
            player.destroy();
            player = null;
        });

        const initPlayer = () => {
          player = new Player({
            id: "xg",
            url: "https://sf1-cdn-tos.huoshanstatic.com/obj/media-fe/xgplayer_doc_video/mp4/xgplayer-demo-360p.mp4",
            poster: "https://img03.sogoucdn.com/app/a/07/f13b5c3830f02b6db698a2ae43ff6a67",
            fitVideoSize: "auto",
            fluid: false /* 流式布局 */,
            // download: true /* 视频下载 */
            // pip: true /* 画中画 */,
            errorTips: `请<span>刷新页面</span>试试` /* 自定义错误提示 */,
            lang: "zh-cn"
          });
        };

        return {};
    }
}
</script>

<style lang="scss" scoped>
  #xg {
    width: 100%;
    height: 100%;
  }
</style>