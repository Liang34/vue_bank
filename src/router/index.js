import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/login/Login'
import Main from '../views/main/Main'
import LoginPassWord from '../views/login-password/Password'
import GetMoneny from '../views/get-moneny/GetMoneny'
import SaveMoneny from '../views/save-moneny/SaveMoneny'
import Transform from '../views/transform/Transform'
import QueryBalance from '../views/query-balance/QueryBalance'
import EditPassWord from '../views/edit-password/EditPassoword'
import QueryDetails from '../views/query-details/QueryDetails'
import NewPassowrd from '../views/new-password/NewPassword'
import transformMoneny from '../views/transform_moneny/transformMoneny'
// 管理员页面
import AdminLogin from '../views/admin/admin-login/AdminLogin'
import AdminMain from '../views/admin/admin-main/AdminMain'
// import KaiHu from '../views/admin/kaihu/KaiHu'
// import XiaoHu from '../views/admin/xiaohu/XiaoHu'
// import GuaShi from '../views/admin/guashi/GuaShi'
// import JieGua from '../views/admin/jiegua/JieGua'
// import DongJie from '../views/admin/dongjie/DongJie'
import UpDate from '../views/admin/update/update'
import XiuGaiMiMa from '../views/admin/xiugaimima/XiuGaiMiMa'
import chaxunyuer from '../views/admin/chaxunyuer/chaxunyuer'
import QueryHistory from '../views/admin/queryhistory/QueryHistory'
import QueryAll from '../views/admin/queryhistory/QueryAll'
import QuerySomeone from '../views/admin/queryhistory/QuerySomeone'
import QueryAllUser from '../views/admin/query-all/QueryAll'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },
  {
    path: '/main',
    name: 'Main',
    component: Main
    // // route level code-splitting
    // // this generates a separate chunk (about.[hash].js) for this route
    // // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/login/:id',
    name: 'LoginPassWord',
    component: LoginPassWord
  },
  {
    path: '/getMoneny',
    name: 'GetMoneny',
    component: GetMoneny
  },
  {
    path: '/saveMoneny',
    name: 'SaveMoneny',
    component: SaveMoneny
  },
  {
    path: '/transform',
    name: 'Transform',
    component: Transform
  },
  {
    path: '/queryBalance',
    name: 'QueryBalance',
    component: QueryBalance
  },
  {
    path: '/editPassowrd',
    name: 'EditPassWord',
    component: EditPassWord
  },
  {
    path: '/queryTrans/details',
    name: 'QueryDetails',
    component: QueryDetails
  },
  {
    path: '/newPassword',
    name: 'NewPassowrd',
    component: NewPassowrd
  },
  {
    path: '/transformMoneny',
    component: transformMoneny
  },
  {
    path: '/admin',
    name: 'AdminLogin',
    component: AdminLogin
  },
  {
    path: '/adminMain',
    name: 'AdminMain',
    component: AdminMain
  },
  // {
  //   path: '/kaihu',
  //   name: 'KaiHu',
  //   component: KaiHu
  // },
  // {
  //   path: '/xiaohu',
  //   name: 'XiaoHu',
  //   component: XiaoHu
  // },
  // {
  //   path: '/JieGua',
  //   name: 'JieGua',
  //   component: JieGua
  // },
  // {
  //   path: '/guashi',
  //   name: '',
  //   component: GuaShi
  // },
  // {
  //   path: '/dongjie',
  //   name: '',
  //   component: DongJie
  // },
  // {
  //   path: '/jiedong',
  //   name: 'JieDong',
  //   component: JieDong
  // },
  {
    path: '/xiugaimima',
    component: XiuGaiMiMa
  },
  {
    path: '/chaxunyuer',
    component: chaxunyuer
  },
  {
    path: '/querySomeone',
    component: QuerySomeone
  },
  {
    path: '/queryAll',
    component: QueryAll
  },
  {
    path: '/queryhistory',
    component: QueryHistory
  },
  {
    path: '/queryAllUser',
    component: QueryAllUser
  },
  {
    path: '/update',
    component: UpDate
  }
]

const router = new VueRouter({
  routes
})

export default router
