<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image
      :src="$url + 'mine/15-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <view class="dropdownMenu">
      <lv-select
        @handleSearch="handleSearch"
        @change="change"
        placeholder="请输入信息"
        :infoList="infoList"
        :showValue="showValue"
        v-model="searchValue"
        :loading="loading"
        type="primary"
        :uniShadow="true"
      ></lv-select>
      <image
        class="jiantou"
        :class="[{ clear: flag }]"
        :src="$url + 'mine/arrow' + num + '.png'"
        mode="widthFix"
      ></image>
    </view>
    <image
      class="search"
      :src="$url + 'mine/15-3.png'"
      mode="widthFix"
      @click="search"
    ></image>
    <scroll-view
      class="listBox"
      scroll-y
      v-if="recordList.length != 0"
      :style="'height:' + height + 'rpx'"
    >
      <block v-for="(item, index) in recordList" :key="index">
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
      v-if="recordList.length == 0"
      :src="$url + 'mine/20-1.png'"
      mode="widthFix"
    ></image>
  </view>
</template>
<script>
var that;
// 组件地址
// https://ext.dcloud.net.cn/plugin?id=1377
var getRpx = require("@/utils/utils.js");
import { getResquest } from "@/utils/api.js";
import { shareMixins } from "@/static/mixins/share.js";
import lvSelect from "@/components/lv-select/lv-select";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      flag: false,
      num: 1,
      loading: false,
      showValue: "name", // 需要显示的数据，必须与infoList中的name对应
      searchValue: "请选择",
      searchText: "",
      recordList: [],
      infoList: [
        {
          name: "最近一周",
          id: 1,
        },
        {
          name: "最近一个月",
          id: 2,
        },
        {
          name: "最近半年",
          id: 3,
        },
        {
          name: "最近一年",
          id: 4,
        },
        {
          name: "全部",
          id: 5,
        },
      ],
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
  components: { lvSelect },

  methods: {
    handleSearch(e) {
      if (e == true) {
        that.num = 2;
      } else {
        that.num = 1;
      }
    },
    change(val) {
      that.searchText = val.id;
      that.num = 1;
      that.GetMyIntegralRecord();
    },
    search() {
      if (that.recordList.length > 0) {
        that.GetMyIntegralRecord();
      }
    },
    GetMineInfo() {
      getResquest("CommonHelper.ashx?Method=GetMineInfo", {
        MineID: 2, //我的：1我的信息，2我的积分，3我的活动，4我的礼品，5 我的预约，6我的收藏
        OpenID: that.openid,
      }).then((res) => {
        console.log(res);
        that.recordList = res.data;
      });
    },
    GetMyIntegralRecord() {
      getResquest("CommonHelper.ashx?Method=GetMyIntegralRecord", {
        SearchID: that.searchText, //1一周内、2一月内、3半年内、4一年内、5全部
        OpenID: that.openid,
      }).then((res) => {
        console.log(res);
        that.recordList = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .dropdownMenu {
    position: absolute;
    width: 666rpx;
    left: 42rpx;
    top: 200rpx;
    border: 1px solid #ccc;
    .jiantou {
      position: absolute;
      width: 40rpx;
      top: 20%;
      right: 20rpx;
      left: auto;
    }
  }
  .search {
    position: absolute;
    width: 50rpx;
    top: 208rpx;
    left: 64rpx;
  }
  // .clear {
  //   transform: rotate3d(1, 0, 0, 180deg);
  //   transform-origin: 50% 40%;
  // }
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
