import styles from './color.module.less';
import { SketchPicker } from 'react-color';
import { Popover } from '@douyinfe/semi-ui';
import { useState } from 'react';
// import { HexColorPicker } from "react-colorful";

export interface IProps {
  colors: { color: string; p: number }[];
  onChange: (v: any) => void;
  onAfterChange?: (v: any) => void;
}

export default function GradualColor(props: IProps) {
  // <Popover trigger="click" content={<SketchPicker />}>
  const { colors } = props;
  // const [colors, setColors] = useState([...props.colors]);
  const gradients = [];
  colors.forEach(d => {
    gradients.push(`${d.color} ${d.p * 100}%`);
  });

  return (
    <div className={styles.color} style={{ backgroundImage: `linear-gradient(90deg, ${gradients.join(',')})` }}>
      {colors.map((d, index) => {
        const color = d.color;
        const left = d.p * 100;
        return (
          <Popover
            trigger="click"
            content={
              <div className={styles.colorModal}>
                <SketchPicker
                  color={color}
                  onChange={e => {
                    console.log('eee', e);
                    const nColors = [...colors];
                    nColors[index].color = e.hex;
                    props.onChange([...nColors]);
                  }}
                  onChangeComplete={props.onAfterChange}
                  className={styles.colorPicker}
                />
                {/* <div className={styles.colorModalFooter}>
                  <a>前面插入</a>
                  <a>后面插入</a>
                  <a>删除颜色</a>
                </div> */}
              </div>
            }
          >
            <a style={{ background: color, left: left + '%' }}></a>
          </Popover>
        );
      })}
    </div>
  );
}
