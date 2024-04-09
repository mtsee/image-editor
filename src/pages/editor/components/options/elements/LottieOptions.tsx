import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import { Align, Opacity, Rotation, Size, Position, Animation, Colour } from '../components';
import { Tabs, TabPane } from '@douyinfe/semi-ui';

export interface IProps {
  element: any;
}

export default function EffectOptions(props: IProps) {
  return (
    <Tabs className="optionTabs" defaultActiveKey={'lottie'}>
      <TabPane tab="基础" itemKey="basic">
        <div className={'scroll scrollBox'}>
          <Align />
          <Position />
          <Size />
          <Opacity />
          <Rotation />
          {/* <BlendMode /> */}
        </div>
      </TabPane>
      <TabPane tab="动画" itemKey="animation">
        <Animation />
      </TabPane>
      <TabPane tab="滤镜" itemKey="colour">
        <Colour />
      </TabPane>
    </Tabs>
  );
}
