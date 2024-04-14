import React, { useEffect, useState, useRef, useMemo, useReducer } from 'react';
import { BaseLayer, BasePage, ENV, ExLayer } from './types/data';
import { App, Box, Leafer, Rect, DragEvent, PointerEvent } from 'leafer-ui';
import FrameComp from './Frame';
import debounce from 'lodash/debounce';
import { addListener, removeListener } from 'resize-detector';
import Store from './stores/Store';
import RecordManager from './Record';
import ImageLayer from './layers/Image';
import TextLayer from './layers/Text';
import GroupLayer from './layers/Group';
import { Ruler } from 'leafer-x-ruler';
import { EditorEvent, EditorMoveEvent, EditorScaleEvent, EditorRotateEvent } from '@leafer-in/editor';
// import { ILeafer } from '@leafer-ui/interface';
import { editor } from '@stores/editor';
import { ScrollBar } from '@leafer-in/scroll';
import { utils } from './tools';
import EditorLine from './leafer-extends/EditorLine';

// console.log('exLayers', exLayers);

export interface IViewProps {
  data: BasePage;
  target: HTMLElement; // canvas放入的DOM容器
  env: ENV;
  resourceHost: string; // 资源文件前缀
  exLayers?: ExLayer[];
  // 初始化成功
  initSuccess?: () => void;
  // 渲染后执行
  callback?: (store: Store) => void;
  // 编辑器事件
  onControlSelect?: (e: EditorEvent, ids: string[]) => void;
  onControlScale?: (e: EditorEvent) => void;
  onControlMove?: (e: EditorEvent) => void;
  onControlRotate?: (e: EditorEvent) => void;
  onDragUp?: (e: EditorEvent) => void;
  onContextMenu?: (e: EditorEvent, layers: BaseLayer[]) => void;
  addRecordCallback?: () => void; // 添加记录的回调
}

