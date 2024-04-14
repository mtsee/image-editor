import React, { useReducer } from 'react';
import Item from '@options/item';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { observer } from 'mobx-react';
import SetColor from '@options/set-color';
import { QrcodeLayer } from './types';
import useUpdate from '@options/useUpdate';
import { TextArea } from '@douyinfe/semi-ui';
import tinycolor from 'tinycolor2';

export interface IProps {}

function QrOption(props: IProps) {
  const elementData = editor.getElementData() as QrcodeLayer;
  const [forceUpdate] = useUpdate();
  return (
    <>
      <Item title="二维码内容">
        <TextArea
          value={elementData.content}
          onChange={e => {
            elementData.content = e;
            editor.updateCanvas();
            forceUpdate();
          }}
          autosize
          maxCount={1000}
          onBlur={() => {
            editor.record({
              type: 'update',
              desc: '修改二维码文本内容',
            });
          }}
        />
      </Item>
      <Item title="背景色">
        <SetColor
          list={true}
          color={{
            type: 'solid',
            color: elementData.lightcolor,
          }}
          onChange={(v: any) => {
            elementData.lightcolor = tinycolor(v.color).toHex();
            editor.updateCanvas();
            forceUpdate();
            editor.record({
              type: 'update',
              desc: '修改二维码颜色',
            });
          }}
        />
      </Item>
      <Item title="前景色">
        <SetColor
          list={true}
          color={{
            type: 'solid',
            color: elementData.darkcolor,
          }}
          onChange={(v: any) => {
            console.log('v', v);
            elementData.darkcolor = tinycolor(v.color).toHex();
            editor.updateCanvas();
            forceUpdate();
            editor.record({
              type: 'update',
              desc: '修改二维码颜色',
            });
          }}
        />
      </Item>
    </>
  );
}

export default observer(QrOption);
