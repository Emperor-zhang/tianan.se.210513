<template>
  <view class="content">
    <image :src="src" mode="widthFix"></image>
  </view>
</template>
<script>
var that;
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      src: "",
    };
  },
  onLoad(res) {
    that = this; /**自定义组件中要onLoad换成created*/
    console.log(res);
    that.src = res.url;
    uni.setNavigationBarTitle({
      title: res.name,
    });
  },
  onShow() {},
  components: {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
}
</style>
