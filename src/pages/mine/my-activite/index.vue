<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image
      :src="$url + 'mine/16-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <scroll-view scroll-y class="box" v-if="list.length != 0">
      <block v-for="(item, index) in 10" :key="index">
        <view class="item" @click="detailInfo">
          <image
            :src="$url + 'mine/16-2.png'"
            mode="widthFix"
            class="activeImg"
          ></image>
          <view class="activeInfo">
            <view class="activeName">活动名称：<text>活动名称</text></view>
            <view class="activeTime">活动时间：<text>2021-05-21</text></view>
          </view>
        </view>
      </block>
    </scroll-view>
    <image
      v-if="list.length == 0"
      :src="$url + 'mine/20-1.png'"
      mode="widthFix"
    ></image>
  </view>
</template>
<script>
var that;
export default {
  data() {
    return {
      $url: this.url,
      list: [],
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {},
  components: {},
  methods: {
    moveHandle() {},
    detailInfo() {
      uni.navigateTo({
        url: "/pages/mine/my-activite/detailInfo/index",
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .box {
    position: absolute;
    width: 600rpx;
    height: 900rpx;
    top: 240rpx;
    left: 75rpx;
    .item {
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      margin-bottom: 50rpx;
      .activeInfo {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 28rpx;
        color: #58656d;
        margin-top: 10rpx;
        .activeName {
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .activeTime {
          width: 50%;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
