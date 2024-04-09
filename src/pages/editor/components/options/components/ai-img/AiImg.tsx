import styles from './style.module.less';
import Item from '../item';
import { Modal, Toast } from '@douyinfe/semi-ui';
// import {
//   AlignLeft,
//   AlignHorizontally,
//   AlignRight,
//   AlignTop,
//   AlignVertically,
//   AlignBottom,
//   // DistributeHorizontalSpacing,
//   // DistributeVerticalSpacing,
// } from '@icon-park/react';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { pubsub } from '@utils/pubsub';
import * as aiIco from './icon';

export interface IProps {}

function Align(props: IProps) {
  const elementData = editor.getElementData() as any;
  // const { width, height } = editor.data;
  return (
    <Item title="AI功能">
      <div className={styles.btns}>
        <a
          onClick={() => {
            Toast.warning('作者还没时间搞，等你贡献代码');
          }}
        >
          <aiIco.AiBg color="#fff" />
          去背景
        </a>
        <a
          onClick={() => {
            Toast.warning('请移步官网体验');
          }}
        >
          <aiIco.AiKouTu color="#fff" />
          抠图
        </a>
      </div>
      <div className={styles.btns}>
        <a
          onClick={() => {
            Toast.warning('作者还没时间搞，等你贡献代码');
          }}
        >
          <aiIco.AiQingXi color="#fff" />
          变清晰
        </a>
        <a
          onClick={() => {
            Toast.warning('作者还没时间搞，等你贡献代码');
          }}
        >
          <aiIco.AiTuMo color="#fff" />
          涂抹
        </a>
      </div>
    </Item>
  );
}

export default observer(Align);
