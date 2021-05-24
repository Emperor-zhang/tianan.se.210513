<template>
  <view class="content">
    <image :src="$url + 'project/7-1.png'" mode="widthFix"></image>
    <scroll-view class="SalesConsultant" scroll-y="true">
      <block v-for="item in list" :key="item.adviserID">
        <view class="box" @click="handleInfo(item.adviserID)">
          <view class="list_item">
            <image
              class="animate1 SalesnickUrl"
              :src="item.imgUrl"
              mode="widthFix"
            ></image>
            <text class="SalesnickName">{{ item.name }}</text>
            <image
              class="animate1 setTel"
              :src="$url + 'project/7-2.png'"
              mode="widthFix"
              @click.stop="callUp(item.phone)"
            ></image>
            <image
              class="animate1 setWechat"
              :src="$url + 'project/7-3.png'"
              mode="widthFix"
              @click.stop="addWechat(item.weixin)"
            ></image>
          </view>
        </view>
      </block>
    </scroll-view>
    <yangr-msg
      v-if="yangrMsgShow"
      :title="title"
      type="success"
      :info="info"
      btn="确定"
      @yangrMsgEvent="closeYangrMsg"
    ></yangr-msg>
  </view>
</template>
<script>
var that;
import yangrMsg from "@/components/yangr-msg/yangr-msg.vue";
import { shareMixins } from "@/static/mixins/share.js";
import { getResquest } from "@/utils/api.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      title: "复制成功",
      info: "微信号已复制，请到微信中粘贴添加好友",
      list: [],
      yangrMsgShow: false,
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {
    that.getSalesInfo();
  },
  components: { yangrMsg },
  methods: {
    // 顾问名片------需要带参数
    handleInfo(id) {
      uni.navigateTo({
        url: "/pages/project/counselorCard/index?UserID=" + id,
        animationType: "pop-in",
        animationDuration: 200,
      });
    },
    // 拨打电话
    callUp(tel) {
      uni.makePhoneCall({
        phoneNumber: tel,
      });
    },
    // 加微信  遍历后需把电话传过来 放在data上
    addWechat(wechat) {
      uni.setClipboardData({
        data: wechat,
        success: function(res) {
          uni.hideToast();
          that.yangrMsgShow = true;
        },
        fail(err) {
          uni.showToast({
            title: "复制失败，请稍后再试！",
            icon: "none",
          });
        },
      });
    },
    // 复制微信成功弹窗
    closeYangrMsg() {
      that.yangrMsgShow = false;
    },
    getSalesInfo() {
      getResquest("CommonHelper.ashx?Method=GetAdviserInfo", {
        ProjectCode: "yljx",
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
  height: 100%;
  background-color: #f8f8f8;
  .SalesConsultant {
    position: absolute;
    width: 600rpx;
    left: 75rpx;
    height: 850rpx;
    top: 280rpx;
    .box {
      position: relative;
      width: 100%;
      display: flex;
      flex-direction: column;
      margin: 0rpx 0rpx 40rpx 0;
      .list_item {
        height: 120rpx;

        border-bottom: 1px solid rgb(197, 197, 197);
        .SalesUrl {
          opacity: 1;
        }
        .SalesnickUrl {
          width: 100rpx;
          top: 10rpx;
          left: 20rpx;
        }
        .SalesnickName {
          position: absolute;
          left: 160rpx;
          height: 120rpx;
          line-height: 120rpx;
          font-size: 30rpx;
          color: #777;
          max-width: 130rpx;
          width: 130rpx;
        }
        .setTel {
          width: 120rpx;
          left: 300rpx;
          top: 34rpx;
        }
        .setWechat {
          width: 120rpx;
          left: 440rpx;
          top: 34rpx;
        }
      }
    }
  }
}
</style>
