import { enUS } from './enUS';
import { storage, pubsub } from '@utils/index';
import { zhCN } from './zhCN';

export type ValueType = 'zh-CN' | 'en-US';

export const locals: any = {
  'zh-CN': zhCN,
  'en-US': enUS,
};

const _window = window as any;
/**
 * 国际化处理
 */
class Language {
  constructor() {
    _window.language = storage.local.get('language') || 'zh-CN';
    storage.local.set('language', _window.language);
  }

  // get pubsub() {
  //   return this.pubsub;
  // }

  // set pubsub(p) {
  //   this.pubsub = p;
  // }

  /**
   * 国际化语言
   * @param {string} name 字段名称
   * @param {object} data 模板参数：默认是undefined
   * @param {string} type 语言类型，默认是undefined
   */
  val(name: string, data?: any, type?: ValueType) {
    if (!_window.language) {
      _window.language = storage.local.get('language') || 'zh-CN';
    }
    let str = locals[type || _window.language][name] || 'not found';
    if (data) {
      for (const key in data) {
        str = str.replaceAll(`{{${key}}}`, data[key]);
      }
    }
    return str;
  }

  /**
   * 反向查找语言
   * @param {string} value 当前的值
   * @param {string} type 当前的值属于那个语言类型
   */
  findVal(value: string, valueType = 'zh-CN') {
    if (!_window.language) {
      _window.language = storage.local.get('language') || 'zh-CN';
    }
    for (const key in locals[valueType]) {
      if (locals[valueType][key] === value) {
        return locals[_window.language][key];
      }
    }
    return 'Unknow';
  }

  getLanguage(): ValueType {
    return _window.language || storage.local.get('language') || 'zh-CN';
  }

  setLanguage(type: ValueType) {
    storage.local.set('language', type);
    _window.language = type;
    if (pubsub) {
      // 更新视图
      pubsub.publish('setLanguage', type);
    }
  }
}

export const language = new Language();
