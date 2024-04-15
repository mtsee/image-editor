import { useState } from 'react';
import { Info, Wechat } from '@icon-park/react';
import { Modal } from '@douyinfe/semi-ui';
import styles from './aboutus.module.less';
import * as icons from './icon';

export interface IProps {}

export default function AboutUs(props: IProps) {
  const [visible, setVisible] = useState(false);

  const limitTxt = (str: string, n?: number) => {
    if (!n) {
      n = 20;
    }
    let nstr = str.substring(0, n);
    if (nstr.length < str.length) {
      nstr += '...';
    }
    return (
      <span className={styles.desc} title={str}>
        {nstr}
      </span>
    );
  };

  return (
    <>
      <Modal
        width={1000}
        title="关于我们"
        visible={visible}
        onCancel={() => setVisible(false)}
        closeOnEsc={true}
        footer={null}
      >
        <div className={styles.info}>
          <p>
            <a href="https://www.h5ds.com" target="_blank">
              四川爱趣五科技
            </a>
            （简称：H5科技）
            是一家专注可视化内容生产工具研发的纯技术型科技公司，主要为客户提供自研产品的私有化部署、源码商用授权、技术咨询、订制开发等服务；帮助客户降低研发成本，提升开发效率。
          </p>
          <h2>产品矩阵</h2>
          <ul className={styles.items}>
            <li>
              <a href="https://video.h5ds.com" target="_blank">
                <i>
                  <icons.ClipIcon />
                  <em className={styles.clip}></em>
                </i>
                <h3>视频剪辑工具</h3>
                {limitTxt('功能强大的在线视频剪辑工具，支持各种AI工具的集成，可快速落地短视频内容生成工具')}
                <span className={styles.more}>了解更多 →</span>
              </a>
            </li>
            <li>
              <a href="https://image.h5ds.com" target="_blank">
                <i>
                  <icons.ImgIcon />
                  <em className={styles.img}></em>
                </i>
                <h3>图片编辑工具</h3>
                {limitTxt('免费开源的在线图片编辑工具，用户体验好，交互流畅，界面美观，目前正在做AI功能的集成')}
                <span className={styles.more}>了解更多 →</span>
              </a>
            </li>
            <li>
              <a href="https://h5.h5ds.com" target="_blank">
                <i>
                  <icons.H5Icon />
                  <em className={styles.h5}></em>
                </i>
                <h3>H5编辑工具</h3>
                {limitTxt('一款功能强大的在线H5落地页制作工具，主要用于制作H5滑动页面，活动落地页，邀请函等')}
                <span className={styles.more}>了解更多 →</span>
              </a>
            </li>
            <li>
              <a href="https://720.h5ds.com" target="_blank">
                <i>
                  <icons.VRIcon />
                  <em className={styles.vr}></em>
                </i>
                <h3>720全景工具</h3>
                {limitTxt(
                  '全景图广泛应用于旅游景点导览，在线看房，文旅宣传等领域，该工具可以快速将全景照片做成全景应用',
                )}
                <span className={styles.more}>了解更多 →</span>
              </a>
            </li>
            <li>
              <a href="https://sharezm.com" target="_blank">
                <i>
                  <icons.CloudIcon />
                  <em className={styles.cloud}></em>
                </i>
                <h3>希尔桌面-云盘</h3>
                {limitTxt(
                  '希尔桌面是一款界面非常漂亮的在线网盘，用户可以创建多个网盘空间，支持多人协同，支持各种文件格式',
                )}
                <span className={styles.more}>了解更多 →</span>
              </a>
            </li>
          </ul>
          <div className={styles.footer}>
            <img style={{ width: 200 }} src="https://cdn.h5ds.com/wxq.jpg" alt="" />
            <span className={styles.wechat}>
              <i>
                <Wechat theme="filled" size="40" fill="#67b114" />
              </i>
              <h5>官方微信公众号</h5>
              <img style={{ width: 148 }} src="https://cdn.h5ds.com/wechat.jpg" alt="" />
            </span>
          </div>
        </div>
      </Modal>
      <a onClick={() => setVisible(true)} className={styles.us}>
        <Info theme="outline" size="22" fill="var(--theme-icon)" />
        关于我们
      </a>
    </>
  );
}
