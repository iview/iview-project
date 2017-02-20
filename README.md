# iView-project
### 推荐直接使用 iView-cli
[iView-cli](https://github.com/iview/iview-cli)
> 源自[https://github.com/icarusion/vue-vueRouter-webpack](https://github.com/icarusion/vue-vueRouter-webpack)

本工程适用于基于 Vue.js1.0 + vue-router + webpack + iView 的项目，已经将 iView 配置完成，只需要按步骤初始化即可。

## 安装
```bush
// 安装前请先确保已安装node和npm
// 需要提前在全局安装webpack和webpack-dev-server,如果已安装请忽略
npm install webpack -g
npm install webpack-dev-server -g

// 安装成功后,再安装依赖
npm install
```
## 运行
### 开发环境
```bush
// 注意首次使用需要执行下面的init命令来生成入口html文件,以后不用再执行
npm run init
npm run dev
```
### 生产环境(打包)
```bush
npm run build
```
### 访问
在浏览器地址栏输入[http://127.0.0.1:8080](http://127.0.0.1:8080)
