// import styles from './index-layout.module.less';

import React, { useEffect } from 'react';
import { renderRoutes } from 'react-router-config';
import { checkAuth } from '@utils/checkAuth';
import { userService } from '@server/index';
import PageLoading from '@components/page-loading';
// import Header from '@components/header';
import { inject, observer } from 'mobx-react';
import { Spin } from '@douyinfe/semi-ui';
import { user } from '@stores/user';

function IndexLayout({ route }: any) {
  useEffect(() => {
    if (user.token && !user.info) {
      userService.getUserDetail();
    }
  }, []);

  if (checkAuth() && !user.info) {
    return <Spin />;
  }

  return (
    <>
      {/* <Header /> */}
      <PageLoading />
      {renderRoutes(route.routes)}
    </>
  );
}
export default observer(IndexLayout);
