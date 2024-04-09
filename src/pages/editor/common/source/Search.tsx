import styles from './search.module.less';
import { Input, Popover } from '@douyinfe/semi-ui';
import { Left, Search as IconSearch } from '@icon-park/react';
import type { SourceType } from '@config/types';
import { useState, useRef, useCallback, useEffect } from 'react';
import { getItems, server } from './server';
import SourceList from './SourceList';
import type { SourceItem } from '../../types';

export interface IProps {
  type: SourceType;
  keywords: string;
  onEnterPress: (e: any) => void;
  item: (a: SourceItem) => JSX.Element;
  itemClassName: string;
  addItem: (a: SourceItem) => void;
  getListServer: any;
}

export default function Search(props: IProps) {
  const { type, keywords } = props;
  const [val, setVal] = useState(keywords);
  const [hasMore, setHasMore] = useState(true);
  const [items, setItems] = useState<any[] | null>(null);
  const params = useRef({
    page: 1,
    page_size: 20,
    keyword: val,
    category_id: '',
  });

  // 获取素材
  const getMaterialList = useCallback(async () => {
    const { list, hasMore } = await getItems(type, params.current, [], props.getListServer);
    setItems(list);
    setHasMore(hasMore);
  }, [items]);

  useEffect(() => {
    params.current.keyword = val;
    console.log(val, 'val');
    getMaterialList();
  }, [val]);
  return (
    <div className={styles.source}>
      <div className={styles.header}>
        <section className={styles.search}>
          <a className={styles.back} onClick={() => props.onEnterPress('')}>
            <Left theme="outline" size="24" fill="var(--theme-icon)" />
          </a>
          <Input
            defaultValue={val}
            onEnterPress={(e: any) => {
              console.log(e.target.value, 'aaa');
              setVal(e.target.value);
            }}
            placeholder="搜索"
            suffix={<IconSearch size={18} style={{ marginRight: 5 }} />}
            showClear
          />
          {/* <a className={styles.filter} href="#">
            <Filter theme="outline" size="20" fill="var(--theme-icon)" />
          </a> */}
        </section>
      </div>
      <div className={styles.list + ' scroll'} id={`sourceItemsScrollDOM_search_${props.type}`}>
        <SourceList
          hasMore={hasMore}
          items={items}
          type={type}
          next={() => {
            params.current.page++;
            getMaterialList();
          }}
          scrollableTarget={`sourceItemsScrollDOM_search_${props.type}`}
          item={props.item}
          itemClassName={props.itemClassName}
          addItem={props.addItem}
        />
      </div>
    </div>
  );
}
