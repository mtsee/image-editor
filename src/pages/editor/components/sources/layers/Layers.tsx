import { observer } from 'mobx-react';
import { useState, useReducer, useEffect } from 'react';
import styles from './layers.module.less';
import { editor } from '@stores/editor';
import classNames from 'classnames';
import remove from 'lodash/remove';
// import { BaseLayer, GroupLayer } from '@pages/editor/core/types/data';
import { Lock, Unlock, DeleteOne, PreviewOpen, Picture, FullScreen, Text } from '@icon-park/react';
import Title from './Title';
import { util } from '@utils/index';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export interface IProps {}
function Layers(props: IProps) {
  const onDragEnd = result => {
    if (!result.destination) return;
    const newItems = Array.from(editor.pageData.layers);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    editor.pageData.layers = newItems;
    editor.store?.update();
    editor.setSelectedElementIds([reorderedItem.id]);
    editor.store.emitControl([reorderedItem.id]);
  };

  const clickItem = (e, item) => {
    // console.log(item, e.ctrlKey);
    if (e.ctrlKey) {
      const ids = [...editor.selectedElementIds];
      if (ids.find(d => d === item.id)) {
        remove(ids, d => d === item.id);
      } else {
        ids.push(item.id);
      }
      editor.setSelectedElementIds(ids);
      editor.store.emitControl(ids);
    } else {
      editor.setSelectedElementIds([item.id]);
      editor.store.emitControl([item.id]);
    }
  };

  editor.updateCanvasKey;
  editor.selectedElementIds;
  // console.log('editor.selectedElementIds', [...editor.selectedElementIds]);

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {provided => (
          <div className={styles.layers + ' scroll'} {...provided.droppableProps} ref={provided.innerRef}>
            {editor.pageData.layers.map((item, index) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {provided => (
                    <div
                      className={classNames(styles.section, {
                        [styles.active]: editor.selectedElementIds.find(d => d === item.id),
                      })}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      key={item.id}
                    >
                      <div className={styles.li} onClick={e => clickItem(e, item)}>
                        {icon(item.type)}
                        <Title layer={item} />
                      </div>
                      {item.type === 'group' && (
                        <ul className={styles.group}>
                          {(item as any).childs.map(d => {
                            return (
                              <li
                                key={d.id}
                                className={classNames({
                                  [styles.activeinner]: editor.selectedElementIds.find(a => a === d.id),
                                })}
                                onClick={e => {
                                  editor.setSelectedElementIds([d.id]);
                                  editor.store.emitControl([d.id]);
                                }}
                              >
                                {icon(d.type)}
                                <span className={styles.name}>{d.name}</span>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

const icon = type => {
  switch (type) {
    case 'image':
      return <Picture theme="outline" size={16} fill="var(--theme-main)" />;
    case 'text':
      return <Text theme="outline" size={16} fill="var(--theme-icon)" />;
    case 'group':
      return <FullScreen theme="outline" size={16} fill="var(--theme-icon)" />;
  }
};

export default observer(Layers);
