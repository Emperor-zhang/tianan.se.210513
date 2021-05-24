<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'mine/14-1.png'" mode="widthFix"></image>
    <image
      :src="$url + 'mine/14-2.png'"
      mode="widthFix"
      class="animate1 img1"
    ></image>
    <image
      class="animate1 nickUrl"
      :src="`${$url}weChat.jpeg`"
      mode="widthFix"
    ></image>
    <image
      :src="$url + 'mine/14-3.png'"
      mode="widthFix"
      class="animate1 img2"
    ></image>
    <text class="nickName">昵称</text>
    <image
      :src="$url + 'mine/14-4.png'"
      mode="widthFix"
      class="animate1 img3"
    ></image>
    <text class="sex">男</text>
    <image
      :src="$url + 'mine/14-5.png'"
      mode="widthFix"
      class="animate1 img4"
    ></image>
    <text class="tel">15251763792</text>
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
  .img1 {
    top: 50rpx;
  }
  .nickUrl {
    width: 70rpx;
    border-radius: 100rpx;
    top: 54rpx;
    left: auto;
    right: 60rpx;
  }
  .img2 {
    top: 150rpx;
  }
  .nickName {
    position: absolute;
    width: 400rpx;
    left: auto;
    right: 60rpx;
    top: 170rpx;
    font-size: 28rpx;
    text-align: right;
  }
  .img3 {
    top: 250rpx;
  }
  .sex {
    position: absolute;
    width: 400rpx;
    font-size: 28rpx;
    left: auto;
    right: 60rpx;
    top: 270rpx;
    text-align: right;
  }
  .img4 {
    top: 350rpx;
  }
  .tel {
    position: absolute;
    width: 400rpx;
    font-size: 28rpx;
    left: auto;
    right: 60rpx;
    top: 370rpx;
    text-align: right;
  }
}
</style>
