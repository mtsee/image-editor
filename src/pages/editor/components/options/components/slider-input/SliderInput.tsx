import styles from './sliderinput.module.less';
import { InputNumber, Slider } from '@douyinfe/semi-ui';
import { SliderProps } from '@douyinfe/semi-foundation/lib/es/slider/foundation';
// import { useCallback } from 'react';

export interface IProps {
  suffix?: string;
  value?: number;
  step?: number;
  max?: number;
  min?: number;
  disabled?: boolean;
  onChange?: (v: number) => void;
  onAfterChange?: (v: number) => void;
  sliderProps?: SliderProps;
}

export default function SliderInput(props: IProps) {
  const { suffix, sliderProps, value, onChange, onAfterChange, step, min, max, disabled } = props;
  // const debounceChange = useCallback(
  //   debounce(v => {
  //     onAfterChange(v);
  //   }, 500),
  //   [],
  // );
  return (
    <div className={styles.sliderinput}>
      <div className={styles.slider}>
        <Slider
          {...sliderProps}
          disabled={disabled}
          value={value}
          onChange={onChange}
          tipFormatter={null}
          // onAfterChange={debounceChange}
          step={step}
          max={max}
          min={min}
        />
      </div>
      <div className={styles.number}>
        <InputNumber
          disabled={disabled}
          innerButtons
          suffix={suffix}
          value={value}
          onChange={onChange}
          onBlur={e => {
            if (onAfterChange) {
              onAfterChange(Number(e.target.value));
            }
          }}
          step={step}
          max={max}
          min={min}
        />
      </div>
    </div>
  );
}
