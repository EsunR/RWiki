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
      console.log(result);
    },
    updateToken() {
      // 检查当前Token是否有效
      this.axios
        .get("/base/updateToken")
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.warn("尝试重新登录，", err);
          this.$message.error("Ops! 看起来需要重新登录哦");
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
</style>
