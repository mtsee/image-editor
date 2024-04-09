module.exports = {
  // parser: 'babel',
  arrowParens: 'avoid', // 箭头函数参数括号 默认avoid 可选 avoid| always
  bracketSpacing: true, // 对象中打印空格 默认true
  insertPragma: false,
  printWidth: 120, // 换行长度
  proseWrap: 'always',
  requirePragma: false,
  singleQuote: true, // 字符串使用单引号
  semi: true, // 每行末尾自动添加分号
  tabWidth: 2, // tab缩进大小,默认为2
  // htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
  // jsxSingleQuote: true, // jsx中使用单引号
  // jsxBracketSameLine: true, //多属性html标签的‘>’折行放置
  trailingComma: 'all',
  embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
  useTabs: false, // 使用tab缩进，默认false
  overrides: [
    {
      files: '*.json',
      options: {
        tabWidth: 2,
        singleQuote: false,
      },
    },
  ],
};
