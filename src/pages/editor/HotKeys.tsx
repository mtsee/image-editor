import { Toast, Notification } from '@douyinfe/semi-ui';
import { editor } from '@stores/editor';
import { util } from '@utils/index';
import { pubsub } from '@utils/pubsub';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import type { HotkeysEvent } from 'react-hotkeys-hook/src/types';
import { server } from '@pages/editor/components/sources/my/server';
import { addImageItem } from './components/sources/addItem';

export interface IProps {}

function HotKeys(props: IProps) {
  const mouseXY = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = e => {
      // console.log(e.pageX, e.pageY);
      mouseXY.current.x = e.pageX;
      mouseXY.current.y = e.pageY;
    };
    document.addEventListener('mousemove', onMove);

    const pasteFuntion = async event => {
      event.stopPropagation();
      if (editor.copyTempData) {
        console.log('粘贴元素');
        // if (!editor.copyTempData) {
        //   Toast.error('请先使用 Ctrl + C 进行复制');
        //   return;
        // }
        const elems = editor.cloneElements(editor.copyTempData);
        editor.pageData.layers.unshift(...elems);
        editor.updateCanvas();
        editor.setSelectedElementIds(elems.map(d => d.id));
        editor.store.emitControl(elems.map(d => d.id));
      } else {
        const clipdata = event.clipboardData || (window as any).clipboardData;
        const item = clipdata.items[0];
        console.log('clipdata', clipdata, item.getAsFile());
        // 只取剪切板中最新的
        if (item && item.kind == 'file' && item.type.match(/^image\//i)) {
          const tid = Toast.info('文件上传中...');
          // 文件上传
          const [res, err] = await server.formUpdate({
            files: [item.getAsFile()],
            filename: +new Date() + '.png',
            file_type: 'image', // file-普通文件 image-图片文件 audio-音频文件 video-视频文件
            app_id: editor.appid,
          });
          Toast.close(tid);
          console.log('res----------->', res);

          // // 保存到素材库
          // const [item, err] = await server.createUserMaterial({
          //   app_id: editor.appid,
          //   name: name,
          //   urls: { url, thumb },
          //   attrs,
          // });

          const _img = await util.imgLazy(res.url);
          const imgLayer = await addImageItem({
            urls: { url: res.storage_path },
            attrs: {
              naturalWidth: _img.naturalWidth,
              naturalHeight: _img.naturalHeight,
            },
          });
          editor.setSelectedElementIds([imgLayer.id]);
          editor.store.emitControl([imgLayer.id]);

          Notification.open({
            title: '文件上传成功！',
            content: '支持SVG,JPEG,PNG,GIF的图片格式',
            duration: 3,
            position: 'bottomRight',
          });
          return;
        }
      }
    };

    window.addEventListener('paste', pasteFuntion);

    return () => {
      window.removeEventListener('paste', pasteFuntion);
      document.removeEventListener('mousemove', onMove);
    };
  }, []);

  useHotkeys(
    [
      'ctrl+c', // 复制
      'ctrl+v', // 粘贴
      'ctrl+s', // 保存项目
      'ctrl+x', // 剪切选中元素
      'ctrl+-', // 居中缩小画布
      'ctrl+=', // 居中放大画布
      'ctrl+0', // 将画布缩放至适合屏幕大小
      'ctrl+a', // 全选
      'ctrl+d', // 取消选择
      'ctrl+z', // 撤销
      'ctrl+shift+z', // 重做
      'ctrl+]', // 将选中图层向上移动一层
      'ctrl+shift+}', // 将选中图层移到最上面
      'ctrl+[', // 将选中图层向下移动一层
      'ctrl+shift+{', // 将选中图层移到最下面
      'shift+up', // 上移10px
      'shift+down', // 下移10px
      'shift+left', // 左移10px
      'shift+right', // 右移10px
      'up', // 上移1px
      'down', // 下移1px
      'left', // 左移1px
      'right', // 右移1px
      'delete', // 删除选中元素
      'backspace', // 删除选中元素
    ],
    (event: KeyboardEvent, handler: HotkeysEvent) => {
      console.log('快捷键处理--->', event, handler, handler.keys);

      if (handler.ctrl && handler.keys.join('') !== 'v') {
        event.preventDefault();
      }

      if (handler.ctrl && handler.shift) {
        // ctrl + shift + *
        switch (handler.keys.join('')) {
          case 'z':
            console.log('重做');
            pubsub.publish('keyboardRedo');
            break;
          case '}':
            console.log('将选中图层移到最上面');
            editor.moveTopElement();
            break;
          case '{':
            console.log('将选中图层移动最下面');
            editor.moveBottomElement();
            break;
        }
      } else if (handler.ctrl) {
        // ctrl + *
        switch (handler.keys.join('')) {
          case ']':
            editor.upOneElement();
            break;
          case '[':
            editor.downOneElement();
            break;
          case 'z':
            console.log('撤销');
            pubsub.publish('keyboardUndo');
            break;
          case 'a':
            console.log('全选中');
            editor.setContorlAndSelectedElemenent(editor.pageData.layers.map(layer => layer.id));
            break;
          case 'd':
            console.log('取消选择');
            editor.setContorlAndSelectedElemenent([]);
            break;
          case '0':
            console.log('将画布缩放至适合屏幕大小');
            pubsub.publish('keyboardSetViewSize', 'fit');
            break;
          case '-':
            console.log('居中缩小画布');
            pubsub.publish('keyboardSetViewSize', 'zoomIn');
            break;
          case '=':
            console.log('居中放大画布');
            pubsub.publish('keyboardSetViewSize', 'zoomOut');
            break;
          case 'c':
            editor.copyElement();
            break;
          case 'x':
            editor.cutElement();
            break;
          case 'v':
            // 上面
            break;
          case 's':
            console.log('手动保存项目');
            pubsub.publish('keyboardSaveApp');
            break;
        }
      } else if (handler.shift) {
        // shfit + *
        switch (handler.keys.join('')) {
          case 'up':
            {
              console.log('上移10px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.y -= 10;
              });
              editor.updateCanvas();
            }
            break;
          case 'down':
            {
              console.log('下移10px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.y += 10;
              });
              editor.updateCanvas();
            }
            break;
          case 'left':
            {
              console.log('左移10px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.x -= 10;
              });
              editor.updateCanvas();
            }
            break;
          case 'right':
            {
              console.log('右移10px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.x += 10;
              });
              editor.updateCanvas();
            }
            break;
        }
      } else {
        // 普通
        switch (handler.keys.join('')) {
          case 'up':
            {
              console.log('上移1px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.y -= 1;
              });
              editor.updateCanvas();
            }
            break;
          case 'down':
            {
              console.log('下移1px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.y += 1;
              });
              editor.updateCanvas();
            }
            break;
          case 'left':
            {
              console.log('左移1px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.x -= 1;
              });
              editor.updateCanvas();
            }
            break;
          case 'right':
            {
              console.log('右移1px');
              const elems = editor.getElementDataByIds([...editor.selectedElementIds]);
              elems.forEach(el => {
                el.x += 1;
              });
              editor.updateCanvas();
            }
            break;
          case 'delete':
          case 'backspace':
            console.log('删除');
            editor.store.deleteLayers([...editor.selectedElementIds]);
            editor.updateCanvas();
            editor.store.emitControl([]);
            editor.record();
            break;
        }
      }
    },
  );
  return null;
}

export default observer(HotKeys);
