import { utils } from '@core/index';
import React, { useReducer } from 'react';
import styles from './styles.module.less';
import { editor } from '@stores/index';
import { ImageLayer } from '@pages/editor/core/types/data';
import { observer } from 'mobx-react';
import Item from '../item';
import SetColor from '../set-color';
import MoreColors from './MoreColors';
import classNames from 'classnames';
import { MoreTwo, RadioTwo } from '@icon-park/react';
import { Tooltip } from '@douyinfe/semi-ui';

export interface IProps {}

export default function SvgColors(props: IProps) {
  const elementData = editor.getElementData() as ImageLayer;
  const ext = utils.getFileExtension(elementData.url);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  if (ext !== 'svg') {
    return null;
  }
  if (!elementData.svgColors) {
    elementData.svgColors = ['#000000'];
  }

  return (
    <div className={styles.items}>
      <Item
        title="设置颜色"
        extra={
          <div className={styles.svgColorType}>
            <Tooltip content="单色">
              <a
                onClick={() => {
                  elementData.svgColorType = 'one';
                  editor.updateCanvas();
                  forceUpdate();
                }}
                className={classNames({
                  [styles.active]: elementData.svgColorType === 'one',
                })}
              >
                <RadioTwo theme="outline" size="16" fill="var(--theme-icon)" />
              </a>
            </Tooltip>
            <Tooltip content="多色">
              <a
                className={classNames({
                  [styles.active]: elementData.svgColorType === 'more',
                })}
                onClick={() => {
                  elementData.svgColorType = 'more';
                  editor.updateCanvas();
                  forceUpdate();
                }}
              >
                <MoreTwo theme="outline" size="16" fill="var(--theme-icon)" />
              </a>{' '}
            </Tooltip>
          </div>
        }
      >
        {elementData.svgColorType === 'one' ? (
          <>
            <SetColor
              gradual={false}
              list={true}
              color={
                elementData.svgColors
                  ? { color: elementData.svgColors[0], type: 'solid' }
                  : { color: 'rgba(0,0,0,1)', type: 'solid' }
              }
              onChange={(v: any) => {
                elementData.svgColors = [v.color];
                editor.updateCanvas();
                editor.record({
                  type: 'update',
                  desc: '修改svg颜色',
                });
              }}
            />
          </>
        ) : (
          <MoreColors layer={elementData} />
        )}
      </Item>
    </div>
  );
}
