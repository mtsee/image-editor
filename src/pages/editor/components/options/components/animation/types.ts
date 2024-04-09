import { AnimationType, AnimationFrame } from '@video/core/src/react-pixi/types/data';

// type: 'enter',
// name: '从下渐入',
// ename: 'fadeInDown',
// id: 'fadeInDown',
// frames: [
//   { id: '1', progress: 0, alpha: 0, transform: { translateY: -100 } },
//   { id: '2', progress: 1, alpha: 1, transform: { translateY: 0 } },
// ],

export interface AnimationItem {
  id: string;
  type: AnimationType;
  name: string;
  ename: string;
  tips: string;
  frames: Partial<AnimationFrame>[];
}
