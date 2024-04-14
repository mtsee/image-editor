import React, { useEffect, useMemo } from 'react';
import { Leafer, Box, Image, Rect } from 'leafer-ui';
import { LayerProps } from '@core/types/helper';
import useLayerBaseStyle from '@core/hooks/useLayerBaseStyle';
import { QrcodeLayer } from './types';
import QRCode from 'qrcode';
import { debounce } from 'lodash';

export default function QrcodeComp(props: LayerProps) {
  const layer = props.layer as QrcodeLayer;
  const imgUI = useMemo<Image>(() => {
    const img = new Image({
      editable: props.isChild ? false : true,
      url: '',
      // around: 'center',
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      rotation: layer.rotation,
      opacity: layer.opacity,
      cornerRadius: [...layer.cornerRadius],
      shadow: { ...layer.shadow },
      stroke: layer.border.stroke,
      dashPattern: layer.border.dashPattern,
      dashOffset: layer.border.dashOffset,
      strokeWidth: layer.border.visible ? layer.border.strokeWidth : 0,
    });
    props.parent!.add(img as any);
    img.id = layer.id;
    img.zIndex = props.zIndex;
    return img;
  }, []);

  // 公共use
  useLayerBaseStyle(layer, imgUI as any, props.store, props.zIndex);

  useEffect(() => {
    imgUI.width = layer.width;
    imgUI.height = layer.height;

    // 翻转
    if (layer.flipx) {
      imgUI.scaleX = -1;
    } else {
      imgUI.scaleX = 1;
    }
    if (layer.flipy) {
      imgUI.scaleY = -1;
    } else {
      imgUI.scaleY = 1;
    }

    //圆角
    imgUI.cornerRadius = layer.cornerRadius ? [...layer.cornerRadius] : undefined;
  }, [layer.width, layer.height, layer.flipx, layer.flipy, layer.cornerRadius]);

  useEffect(() => {
    const options = {
      width: layer.width,
      margin: 1,
      color: {
        light: layer.lightcolor,
        dark: layer.darkcolor,
      },
    };

    // 创建二维码
    QRCode.toDataURL(layer.content || 'null', { ...options }).then(url => (imgUI.url = url));

    // 控制器变化的时候会触发此函数
    props.store.controlScaleFuns[layer.id] = debounce(() => {
      QRCode.toDataURL(layer.content || 'null', { ...options }).then(url => (imgUI.url = url));
    }, 500);
    return () => {
      // 组件销毁的时候要删除函数的引用
      delete props.store.elementDragUp[layer.id];
    };
  }, [layer.content, layer.lightcolor, layer.darkcolor]);

  useEffect(() => {
    return () => {
      imgUI.remove();
      // imgBox.destroy();
    };
  }, []);

  return null;
}
