<template>
  <div :id="`article_${articleInfo._id}`" class="article">
    <div class="article-title">
      <span>{{articleInfo.title}}</span>
      <div class="button-wrapper">
        <el-button icon="el-icon-edit" size="mini" circle @click="editorShow = !editorShow"></el-button>
        <el-button type="info" icon="el-icon-delete" size="mini" circle @click="handleDeleteClick"></el-button>
      </div>
    </div>
    <div class="article-content" v-html="articleInfo.html" v-show="!editorShow"></div>
    <div class="editor-wrapper">
      <article-editor
        v-if="editorShow"
        :boxShadow="false"
        :articleInfo="articleInfo"
        :projectInfo="projectInfo"
        @modify="handleArticleModify"
      />
    </div>
  </div>
</template>

<script>
import ArticleEditor from "./article-editor";
export default {
  data() {
    return {
      editorShow: false
    };
  },
  props: ["projectInfo", "articleInfo"],
  components: {
    ArticleEditor
  },
  methods: {
    handleDeleteClick() {
      this.$confirm("此操作将永久删除该文段, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.handleDelete(this.articleInfo._id);
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    handleDelete(aid) {
      this.axios
        .delete("/project/article", {
          params: {
            aid: aid,
            pid: this.projectInfo._id
          }
        })
        .then(() => {
          this.$message.success("删除成功");
          this.$emit("deleteArticleSuccess", aid);
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`${err}`);
        });
    },
    handleArticleModify(payload) {
      this.axios
        .post("/project/modifyArticle", payload)
        .then(res => {
          this.$emit("modifyArticleSuccess", res.data.data);
          this.$message.success("修改成功");
          this.editorShow = false;
        })
        .catch(err => {
          console.log(err);
          this.$message.error(`${err}`);
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.article {
  background-color: #ffffff;
  border-radius: 5px;
  box-shadow: 0 5px 5px rgba(0, 0, 0, 0.1);
  margin: 20px 0;
}
.article-title {
  font-size: 1.2rem;
  background-color: $color-main;
  padding: 10px;
  color: #ffffff;
  border-radius: 5px 5px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media screen and (min-width: 700px) {
    padding: 10px 20px;
  }
}
.article-content {
  padding: 5px 10px;
  @media screen and (min-width: 700px) {
    padding: 5px 20px;
  }
}
.editor-wrapper {
  padding: 10px;
  background: none;
}
</style>

<style lang="css" scope>
p {
  margin: 10px 0;
}

h1,
h2,
h3,
h4 {
  margin: 20px 0;
}

h1 {
  font-size: 1.7rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}

h2 {
  font-size: 1.5rem;
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  padding-bottom: 10px;
}

h3 {
  font-size: 1.3rem;
}

h4 {
  font-size: 1rem;
}

hr {
  border: 2px solid rgba(0, 0, 0, 0.1);
}

blockquote {
  background-color: rgba(0, 0, 0, 0.05);
  margin: 10px 0;
  padding: 10px;
}
blockquote p {
  margin: 0;
}

li {
  line-height: 1.5;
}

ul {
  padding-left: 20px;
}
ul li {
  list-style: disc;
}

ol {
  padding-left: 20px;
}
ol li {
  list-style: decimal;
}

a {
  text-decoration: none;
  color: cornflowerblue;
}
a:hover {
  text-decoration: underline;
}

/* 代码块 */

.hljs code {
  background: none;
}

code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 3px;
  border-radius: 2px;
  color: rgba(220, 20, 60, 0.9);
}
</style>