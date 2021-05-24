<template>
  <view class="content">
    <image :src="`${$url}project/9-1.png`" mode="widthFix"></image>
    <!-- <image class="animate1 imgUrl" :src="imgUrl" mode="widthFix"></image> -->
    <image
      class="animate1 imgUrl"
      :src="`${$url}weChat.jpeg`"
      mode="widthFix"
    ></image>
    <text class="name">姓名：张孝义{{ name }}</text>
    <text class="tel">15251763792{{ tel }}</text>
    <text class="addr">南京市溧水区秦淮大道288号{{ addr }}</text>
    <!-- 咨询 -->
    <image
      class="animate1 counsel"
      :src="$url + 'project/9-2.png'"
      mode="widthFix"
      @click="counsel"
    ></image>
    <!-- 导航 -->
    <image
      class="animate1 navigation"
      :src="$url + 'project/9-3.png'"
      mode="widthFix"
      @click="navigation"
    ></image>

    <image
      class="animate1 goodHouseMore"
      :src="$url + 'project/9-4.png'"
      mode="widthFix"
      @click="goodHouseMore"
    ></image>
    <view class="housesInfo">
      <image
        class="animate1 housesPoster"
        src="https://wb.jaas.ac.cn/Love.SE.210204/LoveWeb/UpLoad/fengmian.png"
      ></image>
    </view>

    <view class="btnBottom">
      <image
        class="animate1 share"
        :src="$url + 'project/9-5.png'"
        mode="widthFix"
      ></image>
      <button open-type="share" class="btnShare"></button>
      <image
        class="animate1 create"
        :src="$url + 'project/9-6.png'"
        mode="widthFix"
        @click="create"
      ></image>
      <image
        class="animate1 order"
        :src="$url + 'project/9-7.png'"
        mode="widthFix"
        @click="order"
      ></image>
    </view>
  </view>
</template>
<script>
var that;
var app = getApp();
import { shareMixins } from "@/static/mixins/share.js";
import { getResquest } from "@/utils/api.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      shareData: {
        path: "", // 分享的页面路径
      },
      $url: this.url,
      imgUrl: "",
      name: "",
      tel: "",
      addr: "",
      id: "",
      openid: "",
      latitude: "",
      longitude: "",
      meetstate: "",
    };
  },
  onLoad(e) {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid") || app.globalData.openid;
    // that.meetstate = e.meetstate;
    that.meetstate = uni.getStorageSync("meetState");
    console.log(e);
  },
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    that.id =
      currentPage.options.UserID ||
      app.globalData.userid ||
      uni.getStorageSync("userid");
    // that.login();
  },

  components: {},
  methods: {
    // 预约看房
    order() {
      if (that.meetstate == 1) {
        uni.showToast({
          title: "您已预约，请到我的预约中查看",
          icon: "none",
        });
      } else if (that.meetstate == 2) {
        uni.navigateTo({
          url: "/pages/project/pactHouse/index",
          animationType: "pop-in",
          animationDuration: 200,
        });
      }
    },
    // 生成海报
    create() {
      uni.navigateTo({
        url: "/pages/project/createNotice/index?id=" + that.id,
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    // 咨询
    counsel() {
      uni.makePhoneCall({
        phoneNumber: that.tel,
      });
    },
    // 拨打电话
    callUp() {
      uni.makePhoneCall({
        phoneNumber: that.tel,
      });
    },
    // 导航
    navigation() {
      uni.openLocation({
        latitude: that.latitude,
        longitude: that.longitude,
        name: "天安·云境",
        address: "南京市溧水区秦淮大道288号",
        scale: 15,
      });
    },
    // 好房推荐
    goodHouseMore() {
      uni.switchTab({
        url: `/pages/project/projectAlbum/index`,
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    GetPosterInfo() {
      getResquest("CommonHelper.ashx?Method=GetPosterInfo", {
        ProjectCode: "yljx", //项目编号  云溪九里
        OpenID: that.openid, //换取openid
        UserID: that.id, //销售人员
      }).then((res) => {
        console.log(res);
        that.name = res.data[0].Adviser[0].name;
        that.tel = res.data[0].Adviser[0].phone;
        that.imgUrl = res.data[0].Adviser[0].imgUrl;
        that.latitude = res.data[0].Project[0].lat;
        that.longitude = res.data[0].Project[0].long;
        that.shareData.path =
          "/pages/project/counselorCard/index?UserID=" + that.id;
        that.Convert();
      });
    },
    Convert() {
      /**
       * 百度地图转腾讯地图
       */
      var $x_pi = (3.14159265358979324 * 3000.0) / 180.0;
      var $x = that.longitude - 0.0065;
      var $y = that.latitude - 0.006;
      var $z = Math.sqrt($x * $x + $y * $y) - 0.00002 * Math.sin($y * $x_pi);
      var $theta = Math.atan2($y, $x) - 0.000003 * Math.cos($x * $x_pi);
      that.longitude = $z * Math.cos($theta);
      that.latitude = $z * Math.sin($theta);
    },
    login() {
      if (!that.openid) {
        uni.login({
          provider: "weixin",
          success: function(loginRes) {
            console.log(loginRes);
            getResquest("CommonHelper.ashx?Method=GetOpenID", {
              Code: loginRes.code,
            }).then((res) => {
              console.log(res);
              uni.setStorageSync("openid", res.data[0].OpenID);
              app.globalData.openid = res.data[0].OpenID;
              that.openid = res.data[0].OpenID;
              that.GetPosterInfo();
            });
          },
        });
      } else {
        that.GetPosterInfo();
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .imgUrl {
    position: absolute;
    width: 120rpx;
    top: 23%;
    left: 110rpx;
    border-radius: 100rpx;
  }
  .name {
    position: absolute;
    font-size: 30rpx;
    color: #5a6569;
    top: 27%;
    left: 270rpx;
  }
  .tel {
    position: absolute;
    font-size: 28rpx;
    color: #777;
    top: 37%;
    left: 142rpx;
  }
  .addr {
    position: absolute;
    font-size: 28rpx;
    color: #777;
    top: 42.5%;
    left: 142rpx;
  }
  .counsel {
    width: 130rpx;
    top: 36.5%;
    left: 556rpx;
  }
  .navigation {
    width: 130rpx;
    top: 42.3%;
    left: 556rpx;
  }
  .goodHouseMore {
    position: absolute;
    width: 130rpx;
    top: 58%;
    left: 556rpx;
  }
  .housesInfo {
    position: absolute;
    width: 646rpx;
    height: 194rpx;
    left: 52rpx;
    top: 63.67%;
    color: #5a6567;
    .housesPoster {
      width: 220rpx;
      height: 100%;
    }
  }
  .btnBottom {
    position: absolute;
    top: 90.5%;
    height: 126rpx;
    left: 0;
    width: 100%;
  }
  .share {
    width: 100rpx;
    left: 42rpx;
    top: 34rpx;
  }
  .create {
    width: 100rpx;
    left: 180rpx;
    top: 34rpx;
  }

  .order {
    width: 250rpx;
    left: auto;
    right: 42rpx;
    top: 30rpx;
  }
  .btnShare {
    position: absolute;
    width: 100rpx;
    left: 42rpx;
    top: 34rpx;
    height: 84rpx;
    opacity: 0;
  }
}
</style>
