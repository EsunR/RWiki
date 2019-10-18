<template>
  <div id="app">
    <el-container>
      <el-header ref="topbar" v-show="!fullScreen">
        <head-bar></head-bar>
      </el-header>
      <router-view></router-view>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import HeadBar from "./components/header/head-bar";
export default {
  name: "app",
  components: {
    HeadBar
  },
  methods: {
    ...mapActions(["setUserInfo", "changeLoginState"]),
    async _getSysStatus() {
      let result = await this.axios.get("/sys/sysStatus");
      let count = result.data.data.adminCount;
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    },
    _getUserInfo() {
      this.axios
        .get("/base/getUserInfo")
        .then(res => {
          if (res.data.msg === "ok") {
            this.setUserInfo(res.data.data);
          } else {
            throw new Error(res.data.msg);
          }
        })
        .catch(err => {
          console.log(err);
          this.$message.error(err);
        });
    },
    updateToken() {
      // 检查当前Token是否有效
      this.axios
        .get("/base/updateToken")
        .then(res => {
          if (res.data.msg === "ok") {
            // 如果不过期就用当前Token获取用户信息
            this.changeLoginState(true);
            this._getUserInfo();
          } else {
            throw new Error("Token 过期");
          }
        })
        .catch(err => {
          this.$message.error(`Ops! 看起来需要重新登录哦! ${err}`);
          window.localStorage.removeItem("login_token");
          this.$router.push("/login");
        });
    }
  },
  mounted() {
    if (window.localStorage.getItem("login_token")) {
      this.updateToken();
    }
  },
  computed: {
    fullScreen() {
      return this.$store.getters.fullScreen;
    }
  }
};
</script>

<style>
html {
  height: 100%;
}
body {
  height: 100%;
  margin: 0;
  padding: 0;
  color: #606266;
  background-color: rgba(0, 0, 0, 0.05);
}
ul,
li {
  list-style: none;
  margin: 0;
  padding: 0;
}
hr {
  border: 0.5px solid rgba(0, 0, 0, 0.1);
}
</style>

<style lang="scss" scoped>
#app {
  height: 100%;
}
.el-header {
  width: 100%;
  background-color: $color-main;
  color: #ffffff;
  z-index: 2;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
}
.el-container {
  height: 100%;
}
</style>
