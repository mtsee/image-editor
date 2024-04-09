const token =
  'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC93d3cuaDVkcy5jblwvYXBpXC92MVwvYWNjb3VudFwvbG9naW4iLCJpYXQiOjE3MTIxMTA4ODEsImV4cCI6MTcxMjE0Njg4MSwibmJmIjoxNzEyMTEwODgxLCJqdGkiOiJFRUg5REV4SExsOFY3MXg2Iiwic3ViIjoxLCJwcnYiOiIyM2JkNWM4OTQ5ZjYwMGFkYjM5ZTcwMWM0MDA4NzJkYjdhNTk3NmY3In0.fO4zA2GKawotWXfjB_2t6WWpNlf0LlQAxnmf_0yT6FM';

async function setDesc(id) {
  const res = await $.ajax({
    type: 'get',
    url: `https://www.h5ds.cn/api/v1/admin/templates/${id}`,
    headers: {
      Authorization: token,
    },
  });
  console.log(res);

  const style = JSON.parse(res.data.data.appData).style;

  // 更新
  await $.ajax({
    type: 'put',
    url: `https://www.h5ds.cn/api/v1/admin/templates/${id}`,
    headers: {
      Authorization: token,
    },
    data: {
      description: JSON.stringify(style),
    },
  });
  // console.log('success-' + id, style);
}

async function main() {
  // 一共是16页
  let index = 0;
  for (let page = 2; page < 17; page++) {
    const res = await $.ajax({
      type: 'get',
      url: `https://www.h5ds.cn/api/v1/admin/templates?categoryId=&color_id=&industry_id=&direction_id=&type=2&keyword=&dataStatus=&price_type=&page=${page}`,
      headers: {
        Authorization: token,
      },
    });
    console.log('res--->', res);
    for (let i = 0; i < res.data.data.length; i++) {
      index++;
      const tpl = res.data.data[i];
      await setDesc(tpl.templateId);
      console.log('进度：' + ~~((index / res.data.total) * 100) + '%');
    }
  }
}

main();
