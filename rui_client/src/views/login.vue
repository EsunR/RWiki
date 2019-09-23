<template>
  <div id="login" class="card">
    <div class="title">
      <div :class="{active: loginMode}" @click="changeLoginMode(true)">登录</div>
      <div class="center"></div>
      <div :class="{active: !loginMode}" @click="changeLoginMode(false)">注册</div>
    </div>
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
  name: "login",
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

<style lang='scss'>
#login {
  position: relative;
  padding: 20px;
  .title {
    display: flex;
    font-size: 2rem;
    margin-bottom: 20px;
    align-items: center;
    div {
      opacity: 0.3;
      cursor: pointer;
      transition: all 0.3s linear;
      &:hover {
        color: #409eff;
      }
    }
    .active {
      color: #409eff;
      opacity: 1;
    }
    .center {
      height: 20px;
      width: 2px;
      background-color: #409eff;
      opacity: 1;
      margin: 0 10px;
    }
  }
  .btn-box {
    position: absolute;
    right: 20px;
    .el-button {
      width: 45px;
      height: 45px;
    }
    @media screen and(max-width: 600px) {
      width: 100%;
      display: flex;
      justify-content: center;
      .el-button {
        transform: translateX(20px);
      }
    }
  }
}
</style>