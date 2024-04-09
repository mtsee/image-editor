// 配置
const config = {
  secretKey: 'x&S#acLCx', //
  apiHost: '',
  prefix: 'img', // 项目前缀，用于设置localStroage的名称
  resourcesHost: 'https://cdn.h5ds.com', // CDN资源路径
  host: 'https://video.h5ds.com', // 二维码扫描有用到
  basename: 'editor', // history路由前缀
  env: 'dev',
  templateHost: 'https://www.h5ds.cn',
};

// 生产环境参数
if (import.meta.env.PROD) {
  config.env = 'prod';
  config.apiHost = (window as any).apiHost || '';
}

export { config };
