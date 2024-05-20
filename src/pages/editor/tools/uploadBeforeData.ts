import { util } from '@utils/index';

/**
 * 上传之前预处理数据
 */
export async function getUploadBeforeData(
  url: string,
  type?: 'image' | 'image/svg' | 'image/gif' | null,
  uploadBase64?: (params: {
    content: string;
    name: string;
    file_type?: 'image' | 'json' | 'txt' | 'font';
  }) => Promise<any>, // 上传base64的接口
) {
  switch (type) {
    case 'image':
    case 'image/svg': {
      // 获取封面图
      // 获取文件大小，真实尺寸
      const info = (await imageThumb(url, 200)) as any;
      if (uploadBase64) {
        const [res] = await uploadBase64({
          content: info._base64,
          name: util.createID() + '.png',
          file_type: 'image',
        });
        return { ...info, thumb: res.storage_path };
      } else {
        return { ...info, _localURL: util.base642URL(info._base64) };
      }
    }
    case 'image/gif': {
      // 获取封面图
      // 获取gif帧图
      // 获取文件大小，真实尺寸
      const info = (await imageThumb(url, 200)) as any;
      let thumb = '';
      if (uploadBase64) {
        thumb = await uploadBase64({
          content: info._base64,
          name: util.createID() + '.png',
          file_type: 'image',
        }).then(res => {
          return res[0]?.storage_path;
        });
      }
      return { ...info, thumb };
    }
    default:
      throw new Error('未知文件类型' + url);
  }
}

/**
 * 获取图片缩图
 * @param url
 */
export function imageThumb(
  url: string,
  limitWidth: number,
): Promise<{
  _base64: string;
  naturalWidth: number;
  naturalHeight: number;
}> {
  return new Promise(resolve => {
    const img = new Image();
    img.src = url;
    img.onload = async () => {
      const width = limitWidth;
      const height = (img.height / img.width) * limitWidth;
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      // 在画布上绘制缩略图
      ctx.drawImage(img, 0, 0, width, height);
      resolve({
        _base64: canvas.toDataURL(),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      });
    };
  });
}

/**
 * base64 的gif分解图绘制成帧图
 * @param params { gifArr: string[]; delayFrame: number; totalFrame: number }
 * @param aspectRatio 宽高比
 * @param frameHeight
 * @returns
 */
export async function gifArr2FrameImage(
  params: { gifArr: string[]; delayFrame: number; totalFrame: number },
  aspectRatio: number,
  frameHeight: number = 50,
) {
  const { gifArr, delayFrame, totalFrame } = params;
  const canvas = document.createElement('canvas');
  const frameWidth = aspectRatio * frameHeight;
  const ctx = canvas.getContext('2d');
  const totalTime = Math.ceil(totalFrame * delayFrame);
  canvas.height = frameHeight;
  canvas.width = frameWidth * totalTime;
  // gif 一秒截取一帧
  for (let i = 0; i < totalTime; i++) {
    // 计算是第几帧
    const index = Math.round(i / delayFrame);
    const _img = (await lazyBase64(gifArr[index])) as HTMLImageElement;
    ctx.drawImage(_img, i * frameWidth, 0, frameWidth, frameHeight);
  }
  return canvas.toDataURL('image/jpeg', 0.7);
}

export function lazyBase64(base64: string) {
  return new Promise(resolve => {
    const _img = new Image();
    _img.src = base64;
    _img.onload = () => {
      resolve(_img);
    };
  });
}
