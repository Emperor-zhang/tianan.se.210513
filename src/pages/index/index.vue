<template>
  <view class="content">
    <image :src="$url + 'index/1-1.png'" mode="widthFix"></image>
    <!-- 轮播 -->
    <!-- <view class="swiperBox">
      <swiper
        class="swiper"
        :indicator-dots="indicatorDots"
        :autoplay="autoplay"
        :interval="interval"
        :duration="duration"
        :circular="circular"
      >
        <block v-for="item in head" :key="item.RowID">
          <swiper-item>
            <image
              class="swiper-item"
              :src="item.ImgUrl"
              mode="widthFix"
            ></image>
          </swiper-item>
        </block>
      </swiper>
    </view> -->
    <image
      :src="$url + 'index/1-2.png'"
      mode="widthFix"
      class="animate1 brief_tip"
      @click="brief"
    ></image>
    <!-- 滚动资讯 -->
    <image
      :src="$url + 'index/1-3.png'"
      mode="widthFix"
      class="animate1 scrollImg"
    ></image>
    <view class="Scrolling">
      <notice-bar style="width:100%" :list="listLeft"></notice-bar>
    </view>
    <image
      class="scrollMore"
      :src="$url + 'index/1-4.png'"
      mode="widthFix"
      @click="scrollMore"
    ></image>
    <!-- 热门活动 -->
    <view class="hotEvent">
      <block v-for="(item, index) in 3" :key="index">
        <view class="eventop">
          <image
            class="hotTitle"
            :src="$url + 'index/1-6.png'"
            mode="scaleToFill"
          ></image>
        </view>
      </block>
    </view>
    <!-- 积分商城 -->
    <view class="shop">
      <block v-for="(item, index) in 2" :key="index">
        <view class="out_box">
          <view class="box">
            <image
              class="itemTitle"
              :src="$url + 'index/1-7.png'"
              mode="scaleToFill"
            ></image>
            <view class="text_box">
              <view class="gift_name">礼品名称</view>
              <view class="total">积分:</view>
            </view>
          </view>
        </view>
      </block>
    </view>
    <!-- 项目推荐 -->
    <view class="project">
      <image
        class="itemTitle"
        :src="$url + 'index/1-8.png'"
        mode="scaleToFill"
      ></image>
    </view>
    <image
      class="projectMore"
      :src="$url + 'index/1-5.png'"
      mode="widthFix"
      @click="projectMore"
    ></image>
    <!-- 家书专栏 -->
    <view class="letter">
      <scroll-up-down
        :height="'50rpx'"
        :borderColor="'#f4f4f4'"
        :backgroundColor="'#f4f4f4'"
        :list="listUp"
      ></scroll-up-down>
    </view>
    <image
      class="letterMore"
      :src="$url + 'index/1-5.png'"
      mode="widthFix"
      @click="letterMore"
    ></image>
  </view>
</template>

