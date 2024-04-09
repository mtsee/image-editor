import styles from './login-register.module.less';
import React, { useState, useEffect } from 'react';
import { Modal } from '@douyinfe/semi-ui';
import LoginRegisterBox from './loginRegisterBox/LoginRegisterBox';
import { user } from '@stores/user';
import { pubsub } from '@utils/index';
import { Close } from '@icon-park/react';

function LoginRegister({ children }: any) {
  const [visible, setVisible] = useState(false);

  const showVisible = () => {
    if (!user.info) {
      setVisible(true);
    } else {
      console.log(user.info);
      console.warn('已经登录过了');
      // history.push(location.pathname);
    }
  };

  useEffect(() => {
    pubsub.subscribe('showLoginModal', (_eventName: string, mark: boolean) => {
      if (mark !== undefined) {
        setVisible(mark);
      } else {
        setVisible(true);
      }
    });
    return () => {
      pubsub.unsubscribe('showLoginModal');
    };
  }, []);

  return (
    <div className={styles.loginRegister}>
      {children ? (
        <span onClick={showVisible}>{children}</span>
      ) : (
        <a onClick={showVisible} className={styles.loginRegisterBtn}>
          登录/注册
        </a>
      )}
      <Modal
        className="loginRegisterModal"
        style={{ padding: 0 }}
        bodyStyle={{ padding: 0, margin: 0, border: 'none' }}
        title={null}
        width={836}
        visible={visible}
        zIndex={2000}
        footer={null}
        closeIcon={<Close />}
        onCancel={() => setVisible(false)}
      >
        {visible && <LoginRegisterBox />}
      </Modal>
    </div>
  );
}

export default LoginRegister;
