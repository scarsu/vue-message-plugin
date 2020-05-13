<!--
 * @Description:Vue-Message插件 by ScarSu
 * @Author: scarsu001@gmail.com
 * @Date: 2020-05-13 08:28:28
 * @LastEditTime: 2020-05-13 16:58:29
 * @LastEditors: scarsu001@gmail.com
 *
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
-->
<template>
  <transition name="message-fade">
      <div
        :class="[
          'message',
          `message-${type}`,
          center?'is-center':'',
          customClass]"
          :style="positionStyle"
          @mouseenter=stopTimer
          @mouseleave=startTimer
          v-if="show">
        <slot>
            <span v-if="message && !dangerouslyUseHTMLString">{{message}}</span>
            <div v-else v-html="message"></div>
        </slot>
        <i v-if="showClose" @click="closeMsg" class="message-close-btn">x</i>
      </div>
  </transition>
</template>

<script>
export default{
  components: {},
  data () {
    return {
      message: '',
      type: 'info',
      dangerouslyUseHTMLString: false,
      customClass: '',
      showClose: false,
      center: false,
      onClose: null,
      offset: 20,
      show: false,
      timer: null
    }
  },
  computed: {
    positionStyle () {
      return `margin-top:${this.offset}px`
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    closeMsg () {
      this.close()
    },
    startTimer () {
      const _this = this
      this.timer = setTimeout(() => {
        _this.close()
      }, _this.duration)
    },
    stopTimer () {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>
<style scoped>
.message{
  position: relative;
  margin-top: 15vh;
  width: 30%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 0 1px 3px rgba(0,0,0,.3);
  box-sizing: border-box;
  min-width: 200px;
  padding: 20px 40px;
  border-radius: 10px;
}
.is-center{
  text-align: center;
}
.message-success{
  background-color: #f0f9eb;
  border-color: #e1f3d8;
  color: #67c23a;
}
.message-info{
  background-color: #edf2fc;
  border-color: #909399;
  color: #909399;
}
.message-warning{
  background-color: #fdf6ec;
  border-color: #faecd8;
  color: #e6a23c;
}
.message-error{
  background-color: #fef0f0;
  border-color: #fde2e2;
  color: #f56c6c;
}
.message-fade-enter-active,
.message-fade-leave-active {
  transition: all 0.1s ease-out;
}
.message-fade-enter-to {
  opacity: 1;
  transform: scale(1.2);
}
.message-fade-leave-to {
  opacity: 0;
  transform: scale(0.8);
}
.message-close-btn{
  position: absolute;
  right: 10px;
  top: 3px;
  cursor: pointer;
}
</style>
