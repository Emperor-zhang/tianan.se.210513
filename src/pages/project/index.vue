<template>
  <view class="content">
    <image
      :src="$url + 'project/4-1_01.png'"
      mode="widthFix"
      class="img"
    ></image>
    <image
      :src="$url + 'project/4-1_02.png'"
      mode="widthFix"
      class="img"
    ></image>
    <image
      :src="$url + 'project/4-1_03.png'"
      mode="widthFix"
      class="img"
    ></image>
    <image
      :src="$url + 'project/4-1_04.png'"
      mode="widthFix"
      class="img"
    ></image>
    <image
      :src="$url + 'project/4-1_05.png'"
      mode="widthFix"
      class="img"
    ></image>
    <image
      :src="$url + 'project/4-1_06.png'"
      mode="widthFix"
      class="img"
    ></image>
    <!-- 轮播图 -->
    <swiper-img
      v-show="flag == 1"
      class="swiperbox"
      :swiperList="swiperList"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :duration="duration"
      :urls="urls"
    ></swiper-img>
    <!-- video -->
    <swiper-video
      v-show="flag == 3"
      class="swiperbox"
      :swiperList="swiperListVideo"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :duration="duration"
    ></swiper-video>
    <!-- vr -->
    <swiper-vr
      v-show="flag == 2"
      class="swiperbox"
      :swiperList="swiperListVr"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :duration="duration"
    ></swiper-vr>
    <!-- swiper按钮 -->
    <view class="btn">
      <view :class="['btnimg', flag == 1 ? 'active' : '']" @click="btn(1)"
        >图片</view
      >
      <view :class="['btnvr', flag == 2 ? 'active' : '']" @click="btn(2)"
        >VR</view
      >
      <view :class="['btnvideo', flag == 3 ? 'active' : '']" @click="btn(3)"
        >视频</view
      >
    </view>
    <view class="phone">025-88018889</view>
    <image
      :src="$url + 'project/4-3-1.png'"
      mode="widthFix"
      class="tell"
      @click="call"
    ></image>
    <view class="addr">南京市溧水区秦淮大道288号</view>
    <image
      :src="$url + 'project/4-3.png'"
      mode="widthFix"
      class="navi"
      @click="nav"
    ></image>
    <view class="house">建筑面积约89-170m²多维空间/约265m²创新顶复</view>
    <view class="price">30000</view>
    <view class="developer">天安(南京)投资发展有限公司</view>
    <!-- 销售动态 -->
    <image
      :src="$url + 'project/4-4.png'"
      mode="widthFix"
      class="animate1 scrollImg"
    ></image>
    <view class="Scrolling">
      <notice-bar style="width:100%" :list="listUp"></notice-bar>
    </view>
    <image
      class="scrollMore"
      :src="$url + 'project/4-6.png'"
      mode="widthFix"
      @click="scrollMore"
    ></image>
    <!-- 实时资讯 -->
    <image
      :src="$url + 'project/4-5.png'"
      mode="widthFix"
      class="animate1 scrollImg1"
    ></image>
    <view class="Scrolling1">
      <notice-bar style="width:100%" :list="listDown"></notice-bar>
    </view>
    <image
      class="scrollMore1"
      :src="$url + 'project/4-6.png'"
      mode="widthFix"
      @click="scrollMore1"
    ></image>
    <!-- 楼盘详情 -->
    <view class="housesInfo">
      <image class="animate1 housesPoster" :src="buildingUrl"></image>
      <view class="housesTitle">{{ buildingName }}</view>
      <view class="buildingType">建筑类别:{{ buildingType }}</view>
      <view class="buildingFace">装修状况:{{ buildingFace }}</view>
      <view class="buildingAge">产权年限:{{ buildingAge }}</view>
    </view>
    <!-- 楼盘详情更多 -->
    <image
      class="animate1 more2"
      :src="$url + 'project/4-10.png'"
      mode="widthFix"
      @click="houseDetail"
    ></image>
    <!-- 项目相册 -->
    <view class="ProjectAlbum">
      <block v-for="(item, index) in album" :key="index">
        <view class="albumBox">
          <image class="albumImg" :src="item.imgUrl" mode="scaleToFill"></image>
          <view class="intro">
            {{ item.imgName }}
          </view>
        </view>
      </block>
    </view>
    <!-- 项目相册更多 -->
    <image
      class="animate1 more3"
      :src="$url + 'project/4-10.png'"
      mode="widthFix"
      @click="albumMore"
    ></image>
    <!--周边配套 地图 -->
    <view class="page-section page-section-gap">
      <map
        style="width: 100%; height: 100%;"
        :latitude="latitude"
        :longitude="longitude"
        :markers="covers"
        :enable-3D="true"
        :enable-rotate="true"
      >
      </map>
    </view>
    <!-- 销售顾问 -->
    <view class="SalesConsultant">
      <block v-for="item in adviser" :key="item.adviserID">
        <view class="box" @click="counselorCard(item.adviserID)">
          <image
            class="animate1 SalesUrl"
            :src="item.imgUrl"
            mode="aspectFill"
          ></image>
          <text class="SaleName">{{ item.name }}</text>
          <image
            class="animate1 setTel"
            :src="$url + 'project/7-2.png'"
            mode="widthFix"
            @click.stop="callUp(item.phone)"
          ></image>
          <!-- <image
            class="animate1 setWechat"
            :src="$url + 'project/7-3.png'"
            mode="widthFix"
            @click.stop="addWechat(item.weixin)"
          ></image> -->
        </view>
      </block>
    </view>
    <!-- 销售顾问更多 -->
    <image
      class="animate1 more5"
      :src="$url + 'project/4-10.png'"
      mode="widthFix"
      @click="salesMore"
    ></image>
    <yangr-msg
      v-if="yangrMsgShow"
      :title="title"
      type="success"
      :info="info"
      btn="确定"
      @yangrMsgEvent="closeYangrMsg"
    ></yangr-msg>
    <!-- 底部按钮 -->
    <view class="bottomNav">
      <view class="leftBox">
        <image
          class="share"
          :src="$url + 'project/4-11.png'"
          mode="widthFix"
        ></image>
        <button open-type="share" class="btnShare"></button>
        <image
          class="tellUs"
          :src="$url + 'project/4-12.png'"
          mode="widthFix"
          @click="call"
        ></image>
        <image
          class="navi"
          :src="$url + 'project/4-13.png'"
          mode="widthFix"
          @click="nav"
        ></image>
      </view>
      <view class="rightBox">
        <image
          class="order"
          :src="$url + 'project/4-14.png'"
          mode="widthFix"
          @click="order"
        ></image>
      </view>
    </view>
  </view>
