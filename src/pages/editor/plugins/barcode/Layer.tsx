import React, { useEffect, useMemo } from 'react';
import { Leafer, Box, Image, Rect } from 'leafer-ui';
import { LayerProps } from '@core/types/helper';
import useLayerBaseStyle from '@core/hooks/useLayerBaseStyle';
import { BarcodeLayer } from './types';
import { debounce } from 'lodash';
import JsBarcode from 'jsbarcode';

export default function BarcodeComp(props: LayerProps) {
  const layer = props.layer as BarcodeLayer;
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
    imgUI.x = layer.x;
    imgUI.y = layer.y;

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
    console.log('颜色变化---', layer);
    const canvas = document.createElement('canvas');
    canvas.width = layer.width;
    canvas.height = layer.height;
    JsBarcode(canvas, layer.content || 'null', {
      lineColor: layer.color,
    });
    imgUI.url = canvas.toDataURL('image/png');

    props.store.controlScaleFuns[layer.id] = debounce(() => {
      const canvas = document.createElement('canvas');
      canvas.width = layer.width;
      canvas.height = layer.height;
      JsBarcode(canvas, layer.content || 'null', {
        lineColor: layer.color,
      });
      imgUI.url = canvas.toDataURL('image/png');
    }, 500);
    return () => {
      delete props.store.elementDragUp[layer.id];
    };
  }, [layer.content, layer.color]);

  useEffect(() => {
    return () => {
      imgUI.remove();
      // imgBox.destroy();
    };
  }, []);

  return null;
}
