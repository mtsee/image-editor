import { IBlendMode, IShadowEffect } from '@leafer-ui/interface';
import { util } from '@utils/index';
import { ImageLayer } from '../types/data';

export class ImageData implements ImageLayer {
  type: 'image' = 'image';
  width: number = 100;
  height: number = 100;
  flipx: boolean = false;
  flipy: boolean = false;
  cropSize?: { x: number; y: number; width: number; height: number } = null;
  url: string = '';
  cornerRadius: [number, number, number, number] = [0, 0, 0, 0];
  id: string = util.createID();
  name: string = '图片元素';
  desc: string = '描述信息';
  x: number = 0;
  y: number = 0;
  blur: number = 0;
  border: { stroke: string; dashPattern?: number[]; dashOffset?: number; strokeWidth: number; visible: boolean } = {
    stroke: 'rgba(0,0,0,1)',
    strokeWidth: 2,
    visible: false,
  };
  blendMode: IBlendMode = 'normal';
  opacity: number = 1;
  rotation: number = 0;
  shadow: IShadowEffect = { x: 0, y: 0, blur: 0, color: 'rgba(0,0,0,0.0)' };
  _dirty: string = '1';
  _lock: boolean = false;
  _hide: boolean = false;
  naturalHeight: number;
  naturalWidth: number;
  _unKeepRatio?: boolean;
  _ratio?: number;
  extend?: any;

  constructor(params: Partial<ImageLayer> = {}) {
    Object.assign(this, params);
  }
}
