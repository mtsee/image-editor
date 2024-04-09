/* eslint-disable prettier/prettier */
import { config } from '../config';

function safeGet(data: any) {
  try {
    return JSON.parse(data);
  } catch (e) {
    return null;
  }
}

/**
 * 如果key = 'x-token' 或者 'x-user-info' 需要加密和解密。
 */
class WebStorage {
  SECRET_KEY: string;
  _storage: any;

  constructor(storage: any) {
    // 用于加密字的符串
    this.SECRET_KEY = '7NlEQ@10';
    this._storage = storage;
  }

  randomID(randomLength = 8) {
    return Number(Math.random().toString().substr(3, randomLength) + Date.now()).toString(36);
  }

  get(key: string) {
    let data = null;
    if (config.prefix) {
      data = this._storage.getItem(`${config.prefix}-${key}`);
    } else {
      data = this._storage.getItem(`${key}`);
    }
    return safeGet(data);
  }

  set(key: string, value: any) {
    let valueStr: any = '';
    if (typeof value !== 'boolean') {
      valueStr = JSON.stringify(value);
    } else {
      valueStr = value;
    }
    if (config.prefix) {
      this._storage.setItem(`${config.prefix}-${key}`, valueStr);
    } else {
      this._storage.setItem(`${key}`, valueStr);
    }
  }

  remove(key: string) {
    if (config.prefix) {
      this._storage.removeItem(`${config.prefix}-${key}`);
    } else {
      this._storage.removeItem(`${key}`);
    }
  }

  clear() {
    this._storage.clear();
  }
}

class MemoryStorage {
  $dataMap: Map<string, number>;
  constructor() {
    this.$dataMap = new Map();
  }
  get(key: string): void {
    if (config.prefix) {
      this.$dataMap.get(`${config.prefix}-${key}`);
    } else {
      this.$dataMap.get(`${key}`);
    }
  }

  set(key: string, value: any) {
    if (config.prefix) {
      this.$dataMap.set(`${config.prefix}-${key}`, value);
    } else {
      this.$dataMap.set(`${key}`, value);
    }
  }

  remove(key: string) {
    if (config.prefix) {
      this.$dataMap.delete(`${config.prefix}-${key}`);
    } else {
      this.$dataMap.delete(`${key}`);
    }
  }
}

// class CookieStorage {
//   get(key) {}

//   set(key, value) {}

//   remove(key) {}
// }
export const storage = {
  local: new WebStorage(localStorage),
  session: new WebStorage(sessionStorage),
  memory: new MemoryStorage(),
  // cookie: new CookieStorage(),
};
