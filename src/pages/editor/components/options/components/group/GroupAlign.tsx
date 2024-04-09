import styles from './styles.module.less';
import Item from '../item';
import { Tooltip } from '@douyinfe/semi-ui';
import {
  AlignLeft,
  AlignHorizontally,
  AlignRight,
  AlignTop,
  AlignVertically,
  AlignBottom,
  DistributeHorizontalSpacing,
  DistributeVerticalSpacing,
  Group,
} from '@icon-park/react';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
// import { GroupLayer } from '@pages/editor/core/types/data';
// import { util } from '@utils/index';

export interface IProps {}

function GroupAlign(props: IProps) {
  const elements = editor.getGroupElementData() as any[];
  const { width, height } = editor.pageData;
  return (
    <Item title="对齐方式">
      <div className={styles.align}>
        <Tooltip content={'左对齐'}>
          <a
            onClick={() => {
              const minx = Math.min(...elements.map(d => d.x));
              elements.forEach(elem => {
                elem.x = minx;
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <AlignLeft theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'水平对齐'}>
          <a
            onClick={() => {
              // 计算居中
              const miny = Math.min(...elements.map(d => d.y));
              const maxy = Math.max(...elements.map(d => d.y + d.height));
              const center = (maxy + miny) / 2;
              elements.forEach(elem => {
                elem.y = center - elem.height / 2;
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <AlignHorizontally theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'右对齐'}>
          <a
            onClick={() => {
              const maxx = Math.max(...elements.map(d => d.x + d.width));
              elements.forEach(elem => {
                elem.x = maxx - elem.width;
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <AlignRight theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'顶对齐'}>
          <a
            onClick={() => {
              const miny = Math.min(...elements.map(d => d.y));
              elements.forEach(elem => {
                elem.y = miny;
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <AlignTop theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'垂直对齐'}>
          <a
            onClick={() => {
              const minx = Math.min(...elements.map(d => d.x));
              const maxx = Math.max(...elements.map(d => d.x + d.width));
              const center = (maxx + minx) / 2;
              elements.forEach(elem => {
                elem.x = center - elem.width / 2;
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <AlignVertically theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'底对齐'}>
          <a
            onClick={() => {
              const maxy = Math.max(...elements.map(d => d.y + d.height));
              elements.forEach(elem => {
                elem.y = maxy - elem.height;
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <AlignBottom theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'水平间距分布'}>
          <a
            onClick={() => {
              // 计算出间距
              const minx = Math.min(...elements.map(d => d.x - d.width / 2));
              const maxx = Math.max(...elements.map(d => d.x + d.width / 2));
              const elementsSort = [...elements].sort((a, b) => {
                return a.x - b.x;
              });
              const totalWidth = elements.reduce((a, b) => {
                return a + b.width;
              }, 0);
              const space = (maxx - minx - totalWidth) / (elements.length - 1);
              let prevx = elementsSort[0].x + elementsSort[0].width / 2;
              elementsSort.forEach((elem, index) => {
                if (index !== 0) {
                  elem.x = prevx + space + elem.width / 2;
                  prevx = elem.x + elem.width / 2;
                }
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <DistributeHorizontalSpacing theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content={'垂直间距分布'}>
          <a
            onClick={() => {
              // 计算出间距
              const miny = Math.min(...elements.map(d => d.y - d.height / 2));
              const maxy = Math.max(...elements.map(d => d.y + d.height / 2));
              const elementsSort = [...elements].sort((a, b) => {
                return a.y - b.y;
              });
              const totalHeight = elements.reduce((a, b) => {
                return a + b.height;
              }, 0);
              const space = (maxy - miny - totalHeight) / (elements.length - 1);
              let prevy = elementsSort[0].y + elementsSort[0].height / 2;
              elementsSort.forEach((elem, index) => {
                if (index !== 0) {
                  elem.y = prevy + space + elem.height / 2;
                  prevy = elem.y + elem.height / 2;
                }
              });
              editor.updateCanvas();
              editor.store.emitControl(elements.map(d => d.id));
              editor.updateOption();
            }}
          >
            <DistributeVerticalSpacing theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </Tooltip>
      </div>

      {/* <div className={styles.spaces}>
        <a
          onClick={() => {
            console.log([...editor.selectedElementIds]);
            // 数据合并
            const g = editor.store.groupData([...editor.selectedElementIds]);
            editor.setSelectedElementIds([g.id]);
            editor.store.emitControl([g.id]);
          }}
        >
          <Group theme="filled" size="20" fill="var(--theme-icon)" />
        </a>
        <a>删除</a>
        <a>复制</a>
        <a>垂直间距</a>
        <a>水平间距</a>
      </div> */}
    </Item>
  );
}

export default observer(GroupAlign);
