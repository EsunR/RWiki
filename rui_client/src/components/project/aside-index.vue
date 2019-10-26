<template>
  <el-aside :width="`${barWidth}px`">
    <ul class="list-wrapper">
      <div class="active" :style="{transform: `translateY(${activeTop}px)`}"></div>
      <li
        v-for="(item,index) in indexList"
        :key="item._id"
        @click="handleIndexClick(index)"
      >{{index + 1}}. {{item.title}}</li>
    </ul>
    <div class="button-wrapper">
      <el-button
        type="primary"
        round
        icon="el-icon-circle-plus"
        v-if="permission"
        @click="handleAddArticleClick"
      >添加文章</el-button>
    </div>
  </el-aside>
</template>

<script>
import permission from "../../mixin/permission";
export default {
  mixins: [permission],
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
    },
    handleAddArticleClick() {
      this.$emit("addArticle")
    }
  }
};
</script>

<style lang='scss' scoped>
.el-aside {
  background-color: white;
  box-shadow: 0px 0 5px rgba(0, 0, 0, 0.2);
}
.list-wrapper {
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
.button-wrapper {
  display: flex;
  justify-content: center;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  button {
    width: 150px;
  }
}
</style>