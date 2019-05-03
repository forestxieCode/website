# 构建目录

## 目录结构

```
build/
|-- build-test.js             -- 模拟生产环境构建文件，构建后代码不会被 uglify，对应构建命令：npm run build-test
|-- build.js                  -- 生产环境构建文件，构建后代码会被 uglify，对应构建命令：npm run build
|-- dev-server.js             -- 开发环境构建文件，连接本地数据，对应构建命令：npm run dev
|-- dev-test-server.js        -- 开发环境构建文件，连接本地数据，对应构建命令：npm run dev-test
|-- webpack.base.conf.js      -- webpack 基础配置
|-- webpack.dev.conf.js       -- webpack 开发环境配置
|-- webpack.prod.conf.js      -- webpack 生产环境配置
```
