<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'mine/14-1.png'" mode="widthFix"></image>
    <image
      :src="$url + 'mine/14-2.png'"
      mode="widthFix"
      class="animate1 img1"
    ></image>
    <image class="animate1 nickUrl" :src="nickurl" mode="widthFix"></image>
    <image
      :src="$url + 'mine/14-3.png'"
      mode="widthFix"
      class="animate1 img2"
    ></image>
    <text class="nickName">{{ nickname }}</text>
    <image
      :src="$url + 'mine/14-4.png'"
      mode="widthFix"
      class="animate1 img3"
    ></image>
    <text class="sex">{{ gender }}</text>
    <image
      v-if="false"
      :src="$url + 'mine/14-5.png'"
      mode="widthFix"
      class="animate1 img4"
    ></image>
    <text v-if="false" class="tel">{{ tel }}</text>
  </view>
</template>
<script>
import { getResquest } from "@/utils/api.js";
var that;
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      nickname: "",
      nickurl: "",
      gender: "",
      tel: "",
      openid: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
    that.$nextTick(function() {
      that.GetMineInfo();
    });
  },
  onShow() {},
  components: {},
  methods: {
    GetMineInfo() {
      getResquest("CommonHelper.ashx?Method=GetMineInfo", {
        MineID: 1, //我的：1我的信息，2我的积分，3我的活动，4我的礼品，5 我的预约，6我的收藏
        OpenID: that.openid,
      }).then((res) => {
        console.log(res);
        that.tel = res.data[0].Phone;
        that.nickname = res.data[0].NickName;
        that.nickurl = res.data[0].NickUrl;
        that.gender = uni.getStorageSync("gender");
      });
    },
  },
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
