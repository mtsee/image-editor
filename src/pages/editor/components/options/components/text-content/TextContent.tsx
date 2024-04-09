import styles from './textcontent.module.less';
import Item from '../item';
import { TextArea } from '@douyinfe/semi-ui';
import { observer } from 'mobx-react';
import { useReducer } from 'react';
import { editor } from '@stores/editor';
import { TextLayer } from '@pages/editor/core/types/data';
// import { util } from '@utils/index';

export interface IProps {}
function TextContent(props: IProps) {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const elementData = editor.getElementData() as TextLayer;
  return (
    <Item
      title={
        <span
          onClick={() => {
            console.log(JSON.stringify(elementData.textStyle));
          }}
        >
          文本
        </span>
      }
      style={{ margin: '6px 20px' }}
    >
      <div className={styles.texts}>
        <TextArea
          value={elementData.text}
          onChange={e => {
            elementData.text = e;
            editor.updateCanvas();
            forceUpdate();
          }}
          autosize
          maxCount={1000}
          onBlur={() => {
            editor.record({
              type: 'update',
              desc: '修改文本内容',
            });
          }}
        />
      </div>
    </Item>
  );
}

export default observer(TextContent);
