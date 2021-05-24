<template>
  <view class="content"> </view>
</template>
<script>
var that;
export default {
  data() {
    return {};
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {},
  components: {},

  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 646rpx;
  height: 100rpx;
}
</style>
