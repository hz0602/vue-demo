import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

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
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */

let head = document.getElementsByTagName('head');
let meta = document.createElement('meta');
meta.name = "referrer";
meta.content = "no-referrer";
head[0].appendChild(meta);


export const constantRoutes = [
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
        path: '/administrator',
        component: () => import('@/views/administrator/index'),
        hidden: true,
    },

    {
        path: '/common/test',
        component: () => import('@/views/common/test'),
        hidden: true,
    },

    {
        path: '/supervisor',
        component: () => import('@/views/supervisor/index'),
        hidden: true
    },

    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [{
            path: 'dashboard',
            name: 'Dashboard',
            component: () => import('@/views/dashboard/index'),
            // 侧边框的名字和图标
            meta: { title: '首页', icon: 'dashboard' }
        }]
    },

    // 图标这一栏的数据在: icons/svg 路径下

    {
        path: '/movie',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'movie',
                component: () => import('@/views/movie/index'),
            }
        ]
    },


    {
        path: '/search',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'search',
                component: () => import('@/views/search/index'),
                meta: { title: '搜索电影', icon: 'eye' }
            }
        ]
    },


    {
        path: '/complaint',
        component: Layout,
        children: [
            {
                path: 'index',
                name: 'Complaint',
                component: () => import('@/views/complaint/index'),
                meta: { title: '投诉', icon: 'form' }
            }
        ]
    },
    {
        path: '/complaintdetails/index',
        component: () => import('@/views/complaintdetails/index'),
        hidden: true,
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
