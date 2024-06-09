// 外部库，直接与浏览器对接
import Cookies from 'js-cookie'

const TokenKey = 'vue_admin_template_token'

// 尝试从浏览器中获取名为 'vue_admin_template_token' 的 cookie
export function getToken() {
    return Cookies.get(TokenKey)
}

export function setToken(token) {
    return Cookies.set(TokenKey, token)
}

export function removeToken() {
    return Cookies.remove(TokenKey)
}
