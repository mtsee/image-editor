/* eslint-disable prettier/prettier */
import { config } from '../config';

function getNumArr(val: string, secretKey: string) {
  let num = '';
  secretKey.split('').forEach(d => {
    num += d.charCodeAt(0).toString();
  });
  while (num.length < val.length) {
    num += num;
  }
  return num.split('');
}

// 加密
function encrypt(val: string, secretKey: string = config.secretKey) {
  if (!val) {
    return val;
  }
  const numArr = getNumArr(val, secretKey);
  let str = '';
  val.split('').forEach((d, i) => {
    str += String.fromCharCode(d.charCodeAt(0) + parseInt(numArr[i], 10));
  });
  return str;
}

// 解密
function decrypt(secretStr = '', secretKey = config.secretKey) {
  if (!secretStr) {
    return secretStr;
  }
  const numArr = getNumArr(secretStr, secretKey);
  let str = '';
  secretStr.split('').forEach((d, i) => {
    str += String.fromCharCode(d.charCodeAt(0) - parseInt(numArr[i], 10));
  });
  return str;
}

export const crypto = {
  decrypt,
  encrypt
};
