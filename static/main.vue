<template>
  <van-row>

    <van-tabs v-model="activeTab">
      <van-tab title="进度">
        <van-pull-refresh v-model="isLoading" @refresh="onRefresh">
          <van-image :src="imageData" />
        </van-pull-refresh>
      </van-tab>
      <van-tab title="提交">
        <van-form @submit="onSubmit">
          <van-cell-group inset>
            <van-field v-model="username" name="username" label="用户名" placeholder="用户名" :rules="[{ required: true, message: '请填写用户名' }]" />

          </van-cell-group>
          <div style="margin: 16px;">
            <van-button round block type="primary" native-type="submit">
              提交
            </van-button>
          </div>
        </van-form>
      </van-tab>

    </van-tabs>
  </van-row>
</template>
 <script>
export default {
  data() {
    return {
      count: 0,
      isLoading: false,
      imageData: "",
      username: "",
    };
  },
  methods: {
    onRefresh() {
      console.log("点击了");
      window.axios.get("/download").then((res) => {
        this.imageData = "data:image/png;base64," + res.data.data;

        this.isLoading = false;
        window.vant.Toast("刷新成功");
      });
    },
    onSubmit(values) {
      console.log("submit", values);
      window
        .axios({
          method: "post",
          url: "/downloadUrl",
          data: {
            username: values.username,
          },
        })
        .then((res) => {
          console.log(res.data);
          this.username = "";
          window.vant.Toast("提交成功");
        });
    },
    imageClick() {},
  },
  created: function () {},
};
</script>