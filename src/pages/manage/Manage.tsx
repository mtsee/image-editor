import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { Button } from '@douyinfe/semi-ui';
import { pubsub } from '@utils/index';
import { userService } from '@server/index';
import { user } from '@stores/user';

function Manage() {
  const startPageLoading = () => {
    pubsub.publish('pageLoading', {
      start: true,
    });
  };

  const endPageLoading = () => {
    pubsub.publish('pageLoading', {
      end: true,
    });
  };

  return (
    <div>
      登录后的页面
      <img style={{ width: 100 }} src={user.info?.avatarUrl} alt="" />
      <Button onClick={startPageLoading}>page loading start</Button>
      <Button onClick={endPageLoading}>page loading end</Button>
      <Button onClick={() => userService.logout()}>logout</Button>
    </div>
  );
}

export default Manage;
