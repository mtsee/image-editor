import { IBlendMode, IShadowEffect } from '@leafer-ui/interface';
import { util } from '@utils/index';
import { BarcodeLayer } from './types';

export default class QrcodeData implements BarcodeLayer {
  type: 'barcode' = 'barcode';
  width: number = 600;
  height: number = 300;
  cornerRadius: [number, number, number, number] = [0, 0, 0, 0];
  flipx: boolean = false;
  flipy: boolean = false;
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
  content: string = '1234567890';
  color: string = '#000000';
  _dirty: string = '1';
  _lock: boolean = false;
  _hide: boolean = false;
  _unKeepRatio?: boolean;
  _ratio?: number;
  extend?: any;

  constructor(params: Partial<BarcodeLayer> = {}) {
    Object.assign(this, params);
  }
}
