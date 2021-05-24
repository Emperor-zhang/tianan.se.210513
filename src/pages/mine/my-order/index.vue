<template>
  <view class="content">
    <image
      :src="$url + 'mine/18-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <scroll-view class="listBox"></scroll-view>
  </view>
</template>
<script>
var that;
export default {
  data() {
    return {
      $url: this.url,
      list: ["1"],
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {},
  components: {},
  watch: {
    num: function(newValue, oldValue) {
      /**实时监听数据的变化，也可以兼容听方法名（api->watch） */
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .listBox {
    position: absolute;
    width: 656rpx;
    left: 52rpx;
    top: 100rpx;
    height: 1200rpx;
  }
}
</style>
