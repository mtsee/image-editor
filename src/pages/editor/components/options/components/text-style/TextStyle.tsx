import styles from './textstyle.module.less';
import Item from '../item';
import { Select, InputNumber, Toast } from '@douyinfe/semi-ui';
import {
  TextBold,
  TextItalic,
  RowHeight,
  AutoLineWidth,
  AlignTextLeft,
  TextUnderline,
  AlignTextCenter,
  AlignTextRight,
  SortFour,
  DividingLine,
  Erase,
} from '@icon-park/react';
// import Color from '../color';
// import GradualColor from '../gradual-color';
import classNames from 'classnames';
import { useState } from 'react';
import { observer } from 'mobx-react';
import { useReducer } from 'react';
import { editor } from '@stores/editor';
import { fontFamilys } from './mock';
import { util } from '@utils/index';
import { TextLayer } from '@pages/editor/core/types/data';
import { IPaint, ITextAlign } from '@leafer-ui/interface';
import { loadFont } from '@pages/editor/core/tools/utils';
import SetColor from '../set-color';

export interface IProps {}
function TextStyle(props: IProps) {
  const elementData = editor.getElementData() as TextLayer;
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  editor.updateKey;

  const changeAlign = (key: ITextAlign) => {
    const { textAlign } = elementData.textStyle;
    if (textAlign !== key) {
      elementData.textStyle.textAlign = key;
    }
    elementData.textStyle = { ...elementData.textStyle };
    editor.updateCanvas();
    forceUpdate();
    editor.record({
      type: 'update',
      desc: '文本对齐' + key,
    });
  };

  const changeNumber = (key: string, val: number) => {
    if (['lineHeight', 'letterSpacing'].includes(key)) {
      elementData.textStyle[key].value = val;
    } else {
      elementData.textStyle[key] = val;
    }
    elementData.textStyle = { ...elementData.textStyle };
    editor.updateCanvas();
    forceUpdate();
  };

  if (!elementData.textStyle.lineHeight) {
    elementData.textStyle.lineHeight = { type: 'percent', value: 150 };
  }
  if (!elementData.textStyle.letterSpacing) {
    elementData.textStyle.letterSpacing = { type: 'percent', value: 0 };
  }

  return (
    <>
      <div className={styles.texts}>
        <div className={styles.fontSpace}>
          <Select
            onChange={e => {
              const fontFamily = fontFamilys.find(d => d.name === e);
              elementData.textStyle.fontFamily = fontFamily.name;
              elementData.fontFamilyURL = fontFamily.url;

              Toast.info({
                content: '字体加载中...',
                duration: 99999,
              });
              loadFont(fontFamily.name, fontFamily.url).then(() => {
                editor.updateCanvas();
                forceUpdate();
                Toast.destroyAll();
                editor.record({
                  type: 'update',
                  desc: '修改字体',
                });
              });
            }}
            value={elementData.textStyle.fontFamily || '默认'}
          >
            {fontFamilys.map(item => {
              return (
                <Select.Option key={item.name} value={item.name}>
                  {item.thumb ? <img style={{ height: 24 }} src={item.thumb} alt="" /> : item.name}
                </Select.Option>
              );
            })}
          </Select>
          <InputNumber
            onChange={e => changeNumber('fontSize', util.toNum(Number(e)))}
            value={util.toNum(elementData.textStyle.fontSize)}
            innerButtons
            suffix="px"
            onBlur={() => {
              editor.record({
                type: 'update',
                desc: '修改文字大小',
              });
            }}
          />
        </div>
        <div className={styles.styleSpace}>
          <a
            className={classNames({
              [styles.active]: elementData.textStyle.fontWeight === 'bold',
            })}
            onClick={() => {
              const { fontWeight } = elementData.textStyle;
              if (fontWeight === 'bold') {
                elementData.textStyle.fontWeight = 'normal';
              } else {
                elementData.textStyle.fontWeight = 'bold';
              }
              elementData.textStyle = { ...elementData.textStyle };
              editor.updateCanvas();
              forceUpdate();
              editor.record({
                type: 'update',
                desc: '加粗&取消',
              });
            }}
          >
            <TextBold theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
          <a
            className={classNames({
              [styles.active]: elementData.textStyle.italic === true,
            })}
            onClick={() => {
              const { italic } = elementData.textStyle;
              if (italic) {
                elementData.textStyle.italic = false;
              } else {
                elementData.textStyle.italic = true;
              }
              elementData.textStyle = { ...elementData.textStyle };
              editor.updateCanvas();
              forceUpdate();
              editor.record({
                type: 'update',
                desc: '倾斜',
              });
            }}
          >
            <TextItalic theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
          <a
            className={classNames({
              [styles.active]:
                elementData.textStyle.textDecoration === 'under' || !elementData.textStyle.textDecoration,
            })}
            onClick={() => {
              const { textDecoration = 'none' } = elementData.textStyle;
              if (textDecoration !== 'none') {
                elementData.textStyle.textDecoration = 'none';
              } else {
                elementData.textStyle.textDecoration = 'under';
              }
              elementData.textStyle = { ...elementData.textStyle };
              editor.updateCanvas();
              forceUpdate();
              editor.record({
                type: 'update',
                desc: '下划线',
              });
            }}
          >
            <TextUnderline theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
          <a
            className={classNames({
              [styles.active]: elementData.textStyle.textAlign === 'left' || !elementData.textStyle.textAlign,
            })}
            onClick={() => changeAlign('left')}
          >
            <AlignTextLeft theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
          <a
            className={classNames({
              [styles.active]: elementData.textStyle.textAlign === 'center',
            })}
            onClick={() => changeAlign('center')}
          >
            <AlignTextCenter theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
          <a
            className={classNames({
              [styles.active]: elementData.textStyle.textAlign === 'right',
            })}
            onClick={() => changeAlign('right')}
          >
            <AlignTextRight theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </div>
        <div className={styles.textSpace}>
          <InputNumber
            onChange={e => changeNumber('lineHeight', util.toNum(Number(e)))}
            value={util.toNum((elementData.textStyle.lineHeight as any).value as number)}
            suffix="%"
            prefix={
              <span className={styles.prefixIco}>
                <RowHeight theme="filled" size="16" fill="var(--theme-icon)" />
              </span>
            }
            innerButtons
            onBlur={() => {
              editor.record({
                type: 'update',
                desc: '修改文字行高',
              });
            }}
          />
          <InputNumber
            onChange={e => changeNumber('letterSpacing', util.toNum(Number(e)))}
            value={util.toNum((elementData.textStyle.letterSpacing as any).value as number)}
            suffix="%"
            prefix={
              <span className={styles.prefixIco}>
                <AutoLineWidth theme="filled" size="16" fill="var(--theme-icon)" />
              </span>
            }
            innerButtons
            onBlur={() => {
              editor.record({
                type: 'update',
                desc: '修改文字间距',
              });
            }}
          />
        </div>
      </div>
      <Item title="文字颜色">
        <SetColor
          gradual={true}
          list={true}
          color={elementData.textStyle.fill as IPaint}
          onChange={v => {
            console.log('vvv', v);
            elementData.textStyle.fill = v;
            elementData.textStyle = { ...elementData.textStyle };
            editor.updateCanvas();
          }}
        />
      </Item>
      {/* <Item title="文字背景"></Item> */}
      <Item title="文字描边">
        <div className={styles.textSpace}>
          <InputNumber
            min={0}
            value={elementData.textStyle.strokeWidth as number}
            onChange={e => changeNumber('strokeWidth', util.toNum(Number(e)))}
            suffix="px"
            prefix={
              <span className={styles.prefixIco}>
                <DividingLine theme="filled" size="16" fill="var(--theme-icon)" />
              </span>
            }
            innerButtons
            onBlur={() => {
              editor.record({
                type: 'update',
                desc: '修改文字描边',
              });
            }}
          />
          <SetColor
            gradual={false}
            list={false}
            color={(elementData.textStyle.stroke as IPaint) || { color: 'rgba(0,0,0,1)', type: 'solid' }}
            onChange={v => {
              // console.log('vvv', v);
              elementData.textStyle.stroke = v;
              elementData.textStyle = { ...elementData.textStyle };
              editor.updateCanvas();
              editor.record({
                type: 'update',
                desc: '修改文字描边颜色',
              });
            }}
          />
        </div>
      </Item>
      {/* <Item title="背景">
        <div className={styles.backgrounds}>
          <Color />
          <a className={styles.clearColor}>
            <Erase theme="filled" size="20" fill="var(--theme-icon)" />
          </a>
        </div>
      </Item> */}
    </>
  );
}

export default observer(TextStyle);
