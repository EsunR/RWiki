<template>
  <div class="new-project-form">
    <el-form ref="form" :model="formData" :rules="rules">
      <el-form-item prop="projectName">
        <el-input v-model="formData.projectName" placeholder="项目名称（必填）"></el-input>
      </el-form-item>
      <el-form-item prop="desc">
        <el-input v-model="formData.desc" placeholder="项目描述"></el-input>
      </el-form-item>
    </el-form>
    <div class="button-wrapper">
      <el-button @click="$emit('cancel')">取 消</el-button>
      <el-button @click="submitForm" type="primary">确 定</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: "new-project-form",
  data() {
    return {
      formData: {
        projectName: "",
        desc: ""
      },
      rules: {
        projectName: [
          { required: true, message: "请输入项目名称", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate(valid => {
        if (valid) {
          let { projectName, desc } = this.formData;
          this.axios
            .post("/project/createProject", {
              projectName,
              desc
            })
            .then(res => {
              if (res.data.msg === "ok") {
                this.$message.success("创建成功!");
                this._resetForm();
                this.$emit("submit");
              } else {
                throw new Error(res.data.msg);
              }
            })
            .catch(err => {
              this.$message.error(err);
            });
        }
      });
    },
    _resetForm() {
      for (let key in this.formData) {
        this.formData[key] = "";
      }
    }
  },
  watch: {
    formData: {
      handler(newVal) {
        this.$emit("update:formData", newVal);
      },
      deep: true
    }
  }
};
</script>

<style lang="scss" scoped>
.button-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
