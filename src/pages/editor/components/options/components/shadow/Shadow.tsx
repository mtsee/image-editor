import styles from './styles.module.less';
import Item from '../item';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { observer } from 'mobx-react';
import { useReducer } from 'react';
import { ImageLayer } from '@pages/editor/core/types/data';
import SetColor from '../set-color';
import { InputNumber, Switch } from '@douyinfe/semi-ui';

export interface IProps {}

function Shadow(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as ImageLayer;

  if (!elementData.shadow) {
    elementData.shadow = {
      x: 10,
      y: 10,
      blur: 10,
      spread: 0,
      visible: false,
      color: 'rgba(0,0,0,0.5)',
      blendMode: 'normal',
    };
  }

  return (
    <Item
      title="阴影"
      extra={
        <Switch
          size="small"
          checked={elementData.shadow.visible}
          onChange={e => {
            elementData.shadow.visible = e;
            elementData.shadow = { ...elementData.shadow };
            editor.updateCanvas();
            forceUpdate();
          }}
        />
      }
    >
      {elementData.shadow.visible ? (
        <div className={styles.shadow}>
          <div className={styles.color}>
            <SetColor
              list={true}
              color={{
                type: 'solid',
                color: elementData.shadow.color as string,
              }}
              onChange={(v: any) => {
                // console.log('xzxzxzx', v);
                elementData.shadow.color = v.color;
                elementData.shadow = { ...elementData.shadow };
                editor.updateCanvas();
                forceUpdate();
              }}
              // onAfterChange={v => {
              //   editor.updateCanvas();
              // }}
            />
          </div>
          <div className={styles.inputs}>
            <InputNumber
              innerButtons
              prefix="模糊"
              value={util.toNum(elementData.shadow.blur)}
              onChange={(v: number) => {
                elementData.shadow.blur = util.toNum(v);
                elementData.shadow = { ...elementData.shadow };
                editor.updateCanvas();
                forceUpdate();
              }}
              onBlur={() => {
                editor.record({
                  type: 'update',
                  desc: '修改阴影blur',
                });
              }}
            />
            <InputNumber
              innerButtons
              prefix="扩散"
              value={util.toNum(elementData.shadow.spread)}
              onChange={(v: number) => {
                elementData.shadow.spread = util.toNum(v);
                elementData.shadow = { ...elementData.shadow };
                editor.updateCanvas();
                forceUpdate();
              }}
              onBlur={() => {
                editor.record({
                  type: 'update',
                  desc: '修改阴影扩展',
                });
              }}
            />
          </div>
          <div className={styles.inputs}>
            <InputNumber
              innerButtons
              prefix="X轴"
              value={util.toNum(elementData.shadow.x)}
              onChange={(v: number) => {
                elementData.shadow.x = util.toNum(v);
                elementData.shadow = { ...elementData.shadow };
                editor.updateCanvas();
                forceUpdate();
              }}
              onBlur={() => {
                editor.record({
                  type: 'update',
                  desc: '修改阴影距离',
                });
              }}
            />
            <InputNumber
              innerButtons
              prefix="Y轴"
              value={util.toNum(elementData.shadow.y)}
              onChange={(v: number) => {
                elementData.shadow.y = util.toNum(v);
                elementData.shadow = { ...elementData.shadow };
                editor.updateCanvas();
                forceUpdate();
              }}
              onBlur={() => {
                editor.record({
                  type: 'update',
                  desc: '修改阴影Y',
                });
              }}
            />
          </div>
          {/* x,y,blur,spread,color,blendMode,visible */}
        </div>
      ) : null}
    </Item>
  );
}

export default observer(Shadow);
