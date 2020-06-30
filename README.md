## 项目介绍

**lc-blog** 是一个基于 [leancloud](https://leancloud.cn/) 的 serveless 服务的纯前端的动态博客系统。您无需购买服务器也无需具备后端知识与能力，所有的一切（开发，部署，修改，定制）都在前端或者可视化界面内完成。

## 功能介绍
1. GitHub登陆  
2. 文章发布 markdown  
3. 文章标签  
4. 文章评论互动  
5. 多用户登陆（除自己外其他人只能发布评论）  
6. 文章搜索  
7. 消息中心  
8. 资料修改  

## 启动准备  

### 必要条件  
1. 一个leancloud账号 （数据储存）
2. 一个GitHub账号 （用于用户登录）

### 非必要条件
1. 一个域名（leancloud国内版需要域名绑定）

### 开发条件
本项目基于vue2开发，使用vue-cli3脚手架构建。所以您在修改或者自定义页面时需要具备vue的相关知识。如需自行添加功能，请先阅读leancloud的[REST API文档](https://leancloud.cn/docs/rest_api.html) 。  

## 开始使用  

### 环境准备
1. node > 10

### 安装
1. clone 仓库  
```sh
git clone https://github.com/lvyueyang/blog-leancloud.git
```   
2. 安装依赖   
```sh
npm install
```
3. 不要启动项目  

### GitHub登陆配置信息申请
1. 打开您的GitHub并登陆  
2. 创建一个应用   

   打开 https://github.com/settings/developers    
   
   点击 **New OAuth App**  
   
   填写信息  
   
   Application name （项目名称）  
   
   Homepage URL （主页地址）

   Application description （项目介绍）

   Authorization callback URL （用户认证回调地址）

   > 开发环境：回调地址填写项目启动时控制台打印的地址 默认为
   >
   > `http://localhost:8090/#/github-sign`
   >
   > 生产环境：回调地址填写您线上部署的地址
  
3. 获取Client ID 与 Client Secret 用于配置项目的GitHub登陆

   创建完毕后点击创建的项目

   获取上方的 Client ID 与Client Secret

   打开  `cloud-function/github-login.js`

   将 Client ID 与 Client Secret 赋值给常量 `clientID`  ` clientSecret`

### 项目配置

1. 注册/登陆leancloud   
[https://console.leancloud.app/login.html#/signin](https://console.leancloud.app/login.html#/signin)  

2. 创建应用  
打开控制台 > 创建应用
[https://console.leancloud.app/](https://console.leancloud.app/)

3. 获取 **AppID** **AppKey**  
   进入应用后，点击左侧**设置** > 应用keys 复制 appid与appkey  
   
4. 添加至项目配置
   在项目根目录下创建 文件`.env.development`与`.env.production`  
   写入内容

   ```
   VUE_APP_SERVE=https://OnhS1BDz.api.lncldglobal.com
   VUE_APP_CLIENT_ID = [GitHub的Client ID]
   VUE_APP_LEANCLOUD_APPID = [AppId]
   VUE_APP_LEANCLOUD_APPKEY = [AppKey]
   ```
5. 导入数据 Schema

   在根目录下存在 data-schema文件夹，内置本系统数据结构与数据读写权限配置。

   ```
   _File 文件表  
   
   _Role 角色表  
   
   _User 用户表  

   Article 文章表  

   Comment 一级评论表  

   CommentChildren 二级评论表  

   Message 消息表  

   Tag 文章标签表  
   ```

   点击 储存 > 导入导出 > 数据导入

   请将上方名称与文件一一对应导入（名称一定要写对）
   
6. 安全设置

   点击 储存 > 服务设置

   选中 **禁止客户端创建Class**

   选中 **查询include引入的Pointer类型数据时校验ACL权限**

   其他不勾选
   
7. 导入云函数

   选择 云引擎 > 部署 > 在线编辑

   点击 创建函数

   打开项目根目录下的 `cloud-function`文件夹 依次打开每个方法，创建对应云函数

   ```
   commentCount 评论数增加
   
   tagCreate 创建标签
   
   initProject 初始化项目
   
   articleCommentCount 文章评论数增加
   
   articleDetail 文章详情
   
   articleCreate 创建文章
   
   gitHubLogin GitHub登陆
   ```
   云函数帮助文档  
   [https://leancloud.cn/docs/leanengine_cloudfunction_guide-node.html#hash20005220](https://leancloud.cn/docs/leanengine_cloudfunction_guide-node.html#hash20005220)
   
   全部创建完毕后点击 **部署** 选择生成环境 点击右下角部署按钮 等待部署完成即可
   
8. 启动项目

   ```sh
   npm run serve
   ```
9. 第一次登陆

   项目启动后，点击左侧菜单栏，点击 GitHub登陆  
   
10. 将自己设置为管理员

    登陆成功后，手动打开路由 `/init`

    点击 **初始化** 按钮初始，弹出成功alert后即表示您已经成为此项目的超级管理员了。

## 打包项目，部署
执行`npm run build`后可以将`dist`目录下的文件托管于GitHub/gitee/codeing中利用他们的静态页面托管服务将自己的博客置于线上，随时访问发布。  
    > GitHub的回调地址记得更改哦，否则无法登陆

## 相关问题  
### 使用国内版leancloud GitHub登陆失败
国内版登陆GitHub因为服务器原因，有时会连接错误，关闭登陆窗口后重试几次即可。