export default function View(props: IViewProps) {
  const { target, data, env, resourceHost, exLayers = [] } = props;
  const [loaded, setLoaded] = useState<boolean>(false);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const store = useMemo<Store>(() => {
    const s = new Store();
    s.resourceHost = resourceHost;
    s.data = data;
    s.env = env;
    s.updateView = forceUpdate;
    s.addRecordCallback = props.addRecordCallback;
    return s;
  }, []);

  // const [pos, setPos] = useState({
  //   x: (target.clientWidth - data.width * scale) / 2,
  //   y: (target.clientHeight - data.height * scale) / 2,
  // });

  useEffect(() => {
    const app = new App({
      view: target,
      editor: {
        lockRatio: true,
        // point: { cornerRadius: 0 },
        stroke: '#3f99f7',
        middlePoint: { cornerRadius: 100, width: 20, height: 6 },
        rotatePoint: { width: 16, height: 16 },
      },
      tree: {
        usePartRender: true,
      },
      sky: {
        type: 'draw',
        usePartRender: true,
      },
    });
    // console.log('app', app);
    //@ts-ignore
    store.app = app.tree;
    store.editor = app.editor;
    setLoaded(true);

    if (props.env === 'editor') {
      // 编辑器事件
      app.editor.on(EditorEvent.SELECT, (e: EditorEvent) => {
        console.log('select-->');
        const ids: string[] = [];
        if (e.value) {
          if (e.value instanceof Array) {
            e.value.forEach(v => {
              ids.push(v.id);
            });
          } else {
            ids.push(e.value.id);
          }
        }
        const layers = store.getLayerByIds(ids);
        if (layers.length > 1) {
          app.editor.config.lockRatio = true;
        } else {
          if (layers[0]?.type === 'text' || layers[0]?.type === 'group') {
            app.editor.config.lockRatio = true;
          } else {
            app.editor.config.lockRatio = false;
          }
        }

        ids.forEach(id => {
          const func = store.controlSelectFuns[id];
          if (func) {
            func();
          }
        });

        if (props.onControlSelect) {
          props.onControlSelect(e, ids);
        }
      });

      app.editor.on(EditorRotateEvent.ROTATE, (e: EditorEvent) => {
        // console.log('rotate', e);
        const list = (e as any).current.leafList.list;
        const layers = store.getLayerByIds(list.map(d => d.id));
        // 数据同步
        list.forEach(box => {
          const layer = layers.find(d => d.id === box.id) as BaseLayer;
          if (layer) {
            layer.rotation = box.rotation;
            layer.x = utils.toNum(box.x);
            layer.y = utils.toNum(box.y);
          }
        });
        // forceUpdate();
        if (props.onControlRotate) {
          props.onControlRotate(e);
        }
      });

      app.editor.on(EditorScaleEvent.SCALE, (e: EditorEvent) => {
        // console.log('scale', e);
        const list = (e as any).current.leafList.list;
        const layers = store.getLayerByIds(list.map(d => d.id));

        // 如果是组，还需要计算children的参数
        const setGroupChildrenSize = box => {
          const ids = box.children.map(d => d.id);
          const innerLayers = store.getLayerByIds(ids);
          box.children.forEach(b => {
            const inlayer = innerLayers.find(d => d.id === b.id) as any;
            inlayer.width = b.width;
            inlayer.height = b.height;
            // 如果是文字，还要修改x,y
            if (inlayer.type === 'text') {
              inlayer.x = b.x;
              inlayer.y = b.y;
            }
            if (inlayer.type === 'group') {
              setGroupChildrenSize(b);
            }
          });
        };

        // 数据同步
        list.forEach(box => {
          const layer = layers.find(d => d.id === box.id) as any;
          layer.width = box.width;
          layer.height = box.height;
          if (layer.type === 'text') {
            layer.x = box.x;
            layer.y = box.y;
          }
          const func = store.controlScaleFuns[layer.id];
          if (func) {
            func();
          }
          // 设置组的子元素的尺寸
          if (layer.type === 'group') {
            setGroupChildrenSize(box);
          }
        });
        // forceUpdate();
        if (props.onControlScale) {
          props.onControlScale(e);
        }
      });

      app.editor.on(EditorMoveEvent.MOVE, (e: EditorEvent) => {
        // console.log('move', e);
        const list = (e as any).current.leafList.list;
        const layers = store.getLayerByIds(list.map(d => d.id));
        // 数据同步
        list.forEach(box => {
          const layer = layers.find(d => d.id === box.id);
          if (layer) {
            layer.x = box.x;
            layer.y = box.y;
          }
        });
        if (props.onControlMove) {
          props.onControlMove(e);
        }
      });

      app.editor.on(PointerEvent.MENU, e => {
        const list = (e as any).current.leafList.list;
        const layers = store.getLayerByIds(list.map(d => d.id));
        if (props.onContextMenu) {
          props.onContextMenu(e, layers);
        }
      });

      // 鼠标弹起执行
      app.editor.on(DragEvent.UP, e => {
        const elementIds = utils.getIdsFromUI(store.editor.target);
        console.log('鼠标弹起来????', elementIds);
        if (elementIds.length) {
          elementIds.forEach(id => {
            const fun = store.elementDragUp[id];
            if (fun) fun();
          });
        }
        store.record?.add({
          type: 'update',
          desc: '控制器鼠标弹起',
          selecteds: [...elementIds],
        });
        if (props.onDragUp) {
          props.onDragUp(e);
        }
      });

      new ScrollBar(app as any);
      // new EditorLine(app);

      // 标尺
      const ruler = new Ruler(app as any);
      // 添加自定义主题
      ruler.addTheme('dark2', {
        backgroundColor: '#16161a',
        textColor: 'rgba(255, 255, 255, 0.5)',
        borderColor: '#686868',
        highlightColor: 'rgba(0, 102, 255, 0.5)',
      });
      editor.ruler = ruler;
      if (editor.themeUpdateKey === 'dark') {
        ruler.changeTheme('dark2');
      }
    }

    // 监听容器变化
    const onResize = debounce(() => {
      store.autoViewSize();
    }, 100);
    addListener(target, onResize);

    setTimeout(() => {
      store.autoViewSize();
    }, 100);

    if (props.callback) {
      props.callback(store);
    }
    return () => {
      removeListener(target, onResize);
      // app.destroy();
    };
  }, [target, store]);

  useEffect(() => {
    if (store) {
      store.data = data;
    }
  }, [data]);

  // useEffect(() => {
  //   store.app.x = pos.x;
  //   store.app.y = pos.y;
  // }, [pos.x, pos.y]);

  if (!loaded) {
    return;
  }
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX更新', data.layers, exLayers);

  return (
    <>
      <FrameComp data={{ ...data }} parent={store.app as any}>
        {data.layers.map((layer, i) => {
          switch (layer.type) {
            case 'image':
              return (
                <ImageLayer
                  key={layer.id}
                  hide={layer._hide}
                  lock={layer._lock}
                  dirty={layer._dirty}
                  zIndex={99999 - i}
                  layer={layer}
                  store={store}
                  env={env}
                />
              );
            case 'text':
              return (
                <TextLayer
                  key={layer.id}
                  hide={layer._hide}
                  lock={layer._lock}
                  dirty={layer._dirty}
                  zIndex={99999 - i}
                  layer={layer}
                  store={store}
                  env={env}
                />
              );
            case 'group':
              return (
                <GroupLayer
                  key={layer.id}
                  hide={layer._hide}
                  lock={layer._lock}
                  dirty={layer._dirty}
                  zIndex={99999 - i}
                  layer={layer}
                  store={store}
                  env={env}
                />
              );
            default: {
              const exLayer = exLayers.find(d => d.config.pid === layer.type);
              if (exLayer) {
                const ELayer = exLayer.Layer as any;
                return (
                  <ELayer
                    key={layer.id}
                    hide={layer._hide}
                    lock={layer._lock}
                    dirty={layer._dirty}
                    zIndex={99999 - i}
                    layer={layer}
                    store={store}
                    env={env}
                  />
                );
              }
            }
          }
          return null;
        })}
      </FrameComp>
      {env === 'editor' && <RecordManager store={store} />}
    </>
  );
}
