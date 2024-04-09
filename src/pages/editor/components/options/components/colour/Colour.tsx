import styles from './colour.module.less';
import Item from '../item';
import SliderInput from '../slider-input';
// import { Switch } from '@douyinfe/semi-ui';
import { useCallback, useEffect, useState } from 'react';
// import Color from '../color';
// import { Select, InputNumber } from '@douyinfe/semi-ui';
import { useReducer } from 'react';
import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import { util } from '@utils/index';

export interface IProps {}
function Colour(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as any;

  const getValue = useCallback(
    (name: string): number => {
      if (!elementData.filters) {
        elementData.filters = [];
      }
      const filter = elementData.filters.find(d => d.name === name);
      if (filter) {
        return filter.params.value;
      }
      return 0;
    },
    [elementData.filters],
  );

  const changeValue = useCallback(
    (v: number, name: string, defaultValue?: number) => {
      if (!elementData.filters) {
        elementData.filters = [];
      }
      if (defaultValue === undefined) {
        defaultValue = 0;
      }
      v = Number(v);
      const filter = elementData.filters.find(d => d.name === name);
      if (filter) {
        filter.params.value = v;
        filter.enabled = v === defaultValue ? false : true;
      } else {
        elementData.filters.push({
          name,
          enabled: v === defaultValue ? false : true,
          params: { value: v },
        });
      }
      elementData._filtersDirty = util.createID();
      editor.updateCanvas();
      forceUpdate();
    },
    [elementData.filters],
  );

  // saturation: true, // 饱和度
  // tint: true, // 色调
  // hue: true, // 色相
  // brightness: true, // 亮度
  // exposure: true, // 曝光
  // contrast: true, // 对比度
  // highlights: true, // 高光
  // sharpen: true, // 锐化
  // clarity: true, // 清晰
  // smooth: true, // 光滑
  // blur: true, // 模糊
  // grain: true, // 噪点
  // vignetteWhite: true, // 白色光晕
  // vignetteBlack: true, // 黑色光晕
  // fill: true, // 调色
  return (
    <div className={styles.colour + ' scroll'}>
      {/* <Item title="饱和度">
        <SliderInput
          min={-1}
          max={1}
          value={getValue('Saturation')}
          onChange={v => changeValue(v, 'Saturation')}
          step={0.01}
        />
      </Item> */}
      <Item title="色调">
        <SliderInput value={getValue('Tint')} onChange={v => changeValue(v, 'Tint')} min={-1} max={1} step={0.01} />
      </Item>
      {/* <Item title="色相">
        <SliderInput value={getValue('Hue')} onChange={v => changeValue(v, 'Hue')} min={-1} max={1} step={0.01} />
      </Item> */}
      {/* <Item title="亮度">
        <SliderInput
          value={getValue('Brightness')}
          onChange={v => changeValue(v, 'Brightness')}
          min={-1}
          max={1}
          step={0.01}
        />
      </Item> */}
      <Item title="曝光">
        <SliderInput
          value={getValue('Exposure')}
          onChange={v => changeValue(v, 'Exposure')}
          min={-1}
          max={1}
          step={0.01}
        />
      </Item>
      {/* <Item title="对比度">
        <SliderInput
          value={getValue('Contrast')}
          onChange={v => changeValue(v, 'Contrast')}
          min={-1}
          max={1}
          step={0.01}
        />
      </Item> */}
      <Item title="高光">
        <SliderInput
          value={getValue('Highlights')}
          onChange={v => changeValue(v, 'Highlights')}
          min={-1}
          max={1}
          step={0.01}
        />
      </Item>
      <Item title="锐化">
        <SliderInput
          value={getValue('Sharpen')}
          onChange={v => changeValue(v, 'Sharpen')}
          min={0}
          max={1}
          step={0.01}
        />
      </Item>
      <Item title="清晰">
        <SliderInput
          value={getValue('Clarity')}
          onChange={v => changeValue(v, 'Clarity')}
          min={-1}
          max={1}
          step={0.01}
        />
      </Item>
      <Item title="光滑">
        <SliderInput min={0} max={1} value={getValue('Smooth')} onChange={v => changeValue(v, 'Smooth')} step={0.01} />
      </Item>
      <Item title="噪点">
        <SliderInput min={0} max={1} value={getValue('Grain')} onChange={v => changeValue(v, 'Grain')} step={0.01} />
      </Item>
      {/* <Item title="光晕">
        <SliderInput
          min={0}
          max={1}
          value={getValue('VignetteWhite')}
          onChange={v => changeValue(v, 'VignetteWhite')}
          step={0.01}
        />
        <div className={styles.fillOption}>
          <Select defaultValue="VignetteWhite" style={{ width: '100%' }}>
            <Select.Option value="vignetteBlack">黑色</Select.Option>
            <Select.Option value="VignetteWhite">白色</Select.Option>
          </Select>
        </div>
      </Item> */}
      {/* <Item title="调色">
        <SliderInput min={0} max={1} value={getValue('Fill')} onChange={v => changeValue(v, 'Fill')} step={0.01} />
        <div className={styles.fillOption}>
          <Color value="#ff0" onChange={() => {}} />
          <Select defaultValue="default" style={{ width: 'calc(50% - 3px)' }}>
            <Select.Option value="default">默认</Select.Option>
            <Select.Option value="ulikecam">正片叠底</Select.Option>
            <Select.Option value="jianying">增强</Select.Option>
            <Select.Option value="xigua">减弱</Select.Option>
          </Select>
        </div>
      </Item> */}
    </div>
  );
}

export default observer(Colour);
