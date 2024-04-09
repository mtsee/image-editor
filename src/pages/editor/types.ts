export interface SourceItem {
  application_id: number;
  attrs: {
    size?: number; // 文件大小
    type?: string; // 文件类型
    wave?: string; // 音波json
    frames?: string; // 帧图
    width?: number;
    height?: number;
    naturalWidth?: number;
    naturalHeight?: number;
    videoHeight?: number;
    videoWidth?: number;
    duration?: number;
    rotate?: boolean; // 视频是否旋转了
    hasAduioTrack?: boolean; // 视频是否有音轨
  };
  category_id: string; // 分类id
  convert_status: number; // 编码状态，服务器转码
  createdAt: string; // 创建时间
  deletedAt: string; // 删除时间
  id: string; // id
  name: string; // 素材名称
  size: number; // 素材大小kb
  sort: number; // 排序
  sub_type: string; // 类型video, image, audio
  tag: string; // 标签
  type?: string; // 文件类型
  updatedAt: string; // 更新时间
  urls: {
    url: string; // 原始地址
    thumb: string; // 封面图
  };
  user_id: string; // 用户id
}
