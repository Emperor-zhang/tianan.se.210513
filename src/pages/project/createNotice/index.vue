<template>
  <view class="content">
    <!-- 生成 -->
    <view class="canBox" v-show="isShow">
      <view class="content-img">
        <image
          :src="imagePath"
          @tap="previewClick"
          class="img-preview"
          mode="widthFix"
        ></image>
      </view>
      <view class="canvas-box">
        <painter
          customStyle="margin-left:40rpx"
          :palette="template"
          @imgErr="imgErr"
          @imgOK="onImgOK"
        />
      </view>
    </view>
    <image :src="`${$url}project/21-1.png`" mode="widthFix"></image>
    <image class="animate1 imgUrl" :src="imgUrl" mode="widthFix"></image>
    <text class="name">姓名：{{ name }}</text>
    <text class="tel">{{ tel }}</text>
    <text class="addr">{{ addr }}</text>
    <view class="getQrCode">
      <image class="qrcodeimg" :src="qrcode" mode="widthFix"></image>
    </view>
    <!-- 遮罩层 -->
    <view class="overlay" v-if="Show"></view>
    <image
      @click="getImage"
      class="saveCard"
      :src="`${$url}project/21-2.png`"
      mode="widthFix"
    ></image>
  </view>
</template>
<script>
var that;
var timer = null;
import uQRCode from "@/utils/uqrcode.js";
import Card from "@/static/painter/card.js";
import { pathToBase64, base64ToPath } from "@/static/index.js";
import { shareMixins } from "@/static/mixins/share.js";
import { getResquest } from "@/utils/api.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      shareData: {
        path: "", // 分享的页面路径
      },
      $url: this.url,
      themeBgColor: "#ed5607",
      backState: "3000",
      height: 0,
      addr: "南京市溧水区秦淮大道288号",
      home: true,
      flag: false,
      fontColor: "#fff",
      name: "魏鹏飞",
      tel: "13914046527",
      title: "Hello",
      template: "",
      imagePath: "",
      isShow: false,
      Show: true,
      back: 1,
      qrcodeUrl: "",
      qrcode: "",
      obj: {
        qrcodeImg: "https://wb.jaas.ac.cn/Love.SE.210204/qr/1.png",
        name: "大萨达所",
      },
      id: "",
      imgUrl: "",
    };
  },
  onLoad(e) {
    that = this; /**自定义组件中要onLoad换成created*/
    that.id = e.id;
    that.shareData.path = "/pages/project/counselorCard/index" + e.id;
  },
  onShow() {
    that.GetSmallCode();
    uni.hideHomeButton();
    // uni.showLoading({
    //   title: "页面正在加载",
    //   mask: true,
    // });
  },
  onUnload() {
    that.flag = false;
  },
  components: {},

  methods: {
    // 获取生成详情页数据
    GetCreateInfo() {
      getResquest("CommonHelper.ashx?Method=GetCreateInfo", {
        UserID: 1,
      }).then((res) => {
        console.log(res);
        that.imgUrl = res.data[0].ImgUrl;
        that.name = res.data[0].Name;
        that.tel = res.data[0].Phone;
        that.qrcode = res.data[0].PosterQr;
        that.qrcodeImg = res.data[0].PosterQr;
        uni.hideLoading();
        that.Show = false;
        that.flag = true;
      });
    },
    // 生成二维码
    GetSmallCode() {
      getResquest("CommonHelper.ashx?Method=GetSmallCode", {
        path: "/pages/project/counselorCard/index", //详情路径
        // scene: that.id, //userid参数
        scene: 1,
      }).then((res) => {
        console.log(res);
        that.GetCreateInfo();
      });
    },
    backClick() {
      console.log(that.flag);
      if (that.flag == true) {
        uni.navigateBack({
          delta: 1,
        });
      }
    },
    getImage() {
      //生成图片
      if (uni.getStorageSync("imagePath")) {
        that.imagePath = uni.getStorageSync("imagePath");
        that.saveImage();
      } else {
        that.initData();
      }
    },
    initData() {
      that.isShow = true;
      uni.showLoading({
        title: "拼命生成中...",
        mask: true,
      });
      that.template = new Card().palette(that.obj);
      timer = setTimeout(function() {
        if (that.back == 1) {
          uni.navigateBack({
            delta: 1,
            animationType: "pop-out",
            animationDuration: 200,
          });
        }
      }, 8000);
    },
    onImgOK(e) {
      console.log(e);
      clearTimeout(timer);
      that.back = 0;
      uni.downloadFile({
        url: e.detail.path,
        success: (res) => {
          console.log(res);
          that.imagePath = res.tempFilePath;
          uni.setStorageSync("imagePath", that.imagePath);
          uni.hideLoading();
          that.saveImage();
          that.flag = true;
        },
        fail: (err) => {
          console.log(err);
          that.flag = true;
          uni.hideLoading();
        },
      });
    },
    imgErr(e) {
      uni.hideLoading();
      uni.showModal({
        title: "提示",
        content: "生成海报失败",
        showCancel: false,
      });
      console.log(e);
      that.flag = true;
    },

    // 保存图片
    saveImage() {
      uni.showLoading({
        title: "保存中...",
      });
      //图片保存到本地
      uni.saveImageToPhotosAlbum({
        filePath: that.imagePath,
        success: function(data) {
          uni.hideLoading();
          uni.showToast({
            title: "保存成功",
            mask: true,
          });
          that.isShow = false;
          that.template = "";
          that.imagePath =
            "https://wb.jaas.ac.cn/SmallExePic/TianAn.SE.210513/img/kong.png";
        },
        fail: function(err) {
          console.log(err);
          that.isShow = false;
          that.back = 1;
          that.flag = true;
          if (
            err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" ||
            err.errMsg === "saveImageToPhotosAlbum:fail auth deny"
          ) {
            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
            uni.showModal({
              title: "提示",
              content: "需要您授权保存相册",
              showCancel: false,
              success: (modalSuccess) => {
                uni.openSetting({
                  success(settingdata) {
                    console.log("settingdata", settingdata);
                    if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                      uni.showModal({
                        title: "提示",
                        content: "获取权限成功,再次点击图片即可保存",
                        showCancel: false,
                      });
                      that.isShow = true;
                      that.back = 1;
                      that.flag = true;
                    } else {
                      uni.showModal({
                        title: "提示",
                        content: "获取权限失败，将无法保存到相册哦~",
                        showCancel: false,
                      });
                    }
                  },
                  fail(failData) {
                    console.log("failData", failData);
                    that.isShow = false;
                    that.back = 1;
                  },
                  complete(finishData) {
                    console.log("finishData", finishData);
                  },
                });
              },
            });
          }
        },
        complete(res) {
          uni.hideLoading();
        },
      });
    },
    // 生成二维码
    async make() {
      // 同步等待
      var res = await uQRCode.make({
        canvasId: "qrcode",
        componentInstance: this,
        text: that.obj.src,
        size: 134,
        margin: 0,
        backgroundColor: "#ffffff",
        foregroundColor: "#000000",
        fileType: "jpg",
        errorCorrectLevel: uQRCode.errorCorrectLevel.H,
      });
      that.Show = false;
      that.getBase64ImageUrl(res);
    },
    //把base64转换成图片
    getBase64ImageUrl(data) {
      base64ToPath(data)
        .then((path) => {
          console.log(path);
          that.flag = true;
          that.qrcodeUrl = path;
          uni.setStorageSync("qrcodeUrl", path);
          uni.hideLoading();
        })
        .catch((error) => {
          console.error(error);
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
  .imgUrl {
    position: absolute;
    width: 130rpx;
    top: 21%;
    left: 108rpx;
  }
  .name {
    position: absolute;
    font-size: 30rpx;
    color: #546668;
    top: 24%;
    left: 252rpx;
  }
  .tel {
    position: absolute;
    font-size: 28rpx;
    color: #777;
    top: 35.6%;
    left: 150rpx;
  }
  .addr {
    position: absolute;
    font-size: 28rpx;
    color: #777;
    top: 40.9%;
    left: 150rpx;
  }
  .qrCode {
    position: absolute;
    width: 146px;
    left: 50%;
    margin-left: -73px;
    top: 57%;
  }
  .qrcodeimg {
    position: absolute;
    width: 134px;
    height: 134px;
    left: 50%;
    margin-left: -70px;
    border-radius: 10px;
  }
  .getQrCode {
    position: absolute;
    width: 134px;
    height: 134px;
    top: 54.6%;
    left: 50%;
    margin-left: -66px;
    border-radius: 20rpx;
  }
  .saveCode {
    position: absolute;
    width: 250rpx;
    height: 250rpx;
    top: 512rpx;
    left: 462rpx;
  }
  .saveCard {
    position: absolute;
    width: 300rpx;
    top: 84%;
    left: 225rpx;
    animation: bounceInLeft 1.3s linear both, icon 1.5s linear 1.3s infinite;
  }
  .shareCard {
    position: fixed;
    width: 230rpx;
    top: 93%;
    right: 80rpx;
    animation: bounceInRight 1.3s linear both, icon 1.5s linear 1.3s infinite;
  }
  .shareButton {
    position: fixed;
    width: 230rpx;
    height: 50rpx;
    opacity: 0;
    top: 85%;
    right: 80rpx;
  }
  .overlay {
    position: absolute;
    background-color: rgba(0, 0, 0, 0.5);
    top: 0%;
    left: 0;
    width: 100%;
    height: 100%;
  }
  .canBox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    .content-img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
