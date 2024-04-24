import { editor } from '@stores/editor';
import React from 'react';
import { values } from './color.mock';
import styles from './styles.module.less';

export interface IProps {}

export default function BackgroundColor(props: IProps) {
  const setBgColor = val => {
    const { rotate, colors } = val;
    console.log('colors', val);
    editor.pageData.background = {
      type: 'linear',
      from: { x: 0, y: 0 },
      to: angleToCoordinates(rotate % 90),
      stops: colors.map(d => {
        return {
          offset: d.p / 100,
          color: d.c,
        };
      }),
    };
    editor.updateCanvas();
  };

  return (
    <div className={styles.colors + ' scroll'}>
      {values.map((val, i) => {
        // console.log(`linear-gradient(${val.rotate}deg, ${val.colors.map(d => `${d.p}% ${d.c}`).join(',')})`);
        return (
          <section
            onClick={() => setBgColor(val)}
            key={i}
            style={{
              backgroundImage: `linear-gradient(${val.rotate}deg, ${val.colors.map(d => `${d.c} ${d.p}%`).join(',')})`,
            }}
          ></section>
        );
      })}
    </div>
  );
}

function angleToCoordinates(angleInDegrees) {
  // 将角度转换为弧度
  const angleInRadians = (angleInDegrees * Math.PI) / 180;

  // 计算x和y坐标
  let x = Math.cos(angleInRadians);
  let y = Math.sin(angleInRadians);

  console.log({ x: x, y: y });

  // 返回坐标对象
  return { x: x, y: y };
}
