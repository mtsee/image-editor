# SDK 框架中的使用

为了方便大家在 vue 项目中快速使用渲染内核做二次开发，我们提供了一个 JS 的 SDK，下面是 vue 中使用渲染内核的案例：

具体完整代码请参考`sdk-test/vue.html`文件：

官网：[image.h5ds.com](https://image.h5ds.com)

### VUE

```javascript
import { ref } from 'vue';
import ImageEditorCore from 'image-editor-core';

export default {
  async mounted() {
    const core = new ImageEditorCore({
      data: pageData,
      target: document.getElementById('view'),
      env: 'editor',
      resourceHost: 'https://cdn.h5ds.com',
    });
    const store = await core.init();
    console.log(store);
  },
  template: `<div id="view">loading...</div>`,
};
```

### React

```javascript
import React, { useRef } from 'react';
import ImageEditorCore from 'image-editor-core/coresdk.react.es';

export default function App() {
  const ref = useRef();
  useEffect(() => {
    const core = new ImageEditorCore({
      data: pageData,
      target: ref.current,
      env: 'editor',
      resourceHost: 'https://cdn.h5ds.com',
    });
    core.init().then(store => {
      console.log(store);
    });
  }, []);

  return <div ref={ref}>loading...</div>;
}
```
