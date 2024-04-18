import styles from './styles.module.less';
import { Popover, Input, Slider, InputNumber, Toast } from '@douyinfe/semi-ui';
import type { IPaint } from '@leafer-ui/interface';
import { useCallback, useEffect, useReducer, useRef, useState } from 'react';
import classNames from 'classnames';
import { CheckSmall, MoreTwo } from '@icon-park/react';
import { RgbaColorPicker } from 'react-colorful';
// import { ReactAnglePicker } from 'react-angle-picker';
import * as icons from './icon';
import { calculateAngle, calculatePoints } from './tools';
import tinycolor from 'tinycolor2';
import offset from 'offset';
// import { util } from '@utils/index';

export interface IProps {
  gradual?: boolean; // 是否支持渐变？
  list?: boolean;
  style?: Record<string, any>;
  color: IPaint;
  onChange: (val: IPaint) => void;
}

/**
 * 颜色可以是单色，渐变色目前只做 Paint 的支持
 * @param props
 * @returns
 */
export default function SetColor(props: IProps) {
  const [color, setColor] = useState<IPaint>(
    typeof props.color === 'string'
      ? {
          color: props.color,
          type: 'solid',
        }
      : props.color,
  );
  const [cacheColors, setCacheColors] = useState<IPaint[]>([
    {
      type: 'solid',
      color: '#ff6370',
    },
    {
      type: 'solid',
      color: '#ff764c',
    },
    {
      type: 'solid',
      color: '#ffde6b',
    },
    {
      type: 'solid',
      color: '#70cf97',
    },
    {
      type: 'solid',
      color: '#2884ff',
    },
    {
      type: 'solid',
      color: '#725cff',
    },
  ]);

  if (!props.list) {
    console.log('colorxxxxxxxxxxx', color);
    let bg = '';
    if (color.type === 'solid') {
      bg = color.color as string;
    } else {
      bg = `linear-gradient(90deg, ${(color as any).stops
        .map(d => {
          return `${d.color} ${d.offset * 100}%`;
        })
        .join(',')})`;
    }

    return (
      <Popover
        trigger="click"
        content={
          <ColorModal
            gradual={props.gradual}
            color={color}
            onChange={c => {
              setColor(c);
              props.onChange(c);
            }}
          />
        }
      >
        <span style={{ background: bg, ...(props.style || {}) }} className={styles.color}></span>
      </Popover>
    );
  }

  return (
    <div className={styles.colors}>
      {cacheColors.map((d: any, i) => {
        const isActive = d.color === (color as any).color;
        return (
          <a
            key={i}
            className={classNames(styles.colora, {
              [styles.active]: isActive,
            })}
            onClick={() => {
              setColor(d);
              props.onChange({ ...d });
            }}
            style={{ background: d.color }}
          >
            {isActive && <CheckSmall theme="outline" size="20" fill="#fff" />}
          </a>
        );
      })}
      <Popover
        trigger="click"
        content={
          <ColorModal
            gradual={props.gradual}
            color={color}
            onChange={c => {
              setColor(c);
              props.onChange(c);
            }}
          />
        }
      >
        <a className={styles.colora}>
          <icons.TiaoSeBan size={22} />
        </a>
      </Popover>
    </div>
  );
}

interface IPropsColorModal {
  gradual: boolean; // 是否支持渐变色
  // type: 'solid' | 'linear' | 'radial' | 'angular' | 'image';
  color: IPaint;
  onChange: (c: IPaint) => void;
}

