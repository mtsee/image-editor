import BasicService from './BasicService';

class Demo extends BasicService {
  async getTemplates(page = 1, pageSize = 20) {
    return await this.get(
      `/api/v1/templates/page?type=0&page_size=${pageSize}&categoryId=&price_type=&order_column=is_top&industry_id=&color_id=&keyword=&page=${page}`,
      {
        // 要调用组件
        abortID: 'demoService.getTemplates',
        headers: { Authorization: '' },
      },
    );
  }
}

export const demoService = new Demo();
