import styles from './style.module.less';
import React, { useEffect, useRef, useReducer } from 'react';
import { pubsub } from '@utils/pubsub';
import { Progress } from '@douyinfe/semi-ui';

export interface ProgressData {
  progress: number; // 手动传入进度：?: number | undefined
  start: boolean; // 开始 ?: boolen
  end: boolean; // 结束 ?:boolen
  time: number; // 默认加载时间间隔
}

/**
 * 用法：
 * pubsub.publish('pageLoading', {
      start: true
   });
   pubsub.publish('pageLoading', {
      end: true
    });
 */
export default function PageLoading() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const val = useRef<any>(null);
  const reRender = useRef(0);
  const timer = useRef<any>();

  const autoLoading = (time = 50) => {
    timer.current = setTimeout(() => {
      val.current = val.current + (90 - val.current) / 10;
      forceUpdate();
      autoLoading();
    }, time);
  };

  useEffect(() => {
    /**
     * data: {
     * progress: undefined,  // 手动传入进度：?: number | undefined
     * start,  // 开始 ?: boolen
     * end,  // 结束 ?:boolen
     * time: 1000 // 默认加载时间间隔
     * }
     */
    pubsub.subscribe('pageLoading', (_eventName, data: ProgressData) => {
      console.log('data--->', data);
      if (timer.current) {
        reRender.current++;
        clearTimeout(timer.current);
        timer.current = null;
      }

      if (data.progress !== undefined) {
        val.current = data.progress;
        forceUpdate();
      } else if (data.start) {
        val.current = 0;
        forceUpdate();
        autoLoading(data.time);
      } else if (data.end) {
        val.current = 100;
        forceUpdate();
        timer.current = setTimeout(() => {
          val.current = null;
          forceUpdate();
        }, 400);
      }
    });
    return () => {
      clearTimeout(timer.current);
      pubsub.unsubscribe('pageLoading');
    };
  }, []);

  if (val.current === null) {
    return null;
  }

  return (
    <div className={styles.loading}>
      <Progress
        key={reRender.current}
        showInfo={false}
        strokeWidth={3}
        percent={val.current}
        // strokeColor="#FF7900"
        // trailColor="#ffd7b4"
        size="small"
      />
    </div>
  );
}
