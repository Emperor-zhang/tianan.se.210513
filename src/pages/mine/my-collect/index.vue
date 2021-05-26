<template>
  <view class="content">
    <scroll-view scroll-y class="listBox" :style="'height:' + height + 'px'">
      <block v-for="(item, index) in 20" :key="index">
        <view class="item" @click="handleItem">稿件标题</view>
      </block>
    </scroll-view>
  </view>
</template>
<script>
var that;
export default {
  data() {
    return {
      $url: this.url,
      list: [],
      height: 0,
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.height = uni.getSystemInfoSync().windowHeight * 0.9;
  },
  onShow() {},
  components: {},
  methods: {
    handleItem() {},
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .listBox {
    position: absolute;
    width: 656rpx;
    left: 52rpx;
    top: 50rpx;
    height: 80%;
    .item {
      width: 100%;
      height: 90rpx;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: 30rpx;
      color: #566369;
      border-bottom: 1px solid #ccc;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
    }
  }
}
</style>
