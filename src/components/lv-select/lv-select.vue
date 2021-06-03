<template>
  <view style="position: relative;" :class="size === 'small' ? 'small' : ''">
    <view class="uni-flex" :class="{ unishadow: uniShadow }">
      <view class="uni-search-form uni-circular uni-background">
        <!-- <icon type="search" size="14" class="uni-icon-position" /> -->
        <input
          type="text"
          :placeholder="placeholder"
          v-model="inputVal"
          @input="onInput"
          @focus="onFocus"
          disabled="true"
        />
        <icon
          v-if="isShowClearIcon"
          type="clear"
          size="16"
          class="uni-icon-clear"
          @tap="clearInputValue"
        />
      </view>
      <view class="uni-action">
        <button
          style="opacity: 0;"
          :disabled="loading"
          class="uni-cu-btn uni-bg-gradual-green uni-shadow-blur uni-round"
          @click="handleSearch"
        >
          搜索
        </button>
      </view>
    </view>
    <view v-if="isShowSelect">
      <view class="uni-combox__selector" v-if="inputIsShow">
        <scroll-view scroll-y="true" class="uni-combox__selector-scroll">
          <view class="uni-combox__selector-empty " v-if="loading">
            <view>加载中··· </view>
          </view>
          <view
            class="uni-combox__selector-empty "
            v-if="!loading && dataListLength === 0"
            @tap="closeDielog"
          >
            <view>{{ emptyTips }}</view>
          </view>
          <view
            class="uni-combox__selector-item"
            v-for="(item, index) in dataList"
            :key="index"
            @tap="onSelectorClick(index)"
          >
            <text>{{ item[showValue] }}</text>
          </view>
        </scroll-view>
      </view>
    </view>
  </view>
</template>
<script>
export default {
  name: "select",
  props: {
    // placeholder: {
    // 	type: String,
    // 	default: '请输入信息'
    // },
    infoList: {
      type: Array,
      default() {
        return [];
      },
    },
    value: {
      type: String,
      default: "",
    },
    showValue: {
      type: String,
      default: "name",
    },
    emptyTips: {
      type: String,
      default: "暂无数据",
    },
    loading: {
      type: Boolean,
      default: false,
    },
    btnStyleColor: {
      type: Object,
      default() {
        return {};
      },
    },
    uniShadow: {
      type: Boolean,
      default: true,
    },
    type: {
      type: String,
      default: "primary",
    },
    size: {
      type: String,
      default: "medium",
    },
    isShowSelect: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputIsShow: false,
      inputVal: "",
      dataList: [],
      isShowClearIcon: false,
    };
  },
  computed: {
    dataListLength() {
      return this.dataList.length;
    },
  },
  watch: {
    value: {
      handler(newVal) {
        this.inputVal = newVal;
      },
      immediate: true,
    },
    infoList: {
      handler(newVal) {
        this.dataList = newVal;
      },
      deep: true,
      immediate: true,
    },
    inputVal(val) {
      if (!val.length) {
        this.isShowClearIcon = false;
      }
    },
  },
  methods: {
    closeDielog() {
      this.inputIsShow = false;
    },
    onFocus() {
      if (this.dataList.length) {
        this.inputIsShow = true;
        this.isShowClearIcon = !!this.inputVal;
      }
    },
    onSelectorClick(index) {
      this.inputIsShow = false;
      this.isShowClearIcon = false;
      this.inputVal = this.dataList[index][this.showValue];
      this.$emit("input", this.inputVal);
      this.$emit("change", this.dataList[index]);
    },
    onInput() {
      this.$emit("input", this.inputVal);
    },
    handleSearch() {
      if (this.inputIsShow == false) {
        this.inputIsShow = true;
        this.$emit("handleSearch", true);
      } else {
        this.inputIsShow = false;
        this.$emit("handleSearch", false);
      }
    },
    clearInputValue() {
      this.inputVal = "";
    },
  },
};
</script>
<style scoped lang="scss">
// $selectWidth: 75%; // 下拉选择框宽度
.small {
  transform: scale(0.9, 0.9);
}
.uni-primary {
  background-color: $uni-color-primary;
}
.uni-success {
  background-color: #67c23a;
}
.uni-warning {
  background-color: $uni-color-warning;
}
.uni-error {
  background-color: $uni-color-error;
}
.hover {
  transition: all 0.6s;
  transform: scale(0.8, 0.8);
}
.uni-flex {
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
}
.unishadow {
  box-shadow: 0rpx 1rpx 5rpx #dddddd;
}
.uni-search-form {
  position: relative;
  width: 80%;
  margin: 0rpx;
  padding: 10rpx 80rpx;
  font-size: 30rpx;
  color: #999999;
}
.uniRound {
  border-radius: 5px;
}
.uni-circular {
  border-radius: 100rpx;
}
.uni-icon-position {
  position: absolute;
  top: 50%;
  left: 26rpx;
  transform: translate(0, -50%);
}
.uni-icon-clear {
  position: absolute;
  top: 50%;
  right: 26rpx;
  transform: translate(0, -50%);
}
.uni-background {
  //   background-color: #f5f5f5;
}
/* button */
.uni-action {
  width: 80%;
  height: 66rpx;
  position: absolute;
  right: 0%;
  z-index: 9;
}
.uni-cu-btn {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #ffffff;
  font-size: 28rpx;
  border: none;
  // background-color: $uni-color-primary;
}
.uni-shadow-blur {
  box-shadow: 0rpx 1rpx 10rpx #c8c7cc;
}
.uni-round {
  border-radius: 100rpx;
}
.uni-combox__selector {
  position: absolute;
  top: 80rpx;
  left: 40rpx;
  box-sizing: border-box;
  width: 75%; // 下拉框宽度
  background-color: #ffffff;
  border-radius: 6px;
  box-shadow: #dddddd 4px 4px 8px, #dddddd -4px -4px 8px;
  z-index: 999;
}
.uni-combox__selector-scroll {
  max-height: 200px;
  box-sizing: border-box;
}
.uni-combox__selector::before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  border-bottom: solid 6px #ffffff;
  border-right: solid 6px transparent;
  border-left: solid 6px transparent;
  left: 50%;
  top: -6px;
  margin-left: -6px;
}
.uni-combox__selector-empty {
  text-align: center;
  color: #8f8f94;
  padding: 20rpx 0;
  font-size: 28rpx;
}
.uni-combox__selector-item {
  /* #ifdef APP-NVUE */
  display: flex;
  /* #endif */
  font-size: 24rpx;
  margin: 0px 10px;
  padding: 20rpx 10rpx;
  color: #808080;
}
.uni-combox__selector-item:hover {
  background-color: #dddddd;
}
.uni-combox__selector-empty:last-child,
.uni-combox__selector-item:last-child {
  border-bottom: none;
}
</style>
