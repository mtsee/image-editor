import styles from './canvas.module.less';
import React, { useEffect } from 'react';
import { pubsub } from '@utils/pubsub';
import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import { Select } from '@douyinfe/semi-ui';
export interface IProps {}

function SetCanvasSize(props: IProps) {
  const zoomIn = () => {
    let scale = editor.store.app.scale as number;
    scale -= 0.1;
    if (scale < 0.1) {
      scale = 0.1;
    }
    editor.store.setViewSize(scale);
  };

  const zoomOut = () => {
    let scale = editor.store.app.scale as number;
    scale += 0.1;
    if (scale > 3) {
      scale = 3;
    }
    editor.store.setViewSize(scale);
  };

  useEffect(() => {
    pubsub.subscribe('keyboardSetViewSize', (e, type) => {
      switch (type) {
        case 'zoomIn':
          zoomIn();
          break;
        case 'zoomOut':
          zoomOut();
          break;
        case 'fit':
          editor.store.autoViewSize();
          break;
      }
    });
    return () => {
      pubsub.unsubscribe('keyboardSetViewSize');
    };
  }, []);

  return (
    <div className={styles.setCanvasSize}>
      <a className={styles.btn} onClick={zoomIn}>
        -
      </a>
      <a>
        <Select
          defaultValue={'Auto'}
          style={{ width: 85 }}
          onChange={v => {
            editor.store.setViewSize(v);
          }}
        >
          <Select.Option value={0.1}>10%</Select.Option>
          <Select.Option value={0.25}>25%</Select.Option>
          <Select.Option value={0.5}>50%</Select.Option>
          <Select.Option value={0.75}>75%</Select.Option>
          <Select.Option value={1}>100%</Select.Option>
          <Select.Option value={1.25}>125%</Select.Option>
          <Select.Option value={1.5}>150%</Select.Option>
          <Select.Option value={1.75}>175%</Select.Option>
          <Select.Option value={2}>200%</Select.Option>
        </Select>
      </a>
      <a className={styles.btn} onClick={zoomOut}>
        +
      </a>
      <a
        onClick={() => {
          editor.store.autoViewSize();
        }}
      >
        Fit
      </a>
    </div>
  );
}

export default observer(SetCanvasSize);
