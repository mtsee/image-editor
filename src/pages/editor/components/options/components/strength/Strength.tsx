import styles from './strength.module.less';
import Item from '../item';
import SliderInput from '../slider-input';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { observer } from 'mobx-react';
import { useReducer } from 'react';

export interface IProps {}

function Strength(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as any;
  const { intensity } = elementData;

  return (
    <Item title="强度">
      <div className={styles.strength}>
        <SliderInput
          value={util.toNum(intensity * 100)}
          onChange={v => {
            elementData.intensity = util.toNum(v / 100, 2);
            editor.updateCanvas();
            forceUpdate();
          }}
          suffix="%"
          step={1}
          min={0}
          max={100} // 16 + 9
          onAfterChange={() => {
            editor.record({
              type: 'update',
              desc: '修改强度',
            });
          }}
        />
      </div>
    </Item>
  );
}

export default observer(Strength);
