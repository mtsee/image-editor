import { IEditorBase, IExportOptions, ILeafer, IUI } from '@leafer-ui/interface';
import type { BaseLayer, BasePage, GroupLayer, ENV } from '../types/data';
import type { RecordManager, RecordItem, RecordType } from '../types/helper';
import { bindSelf } from '../tools/helper';
import remove from 'lodash/remove';
import * as utils from '../tools/utils';
import * as helper from '../tools/helper';
import { Ruler } from 'leafer-x-ruler';

interface RecordParams {
  add: (item: RecordItem<RecordType>) => void;
  debounceAdd: (item: RecordItem<RecordType>) => void;
  redo: () => boolean;
  undo: () => boolean;
  manager: any;
}

/**
 * 封装的内核自带了一些方法，以及缓存了数据
 */
export default class Store {
  // 页面数据
  public data!: BasePage;
  // 历史记录
  public record?: RecordParams;
  public ruler: Ruler;
  // 实例
  public app!: ILeafer;
  // 控制器实例
  public editor!: IEditorBase;
  // 运行环境
  public env: ENV = 'editor';
  // 更新View组件
  public updateView: () => void = null;
  // 控制器缩放触发每个元素内部的函数
  public controlScaleFuns: Record<string, () => void> = {};
  // 拖动鼠标弹起执行
  public elementDragUp: Record<string, () => void> = {};
  // 控制器选中元素触发每个元素内部的函数
  public controlSelectFuns: Record<string, () => void> = {};

  // 资源host
  public resourceHost: string = '';

  @bindSelf
  public setURL(url: string): string {
    return utils.setURL(url, this.resourceHost);
  }

  public helper = helper;
  public utils = utils;
  // 历史记录添加的回调函数
  public addRecordCallback: () => void;

  @bindSelf
  public getLayerUIByIds(ids: string[]): IUI[] {
    const arr = [];
    ids.forEach(d => {
      const layer = this.app.findOne('#' + d);
      if (layer) {
        arr.push(layer);
      }
    });
    return arr;
  }

  /**
   * 通过IDS获取图层数据
   * @param ids
   * @returns
   */
  @bindSelf
  public getLayerByIds(ids: string[]): BaseLayer[] {
    const arr = [];
    const findLayers = layers => {
      layers.forEach(layer => {
        if (ids.includes(layer.id)) {
          arr.push(layer);
        }
        if (layer.childs) {
          findLayers(layer.childs);
        }
      });
    };
    findLayers(this.data.layers);
    return arr;
  }

  /**
   * 删除多个元素
   * @param ids
   */
  @bindSelf
  public deleteLayers(ids: string[]) {
    // const findLayers = layers => {
    //   layers.forEach(layer => {
    //     if (ids.includes(layer.id)) {
    //       arr.push(layer);
    //       remove(layers, (d: any) => d.id === layer.id);
    //     }
    //     if (!ids.includes(layer.id) && layer.childs) {
    //       findLayers(layer.childs);
    //     }
    //   });
    // };
    // findLayers(this.data.layers);
    remove(this.data.layers, d => ids.includes(d.id));
  }

  /**
   * 将多个元素合成组数据
   */
  @bindSelf
  public groupData(ids: string[]): GroupLayer {
    const layers = this.getLayerByIds(ids);
    const g = helper.createLayer('group') as GroupLayer;
    g.childs = [...layers];

    // 删除多余元素
    const removeLayers = layers => {
      remove(layers, (e: any) => ids.includes(e.id));
      layers.forEach(layer => {
        if (layer.childs) {
          removeLayers(layer.childs);
        }
      });
    };
    removeLayers(this.data.layers);

    // layer
    // // 视图合并
    const group = this.editor.group();

    // 合并后，layer的xy变化了，修改layerData的x,y
    group.children.forEach(d => {
      const layerData = g.childs.find(a => a.id === d.id);
      if (layerData) {
        layerData.x = d.x;
        layerData.y = d.y;
        layerData.rotation = d.rotation;
      }
    });
    // 修改组数据
    g.x = group.x;
    g.y = group.y;
    g.rotation = group.rotation;
    this.data.layers.unshift(g);

    // 更新视图
    this.updateView();
    return g;
  }

