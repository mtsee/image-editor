import styles from './canvas.module.less';

import { useEffect, useState, useReducer } from 'react';
import { editor } from '@stores/editor';
// import { useResizeDetector } from 'react-resize-detector';
import { observer } from 'mobx-react';
// import $ from 'jquery';
// import { pubsub } from '@utils/pubsub';
import { View } from '../../core';
import { pubsub } from '@utils/pubsub';
import SetCanvasSize from './SetCanvasSize';
import ContextMenu from '../contextMenu';
import { config } from '@config/index';
export interface IProps {}

function Canvas(props: IProps) {
  const [target, setTarget] = useState<any>();
  useEffect(() => {
    setTarget(document.getElementById('h5dsCanvas'));
    pubsub.subscribe('emitSelectElements', (e, ids) => {
      editor.setContorlAndSelectedElemenent([...ids]);
    });

    return () => {
      pubsub.unsubscribe('emitSelectElements');
    };
  }, []);

  console.log('重新获取page');
  editor.updateViewKey;

  return (
    <div className={styles.canvas} id="h5dsCanvasOuter">
      <div className={styles.canvasInner} id="h5dsCanvas">
        {target && (
          <View
            resourceHost={config.resourcesHost}
            callback={store => {
              editor.store = store;
              editor.movieCreateSuccess = true;
            }}
            env="editor"
            data={editor.pageData}
            target={target}
            onContextMenu={(e, layers) => {
              editor.showContextMenu(e.origin, {
                layers,
              });
            }}
            onDragUp={() => {
              editor.updateOption();
            }}
            onControlSelect={(e: any, ids) => {
              // console.log('select--------------------------------------------->', ids);
              // console.log('dddd', ids);
              editor.setSelectedElementIds(ids);
            }}
            addRecordCallback={() => {
              editor.recordUpdateTestKey = +new Date();
            }}
          />
        )}
      </div>
      <SetCanvasSize />
      <ContextMenu />
    </div>
  );
}

export default observer(Canvas);
