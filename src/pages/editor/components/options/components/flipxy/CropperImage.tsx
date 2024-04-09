import { ImageLayer } from '@pages/editor/core/types/data';
import { editor } from '@stores/editor';
import { observer } from 'mobx-react';
import { useState, useRef, useEffect } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import styles from './cropper.module.less';
import { Modal, Tooltip, Button } from '@douyinfe/semi-ui';
import { Cutting } from '@icon-park/react';
export interface IProps {}

function CropperImage(props: IProps) {
  const [visible, setVisible] = useState(false);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [src, setSrc] = useState('');
  const [aspectRatio, setAspectRatio] = useState(1);

  const elementData = editor.getElementData() as ImageLayer;
  useEffect(() => {
    if (visible) {
      setSrc(editor.store.setURL(elementData.url));
      setAspectRatio(elementData.width / elementData.height);
    }
  }, [visible, elementData.url]);

  return (
    <>
      <Tooltip content="裁切">
        <a
          onClick={() => {
            setVisible(true);
            // editor.cropper = true;
          }}
        >
          <Cutting size={20} color="var(--theme-icon)" />
        </a>
      </Tooltip>
      <Modal
        width={800 + 50}
        title="图片裁剪"
        maskClosable={false}
        footer={null}
        visible={visible}
        onCancel={() => setVisible(false)}
      >
        <div className={styles.cropper}>
          {visible && src && (
            <>
              <Cropper
                key={src}
                src={src}
                style={{ height: 300, width: '100%' }}
                // Cropper.js options
                initialAspectRatio={aspectRatio}
                data={{ ...(elementData.cropSize || {}) }}
                minCropBoxHeight={10}
                minCropBoxWidth={10}
                highlight={false}
                background={false}
                checkOrientation={false}
                viewMode={1}
                autoCrop={true}
                guides={false}
                zoomable={false}
                ref={cropperRef}
              />
              <div className={styles.btns}>
                <Button onClick={() => setVisible(false)} type="danger">
                  取消
                </Button>
                <Button
                  onClick={() => {
                    const cropper = cropperRef.current?.cropper;
                    const size = cropper.getData();
                    const { x, y, width, height } = size;

                    // 因为裁剪数据不能超过原始尺寸，这里向下取整确保不会超过原始尺寸
                    elementData.cropSize = {
                      x: ~~x,
                      y: ~~y,
                      width: ~~width,
                      height: ~~height,
                    };
                    const scalex = elementData.width / elementData.cropSize.width;
                    const scaley = elementData.height / elementData.cropSize.height;
                    const scale = Math.min(scalex, scaley);

                    // 设置新的宽高
                    elementData.width = ~~(elementData.cropSize.width * scale);
                    elementData.height = ~~(elementData.cropSize.height * scale);

                    editor.updateCanvas();
                    setVisible(false);
                  }}
                >
                  确认
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    </>
  );
}

export default observer(CropperImage);
