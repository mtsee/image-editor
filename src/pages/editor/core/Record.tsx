import UndoRedoManager from 'undo-redo-manager2';
import debounce from 'lodash/debounce';
import { useEffect, useRef } from 'react';
import Store from './stores/Store';
import * as utils from './tools/utils';
import type { RecordItem, RecordType } from './types/helper';
import { pubsub } from '@utils/pubsub';

export interface IProps {
  store: Store;
}

/**
 * 操作记录，redo，undo
 * @param props
 * @returns
 */
function RecordManager(props: IProps) {
  const manager = useRef<any>();
  const store = props.store;

  useEffect(() => {
    manager.current = new UndoRedoManager({
      limit: 30, // 设置最大记录30次，默认是50次
    });

    const add = (item: RecordItem<RecordType>) => {
      console.log('Record数据--------------->', item, utils.toJS(store.data));
      manager.current.add({
        id: utils.createID(),
        type: 'global',
        desc: item.desc,
        selecteds: [...item.selecteds],
        mdata: utils.cloneData(store.data),
      });
      // 更新test
      if (store.addRecordCallback) {
        store.addRecordCallback();
      }
    };

    // 恢复数据
    const restore = (item: RecordItem<RecordType>, type: 'undo' | 'redo'): boolean => {
      console.log('item>>>', item);
      if (!item) {
        console.warn('已经恢复到初始位置');
        return false;
      }
      // 找到对应的数据，然后设置参数
      if (item.mdata) {
        utils.objectCopyValue(item.mdata, store.data);
      }
      // 更新视图
      store.update();
      store.editor.update();
      pubsub.publish('emitSelectElements', [...(item.selecteds || [])]);
      return true;
    };

    // 重做
    const redo = () => {
      const item = manager.current.redo() as RecordItem<RecordType>;
      return restore(item, 'redo');
    };

    // 撤销
    const undo = () => {
      const item = manager.current.undo() as RecordItem<RecordType>;
      return restore(item, 'undo');
    };

    store.record = { add, redo, undo, debounceAdd: debounce(add, 500), manager: manager.current };

    add({ type: 'global', desc: '初始化数据', selecteds: [] });

    return () => {
      manager.current.destroy();
    };
  }, [store.data]);

  return null;
}

export default RecordManager;
