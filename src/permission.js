import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getToken } from '@/utils/auth' // get token from cookie
import getPageTitle from '@/utils/get-page-title'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login'] // no redirect whitelist

// // 路由守卫
// router.beforeEach(async (to, from, next) => {
//     // start progress bar
//     NProgress.start()

//     // set page title
//     document.title = getPageTitle(to.meta.title)

//     // determine whether the user has logged in
//     const hasToken = getToken()

//     if (hasToken) { // 检测到用户之前已经登录
//         if (to.path === '/login') {
//             // if is logged in, redirect to the home page
//             next({ path: '/' })  // 相当于执行beforeEach('/', from, next)
//             NProgress.done()
//         } else {
//             const hasGetUserInfo = store.getters.name
//             if (hasGetUserInfo) {
//                 next()  // 放行
//             } else {
//                 try {
//                     // get user info
//                     await store.dispatch('user/getInfo')

//                     next()
//                 } catch (error) {
//                     // remove token and go to login page to re-login
//                     await store.dispatch('user/resetToken')
//                     Message.error(error || 'Has Error')
//                     next(`/login?redirect=${to.path}`)
//                     NProgress.done()
//                 }
//             }
//         }
//     } else {
//         /* has no token*/

//         // 如果 to.path != '/login' 则返回 -1
//         if (whiteList.indexOf(to.path) !== -1) {
//             // in the free login whitelist, go directly
//             next()
//         } else {
//             // other pages that do not have permission to access are redirected to the login page.
//             next(`/login?redirect=${to.path}`)
//             NProgress.done()
//         }
//     }
// })

router.beforeEach(async (to, from, next) => {
    // start progress bar
    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title)

    // determine whether the user has logged in
    const hasToken = getToken()

    if (hasToken) { // 检测到用户之前已经登录
        if (to.path === '/login') {
            next({ path: '/' })
            NProgress.done()
        } else if (to.path === '/dashboard') {
            let hasGetUserRole = store.getters.role
            if (hasGetUserRole) {
                console.log(hasGetUserRole)
                console.log(to.path)
                if (hasGetUserRole == "user" && to.path === "/dashboard") {
                    next()
                } else if (hasGetUserRole == "user") {
                    next({ path: "/" })
                }

                if (hasGetUserRole == "administrator" && to.path == "/administrator") {
                    next()
                } else if (hasGetUserRole == "administrator") {
                    next({ path: "/administrator" })
                }

                if (hasGetUserRole == "supervisor" && to.path == "/supervisor") {
                    next()
                } else if (hasGetUserRole == "supervisor") {
                    next({ path: "/supervisor" })
                }
            } else {
                try {
                    // get user info
                    await store.dispatch('user/getInfo')
                    hasGetUserRole = store.getters.role
                    if (hasGetUserRole == "administrator") {
                        next({ path: "/administrator" })
                    } else if (hasGetUserRole == "supervisor") {
                        next({ path: "/supervisor" })
                    } else {
                        next({ path: "/" })
                    }
                } catch (error) {
                    // remove token and go to login page to re-login
                    await store.dispatch('user/resetToken')
                    Message.error(error || 'Has Error')
                    next(`/login?redirect=${to.path}`)
                    NProgress.done()
                }
            }
        } else {
            next()
        }
    } else {
        /* has no token*/

        // 如果 to.path != '/login' 则返回 -1
        if (whiteList.indexOf(to.path) !== -1) {
            // in the free login whitelist, go directly
            next()
        } else {
            // other pages that do not have permission to access are redirected to the login page.
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})
