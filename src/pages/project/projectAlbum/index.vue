<template>
  <view class="content">
    <image :src="$url + 'project/6-1.png'" mode="widthFix"></image>
    <view class="swiperMain">
      <view class="swiperHead">
        <!--组件-->
        <swiper-nav-bar
          :scrollIntoView="scrollIntoView"
          :swiperTabList="swiperTabList"
          :swiperTabIdx="swiperTabIdx"
          :currentSwiperWidth="currentSwiperWidth"
          :currentSwiperHeight="currentSwiperHeight"
          :swiperCurrentSize="swiperCurrentSize"
          :swiperColor="swiperColor"
          :swiperCurrentColor="swiperCurrentColor"
          :currentSwiperLineShow="currentSwiperLineShow"
          :currentSwiperLineActiveWidth="currentSwiperLineActiveWidth"
          :currentSwiperLineActiveHeight="currentSwiperLineActiveHeight"
          :currentSwiperLineActiveBg="currentSwiperLineActiveBg"
          :currentSwiperLineAnimatie="currentSwiperLineAnimatie"
          v-if="swiperTabList.length > 1"
          @change="CurrentTab"
        >
        </swiper-nav-bar>
        <!--组件-->
      </view>

      <!--内容-->
      <view
        class="swiperCont"
        :style="{ paddingTop: currentSwiperHeight + 'rpx' }"
      >
        <swiper
          class="swiper"
          :style="{ height: mainHeight + 'rpx' }"
          :current="swiperTabIdx"
          @change="SwiperChange"
        >
          <swiper-item
            class="swiperItem"
            v-for="item in swiperTabList"
            :key="item.imgType"
          >
            <scroll-view class="listBox" scroll-y="true">
              <view class="box">
                <block v-for="(item1, index1) in item.children" :key="index1">
                  <image
                    :src="item1.imgUrl"
                    mode="widthFix"
                    class="preview"
                    @click="previewImage(index1)"
                  ></image>
                </block>
              </view>
            </scroll-view>
          </swiper-item>
        </swiper>
      </view>
      <!--内容-->
    </view>
  </view>
</template>
<script>
import swiperNavBar from "@/components/swiperNavBar/index.vue";
import { getResquest } from "@/utils/api.js";
import { shareMixins } from "@/static/mixins/share.js";
var that;
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      //导航
      scrollIntoView: 0, //设置哪个方向可滚动，则在哪个方向滚动到该元素
      swiperTabList: [], //导航列表
      swiperTabIdx: 0,
      swiperCurrentSize: "36rpx", //导航的字体大小
      swiperColor: "#000", //导航栏字体未选中前颜色
      swiperCurrentColor: "#ff7133", //选中当前导航栏字体颜色
      currentSwiperWidth: "25%", //当前导航的宽度 % upx rpx px  （导航超出可左右滑动 ）
      currentSwiperHeight: 54, //当前导航的高度度 rpx px
      mainHeight: 690, //全屏或者局部滑动设置的高度
      currentSwiperLineShow: true, //是否显示导航栏的线条 （线条距离标题太近的话可自行修改.swiperLine的css）
      currentSwiperLineActiveBg: "#ff7133", //当前选中的导航栏线条颜色
      currentSwiperLineActiveWidth: "120rpx", //当前选中的导航栏线条的宽度 upx rpx px
      currentSwiperLineActiveHeight: "6rpx", //当前选中的导航栏线条的高度度 upx rpx px
      currentSwiperLineAnimatie: 300, //当前选中的导航栏线条过渡效果
      allImg: [],
      img1: [], //效果图
      img2: [], //户型图
      img3: [], //区位图
      img4: [], //实景图
      //（全屏出现滚动条 去掉paddingTop 但导航栏会遮住部分内容 自行改.swiperCont .swiper里css）
      //也可获取导航栏的高度  屏幕高度减去导航栏高度 = 你的内容全屏高度  不会出现滚动条
    };
  },
  onLoad() {
    that = this;
    that.getAblum();
  },
  onShow() {},
  components: { swiperNavBar },
  methods: {
    //tab点击事件 自行完善需要的代码
    CurrentTab: function(index, item) {
      if (index == 0) {
        that.allImg = that.img1;
      } else if (index == 1) {
        that.allImg = that.img2;
      } else if (index == 2) {
        that.allImg = that.img3;
      } else if (index == 3) {
        that.allImg = that.img4;
      }
      that.swiperTabIdx = index;
      that.scrollIntoView = Math.max(0, index - 1);
    },
    //滑动事件  自行完善需要的代码
    SwiperChange: function(e) {
      if (e.detail.current == 0) {
        that.allImg = that.img1;
      } else if (e.detail.current == 1) {
        that.allImg = that.img2;
      } else if (e.detail.current == 2) {
        that.allImg = that.img3;
      } else if (e.detail.current == 3) {
        that.allImg = that.img4;
      }
      that.swiperTabIdx = e.detail.current;
      that.scrollIntoView = Math.max(0, e.detail.current - 1);
    },
    // 预览图片
    previewImage(index) {
      uni.previewImage({
        current: index,
        urls: that.allImg,
      });
    },
    getAblum() {
      getResquest("CommonHelper.ashx?Method=GetImgInfo", {
        ProjectCode: "yljx",
      }).then((res) => {
        console.log(res);
        that.swiperTabList = res.data;
        res.data.forEach((result) => {
          that.swiperTabList.push(result);
        });

        console.log(that.swiperTabList);

        that.allImg = that.img1 = res.data[0].children.map((result) => {
          return result.imgUrl;
        });
        that.img2 = res.data[1].children.map((result) => {
          return result.imgUrl;
        });
        that.img3 = res.data[1].children.map((result) => {
          return result.imgUrl;
        });
        that.img4 = res.data[1].children.map((result) => {
          return result.imgUrl;
        });
      });
    },
  },
};
</script>
<style scoped>
page {
}
.content {
  position: relative;
  width: 100%;
  height: 100%;
  background-color: #f8f8f8;
}
.swiperMain {
  position: absolute;
  top: 23%;
  left: 54rpx;
  width: 642rpx;
}
.swiperHead {
  z-index: 10;
  width: 100%;
  font-size: 34rpx;
}
.swiperHead scroll-view {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  white-space: nowrap;
}
.swiperTab {
  display: inline-flex;
  flex-direction: column;
  text-align: center;
}
.swiperCont {
  width: 100%;
  padding-top: 70rpx;
}

/* #ifdef H5 */
.swiperHead {
  position: fixed;
  top: 44px;
  z-index: 10;
  width: 100%;
  background: #ffffff;
}
/* #endif */

.swiper {
  width: 100%;
  height: 400rpx;
}
.swiperItem {
  height: 400rpx;
  line-height: 400rpx;
  overflow: auto;
  text-align: center;
  color: #ffffff;
  font-size: 30upx;
}
.swiperItem image {
  width: 100%;
  height: 100%;
  display: block;
}
.listBox {
  width: 100%;
  height: 100%;
}
.box {
  position: relative;
  width: 100%;
  display: flex;
  align-items: flex-start;
  flex-wrap: wrap;
  justify-content: space-between;
}
.preview {
  width: 300rpx !important;
  margin: 20rpx 0;
}
</style>
