import styles from './search.module.less';
import { Left } from '@icon-park/react';
import type { SourceType } from '@config/types';
import { useCallback, useEffect, useRef, useState } from 'react';
import { getItems, server } from './server';
import SourceList from './SourceList';
import type { SourceItem } from '../../types';

export interface IProps {
  type: SourceType;
  onBack: () => void;
  item: (a: SourceItem) => JSX.Element;
  itemClassName: string;
  addItem: (a: SourceItem) => void;
}

export default function Collect(props: IProps) {
  const [items, setItems] = useState<any[] | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const params = useRef({
    page: 1,
    page_size: 20,
    keyword: '',
    category_id: '',
  });
  const { type } = props;

  // 获取素材
  const getList = useCallback(async () => {
    const { list, hasMore } = await getItems(type, params.current, items, server.getCollects);
    console.log('list', list);
    setItems(list);
    setHasMore(hasMore);
  }, [items]);

  // 点击取消收藏后需要过滤掉取消的元素
  const handleItems = (id: string) => {
    const list = items.filter((item)=>{
      return item.id !== id;
    })
    if(list.length === 0){
      props.onBack();
      return;
    }
    setItems(list);
  }

  useEffect(() => {
    getList();
  }, []);

  return (
    <div className={styles.source}>
      <div className={styles.header}>
        <section className={styles.search}>
          <a className={styles.back} onClick={() => props.onBack()}>
            <Left theme="outline" size="24" fill="var(--theme-icon)" />
          </a>
          <h1 className={styles.title}>我的收藏</h1>
        </section>
      </div>
      <div className={styles.list + ' scroll'}>
        <SourceList
          sType='collect'
          hasMore={hasMore}
          items={items}
          type={type}
          next={() => {
            params.current.page = params.current.page + 1;
            getList();
          }}
          item={props.item}
          itemClassName={props.itemClassName}
          addItem={props.addItem}
          callback={handleItems}
        />
      </div>
    </div>
  );
}
