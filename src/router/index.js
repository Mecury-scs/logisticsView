import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from "@/views/LoginView";
import UpdatePwdView from "@/views/UpdatePwdView";
import RoleListView from "@/views/roles/RoleListView";
import AddView from "@/views/roles/AddView";
import UpdateRoleView from "@/views/roles/UpdateRoleView";
import UpdateAuthsView from "@/views/roles/UpdateAuthsView";

Vue.use(VueRouter)

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children:[{
      path: '/updatePwd',
      name: 'updatePwd',
      component: UpdatePwdView
    },{
    path: '/roles/roleList',
      name: 'roleList',
      component: RoleListView
    },{
      path: "/roles/add",
      name: 'addView',
      component: AddView
    },{
      path: "/roles/updateRole",
      name: "updateRole",
      component: UpdateRoleView
    },{
      path: "/roles/updateAuths",
      name: "updateAuths",
      component: UpdateAuthsView
    }]
  },
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },

]

const router = new VueRouter({
  routes
})

export default router
