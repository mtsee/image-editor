import styles from './background.module.less';
import Source from '@pages/editor/common/source';
import { editor } from '@stores/editor';
import classNames from 'classnames';
import { useReducer } from 'react';
import { colors } from './colors';
import { splitArray } from '@utils/util';
import { ChromePicker } from 'react-color';
import { Close } from '@icon-park/react';
// import type { ChromePickerProps } from 'react-color';

export interface IProps {}

export default function Background(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return (
    <div className={styles.background + ' scroll'}>
      <h1>
        背景颜色
        <a
          onClick={() => {
            editor.optionPanelCustom = '';
          }}
          className={styles.close}
        >
          <Close theme="outline" size="20" fill="var(--theme-icon)" />
        </a>
      </h1>
      <div className={styles.colorInput}>
        <ChromePicker
          color={editor.data.background.color}
          onChange={v => {
            editor.data.background.color = v.hex;
            forceUpdate();
            editor.movie.update();
          }}
        />
      </div>
      <div className={styles.colors}>
        {colors.map(item => {
          const colorsGroup = splitArray(item.colors, 7);
          console.log('colorsGroup', colorsGroup);
          return (
            <div key={item.name} className={styles.item}>
              <h2>{item.cname}</h2>
              {colorsGroup.map((arr, i) => {
                return (
                  <ul key={i}>
                    {arr.map(c => {
                      return (
                        <li
                          onClick={() => {
                            editor.data.background.color = c;
                            editor.movie.update();
                            forceUpdate();
                          }}
                          className={classNames(styles.colorItem, {
                            [styles.active]: c === editor.data.background.color,
                          })}
                          key={c}
                          style={{ background: c }}
                        ></li>
                      );
                    })}
                  </ul>
                );
              })}
            </div>
          );
        })}
        {/* {colors.map((arr, i) => {
          return (
            <ul key={i}>
              {arr.map(c => {
                return (
                  <li
                    onClick={() => {
                      editor.data.background.color = c;
                      editor.movie.update();
                      forceUpdate();
                    }}
                    className={classNames(styles.colorItem, {
                      [styles.active]: c === editor.data.background.color,
                    })}
                    key={c}
                    style={{ background: c }}
                  ></li>
                );
              })}
            </ul>
          );
        })} */}
      </div>
      {/* <div className={styles.sources}>
        <Source type="background" />
      </div> */}
    </div>
  );
}
