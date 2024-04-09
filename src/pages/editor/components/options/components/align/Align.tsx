import styles from './align.module.less';
import Item from '../item';
import { Tooltip } from '@douyinfe/semi-ui';
import {
  AlignLeft,
  AlignHorizontally,
  AlignRight,
  AlignTop,
  AlignVertically,
  AlignBottom,
  // DistributeHorizontalSpacing,
  // DistributeVerticalSpacing,
} from '@icon-park/react';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { pubsub } from '@utils/pubsub';

export interface IProps {}

function Align(props: IProps) {
  const elementData = editor.getElementData() as any;
  const { width, height } = editor.pageData;

  return (
    <Item title="对齐方式">
      <div className={styles.align}>
        <Tooltip content={'左对齐'}>
          <a
            onClick={() => {
              elementData.x = 0;
              editor.updateOption();
              editor.updateCanvas();
              editor.record({
                type: 'update',
                desc: '左对齐',
              });
            }}
          >
            <AlignLeft theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'水平对齐'}>
          <a
            onClick={() => {
              elementData.x = width / 2 - elementData.width / 2;
              editor.updateCanvas();
              editor.updateOption();
              editor.record({
                type: 'update',
                desc: '水平对齐',
              });
            }}
          >
            <AlignHorizontally theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'右对齐'}>
          <a
            onClick={() => {
              elementData.x = width - elementData.width;
              editor.updateCanvas();
              editor.updateOption();
              editor.record({
                type: 'update',
                desc: '右对齐',
              });
            }}
          >
            <AlignRight theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'顶对齐'}>
          <a
            onClick={() => {
              elementData.y = 0;
              editor.updateOption();
              editor.updateCanvas();
              editor.record({
                type: 'update',
                desc: '顶对齐',
              });
            }}
          >
            <AlignTop theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'垂直对齐'}>
          <a
            onClick={() => {
              elementData.y = height / 2 - elementData.height / 2;
              editor.updateOption();
              editor.updateCanvas();
              editor.record({
                type: 'update',
                desc: '垂直对齐',
              });
            }}
          >
            <AlignVertically theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'底对齐'}>
          <a
            onClick={() => {
              elementData.y = height - elementData.height;
              editor.updateOption();
              editor.updateCanvas();
              editor.record({
                type: 'update',
                desc: '底对齐',
              });
            }}
          >
            <AlignBottom theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        {/* <Tooltip content={'水平间距分布'}>
          <a href="#">
            <DistributeHorizontalSpacing theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'垂直间距分布'}>
          <a href="#">
            <DistributeVerticalSpacing theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip> */}
      </div>
    </Item>
  );
}

export default observer(Align);
