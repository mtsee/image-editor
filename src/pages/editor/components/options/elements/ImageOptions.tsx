import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import {
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
import { Tabs, TabPane } from '@douyinfe/semi-ui';
import { useState } from 'react';

export interface IProps {
  element: any;
}

function ImageOptions(props: IProps) {
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
          <AiImg />
          <FlipXY />
          <Opacity />
          {/* <Blur /> */}
          <Shadow />
          <Border />
          <Radius />
          {/* <Align /> */}
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

export default observer(ImageOptions);
