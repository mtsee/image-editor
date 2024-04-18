import styles from './pageoption.module.less';
import React, { useReducer } from 'react';
import Item from './components/item';
import { observer } from 'mobx-react';
import { DeleteOne, Copy } from '@icon-park/react';
import { Tooltip, Input, InputNumber, Toast, Modal } from '@douyinfe/semi-ui';
import { editor } from '@stores/editor';
import SetColor from './components/set-color';
import { pageSize } from '@pages/editor/core/config/config';
import remove from 'lodash/remove';
import { util } from '@utils/index';
import { transaction } from 'mobx';

export interface IProps {}

function PageOption(props: IProps) {
  const pageData = editor.pageData;
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  return (
    <div className={styles.page + ' scroll'}>
      <Item title="页面名称">
        <Input
          value={pageData.name}
          onChange={e => {
            pageData.name = e;
            forceUpdate();
          }}
        />
      </Item>
      <Item title="快捷操作">
        <div className={styles.space}>
          <Tooltip content="复制画布">
            <a
              onClick={() => {
                const nPage = util.toJS(editor.pageData);
                nPage.id = util.createID();
                editor.data.pages.push(nPage);
                editor.selectPageId = nPage.id;
                Toast.success('已复制');
              }}
            >
              <Copy size={20} color="var(--theme-icon)" />
            </a>
          </Tooltip>
          <Tooltip content="删除画布">
            <a
              onClick={() => {
                transaction(() => {
                  if (editor.data.pages.length > 1) {
                    remove(editor.data.pages, d => d.id === editor.selectPageId);
                    editor.selectPageId = editor.data.pages[0].id;
                    editor.updateCanvasKey = util.createID();
                  } else {
                    Toast.error('至少保留一个页面');
                  }
                });
                // editor.updateCanvas();
              }}
            >
              <DeleteOne size={20} color="var(--theme-icon)" />
            </a>
          </Tooltip>
        </div>
      </Item>
      <Item title="背景色">
        <SetColor
          gradual={true}
          list={true}
          color={{ type: 'solid', color: '#ffffff' }}
          onChange={v => {
            console.log('vvv', v);
            pageData.background = v;
            editor.updateCanvas();
          }}
        />
      </Item>
      <Item
        title="修改尺寸"
        // extra={
        //   <span style={{ opacity: 0.5 }}>
        //     {pageData.width}px * {pageData.height}px
        //   </span>
        // }
      >
        <div className={styles.position}>
          <InputNumber
            value={pageData.width}
            innerButtons
            prefix="W"
            onBlur={e => {
              pageData.width = Number(e.target.value);
              forceUpdate();
              editor.store.autoViewSize();
              editor.updateCanvas();
            }}
          />
          <InputNumber
            value={pageData.height}
            innerButtons
            prefix="H"
            onBlur={e => {
              pageData.height = Number(e.target.value);
              forceUpdate();
              editor.store.autoViewSize();
              editor.updateCanvas();
            }}
          />
        </div>
        <div className={styles.moreSize}>
          {pageSize.map(d => {
            return (
              <section
                key={d.name}
                onClick={() => {
                  Modal.confirm({
                    title: '是否要修改画布尺寸？',
                    content: '修改后元素会重新计算坐标',
                    onOk: () => {
                      pageData.height = d.height;
                      pageData.width = d.width;
                      forceUpdate();
                      editor.store.autoViewSize();
                      editor.updateCanvas();
                    },
                  });
                }}
              >
                {/* <span className={styles.name}>{d.icon}</span> */}
                <span className={styles.name}>{d.name}</span>
                <span className={styles.size}>
                  {d.width}
                  {d.unit} x {d.height}
                  {d.unit}
                </span>
              </section>
            );
          })}
        </div>
      </Item>
    </div>
  );
}
export default observer(PageOption);
