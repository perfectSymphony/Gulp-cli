## Gulp-cli
**基于requireJS和Gulp可快速搭建前端项目的脚手架。**

## 项目目录
```
├── README.md         # 项目说明
|—— config            # 打包项目目录、服务配置
├── dist              # 打包生成的项目文件
├── gulpfile.js       # gulp配置文件
├── package.json      # 依赖包
├── src               # 项目源代码
    ├── include       # 公共页面
    |—— static        # 静态资源文件
    |     |__assets   # 第三方库
    |     |__js
    |     |__images
    |     |__styes
    |—— view           # 各个页面组件
    └── index.html    # 启动页面

## 跨域问题：
开发环境：proxy；<br />
生产环境：根据自己公司的实际情况选择；

## 相关命令：
    开发环境： npm run dev
    生产环境： npm run build
    编译脚本： gulp script
    编译样式： gulp styles
    压缩图片： gulp images
    编译页面： gulp html
    语法检测： gulp eslint
    执行压缩： gulp zip
