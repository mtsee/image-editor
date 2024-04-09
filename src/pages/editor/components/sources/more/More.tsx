import styles from './more.module.less';
import WaterFull from '@components/water-full';
import { PayCodeOne, VipOne, ChartHistogramOne, StereoPerspective, BarCode, Audit, Search } from '@icon-park/react';
import { DanMuIcon } from './icon';
import { addItem } from '../addItem';
import { editor } from '@stores/editor';
import { Toast } from '@douyinfe/semi-ui';

export interface IProps {
  show: boolean;
}
let hasRender = false;

export default function More(props: IProps) {
  if (!hasRender) {
    if (props.show) {
      hasRender = true;
    } else {
      return null;
    }
  }

  const addPlus = d => {
    console.log('添加插件', d);
    Toast.warning('作者还没时间搞，等你贡献代码');
    // switch (d.id) {
    //   case 'chart':
    //     addItem({ type: 'echart' });
    //     break;
    //   case 'model3D':
    //     addItem({ type: 'model3D' });
    //     break;
    // }
  };

  return (
    <div style={{ height: '100%', display: props.show ? 'block' : 'none' }}>
      <div className={styles.moreList + ' scroll'}>
        <h1 className={styles.title}>更多插件</h1>
        <WaterFull
          itemWidth={60}
          itemClassName={styles.waterfull}
          item={(d: any) => {
            return (
              <div
                onClick={() => {
                  addPlus(d);
                }}
                className={styles.item}
              >
                <span>
                  {d.icon}
                  <p>
                    {d.vip && <VipOne theme="filled" size="14" fill="#FFA24D" />}
                    {d.name}
                  </p>
                </span>
              </div>
            );
          }}
          list={[
            {
              id: 'ewm',
              name: '二维码',
              icon: <PayCodeOne theme="filled" size="25" fill="var(--theme-icon)" />,
            },
            {
              id: 'txm',
              name: '条形码',
              icon: <BarCode theme="filled" size="25" fill="var(--theme-icon)" />,
            },
            {
              id: 'chart',
              name: '图表',
              vip: false,
              icon: <ChartHistogramOne theme="filled" size="25" fill="var(--theme-icon)" />,
            },
            {
              id: 'watermark',
              name: '水印',
              vip: false,
              icon: <Audit theme="filled" size="25" fill="var(--theme-icon)" />,
            },
          ].map(d => {
            return { ...d, width: 100, height: 100 };
          })}
        />
      </div>
    </div>
  );
}
