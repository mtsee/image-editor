import Source from '@pages/editor/common/source';
import styles from './styles.module.less';
import { addImageItem } from '../addItem';
import { config } from '@config/index';
import { editor } from '@stores/editor';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import BackgroundColor from './BackgroundColor';
import BackgroundImage from './BackgroundImage';

export interface IProps {
  show: boolean;
}

// 判断是否加载了，只加载一次
let hasRender = false;

export default function Background(props: IProps) {
  if (!hasRender) {
    if (props.show) {
      hasRender = true;
    } else {
      return null;
    }
  }

  return (
    <div style={{ height: '100%', display: props.show ? 'block' : 'none' }}>
      <Tabs className={styles.tabs} type="line">
        <TabPane tab="背景色" itemKey="projects">
          <BackgroundColor />
        </TabPane>
        <TabPane tab="背景图" itemKey="pages">
          <BackgroundImage />
        </TabPane>
      </Tabs>
    </div>
  );
}
