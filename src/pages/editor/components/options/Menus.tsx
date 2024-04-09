import styles from './menus.module.less';
// import { SettingConfig, Performance, SpeedOne, WindmillTwo, MagicWand } from '@icon-park/react';
import { observer } from 'mobx-react';
import { editor } from '@stores/editor';
import type * as ctypes from '@config/types';

export interface IProps {
  elements: any[];
}

export interface NavItem {
  id: ctypes.ElementOptionType;
  name: string;
  // icon: JSX.Element;
}

function Menus(props: IProps) {
  const elements = props.elements;
  if (elements.length > 1) {
    return <div>group</div>;
  }
  const [element] = elements;

  const staticNavs: NavItem[] = [
    {
      id: 'basic',
      name: '基础',
    },
    {
      id: 'audio',
      name: '音频',
    },
    {
      id: 'speed',
      name: '变速',
    },
    {
      id: 'animation',
      name: '动画',
    },
    {
      id: 'colour',
      name: '调节',
    },
  ];

  let navTypes = [];
  switch (element.type) {
    case 'image':
      navTypes = ['basic', 'animation', 'colour'];
      break;
    case 'video':
      navTypes = ['basic', 'audio', 'speed', 'animation', 'colour'];
      break;
    case 'audio':
      navTypes = ['basic', 'speed'];
      break;
    case 'text':
      navTypes = ['basic', 'animation', 'colour'];
      break;
    case 'filter':
    case 'effect':
      navTypes = ['basic'];
      break;
    default:
      return <div style={{ color: '#ccc', padding: 10 }}>未配置:{element.type}组件</div>;
  }
  const navs: NavItem[] = staticNavs.filter(d => navTypes.includes(d.id));

  return (
    <div className={styles.menus}>
      {navs.map(nav => {
        return (
          <a
            onClick={() => {
              editor.setElementOptionType(nav.id);
            }}
            key={nav.id}
            className={nav.id === editor.elementOptionType ? styles.active : ''}
          >
            {/* {nav.icon} */}
            <p>{nav.name}</p>
          </a>
        );
      })}
    </div>
  );
}

export default observer(Menus);
