import { editor } from '@stores/editor';
import { util } from '@utils/index';
import classNames from 'classnames';
import { transaction } from 'mobx';
import { observer } from 'mobx-react';
import React from 'react';
import styles from './pages.module.less';
import WaterFull from '@components/water-full';
import { Button, Popover, Toast } from '@douyinfe/semi-ui';
import { More } from '@icon-park/react';
import remove from 'lodash/remove';

export interface IProps {}

function Pages(props: IProps) {
  editor.selectPageId;
  return (
    <div className={styles.pages + ' scroll'}>
      <div className={styles.btns}>
        <Button
          size="large"
          type="primary"
          theme="solid"
          block
          onClick={() => {
            transaction(() => {
              const pid = util.createID();
              editor.data.pages.push({
                id: pid,
                name: '新建页面',
                desc: '',
                width: util.randomNum(720, 1920),
                height: util.randomNum(720, 1920),
                background: {
                  type: 'solid',
                  color: '#fff',
                },
                layers: [],
              });
              editor.data.selectPageId = pid;
              editor.selectPageId = pid;
              editor.selectedElementIds = [];
              editor.updateCanvasKey = util.createID();
            });
          }}
        >
          新建页面
        </Button>
      </div>
      <WaterFull
        list={editor.data.pages}
        columns={null}
        item={(page: any) => {
          return (
            <span key={page.id} className={classNames(styles.item)}>
              <div
                onClick={() => {
                  transaction(() => {
                    editor.selectPageId = page.id;
                    editor.data.selectPageId = page.id;
                    editor.selectedElementIds = [];
                    editor.updateCanvasKey = util.createID();
                    editor.store.emitControl([]);
                    setTimeout(() => {
                      editor.store.autoViewSize();
                    }, 10);
                  });
                }}
                style={{ backgroundImage: `url(${page.thumb})` }}
                className={classNames(styles.item, {
                  [styles.active]: editor.selectPageId === page.id,
                })}
              >
                <Popover
                  content={
                    <ul className={styles.itemMenus}>
                      <li
                        onClick={e => {
                          e.stopPropagation();
                          const nPage = util.toJS(editor.data.pages.find(d => d.id === page.id));
                          nPage.id = util.createID();
                          editor.data.pages.push(nPage);
                          editor.selectPageId = nPage.id;
                        }}
                      >
                        复制
                      </li>
                      <li
                        onClick={e => {
                          e.stopPropagation();
                          transaction(() => {
                            if (editor.data.pages.length > 1) {
                              remove(editor.data.pages, d => d.id === editor.selectPageId);
                              editor.selectPageId = editor.data.pages[0].id;
                              editor.updateCanvasKey = util.createID();
                            } else {
                              Toast.error('至少保留一个页面');
                            }
                          });
                        }}
                      >
                        删除
                      </li>
                    </ul>
                  }
                >
                  <span className={styles.more}>
                    <More size={20} />
                  </span>
                </Popover>
                <span className={styles.name}>{page.name}</span>
              </div>
            </span>
          );
        }}
      />
    </div>
  );
}
export default observer(Pages);
