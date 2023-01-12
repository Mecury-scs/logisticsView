<template>
<div>
  <div style="margin: 20px;"></div>
  <el-card class="box-card" style="text-align: center" header="添加角色">
  <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" style="width: 1200px;position:relative;left: 200px">
    <el-form-item label="角色编码">
      <el-input v-model="formLabelAlign.roleNumber">{{formLabelAlign.roleNumber}}</el-input>
    </el-form-item>
    <el-form-item label="角色名称">
      <el-input v-model="formLabelAlign.roleName">{{formLabelAlign.roleName}}</el-input>
    </el-form-item>
    <el-form-item label="角色说明">
      <el-input v-model="formLabelAlign.roleDesc">{{ formLabelAlign.roleDesc }}</el-input>
    </el-form-item>
  </el-form>
  <div style="text-align: center">
    <el-button type="primary" @click="addRole" round>保存</el-button>
    <el-button type="info" @click="back" round>返回</el-button>
  </div>
  </el-card>
</div>
</template>

<script>
import {Message} from "element-ui";

export default {
  name: "AddView",
  data() {
    return {
      labelPosition: 'right',
      formLabelAlign: {
        roleNumber: '',
        roleName: '',
        roleDesc: ''
      }
    };
  },
  methods:{
    addRole:function () {
      this.axios.post("/role/add",this.formLabelAlign)
      .then(res =>{
        if (res.data.code == 10000){
          Message.success("添加成功")
          this.$router.push("/roles/roleList")
        }else {
          Message.error(res.data.desc)
        }
      })
    },
    back:function (){
      this.$router.push("/roles/roleList")
    }
  }
}
</script>

<style scoped>

</style>