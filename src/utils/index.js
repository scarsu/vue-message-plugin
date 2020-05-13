/*
 * @Description:
 * @Author: scarsu001@gmail.com
 * @Date: 2020-05-13 14:21:17
 * @LastEditTime: 2020-05-13 14:23:20
 * @LastEditors: scarsu001@gmail.com
 */
function isVNode (node) {
  return !!node && typeof node === 'object' && node.hasOwnProperty('componentOptions')
}
export {isVNode}
