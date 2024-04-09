import { useState } from 'react';
import { Info, Wechat } from '@icon-park/react';
import { Modal } from '@douyinfe/semi-ui';
import styles from './aboutus.module.less';

export interface IProps {}

export default function AboutUs(props: IProps) {
  const [visible, setVisible] = useState(false);

  return (
    <>
      <Modal
        width={900}
        title="关于我们"
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        footer={null}
      >
        <div className={styles.info}>
          <p>
            “四川爱趣五科技”是一家专注研发可视化内容生产工具的公司，主要为客户提供私有化部署以及源码授权，降低开发成本，提升效率。
          </p>
          <p>公司其他产品</p>
          <ul className={styles.items}>
            <li>
              <a href="https://video.h5ds.com" target="_blank">
                视频剪辑工具
              </a>
            </li>
            <li>
              <a href="https://image.h5ds.com" target="_blank">
                图片编辑工具
              </a>
            </li>
            <li>
              <a href="https://h5.h5ds.com" target="_blank">
                H5编辑工具
              </a>
            </li>
            <li>
              <a href="https://720.h5ds.com" target="_blank">
                720全景图编辑工具
              </a>
            </li>
            <li>
              <a href="https://sharezm.com" target="_blank">
                希尔桌面-在线云盘
              </a>
            </li>
          </ul>
          <p>
            <img style={{ width: 200 }} src="https://cdn.h5ds.com/wxq.jpg" alt="" />
            <span className={styles.wechat}>
              <i>
                <Wechat theme="filled" size="40" fill="#67b114" />
              </i>
              <h5>官方微信公众号</h5>
              <img style={{ width: 148 }} src="https://cdn.h5ds.com/wechat.jpg" alt="" />
            </span>
          </p>
        </div>
      </Modal>
      <a onClick={() => setVisible(true)} style={{ opacity: 0.5 }}>
        <Info theme="outline" size="24" fill="var(--theme-icon)" />
      </a>
    </>
  );
}