  /**
   * 把组打散
   */
  @bindSelf
  public unGroupData(id: string): string[] {
    const [element] = this.getLayerByIds([id]);
    if (element.type === 'group') {
      const group2more = (layers: BaseLayer[]) => {
        const index = layers.findIndex(d => d.id === id);
        // 解除编组后，需要单独修改子元素的坐标
        const group = this.editor.ungroup();
        group.forEach(box => {
          const layer = (element as any).childs.find(d => d.id === box.id);
          layer.x = box.x;
          layer.y = box.y;
          layer.rotation = box.rotation;
        });
        layers.splice(index, 0, ...(element as any).childs);
        remove(layers, d => d.id === id);
      };
      // 获取元素的父元素
      const parent = utils.findParentById(this.data.layers as any[], id);
      if (parent) {
        const runUn = layers => {
          if (layers.find(d => d.id === parent.id)) {
            group2more(layers);
            return true;
          } else {
            for (let i = 0; i < layers.length; i++) {
              if (layers[i].childs) {
                runUn(layers[i].childs);
              }
            }
          }
        };
        runUn(this.data.layers);
      } else {
        group2more(this.data.layers);
      }
      console.log('解码成功', this.data.layers);
      this.updateView();
      return (element as any).childs.map(d => d.id);
    } else {
      console.error(`id为${id}的元素不是组元素`);
      return null;
    }
  }

  /**
   * 触发控制器选中
   */
  @bindSelf
  public emitControl(ids: string[]) {
    // 因为updateView是一个非同步方法，可能导致渲染延迟
    if (ids.length === 0) {
      this.editor.target = null;
      return;
    }
    setTimeout(() => {
      const uiArr = this.getLayerUIByIds(ids);
      this.editor.target = uiArr;
    }, 10);
  }

  @bindSelf
  public autoViewSize() {
    const padding = 100;
    const target = this.app.view as HTMLDivElement;
    const scale = Math.min(
      (this.app.width - padding) / this.data.width,
      (this.app.height - padding) / this.data.height,
    );
    this.app.scale = scale;
    this.app.x = (target.clientWidth - padding - this.data.width * scale) / 2 + padding / 2;
    this.app.y = (target.clientHeight - padding - this.data.height * scale) / 2 + padding / 2;
  }

  @bindSelf
  public setViewSize(scale: number) {
    this.app.scale = scale;
    const padding = 0;
    const target = this.app.view as HTMLDivElement;
    this.app.x = (target.clientWidth - padding - this.data.width * scale) / 2 + padding / 2;
    this.app.y = (target.clientHeight - padding - this.data.height * scale) / 2 + padding / 2;
  }

  /**
   * 更新视图
   */
  @bindSelf
  public update() {
    if (this.updateView) {
      this.updateView();
    }
    // this.app.renderer.render();
  }

  /**
   * 手动设置元素的旋转
   * 解决外部触发旋转不是围绕中心点旋转的问题
   * 旋转元素会导致x,y同时发生变化
   */
  @bindSelf
  public triggerRotation(elementData: BaseLayer, rotation: number) {
    const box = this.app.findOne('#' + elementData.id);
    box.rotateOf({ x: box.width / 2, y: box.height / 2 }, rotation - box.rotation);
    elementData.x = box.x;
    elementData.y = box.y;
  }

  /**
   * 截图
   */
  @bindSelf
  public async capture(params?: IExportOptions) {
    console.log('截图', params);
    return await this.app.export('png', params);
  }

  /**
   * 销毁
   */
  @bindSelf
  public destroy() {
    this.controlScaleFuns = {};
    this.data = null;
    // this.app.destroy();
    // this.app = null;
  }
}
