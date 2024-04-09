import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import {
  Align,
  Opacity,
  Rotation,
  TextContent,
  TextStyle,
  Position,
  Filter,
  Border,
  FlipXY,
  Shadow,
  Radius,
} from '../components';
import { Tabs, TabPane } from '@douyinfe/semi-ui';

export interface IProps {
  element: any;
}

function TextOptions(props: IProps) {
  return (
    <Tabs
      className="optionTabs"
      activeKey={editor.elementOptionType}
      onChange={e => {
        editor.elementOptionType = e as any;
      }}
    >
      <TabPane tab="基础" itemKey="basic">
        <div className="scroll scrollBox">
          {/* <Align /> */}
          <FlipXY />
          <TextContent />
          <TextStyle />
          <Shadow />
          {/* <Border /> */}
          {/* <Radius /> */}
          <Opacity />
          <Position />
          <Rotation />
        </div>
      </TabPane>
      <TabPane tab="混合模式" itemKey="animation">
        <Filter />
      </TabPane>
    </Tabs>
  );
}

export default observer(TextOptions);
