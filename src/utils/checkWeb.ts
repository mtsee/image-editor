// 检测是否为谷歌浏览器
export function isChrome() {
  return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
}

// 获取谷歌浏览器的版本号
export function getChromeVersion() {
  const match = navigator.userAgent.match(/Chrome\/(\d+)/);
  return match ? parseInt(match[1], 10) : 0;
}

// 检查谷歌浏览器版本是否大于98
export function isChromeVersionGreaterThan(ver: number) {
  const chromeVersion = getChromeVersion();
  return chromeVersion && chromeVersion > ver;
}
