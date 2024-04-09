import { action, observable, transaction } from 'mobx';
import { storage, crypto } from '@utils/index';

/**
 * @desc 存放外部传入的props数据
 */
class User {
  @observable token: string = crypto.encrypt(storage.local.get('token')) || ''; // 外部传入的参数
  @observable info: any = null; // 外部传入的参数

  /**
   * 设置用户信息
   * @param {*} info
   * @param {*} token
   */
  @action
  setUserInfo = (info: any) => {
    this.info = info;
  };

  @action
  getUserInfo = () => {
    return this.info;
  };

  @action
  getToken = () => {
    return this.token;
  };

  @action
  setToken = (token: string) => {
    token = token;
    this.token = token;
    storage.local.set('token', crypto.decrypt(token));
  };

  @action
  updateUserInfo = (values: { [x: string]: any }) => {
    transaction(() => {
      for (let key in values) {
        this.info[key] = values[key];
      }
    });
  };

  @action
  logout = async () => {
    user.clearUserInfo();
    (window as any).RouterHistory.push('/');
  };

  @action
  clearUserInfo = () => {
    transaction(() => {
      this.info = null;
      this.token = '';
    });
    storage.local.remove('token');
  };
}

const user = new User();

export { user, User };
