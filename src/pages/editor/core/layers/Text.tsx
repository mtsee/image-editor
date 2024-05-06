import React, { useEffect, useMemo, useReducer } from 'react';
import { Leafer, Box, Ellipse } from 'leafer-ui';
import { LayerProps } from '../types/helper';
import { TextLayer } from '../types/data';
import useLayerBaseStyle from '../hooks/useLayerBaseStyle';
import { IText, IUnitData } from '@leafer-ui/interface';
import { loadFont } from '../tools/utils';
import { utils } from '../tools';
// import { util } from '@utils/index';

export default function TextComp(props: LayerProps) {
  // const [, forceUpdate] = useReducer(x => x + 1, 0);
  const layer = props.layer as TextLayer;

  const textBox = useMemo(() => {
    if (layer.textStyle.fontFamily === '思源黑体' || layer.textStyle.fontFamily === 'Default') {
      layer.textStyle.fontFamily = 'Arial, sans-serif';
    }

    const box = new Box({
      editable: props.isChild ? false : true,
      x: layer.x,
      y: layer.y,
      width: 0,
      height: 0,
      rotation: layer.rotation,
      opacity: layer.opacity,
      fill: layer.fill || 'rgba(0,0,0,0.0)',
      shadow: { ...layer.shadow },
      // overflow: 'hide',
      stroke: layer.border.stroke,
      strokeWidth: layer.border.visible ? layer.border.strokeWidth : 0,
      children: [
        {
          tag: 'Text',
          text: layer.text,
          strokeCap: 'square',
          // padding: [10, 20],
          textAlign: 'center',
          strokeJoin: 'round',
          verticalAlign: 'top',
          ...layer.textStyle,
          fontFamily: '',
        },
      ],
    });
    box.id = layer.id;
    box.zIndex = props.zIndex;
    props.parent!.add(box as any);
    return box;
  }, []);

  const resizeText = () => {
    const textElem = textBox.children[0] as IText;
    switch (textElem.textAlign) {
      case 'center':
        textElem.x = textElem.getBounds('box', 'local').width / 2;
        break;
      case 'left':
        textElem.x = 0;
        break;
      case 'right':
        textElem.x = textElem.getBounds('box', 'local').width;
        break;
    }
    textElem.height = undefined;
    textElem.width = undefined;
  };

  useEffect(() => {
    const textElem = textBox.children[0] as IText;
    textBox.fill = layer.fill;
    textElem.text = layer.text;
    Object.assign(
      textElem,
      {
        // 默认值
        fontWeight: 'normal',
        italic: false,
        textDecoration: 'none',
        textAlign: 'left',
        fill: '#000000',
      },
      layer.textStyle,
    );
    resizeText();
  }, [layer.fill, layer.text, layer.textStyle, layer._dirty]);

  // 修改字体
  useEffect(() => {
    // 加载字体
    if (layer.fontFamilyURL) {
      console.log('字体加载中');
      const textElem = textBox.children[0] as IText;
      textElem.fontFamily = 'Arial, sans-serif';
      loadFont(layer.textStyle.fontFamily, layer.fontFamilyURL).then(() => {
        // console.log('加载成功');
        textElem.fontFamily = layer.textStyle.fontFamily;
        resizeText();
      });
    }

    // textElem.width = undefined;
  }, [layer.fontFamilyURL, layer.textStyle.fontFamily]);

  // 公共use
  useLayerBaseStyle(layer, textBox as any, props.store, props.zIndex);

  useEffect(() => {
    if (!layer.textStyle.letterSpacing) {
      layer.textStyle.letterSpacing = { value: 0, type: 'percent' };
      const textElem = textBox.children[0] as IText;
      textElem.letterSpacing = { value: 0, type: 'percent' };
    }
    if (!layer.textStyle.lineHeight) {
      layer.textStyle.lineHeight = { value: 150, type: 'percent' };
      const textElem = textBox.children[0] as IText;
      textElem.lineHeight = { value: 150, type: 'percent' };
    }
    let tempData = {
      width: layer.textStyle.width,
      fontSize: layer.textStyle.fontSize,
      strokeWidth: layer.textStyle.strokeWidth as number,
    };

    props.store.controlSelectFuns[layer.id] = () => {
      const textElem = textBox.children[0] as IText;
      tempData.width = textElem.width;
      tempData.fontSize = textElem.fontSize;
      tempData.strokeWidth = textElem.strokeWidth as number;
    };

    props.store.elementDragUp[layer.id] = () => {
      // 修改json数据
      const textElem = textBox.children[0] as IText;
      layer.textStyle.fontSize = textElem.fontSize;
      layer.textStyle.strokeWidth = textElem.strokeWidth;
      resizeText();
    };
    props.store.controlScaleFuns[layer.id] = () => {
      const textElem = textBox.children[0] as IText;
      // 解决对齐后文字定位问题
      textElem.x = 0;
      const fontScale = textElem.width / tempData.width;
      const fontSize = utils.toIntNum(Math.max(tempData.fontSize * fontScale, 1), 2);
      const strokeWidth = utils.toIntNum(Math.max(tempData.strokeWidth * fontScale, 1), 2);
      // 修改样式
      textElem.fontSize = fontSize;
      textElem.strokeWidth = strokeWidth;

      // 修改json数据
      layer.textStyle.fontSize = fontSize;
      layer.textStyle.strokeWidth = strokeWidth;
    };
    return () => {
      delete props.store.controlSelectFuns[layer.id];
      delete props.store.controlScaleFuns[layer.id];
      delete props.store.elementDragUp[layer.id];
      textBox.remove();
      textBox.destroy();
    };
  }, []);

  return null;
}
