import React, { useEffect, useMemo } from 'react';
import { Leafer, Box, Image, Rect } from 'leafer-ui';
import { LayerProps } from '../types/helper';
import { ImageLayer } from '../types/data';
import useLayerBaseStyle from '../hooks/useLayerBaseStyle';
import type { IImagePaint } from '@leafer-ui/interface';

export default function ImageComp(props: LayerProps) {
  const layer = props.layer as ImageLayer;
  const [imgBox, imgUI] = useMemo<[Box, Image]>(() => {
    const box = new Box({
      editable: props.isChild ? false : true,
      x: layer.x,
      y: layer.y,
      width: layer.width,
      height: layer.height,
      rotation: layer.rotation,
      opacity: layer.opacity,
      fill: 'rgba(0,0,0,0.0)',
      // overflow: 'hide',
    });
    box.id = layer.id;
    box.zIndex = props.zIndex;
    const img = new Image({
      // url: layer.url,
      fill: {
        type: 'image',
        mode: 'clip',
        url: props.store.setURL(layer.url),
        // scale: { x: 1, y: 1 },
      },
      around: 'center',
      x: layer.width / 2,
      y: layer.height / 2,
      width: layer.width,
      height: layer.height,
      cornerRadius: [...layer.cornerRadius],
      shadow: { ...layer.shadow },
      stroke: layer.border.stroke,
      dashPattern: layer.border.dashPattern,
      dashOffset: layer.border.dashOffset,
      strokeWidth: layer.border.visible ? layer.border.strokeWidth : 0,
    });
    box.add(img as any);
    props.parent!.add(box as any);
    return [box, img];
  }, []);

  // 公共use
  useLayerBaseStyle(layer, imgBox as any, props.store, props.zIndex);

  useEffect(() => {
    const fill = imgUI.fill as IImagePaint;
    const url = props.store.setURL(layer.url);
    if (url !== fill.url) {
      fill.url = url;
    }

    const { x, y, width, height } = layer.cropSize || {
      x: 0,
      y: 0,
      width: layer.naturalWidth,
      height: layer.naturalHeight,
    };
    const scaleX = layer.width / width;
    const scaleY = layer.height / height;
    (imgUI.fill as IImagePaint) = {
      url: url,
      type: 'image',
      mode: 'clip',
      scale: { x: scaleX, y: scaleY },
      offset: { x: -x * scaleX, y: -y * scaleX },
    };
    imgUI.width = layer.width;
    imgUI.height = layer.height;
    imgUI.x = layer.width / 2;
    imgUI.y = layer.height / 2;

    // 设置宽高
    imgBox.width = layer.width;
    imgBox.height = layer.height;

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
  }, [layer.width, layer.height, layer.flipx, layer.flipy, layer.cornerRadius, layer.url, layer.cropSize]);

  useEffect(() => {
    props.store.controlScaleFuns[layer.id] = () => {
      imgUI.width = layer.width;
      imgUI.height = layer.height;
      imgUI.x = layer.width / 2;
      imgUI.y = layer.height / 2;

      // 裁剪
      const { x, y, width, height } = layer.cropSize || {
        x: 0,
        y: 0,
        width: layer.naturalWidth,
        height: layer.naturalHeight,
      };
      const scaleX = layer.width / width;
      const scaleY = layer.height / height;
      (imgUI.fill as IImagePaint) = {
        url: props.store.setURL(layer.url),
        type: 'image',
        mode: 'clip',
        scale: { x: scaleX, y: scaleY },
        offset: { x: -x * scaleX, y: -y * scaleY },
      };
    };
    return () => {
      delete props.store.controlScaleFuns[layer.id];
      imgBox.remove();
      // imgBox.destroy();
    };
  }, []);

  return null;
}
