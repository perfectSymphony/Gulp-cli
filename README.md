## Gulp-cli
**基于requireJS和Gulp搭建的前端自动化构建。适用于中小型项目，快速构建前端项目框架。**

## 项目启动
```
// 常用命令
项目单独编译： npm run build
项目单独启动： npm run dev
项目一键编译并启动： npm run start
```
## [项目地址](https://github.com/perfectSymphony/Gulp-cli)
* 如对你有帮助，希望给个Star ！哈哈哈！！
```
git clone git@github.com:perfectSymphony/Gulp-cli.git
```

## 项目目录
```
├── README.md         # 项目说明
|—— bin               # (在gulpfile文件中使用到)解析layout中的模板html，将完整的html产出到src/views/html中
├── dist              # 打包路径
|—— logs              # 监听编译less文件时，打印报错信息， 
├── gulpfile.js       # gulp配置文件
├── package.json      # 依赖包
|
├── src               # 项目文件夹
│   ├── conf          # 配置文件目录
│   ├── data          # mock数据文件夹
|   |—— public        # 第三方库
│   ├── static        # 资源文件夹
|   |   |——  css      # 由less文件生成的的css文件
│   │   ├── images    # 图库
│   │   ├── js        # 脚本
│   │   └── less      # less文件夹（**样式相关的在该文件夹中开发**）
│   └── views         # 页面
```

## 项目中使用到的部分技术如下：
```
	- require：实现模块化开发;
	- mock：实现本地模拟服务器端返回数据;
	- art-template：使用到了html模块化封装，还有js模板;
	- browsersync：启动本地浏览页面，并实现当源码更改时页面实时刷新;
```

## 如何使用
1、下载项目：
```
git clone git@github.com:perfectSymphony/Gulp-cli.git

```
2、安装依赖：
```
$ cd Gulp-cli && npm install
```
3、启动页面，访问<http://localhost:3333/dist/front/views/index.html>
```
$ npm run start
```
4、产出最终工程
```
npm run build
```

## 备注

```
Gulpfile.js中实现了项目自动化部署功能。需要用到自动化部署，可以在Gulpfile.js中配置一下` 'deployFile','execSSH' `就可以用了

``` 

## 到微信公众号去提问：
![指尖下的精灵](https://raw.githubusercontent.com/perfectSymphony/Gulp-cli/b08538bc938d56aa729085bf5305afc425bf8d9c/Wechat/0.jpg)


## 小生后话
* 此前端自动化构建及自动化部署框架

* 可以随便根据自己的需求，修改配置，增加框架更多的功能

* 如有设计不合理地方，可以提出，也可以到我的微信公众号里面提出改进问题

* [项目地址](https://github.com/perfectSymphony/Gulp-cli) 如对你有帮助，希望给个Star ！哈哈哈！！
