# 国际化处理

### React

```javascript

<Intl name="home_test" data={{name: 'xxx'}}/>

```

### Javascript API

```javascript

实例对象：language

/**
 * 获取对应的国际化内容
 * @param {string} name 字段名称
 * @param {object} data 模板参数：默认是undefined
 * @param {string} type 语言类型，默认是undefined
 */
language.val('home_hello', {name: 'Mark'});

// str:  `hello world! {{name}}`

// 获取当前国际化类型
language.getLanguage();

// 切换国际化
language.setLanguage('zh-CN');

```
