import styles from './user.module.less';
import { Avatar } from '@douyinfe/semi-ui';
import { VipOne, Workbench, Power, People, Theme } from '@icon-park/react';
import { observer } from 'mobx-react';
import { user } from '@stores/user';
import classNames from 'classnames';
import { theme, ThemeName } from '@theme';
import { editor } from '@stores/editor';
// import { language } from '@language/language';
import { Intl } from '@language/index';

export interface IProps {}

function User(props: IProps) {
  const info = user.info;
  const vip_status = info.vip_status;
  editor.themeUpdateKey;
  return (
    <div className={styles.user}>
      <div className={styles.photo}>
        <Avatar src={info.avatar} size="medium" color="red">
          {info.nick_name}
        </Avatar>
        <span className={styles.right}>
          <h3>{info.nick_name}</h3>
          <p>
            <em>用户ID: </em>
            {info.id}
          </p>
        </span>
      </div>
      <div
        className={classNames(styles.vipTips, {
          [styles.noVipTips]: vip_status === 0,
        })}
      >
        <VipOne theme="filled" size="35" fill={vip_status === 0 ? '#cecece' : '#FF9431'} />
        <span className={styles.right}>
          <h3>VIP用户</h3>
          <p>
            {vip_status === 1 && (
              <>
                <span>
                  <em>到期时间: </em>
                  {info.vip_expire}
                </span>
                <a href="#">续费</a>
              </>
            )}
            {vip_status === 0 && <a href="#">开通会员{'>'}</a>}
          </p>
        </span>
      </div>
      <div className={styles.menus}>
        <ul>
          <a href="/workspace/user/draft" target="_blank">
            <li>
              <span>
                <Workbench theme="filled" size="16" fill="#333" />
                <span>
                  <Intl name="user_workspace" />
                </span>
              </span>
            </li>
          </a>
          <a href="/user/account" target="_blank">
            <li>
              <span>
                <People theme="filled" size="16" fill="#333" />
                <span>
                  <Intl name="user_center" />
                </span>
              </span>
            </li>
          </a>
          {/* <li
            onClick={() => {
              if (language.getLanguage() === 'en-US') {
                language.setLanguage('zh-CN');
                editor.languageUpdateKey = 'zh-CN';
              } else {
                language.setLanguage('en-US');
                editor.languageUpdateKey = 'en-US';
              }
            }}
          >
            <span>
              <International theme="filled" size="16" fill="#333" />
              <span>
                <Intl name="user_language" />
              </span>
            </span>
            <span className={styles.right}>{language.getLanguage() === 'en-US' ? 'English' : '中文'}</span>
          </li> */}
          <li
            onClick={() => {
              if (theme.getTheme() === 'dark') {
                theme.setTheme(ThemeName.LIGHT);
                if (editor.ruler) {
                  editor.ruler.changeTheme('light');
                }
              } else {
                theme.setTheme(ThemeName.DARK);
                if (editor.ruler) {
                  editor.ruler.changeTheme('dark2');
                }
              }
              editor.themeUpdateKey = theme.getTheme();
            }}
          >
            <span>
              <Theme theme="filled" size="16" fill="#333" />
              <span>
                <Intl name="user_theme" />
              </span>
            </span>
            <span className={styles.right}>{theme.getTheme() === 'dark' ? '黑色主题' : '浅色主题'}</span>
          </li>
          <li>
            <span
              onClick={() => {
                user.logout();
              }}
            >
              <Power theme="filled" size="16" fill="#333" />
              <span>
                <Intl name="user_logout" />
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default observer(User);
