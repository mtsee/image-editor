import styles from './styles.module.less';
import React, { useEffect, useState } from 'react';
import { Input } from '@douyinfe/semi-ui';

export interface IProps {}

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
      <div className={styles.tips}>
        <h3>使用教程</h3>
        <p>1、进入iconfont进行图标搜索</p>
        <p>2、选中图标，点击下载按钮</p>
        <p>3、点击“复制SVG代码”</p>
        <p>4、会到画布中点击Ctrl+V进行复制</p>
      </div>
    </div>
  );
}
