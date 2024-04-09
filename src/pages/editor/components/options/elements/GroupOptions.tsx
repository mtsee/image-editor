import styles from './styles.module.less';
import { editor } from '@stores/editor';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import { Group, FlipXY, Opacity } from '../components';

export interface IProps {}

export default function GroupOptions(props: IProps) {
  return (
    <Tabs
      className="optionTabs"
      activeKey={editor.elementOptionType}
      onChange={e => {
        editor.elementOptionType = e as any;
      }}
    >
      <TabPane tab="组合" itemKey="basic">
        <Group />
      </TabPane>
    </Tabs>
  );
}
