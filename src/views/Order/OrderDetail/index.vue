<template>
  <WEditor :defaultText="defaultText" @richHtml="getRichHtml" />
</template>

<script>
import { onMounted, ref } from "vue";
import WEditor from "../../../components/WEditor.vue";

export default {
    components: { WEditor },
    setup() {
        const defaultText = ref("");
        const richText = ref("");

        onMounted(() => {
            // 初始化数据
            defaultText.value = "<h1>Editor</h1>";
        });

        const getRichHtml = nv => {
            richText.value = nv;
        };

        return { defaultText, getRichHtml };
    }
};
</script>
