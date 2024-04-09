import { BaseLayer, BasePage, GroupLayer } from '@pages/editor/core/types/data';
import { TextData, ImageData, GroupData, PageData } from '@pages/editor/core';

export function formatH5DSImageTemplate(h5dsPageData: any, thumb?: string): BasePage {
  console.log('h5dsPageData', h5dsPageData);
  const newData = new PageData({
    name: h5dsPageData.name,
    desc: h5dsPageData.desc,
    width: h5dsPageData.style.width,
    height: h5dsPageData.style.height,
    thumb: thumb,
  });
  const formatGroupLayer = (layers, arr) => {
    layers.forEach(layer => {
      let newLayer: BaseLayer = null;
      switch (layer.pid) {
        case 'h5ds_img':
          newLayer = formatImageLayer(layer);
          break;
        case 'h5ds_text':
          newLayer = formatTextLayer(layer);
          break;
        case 'h5ds_combin':
          newLayer = new GroupData();
          formatGroupLayer(layer.data, (newLayer as GroupLayer).childs);
          break;
      }
      if (newLayer) {
        arr.push(newLayer);
      }
    });
  };
  formatGroupLayer(h5dsPageData.layers, newData.layers);
  return newData;
}

function formatImageLayer(layer) {
  return new ImageData({
    url: layer.data.src,
    x: layer.style.left,
    y: layer.style.top,
    width: layer.style.width,
    height: layer.style.height,
    naturalWidth: layer.data.naturalWidth,
    naturalHeight: layer.data.naturalHeight,
    cropSize: layer.data.crop,
  });
}

function formatTextLayer(layer) {
  layer.data.style.fill = layer.data.style.color;
  delete layer.data.style.color;
  layer.data.style.fontSize = parseInt(layer.data.style.fontSize, 10);
  delete layer.data.style.letterSpacing;
  delete layer.data.style.lineHeight;
  if (layer.data.style.fontFamily === '默认字体') {
    delete layer.data.style.fontFamily;
  }
  return new TextData({
    text: layer.data.data,
    textStyle: { ...layer.data.style },
    fontFamilyURL: layer.data.fontFamilySet.url,
    x: layer.style.left,
    y: layer.style.top,
  });
}
