import styles from './login-register-box.module.less';
import React, { useState, useEffect, useRef } from 'react';
import { config } from '@config/index';
import { Divider, Toast } from '@douyinfe/semi-ui';
import LoginQrcode from '../loginQrcode';
import LoginMobile from '../loginMobile';
import { userService } from '@server/index';
import { withRouter } from 'react-router-dom';
import { Wechat, Phone, Check } from '@icon-park/react';

function LoginRegisterBox() {
  const [show, setShow] = useState('loginQrcode');

  const showOAuthWindow = () => {
    let url = `${config.apiHost}/account/login/provider/qq?type=login`;
    window.open(url, '', 'width=500,height=500,channelmode=yes');
  };

  const handlePostMessage = async (evt: any) => {
    if (evt.data.msgType !== 'oauth-login') {
      return;
    }
    const { provider, code } = evt.data;
    if (provider) {
      const hide = Toast.info('登录中，请稍后');
      await userService.oauthLogin(code);
      Toast.close(hide);
      (window as any).RouterHistory.push(location.pathname);
    }
  };

  useEffect(() => {
    window.addEventListener('message', handlePostMessage);
    return () => {
      window.removeEventListener('message', handlePostMessage);
    };
  });

  return (
    <div className={styles.loginRegisterBox}>
      <div className={styles.loginRegisterInfo}>
        <h1>无界云图</h1>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          免费开源，可扩展
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          海量模版免费使用
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          支持AI功能集成
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          操作简单，高效简洁
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          多人协同效率翻倍
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          提供海量素材免费使用
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          无需下载，打开浏览器即可使用
        </p>
        <p>
          <Check theme="filled" size="16" fill="#98ff00" />
          云存储，资源安全可靠
        </p>
      </div>
      <div className={styles.loginRegisterForm}>
        <div className={styles.loginRegisterTabs}>
          {show === 'loginQrcode' && <LoginQrcode />}
          {show === 'loginMobile' && <LoginMobile setShow={setShow} />}
        </div>
        <Divider>其他登录方式</Divider>
        <div className={styles.loginRegisterActions}>
          <a className={styles.item} onClick={() => setShow('loginMobile')}>
            <Phone theme="filled" size="24" fill="#666" />
            <span>手机登录</span>
          </a>
          <a className={styles.item} onClick={() => setShow('loginQrcode')}>
            <Wechat theme="filled" size="24" fill="#666" />
            <span>微信登录</span>
          </a>
        </div>
      </div>
    </div>
  );
}

export default withRouter(LoginRegisterBox);
