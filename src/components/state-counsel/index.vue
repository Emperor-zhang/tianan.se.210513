<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'index/3-1.png'" mode="widthFix"></image>
    <view class="showTitle">{{ gettitle }}</view>
    <scroll-view scroll-y class="list-box" :style="'height:' + height + 'rpx'">
      <block v-for="item in list" :key="item.MsgID">
        <view class="item-box">
          <view
            class="title"
            @click="handleTitle(item.LinkUrl, item.Them, item.MsgID)"
            >{{ item.Them }}</view
          >
          <view class="collect" @click.stop="collect(item.MsgID)">
            <text class="collect_text">{{
              item.Flag == 0 ? "收藏" : "已收藏"
            }}</text>
            <image
              :src="`${$url}index/3-0-${item.Flag}.png`"
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
import { getResquest } from "@/utils/api.js";
var getRpx = require("../../utils/utils.js");
export default {
  data() {
    return {
      $url: this.url,
      height: "",
      flag: 0,
      list: [],
      openid: "",
    };
  },
  props: ["gettitle", "getnum"],
  created(e) {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
    that.height = getRpx.getRpx() * uni.getSystemInfoSync().windowHeight - 380;
  },
  components: {},
  watch: {
    getnum(newVal, oldVal) {
      newVal & that.GetMultiList();
    },
  },
  methods: {
    moveHandle() {},
    //   收藏/取消收藏
    collect(id) {
      getResquest("CommonHelper.ashx?Method=SaveCollection", {
        OpenID: that.openid,
        MsgID: id,
      }).then((res) => {
        console.log(res);
        that.GetMultiList();
      });
    },
    GetMultiList() {
      getResquest("CommonHelper.ashx?Method=GetMultiList", {
        OpenID: that.openid, //收藏时需要
        MsgType: that.getnum, //all 四种稿件的最近前3个；1 项目资讯; 2 家书专栏，3 实时资讯； 4 销售资讯
      }).then((res) => {
        // AdviserMenu //销售咨询
        // BookMenu //家书专栏
        // BrandMenu //项目咨询
        // NewsMenu  //实时资讯
        console.log(res);
        if (that.getnum == 1) {
          that.list = res.data[0].BrandMenu;
        } else if (that.getnum == 2) {
          that.list = res.data[0].BookMenu;
        } else if (that.getnum == 3) {
          that.list = res.data[0].NewsMenu;
        } else if (that.getnum == 4) {
          that.list = res.data[0].AdviserMenu;
        }
        that.$nextTick(function() {
          that.flag = 1;
        });
      });
    },
    handleTitle(url, tit, mId) {
      uni.navigateTo({
        url: `/pages/webview/index?url=${url}&title=${tit}&msgId=${mId}`,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .showTitle {
    position: absolute;
    width: 100%;
    left: 0%;
    top: 15%;
    text-align: center;
    font-size: 30rpx;
    font-weight: 600;
    color: #5a656b;
    font-family: auto;
  }

  .list-box {
    position: absolute;
    width: 620rpx;
    left: 65rpx;
    top: 320rpx;
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
