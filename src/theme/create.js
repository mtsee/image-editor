// 把theme.less 生成 theme-dark.ts
const fs = require('fs');

// 指定要读取的文件路径
const filePath = 'theme.less';

// 使用 fs.readFile 方法异步读取文件内容
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  // 使用正则表达式匹配变量定义
  const regex = /--([\w-]+):\s([^;]+)/g;
  let matches;
  const result = {};

  while ((matches = regex.exec(data)) !== null) {
    const [, key, value] = matches;
    result['--' + key] = value.trim();
  }
  const output = JSON.stringify(result, null, 2);
  console.log(output);
});
