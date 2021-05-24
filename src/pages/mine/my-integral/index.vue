<template>
  <view class="content">
    <image
      :src="$url + 'mine/15-1.png'"
      mode="widthFix"
      v-if="list.length != 0"
    ></image>
    <view class="search" v-if="list.length != 0">
      <uni-search-bar
        :placeholder="placeholder"
        :radius="radius"
        :bgColor="bgColor"
        @input="handleSearch"
      >
      </uni-search-bar>
    </view>
    <scroll-view class="listBox" scroll-y v-if="list.length != 0">
      <block v-for="(item, index) in val == '' ? list : newList" :key="index">
        <view class="itemBox">
          <view class="item-top">
            <view class="title">{{ item.title }}</view>
            <view class="inte">+{{ item.inte }}分</view>
          </view>
          <view class="time">{{ item.time }}&nbsp;&nbsp;12:12</view>
        </view>
      </block>
    </scroll-view>
    <image
      v-if="list.length == 0"
      :src="$url + 'mine/20-1.png'"
      mode="widthFix"
    ></image>
  </view>
</template>
<script>
var that;
export default {
  data() {
    return {
      $url: this.url,
      placeholder: "标题搜索",
      radius: "50",
      bgColor: "#fff",
      val: "",
      list: [
        { title: "1", inte: "10", time: "2021-05-21" },
        { title: "12", inte: "10", time: "2021-05-21" },
        { title: "123", inte: "10", time: "2021-05-21" },
        { title: "4", inte: "10", time: "2021-05-21" },
        { title: "15", inte: "10", time: "2021-05-21" },
        { title: "6", inte: "10", time: "2021-05-21" },
        { title: "7", inte: "10", time: "2021-05-21" },
      ],
      newList: [],
      oldList: [],
      num: 0,
    };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {},
  components: {},

  methods: {
    handleSearch(e) {
      that.val = e;
      that.newList = [];
      if (e != "") {
        that.list.map((res) => {
          that.num++;
          console.log();
          if (res.title.includes(e) == true) {
            that.newList.push(res);
            that.num = 0;
          } else {
            if (that.num >= that.list.length) {
              that.newList = [];
            }
          }
        });
      } else {
        that.newList = [];
      }
    },
  },
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
  .search {
    position: absolute;
    width: 646rpx;
    left: 52rpx;
    top: 180rpx;
  }
  .listBox {
    position: absolute;
    width: 606rpx;
    height: 800rpx;
    left: 72rpx;
    top: 350rpx;
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
