import { IRect } from '@leafer-ui/interface';
import { Box, Group } from 'leafer-ui';
import { BaseLayer, BasePage, ENV } from './data';
import Store from '../stores/Store';

export interface InjectParams {
  parent?: IRect;
  data?: any;
}

export interface PageSizeType {
  id: string;
  name: string;
  width: number;
  height: number;
  unit: 'px' | 'mm' | 'cm';
  icon: JSX.Element;
}

/**
 * 传入每个Layer的参数
 */
export interface LayerProps {
  hide: boolean; // 编辑器用到的，优先级会比 visible更高
  lock: boolean;
  zIndex: number;
  isChild?: boolean; // 如果是true，表示元素已经分组
  layer: BaseLayer;
  dirty: string; // 用于更新组件
  parent?: Group;
  store: Store;
  env: ENV;
}

/**
 * 历史记录
 */
export type RecordType = 'delete' | 'create' | 'update' | 'global';

export type RecordMap = {
  elements_delete: BaseLayer[];
  elements_create: BaseLayer[];
  elements_update: BaseLayer[];
  global: BasePage;
};

export interface RecordItem<T> {
  desc: string; // 描述信息
  type: T;
  selecteds?: string[]; // 当前选中的元素
  data?: T extends keyof RecordMap ? RecordMap[T] : never; // 历史数据可以存放任何数据
  mdata?: BasePage;
}

export interface RecordManager {
  add: (item: RecordItem<RecordType>) => void;
  debounceAdd: (item: RecordItem<RecordType>) => void;
  redo: () => void;
  undo: () => void;
  manager: any;
}
