import React from 'react';
import styles from './styles.module.less';
import { Button } from '@douyinfe/semi-ui';
import GroupAlign from './GroupAlign';
import GroupFast from './GroupFast';

export interface IProps {}

export default function GroupOption(props: IProps) {
  return (
    <div className={styles.group}>
      <GroupAlign />
      <GroupFast />
    </div>
  );
}
