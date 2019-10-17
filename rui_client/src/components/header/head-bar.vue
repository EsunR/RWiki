<template>
  <div id="top-bar">
    <div class="title">RWiki</div>
    <ul class="menu">
      <li>
        <router-link tag="i" to="/edit" class="el-icon-plus"></router-link>
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
#top-bar {
  margin: 0 auto;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 2;
  .title {
    font-size: 1.5rem;
    font-family: "Times New Roman", Times, serif;
  }
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
</style>