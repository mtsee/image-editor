import styles from './styles.module.less';
import { editor } from '@stores/editor';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import {
  GroupAlign,
  Align,
  Opacity,
  Rotation,
  Size,
  Position,
  Filter,
  AiImg,
  FlipXY,
  Shadow,
  Blur,
  Radius,
  Border,
} from '../components';
import { observer } from 'mobx-react';

export interface IProps {
  element: any;
}
function GroupLayerOptions(props: IProps) {
  return (
    <Tabs
      className="optionTabs"
      activeKey={editor.elementOptionType}
      onChange={e => {
        editor.elementOptionType = e as any;
      }}
    >
      <TabPane tab="元素设置" itemKey="basic">
        <div className={'scroll scrollBox'}>
          <FlipXY />
          <Opacity />
          {/* <Blur /> */}
          <Position />
          <Size />
          <Rotation />
        </div>
      </TabPane>
      <TabPane tab="混合模式" itemKey="animation">
        <Filter />
      </TabPane>
    </Tabs>
  );
}

export default observer(GroupLayerOptions);
