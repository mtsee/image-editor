import React from 'react';
import Store from '../stores/Store';
import { BaseLayer, LayerType, GroupLayer, TextLayer, ImageLayer } from '../types/data';
import type { InjectParams } from '../types/helper';
import * as util from './utils';

/**
 * 子组件注入数据
 * @param children
 * @param params
 * @returns
 */
export function childrenInjectProps(params?: InjectParams, children?: JSX.Element | JSX.Element[]) {
  if (children instanceof Array) {
    return children.map(child => {
      return React.Children.toArray(child).map((element: any) => React.cloneElement(element, { ...params }));
    });
  } else {
    return React.Children.toArray(children).map((element: any) => React.cloneElement(element, { ...params }));
  }
}

export function bindSelf(_target: any, _key: any, descriptor: any) {
  const originalMethod = descriptor.value;
  descriptor.value = function (...args: any) {
    return originalMethod.apply(this, args);
  };
  return descriptor;
}

export function syncControlToElement(elementId: string, store: Store) {}

/**
 * 创建元素
 */
export function createLayer<T extends LayerType>(type: T): BaseLayer {
  const base = {
    type: type,
    id: util.createID(),
    name: '未命名',
    desc: '',
    x: 0,
    y: 0,
    blur: 0,
    border: {
      stroke: '',
      strokeWidth: 0,
      visible: false,
    },
    blendMode: 'normal',
    opacity: 1,
    rotation: 0,
    shadow: undefined,
    _dirty: '',
    _lock: false,
    _hide: false,
  };
  switch (type) {
    case 'group':
      return {
        ...base,
        name: '组合元素',
        childs: [],
      } as GroupLayer;
    case 'text':
      return {
        ...base,
        name: '文字元素',
        fontFamilyURL: '', // 字体路径
        text: '请输入文字', // 内容
        fill: '', // 文字容器的颜色
        textStyle: {
          fontSize: 24,
          fill: '#000',
        }, // 文字样式
      } as TextLayer;
    case 'image':
      return {
        ...base,
        name: '图片元素',
        width: 0,
        height: 0,
        naturalWidth: 0,
        naturalHeight: 0,
        // 镜像翻转，上下，左右
        flipx: false,
        flipy: false,
        cropSize: null, // 裁剪
        url: '', // 图片链接
        cornerRadius: [0, 0, 0, 0], // 圆角
      } as ImageLayer;
    default:
      console.error('未知类型');
      return null;
  }
}
