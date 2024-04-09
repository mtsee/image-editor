/* eslint-disable prettier/prettier */
/**
 * 日志相关业务处理
 */
class LogReport {
  constructor() {

    //@ts-ignore
    this.debug = window.debug;
  }

  /**
   * 获取当前错误数据
   * @param {object} param {msg, apiUrl = '', codeLine = '', codeName = '', error}
   * @returns
   */
  getParams({ msg = '', apiUrl = '', codeName = '', codeLine = '', error }: any) {
    return {
      ua: window.navigator.userAgent,
      errUrl: window.location.href,
      msg, // 错误的具体信息
      apiUrl, // 错误所在的url
      codeLine, // 错误所在的行
      codeName, // 代码模块名称
      error // 具体的error对象
    };
  }

  error(params: any) {
    console.error(this.getParams(params));
  }

  warn(params: any) {
    console.warn(this.getParams(params));
  }

  log(params: any) {
    console.log(this.getParams(params));
  }
}

const logReport = new LogReport();

export { logReport };
