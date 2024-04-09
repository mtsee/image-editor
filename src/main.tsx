import '@less/initialize.less';
// import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { Provider } from 'mobx-react';
import { stores } from './stores';
import { BrowserRouter } from 'react-router-dom'; // 路由
import { routes } from './routes.config';
import { isChromeVersionGreaterThan } from '@utils/checkWeb';

// 如果不是新版本谷歌浏览器，直接让其下载
// if (!isChromeVersionGreaterThan(98)) {
//   ReactDOM.createRoot(document.getElementById('root')!).render(
//     <div className="downChrome">
//       <span>
//         <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" width="60" height="60">
//           <path
//             d="M979.038 323.027h-467.02c-104.376-0.102-189.073 84.428-189.178 188.805a188.99 188.99 0 0 0 24.126 92.582L113.457 203.752C283.536-16.374 599.86-56.944 819.987 113.135a503.682 503.682 0 0 1 159.051 209.892z"
//             fill="#F44336"
//           ></path>
//           <path
//             d="M1015.996 512.019c-0.232 278.243-225.735 503.745-503.977 503.977a449.508 449.508 0 0 1-62.997-4.2l226.79-405.281c51.978-90.488 20.993-205.972-69.298-258.289a187.231 187.231 0 0 0-94.076-25.199h466.598a496.908 496.908 0 0 1 36.96 188.992z"
//             fill="#FFC107"
//           ></path>
//           <path
//             d="M675.811 606.515l-226.79 405.282h-0.419C172.62 976.928-22.84 724.932 12.028 448.949a503.688 503.688 0 0 1 101.43-245.197l233.508 400.662 1.26 2.1c52.073 90.46 167.618 121.58 258.078 69.508a188.976 188.976 0 0 0 69.507-69.507z"
//             fill="#4CAF50"
//           ></path>
//           <path
//             d="M678.411 608.015c-52.9 91.896-170.278 123.508-262.174 70.61a192.005 192.005 0 0 1-70.61-70.61l-1.28-2.134c-51.84-92.498-18.878-209.507 73.62-261.346a192 192 0 0 1 94.052-24.51h0.426a190.203 190.203 0 0 1 95.57 25.6c91.725 53.15 123.2 170.466 70.396 262.39z"
//             fill="#F44336"
//           ></path>
//           <path
//             d="M675.811 606.515c-52.073 90.46-167.617 121.578-258.077 69.507a189.005 189.005 0 0 1-69.508-69.507l-1.26-2.1c-51.03-91.053-18.582-206.234 72.47-257.264a189 189 0 0 1 92.583-24.126h0.419a187.231 187.231 0 0 1 94.076 25.2c90.293 52.318 121.276 167.802 69.297 258.29z"
//             fill="#2196F3"
//           ></path>
//           <path
//             d="M511.306 722.01a208.48 208.48 0 0 1-104.282-27.97 210.765 210.765 0 0 1-76.982-77.025c-57.987-100.437-23.575-228.864 76.862-286.851a210.013 210.013 0 0 1 105.117-28.134c115.973-0.09 210.064 93.854 210.152 209.827a209.983 209.983 0 0 1-28.134 105.158A211.168 211.168 0 0 1 511.306 722.01z m1.09-377.983a167.531 167.531 0 0 0-146.111 83.997c-46.39 80.44-18.787 183.257 61.652 229.646s183.257 18.787 229.646-61.652c46.39-80.35 18.86-183.092-61.489-229.483a168 168 0 0 0-83.656-22.506h-0.041z"
//             fill="#FAFAFA"
//           ></path>
//         </svg>
//       </span>
//       <h1>各位义父</h1>
//       <p>为了更好的体验，请使用最新版的谷歌浏览器</p>
//       <a href="https://www.google.cn/intl/zh-CN/chrome/">下载 Chrome</a>
//     </div>,
//   );
// } else {
//   ReactDOM.createRoot(document.getElementById('root')!).render(
//     <Provider {...stores}>
//       <App Router={BrowserRouter} routes={routes} />
//     </Provider>,
//   );
// }

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider {...stores}>
    <App Router={BrowserRouter} routes={routes} />
  </Provider>,
);

export { routes };
