import BasicService from './BasicService';
import { user } from '@stores/user';
import { util } from '@utils/index';

const _window = window as any;

/**
 * @desc 测试用
 */
class UserService extends BasicService {
  constructor() {
    super();
    // 保存token
    if (user.token) {
      super._setRqHeaderToken(user.token);
    }
  }

  // 获取类型配置
  getTypeTree = async () => {
    // const res = [
    //   { id: 1, key: 'material' },
    //   { id: 2, key: 'template' },
    // ];
    // return [res];
    return await this.get(`/api/v1/common/types/tree`);
  };

  // 获取登录的二维码
  getWxQrcode = async () => {
    //
    return await this.get(`/api/v1/account/login/wqr`);
  };

  // 查询用户是否通过二维码关注
  seekWxLogin = async (sn: string) => {
    return await this.get(`/api/v1/account/login/wset?sn=${sn}`);
  };

  // 获取手机验证码
  getRegisterSMS = async (data: any) => {
    return await this.post(`/api/v1/account/sms/register`, data);
  };

  // 获取登录手机验证码
  getLoginSMS = async (data: any) => {
    return await this.post(`/account/sms/login`, data);
  };

  // 验证码
  getCaptcha = async () => {
    return await this.get(`/api/v1/account/captcha`);
  };

  // 绑定微信-获取二维码
  getBindWeixinCode = async () => {
    return await this.get('/api/v1/account/bind-weixin/wqr');
  };

  // 微信绑定-结果轮训
  bindWeixinSeek = async (sn: string) => {
    return await this.get('/api/v1/account/bind-weixin/wset?sn=' + sn);
  };

  // 发送邮箱验证码
  sendEmailCode = async (data: any) => {
    return await this.post(`/api/v1/account/mail/register`, data);
  };

  // 绑定邮箱
  bindEmail = async (data: any) => {
    return await this.post(`/api/v1/account/mail/bind-email`, data);
  };

  // 绑定手机号 phoneNumber, code
  bindPhone = async (data: { phoneNumber: string; code: string }) => {
    return await this.post(`/api/v1/account/bind-mobile`, data);
  };

  // 绑定手机号，发送验证码 mobile  captchaCode
  getCodeBindMobile = async (data: { mobile: string; captchaCode: string }) => {
    return await this.post(`/api/v1/account/sms/bind-mobile`, data);
  };

  // 找回密码发送手机验证码 mobile captchaCode
  getCodeResetPassword = async (data: { mobile: string; captchaCode: string; captchaKey: string }) => {
    return await this.post(`/api/v1/account/sms/recover-password`, data);
  };

  /**
   * 注册
   * @param {*} registerInfo
   */
  register = async (registerInfo: { username: string; password: string; captchaCode: string }) => {
    return await this.post(`/api/v1/account/register`, registerInfo);
  };

  // 获取app统计数据
  getStatistics = async () => {
    return await this.get(`/api/v1/open/app-statistics`);
  };

  // 登录
  login = async (params: any) => {
    const [res, err] = await this.post(`/api/v1/account/login`, params);
    if (res) {
      this._setRqHeaderToken(res.token);
    } else {
      console.log(err);
    }
    return [res, err];
  };

  // 登录
  loginFvideo = async (params: any) => {
    const [res, err] = await this.post(`https://fvideo.h5ds.com/api/v1/account/login`, params);
    if (res) {
      this._setRqHeaderToken(res.token);
    } else {
      console.log(err);
    }
    return [res, err];
  };

  // 获取签到数据
  userSign = async () => {
    let stDate = util.formatDate(+new Date(), 'YYYY-MM-DD');
    return await this.get('/api/v1/api/user-sign?stDate=' + stDate);
  };

  // 签到
  doUserSign = async () => {
    return await this.post('/api/v1/api/user-sign');
  };

  oauthLogin = async (code: string) => {
    const [res] = await this.get('/api/v1/account/login/provider/qq/user', { params: { code } });
    if (res) {
      this._setRqHeaderToken(res.token);
      user.setToken(res.token);
      user.setUserInfo(res.user);
      return res;
    } else {
      return false;
    }
  };

  // 退出
  logout = async () => {
    const res = await this.get(`/api/v1/account/logout`);
    user.clearUserInfo();
    _window.RouterHistory.push('/');
    return res;
  };

  /**
   * 更新用户信息，如果userInfo包含 avatarUrl,则修改头像，否则修改 nickName、email、telphone
   * @param {*} userInfo
   */
  updateUserInfo = async (userInfo: any) => {
    return await this.put('/api/v1/account/update', userInfo);
  };

  /**
   * 修改密码
   */
  changePassword = async (data: { username: string; password: string; captchaCode: string }) => {
    return await this.post('/api/v1/account/change-password', data);
  };

  /**
   * 找回密码
   * @param {*} data
   */
  findPassword = async (data: { mobile: string; password: string; code: string }) => {
    return await this.post('/api/v1/account/recover-password', data);
  };

  /**
   * 获取用户信息
   */
  getUserDetail = async () => {
    const [res, err] = await this.get('/api/v1/account/info');
    if (err) {
      console.error('登录失效');
      // 退出登录
      user.logout();
      return [res, err];
    }
    user.setUserInfo(res);
    return [res, err];
  };
}

export const userService = new UserService();
