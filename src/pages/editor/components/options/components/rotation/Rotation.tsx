import styles from './rotation.module.less';
import Item from '../item';
import SliderInput from '../slider-input';
import { useReducer } from 'react';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { pubsub } from '@utils/pubsub';
import { observer } from 'mobx-react';

export interface IProps {}

function Rotation(props: IProps) {
  editor.updateKey;
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData();

  return (
    <Item title="旋转">
      <div className={styles.opacity}>
        <SliderInput
          suffix="°"
          min={-180}
          max={180}
          step={1}
          value={elementData.rotation}
          onChange={v => {
            elementData.rotation = util.toNum(v);
            editor.store.triggerRotation(elementData, elementData.rotation);
            forceUpdate();
          }}
          onAfterChange={() => {
            editor.record({
              type: 'update',
              desc: '修改旋转角度',
            });
          }}
        />
      </div>
    </Item>
  );
}

export default observer(Rotation);
