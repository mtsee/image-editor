import styles from './styles.module.less';
import Item from '../item';
import { Tooltip } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { useReducer } from 'react';
// import { util } from '@utils/index';
// import { pubsub } from '@utils/pubsub';
import { Lock, Unlock, Group, DeleteOne, PreviewOpen, Copy, PreviewCloseOne } from '@icon-park/react';

export interface IProps {}

function GroupFast(props: IProps) {
  const elements = editor.getElementDataByIds([...editor.selectedElementIds]) || [];
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <Item title="快捷操作">
      {/* <div>边框，阴影，裁剪、图层、下移、上移、置顶、置底</div> */}
      <div className={styles.position}>
        <Tooltip content="合并图层">
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
        </Tooltip>
        <Tooltip content="锁定/解锁">
          <a
            onClick={() => {
              console.log('锁定');
              elements.forEach(elementData => {
                elementData._lock = !elementData._lock;
              });
              editor.updateCanvas();
              forceUpdate();
            }}
          >
            {elements
              .map(d => {
                return d._lock ? 1 : 0;
              })
              .reduce((a, b) => a + b, 0) === 0 ? (
              <Unlock size={20} color="var(--theme-icon)" />
            ) : (
              <Lock size={20} color="var(--theme-icon)" />
            )}
          </a>
        </Tooltip>
        <Tooltip content="可见/隐藏">
          <a
            onClick={() => {
              console.log('可见');
              elements.forEach(elementData => {
                elementData._hide = !elementData._hide;
              });
              editor.updateCanvas();
              forceUpdate();
            }}
          >
            {elements
              .map(d => {
                return d._hide ? 1 : 0;
              })
              .reduce((a, b) => a + b, 0) === 0 ? (
              <PreviewCloseOne size={20} color="var(--theme-icon)" />
            ) : (
              <PreviewOpen size={20} color="var(--theme-icon)" />
            )}
          </a>
        </Tooltip>
        <Tooltip content="复制">
          <a
            onClick={() => {
              console.log('复制');
              editor.copyElementData();
              // editor.updateCanvas();
            }}
          >
            <Copy size={20} color="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content="删除">
          <a
            onClick={() => {
              console.log(
                '删除',
                elements.map(d => d.id),
              );
              editor.store.deleteLayers(elements.map(d => d.id));
              editor.store.emitControl([]);
              editor.setSelectedElementIds([]);
              editor.updateCanvas();
            }}
          >
            <DeleteOne size={20} color="var(--theme-icon)" />
          </a>
        </Tooltip>
      </div>
    </Item>
  );
}

export default observer(GroupFast);
