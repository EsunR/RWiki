<template>
  <div id="aside">
    <ul class="wrapper">
      <li class="item active">
        <i class="el-icon-s-home"></i>
        <span>主页</span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang='scss' scoped>
#aside {
  background-color: $color-main-lite;
  height: 100%;
}

.wrapper {
  .active {
    background-color: $color-main-deep;
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
</style>