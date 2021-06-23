<template>
  <view class="content">
    <swiper
      class="swiper"
      :indicator-dots="indicatorDots"
      :autoplay="autoplay"
      :circular="circular"
      :interval="interval"
      :duration="duration"
    >
      <block v-for="(item, index) in swiperList" :key="index">
        <swiper-item>
          <view class="swiper-item">
            <image :src="item.imgUrl" mode="scaleToFill"></image>
          </view>
        </swiper-item>
      </block>
    </swiper>
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
  props: {
    swiperList: {
      type: Array,
      default() {
        return [];
      },
    },
    indicatorDots: {
      type: Number,
      default: Boolean,
    },
    duration: {
      type: Number,
      default: 140,
    },
    autoplay: {
      type: Boolean,
      default: true,
    },
    interval: {
      type: Number,
      default: true,
    },
    duration: {
      type: Number,
      default: 140,
    },
  },
  created() {},
  mounted() {},
  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  .swiper {
    position: absolute;
    width: 666rpx;
    height: 406rpx;
    .swiper-item {
      display: flex;
      align-items: center;
      justify-content: center;
      color: #fff;
      position: relative;
      width: 100%;
      height: 100%;
      text {
        position: absolute;
        z-index: 1;
      }
    }
  }
}
</style>
