import IconSpin from '@douyinfe/semi-icons/lib/es/icons/IconSpin';
import InfiniteScroll from 'react-infinite-scroll-component';
import styles from './sourceList.module.less';
import WaterFull from '@components/water-full';
import classNames from 'classnames';
import type { SourceType } from '@config/types';
import { Progress, Checkbox, Toast } from '@douyinfe/semi-ui';
import { MusicRhythm, Plus, Like } from '@icon-park/react';
import { server } from './server';
import { editor } from '@stores/editor';
import type { SourceItem } from '../../types';

export interface IProps {
  hasMore: boolean;
  items: SourceItem[];
  item: (a: SourceItem) => JSX.Element;
  itemClassName: string;
  addItem: (a: SourceItem) => void;
  next: () => void;
  type: SourceType;
  scrollableTarget?: string;
  // checkboxs
  checkboxs?: string[]; // id
  onChangeCheckboxs?: (n: string) => void;
  sType?: string; // 标记是哪个组件引用 Collect Search等
  callback?: (id: string) => void;
}

export interface ChildProps {
  children?: any;
  className?: string;
  item: any;
}

export default function SourceList(props: IProps) {
  const { hasMore, items, next, type, scrollableTarget, checkboxs, onChangeCheckboxs, sType } = props;

  if (!items) {
    return (
      <div className={styles.loadingMore}>
        <span>
          <IconSpin spin style={{ color: 'var(--theme-icon)' }} />
          &nbsp;&nbsp;加载中...
        </span>
      </div>
    );
  }

  const checkboxStyle: any = {};
  if (checkboxs && checkboxs.length) {
    checkboxStyle.display = 'block';
  }

  // 设置缓存数据，用于拖动元素的时候获取数据
  editor.setActiveItems(items, props.type);

  return (
    <InfiniteScroll
      dataLength={items.length || 0}
      hasMore={hasMore}
      next={next}
      loader={
        <>
          {hasMore && (
            <div className={styles.loadingMore}>
              <span>
                <IconSpin spin style={{ color: 'var(--theme-icon)' }} />
                &nbsp;&nbsp;加载中...
              </span>
            </div>
          )}
        </>
      }
      scrollableTarget={scrollableTarget ? scrollableTarget : `sourceItemsScrollDOM_${props.type}`}
      endMessage={<p className={styles.noMoreTips}>到底了~</p>}
    >
      <WaterFull
        itemWidth={{ video: 120, image: 120, filter: 80, text: 80, effect: 80, transition: 120 }[type]}
        itemHeight={['audio'].includes(type)}
        list={items}
        columns={type === 'audio' ? 1 : null}
        item={(item: SourceItem) => {
          return (
            <span
              data-type={item.type}
              data-dragitem={props.type === 'template' ? undefined : item.id + '_' + props.type}
              className={classNames(styles.item, props.itemClassName)}
            >
              {props.item(item)}
              {checkboxs ? (
                <span className={styles.checkbox} style={checkboxStyle}>
                  <Checkbox
                    checked={checkboxs.includes(item.id)}
                    onChange={e => {
                      onChangeCheckboxs(item.id);
                    }}
                  ></Checkbox>
                </span>
              ) : (
                <a
                  onClick={() => {
                    if (sType === 'collect') {
                      server.collectCancle([item.id]);
                      props.callback(item.id);
                      Toast.success('取消收藏成功！');
                      return;
                    }
                    server.collect(item.id, type);
                    console.log(type, 'type');
                    Toast.success('已收藏！');
                  }}
                  className={styles.save}
                >
                  <Like theme="filled" size="12" fill="#fff" />
                </a>
              )}
              <a
                onClick={() => {
                  props.addItem(item);
                }}
                className={styles.add}
              >
                <Plus theme="filled" size="16" fill="#fff" />
              </a>
            </span>
          );
        }}
      />
    </InfiniteScroll>
  );
}
