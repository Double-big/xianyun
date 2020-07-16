<template>
  <!-- 数据校验第一步, 表单整体绑定一个数据对象 -->
  <!-- 数据校验第二步, 表单绑定一个校验规则对象, 里面跟数据对象一一对应 -->
  <el-form :model="form" ref="form" :rules="rules" class="form">
    <el-form-item class="form-item" prop="username">
      <el-input placeholder="用户名/手机" v-model="form.username" @focus="clearMsg('username')"></el-input>
    </el-form-item>

    <el-form-item class="form-item" prop="password">
      <el-input
        placeholder="密码"
        type="password"
        v-model="form.password"
        @focus="clearMsg('password')"
      ></el-input>
    </el-form-item>

    <p class="form-text">
      <nuxt-link to="#">忘记密码</nuxt-link>
    </p>

    <el-button class="submit" type="primary" @click="handleLoginSubmit">登录</el-button>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      // 表单数据
      form: {
        username: "13800138000",
        password: "123456"
      },
      // 表单规则
      rules: {
        username: [
          // 可以写多条规则, 会按照顺序进行校验
          // 1.0
          {
            required: true,
            message: "请输入用户名",
            trigger: "blur"
          },
          //2.0
          {
            min: 6,
            max: 15,
            message: "用户名在 6 到 15 个字符之间",
            trigger: "blur"
          },
          {
            pattern: /^\d+$/,
            message: "必须输入数字",
            trigger: "blur"
          }
        ],
        password: [
          //1.0
          {
            required: true,
            message: "请输入密码",
            trigger: "blur"
          },
          //2.0
          {
            pattern: /^\d{5,8}$/,
            message: "密码由 5 到 8位数字组成",
            trigger: "blur"
          }
        ]
      }
    };
  },
  // 提交登录
  methods: {
    handleLoginSubmit() {
      // 验证表单
      //   写法1
      //   this.$refs["form"].validate(valid => {
      //     // 为true表示没有错误
      //     if (valid) {
      //       this.$axios({
      //         url: "/accounts/login",
      //         method: "POST",
      //         data: this.form
      //       }).then(res => {
      //         console.log(res.data);
      //       });
      //     }
      //   });
      // 写法2
      this.$refs.form.validate((isValid, objNotValid) => {
        //   第一个参数代表是否验证成功, 只有成功的状态, 才能发出请求
        if (isValid) {
          // this.$axios({
          //   url: "/accounts/login",
          //   method: "POST",
          //   data: this.form
          // }).then(res => {
          //   console.log(res.data);
          //   if (res.data.token) {
          //     this.$store.commit("user/setUserInfo", res.data);
          //   }
          // });
          // console.log('开始登陆');
          // promise  return axios 出来, 这里用  .then 接收,  return res  ,这里的用res接收, 如果没有return res ,这里的res则为空值
          this.$store.dispatch("user/login", this.form).then(res => {
            console.log("这里是 promise return 的 res", res.data);
          });
        } else {
          // 如果失败, 尝试将 objNotValid 告诉你那个字段失败的信息打印出来
          console.log(objNotValid);
        }
      });
      // 方法3, 也可以用 promise ,这是element封装好的
      //   this.$refs.form
      //     .validate()
      //     .then(isValid => {
      //       if (valid) {
      //         this.$axios({
      //           url: "/accounts/login",
      //           method: "POST",
      //           data: this.form
      //         }).then(res => {
      //           console.log(res.data);
      //         });
      //       }
      //     })
      //     .catch(err => {
      //       console.log(err);
      //     });
    },
    clearMsg(propName) {
      this.$refs.form.clearValidate(propName);
    }
  }
};
</script>

<style scoped lang="less">
.form {
  padding: 25px;
}

.form-item {
  margin-bottom: 20px;
}

.form-text {
  font-size: 12px;
  color: #409eff;
  text-align: right;
  line-height: 1;
}

.submit {
  width: 100%;
  margin-top: 10px;
}
</style>
