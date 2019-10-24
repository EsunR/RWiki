<template>
  <el-aside :width="`${barWidth}px`">
    <ul class="wrapper">
      <div class="active" :style="{transform: `translateY(${activeTop}px)`}"></div>
      <li
        v-for="(item,index) in indexList"
        :key="item._id"
        @click="handleIndexClick(index)"
      >{{index + 1}}. {{item.title}}</li>
    </ul>
  </el-aside>
</template>

<script>
export default {
  data() {
    return {
      barWidth: 250,
      hide: false,
      activeTop: 0
    };
  },
  props: ["indexList", "activeArticle"],
  mounted() {
    if (document.body.clientWidth < 500) {
      this.barWidth = 0;
      this.hide = true;
    }
  },
  watch: {
    activeArticle: function(val) {
      this.indexList.some((element, index) => {
        if (element._id === val.split("_")[1]) {
          this.activeTop = index * 44;
          return true;
        }
      });
    }
  },
  methods: {
    handleIndexClick(index) {
      let articleId = this.indexList[index]._id;
      this.activeTop = index * 44;
      this.$emit("indexClick", articleId);
    }
  }
};
</script>

<style lang='scss' scoped>
.el-aside {
  background-color: white;
  box-shadow: 0px 0 5px rgba(0, 0, 0, 0.2);
}
.wrapper {
  padding: 0;
  position: relative;
  li {
    list-style: none;
    padding: 10px;
    cursor: pointer;
    transition: background-color 0.2s ease;
    &:hover {
      background-color: rgba(0, 0, 0, 0.1);
      color: $color-font;
    }
  }
  .active {
    width: 5px;
    background-color: $color-main;
    position: absolute;
    right: 0;
    top: 0;
    height: 44px;
    transition: all 0.5s ease;
  }
}
</style>