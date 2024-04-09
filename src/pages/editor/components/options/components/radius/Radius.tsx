import styles from './styles.module.less';
import Item from '../item';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { observer } from 'mobx-react';
import { useReducer, useState } from 'react';
import { ImageLayer } from '@pages/editor/core/types/data';
import { InputNumber, Switch } from '@douyinfe/semi-ui';
import { Square, Extend } from '@icon-park/react';
import classNames from 'classnames';

export interface IProps {}

function Radius(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as ImageLayer;

  if (!elementData.cornerRadius) {
    elementData.cornerRadius = [0, 0, 0, 0];
  }
  const [a, b, c, d] = elementData.cornerRadius;
  const [radiusType, setRadiusType] = useState(1);

  return (
    <Item
      title="圆角"
      extra={
        <div className={styles.radiuType}>
          <a
            onClick={() => {
              setRadiusType(1);
            }}
            className={classNames({
              [styles.active]: radiusType === 1,
            })}
          >
            <Square theme="outline" size="16" fill="var(--theme-icon)" />
          </a>
          <a
            className={classNames({
              [styles.active]: radiusType === 2,
            })}
            onClick={() => {
              setRadiusType(2);
            }}
          >
            <Extend theme="outline" size="16" fill="var(--theme-icon)" />
          </a>
        </div>
      }
    >
      <div className={styles.shadow}>
        {radiusType === 1 && (
          <div className={styles.inputbox}>
            <InputNumber
              innerButtons
              value={util.toNum(a)}
              onChange={(v: number) => {
                if (!v) {
                  v = 0;
                }
                const n = util.toNum(v);
                elementData.cornerRadius = [n, n, n, n];
                editor.updateCanvas();
                forceUpdate();
              }}
              onBlur={() => {
                editor.record({
                  type: 'update',
                  desc: '修改圆角',
                });
              }}
            />
          </div>
        )}
        {radiusType === 2 && (
          <>
            <div className={styles.inputs}>
              <InputNumber
                innerButtons
                value={util.toNum(a)}
                onChange={(v: number) => {
                  elementData.cornerRadius[0] = util.toNum(v);
                  elementData.cornerRadius = [...elementData.cornerRadius];
                  editor.updateCanvas();
                  forceUpdate();
                }}
                onBlur={() => {
                  editor.record({
                    type: 'update',
                    desc: '修改圆角',
                  });
                }}
              />
              <InputNumber
                innerButtons
                value={util.toNum(b)}
                onChange={(v: number) => {
                  elementData.cornerRadius[1] = util.toNum(v);
                  elementData.cornerRadius = [...elementData.cornerRadius];
                  editor.updateCanvas();
                  forceUpdate();
                }}
                onBlur={() => {
                  editor.record({
                    type: 'update',
                    desc: '修改圆角',
                  });
                }}
              />
            </div>
            <div className={styles.inputs}>
              <InputNumber
                innerButtons
                value={util.toNum(d)}
                onChange={(v: number) => {
                  elementData.cornerRadius[3] = util.toNum(v);
                  elementData.cornerRadius = [...elementData.cornerRadius];
                  editor.updateCanvas();
                  forceUpdate();
                }}
                onBlur={() => {
                  editor.updateCanvas();
                  forceUpdate();
                  editor.record({
                    type: 'update',
                    desc: '修改圆角',
                  });
                }}
              />
              <InputNumber
                innerButtons
                value={util.toNum(c)}
                onChange={(v: number) => {
                  elementData.cornerRadius[2] = util.toNum(v);
                  elementData.cornerRadius = [...elementData.cornerRadius];
                  editor.updateCanvas();
                  forceUpdate();
                }}
                onBlur={() => {
                  editor.updateCanvas();
                  forceUpdate();
                  editor.record({
                    type: 'update',
                    desc: '修改圆角',
                  });
                }}
              />
            </div>
          </>
        )}
      </div>
    </Item>
  );
}

export default observer(Radius);
