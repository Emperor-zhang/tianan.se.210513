<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image
      :src="$url + 'mine/18-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <scroll-view
      class="listBox"
      scroll-y
      :style="'height:' + height + 'rpx'"
      v-if="list.length != 0"
    >
      <block v-for="(item, index) in list" :key="index">
        <view class="item-box">
          <view class="itemTop">
            <image
              :src="$url + 'index/1-8.png'"
              mode="scaleToFill"
              class="leftImg"
            ></image>
            <image
              :src="item.ImgUrl"
              mode="scaleToFill"
              class="rightImg"
            ></image>
          </view>
          <view class="itemBottom">
            <text>预约时间：{{ item.MeetDate }}</text>
            <text
              >状态：<text>{{ item.IsFlag }}</text></text
            >
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
import { getResquest } from "@/utils/api.js";
var getRpx = require("@/utils/utils.js");
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      list: [],
      openid: "",
      height: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.height = getRpx.getRpx() * uni.getSystemInfoSync().windowHeight - 130;
    that.openid = uni.getStorageSync("openid");
    that.$nextTick(function() {
      that.GetMineInfo();
    });
  },
  onShow() {},
  components: {},
  watch: {
    num: function(newValue, oldValue) {
      /**实时监听数据的变化，也可以兼容听方法名（api->watch） */
    },
  },
  methods: {
    GetMineInfo() {
      getResquest("CommonHelper.ashx?Method=GetMineInfo", {
        MineID: 5, //我的：1我的信息，2我的积分，3我的活动，4我的礼品，5 我的预约，6我的收藏
        OpenID: that.openid,
      }).then((res) => {
        console.log(res);
        that.list = res.data;
      });
    },
    moveHandle() {},
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
        width: 100%;
        text-align: left;
        color: #566369;
        display: flex;
        align-items: center;
        justify-content: space-between;
        text {
          text {
            color: #8a615d;
          }
        }
      }
    }
  }
}
</style>
