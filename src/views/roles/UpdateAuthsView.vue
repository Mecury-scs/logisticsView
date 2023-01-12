<template>
  <el-card class="box-card">
    <div v-for="a in list" :key="a.authId" align="left">
      <el-checkbox v-model="checkAllList" :label="a.authId" @change="handleCheckAllChange">{{a.authName}}</el-checkbox>
      <div style="margin: 15px 0;"></div>
      <el-checkbox-group v-model="checkedList">
        <el-checkbox v-for="a1 in a.authsList" :label="a1.authId" :key="a1.authId">{{a1.authName}}</el-checkbox>
      </el-checkbox-group>
      <el-divider></el-divider>
    </div>
    <div>
      <el-button type="primary" @click="fnUpdate">保存</el-button>
      <el-button  @click="fnBack">返回</el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: "UpdateAuthsView",
  data(){
    return {
      roleId:this.$route.query.roleId,
      list:[],
      checkAllList:[],
      checkedList:[]
    }
  },
  mounted() {
    this.axios.get("auths/list").then(
        res=>{
          if (res.data.code == "10000"){
            this.list = res.data.data;
          }
        }
    );
    this.axios.get("auths/findAllByRoleId?roleId=" + this.roleId).then(
        res=>{
          if (res.data.code == "10000"){
            for(var i in res.data.data){
              if (res.data.data[i].parentId == 0){
                this.checkAllList.push(res.data.data[i].authId);
              }else{
                this.checkedList.push(res.data.data[i].authId);
              }
            }
          }
        }
    );
  },
  methods:{
    // 上面的复选框单击事件，全选功能
    handleCheckAllChange(status, event){
      console.log(status);
      var id = event.target.value;
      console.log(id);
      for(var i in this.list){
        if(this.list[i].authId == id){
          for(var j in this.list[i].authsList){
            if (status){
              // 全选，将对应的子复选框的值全部添加到checkedList集合中
              if(this.checkedList.indexOf(this.list[i].authsList[j].authId) == -1){
                this.checkedList.push(this.list[i].authsList[j].authId)
              }
            }else {
              // 全不选，将对应的子复选框的值全部从checkedList集合中删除
              var index = this.checkedList.indexOf(this.list[i].authsList[j].authId);
              if(index != -1){
                this.checkedList.splice(index, 1);
              }
            }
          }
          break;
        }
      }
    },
    fnUpdate(){
      this.axios.post("auths/updateAuths", {
        roleId: this.roleId,
        authList: this.checkAllList.concat(this.checkedList)
      }).then(
          res=>{
            if (res.data.code == "10000"){
              this.$message.success("修改成功");
              this.$router.push("/roles/roleList")
            }
          }
      );

    },
    fnBack(){
      this.$router.push("/roles/roleList")
    }
  }
}
</script>

<style scoped>

</style>
