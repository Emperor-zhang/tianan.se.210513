import { useParent } from "../common/relation";
import { VantComponent } from "../common/component";
VantComponent({
  field: true,
  relation: useParent("dropdown-menu", function() {
    this.updateDataFromParent();
  }),
  props: {
    value: {
      type: null,
      observer: "rerender",
    },
    title: {
      type: String,
      observer: "rerender",
    },
    disabled: Boolean,
    titleClass: {
      type: String,
      observer: "rerender",
    },
    options: {
      type: Array,
      value: [],
      observer: "rerender",
    },
    popupStyle: String,
  },
  data: {
    transition: true,
    showPopup: false,
    showWrapper: false,
    displayTitle: "",
  },
  methods: {
    rerender() {
      wx.nextTick(() => {
        var _a;
        (_a = this.parent) === null || _a === void 0
          ? void 0
          : _a.updateItemListData();
      });
    },
    updateDataFromParent() {
      if (this.parent) {
        const {
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction,
        } = this.parent.data;
        this.setData({
          overlay,
          duration,
          activeColor,
          closeOnClickOverlay,
          direction,
        });
      }
    },
    onOpen() {
      this.$emit("open", { num: 0 });
      wx.setStorageSync("openx", 10);
    },
    onOpened() {
      this.$emit("opened");
      wx.setStorageSync("openx", 10);
    },
    onClose() {
      this.$emit("close", { num: 0 });
      wx.setStorageSync("openx", 0);
      setTimeout(() => {
        this.setData({ showWrapper: false });
      }, 500);
      this.setData({
        showPopup: false,
      });
    },
    onClosed() {
      this.$emit("closed");
      wx.setStorageSync("openx", 0);
      this.setData({ showWrapper: false });
      this.setData({
        showPopup: false,
      });
    },
    onOptionTap(event) {
      const { option } = event.currentTarget.dataset;
      const { value } = option;
      const shouldEmitChange = this.data.value !== value;
      this.setData({ showPopup: false, value });
      this.$emit("close");
      this.rerender();
      if (shouldEmitChange) {
        getApp().globalData.value = value;
        this.$emit("change", value);
        wx.setStorageSync("openx", 10);
      }
    },
    toggle(show, options = {}) {
      var _a;
      const { showPopup } = this.data;
      if (typeof show !== "boolean") {
        show = !showPopup;
      }
      if (show === showPopup) {
        return;
      }
      this.setData({
        transition: !options.immediate,
        showPopup: show,
      });
      if (show) {
        (_a = this.parent) === null || _a === void 0
          ? void 0
          : _a.getChildWrapperStyle().then((wrapperStyle) => {
              this.setData({ wrapperStyle, showWrapper: true });
              this.rerender();
            });
      } else {
        this.rerender();
      }
    },
  },
});
