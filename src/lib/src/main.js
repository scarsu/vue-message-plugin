/*
 * 参数 说明 类型 可选值 默认值
 * message 消息文字 string / VNode — —
 * type 主题 string success/warning/info/error info
 * dangerouslyUseHTMLString 是否将 message 属性作为 HTML 片段处理 boolean — false
 * customClass 自定义类名 string — —
 * duration 显示时间, 毫秒。设为 0 则不会自动关闭 number — 3000
 * showClose 是否显示关闭按钮 boolean — false
 * center 文字是否居中 boolean — false
 * onClose 关闭时的回调函数, 参数为被关闭的 message 实例 function — —
 * offset Message 距离窗口顶部的偏移量 number — 20
 *
 * 调用 Message 或 this.$msg 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 close 方法。
 *
 * 方法名 说明
 * close 关闭当前的 Message
 */
import message from './main.vue'
import {isVNode} from '@/utils'

//用于export的对象
const Message = {}

let instances = []
let seed = 0
const types = {
  success: 'success',
  info: 'info',
  warning: 'warning',
  error: 'error'
}

//Vue插件必须包含install方法
Message.install = function (Vue) {
  const Message = Vue.component('message', message)

  Vue.prototype.$message = function (opt) {
    // 参数处理
    if (typeof opt === 'string' || isVNode(opt)) {
      opt = {message: opt}
    }
    opt.id = 'id' + seed++
    opt.type = types[opt.type] || types.info
    opt.userOnClose = opt.onClose

    // message组件实例
    let instance = new Message({
      data: opt//将配置选项传入给实例的data
    })

		//处理VNode类型message（使用$slots插槽分发数据
    if (isVNode(instance.message)) {
      instance.$slots.default = [instance.message]
      instance.message = ''
    }

		//挂载dom  并 实例的dom加入body中
    instance.$mount()
    document.body.append(instance.$el)

    // close方法
    instance.close = function () {
      this.show = false
      if (this.userOnClose) this.userOnClose()
    }

    // 显示
    instance.show = true

		// 定时隐藏
    let duration = opt.duration || 3000
    instance.timer = setTimeout(() => {
      instance.close()
    }, duration)

    instances.push(instance)

    // 返回message组件实例
    return instance
  }
}
export default Message