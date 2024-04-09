import styles from './optionsInner.module.less';
import { observer } from 'mobx-react';
import ImageOptions from './elements/ImageOptions';
import TextOptions from './elements/TextOptions';
import GroupOptions from './elements/GroupOptions';
import GroupLayerOptions from './elements/GroupLayerOptions';
import { editor } from '@stores/editor';
import { Empty } from '@douyinfe/semi-ui';
import { IllustrationNoResult, IllustrationNoResultDark } from '@douyinfe/semi-illustrations';

export interface IProps {
  elements: any[];
}

function OptionsInner(props: IProps) {
  const elements = editor.getElementDataByIds([...editor.selectedElementIds]) || [];

  if (elements.length === 1) {
    const [elementData] = elements;

    console.log('elementData', elementData);

    switch (elementData.type) {
      case 'image':
        return <ImageOptions key={elementData.id} element={elementData} />;
      case 'text':
        return <TextOptions key={elementData.id} element={elementData} />;
      case 'group':
        return <GroupLayerOptions key={elementData.id} element={elementData} />;
      default:
        return <div>未知类型</div>;
    }
  } else if (elements.length > 1) {
    return <GroupOptions />;
  }

  return (
    <div className={styles.empty}>
      <Empty
        image={<IllustrationNoResult style={{ width: 150, height: 150 }} />}
        darkModeImage={<IllustrationNoResultDark style={{ width: 150, height: 150 }} />}
        description={'类型错误'}
      />
    </div>
  );
}
export default observer(OptionsInner);
