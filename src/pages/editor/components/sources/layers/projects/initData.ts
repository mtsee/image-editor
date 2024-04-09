import { ViewData } from '@pages/editor/core/types/data';
import { util } from '@utils/index';

export function getInitData(): ViewData {
  const pid = util.createID();
  return {
    name: '未命名',
    desc: '暂无描述',
    version: '1.0.0',
    thumb: '',
    createTime: 0,
    updateTime: 0,
    selectPageId: pid,
    pages: [
      {
        id: pid,
        name: '第一页',
        desc: '暂无描述',
        width: 1242,
        height: 2208,
        background: {
          type: 'solid',
          color: '#fff',
        },
        layers: [],
      },
    ],
  };
}
