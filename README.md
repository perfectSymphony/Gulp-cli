## Gulp-cli
**基于requireJS和Gulp可快速搭建前端项目的脚手架。**


## [项目地址](https://github.com/perfectSymphony/Gulp-cli)
```
git clone git@github.com:perfectSymphony/Gulp-cli.git
```

## 项目目录
```
├── README.md         # 项目说明
|—— bin               # (在gulpfile文件中使用到)解析layout中的模板html，将完整的html产出到src/html中
├── dist              # 打包生成的项目文件
|—— logs              # 监听编译less文件时，打印报错信息， 
├── gulpfile.js       # gulp配置文件
├── package.json      # 依赖包
|
├── src               # 项目文件夹
    ├── conf          # 配置文件目录
    ├── data          # 模拟数据
    |—— public        # 第三方库
    |—— css           # 由less文件生成的的css文件
    │── images        # 图库
    │── js            # 组件化脚本文件
    │── less          # less
    |── layout	      # 页面
    └── widget        # 公共页面
```

## 项目中使用到的部分技术如下：
```
	- require：实现模块化开发;
	- mock：实现本地模拟服务器端返回数据;
	- art-template：渲染数据;
	- layui：UI框架;
	- browsersync：启动项目;
```
## 跨域问题：
开发环境：proxy；<br />
生产环境：根据自己公司的实际情况选择；

## 如何使用
1、下载项目：
```
git clone git@github.com:perfectSymphony/Gulp-cli.git

```
2、安装依赖：
```
$ cd Gulp-cli && npm install
```
3、启动项目
```
$ npm run start
```
4、项目打包
```
npm run build
```

## 相关命令
```
生产环境： npm run build
开发环境： npm run dev
```

## 自动化部署功能

```
Gulpfile.js中实现了项目自动化部署功能。需要用到自动化部署，可以在Gulpfile.js中配置一下` 'deployFile','execSSH' `就可以用了

``` 

## 如果该项目有帮助到你，请动动你的手指，给一个Star。

## 微信公众号：
![指尖下的精灵](https://raw.githubusercontent.com/perfectSymphony/Gulp-cli/b08538bc938d56aa729085bf5305afc425bf8d9c/Wechat/0.jpg)


## 备注

* 本脚手架提供了基本的技术支持，可以根据自己的需求，修改。

* 如有设计不合理地方，可以提出，也可以到我的微信公众号里面提出改进问题。

* [项目地址](https://github.com/perfectSymphony/Gulp-cli) 如对你有帮助，希望给个Star(*￣︶￣)。
