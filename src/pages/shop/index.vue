<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'shop/10-1.png'" mode="widthFix"></image>
    <image
      class="animate1 nickUrl"
      :src="`${isLogin ? nickurl : $url + 'white.png'}`"
      mode="widthFix"
      @click="handle"
    ></image>
    <view v-if="isLogin" class="animate1 nickname">{{ nickname }}</view>
    <view v-if="isLogin" class="animate1 integration"
      >积分:{{ integration }}</view
    >
    <view v-else class="animate1 login" @click="handle">未登录</view>

    <image
      :src="$url + 'shop/10-4.png'"
      mode="widthFix"
      class="animate1 rule"
      @click="rule"
    ></image>
    <scroll-view scroll-y class="listBox" :style="'height:' + height + 'rpx'">
      <view class="outbox">
        <block v-for="item in list" :key="item.GoodsID">
          <view class="itemBox" @click="shopInfo(item.GoodsID)">
            <view class="box">
              <image
                :src="item.GoodsUrl"
                mode="scaleToFill"
                class="imgbox"
              ></image>
              <view class="textBox">
                <view class="txtTop">{{ item.GoodsName }}</view>
                <view class="txtBottom">积分:{{ item.Integral }}</view>
              </view>
            </view>
          </view>
        </block>
      </view>
    </scroll-view>
  </view>
</template>
<script>
var that;
import { getResquest } from "@/utils/api.js";
import { shareMixins } from "@/static/mixins/share.js";
var getRpx = require("../../utils/utils.js");
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      isLogin: false,
      nickurl: "",
      nickname: "",
      height: "",
      openid: "",
      list: [],
      integration: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.isLogin = uni.getStorageSync("isLogin");
    that.height = getRpx.getRpx() * uni.getSystemInfoSync().windowHeight - 340;
    that.openid = uni.getStorageSync("openid");
  },
  onShow() {
    that.isLogin = uni.getStorageSync("isLogin");
    that.nickurl = uni.getStorageSync("nickurl");
    that.nickname = uni.getStorageSync("nickname");
    that.GetGoodsList();
  },
  components: {},
  methods: {
    // 商品详情
    shopInfo(goodsid) {
      if (!that.isLogin) {
        uni.navigateTo({
          url: `/pages/login/index`,
        });
      } else {
        uni.navigateTo({
          url: `/pages/shop/goods-detail/index?goodsid=${goodsid}`,
        });
      }
    },
    // 积分规则
    rule() {
      uni.navigateTo({
        url: `/pages/shop/rule/index`,
      });
    },
    handle() {
      if (!that.isLogin) {
        uni.navigateTo({
          url: `/pages/login/index`,
        });
      }
    },
    moveHandle() {},
    GetGoodsList() {
      getResquest("CommonHelper.ashx?Method=GetGoodsList", {
        OpenID: that.openid, //商品编号
      }).then((res) => {
        console.log(res);
        that.list = res.data[0].GoodsList;
        that.integration = res.data[0].Integral;
        uni.setStorageSync("nickState", res.data[0].NickState);
        // tab.NickState; //是否授权头像：0未授权，1已授权
        // tab.NickName; //昵称
        // tab.NickUrl; //头像
        // tab.Integral; //积分
        // that.nickurl = res.tab.NickUrl
        // that.nickname = res.tab.NickName
        // that.integration = res.tab.Integral
        // entity.GoodsID; //商品编号
        // entity.GoodsUrl; //商品图片
        // entity.GoodsName; //商品名称
        // entity.Integral; //商品所需积分
        // that.list = res.data;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .nickUrl {
    width: 170rpx;
    height: 170rpx;
    border-radius: 100px;
    left: 42rpx;
    top: 4%;
  }
  .nickname {
    color: #fffeff;
    width: 300rpx;
    left: 230rpx;
    top: 6%;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .login {
    color: #fffeff;
    width: 300rpx;
    left: 230rpx;
    top: 9%;
    font-size: 28rpx;
  }
  .integration {
    color: #fffeff;
    width: 150rpx;
    left: 230rpx;
    top: 11%;
    font-size: 28rpx;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
  }
  .rule {
    width: 200rpx;
    left: auto;
    right: 42rpx;
    top: 9%;
  }
  .listBox {
    position: absolute;
    width: 666rpx;
    left: 42rpx;
    top: 320rpx;
    .outbox {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      flex-wrap: wrap;
      .itemBox {
        width: 320rpx;
        height: 350rpx;
        padding: 4rpx;
        border-radius: 20rpx;
        margin: 5px 0;
        background-image: -webkit-linear-gradient(top, #6dc7c5 3%, #e2be7b 70%);
        .box {
          width: 100%;
          position: relative;
          height: 100%;
          border-radius: 20rpx;
          background-color: #f4f4f4;
          .imgbox {
            width: 100%;
            height: 240rpx;
            position: absolute;
            top: 0;
            border-radius: 20rpx 20rpx 0 0;
          }
          .textBox {
            width: 280rpx;
            left: 20rpx;
            height: 100rpx;
            position: absolute;
            bottom: 0;
            font-size: 24rpx;
            .txtTop {
              height: 48rpx;
              line-height: 48rpx;
              border-bottom: 1px dashed #ccc;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 1;
              -webkit-box-orient: vertical;
            }
            .txtBottom {
              line-height: 48rpx;
              height: 48rpx;
            }
          }
        }
      }
    }
  }
}
</style>
