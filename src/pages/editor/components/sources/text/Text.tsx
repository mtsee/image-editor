import Source from '@pages/editor/common/source';
import styles from './text.module.less';
import { addTextItem } from '../addItem';
import { config } from '@config/index';

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
        return <img src={config.resourcesHost + d.urls?.thumb} />;
      }}
      itemClassName={styles.textItem}
      addItem={addTextItem}
    />
  );
}
