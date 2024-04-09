import styles from './mainlayout.module.less';

import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { checkAuth } from '@utils/checkAuth';
import { userService } from '@server/index';
import PageLoading from '@components/page-loading';
import { observer } from 'mobx-react';
import { Spin } from '@douyinfe/semi-ui';
import { user } from '@stores/user';

function MainLayout({ route }: any) {
  useEffect(() => {
    if (checkAuth() && !user.info) {
      userService.getUserDetail();
    }
  }, []);

  console.log('checkAuth()', checkAuth());

  if (checkAuth() && !user.info) {
    return <Spin />;
  }

  if (!user.info) {
    return <div>没有访问权限</div>;
  }

  return (
    <>
      <PageLoading />
      <div className={styles.manage}>{renderRoutes(route.routes)}</div>
    </>
  );
}
export default observer(MainLayout);
