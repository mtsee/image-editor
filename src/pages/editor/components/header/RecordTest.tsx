import { observer } from 'mobx-react';
import styles from './recordTest.module.less';
import { editor } from '@stores/index';

export interface IProps {}

function RecordTest(props: IProps) {
  editor.recordUpdateTestKey;

  const record = editor.store?.record;

  if (!record) {
    return null;
  }

  return (
    <div className={styles.recordTest} style={{ margin: '20px 0' }}>
      {record.manager.stacks.map((stack: any) => {
        return (
          <section className={stack.id === record.manager.current.id ? styles.active : ''} key={stack.id}>
            【{stack.id}】{stack.desc}
          </section>
        );
      })}
    </div>
  );
}

export default observer(RecordTest);
