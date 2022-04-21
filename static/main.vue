<template>
  <van-row>
    <van-nav-bar title="基于Vue的界面" />

    <van-tabs v-model="activeTab">
      <van-tab title="配置">
        <van-image src="imageData" />
        <van-row type="flex" justify="center">
          <van-button type="primary" @click="imageClick" style="margin-top: 12px;">获取</van-button>
        </van-row>
      </van-tab>

      <van-tab title="运行">
        <van-cell title="运行日志" is-link @click="showLog" />

      </van-tab>

      <van-tab title="关于">
        <van-cell value="运行环境" title="Auto.js Pro" label="Node.js + WebView + Android" />
        <van-cell title="Vue.js" label="渐进式JavaScript框架" is-link @click="openVueWebsite" />
        <van-cell title="Vant" label="轻量、可靠的移动端 Vue 组件库" is-link @click="openVantWebsite" />
      </van-tab>
    </van-tabs>
  </van-row>
</template>
 <script>
export default {
  data() {
    return {
      imageData: "",
    };
  },
  methods: {
    imageClick() {
      console.log("点击了");
      window.axios.get("/download").then((res) => {
        console.log(res.data);
        this.imageData = "data:image/png;base64," + res.data.data;
        console.log(res.data.data);
        console.dir(this.imageData);
      });
    },
  },
  created: function () {},
};
</script>