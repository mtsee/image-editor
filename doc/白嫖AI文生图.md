# 合法合规的白嫖

大家都知道，要完文生图没个好点的显卡很难搞的，第三方 API 又贵，不过我发现抖音旗下的 AI 助手豆包提供了文生图的功能，嘻嘻
，白嫖党的看过来了，这里我要讲的是在我的开源图片编辑器中如何合法合规的白嫖抖音旗下的 AI 助手豆包的文生图功能。

# 又要白嫖，又要体验好

目前我想要的效果是将豆包生成的图片快速的导入到我的编辑器中，既然豆包 AI 助手可以免费的生成图片，那我们可以使用豆包 AI 生
成图片，然后再导入到图片工具中就可以了吧。前提是要合法合规。

1. 使用 iframe 将豆包 AI 嵌入到页面中。

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425004933.png)

输入：帮我画深海里的古风女孩，侧脸美颜，甜美微笑

2. 用户在使用豆包 AI 生成图片后预览时候可以使用微信 PC 版的截图功能 Alt+A 快速截图

3. 关闭弹窗，点击 Ctrl + V 将截取的图片直接拷贝到画布中

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425005403.png)

是不是很有意思？就这样轻松完成了文生图的白嫖。

# 技术实现

Alt+A 截图是微信 PC 版自带的功能，只要你运行了微信 PC 版，就可以使用该快捷键。这里重点说一下 Ctrl+V 粘贴的业务。

```javascript
window.addEventListener('paste', pasteFuntion);

const pasteFuntion = event => {
  // 获取剪切板的数据
  const clipdata = event.clipboardData;
  const item = clipdata.items[0];

  // 如果剪切板数据是图片文件，获取file内容然后进行文件上传
  if (item && item.kind == 'file' && item.type.match(/^image\//i)) {
    // 获取file内容
    const file = item.getAsFile();
    // 此处省略了表单上传代码
    // ...
  }
};
```

Ctrl + V 用起来真的特别方便。我们还提供了免费的 AI 涂抹，AI 抠图的功能，配合起来效果更佳哟。

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425010735.png)

# MIT 开源

除了可以白嫖豆包 AI 还可以去试试文星一言，但是我感觉文星一言生成的图片有点答非所问，生成的效果不及豆包 AI。

开源地址：https://github.com/mtsee/image-editor

喜欢的兄弟给个 star，非常感谢
