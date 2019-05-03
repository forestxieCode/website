# 项目源文件

## 目录结构

```
src/
|-- api/              -- 接口封装
|-- app/              -- 应用资源
|-- asset/            -- 图片资源
|-- component/        -- 应用组件（全局应用）
|-- directive/        -- 全局指令（目前没有）
|-- layout/           -- 布局组件（全局应用）
|-- mock/             -- 模拟接口假数据（目前未使用到）
|-- module/           -- 应用功能模块组件
|-- router/           -- 路由配置
|-- shared/           -- 应用共享（工具方法和常量）
|-- store/            -- vuex 全局状态
|-- view/             -- 应用布局组件和其它非功能性组件页面
|-- APP.vue           -- 应用根组件
|-- main.js           -- 应用启动文件
static/
|-- guangdong.json    -- 广东省 EChart 地图数据
```

## 项目结构

项目由三大平台组成，对应 platform 目录下三个文件目录。

平台各自独立，互不相干，只共用全局应用组件。

平台下有各自的模块内容，各模块下分布多个页面。

也就是说：

```
platform/
|-- power             -- 火电
|  |-- module           -- 模块
|     |-- module-item     -- 模块项
|        |-- page           -- 页面
|        |-- ...more page   -- 当前模块下其它页面
|-- sale              -- 售电（同上）
|-- wind              -- 风电（同上）
```

## 路由结构

路由无关平台，由模块名称 + 页面名称组成。

例：http://my.jytx.com/#/permission/menu-config

permission 是指 /src/platform/sale/permission 模块目录，目录下有 menu-config 页面目录。

permission 是一级路由，对应的路由组件是 /src/layout/AppContainer.vue 文件，目前项目内所有的一级路由都是此文件。

menu-config 是二级路由，对应 permission/menu-config 模块下 MenuConfig.vue 文件，这也就是页面文件。

目前大部分页面代码都写在一个 .vue 文件内，这是不合理的，页面应该由多个组件构成，细分职责。但由于项目还有太多不确定性，这方面优化应该放在后期去做。

## 另外

/src/module 目录属于临时模块目录，里面的内容暂时不知道属于哪个平台。
