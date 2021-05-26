<template>
  <view class="content" @touchmove.stop.prevent="moveHandle">
    <image :src="$url + 'project/8-1.png'" mode="widthFix"></image>
    <input
      type="text"
      :value="name"
      @input="handleName"
      class="nameInput"
      placeholder="请输入姓名"
      placeholder-style="color:#c5c5c5"
    />
    <image
      class="animate1 handleBoy"
      :src="`${$url}project/${boy ? '8-5' : '8-2'}.png`"
      mode="widthFix"
      @click="handleBoy"
    ></image>
    <image
      class="animate1 handleGirl"
      :src="`${$url}project/${girl ? '8-6' : '8-3'}.png`"
      mode="widthFix"
      @click="handleGirl"
    ></image>

    <input
      type="number"
      :value="tel"
      @input="handleTel"
      class="telInput"
      placeholder="请输入11位数字"
      placeholder-style="color:#c5c5c5"
    />
    <view class="dateTime" v-if="isShow">
      <view class="year alldate">
        <text>年</text>
        <text class="time">{{ year }}</text>
      </view>
      <view class="month alldate">
        <text>月</text>
        <text class="time">{{ month }}</text>
      </view>
      <view class="day alldate">
        <text>日</text>
        <text class="time">{{ day }}</text>
      </view>
      <view class="hour alldate">
        <text>时</text>
        <text class="time">{{ hour }}</text>
      </view>
      <view class="minute alldate">
        <text>分</text>
        <text class="time">{{ minute }}</text>
      </view>
    </view>
    <view class="dateImg" v-if="!isShow">
      <text>请选择</text>
      <text>请选择</text>
      <text>请选择</text>
    </view>
    <view id="date">
      <hTimePicker
        class="dateSel"
        sTime="01"
        cTime="23"
        interval="5"
        dayNum="90"
        @changeTime="changeTime"
      >
        <view slot="pCon" class="changeTime">
          <!-- {{ dateValue || "点击选择时间" }} -->
        </view>
      </hTimePicker>
    </view>

    <image
      class="animate1 submit"
      :src="$url + 'project/8-4.png'"
      mode="widthFix"
      @click="submitInfo"
    ></image>
  </view>
