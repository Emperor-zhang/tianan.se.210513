<template>
  <view class="content">
    <image :src="$url + 'project/5-1.png'" mode="widthFix"></image>
  </view>
</template>
<script>
var that;
export default {
  data() {
    return {
      $url: this.url,
    };
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
  width: 100%;
}
</style>
