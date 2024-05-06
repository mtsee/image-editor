import { action, observable, transaction } from 'mobx';
import { util, storage, pubsub } from '../utils';
import type * as ctypes from '@config/types';
import type { SourceItem } from '@pages/editor/types';
import { theme } from '@theme';
import { language } from '@language/language';
// import { IApp } from '@leafer-ui/interface';
import Store from '../pages/editor/core/stores/Store';
import { Ruler } from 'leafer-x-ruler';
import type { RecordItem, RecordType } from '@pages/editor/core/types/helper';
import { BaseLayer, BasePage, GroupLayer, ViewData } from '@pages/editor/core/types/data';
import remove from 'lodash/remove';
import debounce from 'lodash/debounce';
import { Toast } from '@douyinfe/semi-ui';

// 素材类型
export type MaterialTypes =
  | 'text'
  | 'image'
  | 'audio'
  | 'video'
  | 'sticker'
  | 'effect'
  | 'filter'
  | 'transition'
  | 'font'
  | string;

class Editor {
  public store!: Store;

  public data!: ViewData;

  // 缓存复制的数据
  public copyTempData: any;

  // 图片裁剪开关
  @observable cropper: boolean = false;

  // 最后一次更新的数据
  public lastUpdateAppData: any = '';

  @observable updateViewKey: string = '';

  // 鼠标右键菜单触发显示的函数
  public showContextMenu: (event: any, props: Record<string, any>) => void;

  // 资源切换后，缓存list数据
  public activeItems: Record<ctypes.SourceType, SourceItem[]> = {};
  // 设置缓存数据
  setActiveItems = (items: SourceItem[], type: ctypes.SourceType) => {
    this.activeItems[type] = items;

    // 测试用
    if (!(window as any).activeItems) {
      (window as any).activeItems = {};
    }
    (window as any).activeItems[type] = items;
  };
  // 从缓存数据中读取数据
  getFromActiveItems = (id: string, type: ctypes.SourceType) => {
    const items = this.activeItems[type] || [];
    return items.find(d => d.id === id);
  };

  // 当前选中的page
  @observable selectPageId: string;

  get pageData(): BasePage {
    return this.data.pages.find(d => d.id === this.selectPageId);
  }

  // option面板自定义
  @observable optionPanelCustom: 'background' | '' = '';

  // 记录APPID
  @observable appid: string = '';

  // 主题更新
  @observable themeUpdateKey: 'dark' | 'light' = theme.getTheme();

  // 多语言
  @observable languageUpdateKey: 'zh-CN' | 'en-US' = language.getLanguage();

  // 历史记录测试用
  @observable recordUpdateTestKey: number = 1;

  // movie创建成功
  @observable movieCreateSuccess: boolean = false;

  // 触发设置区域变化
  @observable updateKey: string = '1';

  @observable updateCanvasKey: string = '1';

  @action
  updateOption = () => {
    this.updateKey = util.randomID();
  };

  @action
  updateOptionAsync = debounce(this.updateOption, 100);

  @action
  record = (params?: RecordItem<RecordType>) => {
    if (!params) {
      params = {
        type: 'global',
        desc: '添加操作记录',
        selecteds: [...editor.selectedElementIds],
      };
    }
    if (!params.selecteds) {
      params.selecteds = [...editor.selectedElementIds];
    }
    // 历史记录
    this.store.record.add(params);
    this.recordUpdateTestKey = +new Date();
  };

  // 标尺线
  ruler: Ruler = null;

  @action
  updateCanvas = () => {
    console.log('更新画面');
    this.updateCanvasKey = util.randomID();
    if (this.store) {
      this.store.update();
    }
  };

  @action
  updateCanvasSync = debounce(this.updateCanvas, 100);

  /**
   * 上移一层
   * @param selectedIds
   */
  @action
  upOneElement(selectedIds?: string[]) {
    if (!selectedIds) {
      selectedIds = [...this.selectedElementIds];
    }
    // 找到选中对象的索引
    let selectedIndexes = selectedIds.map(id => this.pageData.layers.findIndex(obj => obj.id === id));
    // 向下移动选中对象
    const array = this.pageData.layers;
    selectedIndexes.forEach(index => {
      if (index > 0) {
        // 交换位置
        [array[index], array[index - 1]] = [array[index - 1], array[index]];
      }
    });
    this.updateCanvas();
    this.store.emitControl(selectedIds);
  }

  /**
   * 下移一层
   * @param selectedIds
   */
  @action
  downOneElement(selectedIds?: string[]) {
    console.log('将选中图层向下移动一层');
    if (!selectedIds) {
      selectedIds = [...this.selectedElementIds];
    }
    // 找到选中对象的索引
    let selectedIndexes = selectedIds.map(id => this.pageData.layers.findIndex(obj => obj.id === id));
    // 向下移动选中对象
    const array = this.pageData.layers;
    selectedIndexes.forEach(index => {
      if (index < array.length - 1) {
        // 交换位置
        [array[index], array[index + 1]] = [array[index + 1], array[index]];
      }
    });
    this.updateCanvas();
    this.store.emitControl(selectedIds);
  }

