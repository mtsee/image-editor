# 我们不生产素材，只做搬运工

我们研发了一款开源的图片编辑器，我想把 iconfont（阿里妈妈旗下的一款 ico 管理平台）上的 svg 图片快速的添加到画布中。我的
想法是直接复制粘贴到画布中，这样既方便又快捷。

# 调用 iconfont 的搜索

因为 iconfont 的网站不支持 iframe 嵌入到编辑器中，所以这里使用 a 标签进行页面跳转。输入搜索内容，点击搜索按钮直接跳转到
iconfont 的搜索页面。这里使用 React 写的。

```javascript
export default function SvgIcofont(props: IProps) {
  const [keywords, setKeywords] = useState('');

  return (
    <div className={styles.iconfont}>
      <div className={styles.search}>
        <Input placeholder="请输入要搜索的ICO名称" className={styles.input} value={keywords} onChange={setKeywords} />
        <a
          className={styles.btn}
          href={`https://www.iconfont.cn/search/index?q=${encodeURIComponent(
            keywords,
          )}&page=1&searchType=icon&fromCollection=-1`}
          target="_blank"
        >
          搜索
        </a>
      </div>
    </div>
  );
}
```

点击搜索的时候实际上是直接跳转到了 iconfont 网站的搜索结果页。

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425012013.png)

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425012055.png)

# 复制 SVG 代码

选中我们喜欢的 ico，点击下载按钮

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425012229.png)

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425012243.png)

可以看看我们的复制内容，实际上就是一个 svg 的代码字符串

```html
<svg
  t="1713979355359"
  class="icon"
  viewBox="0 0 1024 1024"
  version="1.1"
  xmlns="http://www.w3.org/2000/svg"
  p-id="1663"
  width="256"
  height="256"
>
  <path d="M304.5 691.8c0-145.3 117.8-263 263-263s263 117.8 263 263" fill="#FDDA09" p-id="1664"></path>
  <path
    d="M567.5 428.8c-16.7 0-32.9 1.7-48.7 4.7 122 22.9 214.3 129.7 214.3 258.3h97.4c0.1-145.2-117.7-263-263-263z"
    fill="#FDA906"
    p-id="1665"
  ></path>
  <path
    d="M772.1 687.3c-8.3 0-15-6.7-15-15 0-66.2-25.8-128.5-72.6-175.4-46.8-46.8-109.1-72.6-175.4-72.6-66.2 0-128.5 25.8-175.4 72.6-46.8 46.8-72.6 109.1-72.6 175.4 0 8.3-6.7 15-15 15s-15-6.7-15-15c0-74.3 28.9-144.1 81.4-196.6 52.5-52.5 122.3-81.4 196.6-81.4s144.1 28.9 196.6 81.4c52.5 52.5 81.4 122.3 81.4 196.6 0 8.3-6.7 15-15 15z"
    fill=""
    p-id="1666"
  ></path>
  <path
    d="M914.1 704.5H120c-8.3 0-15-6.7-15-15s6.7-15 15-15h794.1c8.3 0 15 6.7 15 15s-6.7 15-15 15zM755.2 777.4H278.8c-8.3 0-15-6.7-15-15s6.7-15 15-15h476.5c8.3 0 15 6.7 15 15s-6.8 15-15.1 15zM605.6 858.1H428.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h177.1c8.3 0 15 6.7 15 15s-6.8 15-15 15zM179.4 641h-63.5c-8.3 0-15-6.7-15-15s6.7-15 15-15h63.5c8.3 0 15 6.7 15 15s-6.7 15-15 15zM515.9 323.4c-8.3 0-15-6.7-15-15V181.3c0-8.3 6.7-15 15-15s15 6.7 15 15v127.1c0 8.3-6.7 15-15 15zM271 422.9c-3.8 0-7.7-1.5-10.6-4.4l-56.2-56.2c-5.9-5.9-5.9-15.4 0-21.2 5.9-5.9 15.4-5.9 21.2 0l56.2 56.2c5.9 5.9 5.9 15.4 0 21.2-2.9 3-6.8 4.4-10.6 4.4zM754.8 422.9c-3.8 0-7.7-1.5-10.6-4.4-5.9-5.9-5.9-15.4 0-21.2l56.2-56.2c5.9-5.9 15.4-5.9 21.2 0 5.9 5.9 5.9 15.4 0 21.2l-56.2 56.2c-2.9 3-6.7 4.4-10.6 4.4z"
    fill=""
    p-id="1667"
  ></path>
  <path d="M441.2 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z" fill="#050400" p-id="1668"></path>
  <path d="M553.9 544.2a18.8 17.8 0 1 0 37.6 0 18.8 17.8 0 1 0-37.6 0Z" fill="#050400" p-id="1669"></path>
  <path d="M491.3 577.5c0 13.1 11.2 23.7 25 23.7s25-10.6 25-23.7h-50z" fill="#050400" p-id="1670"></path>
  <path d="M406.9 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z" fill="#FDA906" p-id="1671"></path>
  <path d="M582.1 588.6a21.9 20.7 0 1 0 43.8 0 21.9 20.7 0 1 0-43.8 0Z" fill="#FDA906" p-id="1672"></path>
</svg>
```

# 粘贴上传

Ctrl + V 进行粘贴，我们可以通过剪切板获取到我们的字符串内容，然后将其封装成 File 对象，最后使用表单进行文件上传。

```javascript
window.addEventListener('paste', pasteFuntion);

const pasteFuntion = event => {
  // 获取剪切板的数据
  const clipdata = event.clipboardData;
  const svgString = clipdata.getData('text/plain');

  // 判断拷贝的数据是否是字符串，且是否是合法的svg
  if (svgString && isSVGString(svgString)) {
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml' });
    const file = new File([svgBlob], 'image.svg', { type: 'image/svg+xml' });
    // 此处省略了表单上传代码
    // ...
  }
};

// 判断是否是svg格式
function isSVGString(str: string): boolean {
  // 使用 DOMParser 尝试解析字符串
  const parser = new DOMParser();
  const doc = parser.parseFromString(str, 'image/svg+xml');
  // 检查解析后的文档是否包含有效的 SVG 元素
  return doc.documentElement.tagName.toLowerCase() === 'svg';
}
```

![](https://h5ds-cdn.oss-cn-beijing.aliyuncs.com/doc/imgeditordoc/20240425013054.png)

# MIT 开源

开源地址：https://github.com/mtsee/image-editor

喜欢的兄弟给个 star，非常感谢
