// 布局名称
export type LayoutName = 'sources' | 'timeline' | 'options' | 'canvas' | 'header';

// 资源面板类型
export type SourceType =
  | 'my'
  | 'template'
  | 'image'
  | 'video'
  | 'audio'
  | 'text'
  | 'filter'
  | 'effect'
  | 'transition'
  | 'lottie'
  | 'background'
  | 'more'
  | string;

// 设置面板类型
export type ElementOptionType = 'basic' | 'animation' | 'colour' | 'caption' | 'mask';
