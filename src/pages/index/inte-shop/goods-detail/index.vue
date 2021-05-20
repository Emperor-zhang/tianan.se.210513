<template>
  <view class="content">
    <image :src="$url + 'index/11-1.png'" mode="widthFix"></image>
    <image
      :src="$url + 'index/11-2.png'"
      mode="scaleToFill"
      class="animate1 imgBox"
    ></image>
    <view class="shopname">商品名称</view>
    <view class="integration">123456</view>
    <view class="addr">领奖地址</view>
    <view class="tel">领取电话</view>
    <image
      :src="$url + 'index/11-3.png'"
      mode="widthFix"
      class="animate1 btn1"
    ></image>
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
  .imgBox {
    width: 100%;
    height: 596rpx;
  }
  .btn1 {
    width: 400rpx;
    left: 153rpx;
    top: 80%;
    animation: icon 2s linear infinite;
  }
  .shopname {
    position: absolute;
    top: 43.5%;
    left: 200rpx;
    width: 350rpx;
    font-size: 24rpx;
  }
  .integration {
    position: absolute;
    top: 43.7%;
    left: auto;
    width: 100rpx;
    font-size: 24rpx;
    right: 0rpx;
  }
  .addr {
    position: absolute;
    top: 48.7%;
    left: 200rpx;
    width: 500rpx;
    font-size: 24rpx;
    height: 70rpx;
  }
  .tel {
    position: absolute;
    top: 53.8%;
    left: 200rpx;
    width: 350rpx;
    font-size: 24rpx;
  }
}
</style>