</template>
<script>
var that;
//https://ext.dcloud.net.cn/plugin?id=3962  插件地址
import hTimePicker from "@/components/h-timePicker/h-timePicker.vue";
import { getResquest } from "@/utils/api.js";
import { shareMixins } from "@/static/mixins/share.js";
export default {
  mixins: [shareMixins],
  data() {
    return {
      $url: this.url,
      boy: false,
      girl: false,
      dataIndex: 0,
      nameValue: "",
      sexValue: "",
      phoneValue: "",
      dateValue: "",
      list: [
        {
          type: "datetime",
          title: "",
          detail: "请选择年月日时分",
        },
      ],
      dateString: "",
      type: "date",
      startYear: "2021",
      year: "",
      month: "",
      day: "",
      hour: "",
      minute: "",
      isShow: false,
      openid: "",
      Name: "",
      Phone: "",
      Sex: "",
      MeetDay: "",
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
    that.openid = uni.getStorageSync("openid");
  },
  onShow() {},
  components: { hTimePicker },
  methods: {
    moveHandle() {},
    changeTime(time, s, obj) {
      that.dateValue = time;
      console.log(obj);
      that.year = obj.y.substring(0, 4);
      that.month = obj.y.substring(5, 7);
      that.day = obj.y.substring(8, 10);
      that.hour = obj.h;
      that.minute = obj.m;
      that.isShow = true;
    },
    handleName(e) {
      //   console.log(e.detail.value);
      that.nameValue = e.detail.value;
    },
    handleTel(e) {
      //   console.log(e.detail.value);
      that.phoneValue = e.detail.value;
    },
    handleGirl(e) {
      that.girl = true;
      that.boy = false;
      that.dataIndex = 2;
      that.sexValue = "女";
    },
    handleBoy(e) {
      that.girl = false;
      that.boy = true;
      that.dataIndex = 1;
      that.sexValue = "男";
    },
    selectDatePicker(type, index) {
      this.type = type;
      this.index = index;
      this.$refs["date-time"].show();
    },
    /**
     * isShowToolBar：true 点击确定获取数值
     * isShowToolBar：false 滑动获取返回数据
     */
    dateTimeChange(value) {
      that.year = value.a.substring(0, 4);
      that.month = value.a.substring(5, 7);
      that.day = value.a.substring(8, 10);
      that.hour = value.b[0];
      that.minute = value.b[1];
      that.dateValue = value.a;
      that.isShow = true;
      // let item = this.list[this.index];
      // item["detail"] = value;
      // this.list.splice(this.index, 1, item);
    },
    SaveMeet() {
      getResquest("CommonHelper.ashx?Method=SaveMeet", {
        OpenID: that.openid,
        Name: that.nameValue, //姓名
        Phone: that.phoneValue, //手机号码
        Sex: that.sexValue, //性别：直接传值：男 女
        MeetDay: that.dateValue, //预约日期
        MeetNoon: "", //预约上下午
        MeetTime: "", //预约时间点
      }).then((res) => {
        console.log(res);
        if (res.data[0].Opt == 1) {
          uni.showToast({
            title: "提交成功",
            mask: true,
          });
          setTimeout(function() {
            uni.navigateBack({
              delta: 1,
              animationType: "pop-out",
              animationDuration: 500,
            });
          }, 1800);
        } else if (res.data[0].Opt == 2) {
          uni.showToast({
            title: "您已有预约，请勿重复预约",
            mask: true,
            icon: "none",
          });
          setTimeout(function() {
            uni.navigateBack({
              delta: 1,
              animationType: "pop-out",
              animationDuration: 500,
            });
          }, 1800);
        }
      });
    },

    // 确认提交
    submitInfo() {
      if (that.nameValue == "") {
        uni.showToast({
          title: "请输入姓名",
          icon: "none",
        });
        return false;
      }
      if (that.sexValue == "") {
        uni.showToast({
          title: "选择性别",
          icon: "none",
        });
        return false;
      }
      if (that.phoneValue == "") {
        uni.showToast({
          title: "请输入手机号",
          icon: "none",
        });
        return false;
      }
      if (
        !/^1[3|4|5|6|7|8|9]\d{9}$/.test(that.phoneValue) ||
        that.phoneValue.length != 11
      ) {
        uni.showToast({
          title: "电话格式不正确",
          icon: "none",
        });
        return false;
      }
      if (that.dateValue == "") {
        uni.showToast({
          title: "请选择日期",
          icon: "none",
        });
        return false;
      }
      that.SaveMeet();
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  background-color: #f8f8f8;
  .nameInput {
    position: absolute;
    width: 400rpx;
    left: 210rpx;
    top: 22.4%;
    height: 62rpx;
    font-size: 26rpx;
    color: #777;
    text-align: right;
    padding: 0 10rpx;
  }
  .telInput {
    position: absolute;
    width: 400rpx;
    left: 210rpx;
    top: 40.3%;
    height: 62rpx;
    font-size: 26rpx;
    color: #777;
    text-align: right;
    padding: 0 10rpx;
  }
  .handleBoy {
    width: 50rpx;
    top: 32%;
    left: 460rpx;
  }
  .handleGirl {
    width: 50rpx;
    top: 32%;
    left: 550rpx;
  }
  #date {
    position: absolute;
    height: 76rpx;
    left: 75rpx;
    top: 56.4%;
    display: flex;
    align-items: center;
    .dateSel {
      width: 100%;
      height: 100%;
    }
    .changeTime {
      width: 600rpx;
      height: 76rpx;
      display: flex;
      align-items: center;
    }
  }
  .dateTime {
    position: absolute;
    width: 500rpx;
    height: 112rpx;
    left: 125rpx;
    top: 53%;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    font-size: 32rpx;
    color: #777;
    padding: 6rpx 0;
    animation: fadeIn 0.5s linear both;
    .time {
      text-shadow: 1px 1px 2px #adb58c;
    }
    .alldate {
      width: 100rpx;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }
  }
  .dateImg {
    position: absolute;
    width: 500rpx;
    height: 76rpx;
    left: 125rpx;
    top: 56.4%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #777;
    text {
      width: 100rpx;
      text-align: center;
    }
  }
  .submit {
    position: absolute;
    width: 250rpx;
    top: 68%;
    left: 250rpx;
    animation: bounceInUp 1.3s linear both, icon 1.5s linear 1.3s infinite;
  }
}
</style>
