import styles from './options.module.less';
// import OptionMenus from './Menus';
import { observer } from 'mobx-react';
import OptionsInner from './OptionsInner';
import { editor } from '@stores/editor';
import { Empty } from '@douyinfe/semi-ui';
import { Background } from './components';
import { IllustrationNoContent, IllustrationNoContentDark } from '@douyinfe/semi-illustrations';
import PageOption from './PageOption';

export interface IProps {}

function Options(props: IProps) {
  editor.selectedElementIds;
  const elements = editor.getElementDataByIds([...editor.selectedElementIds]) || [];
  if (editor.optionPanelCustom === 'background') {
    return (
      <div className={styles.optionbody}>
        <Background />
      </div>
    );
  }

  console.log('selectedElementIds', editor.selectedElementIds);

  if (!editor.selectedElementIds.length) {
    return <PageOption />;
    // return (
    //   <div className={styles.empty}>
    //     <Empty
    //       image={<IllustrationNoContent style={{ width: 150, height: 150 }} />}
    //       darkModeImage={<IllustrationNoContentDark style={{ width: 150, height: 150 }} />}
    //       // title="未选中任何元素"
    //       description="未选中任何元素"
    //     />
    //   </div>
    // );
  }

  return (
    <>
      <div className={styles.optionbody}>
        <OptionsInner elements={elements} />
      </div>
    </>
  );
}

export default observer(Options);
