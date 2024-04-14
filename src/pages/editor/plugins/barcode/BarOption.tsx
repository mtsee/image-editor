import React, { useReducer } from 'react';
import Item from '@options/item';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { observer } from 'mobx-react';
import SetColor from '@options/set-color';
import { BarcodeLayer } from './types';
import useUpdate from '@options/useUpdate';
import { TextArea, Toast } from '@douyinfe/semi-ui';
import tinycolor from 'tinycolor2';

export interface IProps {}

function BarOption(props: IProps) {
  const elementData = editor.getElementData() as BarcodeLayer;
  const [forceUpdate] = useUpdate();
  return (
    <>
      <Item title="条形码内容">
        <TextArea
          value={elementData.content}
          onChange={e => {
            if (/^[a-zA-Z0-9-]+$/.test(e)) {
              elementData.content = e;
              editor.updateCanvas();
              forceUpdate();
            } else {
              Toast.error('请输入数字，字幕，中划线');
            }
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
      <Item title="颜色">
        <SetColor
          list={true}
          color={{
            type: 'solid',
            color: elementData.color,
          }}
          onChange={(v: any) => {
            elementData.color = tinycolor(v.color).toHex();
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

export default observer(BarOption);
