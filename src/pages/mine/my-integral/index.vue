<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image
      :src="$url + 'mine/15-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <view class="search" v-if="list.length != 0">
      <uni-search-bar
        :placeholder="placeholder"
        :radius="radius"
        :bgColor="bgColor"
        @input="handleSearch"
      >
      </uni-search-bar>
    </view>
    <scroll-view
      class="listBox"
      scroll-y
      v-if="list.length != 0"
      :style="'height:' + height + 'rpx'"
    >
      <block v-for="(item, index) in val == '' ? list : newList" :key="index">
        <view class="itemBox">
          <view class="item-top">
            <view class="title">{{ item.ThingName }}</view>
            <view class="inte"
              >{{
                item.Integral.toString().startsWith("-")
                  ? item.Integral
                  : "+" + item.Integral
              }}分</view
            >
          </view>
          <view class="time">{{ item.CreateDate }}</view>
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
var getRpx = require("@/utils/utils.js");
import { getResquest } from "@/utils/api.js";
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      placeholder: "标题搜索",
      radius: "50",
      bgColor: "#fff",
      height: "",
      val: "",
      list: [],
      newList: [],
      oldList: [],
      num: 0,
      openid: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.height = getRpx.getRpx() * uni.getSystemInfoSync().windowHeight - 400;
    that.openid = uni.getStorageSync("openid");
    that.$nextTick(function() {
      that.GetMineInfo();
    });
  },
  onShow() {},
  components: {},

  methods: {
    handleSearch(e) {
      that.val = e;
      that.newList = [];
      if (e != "") {
        that.list.map((res) => {
          that.num++;
          if (res.ThingName.includes(e) == true) {
            that.newList.push(res);
            that.num = 0;
          } else {
            if (that.num >= that.list.length) {
              that.newList = [];
            }
          }
        });
      } else {
        that.newList = [];
      }
    },
    GetMineInfo() {
      getResquest("CommonHelper.ashx?Method=GetMineInfo", {
        MineID: 2, //我的：1我的信息，2我的积分，3我的活动，4我的礼品，5 我的预约，6我的收藏
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
  .search {
    position: absolute;
    width: 646rpx;
    left: 52rpx;
    top: 180rpx;
  }
  .listBox {
    position: absolute;
    width: 606rpx;
    height: 800rpx;
    left: 72rpx;
    top: 310rpx;
    font-size: 28rpx;
    color: #58656d;
    .itemBox {
      width: 100%;
      height: 90rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-start;
      border-bottom: 1px solid #ccc;
      padding-bottom: 10rpx;
      margin-bottom: 30rpx;
    }
    .item-top {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .time {
      align-items: left;
    }
  }
}
</style>
