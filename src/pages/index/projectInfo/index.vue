<template>
  <view class="content">
    <image :src="$url + 'index/3-1.png'" mode="widthFix"></image>
    <scroll-view scroll-y class="list-box" @scrolltolower="pulling">
      <block v-for="(item, index) in 10" :key="index">
        <view class="item-box">
          <view class="title">收藏标题</view>
          <view class="collect" @click="collect">
            <text class="collect_text">{{
              flag == 1 ? "收藏" : "已收藏"
            }}</text>
            <image
              :src="`${$url}index/3-${flag == 1 ? '2' : '3'}.png`"
              mode="widthFix"
            ></image>
          </view>
        </view>
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
      flag: 1,
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {},
  components: {},
  methods: {
    //   收藏
    collect() {
      if (that.flag == 1) {
        that.flag = 2;
      } else {
        that.flag = 1;
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .list-box {
    position: absolute;
    width: 620rpx;
    left: 65rpx;
    height: 830rpx;
    top: 30%;
    .item-box {
      width: 100%;
      height: 100rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: #63747e;
      border-bottom: 1px solid #63747e;
      .title {
        width: 490rpx;
        font-size: 30rpx;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
      }
      .collect {
        width: 130rpx;
        display: flex;
        align-items: center;
        justify-content: space-around;
        .collect_text {
          font-size: 26rpx;
        }
        image {
          width: 34rpx;
        }
      }
    }
  }
}
</style>
