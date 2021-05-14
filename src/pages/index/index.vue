<template>
  <view class="content">
    <image :src="$url + '/index/1-1.png'" mode="widthFix"></image>
    <image
      :src="$url + '/index/1-2.png'"
      mode="widthFix"
      class="animate1 brief_tip"
    ></image>
    <!-- 轮播 -->
    <view class="swiperBox">
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
    </view>
    <!-- 滚动资讯 -->
    <image
      :src="$url + '/index/1-3.png'"
      mode="widthFix"
      class="animate1 scrollImg"
    ></image>
    <view class="Scrolling">
      <notice-bar style="width:100%" :list="lists"></notice-bar>
    </view>
    <image
      class="scrollMore"
      :src="$url + '/index/1-4.png'"
      mode="widthFix"
      @click="scrollMore"
    ></image>
    <!-- 热门活动 -->
    <view class="hotEvent">
      <block v-for="(item, index) in 3" :key="index">
        <view class="eventop">
          <image
            class="hotTitle"
            :src="$url + '/index/1-6.png'"
            mode="scaleToFill"
          ></image>
        </view>
      </block>
    </view>
    <!-- 项目推荐 -->
    <view class="project">
      <image
        class="itemTitle"
        :src="$url + '/index/title2.png'"
        mode="widthFix"
      ></image>
      <image
        class="itemMore"
        :src="$url + '/index/more.png'"
        mode="widthFix"
        @click="itemReco"
      ></image>
    </view>
    <image
      class="animate1 callUp"
      :src="$url + '/yunxi/tubiao-13.png'"
      mode="widthFix"
      @click="callUp"
    ></image>
    <image
      class="animate1 navigation"
      :src="$url + '/yunxi/tubiao-14.png'"
      mode="widthFix"
      @click="nav"
    ></image>
    <!-- 家书专栏 -->
    <view class="letter">
      <view class="letterTop">
        <image
          class="itemTitle"
          :src="$url + '/index/title3.png'"
          mode="widthFix"
        ></image>
        <image
          class="itemMore"
          :src="$url + '/index/more.png'"
          mode="widthFix"
          @click="itemMore"
        ></image>
      </view>
      <view class="letterBottom">
        <view
          class="list"
          v-for="item in BookMenu"
          :key="item.RowID"
          @click="itemClick(item.LinkUrl, item.Them)"
        >
          <text class="listTitle me-text-beyond-multi1">{{ item.Them }} </text>
          <image :src="$url + '/index/tag.png'" mode="widthFix"></image>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
var that;
var app = getApp();
import { shareMixins } from "@/static/mixins/share.js";
import { getResquest } from "@/utils/api.js";
import noticeBar from "@/components/notice-bar/notice-bar.vue";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: "https://wb.jaas.ac.cn/SmallExePic/TianAn.SE.210513/img",
      indicatorDots: true,
      autoplay: true,
      interval: 3000,
      duration: 1000,
      circular: true,
      lists: ["123", "456", "789"],
      a: ["123"],
      BookMenu: [],
      width: "380rpx",
      height: "84rpx",
      background: "#fff",
      color: "#000",
      latitude: 31.7346395644246,
      longitude: 120.79397824265288,
      speed: 30,
      openid: "",
      head: [],
      Activity: [],
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
    itemClick(src, title) {
      uni.navigateTo({
        url: `/pages/webview/index?src=${src}&title=${title}`,
      });
    },
    handlCard(i, val, e) {
      uni.navigateTo({
        url: "/pages/index/carddetail/index?num=" + i + "&val=" + val,
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
    // 家属专栏更多
    itemMore() {
      uni.navigateTo({
        url: "/pages/yunxi/realTimeInfo/index?i=2&title=家属专栏",
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    // 项目推荐更多
    itemReco() {
      uni.switchTab({
        url: "/pages/yunxi/index",
      });
    },
    // 品牌资讯更多
    scrollMore() {
      uni.navigateTo({
        url: "/pages/yunxi/realTimeInfo/index?i=1&title=品牌资讯",
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    // 热门活动
    events(href, e) {},
    // 热门活动更多
    hotMore() {
      uni.navigateTo({
        url: "/pages/index/event/index",
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
  },
  components: {
    noticeBar,
  },
};
</script>

<style lang="scss" scoped>
.content {
  background: #fff;
  position: relative;
  width: 100%;
  height: auto;
  .brief_tip {
    width: 40%;
    left: 30%;
    top: 15.5%;
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
    top: 20%;
  }
  .Scrolling {
    position: absolute;
    width: 351rpx;
    height: 60rpx;
    left: 213rpx;
    top: 20%;
    display: flex;
    overflow: hidden;
    align-items: center;
  }
  .scrollMore {
    width: 100rpx;
    position: absolute;
    top: 20.7%;
    left: 581rpx;
  }
  .hotEvent {
    position: absolute;
    width: 666rpx;
    height: 30%;
    top: 26.3%;
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
        -webkit-border-image: linear-gradient(#2ed, #f80) 20 20;
        border-radius: 20rpx;
        width: 100%;
        height: 100%;
      }
    }
  }
  .project {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    height: 60rpx;
    width: 666rpx;
    position: absolute;
    top: 57%;
    left: 43rpx;
    .itemTitle {
      width: 40%;
    }
    .itemMore {
      width: 16%;
    }
  }
  .navigation {
    width: 90rpx;
    top: 73.2%;
    left: 614rpx;
  }
  .callUp {
    width: 160rpx;
    top: 70.5%;
    left: 200rpx;
  }
  .letter {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
    width: 666rpx;
    height: 280rpx;
    position: absolute;
    top: 82%;
    left: 43rpx;
    .letterTop {
      width: 100%;
      height: 60rpx;
      display: flex;
      align-items: flex-end;
      justify-content: space-between;
      .itemTitle {
        width: 40%;
      }
      .itemMore {
        width: 16%;
      }
    }
    .letterBottom {
      height: 200rpx;
      width: 100%;
      .list {
        width: 100%;
        height: 80rpx;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        border-bottom: 1px solid #e4e4e4;
        image {
          width: 24rpx;
        }
        .listTitle {
          font-size: 24rpx;
          max-width: 600rpx;
          overflow: hidden;
        }
      }
    }
  }
}
</style>
