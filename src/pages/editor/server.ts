import BasicService from '@server/BasicService';
class Server extends BasicService {
  /**
   * @desc 创建视频
   */
  createApp = data => {
    return this.post('/api/v1/user/apps/create', data);
  };
  /**
   * 获取用户作品详情
   * @param {string} workbench.schema
   * @param {string} id
   * @returns
   */
  getAppDetail = id => this.get('/api/v1/user/apps/info', { params: { id } });
  /**
   * 删除作品
   * @param {} workbench.schema
   * @param {*} params
   * @param {*} id
   * @returns
   */
  deleteApp = params => this.post('/api/v1/user/apps/delete', params);
  /**
   * 更新草稿
   * @param {*} id
   * @param {*} params
   * @returns
   */
  updateApp = params => this.post('/api/v1/user/apps/update', params);

  // 上传base64图片
  uploadBase64 = (params: { content: string; name: string; file_type?: string }) => {
    return this.post(`/api/v1/common/upload/base64`, {
      ...params,
      is_original_name: 0,
      prefix_path: '/uploads',
      disk: 'oss',
      client: 'public',
    });
  };
}

export const server = new Server();
