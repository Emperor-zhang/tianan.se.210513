<template>
  <view class="content">
    <image :src="$url + 'shop/11-1.png'" mode="widthFix"></image>
    <image :src="goodsurl" mode="scaleToFill" class="animate1 imgBox"></image>
    <view class="shopname">{{ goodsname }}</view>
    <view class="integration">{{ integration }}</view>
    <view class="addr">{{ addr }}</view>
    <view class="tel">{{ tel }}</view>
    <image
      :src="$url + 'shop/11-3.png'"
      mode="widthFix"
      class="animate1 btn1"
      @click="goodschange"
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
      goodsid: 0,
      goodsurl: "",
      goodsname: "",
      integration: "",
      addr: "",
      tel: "",
      openid: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
  },
  onShow() {
    let pages = getCurrentPages();
    let currentPage = pages[pages.length - 1];
    that.goodsid = currentPage.options.goodsid;
    that.GetGoodsInfo();
  },
  components: {},
  methods: {
    GetGoodsInfo() {
      getResquest("CommonHelper.ashx?Method=GetGoodsInfo", {
        GoodsID: that.goodsid, //商品编号
      }).then((res) => {
        console.log(res);
        that.goodsurl = res.data[0].GoodsUrl;
        that.goodsname = res.data[0].GoodsName;
        that.tel = res.data[0].GoodsPhone;
        that.addr = res.data[0].GoodsAddr;
        that.integration = res.data[0].GoodsIntegral;
      });
    },
    // 兑换
    goodschange() {
      getResquest("CommonHelper.ashx?Method=GoodsExchange", {
        OpenID: that.openid,
        GoodsID: that.goodsid, //商品编号
        Integral: that.integration, //积分
      }).then((res) => {
        console.log(res);
        switch (res.data[0].Opt) {
          case 1:
            that.integration = res.data[0].Integral;
            that.toast("兑换成功", "success");
            break;
          case 2:
            that.toast("您的积分不足以兑换该礼品", "none");
            break;
          case 3:
            that.toast("活动暂时停止", "none");
            break;
          case 4:
            that.integration = res.data[0].Integral;
            that.toast("该礼品已被对完", "none");
            break;
          case 5:
            that.toast("该礼品已被下架", "none");
            break;
          default:
            that.toast("数据请求错误，请重试", "none");
            break;
        }
        setTimeout(function() {
          uni.navigateBack({
            delta: 1,
          });
        }, 1500);
      });
    },
    toast(tit, state) {
      uni.showToast({
        title: tit,
        mask: true,
        icon: state,
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .imgBox {
    width: 100%;
    height: 596rpx;
  }
  .btn1 {
    width: 400rpx;
    left: 153rpx;
    top: 80%;
    animation: icon 2s linear infinite;
  }
  .shopname {
    position: absolute;
    top: 43.5%;
    left: 200rpx;
    width: 350rpx;
    font-size: 24rpx;
  }
  .integration {
    position: absolute;
    top: 43.7%;
    left: auto;
    width: 100rpx;
    font-size: 24rpx;
    right: 0rpx;
  }
  .addr {
    position: absolute;
    top: 48.7%;
    left: 200rpx;
    width: 500rpx;
    font-size: 24rpx;
    height: 70rpx;
  }
  .tel {
    position: absolute;
    top: 54.1%;
    left: 200rpx;
    width: 350rpx;
    font-size: 24rpx;
  }
}
</style>
