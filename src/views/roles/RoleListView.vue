<template>
  <div>
    <el-button style="position: relative;left: 0px" type="primary" size="small" @click="fnAdd">添加员工</el-button>
  <el-card class="box-card" style="text-align: center" header="物流角色管理">

  <el-table
      :data="tableData"
      border
      style="width: 1700px">
    <el-table-column
        fixed
        prop="roleNumber"
        label="角色编码"
        style="width: 25%">
    </el-table-column>
    <el-table-column
        prop="roleName"
        label="角色名称"
        style="width: 25%">
    </el-table-column>
    <el-table-column
        prop="roleDesc"
        label="角色说明"
        style="width: 25%">
    </el-table-column>
    <el-table-column
        label="操作"
        style="width: 25%" >
      <template slot-scope="scope" >
        <el-button @click="preUpdate(scope.row)" type="primary" size="small" round>修改</el-button>
        <el-button @click="preUpdateAuths(scope.row)"   type="warning" size="small"  round>权限管理</el-button>
        <el-button @click="fndelete(scope.$index,scope.row.roleId)" type="danger" size="small" round>删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  </el-card>

  </div>
</template>

<script>

import {Message} from "element-ui";

export default {
  name:'RoleListView',
  methods: {
    fnAdd:function () {
      this.$router.push("/roles/add")
    },
    handleClick(row) {
      console.log(row);
    },
    preUpdate(role){
        this.$router.push({name:'updateRole',query:{roleId:role.roleId}})
    },
    preUpdateAuths(role){
        this.$router.push({name:'updateAuths',query:{roleId:role.roleId}})
    },
    findAll(){
      this.axios.get("/role/list")
      .then(res =>{
        this.tableData = res.data.data;
      })
      },
    fndelete:function (index,roleId) {
      this.$confirm("是否删除此数据嘛？", "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
      })
          .then(() => {
            this.delete(index,roleId);
          })
          .catch(() => {})
    },
    delete(index,roleId){
      this.axios.get("/role/delete/"+roleId)
      .then(res =>{
        if (res.data.code == 10000){
          Message.success("删除成功")
          this.tableData.splice(index,1);
        }else {
          Message.error(res.data.desc)
        }
      })
    }
  },
  mounted() {
    this.findAll();
  },

  data() {
    return {
      tableData: [{
        roleId:'1',
        roleNumber: '888',
        roleName: '扫地僧',
        roleDesc: '高手在民间',
      }]
    }
  }
}
</script>

<style scoped>

</style>