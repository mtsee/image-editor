import styles from './source.module.less';
import { Input, Popover } from '@douyinfe/semi-ui';
import { Filter, HamburgerButton, Like, Search as IconSearch } from '@icon-park/react';
import type { SourceType } from '@config/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import Search from './Search';
import Collect from './Collect';
import { server, getItems } from './server';
import { IconSpin } from '@douyinfe/semi-icons';
import SourceList from './SourceList';
import type { SourceItem } from '../../types';

export interface IProps {
  type: SourceType;
  item: (a: SourceItem) => JSX.Element;
  itemClassName: string;
  addItem: (a: any) => void;
}

export default function Source(props: IProps) {
  const [keywords, setKeywords] = useState('');
  const [collect, setCollect] = useState(false);
  const [types, setTypes] = useState<any[] | null>(null);
  const [items, setItems] = useState<any[] | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const params = useRef({
    page: 1,
    page_size: 30,
    keyword: '',
    category_id: '',
  });
  const { type } = props;

  // 获取素材
  const getMaterialList = useCallback(async () => {
    const { list, hasMore } = await getItems(type, params.current, items);
    setItems(list);
    setHasMore(hasMore);
  }, [items]);

  // 获取分类
  const getTypeList = useCallback(async () => {
    if (type === 'template') {
      const [res, err] = await server.getTemplateTypes();
      // console.log('res', res);
      if (!err) {
        setTypes(res);
      }
    } else {
      const [res, err] = await server.getTypeItems(type);
      if (!err) {
        setTypes(res.data);
      }
    }
  }, [type]);

  useEffect(() => {
    // 获取分类列表
    getTypeList();
    getMaterialList();
  }, []);

  console.log('types', types);

  const content = (
    <div className={styles.popoverTags + ' scroll'}>
      <ul className={styles.ul}>
        {types &&
          types.map(d => {
            return (
              <li
                onClick={() => {
                  setKeywords(d.name);
                }}
                key={d.id}
              >
                {d.name}
              </li>
            );
          })}
      </ul>
    </div>
  );

  if (collect) {
    return (
      <Collect
        type={props.type}
        onBack={() => setCollect(false)}
        item={props.item}
        itemClassName={props.itemClassName}
        addItem={props.addItem}
      />
    );
  }

  if (keywords) {
    return (
      <Search
        type={props.type}
        keywords={keywords}
        itemClassName={props.itemClassName}
        addItem={props.addItem}
        item={props.item}
        getListServer={props.type === 'template' ? server.searchTemplateItems : server.searchMaterialItems}
        onEnterPress={val => {
          setKeywords(val);
        }}
      />
    );
  }

  return (
    <div className={styles.source}>
      <div className={styles.header}>
        <section className={styles.search}>
          <Input
            onEnterPress={(e: any) => {
              setKeywords(e.target.value);
            }}
            placeholder="搜索"
            suffix={<IconSearch size={18} style={{ marginRight: 5 }} />}
            showClear
          />
          {/* <a className={styles.filter} href="#">
            <Filter theme="outline" size="20" fill="var(--theme-icon)" />
          </a> */}
        </section>
        <section className={styles.tags}>
          <a onClick={() => setCollect(true)} className={styles.save}>
            <Like theme="outline" size="20" fill="var(--theme-icon)" />
          </a>
          <ul className={styles.ul}>
            {types === null && <IconSpin spin />}
            {types !== null &&
              types.map(d => {
                return (
                  <li onClick={() => setKeywords(d.name)} key={d.id}>
                    {d.name}
                  </li>
                );
              })}
            <li className={styles.bg}></li>
          </ul>
          <Popover position="bottomRight" className={styles.popover} content={content}>
            <a className={styles.more}>
              <HamburgerButton theme="outline" size="20" fill="var(--theme-icon)" />
            </a>
          </Popover>
        </section>
      </div>
      <div className={styles.list + ' scroll'} id={`sourceItemsScrollDOM_${type}`}>
        <SourceList
          item={props.item}
          itemClassName={props.itemClassName}
          addItem={props.addItem}
          hasMore={hasMore}
          items={items}
          type={type}
          next={() => {
            params.current.page++;
            getMaterialList();
          }}
        />
      </div>
    </div>
  );
}
