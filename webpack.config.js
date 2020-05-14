const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin');
const resolve = dir => path.resolve(__dirname, dir);

module.exports = {
  entry: './src/main.js', //定义webpack的入口文件
  output: { //定义webpack的输出
    path: path.resolve(__dirname, './dist'),  //输出路径
    filename: 'vue-message-plugin.js',  //输出文件名
    libraryTarget: 'umd', //把写的library打包成umd文件，把库暴露给当前使用的模块定义系统，同时适用commonJs 模块，AMD模块，也可以导出到 global 下的变量，library指定模块名或变量名
    library: 'vue-message-plugin',  //以库的形式导出入口文件
    umdNamedDefine: true //在 UMD 库中使用命名的 AMD 模块
  },
  module: { //module选项决定了如何处理项目中的不同类型的模块
    rules: [  //array,创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。
      {
        test: /\.css$/, //rule条件：resource，请求文件的绝对路径。它已经根据 resolve 规则解析。（Rule.resource.test 的简写
        use: [  //应用于模块的 UseEntries 列表。每个入口(entry)指定使用一个 loader。
          'vue-style-loader',
          'css-loader'
        ],
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {}
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
  resolve: {  //resolve选项能设置模块如何被解析
    alias: {  //定义 import 或 require 的别名，来确保模块引入变得更简单
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src')
    },
    extensions: ['*', '.js', '.vue', '.json'] //自动解析确定的扩展。能够使用户在引入模块时不带扩展
  },
  devServer: {
    historyApiFallback: true, //当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html
    noInfo: true, //启用 noInfo 后，「启动时和每次保存之后，那些显示的 webpack 包(bundle)信息」的消息将被隐藏。错误和警告仍然会显示。
    overlay: true,  //出现编译器错误或警告时，在浏览器中显示全屏覆盖。
    open: true, //自动打开浏览器
    port: 3100, //设置端口
    hot: true //启用热更新
  },
  performance: {
    hints: false  //关闭提示
  },
  devtool: '#eval-source-map' //原始源代码生成 source map
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'//原始源代码生成 source map
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
}else if(process.env.NODE_ENV === 'development'){
  module.exports.devtool = '#eval-source-map'
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({  //插件：允许在编译时(compile time)配置的全局常量
      'process.env': {
        NODE_ENV: '"development"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({ //可以控制项目中 UglifyJS 的版本
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({ //用于从 webpack 1 迁移到 webpack 2
      minimize: true
    }),
    new HtmlWebpackPlugin({ //简单创建 HTML 文件，用于服务器访问
      filename: 'index.html',
      template: 'index.html',
      inject: true  //注入打包的文件
    })
  ])
}
