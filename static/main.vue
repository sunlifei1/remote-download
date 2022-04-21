<template>
  <van-row>
    <van-nav-bar title="基于Vue的界面" />
    <van-tabs v-model="activeTab">
      <van-tab title="进度">
        <van-image @click="imageClick" :src="imageData" />
        <van-row type="flex" justify="center">
          <van-button type="primary" @click="imageClick" style="margin-top: 12px;">获取</van-button>
        </van-row>
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
      imageData: "",
      username: "",
    };
  },
  methods: {
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
        });
    },
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