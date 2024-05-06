import { editor } from '@stores/editor';
import { theme } from '@theme';
import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Menu, Item, Separator, Submenu, useContextMenu } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.css';
import styles from './styles.module.less';
import { util } from '@utils/index';
import { Toast } from '@douyinfe/semi-ui';
import { GroupLayer } from '@pages/editor/core/types/data';

export interface IProps {}

// context_menus

function ContextMenu(props: IProps) {
  const MENU_ID = 'context_menus';
  const { show } = useContextMenu({
    id: MENU_ID,
  });

  useEffect(() => {
    editor.showContextMenu = (event: any, props: Record<string, any>) => {
      console.log('ee', event, props);
      show({
        event,
        props,
      });
    };
  }, []);

  const handleItemClick = ({ id, event, props }: any) => {
    const ids = props.layers.map(d => d.id) || [];
    switch (id) {
      case 'cut':
        editor.cutElement(ids);
        break;
      case 'copy':
        editor.copyElement(ids);
        break;
      case 'lock':
        {
          props.layers.forEach(elementData => {
            elementData._lock = !elementData._lock;
          });
          editor.updateCanvas();
        }
        break;
      case 'hide':
        {
          props.layers.forEach(elementData => {
            elementData._hide = !elementData._hide;
          });
          editor.updateCanvas();
        }
        break;
      case 'up1':
        editor.upOneElement(ids);
        break;
      case 'down1':
        editor.downOneElement(ids);
        break;
      case 'moveTop':
        editor.moveTopElement(ids);
        break;
      case 'ungroup':
        {
          const elementData = editor.getElementData();
          const ids = editor.store.unGroupData(elementData.id);
          editor.setSelectedElementIds([ids[0]]);
          editor.store.emitControl([ids[0]]);
          editor.updateCanvasKey = util.createID();
        }
        break;
      case 'group':
        {
          // 数据合并
          const g = editor.store.groupData([...editor.selectedElementIds]);
          editor.setSelectedElementIds([g.id]);
          editor.store.emitControl([g.id]);
        }
        break;
      case 'moveBottom':
        editor.moveBottomElement(ids);
        break;
      case 'clearCopyTempData':
        {
          editor.copyTempData = null;
          (window as any).clipboardData = null;
          Toast.info('清理成功');
        }
        break;
      //etc...
    }
  };

  let group = null;
  let ungroup = null;
  if (editor.selectedElementIds.length > 1) {
    group = {
      id: 'group',
      name: '组合',
      extra: 'Ctrl + G',
    };
  } else {
    const layer = editor.getElementData() as GroupLayer;
    if (layer && layer.type === 'group') {
      ungroup = {
        id: 'ungroup',
        name: '解除组合',
        extra: 'Ctrl + Shift + G',
      };
    }
  }

  const menus = [
    {
      id: 'up1',
      name: '上移一层',
      extra: 'Ctrl + ]',
    },
    {
      id: 'down1',
      name: '下移一层',
      extra: 'Ctrl + [',
    },
    {
      id: 'moveTop',
      name: '移到顶层',
      extra: 'Ctrl + Shift + ]',
    },
    {
      id: 'moveBottom',
      name: '移到底层',
      extra: 'Ctrl + Shift + [',
    },
    {
      id: 'sp1',
      name: 'Separator',
    },
    group,
    ungroup,
    {
      id: 'cut',
      name: '剪切',
      extra: 'Ctrl + X',
    },
    {
      id: 'copy',
      name: '复制',
      extra: 'Ctrl + C',
    },
    // {
    //   id: 'paste',
    //   name: '粘贴',
    //   extra: 'Ctrl + V',
    // },
    {
      id: 'lock',
      name: '锁定/解锁',
      extra: '',
    },
    {
      id: 'hide',
      name: '可见/隐藏',
      extra: '',
    },
    {
      id: 'clearCopyTempData',
      name: '清理剪切板',
    },
  ].filter(d => d);

  editor.themeUpdateKey;
  return (
    <>
      <Menu id={MENU_ID} theme={theme.getTheme()}>
        {menus.map(d => {
          if (d.name === 'Separator') {
            return <Separator key={d.id} />;
          }
          return (
            <Item id={d.id} key={d.id} onClick={handleItemClick}>
              <div className={styles.item}>
                <span>{d.name}</span>
                <i>{d.extra}</i>
              </div>
            </Item>
          );
        })}
        {/* <Submenu label="Foobar">
          <Item id="reload" onClick={handleItemClick}>
            Reload
          </Item>
          <Item id="something" onClick={handleItemClick}>
            Do something else
          </Item>
        </Submenu> */}
      </Menu>
    </>
  );
}

export default observer(ContextMenu);
