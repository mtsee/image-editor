import type { IImagePaintMode, IText, IPointData, IShadowEffect, IBlendMode, IPaint } from '@leafer-ui/interface';

export type ENV = 'editor' | 'preview';

/**
 * 数据说明：
 * x，y是相对元素中心点来定位的
 */

/**
 * 整体数据
 */
export interface ViewData {
  name: string; // 名称
  desc: string; // 描述
  version: string; // 版本号
  thumb: string; // 封面图
  selectPageId: string; // 选中的页面ID
  createTime: number; // 创建时间（时间戳）
  updateTime: number; // 更新时间（时间戳）
  pages: BasePage[]; // 支持多页面
}

export interface ExLayerConfig {
  pid: string; // 插件ID
  version: string; // 版本号
}

// export { Layer, LayerData, Options, config };
// export type { types };
export interface ExLayer {
  Layer: JSX.Element;
  Options: JSX.Element;
  LayerData: BaseLayer;
  config: ExLayerConfig;
}

/**
 * 单张图数据
 */
export interface BasePage {
  id: string; // 标识
  name: string; // 页面名称
  desc: string; // 页面描述
  width: number;
  height: number;
  thumb?: string; // 封面图
  background: IPaint;
  layers: BaseLayer[]; // 元素
}

export type LayerType = 'image' | 'text' | 'shape' | 'group' | string; // 其他

/**
 * 图层
 */
export interface BaseLayer {
  id: string;
  name: string;
  desc: string;
  x: number;
  y: number;
  type: LayerType;
  blur: number; // 模糊
  border: {
    stroke: string; // 边框色
    dashPattern?: number[];
    dashOffset?: number;
    strokeWidth: number;
    visible: boolean;
  };
  blendMode: IBlendMode; // 混合模式
  opacity: number;
  rotation: number; // 旋转 0~360
  shadow: IShadowEffect; // 阴影
  _unKeepRatio?: boolean; // 控制器不保持等比缩放
  _ratio?: number;
  _dirty: string; // 用于视图更新
  _lock: boolean; // 是否锁定
  _hide: boolean; // 是否隐藏
  extend?: any; // 扩展字段
}

/**
 * 图层：图片、文本、形状&线条、组、二维码、图表、表格、代码、容器
 */

// 图片
export interface ImageLayer extends BaseLayer {
  type: 'image';
  width: number;
  height: number;
  naturalHeight: number;
  naturalWidth: number;
  // 镜像翻转，上下，左右
  flipx: boolean;
  flipy: boolean;
  cropSize?: { x: number; y: number; width: number; height: number }; // 裁剪
  svgColors?: string[]; // svg颜色值
  svgColorType?: 'one' | 'more'; // 单色，多色
  url: string; // 图片链接
  cornerRadius: [number, number, number, number]; // 圆角
}

// 文本
export interface TextLayer extends BaseLayer {
  type: 'text';
  // 文字样式
  fontFamilyURL: string; // 字体路径
  text: string; // 内容
  fill: string; // 文字容器的颜色
  textStyle: Partial<IText>; // 文字样式
}

// 形状：矩形、圆、线条、多边形、星形
export interface ShapeRectLayer extends BaseLayer {
  type: 'shape';
  shape: 'rect';
  width: number;
  height: number;
  cornerRadius: [number, number, number, number]; // 圆角
}
export interface ShapeEllipseLayer extends BaseLayer {
  type: 'shape';
  shape: 'ellipse';
  width: number;
  height: number;
  startAngle: number; // 弧形的起始角度, 取值范围为 -180 ～ 180。
  endAngle: number; // 弧形的结束角度, 取值范围为 -180 ～ 180。
  innerRadius: number; // 内半径比例, 取值范围为 0.0 ～ 1.0。
}
export interface ShapeLineLayer extends BaseLayer {
  type: 'shape';
  shape: 'line';
  width: number;
  rotation: number;
  toPoint: IPointData;
  cornerRadius: number; //圆角大小，使折线拐角处变的圆滑。
  points?: number[]; // 通过坐标组 [ x1,y1, x2,y2, ...] 绘制折线。
  curve?: boolean | number; // 是否转换为平滑路径，默认为 false。  可设置 0 ～ 1 控制曲率，默认为 0.5。
}
export interface ShapePolygonLayer extends BaseLayer {
  type: 'shape';
  shape: 'polygon';
  width: number;
  height: number;
  sides: number; // 正多边形的边数，取值范围为 >=3。内部逻辑：在一个圆上每 (360 / sides) 度取一个点，再将点连成线，组成一个正多边形。
  cornerRadius: number; //圆角大小，使折线拐角处变的圆滑。
  points?: number[]; // 通过坐标组 [ x1,y1, x2,y2, ...] 绘制折线。
  curve?: boolean | number; // 是否转换为平滑路径，默认为 false。  可设置 0 ～ 1 控制曲率，默认为 0.5。
}
export interface ShapeStarLayer extends BaseLayer {
  type: 'shape';
  shape: 'star';
  width: number;
  height: number;
  corners: number; // 星形的角数，取值范围为 >=3。  内部逻辑：在内外圆上每 (360 / corners) 度取一个点，再将点连成线，组成一个多角星形。
  innerRadius: number; // 内半径比例，默认 0.382，取值范围为 0.0 ～ 1.0。
  cornerRadius: number; //圆角大小，使折线拐角处变的圆滑。
}

export type ShapeLayer = ShapeEllipseLayer | ShapeLineLayer | ShapePolygonLayer | ShapeRectLayer | ShapeStarLayer;

// 组
export interface GroupLayer extends BaseLayer {
  type: 'group';
  childs: BaseLayer[];
}

// 图表
export interface ChartLayer extends BaseLayer {
  width: number;
  height: number;
  data: Record<string, any>; // 图表数据
  options: Record<string, any>; // 图表配置
}
