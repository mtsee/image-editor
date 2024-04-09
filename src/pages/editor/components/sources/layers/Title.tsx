import { useReducer, useRef, useState } from 'react';
import styles from './layers.module.less';
import { Lock, Unlock, DeleteOne, PreviewOpen, PreviewClose, Picture, FullScreen, Text } from '@icon-park/react';
import { BaseLayer, ImageLayer, TextLayer } from '@pages/editor/core/types/data';
import { Input } from '@douyinfe/semi-ui';
import { editor } from '@stores/editor';

export interface IProps {
  layer: BaseLayer;
}

export default function Title(props: IProps) {
  const layer = props.layer;
  const [disinput, setDisinput] = useState(true);
  const [, forceUpdate] = useReducer(x => x + 1, 0);
  const inputRef = useRef<HTMLInputElement>();
  const name = layer.name;
  let info = '';
  if (layer.type === 'text') {
    info = (layer as TextLayer).text;
  }
  return (
    <div className={styles.item}>
      <span
        onDoubleClick={e => {
          e.stopPropagation();
          setDisinput(false);
          setTimeout(() => {
            inputRef.current.focus();
          });
          console.log('e.currentTarget.childNodes-->', e.currentTarget.childNodes);
        }}
        className={styles.name}
      >
        {layer.type === 'image' && (
          <span
            className={styles.layerThumb}
            style={{
              backgroundImage: `url(${(layer as ImageLayer).url})`,
            }}
          />
        )}
        {disinput ? (
          <span className="rc-tree-name">
            {name.substring(0, 12)}
            {name.length > 12 ? '...' : ''}
            {info ? `（${info.substring(0, 6) + (info.length > 6 ? '...' : '')}）` : ''}
          </span>
        ) : (
          <Input
            ref={inputRef}
            value={layer.name}
            onChange={e => {
              layer.name = e;
              forceUpdate();
            }}
            onBlur={() => {
              setDisinput(true);
            }}
            size="small"
          />
        )}
      </span>
      <span className={styles.btns}>
        <a
          onClick={e => {
            e.stopPropagation();
            layer._hide = !layer._hide;
            forceUpdate();
            editor.updateCanvas();
            editor.updateOption();
          }}
        >
          {layer._hide ? (
            <PreviewClose size={16} color="var(--theme-icon)" />
          ) : (
            <PreviewOpen size={16} color="var(--theme-icon)" />
          )}
        </a>
        <a
          onClick={e => {
            e.stopPropagation();
            layer._lock = !layer._lock;
            forceUpdate();
            editor.updateCanvas();
            editor.updateOption();
          }}
        >
          {layer._lock ? <Lock size={16} color="var(--theme-icon)" /> : <Unlock size={16} color="var(--theme-icon)" />}
        </a>
      </span>
    </div>
  );
}
