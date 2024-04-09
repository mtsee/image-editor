import styles from './position.module.less';
import Item from '../item';
import { InputNumber } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { useReducer } from 'react';
import { util } from '@utils/index';
import { pubsub } from '@utils/pubsub';

export interface IProps {}

function Position(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as any;
  editor.updateKey;

  return (
    <Item title="位置">
      <div className={styles.position}>
        <InputNumber
          innerButtons
          prefix="X"
          value={util.toNum(elementData.x)}
          onChange={(v: number) => {
            elementData.x = util.toNum(v);
            editor.updateCanvas();
            forceUpdate();
          }}
          onBlur={() => {
            editor.record({
              type: 'update',
              desc: '修改X',
            });
          }}
        />
        <InputNumber
          innerButtons
          prefix="Y"
          value={util.toNum(elementData.y)}
          onChange={(v: number) => {
            elementData.y = util.toNum(v);
            editor.updateCanvas();
            forceUpdate();
          }}
          onBlur={() => {
            editor.record({
              type: 'update',
              desc: '修改Y',
            });
          }}
        />
      </div>
    </Item>
  );
}

export default observer(Position);