</template>
<script>
var that;
import swiperImg from "@/components/swiperImg/index.vue";
import swiperVr from "@/components/swiperVr/index.vue";
import swiperVideo from "@/components/swiperVideo/index.vue";
import { shareMixins } from "@/static/mixins/share.js";
import noticeBar from "@/components/notice-bar/notice-bar.vue";
import yangrMsg from "@/components/yangr-msg/yangr-msg.vue";
import { getResquest } from "@/utils/api.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      indicatorDots: true,
      autoplay: false,
      interval: 2000,
      duration: 500,
      circular: true,
      openid: "",
      urls: [],
      flag: 1,
      swiperList: [],
      swiperListVr: [],
      swiperListVideo: [],
      adviser: [],
      album: [],
      iphone: "025-88018889",
      listUp: ["789456,1234567,456789456"],
      listDown: ["789456,1234567,456789456"],
      title: "复制成功",
      info: "微信号已复制，请到微信中粘贴添加好友",
      meetState: 2,
      yangrMsgShow: false,
      navTitle: "销售动态",
      navTitle1: "实时资讯",
      buildingUrl:
        "https://wb.jaas.ac.cn/SmallExePic/TianAn.SE.210513/img/project/4-7.png",
      buildingName: "天安·云境",
      buildingType: "高层",
      buildingFace: "精装",
      buildingAge: "70年",
      latitude: 31.643004,
      longitude: 119.053075,
      covers: [
        {
          id: 0,
          latitude: 31.643004,
          longitude: 119.053075,
          width: 20,
          height: 30,
          callout: {
            content: "天安·云境", //文本
            color: "#eb5405", //文本颜色
            borderRadius: 3, //边框圆角
            borderWidth: 1, //边框宽度
            borderColor: "#eb5405", //边框颜色
            bgColor: "#ffffff", //背景色
            padding: 5, //文本边缘留白
            textAlign: "center", //文本对齐方式。有效值: left, right, center
            scale: 20,
          },
          iconPath:
            "https://wb.jaas.ac.cn/SmallExePic/love.se.210301/img/yunxi/tubiao-72.png",
        },
      ],
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
    that.Convert();
    that.GetSwiperList();
    that.MeetCheck();
  },
  onShow() {
    that.meetState = uni.getStorageSync("meetState");
  },

  components: { noticeBar, yangrMsg, swiperImg, swiperVideo, swiperVr },
  methods: {
    btn(id) {
      that.flag = id;
    },
    MeetCheck() {
      getResquest("CommonHelper.ashx?Method=MeetCheck", {
        OpenID: that.openid,
      }).then((res) => {
        console.log(res);
        if (res.data[0].Opt == 1) {
          that.meetState = 1;
          uni.setStorageSync("meetState", 1);
          //你已提交 预约看房的 信息，请到“我的”页面“我的预约”中查看，或等待销售人员联系
        } else if (res.data[0].Opt == 2) {
          that.meetState = 2;
          uni.setStorageSync("meetState", 2);
          //可以进入预约界面
        }
        that.GetSimpleInfo();
      });
    },
    // 楼盘相册/置业顾问缩略接口
    GetSimpleInfo() {
      getResquest("CommonHelper.ashx?Method=GetSimpleInfo", {
        PageIndex: 2, //1 表示首页的前三活动；2 表示项目信息页的 楼盘相册前二或置业顾问前二
      }).then((res) => {
        that.adviser = res.data[0].Adviser;
        that.album = res.data[0].Images;
      });
    },
    // 轮播
    GetSwiperList() {
      getResquest("CommonHelper.ashx?Method=GetSwiperList", {
        PageIndex: 2, //1表示首页的轮播图，2表示项目信息页的轮播图
      }).then((res) => {
        console.log(res);
        res.data[0].Header.forEach((val) => {
          if (val.imgType == 1) {
            that.swiperList.push(val);
          } else if (val.imgType == 2) {
            that.swiperListVr.push(val);
          } else if (val.imgType == 3) {
            that.swiperListVideo.push(val);
          }
        });
        that.urls = that.swiperList.map((res) => {
          return res.imgUrl;
        });
      });
    },

    change(e) {
      console.log(e);
    },
    // 拨打电话
    callUp(phone) {
      uni.makePhoneCall({
        phoneNumber: phone,
      });
    },
    // 拨打电话
    call() {
      uni.makePhoneCall({
        phoneNumber: that.iphone,
      });
    },
    // 预约看房
    order() {
      if (that.meetState == 1) {
        uni.showToast({
          title: "您已预约，请到我的预约中查看",
          icon: "none",
        });
      } else if (that.meetState == 2 || !that.meetState) {
        uni.navigateTo({
          url: "/pages/project/pactHouse/index",
          animationType: "pop-in",
          animationDuration: 200,
        });
      }
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
      that.longitude = that.covers[0].longitude = $z * Math.cos($theta);
      that.latitude = that.covers[0].latitude = $z * Math.sin($theta);
    },
    // 导航
    nav() {
      uni.openLocation({
        latitude: that.latitude,
        longitude: that.longitude,
        name: "天安·云境",
        address: "南京市溧水区秦淮大道288号",
        scale: 15,
      });
    },
    // 销售动态
    scrollMore() {
      uni.navigateTo({
        url: `/pages/index/projectInfo/index?title=${that.navTitle}&num=4`,
      });
    },
    // 实时资讯
    scrollMore1() {
      uni.navigateTo({
        url: `/pages/index/projectInfo/index?title=${that.navTitle1}&num=3`,
      });
    },
    //楼盘详情
    houseDetail() {
      uni.navigateTo({
        url: `/pages/project/house-detail/index`,
      });
    },
    // 项目相册
    albumMore() {
      uni.navigateTo({
        url: `/pages/project/projectAlbum/index`,
      });
    },
    //销售顾问更多
    salesMore() {
      uni.navigateTo({
        url: "/pages/project/salesConsultant/index",
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    // 顾问名片------需要带参数
    counselorCard(id) {
      console.log(id);
      uni.navigateTo({
        url: "/pages/project/counselorCard/index?AdviserID=" + id,
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    // 加微信
    addWechat(wechat) {
      console.log(wechat);
      uni.setClipboardData({
        data: wechat,
        success: function(res) {
          uni.hideToast();
          that.yangrMsgShow = true;
        },
        fail(err) {
          console.log(err);
          uni.showToast({
            title: "复制失败，请稍后再试！",
            icon: "none",
          });
        },
      });
    },
    // 复制微信成功弹窗
    closeYangrMsg() {
      that.yangrMsgShow = false;
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .img {
    display: flex;
    flex-wrap: wrap;
  }
  .swiperbox {
    position: absolute;
    top: 1%;
    width: 666rpx;
    left: 42rpx;
    height: 406rpx;
  }
  .btn {
    position: absolute;
    width: 250rpx;
    left: 250rpx;
    top: 7.2%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    view {
      background-color: #ccc;
      width: 80rpx;
      height: 40rpx;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 10rpx;
    }
  }
  .phone {
    position: absolute;
    top: 12.3%;
    color: #56656c;
    font-size: 20rpx;
    left: 192rpx;
  }
  .tell {
    position: absolute;
    top: 12.2%;
    width: 120rpx;
    right: 38%;
  }
  .addr {
    position: absolute;
    top: 12.87%;
    color: #56656c;
    font-size: 20rpx;
    left: 192rpx;
  }
  .navi {
    position: absolute;
    top: 12.8%;
    width: 100rpx;
    right: 22%;
  }
  .house {
    position: absolute;
    top: 13.5%;
    font-size: 22rpx;
    left: 160rpx;
  }
  .price {
    position: absolute;
    top: 14.15%;
    font-size: 22rpx;
    left: 160rpx;
  }
  .developer {
    position: absolute;
    top: 14.75%;
    font-size: 22rpx;
    left: 179rpx;
  }
  .scrollImg {
    width: 666rpx;
    left: 42rpx;
    top: 16.7%;
  }
  .Scrolling {
    position: absolute;
    width: 351rpx;
    height: 60rpx;
    left: 213rpx;
    top: 16.7%;
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .scrollMore {
    width: 100rpx;
    position: absolute;
    top: 17%;
    left: 581rpx;
  }
  .scrollImg1 {
    width: 666rpx;
    left: 42rpx;
    top: 19%;
  }
  .Scrolling1 {
    position: absolute;
    width: 351rpx;
    height: 60rpx;
    left: 213rpx;
    top: 19%;
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .scrollMore1 {
    width: 100rpx;
    position: absolute;
    top: 19.25%;
    left: 581rpx;
  }
  .housesInfo {
    position: absolute;
    width: 666rpx;
    height: 204rpx;
    left: 42rpx;
    top: 22.6%;
    color: #5a6567;
    background-color: #fff;
    .housesPoster {
      width: 240rpx;
      height: 100%;
    }
    .housesTitle {
      position: absolute;
      left: 260rpx;
      top: 10%;
      font-size: 26rpx;
    }
    .buildingType {
      left: 260rpx;
      top: 33%;
      position: absolute;
      font-size: 24rpx;
      color: #777;
    }
    .buildingFace {
      left: 260rpx;
      top: 53%;
      position: absolute;
      font-size: 24rpx;
      color: #777;
    }
    .buildingAge {
      left: 260rpx;
      top: 75%;
      position: absolute;
      font-size: 24rpx;
      color: #777;
    }
  }
  .more2 {
    position: absolute;
    width: 120rpx;
    top: 21.6%;
    left: auto;
    right: 42rpx;
    z-index: 1;
  }
  .ProjectAlbum {
    position: absolute;
    width: 666rpx;
    left: 42rpx;
    height: 342rpx;
    top: 28.3%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .albumBox {
      width: 48%;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      box-shadow: 2px 2px 6px 2px #ccc;
      border-bottom-right-radius: 20rpx;
      border-bottom-left-radius: 20rpx;
      .albumImg {
        width: 100%;
        height: 75%;
      }
      .intro {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 25%;
        color: #777;
        font-size: 28rpx;
        border-bottom-right-radius: 20rpx;
        border-bottom-left-radius: 20rpx;
      }
    }
  }
  .more3 {
    width: 120rpx;
    top: 27.3%;
    left: auto;
    right: 40rpx;
    z-index: 1;
  }
  .page-section {
    position: absolute;
    width: 674rpx;
    left: 38rpx;
    height: 480rpx;
    top: 36%;
  }
  .SalesConsultant {
    position: absolute;
    width: 666rpx;
    height: 200rpx;
    top: 93.6%;
    left: 42rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .box {
      border-radius: 10rpx;
      position: relative;
      width: 48%;
      height: 100%;
      box-shadow: 2rpx 2rpx 28rpx 2rpx #ccc;
      .SaleName {
        position: absolute;
        font-size: 30rpx;
        color: rgb(77, 77, 77);
        left: 174rpx;
        top: 22rpx;
      }
      .SalesUrl {
        width: 140rpx;
        top: 30rpx;
        left: 10rpx;
        height: 148rpx;
      }
      .setTel {
        width: 100rpx;
        top: 78rpx;
        left: 174rpx;
      }
      .setWechat {
        width: 100rpx;
        top: 140rpx;
        left: 174rpx;
      }
    }
  }
  .more5 {
    width: 120rpx;
    top: 92.7%;
    left: auto;
    right: 40rpx;
    z-index: 1;
  }
  .bottomNav {
    position: absolute;
    width: 100%;
    height: 120rpx;
    top: auto;
    bottom: 0;
    .leftBox {
      position: absolute;
      width: 400rpx;
      left: 42rpx;
      height: 100%;

      .share {
        width: 50rpx;
        position: absolute;
        left: 50rpx;
        top: 20rpx;
      }
      .btnShare {
        width: 50rpx;
        height: 78rpx;
        position: absolute;
        left: 50rpx;
        top: 20rpx;
        opacity: 0;
      }
      .tellUs {
        width: 50rpx;
        position: absolute;
        left: 170rpx;
        top: 20rpx;
      }
      .navi {
        width: 50rpx;
        top: 20rpx;
        position: absolute;
        left: 290rpx;
      }
    }
    .rightBox {
      position: absolute;
      width: 250rpx;
      right: 42rpx;
      left: auto;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      .order {
        width: 230rpx;
      }
    }
  }
  .active {
    background-color: #ff0000 !important;
    color: #fff;
  }
}
</style>
