import styles from './size.module.less';
import Item from '../item';
import { InputNumber } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { useReducer } from 'react';
import { util } from '@utils/index';
import { pubsub } from '@utils/pubsub';
import { ImageLayer } from '@pages/editor/core/types/data';

export interface IProps {}

function Size(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as ImageLayer;
  editor.updateKey;
  if (!elementData._unKeepRatio && !elementData._ratio) {
    elementData._ratio = util.toNum(elementData.width) / (util.toNum(elementData.height) || 1);
  }
  return (
    <Item title="尺寸">
      <div className={styles.size}>
        <InputNumber
          innerButtons
          prefix="W"
          min={1}
          value={util.toNum(elementData.width)}
          onChange={(v: number) => {
            elementData.width = Math.max(util.toNum(v), 1);
            elementData.height = Math.max(elementData.width / (elementData._ratio || 1), 1);
            editor.updateCanvas();
            forceUpdate();
          }}
          onBlur={() => {
            editor.record({
              type: 'update',
              desc: '修改W',
            });
          }}
        />
        <InputNumber
          min={1}
          innerButtons
          prefix="H"
          value={util.toNum(elementData.height)}
          onChange={(v: number) => {
            elementData.height = Math.max(util.toNum(v), 1);
            elementData.width = Math.max(elementData.height * (elementData._ratio || 1), 1);
            // 同步修改
            editor.updateCanvas();
            forceUpdate();
          }}
          onBlur={() => {
            editor.record({
              type: 'update',
              desc: '修改H',
            });
          }}
        />
      </div>
    </Item>
  );
}

export default observer(Size);
