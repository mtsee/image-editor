import { ViewData, ImageLayer, BasePage, TextLayer } from './core/types/data';

export const tdata: ViewData = {
  name: 'mock数据',
  desc: '暂无描述',
  version: '1.0.0',
  thumb: '',
  selectPageId: 'p1',
  createTime: 0,
  updateTime: 0,
  pages: [
    {
      id: 'p1',
      name: 'p1',
      desc: '',
      width: 1000,
      height: 600,
      background: {
        type: 'solid',
        color: '#fff',
      },
      layers: [
        {
          id: 't1',
          name: 'test',
          desc: '',
          x: 100,
          y: 100,
          opacity: 1,
          rotation: 0,
          flipx: true,
          flipy: false,
          blur: 0,
          type: 'image',
          _dirty: '1', // 用于视图更新
          _lock: false, // 是否锁定
          _hide: false, // 是否隐藏
          width: 200,
          height: 200,
          border: {
            stroke: '#f00', // 边框色
            strokeWidth: 2,
            visible: false,
          },
          shadow: {
            x: 10,
            y: 10,
            blur: 10,
            blendMode: 'normal',
            spread: 0,
            color: 'rgba(0,0,0,0.5)',
            box: false,
            visible: true,
          },
          naturalWidth: 200,
          naturalHeight: 285,
          url: 'https://cdn.h5ds.com/video/uploads/9715/20240207/679367666016878592.png', // 图片链接
          cornerRadius: [200, 200, 200, 200], // 圆角
        } as ImageLayer,
        {
          id: 't2',
          name: 'test1',
          desc: '',
          x: 300,
          y: 300,
          opacity: 1,
          rotation: 0,
          blur: 0,
          type: 'image',
          _dirty: '1', // 用于视图更新
          _lock: false, // 是否锁定
          _hide: false, // 是否隐藏
          width: 200,
          height: 260,
          border: {
            stroke: '#f00', // 边框色
            strokeWidth: 2,
            visible: false,
          },
          shadow: {
            x: 10,
            y: 10,
            blur: 10,
            blendMode: 'normal',
            spread: 0,
            color: 'rgba(0,0,0,0.5)',
            box: false,
            visible: false,
          },
          naturalWidth: 200,
          naturalHeight: 292,
          url: 'https://cdn.h5ds.com/video/uploads/9715/20231202/655268148271611904.png', // 图片链接
          cornerRadius: [30, 30, 30, 30], // 圆角
        } as ImageLayer,
        {
          id: 't3',
          name: 'txt',
          desc: '',
          x: 100,
          y: 100,
          opacity: 1,
          rotation: 0,
          blur: 0,
          type: 'text',
          text: '测试文字，无界云PS',
          fill: null,
          blendMode: 'normal',
          fontFamilyURL: '',
          textStyle: {
            fontSize: 20,
            fill: {
              type: 'linear',
              from: { x: 0, y: 0 },
              to: { x: 1, y: 0 },
              stops: [
                { offset: 0, color: '#FF4B4B' },
                { offset: 1, color: '#FEB027' },
              ],
            },
          },
          _dirty: '1', // 用于视图更新
          _lock: false, // 是否锁定
          _hide: false, // 是否隐藏
          border: {
            stroke: '#f00', // 边框色
            strokeWidth: 2,
            visible: false,
          },
          shadow: {
            x: 10,
            y: 10,
            blur: 10,
            blendMode: 'normal',
            spread: 0,
            color: 'rgba(0,0,0,0.5)',
            box: false,
            visible: false,
          },
        } as TextLayer,
      ],
    } as BasePage,
  ],
};