function ColorModal(props: IPropsColorModal) {
  const propsColor = props.color as any;
  const isgradual = ['linear', 'radial', 'angular'].includes(propsColor.type);
  let initColor = '#000000';
  if (propsColor.type === 'solid') {
    initColor = propsColor.color;
  } else {
    initColor = propsColor.stops[0].color;
  }
  const gradualDOMRef = useRef<HTMLDivElement>();
  const [val, setVal] = useState(tinycolor(initColor).toRgb());
  // 选中设置的渐变色
  const [activeGradualIndex, setActiveGradualIndex] = useState(0);
  const stops = propsColor.stops || [];
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  const onDragStart = e => {
    const { left, width } = offset(gradualDOMRef.current);
    if (activeGradualIndex === 0 || activeGradualIndex === stops.length - 1) {
      return;
    }

    const onMouseMove = em => {
      em.preventDefault();
      const p = Number(((em.pageX - left) / width).toFixed(2));
      // 范围
      const prevStop = stops[activeGradualIndex - 1];
      const nextStop = stops[activeGradualIndex + 1];
      if (p > prevStop.offset + 0.01 && p < nextStop.offset - 0.01) {
        stops[activeGradualIndex].offset = p;
        forceUpdate();
      }
    };
    const onMouseUp = eu => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };

  // 从val中重新设置颜色
  const resetColorByVal = (v, i?: number) => {
    const color = propsColor as any;
    if (isgradual) {
      if (i === undefined) {
        i = activeGradualIndex;
      }
      color.stops[i].color = `rgba(${v.r},${v.g},${v.b},${v.a})`;
    } else {
      color.color = `rgba(${v.r},${v.g},${v.b},${v.a})`;
    }
    props.onChange({ ...color });
  };

  // 删除
  useEffect(() => {
    const deleteStop = e => {
      if ((e.key as string).toLocaleLowerCase() === 'delete') {
        if (isgradual) {
          const color = propsColor as any;
          if (color.stops.length <= 2) {
            return;
          }
          color.stops.splice(activeGradualIndex, 1);
          props.onChange({ ...color });
          setVal(tinycolor(color.stops[0].color).toRgb());
          setActiveGradualIndex(0);
        }
      }
    };
    document.addEventListener('keydown', deleteStop);
    return () => {
      document.removeEventListener('keydown', deleteStop);
    };
  }, [isgradual, activeGradualIndex, propsColor]);

  return (
    <div className={styles.modal}>
      <div className={styles.header}>
        <h1>颜色设置</h1>
        {props.gradual && (
          <div className={styles.options}>
            <span
              onClick={() => {
                const color: IPaint = {
                  type: 'solid',
                  color: '#000',
                };
                const v = tinycolor(`#000`).toRgb();
                setVal(v);
                props.onChange(color);
              }}
              className={classNames(styles.item, styles.solid, {
                [styles.active]: propsColor.type === 'solid',
              })}
            ></span>
            <span
              onClick={() => {
                const color: IPaint = {
                  type: 'linear',
                  from: { x: 0, y: 0 },
                  to: { x: 1, y: 0 },
                  stops: [
                    { offset: 0, color: '#ff3900' },
                    { offset: 1, color: '#ffd200' },
                  ],
                };
                const v = tinycolor(`#ff3900`).toRgb();
                setVal(v);
                props.onChange(color);
              }}
              className={classNames(styles.item, styles.linear, {
                [styles.active]: propsColor.type === 'linear',
              })}
            ></span>
            <span
              onClick={() => {
                const color: IPaint = {
                  type: 'radial',
                  stops: [
                    { offset: 0, color: '#ff3900' },
                    { offset: 1, color: '#ffd200' },
                  ],
                };
                const v = tinycolor(`#ff3900`).toRgb();
                setVal(v);
                props.onChange(color);
              }}
              className={classNames(styles.item, styles.radial, {
                [styles.active]: propsColor.type === 'radial',
              })}
            ></span>
          </div>
        )}
      </div>
      {isgradual && (
        <div
          className={styles.gradual}
          ref={gradualDOMRef}
          onClick={e => {
            if (e.target === e.currentTarget) {
              const { left, width } = offset(gradualDOMRef.current);
              const p = Number(((e.pageX - left) / width).toFixed(2));
              let c = null;
              let index = 0;
              for (let i = 1; i < stops.length; i++) {
                const prevStop = stops[i - 1];
                const nowStop = stops[i];
                if (p > prevStop.offset && p < nowStop.offset) {
                  index = i;
                  c = tinycolor.mix(
                    prevStop.color,
                    nowStop.color,
                    ((p - prevStop.offset) / (nowStop.offset - prevStop.offset)) * 100,
                  );
                  break;
                }
              }
              if (c) {
                const v = c.toRgb();
                stops.push({
                  offset: p,
                  color: `rgba(${v.r},${v.g},${v.b},${v.a})`,
                });
                stops.sort((a, b) => {
                  return a.offset - b.offset;
                });

                setVal(v);
                setActiveGradualIndex(index);
                props.onChange(propsColor);
              }
            }
          }}
          style={{
            background: `linear-gradient(90deg, ${stops
              .map(d => {
                return `${d.color} ${d.offset * 100}%`;
              })
              .join(',')})`,
          }}
        >
          {stops.map((d, i) => {
            return (
              <a
                className={classNames({
                  [styles.active]: i === activeGradualIndex,
                })}
                onClick={() => {
                  setActiveGradualIndex(i);
                  const v = tinycolor(stops[i].color).toRgb();
                  setVal(v);
                  resetColorByVal(v, i);
                }}
                onMouseDown={i !== 0 && i !== stops.length - 1 ? onDragStart : null}
                key={i}
                style={{ left: d.offset * 100 + '%', background: d.color }}
              ></a>
            );
          })}
        </div>
      )}
      {propsColor.type === 'linear' && (
        <div className={styles.gradualRotate}>
          <h2>角度</h2>
          <Slider
            value={calculateAngle(propsColor.from.x, propsColor.from.y, propsColor.to.x, propsColor.to.y)}
            onChange={v => {
              const [to, from] = calculatePoints(v);
              const color = { ...propsColor } as any;
              color.from.x = from.x;
              color.from.y = from.y;
              color.to.x = to.x;
              color.to.y = to.y;
              props.onChange(color);
            }}
            tipFormatter={null}
            max={360}
            style={{ width: 110 }}
          />
          <InputNumber
            step={1}
            size="small"
            onChange={v => {
              const [to, from] = calculatePoints(v);
              const color = { ...propsColor } as any;
              color.from.x = from.x;
              color.from.y = from.y;
              color.to.x = to.x;
              color.to.y = to.y;
              props.onChange(color);
            }}
            value={calculateAngle(propsColor.from.x, propsColor.from.y, propsColor.to.x, propsColor.to.y)}
            hideButtons={true}
            style={{ width: 68 }}
            suffix="°"
          />
          {/* <a href="#">Clear</a> */}
        </div>
      )}
      <div className={styles.colorbox}>
        <RgbaColorPicker
          color={val}
          onChange={v => {
            setVal(v);
            resetColorByVal(v);
          }}
        />
      </div>
      <div className={styles.tools}>
        <div className={styles.inputs}>
          <Input
            prefix="#"
            suffix={
              <a
                onClick={() => {
                  if (!(window as any).EyeDropper) {
                    Toast.error('浏览器不支持');
                    return;
                  }
                  // 创建取色器
                  const drop = new (window as any).EyeDropper();
                  // 进行取色
                  drop.open().then(res => {
                    // 获取取色结果
                    const color = res.sRGBHex;
                    const v = tinycolor(color).toRgb();
                    setVal(v);
                    resetColorByVal(v);
                  });
                }}
                className={styles.xiGuan}
              >
                <icons.XiGuan size={14} color="#333" />
              </a>
            }
            style={{ width: 85 }}
            key={`${Object.values(val).join('-')}`}
            defaultValue={tinycolor(val).toHex()}
            onBlur={e => {
              const v = tinycolor('#' + e.target.value).toRgb();
              setVal(v);
              resetColorByVal(v);
            }}
          />
          <Input
            style={{ width: 36 }}
            value={val.r}
            onChange={e => {
              val.r = e;
              setVal({ ...val });
              resetColorByVal(val);
            }}
          />
          <Input
            style={{ width: 36 }}
            value={val.g}
            onChange={e => {
              val.g = e;
              setVal({ ...val });
              resetColorByVal(val);
            }}
          />
          <Input
            style={{ width: 36 }}
            value={val.b}
            onChange={e => {
              val.b = e;
              setVal({ ...val });
              resetColorByVal(val);
            }}
          />
          <InputNumber
            hideButtons={true}
            style={{ width: 30 }}
            value={val.a}
            onChange={e => {
              val.a = e;
              setVal({ ...val });
              resetColorByVal(val);
            }}
          />
        </div>
      </div>
      <div className={styles.tips}>
        <span style={{ width: 85 }}>HEX</span>
        <span style={{ width: 36 }}>R</span>
        <span style={{ width: 36 }}>G</span>
        <span style={{ width: 36 }}>B</span>
        <span style={{ width: 30 }}>A</span>
      </div>
    </div>
  );
}
