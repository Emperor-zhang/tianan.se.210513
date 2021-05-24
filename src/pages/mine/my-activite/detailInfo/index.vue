<template>
  <view class="content"></view>
</template>
<script>
var that;
export default {
  data() {
    return { num: "" };
  },
  onLoad() {
    that = this; /**自定义组件中要onLoad换成created*/
  },
  onShow() {},
  components: {},
  watch: {
    num: function(newValue, oldValue) {
      /**实时监听数据的变化，也可以兼容听方法名（api->watch） */
    },
  },
  methods: {},
};
</script>
<style lang="scss" scoped>
.content {
  position: relative;
  width: 100%;
}
</style>
