import '@icon-park/react/styles/index.css';
import styles from './sidebar.module.less';
import logo1 from '@images/logo1.png';
import logo2 from '@images/logo2.png';
import { UploadOne, PictureOne, KeyboardOne, Mosaic, MoreTwo, Text, Page } from '@icon-park/react';
import classNames from 'classnames';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import KeyboardModal from './KeyboardModal';
// import { Button } from '@douyinfe/semi-ui';
import { theme } from '@theme';

export interface ISideBarProps {}

function SideBar(props: ISideBarProps) {
  const fill = 'var(--theme-icon)';
  editor.themeUpdateKey;
  return (
    <div className={styles.sidebar}>
      <span className={styles.logo}>
        <a target="_blank" href="/">
          <img src={theme.getTheme() === 'dark' ? logo1 : logo2} alt="" />
        </a>
      </span>
      <div className={styles.menus + ' scroll'}>
        <ul>
          {[
            {
              icon: <Page theme="outline" size="24" fill={fill} />,
              type: 'template',
              name: '模版',
            },
            {
              icon: <UploadOne theme="outline" size="24" fill={fill} />,
              type: 'my',
              name: '我的',
            },
            {
              icon: <PictureOne theme="outline" size="24" fill={fill} />,
              type: 'image',
              name: '图片',
            },
            {
              icon: <Text theme="outline" size="24" fill={fill} />,
              type: 'text',
              name: '文本',
            },
            {
              icon: <Mosaic theme="outline" size="24" fill={fill} />,
              type: 'background',
              name: '背景',
            },
            {
              icon: <MoreTwo theme="outline" size="24" fill={fill} />,
              type: 'more',
              name: '更多',
            },
          ].map((d, i) => {
            return (
              <li
                onClick={() => {
                  editor.setSourceType(d.type as any);
                }}
                key={d.type}
                className={classNames(d.type === editor.sourceType ? styles.active : '')}
              >
                <i>{d.icon}</i>
                <p>{d.name}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div className={styles.bottom}>
        <KeyboardModal />
      </div>
    </div>
  );
}

export default observer(SideBar);
