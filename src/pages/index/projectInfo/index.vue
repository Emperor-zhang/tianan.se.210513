<template>
  <view class="content">
    <state-counsel :getnum="num" :gettitle="title"></state-counsel>
  </view>
</template>
<script>
var that;
import stateCounsel from "@/components/state-counsel/index.vue";
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      title: "",
      num: "",
    };
  },
  onLoad(res) {
    console.log(res);
    that = this; /**自定义组件中要onLoad换成created*/
    that.num = res.num;
    that.title = res.title;
    uni.setNavigationBarTitle({
      title: res.title,
    });
  },
  onShow() {},
  components: { stateCounsel },
  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
}
</style>
