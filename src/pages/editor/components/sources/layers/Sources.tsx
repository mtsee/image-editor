import styles from './sources.module.less';
import { Tabs, TabPane, Empty } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import Layers from './Layers';
import Pages from './Pages';
import { editor } from '@stores/editor';
import Projects from './projects/Projects';

export interface IProps {
  show: boolean;
}

function Sources(props: IProps) {
  return (
    <div className={styles.sources} style={{ display: props.show ? 'block' : 'none' }}>
      <Tabs
        className={styles.tabs}
        type="line"
        activeKey={editor.sourceType}
        onChange={activeKey => {
          editor.sourceType = activeKey;
        }}
      >
        <TabPane tab="工程" itemKey="projects">
          {editor.sourceType === 'projects' && <Projects />}
        </TabPane>
        <TabPane tab="多页面" itemKey="pages">
          <Pages />
        </TabPane>
        <TabPane tab="图层列表" itemKey="layers">
          <Layers />
        </TabPane>
      </Tabs>
    </div>
  );
}

export default observer(Sources);
