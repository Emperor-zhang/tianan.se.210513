<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <scroll-view
      v-if="list.length != 0"
      scroll-y
      class="listBox"
      :style="'height:' + height + 'px'"
    >
      <block v-for="(item, index) in list" :key="index">
        <view class="item" @click="handleItem(item.LinkUrl, item.Them)">{{
          item.Them
        }}</view>
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
import { getResquest } from "@/utils/api.js";
export default {
  data() {
    return {
      $url: this.url,
      list: [],
      height: 0,
      openid: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.height = uni.getSystemInfoSync().windowHeight * 0.9;
    that.openid = uni.getStorageSync("openid");
    that.$nextTick(function() {
      that.GetMineInfo();
    });
  },
  onShow() {},
  components: {},
  methods: {
    handleItem(url, tit) {
      uni.navigateTo({
        url: `/pages/webview/index?url=${url}&title=${tit}`,
      });
    },
    moveHandle() {},
    GetMineInfo() {
      getResquest("CommonHelper.ashx?Method=GetMineInfo", {
        MineID: 6, //我的：1我的信息，2我的积分，3我的活动，4我的礼品，5 我的预约，6我的收藏
        OpenID: that.openid,
      }).then((res) => {
        console.log(res);
        that.list = res.data;
      });
    },
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
