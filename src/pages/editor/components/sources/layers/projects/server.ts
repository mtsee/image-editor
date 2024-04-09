import BasicService from '@server/BasicService';
class Server extends BasicService {
  /**
   * @desc 创建视频
   */
  createVideo = async data => {
    return await this.post('/api/v1/user/apps/create', data);
  };
  /**
   * 获取用户作品最大数量信息
   * @param {string} schema
   * @returns
   */
  getAppCountInfo = async () => await this.get('/api/v1/user/apps/count-info');
  /**
   * 获取用户作品列表
   * @param {string} schema
   * @param {object} params
   * @returns
   */
  getDraftList = async params => await this.get('/api/v1/user/apps/page', { params });

  /**
   * 获取用户作品详情
   * @param {string} workbench.schema
   * @param {string} id
   * @returns
   */
  getAppsDetail = async id => await this.get('/api/v1/user/apps/info', { params: { id } });

  /**
   * 发布作品
   * @param {*} schema
   * @param {*} id
   * @returns
   */
  publishApps = async params => await this.post('/api/v1/user/apps/publish', params);

  /**
   * 删除作品
   * @param {} workbench.schema
   * @param {*} params
   * @param {*} id
   * @returns
   */
  deleteDraft = async params => await this.post('/api/v1/user/apps/delete', params);
  /**
   * 更新草稿
   * @param {*} id
   * @param {*} params
   * @returns
   */
  updateDraft = async params => await this.post('/api/v1/user/apps/update', params);

  /**
   *
   * @param params category_id ,  ids
   * @returns
   */
  moveDraft = params => this.post('/api/v1/user/apps/move', params);
  /**
   * 复制作品
   * @param {*} workbench.schema
   * @param {*} id
   * @returns
   */
  copyDraft = async params => await this.post('/api/v1/user/apps/copy', params);
}

export const server = new Server();
