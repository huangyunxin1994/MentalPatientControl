import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Navbar from '@/components/Navbar/Navbar'
import NavbarManage from '@/components/Navbar/Navbar_manage'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
const constantRoutes=[
    {
      path: '/login',
      component: () => import('@/views/login/index'),
      hidden: true
    },
  
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    {
      path: '/bulletinboard',
      component: () => import('@/views/bulletinboard/index'),
      hidden: true
    },
    {
      path: '/manage',
      component: NavbarManage,
      redirect: '/manage/organmanage',
      children: [{
        path: '/manage/organmanage',
        name: 'organmanage',
        component: () => import('@/views/manage/organ-manage/index'),
        meta: { title: 'organmanage', icon: 'organmanage',id:3 }
      },
      {
        path: '/manage/rolemanage',
        name: 'rolemanage',
        component: () => import('@/views/manage/role-manage/index'),
        meta: { title: 'rolemanage', icon: 'rolemanage',id:11 }
      },
      {
        path: '/manage/usermanage',
        name: 'usermanage',
        component: () => import('@/views/manage/user-manage/index'),
        meta: { title: 'usermanage', icon: 'usermanage',id:4 }
      },
      {
        path: '/manage/equipmanage',
        name: 'equipmanage',
        component: () => import('@/views/manage/equip-manage/index'),
        meta: { title: 'equipmanage', icon: 'equipmanage',id:5 }
      },
      {
        path: '/manage/keypersonmanage',
        name: 'keypersonmanage',
        component: () => import('@/views/manage/key-person-manage/index'),
        meta: { title: 'keypersonmanage', icon: 'keypersonmanage',id:6 }
      }
      ]
    },
    {
      path: '/',
      component: Navbar,
      redirect: '/dashboard',
      children: [{
        path: '/dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard',id:7}
      },
      {
        path: '/personstate',
        name: 'Personstate',
        component: () => import('@/views/personnel-state/index'),
        meta: { title: 'personstate', icon: 'personstate',id:8 } 
      },
      {
        path: '/persondetails',
        name: 'Persondetails',
        redirect: '/persondetails/activestate',
        component: () => import('@/views/personnel-details/index'),
        meta: { title: 'persondetails', icon: 'persondetails', },
        children:[
          {
            path: '/persondetails/activestate',
            name: 'activestate',
            component: () => import('@/views/personnel-details/activestate/index'),
            meta: { title: 'activestate', icon: 'activestate' }
          },{
            path: '/persondetails/gpstracking',
            name: 'gpstracking',
            component: () => import('@/views/personnel-details/gpstracking/index'),
            meta: { title: 'gpstracking', icon: 'gpstracking' }
          }
        ]
      },
      {
        path: '/warningcenter',
        name: 'Warningcenter',
        redirect: '/warningcenter/personwarn',
        component: () => import('@/views/warning-center/index'),
        meta: { title: 'warningcenter', icon: 'warningcenter',id:9 },
        children:[
          {
            path: '/warningcenter/personwarn',
            name: 'Personwarn',
            component: () => import('@/views/warning-center/personwarn/index'),
            meta: { title: 'personwarn', icon: 'personwarn' }
          },{
            path: '/warningcenter/equipwarn',
            name: 'Equipwarn',
            component: () => import('@/views/warning-center/equipwarn/index'),
            meta: { title: 'equipwarn', icon: 'equipwarn' }
          }
        ]
      },
      {
        path: '/techniquetactics',
        name: 'Techniquetactics',
        redirect: '/techniquetactics/electricfence',
        component: () => import('@/views/technique-tactics/index'),
        meta: { title: '技战法', icon: 'techniquetactics',id:10 },
        children: [{
          path: '/techniquetactics/electricfence',
          name: 'Electricfence',
          component: () => import('@/views/technique-tactics/electricfence/index'),
          meta: { title: 'electricfence', icon: 'electricfence' }
        },{
          path: '/techniquetactics/plansetting',
          name: 'Plansetting',
          component: () => import('@/views/technique-tactics/plansetting/index'),
          meta: { title: '预案设置', icon: 'plansetting' }
        },{
          path: '/techniquetactics/earlywarning',
          name: 'Earlywarning',
          component: () => import('@/views/technique-tactics/earlywarning/index'),
          meta: { title: '预警关联', icon: 'earlywarning' }
        }]
        
      }]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router