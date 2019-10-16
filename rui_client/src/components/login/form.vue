<template>
  <div id="login-reg-form">
    <el-form ref="loginForm" :model="form" :rules="rules">
      <el-form-item prop="name">
        <el-input v-model="form.name" placeholder="用户名">
          <template slot="prepend">
            <i class="el-icon-user-solid"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input type="password" v-model="form.password" placeholder="密码">
          <template slot="prepend">
            <i class="el-icon-key"></i>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item v-if="loginMode === false" prop="rePassword">
        <el-input type="password" v-model="form.rePassword" placeholder="再次输入密码">
          <template slot="prepend">
            <i class="el-icon-key"></i>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <div class="btn-box" @click="loginMode ? login() : register()">
      <el-button type="primary" icon="el-icon-check" circle></el-button>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  name: "login-reg-form",
  data() {
    var checkPassword = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.form.rePassword !== "" && this.loginMode === false) {
          this.$refs.loginForm.validateField("rePassword");
        }
        callback();
      }
    };
    var checkPassword2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      form: {
        name: "",
        password: "",
        rePassword: ""
      },
      loginMode: true,
      rules: {
        name: [
          {
            required: true,
            message: "请输入用户名",
            trigger: ["change", "blur"]
          }
        ],
        password: [{ validator: checkPassword, trigger: ["change", "blur"] }],
        rePassword: [{ validator: checkPassword2, trigger: ["change", "blur"] }]
      }
    };
  },
  methods: {
    ...mapActions(["changeLoginState"]),
    changeLoginMode(value) {
      this.loginMode = value;
    },
    login() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.axios
            .post("/base/login", this.form)
            .then(res => {
              if (res.data.msg == "ok") {
                this.$message.success("登录成功");
                this.changeLoginState(true);
                window.localStorage.setItem("login_token", res.data.data.token);
                this.$router.push("/home");
              } else {
                throw new Error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(`${err}`);
            });
        } else {
          return false;
        }
      });
    },
    register() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.axios
            .post("/base/register", this.form)
            .then(res => {
              if (res.data.msg == "ok") {
                this.$message.success("注册成功，已登录");
                this.changeLoginState(true);
                window.localStorage.setItem("login_token", res.data.data.token);
                this.$router.push("/home");
              } else {
                throw new Error(res.data.msg);
              }
            })
            .catch(err => {
              console.log(err);
              this.$message.error(`${err}`);
            });
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
</style>