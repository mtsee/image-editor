import styles from './filter.module.less';
import Item from '../item';
import { editor } from '@stores/editor';
import { ImageLayer } from '@pages/editor/core/types/data';

import { observer } from 'mobx-react';
import { list } from './mock';
import classNames from 'classnames';
import { useReducer } from 'react';

/**
 type BlendMode =
  | 'pass-through' // 穿透
  | 'normal' // 正常
  | 'multiply' // 正片叠底---
  | 'darken' // 变暗
  | 'color-burn' // 颜色加深
  | 'lighten' // 变亮---
  | 'color-dodge' // 颜色减淡
  | 'screen' // 滤色
  | 'overlay' // 叠加---
  | 'hard-light' // 强光
  | 'soft-light' // 柔光
  | 'difference' // 差集---
  | 'exclusion' // 排除
  | 'hue' // 色相 ---
  | 'saturation' // 饱和度
  | 'color' // 颜色
  | 'luminosity' // 明度
 */

export interface IProps {}

function Filter(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as ImageLayer;
  editor.updateKey;
  if (!elementData.blendMode) {
    elementData.blendMode = 'normal';
  }
  return (
    <Item title="">
      <div className={styles.opacity}>
        {list.map(d => {
          return (
            <section
              key={d.val}
              onClick={() => {
                elementData.blendMode = d.val as any;
                editor.updateCanvas();
                forceUpdate();
              }}
              className={classNames(styles.item, {
                [styles.active]: elementData.blendMode === d.val,
              })}
            >
              {d.name}
            </section>
          );
        })}
      </div>
    </Item>
  );
}

export default observer(Filter);
