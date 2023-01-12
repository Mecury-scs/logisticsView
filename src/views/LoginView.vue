<template>
  <div>
    <el-form ref="loginForm" :model="form" :rules="rules" label-width="80px" class="login-box">
      <h3 class="login-title">欢迎登录</h3>
      <el-form-item label="账号" prop="username">
        <el-input type="text" placeholder="请输入账号" v-model="form.username"/>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" placeholder="请输入密码" v-model="form.password"/>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" v-on:click="onSubmit('loginForm')">登录</el-button>
      </el-form-item>
    </el-form>

    <el-dialog
        title="温馨提示"
        :visible.sync="dialogVisible"
        width="30%"
    >
      <!--      :before-close="handleClose"-->

      <span>请输入账号和密码</span>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>

export default {
  name: "LoginView",
  data() {
    return {
      form: {
        username: 'admin',
        password: '123456'
      },

      // 表单验证，需要在 el-form-item 元素中增加 prop 属性
      rules: {
        username: [
          {required: true, message: '账号不可为空', trigger: 'blur'}
        ],
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ]
      },

      // 对话框显示和隐藏
      dialogVisible: false
    }
  },
  methods: {
    onSubmit(formName) {
      // 为表单绑定验证功能
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // 使用 vue-router 路由到指定页面，该方式称之为编程式导航
          this.axios.post("login", null, {params: this.form})
              .then(res=> {
                if (res.data.code=="10000"){
                  let token = res.data.data;
                  console.log(token)
                  sessionStorage.setItem("token", token);
                  // 通过token获取token中携带的数据
                  // 得到token的分隔符(".")
                  let start = token.indexOf(".");
                  let end = token.lastIndexOf(".");
                  // 截取中间的数据内容
                  let userString = token.substring(start + 1, end);
                  // // 将base64转成字节数组
                  var from = atob(userString, "base64");
                  // 得到字符串
                  let jsonString = new String(from);
                  console.log(jsonString)

                  // var jsonString = atob(userString);

                  // 将字符串转成json对象
                  let u = JSON.parse(jsonString);
                  // 在json对象中获取用户信息并保存
                  sessionStorage.setItem("user", u.userName);
                  console.log(u)
                  console.log(sessionStorage.getItem("user"))
                  this.$router.push("/home");
                }
              });
        } else {
          this.dialogVisible = true;
          return false;
        }
      });
    }
  }
}
</script>

<style>
.login-box {
  border: 1px solid #DCDFE6;
  width: 350px;
  margin: 180px auto;
  padding: 35px 35px 15px 35px;
  border-radius: 5px;
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  box-shadow: 0 0 25px #909399;
}

.login-title {
  text-align: center;
  margin: 0 auto 40px auto;
  color: #303133;
}
</style>
