<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'shop/13-1-1.png'" mode="widthFix"></image>
    <image
      :src="$url + 'shop/13-1-2.png'"
      mode="widthFix"
      class="submit"
      @click="submit"
    ></image>
    <image
      :src="$url + 'shop/13-1-3.png'"
      mode="widthFix"
      class="nameImg"
    ></image>
    <image
      :src="$url + 'shop/13-1-4.png'"
      mode="widthFix"
      class="telImg"
    ></image>
    <input type="text" value="" class="name" @input="handleName" />
    <input type="text" value="" class="tel" @input="handlePhone" />
  </view>
</template>
<script>
var that;
import { getResquest } from "@/utils/api.js";
export default {
  data() {
    return {
      $url: this.url,
      name: "",
      tel: "",
      openid: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
  },
  onShow() {
    that.login();
  },
  components: {},
  methods: {
    moveHandle() {},
    handleName(e) {
      that.name = e.detail.value;
    },
    handlePhone(e) {
      that.tel = e.detail.value;
    },
    submit() {
      that.checkout();
    },
    login() {
      if (!that.openid) {
        uni.login({
          provider: "weixin",
          success: function(loginRes) {
            getResquest("CommonHelper.ashx?Method=GetOpenID", {
              Code: loginRes.code,
            }).then((res) => {
              console.log(res);
              uni.setStorageSync("openid", res.data[0].OpenID);
              that.openid = res.data[0].OpenID;
            });
          },
        });
      }
    },
    Save() {
      getResquest("CommonHelper.ashx?Method=Save", {
        OpenID: that.openid,
        Name: that.name, //姓名
        Phone: that.tel, //手机
      }).then((res) => {
        console.log(res);
        if (res.data[0].Opt == 1) {
          let pages = getCurrentPages();
          let prevPage = pages[pages.length - 2]; //上一页页面实例
          prevPage.$vm.state = res.data[0].PhoneState;
          uni.showToast({
            title: "正在提交",
            mask: true,
          });
          setTimeout(function() {
            uni.hideToast();
            uni.navigateBack({
              delta: 1,
            });
          }, 1500);
        } else if (res.data[0].Opt == 2) {
          toast("您已报过名！");
        }
      });
    },
    checkout() {
      if (that.name == "") {
        that.toast("请输入您的姓名！");
        return;
      }
      if (that.tel == "") {
        that.toast("请输入手机号码！");
        return;
      }
      if (!/^1[3|4|5|6|7|8|9]\d{9}$/.test(that.tel) || that.tel.length != 11) {
        that.toast("电话格式不正确");
        return false;
      }
      that.Save();
    },
    toast(tit) {
      uni.showToast({
        title: tit,
        mask: true,
        icon: "none",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .submit {
    width: 250rpx;
    position: absolute;
    top: 800rpx;
    left: 250rpx;
    -webkit-animation: bounceInUp 1.5s linear both;
  }
  .nameImg {
    position: absolute;
    width: 500rpx;
    left: 125rpx;
    top: 400rpx;
  }
  .telImg {
    position: absolute;
    width: 500rpx;
    left: 125rpx;
    top: 550rpx;
  }
  .name {
    position: absolute;
    width: 400rpx;
    left: 225rpx;
    top: 400rpx;
    font-size: 32rpx;
    color: #56656c;
  }
  .tel {
    position: absolute;
    width: 400rpx;
    left: 225rpx;
    font-size: 32rpx;
    top: 550rpx;
    color: #56656c;
  }
}
</style>
