<template>
  <el-aside :width="`${barWidth}px`">
    <ul class="wrapper">
      <li class="item active">
        <i class="el-icon-s-home"></i>
        <span>主页</span>
      </li>
    </ul>
    <div class="hide-btn" @click="handleHideBtn(true)">
      <i class="el-icon-s-fold"></i>
    </div>
    <div class="show-btn" v-show="hide" @click="handleHideBtn(false)">
      <i class="el-icon-s-unfold"></i>
    </div>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      barWidth: 80,
      hide: false
    };
  },
  methods: {
    handleHideBtn(hide) {
      if (!hide) {
        this.hide = false;
      }
      // 执行动画
      let timer = setInterval(() => {
        switch (hide) {
          // 当用户点击隐藏时执行的动画
          case true:
            if (this.barWidth > 0) {
              this.barWidth -= 4;
            } else {
              clearInterval(timer);
              this.hide = true;
            }
            break;
          // 当用户点击显示时执行的动画
          case false:
            if (this.barWidth >= 80) {
              clearInterval(timer);
            } else {
              this.barWidth += 4;
            }
        }
      }, 10);
    }
  }
};
</script>

<style lang='scss' scoped>
.el-aside {
  height: 100%;
  color: #ffffff;
  background-color: $color-main-lite;
  position: relative;
}

.wrapper {
  .active {
    background-color: $color-main;
  }
  .item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 10px 0;
    i {
      font-size: 2rem;
    }
    span {
      font-size: 14px;
    }
  }
}
.hide-btn {
  position: absolute;
  bottom: 10px;
  color: white;
  opacity: 0.8;
  font-weight: bold;
  width: 100%;
  text-align: center;
  font-size: 1.3rem;
  cursor: pointer;
}
.show-btn {
  width: 4rem;
  height: 3rem;
  position: fixed;
  bottom: 10px;
  font-size: 1.3rem;
  background-color: $color-main;
  left: -33px;
  z-index: 999;
  border-radius: 2rem;
  cursor: pointer;
  i {
    position: absolute;
    right: 8px;
    top: 14px;
  }
}
</style>