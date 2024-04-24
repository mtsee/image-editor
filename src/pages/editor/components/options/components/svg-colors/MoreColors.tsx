import styles from './styles.module.less';
import React, { useReducer } from 'react';
import { ImageLayer } from '@pages/editor/core/types/data';
import { editor } from '@stores/index';
import { CloseSmall, Plus } from '@icon-park/react';
import SetColor from '../set-color';

export interface IProps {
  layer: ImageLayer;
}

export default function MoreColors(props: IProps) {
  const colors = props.layer.svgColors;
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className={styles.list}>
      {props.layer.svgColors.map((d, i) => {
        return (
          <SetColor
            key={d + '_' + i}
            color={{ color: d, type: 'solid' }}
            onChange={(v: any) => {
              props.layer.svgColors[i] = v.color;
              props.layer.svgColors = [...props.layer.svgColors];
              editor.updateCanvas();
            }}
          >
            <section style={{ backgroundColor: d }}>
              <a
                onClick={() => {
                  props.layer.svgColors.splice(i, 1);
                  props.layer.svgColors = [...props.layer.svgColors];
                  forceUpdate();
                  editor.updateCanvas();
                  editor.record({
                    type: 'update',
                    desc: '修改svg颜色',
                  });
                }}
              >
                <CloseSmall theme="outline" size="16" fill="var(--theme-icon)" />
              </a>
            </section>
          </SetColor>
        );
      })}
      <section
        className={styles.add}
        onClick={() => {
          props.layer.svgColors.push('#000000');
          props.layer.svgColors = [...props.layer.svgColors];
          forceUpdate();
          editor.updateCanvas();
          editor.record({
            type: 'update',
            desc: '修改svg颜色',
          });
        }}
      >
        <a>
          <Plus theme="outline" size="25" fill="var(--theme-icon)" />
        </a>
      </section>
    </div>
  );
}
