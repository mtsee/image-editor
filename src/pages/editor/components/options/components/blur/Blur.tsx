import styles from './styles.module.less';
import Item from '../item';
import SliderInput from '../slider-input';
import { useMemo, useReducer } from 'react';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { pubsub } from '@utils/pubsub';
import { BaseLayer } from '@pages/editor/core/types/data';

export interface IProps {}

function Blur(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as BaseLayer;
  let blur = elementData.blur;
  return (
    <Item title="模糊度">
      <div className={styles.opacity}>
        <SliderInput
          step={1}
          min={0}
          max={500}
          value={util.toNum(blur)}
          onChange={v => {
            elementData._dirty = util.randomID();
            elementData.blur = util.toNum(v);
            forceUpdate();
            editor.updateCanvas();
          }}
          onAfterChange={() => {
            editor.record({
              type: 'update',
              desc: '设置模糊度',
            });
          }}
        />
      </div>
    </Item>
  );
}

export default observer(Blur);
