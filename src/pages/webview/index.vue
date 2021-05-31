<template>
  <view class="content">
    <web-view :webview-styles="webviewStyles" :src="src"> </web-view>
  </view>
</template>
<script>
var that;
import { getResquest } from "@/utils/api.js";
export default {
  data() {
    return {
      webviewStyles: {
        progress: {
          color: "#FF3333",
        },
      },
      openid: "",
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
    // console.log(currentPage.options);
    that.src = currentPage.options.url;
    that.openid = uni.getStorageSync("openid");
    that.msgId = currentPage.options.msgId;

    uni.setNavigationBarTitle({
      title: currentPage.options.title,
    });
    that.SaveIntegral();
  },
  components: {},
  methods: {
    SaveIntegral() {
      getResquest("CommonHelper.ashx?Method=SaveIntegral", {
        OpenID: that.openid,
        IntegralType: 4,
        MsgID: that.msgId,
      }).then((result) => {
        console.log(result);
        if (result.data[0].Opt == 1) {
          uni.showToast({
            title: "积分+10",
            mask: true,
          });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