<script>
var that;
var app = getApp();
import { shareMixins } from "@/static/mixins/share.js";
import { getResquest } from "@/utils/api.js";
import noticeBar from "@/components/notice-bar/notice-bar.vue";
import scrollUpDown from "@/components/my-scroll-up/scroll-up-down.vue";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      circular: true,
      listLeft: ["123", "456", "789"],
      listUp: ["123", "456", "789"],
      openid: "",
    };
  },
  onLoad() {
    that = this;
    that.openid = uni.getStorageSync("openid");
    // that.HomeMsg();
    // that.login();
    uni.showTabBar();
  },
  onShow() {},
  methods: {
    // 品牌简介
    brief() {
      uni.navigateTo({
        url: "/pages/index/brand/index",
      });
    },
    // 项目咨询更多
    scrollMore() {
      uni.navigateTo({
        url: "/pages/index/projectInfo/index",
      });
    },
    // 拨打电话
    callUp() {
      uni.makePhoneCall({
        phoneNumber: "13914046275",
      });
    },
    // 导航
    nav() {
      uni.openLocation({
        latitude: that.latitude,
        longitude: that.longitude,
        name: "爱情云溪九里",
        address: "常熟市海虞镇人民路与华新路交汇处",
        scale: 15,
      });
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
              that.HomeMsg();
              that.HomeHead();

              // that.Check();
            });
          },
        });
      } else {
        that.HomeMsg();
        that.HomeHead();
        // that.Check();
      }
    },
    HomeMsg() {
      getResquest("CommonHelper.ashx?Method=HomeMsg&MsgType=all", {}).then(
        (res) => {
          // console.log(res);
          that.lists = res.data[0].BrandMenu.map((result) => {
            return result.Them;
          });
          that.BookMenu = res.data[0].BookMenu;
        }
      );
    },
    HomeHead() {
      getResquest("CommonHelper.ashx?Method=HomeHead", {}).then((res) => {
        // console.log(res);
        that.head = res.data[0].Head;
        that.Activity = res.data[0].Activity;
        uni.showTabBar();
      });
    },
  },
  components: {
    noticeBar,
    scrollUpDown,
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #f4f4f4;
  position: relative;
  width: 100%;
  height: auto;
  .brief_tip {
    width: 40%;
    left: 30%;
    top: 16%;
  }
  .swiperBox {
    position: absolute;
    top: 3%;
    width: 666rpx;
    left: 40rpx;
    height: 313rpx;
    .swiper {
      width: 100%;
      height: 100%;
    }
  }
  .scrollImg {
    width: 666rpx;
    left: 42rpx;
    top: 21%;
  }
  .Scrolling {
    position: absolute;
    width: 351rpx;
    height: 60rpx;
    left: 213rpx;
    top: 21%;
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .scrollMore {
    width: 100rpx;
    position: absolute;
    top: 21.7%;
    left: 581rpx;
  }
  .hotEvent {
    position: absolute;
    width: 666rpx;
    height: 30%;
    top: 28.3%;
    left: 42rpx;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    flex-wrap: wrap;
    .eventop {
      border-radius: 20rpx;
      width: 100%;
      height: 31%;
      overflow: hidden;
      .hotTitle {
        border: 4rpx solid #ccc;
        -webkit-border-image: linear-gradient(#6dc7c5, #e2be7b) 20 20;
        border-radius: 20rpx;
        width: 100%;
        height: 100%;
      }
    }
  }
  .shop {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    height: 400rpx;
    width: 666rpx;
    position: absolute;
    top: 62.5%;
    left: 42rpx;
    .out_box {
      width: 320rpx;
      height: 360rpx;
      box-sizing: border-box;
      padding: 4rpx;
      border-radius: 20rpx;
      background-image: -webkit-linear-gradient(top, #6dc7c5 3%, #e2be7b 70%);
      .box {
        border-radius: 20rpx;
        width: 100%;
        height: 100%;
        background-color: #f4f4f4;
        image {
          width: 100%;
          height: 280rpx;
        }
        .text_box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 40rpx;
          color: #55636e;
          font-size: 26rpx;
          margin-top: 10rpx;
          padding: 0 10rpx;
          .gift_name {
            width: 170rpx;
            text-align: left;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .total {
            width: 130rpx;
            text-align: left;
          }
        }
      }
    }
  }
  .project {
    position: absolute;
    width: 264rpx;
    height: 264rpx;
    top: 80.45%;
    overflow: hidden;
    left: 42rpx;
    border-radius: 20rpx;
    image {
      width: 100%;
      height: 100%;
    }
  }
  .projectMore {
    position: absolute;
    width: 120rpx;
    top: 78%;
    right: 52rpx;
  }
  .letter {
    position: absolute;
    width: 400rpx;
    height: 50rpx;
    top: 94.95%;
    left: 175rpx;
  }
  .letterMore {
    position: absolute;
    width: 120rpx;
    top: 92.5%;
    right: 52rpx;
  }
}
</style>
