<template>
  <div class="article-editor">
    <div :class="{ title: true, 'title-active': articleTitle !== ''}">
      <input v-model="articleTitle" class="title-input" type="text" placeholder="请输入标题" />
    </div>
    <mavon-editor v-model="md" @change="(md, html) => this.html = html" />
    <div class="button-wrapper">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button type="danger" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      editMode: "new",
      md: "",
      html: "",
      articleTitle: ""
    };
  },
  props: {
    articleInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    projectInfo: {
      type: Object,
      required: true
    }
  },
  methods: {
    init() {
      if (this.articleInfo) {
        this.md = this.articleInfo.md;
        this.html = this.articleInfo.html;
        this.editMode = "modify";
      }
    },
    handleSubmit() {
      switch (this.editMode) {
        case "new":
          
          break;
        case "modify":
          break;
      }
      this.$emit("submit", {
        md: this.md,
        html: this.html,
        articleTitle: this.articleTitle
      });
    },
    handleCancel() {
      this.$emit("cancel");
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style lang='scss' scoped>
.title {
  margin: 10px 0;
  padding-bottom: 10px;
  border-bottom: 1px solid rgba($color: #000000, $alpha: 0.3);
  transition: all 0.5s ease;
  .title-input {
    background: none;
    border: none;
    font-size: 2rem;
    color: $color-main;
    &::placeholder {
      color: rgba($color: #000000, $alpha: 0.3);
    }
  }
}
.title-active {
  border-color: $color-main !important;
}

.button-wrapper {
  display: flex;
  flex-direction: row-reverse;
  margin: 10px 0;
  button {
    margin-left: 10px;
  }
}
</style>