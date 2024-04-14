import type { BaseLayer } from '@core/types/data';

// 条形码
export interface BarcodeLayer extends BaseLayer {
  type: 'barcode';
  // 镜像翻转，上下，左右
  flipx: boolean;
  flipy: boolean;
  width: number;
  height: number;
  content: string; // qrcode的内容
  color: string; // 背景色
  cornerRadius: [number, number, number, number]; // 圆角
}
