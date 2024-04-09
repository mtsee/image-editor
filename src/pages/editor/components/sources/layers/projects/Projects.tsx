import React, { useEffect, useState, useReducer, useCallback, useRef } from 'react';
import styles from './projects.module.less';
import { server } from './server';
import { Toast, Popover, Modal, Pagination, Button, SplitButtonGroup, Dropdown } from '@douyinfe/semi-ui';
import { More } from '@icon-park/react';
import { IconTreeTriangleDown } from '@douyinfe/semi-icons';
import { getInitData } from './initData';
import { pageSize } from '@pages/editor/core/config/config';

export interface IProps {}

export default function Projects(props: IProps) {
  const [items, setItems] = useState<any[]>([]);
  const [total, setTotal] = useState(0);
  const projectRef = useRef<HTMLDivElement>();
  const currentName = useRef<string>();
  const params = useRef({
    page: 1,
    page_size: 20,
    keyword: '',
    category_id: '0',
  });

  // 获取素材
  const getList = async () => {
    const [res, err] = await server.getDraftList({ ...params.current }); //('draft', params.current, items, server.getDraftList);
    setTotal(res.total);
    setItems(res.data);
  };

  useEffect(() => {
    getList();
  }, []);

  return (
    <div ref={projectRef} className={styles.projects + ' scroll'}>
      <div className={styles.add}>
        <SplitButtonGroup style={{ marginRight: 10, width: '100%', overflow: 'hidden', borderRadius: 4 }}>
          <Button
            onClick={async () => {
              Modal.confirm({
                title: '是否要新建项目？',
                content: '新建项目前请先保存当前项目',
                onOk: async () => {
                  const ndata = getInitData();
                  const [res, err] = await server.createVideo({
                    source_id: '', //来源Id
                    category_id: 0, //分类Id
                    name: ndata.name || '未命名', //名称
                    description: ndata.desc || '暂无描述', //描述
                    width: ndata.pages[0].width, //宽度
                    height: ndata.pages[0].height, //高度
                    thumb: '', //封面图url
                    data: ndata,
                  });
                  if (err) {
                    Toast.error(err);
                    return;
                  }
                  location.href = `/editor/${res.id}`;
                },
              });
            }}
            theme="solid"
            type="primary"
            style={{ width: 'calc(100% - 34px)' }}
          >
            新建项目
          </Button>
          <Dropdown
            contentClassName={styles.dropdown}
            //@ts-ignore
            menu={pageSize.map(d => {
              return {
                node: 'item',
                name: (
                  <section className={styles.section}>
                    {/* <span className={styles.name}>{d.icon}</span> */}
                    <span className={styles.name}>{d.name}</span>
                    <span className={styles.size}>
                      {d.width}
                      {d.unit} x {d.height}
                      {d.unit}
                    </span>
                  </section>
                ),
                onClick: async () => {
                  Modal.confirm({
                    title: '是否要新建项目？',
                    content: '新建项目前请先保存当前项目',
                    onOk: async () => {
                      const ndata = getInitData();
                      ndata.pages[0].width = d.width;
                      ndata.pages[0].height = d.height;
                      const [res, err] = await server.createVideo({
                        source_id: '', //来源Id
                        category_id: 0, //分类Id
                        name: ndata.name || '未命名', //名称
                        description: ndata.desc || '暂无描述', //描述
                        width: ndata.pages[0].width, //宽度
                        height: ndata.pages[0].height, //高度
                        thumb: '', //封面图url
                        data: ndata,
                      });
                      if (err) {
                        Toast.error(err);
                        return;
                      }
                      location.href = `/editor/${res.id}`;
                    },
                  });
                },
              };
            })}
            trigger="click"
            position="bottomRight"
          >
            <Button theme="solid" type="primary" icon={<IconTreeTriangleDown />}></Button>
          </Dropdown>
        </SplitButtonGroup>
      </div>
      {items.map(item => {
        return (
          <div className={styles.item}>
            <Popover
              content={
                <ul className={styles.menus}>
                  <li
                    onClick={() => {
                      Modal.confirm({
                        title: '确定删除？',
                        content: '删除后无法恢复，请谨慎操作',
                        onOk: async () => {
                          await server.deleteDraft({ id: item.id });
                          params.current.page = 1;
                          // 更新当前列表
                          getList();
                        },
                      });
                    }}
                  >
                    删除
                  </li>
                  <li
                    onClick={async () => {
                      const [res, err] = await server.copyDraft({ id: item.id });
                      if (err) {
                        Toast.error('复制失败');
                      }
                      params.current.page = 1;
                      getList();
                      Toast.success('复制成功');
                    }}
                  >
                    复制
                  </li>
                </ul>
              }
            >
              <div className={styles.more}>
                <More theme="outline" size="20" fill="var(--theme-icon)" />
              </div>
            </Popover>
            <a
              onClick={() => {
                Modal.confirm({
                  title: '是否要切换项目？',
                  content: '切换项目前请先保存当前项目',
                  onOk: () => {
                    location.href = `/editor/${item.id}`;
                  },
                });
              }}
            >
              <div className={styles.pic}>
                <img
                  // style={{
                  //   width: (130 * item.width) / item.height,
                  //   height: 130,
                  // }}
                  src={item.thumb ? item.thumb : '/assets/images/img-null.png'}
                  alt=""
                />
              </div>
            </a>
            <input
              title="点击修改名称"
              onFocus={e => {
                currentName.current = e.target.value;
              }}
              onBlur={async e => {
                if (e.target.value === currentName.current) return;
                item.name = e.target.value;
                const [res, err] = await server.updateDraft({ id: item.id, name: item.name });
                if (err) {
                  Toast.error(err);
                } else {
                  Toast.success('修改成功！');
                }
              }}
              className={styles.name}
              defaultValue={item.name || '未命名'}
            />
          </div>
        );
      })}
      <Pagination
        popoverPosition="right"
        size="small"
        hoverShowPageSelect={true}
        total={total}
        pageSize={20}
        onPageChange={async page => {
          console.log('ppp', page);
          params.current.page = page;
          await getList();
          projectRef.current.scrollTop = 0;
        }}
        style={{ margin: '0 20px 20px 20px' }}
      ></Pagination>
    </div>
  );
}
