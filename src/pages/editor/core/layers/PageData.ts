import { IPaint } from '@leafer-ui/interface';
import { utils } from '../tools';
import type { BaseLayer, BasePage } from '../types/data';

export class PageData implements BasePage {
  id: string = utils.createID();
  name: string = '未命名';
  desc: string = '页面描述';
  width: number = 1242;
  height: number = 2208;
  thumb: string = '';
  background: IPaint = {
    type: 'solid',
    color: '#ffffff',
  };
  layers: BaseLayer[] = [];

  constructor(params: Partial<BasePage> = {}) {
    Object.assign(this, params);
  }
}
