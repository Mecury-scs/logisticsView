<template>
  <el-card class="box-card" header="修改密码">
  <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="原密码" prop="password">
      <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="新密码" prop="newPassword">
      <el-input type="password" v-model="ruleForm.newPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="确认密码" prop="checkPassword">
      <el-input type="password" v-model="ruleForm.checkPassword" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
  </el-card>
</template>

<script>
export default {
  name:'UpdatePwdView',
  data() {
    let validatePass1 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入密码'));
      } else {
        if (this.ruleForm.checkPassword !== '') {
          this.$refs.ruleForm.validateField('checkPassword');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'));
      } else if (value !== this.ruleForm.newPassword) {
        callback(new Error('两次输入密码不一致!'));
      } else {
        callback();
      }
    };
    // console.log(sessionStorage.getItem("customer"))
    return {
      ruleForm: {
        username:sessionStorage.getItem("user"),
        password:'',
        newPassword: '',
      },
      rules: {
        password: [
          {required: true, message: '密码不可为空', trigger: 'blur'}
        ],
        newPassword: [
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { validator: validatePass1, trigger: 'blur' }
        ],
        checkPassword: [
          { min: 6, max: 18, message: '长度在 6 到 18 个字符', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
    submitForm(formName) {
      if (sessionStorage.getItem("token")==null){
        this.$message.error("还没登录就想改密码,你咋不起飞了")
        this.$router.push("/")
      }
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/admin/updatePwd",null,{params:this.ruleForm})
          .then(res=>{
            if (res.data.code == "10000"){
              this.$message.success("修改密码成功");
              sessionStorage.removeItem("token");
              sessionStorage.removeItem("user");
              this.$router.push("/");
            }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
}
</script>