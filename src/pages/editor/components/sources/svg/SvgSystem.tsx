import { editor } from '@stores/editor';
import React from 'react';
import styles from './styles.module.less';

export interface IProps {}

export default function SvgSystem(props: IProps) {
  return (
    <div className={styles.colors + ' scroll'}>
      {/* {values.map((val, i) => {
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
      })} */}
    </div>
  );
}
