<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'mine/13-1.png'" mode="widthFix" class="img"></image>
    <image
      class="animate1 nickUrl"
      :src="`${isLogin ? nickurl : $url + 'white.png'}`"
      mode="widthFix"
      @click="handle(7)"
    ></image>
    <text v-if="isLogin" class="nickName">{{ nickname }}</text>
    <view v-else class="login" @click="handle(7)">未登录</view>
    <view class="imgBox">
      <block v-for="(item, index) in 7" :key="index">
        <image
          :src="$url + 'mine/13-' + (index + 3) + '.png'"
          mode="widthFix"
          @click="handle(index)"
        ></image>
      </block>
    </view>
  </view>
</template>
<script>
var that;
import { shareMixins } from "@/static/mixins/share.js";
import { getResquest } from "@/utils/api.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      isLogin: false,
      nickurl: "",
      nickname: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.isLogin = uni.getStorageSync("isLogin");
  },
  onShow() {
    that.isLogin = uni.getStorageSync("isLogin");
    that.nickurl = uni.getStorageSync("nickurl");
    that.nickname = uni.getStorageSync("nickname");
  },
  components: {},
  methods: {
    moveHandle() {},
    handle(ind) {
      switch (ind) {
        case 0:
          // 我的信息
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/mine/my-info/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
        case 1:
          // 我的积分
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/mine/my-integral/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }

          break;
        case 2:
          // 我的活动
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/mine/my-activite/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
        case 3:
          // 我的礼品
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/mine/my-gift/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
        case 4:
          // 我的预约
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/mine/my-order/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
        case 5:
          // 我的收藏
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/mine/my-collect/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
        case 6:
          // 积分规则
          if (that.isLogin) {
            uni.navigateTo({
              url: "/pages/shop/rule/index",
              animationType: "pop-in",
              animationDuration: 200,
            });
          } else {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
        default:
          if (!that.isLogin) {
            uni.navigateTo({
              url: "/pages/login/index",
            });
          }
          break;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .nickUrl {
    width: 150rpx;
    border-radius: 200rpx;
    left: 300rpx;
    top: 5%;
  }
  .nickName {
    position: absolute;
    font-size: 36rpx;
    width: 100%;
    text-align: center;
    top: 17%;
    color: #fff;
    left: 0%;
  }
  .login {
    position: absolute;
    font-size: 36rpx;
    width: 100%;
    text-align: center;
    top: 17%;
    color: #fff;
    left: 0%;
  }
  .imgBox {
    position: absolute;
    width: 100%;
    left: 0;
    top: 328rpx;
    height: 550rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  }
}
</style>
