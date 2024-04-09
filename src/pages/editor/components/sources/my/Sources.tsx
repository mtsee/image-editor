import styles from './sources.module.less';
import { Tabs, TabPane, Empty } from '@douyinfe/semi-ui';
import List from './List';
import { observer } from 'mobx-react';
import { user } from '@stores/user';
import Login from '@components/login';
import { IllustrationNoAccess, IllustrationNoAccessDark } from '@douyinfe/semi-illustrations';
export interface IProps {
  show: boolean;
}

function Sources(props: IProps) {
  return (
    <div className={styles.sources} style={{ display: props.show ? 'block' : 'none' }}>
      {user.info ? (
        <Tabs lazyRender={true} className={styles.tabs} type="line">
          <TabPane tab="当前项目" itemKey="1">
            <List type="local" />
          </TabPane>
          <TabPane tab="全部素材" itemKey="2">
            <List type="cloud" />
          </TabPane>
        </Tabs>
      ) : (
        <div className={styles.unlogin}>
          <span>
            <Empty
              image={<IllustrationNoAccess style={{ width: 150, height: 150 }} />}
              darkModeImage={<IllustrationNoAccessDark style={{ width: 150, height: 150 }} />}
              description={
                <div className={styles.loginTip}>
                  您还未登录，请先
                  <Login>
                    <a>登录系统</a>
                  </Login>
                </div>
              }
              style={{ padding: 30 }}
            />
          </span>
        </div>
      )}
    </div>
  );
}

export default observer(Sources);
