<template>
  <div id="app">
    <el-container>
      <el-header>
        <div class="container">
          <div class="title">RUI</div>
          <!-- 菜单 -->
          <ul class="menu">
            <li>
              <i class="el-icon-plus"></i>
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
export default {
  name: "app",
  methods: {
    async _getSysStatus() {
      let result = await this.axios.get("/sys/sysStatus");
      let count = result.data.data.adminCount;
      if (count > 0) {
        return true;
      } else {
        return false;
      }
    },
    routerTest() {
      this.axios
        .get("/test/testRouter")
        .then(res => {
          if (res.data.msg == "ok") {
            console.log(res.data);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateToken() {
      // 检查当前Token是否有效
      this.axios
        .get("/base/updateToken")
        .then(res => {
          if (res.data.msg !== "ok") {
            throw new Error("Token 过期");
          }
        })
        .catch(err => {
          this.$message.error(`Ops! 看起来需要重新登录哦! ${err}`);
        });
    }
  },
  mounted() {
    this.updateToken();
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
