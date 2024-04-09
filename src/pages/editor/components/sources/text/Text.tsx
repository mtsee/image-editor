import Source from '@pages/editor/common/source';
import styles from './text.module.less';
import { addTextItem } from '../addItem';
import { config } from '@config/index';
import { editor } from '@stores/editor';

export interface IProps {
  show: boolean;
}

export default function Text(props: IProps) {
  if (!props.show) {
    return null;
  }

  return (
    <Source
      type="text"
      item={d => {
        return <img src={editor.store.setURL(d.urls?.thumb)} />;
      }}
      itemClassName={styles.textItem}
      addItem={addTextItem}
    />
  );
}
