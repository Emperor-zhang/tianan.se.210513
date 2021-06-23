<template>
  <view class="content">
    <web-view :webview-styles="webviewStyles" :src="src"> </web-view>
  </view>
</template>
<script>
var that;
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },

      src: "",
      title: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    that.src = currentPage.options.src;
    uni.setNavigationBarTitle({
      title: currentPage.options.title,
    });
  },
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
