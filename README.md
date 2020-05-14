# vue-message-plugin

> A message plugin based on Vue.js which works like ElementUI/Message.
> 
> 一个基于 Vue.js 的消息插件，工作原理类似于 elementui / message。

![vue-message-plugin](/src/assets/vue-message-plugin.gif)

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## How To Use / 使用

- Install / 安装

```jsx
npm i vue-message-plugin
```

- import & install plugin before create root Vue Component/在实例化根组件前 引入 & 安装插件

```jsx
import Message from 'vue-message-plugin'

Vue.use(Message)
```

- Use in any component / 在任意组件中使用
```jsx
// vm.$message returns instance of Message Component
// vm.$message返回值是Message组件的实例
let message = vm.$message({
  message: 'hello you,duration:1s,center',
  type: 'success',
  showClose: true,
  duration: 1000,
  center: true,
  offset: 10,
  onClose: function () {
    console.log('closed')
  }
})

// manually close the Message instance
// 可以手动关闭Message实例
message.close()
```

## Options / 选项
|attribute/参数 | Desc/说明 | type/类型 | options/可选值 | default/默认值|
|- | - | - | - | -|
|message | 消息文字 | string / VNode | — | —|
|type | 主题 | string | success/warning/info/error | info|
|dangerouslyUseHTMLString | 是否将 message 属性作为 HTML 片段处理 | boolean | — | false|
|customClass | 自定义类名 | string | — | —|
|duration | 显示时间, 毫秒。设为 0 则不会自动关闭 | number | — | 3000|
|showClose | 是否显示关闭按钮 | boolean | — | false|
|center | 文字是否居中 | boolean | — | false|
|onClose | 关闭时的回调函数, 参数为被关闭的 message 实例 | function | — | —|
|offset | Message 距离窗口顶部的偏移量 | number | — | 20|

## Methods / 方法

调用 Message 或 this.$message 会返回当前 Message 的实例。如果需要手动关闭实例，可以调用它的 close 方法。

Calling Message or this. $ Message will return the current Message instance. If you need to manually close the instance, you can call its close method.

| 方法名 |	说明|
|-|	- |
|close | 关闭当前的 Message |