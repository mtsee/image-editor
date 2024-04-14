# 简介

无界云图是<a href="https://www.h5ds.com" target="_blank">四川爱趣五科技</a>推出的一款开源的图片设计工具，使用
了`React Hooks`，`Typescript`，`Vite`，`Leaferjs`等主流的技术开发，开箱即用，如果想直接使用，请访问我们的在线版
本<a href="https://image.h5ds.com" target="_blank">无界云图</a>。

# 是否可商用？

项目采用 MIT 协议，可免费商用，还请保留项目中“关于我们”的相关信息，因为这是宣传我们的唯一途径。

# 项目预览

- 地址：<a href="https://image.h5ds.com" target="_blank">无界云图</a>

黑色主题：

![image](https://cdn.h5ds.com/doc/hdesign-1.png)

白色主题：

![image](https://cdn.h5ds.com/doc/hdesign-2.png)

# 相关文档

- 技术文档：<a href="./doc/技术文档.md" target="_blank">技术文档</a>
- 插件开发文档：<a href="./doc/插件开发文档.md" target="_blank">插件开发文档</a>
- Leaferjs: <a href="https://www.leaferjs.com" target="_blank">Leaferjs</a>
- TypeScript: <a href="https://devblogs.microsoft.com/typescript/" target="_blank">TypeScript</a>
- React: <a href="https://react.dev/" target="_blank">React</a>
- Mobx: <a href="https://cn.mobx.js.org/" target="_blank">Mobx</a>
- Semi Design: <a href="https://semi.design/zh-CN/" target="_blank">Semi Design</a>

# 安装使用

```javascript

// 安装依赖
yarn install

// 启动项目
yarn dev

// 打包项目
yarn build

```

# 技术交流

微信技术交流群：

<img src="https://cdn.h5ds.com/wxq.jpg" width="200"/>

# 我们的产品矩阵

- <a href="https://video.h5ds.com" target="_blank">无界云剪</a>
- <a href="https://image.h5ds.com" target="_blank">无界云图</a>
- <a href="https://720.h5ds.com" target="_blank">全景工具</a>
- <a href="https://h5.h5ds.com" target="_blank">H5 网页制作工具</a>
- <a href="https://sharezm.com" target="_blank">希尔桌面（网盘）</a>

## 更新日志

[CHANGELOG](./CHANGELOG.md)

# 功能/计划

Tips: 🕙 筹划中 🔲 筹备中 🚧 进行中 ✅ 已完成

### 编辑器

- 🚧 素材管理
  - ✅[系统]图片素材
  - 🚧[系统]文字素材
    - 🚧 组合文字素材
    - ✅ 艺术字素材
  - 🚧[系统]贴纸素材（SVG）
  - 🚧[系统]背景素材
    - 🚧 背景颜色（纯色、线性渐变、径向渐变）
    - 🚧 背景图片
  - ✅[用户]素材上传
  - ✅[用户]素材删除
  - ✅[用户]素材批量管理
- ✅ 右键菜单（撤销、重做、导出图层、删除、复制、剪切、锁定、上移一层、下移一层、置顶、置底）
- ✅ 撤销&重做
- ✅ 定时保存
- ✅ 黑白主题切换
- 🔲 多语言支持
- ✅ 快捷键操作（快捷键说明文档）
- 🚧 元素控制器
  - ✅ 框选
  - ✅ 缩放
  - ✅ 拖动
  - ✅ 旋转
  - 🚧 吸附对齐
  - 🔲 参考线
- ✅ 标尺
- ✅ 模版功能
- ✅ 拖入元素到画布
- 🔲 拖入图片替换元素
- 🔲 马赛克工具
- ✅ 多页面支持（新增、删除、切换）
- 🚧 图层列表
  - ✅ 拖动排序
  - 🚧 组内拖动
  - 🚧 组间拖动
- 🚧 组合元素
  - 🚧 坐标对齐（居中、顶部对齐、底部对齐、左对齐、右对齐、水平间距、垂直间距）
  - ✅ 多元素组合
- ✅ 画布尺寸修改
- ✅ 画布缩放&适配
- 🚧 背景填充
  - ✅ 颜色填充
  - 🚧 图片填充
- 🔲 3D 文字效果
- 🔲 3D 模型
- 🚧 文字元素
  - ✅ 快捷操作（水平翻转，垂直翻转，锁定图层，隐藏&显示图层，复制，删除）
  - ✅ 文字样式设置（加粗、倾斜、颜色（纯色、线性渐变、径向渐变）、对齐方式、文字大小、字体设置、行距、间距、描边）
  - ✅ 坐标设置
  - ✅ 旋转设置
  - ✅ 阴影设置
  - ✅ 透明度设置
  - 🔲 蒙版（橡皮擦）
  - 🕙 路径文字
- 🚧 图片元素
  - 🔲 LUT 滤镜
  - 🚧 SVG 颜色自定义
  - ✅ 图片裁剪
  - 🔲 遮罩（容器）
  - 🔲 蒙版（橡皮擦）
  - ✅ 快捷操作（水平翻转，垂直翻转，锁定图层，隐藏&显示图层，复制，删除）
  - ✅ 边框设置
  - ✅ 圆角设置
  - ✅ 坐标设置
  - ✅ 旋转设置
  - ✅ 阴影设置
  - ✅ 透明度设置
- 🕙 元素动画（进入，强调，离开）
- 🔲 二维码元素
- 🔲 条形码元素
- 🔲 画笔自由绘制元素
- 🔲 形状元素
  - 🔲 线条
  - 🔲 多边形
  - 🔲 星形
  - 🔲 圆环&扇形
- 🔲 图表元素
- 🔲 词云元素
- ✅ 下载文件
  - ✅ 静态图片下载（PNG，JPG，WEBP）
  - 🔲 动态图片下载（GIF，WEBM）
  - 🔲 PDF 下载
  - 🔲 PNG 图层分层下载（ZIP）
- 🔲 预览
- 🔲 SDK 封装
- 🔲 插件开发 API
- ✅ AI 抠图
- 🔲 AI 人像打光
- 🔲 AI 擦除水印
- 🔲 AI 去背景
- 🕙 AI 变清晰
- 🕙 AI 扩图
- 🕙 AI 图片美化
