<template>
  <div id="new-article">
    <div v-show="!editorShow" class="add" @click="editorShow = true">
      <i class="el-icon-document-add"></i> 新增
    </div>
    <article-editor
      v-show="editorShow"
      :projectInfo="projectInfo"
      @new="handleNewProject"
      @cancel="handleCancel"
    />
  </div>
</template>

<script>
import ArticleEditor from "./article-editor";
export default {
  name: "new-article",
  data() {
    return {
      editorShow: false
    };
  },
  props: ["projectInfo"],
  components: {
    ArticleEditor
  },
  methods: {
    handleNewProject(payload) {
      console.log(payload);
      this.axios
        .post("/project/addArticle", {
          pid: payload.pid,
          title: payload.title,
          md: payload.md,
          html: payload.html
        })
        .then(res => {
          this.$emit("addNewArticleSuccess", res.data.data);
          this.$message.success("发布成功！");
          this.$children[0]._editorClear();
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`${err}`);
        });
    },
    handleCancel() {
      this.editorShow = false;
    }
  }
};
</script>

<style lang='scss' scoped>
.add {
  background-color: #fff;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  font-size: 1.5rem;
  text-align: center;
  color: rgba(0, 0, 0, 0.3);
  cursor: pointer;
  transition: all 0.5s ease;
  &:hover {
    background-color: $color-main;
    color: #fff;
  }
}
</style>