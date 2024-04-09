import styles from './styles.module.less';
import Item from '../item';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { observer } from 'mobx-react';
import { useReducer } from 'react';
import { ImageLayer } from '@pages/editor/core/types/data';
import SetColor from '../set-color';
import { InputNumber, Switch, Select } from '@douyinfe/semi-ui';
import { DividingLineOne } from '@icon-park/react';

export interface IProps {}

function Border(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as ImageLayer;
  if (!elementData.border) {
    elementData.border = { stroke: '#ff0', strokeWidth: 0, visible: false };
  }

  return (
    <Item
      title="边框"
      extra={
        <Switch
          size="small"
          checked={elementData.border.visible}
          onChange={e => {
            elementData.border.visible = e;
            elementData.border = { ...elementData.border };
            editor.updateCanvas();
            forceUpdate();
          }}
        />
      }
    >
      {elementData.border.visible ? (
        <div className={styles.shadow}>
          <div className={styles.color}>
            <SetColor
              list={true}
              color={{
                type: 'solid',
                color: elementData.border.stroke as string,
              }}
              onChange={(v: any) => {
                elementData.border.stroke = v.color;
                elementData.border = { ...elementData.border };
                editor.updateCanvas();
                forceUpdate();
              }}
            />
          </div>
          <div className={styles.inputs}>
            <InputNumber
              innerButtons
              prefix="宽度"
              value={util.toNum(elementData.border.strokeWidth)}
              onChange={(v: number) => {
                elementData.border.strokeWidth = util.toNum(v);
                elementData.border = { ...elementData.border };
                editor.updateCanvas();
                forceUpdate();
              }}
              onBlur={() => {
                editor.record({
                  type: 'update',
                  desc: '修改阴影X',
                });
              }}
            />
            <Select
              value={(elementData.border.dashPattern || []).join('-')}
              onChange={(e: string) => {
                if (e === '-') {
                  delete elementData.border.dashPattern;
                } else {
                  elementData.border.dashPattern = e.split('-').map(d => Number(d));
                }
                elementData.border = { ...elementData.border };
                forceUpdate();
                editor.updateCanvas();
              }}
              prefix={
                <DividingLineOne
                  theme="outline"
                  size="16"
                  style={{ opacity: 0.5, margin: '0 5px' }}
                  fill="var(--theme-icon)"
                />
              }
            >
              <Select.Option value="-">直线</Select.Option>
              <Select.Option value="3-3">虚线1</Select.Option>
              <Select.Option value="6-6">虚线2</Select.Option>
              <Select.Option value="9-9">虚线3</Select.Option>
              <Select.Option value="12-12">虚线4</Select.Option>
              <Select.Option value="15-15">虚线5</Select.Option>
            </Select>
          </div>
        </div>
      ) : null}
    </Item>
  );
}

export default observer(Border);
