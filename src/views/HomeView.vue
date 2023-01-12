<template>
  <el-container style="height: 736px; border: 1px solid #eee">
    <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']" router>
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-notebook-2"></i>物流管理</template>
          <el-menu-item index="1-1" route="/books">用户管理</el-menu-item>
          <el-menu-item index="1-2" route="/roles/roleList">角色管理</el-menu-item>
          <el-menu-item index="1-3" route="/updatePwd">修改密码</el-menu-item>
          <el-menu-item index="1-4" route="/books">注销</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-aside>

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <!--        <el-dropdown>-->
        <!--          <i class="el-icon-setting" style="margin-right: 15px"></i>-->
        <!--          <el-dropdown-menu slot="dropdown">-->
        <!--            <el-dropdown-item>查看</el-dropdown-item>-->
        <!--            <el-dropdown-item>新增</el-dropdown-item>-->
        <!--            <el-dropdown-item>删除</el-dropdown-item>-->
        <!--          </el-dropdown-menu>-->
        <!--        </el-dropdown>-->
        <span>管理员</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  name: "HomeView",
  data() {
    return {

    }
  },
  mounted() {
    this.fn();
  },
  methods:{
   fn:function () {
       if (sessionStorage.getItem("token")==null){
         this.$message.error("还没登录,别玩了")
         this.$router.push("/")
     }
   },



}
};
</script>

<style scoped>
.el-header {
  background-color: #B3C0D1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>
