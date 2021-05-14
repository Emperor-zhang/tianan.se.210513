export const shareMixins = {
  data() {
    return {
      shareData: {
        title: "爱情云溪九里",
        path: "/pages/index/index",
        imageUrl:
          "https://wb.jaas.ac.cn/SmallExePic/love.se.210301/img/icon.jpg",
      },
    };
  },

  //#ifdef MP-WEIXIN
  onShareAppMessage(e) {
    // console.log(e);
    // if (e.from == "button") {
    //   console.log("按钮触发分享");
    // }
    // if (e.from == "menu") {
    //   console.log("右上角触发分享");
    // }
    return {
      title: this.shareData.title,
      path: this.shareData.path,
      imageUrl: this.shareData.imageUrl,
      success: (res) => {
        console.log(res);
      },
    };
  },
  //#endif

  onLoad(option) {},
};
