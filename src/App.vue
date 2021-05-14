<script>
export default {
  globalData: {
    route: "",
    value: "",
    open: 0,
    power: "",
    subState: "",
    openid: "",
    userid: "",
  },
  onLaunch: function(e) {
    let that = this;
    uni.hideTabBar();
    // console.log("e", e);
    that.globalData.userid = e.query.UserID;
    uni.setStorageSync("scene", e.scene);
    uni.setStorageSync("userid", parseInt(e.query.UserID));
    uni.hideTabBar();
    console.log("App Launch");
  },
  onShow: function() {
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  },
};
</script>

<style>
/*每个页面公共css */
@import "./wxcomponents/vant-weapp/common/index.wxss";
@import "./styles/main.css";
@import "./styles/icon.css";
@import "./styles/animate.css";
@import "./styles/bass.wxss";
</style>
