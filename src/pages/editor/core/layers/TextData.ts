import { IBlendMode, IShadowEffect, IText } from '@leafer-ui/interface';
import { util } from '@utils/index';
import { TextLayer } from '../types/data';

export class TextData implements TextLayer {
  type: 'text' = 'text';
  fontFamilyURL: string = '';
  text: string = '默认文字';
  fill: string = '';
  textStyle: Partial<IText> = { fontSize: 24 };
  id: string = util.createID();
  name: string = '文字元素';
  desc: string = '描述';
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
  shadow: IShadowEffect = { x: 0, y: 0, blur: 0, color: 'rgba(0,0,0,0.5)' };
  _dirty: string = '1';
  _lock: boolean = false;
  _hide: boolean = false;

  constructor(params: Partial<TextLayer> = {}) {
    Object.assign(this, params);
  }
}
