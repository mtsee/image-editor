import BasicService from '@server/BasicService';

class Server extends BasicService {
  // 上传base64图片
  uploadBase64 = async (params: { content: string; name: string; file_type?: string }) => {
    return this.post(`/api/v1/common/upload/base64`, {
      ...params,
      is_original_name: 0,
      prefix_path: '/uploads',
      disk: 'oss',
      client: 'public',
    });
  };

  /**
   * 获取分类列表
   * @param {string} workbench.schema
   * @param {object} params
   * @returns
   */
  getCategoryList = params => this.get('/api/v1/user/categories/page', { params });

  // 获取用户素材
  getUserMaterial = (params: {
    type?: string;
    keyword?: string;
    page: number;
    page_size: number;
    category_id: number; // appid
  }) => {
    return this.get(`/api/v1/user/materials/page`, { params });
  };

  // 新增素材分类
  createUserMaterialCategories = (appid: string) => {
    return this.post(`/api/v1/user/categories/create`, { name: appid, type: 'user_material', pid: 0 });
  };

  // 查询是否存在素材分类
  getUserMaterialInfo = (id: string) => {
    return this.get(`/api/v1/user/categories/info?id=${id}`);
  };

  // 新增素材
  createUserMaterial = (params: {
    category_id?: string; // 直接创建到该分类下面
    app_id?: string;
    name: string;
    urls: Record<string, any>;
    attrs: Record<string, any>;
    size?: number;
  }) => {
    return this.post(`/api/v1/user/materials/create`, { ...params });
  };

  // 删除素材
  deleteMaterial = async (ids: string[]) => {
    console.log('批量删除', ids);
    return this.post(`/api/v1/user/materials/delete`, { id: ids });
  };

  // 表单上传
  formUpdate = formdata => {
    let forms = new FormData();
    formdata.files.forEach((d, i) => {
      forms.append(`files[${i}]`, d);
    });
    return this.post(`/api/v1/common/upload/form`, forms);
  };
}

export const server = new Server();
