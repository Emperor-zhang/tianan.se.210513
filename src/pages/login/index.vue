<template>
  <view class="content">
    <view class="container">
      <view class="pageBox" style="padding: 10% 10%">
        <view
          style="
            height: 1px;
            width: 100%;
            margin: 20px auto;
            background: #e8e8e8;
          "
        ></view>
        <view style="margin: 40px 0">
          <text style="color: #000000; font-weight: bold"
            >申请获取以下权限</text
          >
          <text style="color: #c1b6b4">获得你的公开信息（昵称，头像等）</text>
        </view>
        <view class="clickButton">
          <button class="btnThink" @click="btnThink">再想想</button>
          <button
            class="btn"
            open-type="getUserInfo"
            type="primary"
            @getuserinfo="bindGetUserInfo"
          >
            授权登录
          </button>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
var that;
var app = getApp();
import { getResquest } from "@/utils/api.js";
export default {
  data() {
    return {
      userid: "",
      foodid: "",
      userNickurl: "",
      nickurl: "",
      nickname: "",
      openid: "",
      power: 0,
    };
  },
  onLoad(options) {
    that = this;
  },
  onShow() {
    that.openid = uni.getStorageSync("openid");
  },
  components: {},
  methods: {
    SaveNickName() {
      getResquest("CommonHelper.ashx?Method=SaveNickName", {
        OpenID: that.openid,
        NickName: that.nickname, //昵称
        NickUrl: that.nickurl, //头像
      }).then((res) => {
        uni.setStorageSync("nickname", res.data[0].NickName);
        uni.setStorageSync("nickurl", res.data[0].NickUrl);
        uni.showLoading({
          title: "正在登陆",
        });
        console.log(res);
        setTimeout(function() {
          uni.navigateBack({
            delta: 1,
          });
        }, 1500);
      });
    },
    // 授权
    bindGetUserInfo(e) {
      let that = this;
      console.log(e.detail.userInfo);
      if (e.detail.errMsg == "getUserInfo:ok") {
        uni.setStorageSync("power", 1);
        app.globalData.power = 1;
        that.nickname = e.detail.userInfo.nickName;
        that.nickurl = e.detail.userInfo.avatarUrl;
        uni.setStorageSync("nickname", e.detail.userInfo.nickName);
        uni.setStorageSync("nickurl", e.detail.userInfo.avatarUrl);
        uni.navigateBack({
          delta: 1,
        });
        // that.SaveNickName();
      } else {
        //点击了拒绝
      }
    },
    btnThink() {
      uni.navigateBack({
        delta: 1,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  width: 750rpx;
  height: 100vh;
  position: relative;
  .container {
    width: 100%;
    height: 100%;
    background: #fff;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1;
    .pageBox {
      padding: 10%;
    }
    .clickButton {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-around;
      line-height: 40px;
    }
    .btn {
      width: 30%;
      color: #ffffff;
      background: #1aad19;
      text-align: center;
      border-radius: 20px;
      margin: auto;
      font-size: 30rpx;
    }
    .btnThink {
      width: 30%;
      color: #ffffff;
      background: #ccc;
      text-align: center;
      border-radius: 20px;
      margin: auto;
      font-size: 30rpx;
    }
  }
}
</style>
