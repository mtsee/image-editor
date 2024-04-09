import styles from './styles.module.less';
import Item from '../item';
import { Tooltip } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { useReducer } from 'react';
import { util } from '@utils/index';
import { pubsub } from '@utils/pubsub';
import {
  FlipHorizontally,
  FlipVertically,
  Lock,
  Unlock,
  DeleteOne,
  PreviewOpen,
  Ungroup,
  Copy,
  PreviewCloseOne,
  Cutting,
} from '@icon-park/react';
import CropperImage from './CropperImage';
import { GroupLayer, ImageLayer } from '@pages/editor/core/types/data';

export interface IProps {}

function FlipXY(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as ImageLayer;

  editor.updateKey;
  if (!elementData) {
    return null;
  }
  return (
    <Item title="快捷操作">
      {/* <div>边框，阴影，裁剪、图层、下移、上移、置顶、置底</div> */}
      <div className={styles.position}>
        {(elementData as any).type === 'image' && <CropperImage />}
        <Tooltip content="水平翻转">
          <a
            onClick={() => {
              elementData.flipx = !elementData.flipx;
              editor.updateCanvas();
            }}
          >
            <FlipHorizontally size={20} color="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content="垂直翻转">
          <a
            onClick={() => {
              elementData.flipy = !elementData.flipy;
              editor.updateCanvas();
            }}
          >
            <FlipVertically size={20} color="var(--theme-icon)" />
          </a>
        </Tooltip>
        <Tooltip content="锁定/解锁">
          <a
            onClick={() => {
              console.log('锁定');
              elementData._lock = !elementData._lock;
              editor.updateCanvas();
              forceUpdate();
            }}
          >
            {!elementData._lock ? (
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
              elementData._hide = !elementData._hide;
              editor.updateCanvas();
              forceUpdate();
            }}
          >
            {elementData._hide ? (
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
              console.log('删除');
              editor.store.deleteLayers([elementData.id]);
              editor.store.emitControl([]);
              editor.setSelectedElementIds([]);
              editor.updateCanvas();
            }}
          >
            <DeleteOne size={20} color="var(--theme-icon)" />
          </a>
        </Tooltip>
        {(elementData as any).type === 'group' && (
          <Tooltip content="打散">
            <a
              onClick={() => {
                console.log('打散到上一层');
                const ids = editor.store.unGroupData(elementData.id);
                editor.setSelectedElementIds([ids[0]]);
                editor.store.emitControl([ids[0]]);
                editor.updateCanvasKey = util.createID();
              }}
            >
              <Ungroup size={20} color="var(--theme-icon)" />
            </a>
          </Tooltip>
        )}
      </div>
    </Item>
  );
}

export default observer(FlipXY);
