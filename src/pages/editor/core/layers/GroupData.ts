import { IBlendMode, IShadowEffect } from '@leafer-ui/interface';
import { util } from '@utils/index';
import { BaseLayer, GroupLayer } from '../types/data';

export class GroupData implements GroupLayer {
  type: 'group' = 'group';
  childs: BaseLayer[] = [];
  id: string = util.createID();
  name: string = '组元素';
  desc: string = 'desc';
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

  constructor(params: Partial<GroupLayer> = {}) {
    Object.assign(this, params);
  }
}