  /**
   * 置顶
   * @param ids
   */
  @action
  moveTopElement(ids?: string[]) {
    if (!ids) {
      ids = [...this.selectedElementIds];
    }
    const removedObjects = remove(this.pageData.layers, obj => ids.includes(obj.id));
    this.pageData.layers.unshift(...removedObjects);
    this.updateCanvas();
    this.store.emitControl(ids);
  }

  /**
   * 置底
   * @param ids
   */
  @action
  moveBottomElement(ids?: string[]) {
    if (!ids) {
      ids = [...this.selectedElementIds];
    }
    const removedObjects = remove(this.pageData.layers, obj => ids.includes(obj.id));
    this.pageData.layers.push(...removedObjects);
    this.updateCanvas();
    this.store.emitControl(ids);
  }

  /**
   * 复制元素
   * @param ids
   */
  @action
  copyElement(ids?: string[]) {
    if (!ids) {
      ids = [...this.selectedElementIds];
    }
    const elements = this.getElementDataByIds(ids) || [];
    this.copyTempData = util.toJS(elements);
    Toast.success('复制成功，点击 Ctrl + V 进行粘贴');
  }

  /**
   * 剪切元素
   */
  cutElement(ids?: string[]) {
    console.log('剪切元素');
    if (!ids) {
      ids = [...this.selectedElementIds];
    }
    const elements = this.getElementDataByIds(ids) || [];
    this.copyTempData = util.toJS(elements);
    this.store.deleteLayers(ids);
    this.updateCanvas();
    this.store.emitControl([]);
    Toast.success('剪切成功，点击 Ctrl + V 进行粘贴');
  }

  /**
   * 选中的元素
   */
  @observable selectedElementIds: string[] = [];
  @action
  setSelectedElementIds(ids: string[]) {
    if (ids.length) {
      pubsub.publish('showLayoutPanel', { type: 'options', visible: true });
    }
    transaction(() => {
      this.elementOptionType = 'basic';
      this.selectedElementIds = [...ids];
      if (ids.length === 0) {
        this.cropper = false;
      }
    });
  }

  /**
   * 设置控制器
   * @param element
   */
  setContorlAndSelectedElemenent = (ids: string[]) => {
    // updateControl 会触发Movie的 onSelectElements 事件
    transaction(() => {
      this.setSelectedElementIds([...ids]);
      this.optionPanelCustom = '';
    });
    // 设置控制器
    console.log('设置控制器');
    this.store.emitControl([...ids]);
  };

  /**
   * 更新布局的标识
   */
  @observable layoutKeys: Record<ctypes.LayoutName, string> = {
    sources: '1', // 资源面板
    timeline: '1', // 时间轴
    options: '1', // 设置面板
    canvas: '1', //
    header: '1',
  };
  @action
  updateComponent = (...keyName: ctypes.LayoutName[]) => {
    transaction(() => {
      for (let i = 0; i < keyName.length; i++) {
        this.layoutKeys[keyName[i]] = util.randomID();
      }
      this.updateOption();
    });
  };

  /**
   * 资源面板切换
   */
  @observable sourceType: ctypes.SourceType = 'template';
  @action
  setSourceType = (t: ctypes.SourceType) => {
    this.sourceType = t;
    pubsub.publish('showLayoutPanel', { type: 'sources', visible: true });
  };

  /**
   * 设置面板切换
   */
  @observable elementOptionType: ctypes.ElementOptionType = 'basic';
  @action
  setElementOptionType = (t: ctypes.ElementOptionType) => {
    this.elementOptionType = t;
  };

  @action
  getElementDataByIds = (ids: string[]) => {
    if (!this.store) {
      return [];
    }
    const arr = this.store.getLayerByIds(ids);
    return arr;
  };

  /**
   * 获取单个选中的元素数据
   * @returns
   */
  @action
  getElementData = (): BaseLayer => {
    const elements = this.getElementDataByIds([...this.selectedElementIds]) || [];
    //@ts-ignore
    return elements[0] || {};
  };

  /**
   * 获取选中的组的元素数据
   * @returns
   */
  @action
  getGroupElementData = () => {
    const elements = this.getElementDataByIds([...this.selectedElementIds]) || [];
    return elements;
  };

  @action
  cloneElements = (elements?: BaseLayer[]): BaseLayer[] => {
    if (!elements) {
      elements = this.getElementDataByIds([...this.selectedElementIds]) || [];
    }
    const cloneData: BaseLayer[] = util.toJS(elements);
    const changeId = (elems: BaseLayer[]) => {
      elems.forEach(elm => {
        elm.id = util.createID();
        elm._dirty = util.createID();
        if ((elm as GroupLayer).childs) {
          changeId((elm as GroupLayer).childs);
        }
      });
    };
    changeId(cloneData);
    cloneData.forEach(elem => {
      elem.x += 10;
      elem.y += 10;
    });
    return cloneData;
  };

  /**
   * 复制元素
   */
  @action
  copyElementData = () => {
    const elems = this.cloneElements();
    this.pageData.layers.unshift(...elems);
    this.updateCanvas();
    this.setSelectedElementIds(elems.map(d => d.id));
    this.store.emitControl(elems.map(d => d.id));
  };

  @action
  destroy() {
    this.store = null;
    this.copyTempData = null;
  }
}

const editor = new Editor();

export { editor, Editor };
