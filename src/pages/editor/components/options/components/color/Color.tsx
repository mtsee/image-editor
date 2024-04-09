import styles from './color.module.less';
import { SketchPicker } from 'react-color';
import { Popover } from '@douyinfe/semi-ui';
import { useState } from 'react';
import { observer } from 'mobx-react';

export interface IProps {
  value: string;
  style?: Record<string, any>;
  onChange: (v: { hex: string; rgba: string }) => void;
  onAfterChange?: (v: { hex: string; rgba: string }) => void;
}
export default function Color(props: IProps) {
  return (
    <Popover
      trigger="click"
      content={
        <SketchPicker
          color={props.value}
          onChange={v => {
            const { r, g, b, a } = v.rgb;
            props.onChange({
              hex: v.hex,
              rgba: `rgba(${r},${g},${b},${a})`,
            });
          }}
          onChangeComplete={v => {
            const { r, g, b, a } = v.rgb;
            props.onAfterChange({
              hex: v.hex,
              rgba: `rgba(${r},${g},${b},${a})`,
            });
          }}
        />
      }
    >
      <span style={{ backgroundColor: props.value, ...(props.style || {}) }} className={styles.color}></span>
    </Popover>
  );
}
