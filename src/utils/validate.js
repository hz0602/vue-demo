/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */

// 检测一个 path 是否是外部链接
export function isExternal(path) {
    return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */

// 判断入参是否位于 valid_map 中
export function validUsername(str) {
    // const valid_map = ['admin', 'editor']
    // return valid_map.indexOf(str.trim()) >= 0
    return true;
}
