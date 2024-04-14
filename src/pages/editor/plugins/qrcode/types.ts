import type { BaseLayer } from '@core/types/data';

// 二维码
export interface QrcodeLayer extends BaseLayer {
  type: 'qrcode';
  // 镜像翻转，上下，左右
  flipx: boolean;
  flipy: boolean;
  width: number;
  height: number;
  content: string; // qrcode的内容
  lightcolor: string; // 背景色
  darkcolor: string; // 黑色
  cornerRadius: [number, number, number, number]; // 圆角
}
