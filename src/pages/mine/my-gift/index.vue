<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image
      :src="$url + 'mine/17-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>

    <scroll-view class="box" scroll-y v-if="list.length != 0">
      <blobk v-for="(item, index) in list" :key="index">
        <view class="item">
          <image
            :src="item.GoodsUrl"
            mode="scaleToFill"
            class="leftImg"
          ></image>
          <view class="showMsg">
            <image
              :src="$url + 'mine/17-3.png'"
              mode="scaleToFill"
              class="rightImg"
            ></image>
            <view class="showInfo">
              <view class="giftName">礼品名称:{{ item.GoodsName }}</view>
              <view class="giftInte">兑换积分:{{ item.Integral }}</view>
              <view class="giftState">兑换状态:{{ item.Flag }}</view>
            </view>
            <view></view>
          </view>
        </view>
      </blobk>
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
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      list: [],
      openid: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
  },
  onShow() {
    that.GetMineInfo();
  },
  components: {},
  methods: {
    moveHandle() {},
    GetMineInfo() {
      getResquest("CommonHelper.ashx?Method=GetMineInfo", {
        MineID: 4, //我的：1我的信息，2我的积分，3我的活动，4我的礼品，5 我的预约，6我的收藏
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
  .box {
    position: absolute;
    width: 646rpx;
    left: 52rpx;
    top: 100rpx;
    height: 1000rpx;
    .item {
      width: 100%;
      height: 200rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 30rpx;
      .leftImg {
        width: 200rpx;
        height: 100%;
      }
      .showMsg {
        position: relative;
        width: 446rpx;
        height: 100%;
        .rightImg {
          width: 446rpx;
          height: 100%;
        }
        .showInfo {
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-start;
          flex-direction: column;
          justify-content: space-around;
          font-size: 24rpx;
          padding-left: 10rpx;
          .giftName {
            width: 420rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .giftInte {
            width: 420rpx;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
          .giftState {
            width: 420rpx;
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
}
</style>
