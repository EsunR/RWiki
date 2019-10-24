<template>
  <div class="article-editor">
    <div :class="{ title: true, 'title-active': title !== ''}">
      <input v-model="title" class="title-input" type="text" placeholder="请输入标题" />
    </div>
    <mavon-editor :boxShadow="boxShadow" v-model="md" @change="(md, html) => this.html = html" />
    <div class="button-wrapper">
      <el-button type="primary" @click="handleSubmit">提交</el-button>
      <el-button type="danger" @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "article-editor",
  data() {
    return {
      editMode: "new", // or modify
      md: "",
      html: "",
      title: ""
    };
  },
  props: {
    // 如果传入 articleInfo 则自动转换为 modify 模式
    articleInfo: {
      type: Object,
      default: function() {
        return {};
      }
    },
    projectInfo: {
      type: Object,
      required: true
    },
    boxShadow: {
      type: Boolean,
      default: true
    }
  },
  methods: {
    init() {
      if (this.articleInfo._id) {
        this.md = this.articleInfo.md;
        this.html = this.articleInfo.html;
        this.editMode = "modify";
      }
    },
    _editorClear() {
      this.md = "";
      this.html = "";
      this.title = "";
    },
    handleSubmit() {
      if (this._.trim(this.md) === "" || this._.trim(this.title) === "") {
        this.$message.error("请填写完整内容!");
        return;
      }
      switch (this.editMode) {
        case "new":
          this.$emit("new", {
            pid: this.projectInfo._id,
            title: this.title,
            md: this.md,
            html: this.html
          });
          break;
        case "modify":
          this.$emit("modify", {
            pid: this.projectInfo._id,
            title: this.title,
            md: this.md,
            html: this.html,
            aid: this.articleInfo._id
          });
          break;
      }
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
    width: 100%;
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