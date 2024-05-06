import React, { useEffect, useMemo, useRef } from 'react';
import { Leafer, Box, Image, Rect } from 'leafer-ui';
import { LayerProps } from '../types/helper';
import { ImageLayer } from '../types/data';
import useLayerBaseStyle from '../hooks/useLayerBaseStyle';
import type { IImagePaint } from '@leafer-ui/interface';
import { getFileExtension } from '../tools/utils';
import { utils } from '../tools';

export default function ImageComp(props: LayerProps) {
  const layer = props.layer as ImageLayer;
  const svgstr = useRef('');
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
      hoverStyle: {
        stroke: '#000',
      },
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

  const replaceColor = (txt: string) => {
    if (!layer.svgColorType) {
      layer.svgColorType = 'more';
    }
    console.log('layer.svgColorType', layer.svgColorType, layer.svgColors);
    // 替换颜色
    if (layer.svgColorType === 'one') {
      if (layer.svgColors && layer.svgColors[0]) {
        txt = utils.replaceSveColor(txt, layer.svgColors[0] || '#000000');
      }
    } else {
      if (layer.svgColors && layer.svgColors.length) {
        txt = utils.replaceSveColor(txt, layer.svgColors);
      }
    }
    return 'data:image/svg+xml,' + encodeURIComponent(txt);
  };

  // 如果是svg，需要解析数据结构
  const svgHTML = async (url: string) => {
    const ext = getFileExtension(url);
    if (svgstr.current) {
      return replaceColor(svgstr.current);
    }
    if (ext === 'svg') {
      return await fetch(url)
        .then(async response => {
          if (response.ok) {
            const txt = await response.text();
            svgstr.current = txt;
            console.log('首次加载svg', txt);
            return replaceColor(txt);
          }
          throw new Error('Network response was not ok.');
        })
        .catch(error => {
          console.error('There has been a problem with your fetch operation:', error);
        });
    } else {
      return url;
    }
  };

  useEffect(() => {
    const url = props.store.setURL(layer.url);
    svgHTML(url).then(u => {
      (imgUI.fill as IImagePaint) = {
        url: u || '',
        type: 'image',
        mode: 'clip',
        scale: { x: scaleX, y: scaleY },
        offset: { x: -x * scaleX, y: -y * scaleX },
      };
    });

    const { x, y, width, height } = layer.cropSize || {
      x: 0,
      y: 0,
      width: layer.naturalWidth,
      height: layer.naturalHeight,
    };
    const scaleX = layer.width / width;
    const scaleY = layer.height / height;

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
  }, [
    layer.width,
    layer.height,
    layer.flipx,
    layer.flipy,
    layer.cornerRadius,
    layer.url,
    layer.cropSize,
    layer.svgColorType,
    layer.svgColors,
  ]);

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
      svgHTML(props.store.setURL(layer.url)).then(u => {
        (imgUI.fill as IImagePaint) = {
          url: u || '',
          type: 'image',
          mode: 'clip',
          scale: { x: scaleX, y: scaleY },
          offset: { x: -x * scaleX, y: -y * scaleX },
        };
      });
    };
    return () => {
      delete props.store.controlScaleFuns[layer.id];
      imgBox.remove();
      // imgBox.destroy();
    };
  }, []);

  return null;
}
