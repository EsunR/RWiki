<template>
  <div id="app">
    <el-container>
      <el-header ref="topbar">
        <div class="container">
          <div class="title">Wiki-Light</div>
          <ul class="menu">
            <li>
              <router-link tag="i" to="/edit" class="el-icon-plus"></router-link>
            </li>
          </ul>
        </div>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "app",
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
  }
};
</script>

<style>
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
.el-header {
  width: 100%;
  background-color: #409eff;
  color: #ffffff;
  .container {
    margin: 0 auto;
    max-width: 1200px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .menu {
      li i {
        transition: all 0.2s linear;
        padding: 10px;
        border-radius: 50%;
        cursor: pointer;
        &:hover {
          background-color: #53a8ff;
        }
      }
    }
  }
}
.el-main {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  overflow: visible;
  @media screen and (min-width: 1200px) {
    padding-left: 0;
    padding-right: 0;
  }
}
</style>
