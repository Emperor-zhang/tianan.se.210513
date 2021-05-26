<template>
  <view class="content">
    <image
      :src="$url + 'mine/18-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <scroll-view class="listBox" scroll-y v-if="list.length != 0">
      <block v-for="(item, index) in 8" :key="index">
        <view class="item-box">
          <view class="itemTop">
            <image
              :src="$url + 'mine/18-2.png'"
              mode="scaleToFill"
              class="leftImg"
            ></image>
            <image
              :src="$url + 'mine/18-3.png'"
              mode="scaleToFill"
              class="rightImg"
            ></image>
          </view>
          <view class="itemBottom">
            预约时间：2021-05-24 12:00
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
  watch: {
    num: function(newValue, oldValue) {
      /**实时监听数据的变化，也可以兼容听方法名（api->watch） */
    },
  },
  methods: {},
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
    top: 100rpx;
    height: 1200rpx;
    .item-box {
      height: 300rpx;
      display: flex;
      flex-direction: column;
      justify-content: flex-start;
      align-items: flex-start;
      border-bottom: 1px solid #9ca2a5;
      margin-bottom: 50rpx;
      .itemTop {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        height: 230rpx;
        .leftImg {
          width: 230rpx;
          height: 230rpx;
        }
        .rightImg {
          width: 426rpx;
          height: 230rpx;
        }
      }
      .itemBottom {
        margin-top: 20rpx;
        font-size: 28rpx;
        text-align: left;
        color: #566369;
      }
    }
  }
}
</style>
