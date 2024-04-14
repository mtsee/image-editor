import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import { Align, Opacity, Rotation, Size, Position, Filter, FlipXY, Shadow, Blur, Radius, Border } from '@options/index';
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import QrOption from './QrOption';

export interface IProps {
  element: any;
}

function Options(props: IProps) {
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
          <QrOption />
          <Opacity />
          <Shadow />
          <Border />
          <Radius />
          <Position />
          <Size />
          <Rotation />
        </div>
      </TabPane>
      <TabPane tab="混合模式" itemKey="colour">
        <Filter />
      </TabPane>
    </Tabs>
  );
}

export default observer(Options);
