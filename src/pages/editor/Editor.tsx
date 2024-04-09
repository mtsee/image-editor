import { useCallback, useEffect, useState } from 'react';
import styles from './editor.module.less';
import { useResizeDetector } from 'react-resize-detector';
// import { Link } from 'react-router-dom';
import $ from 'jquery';
import Canvas from './components/canvas';
import Header from './components/header';
import Options from './components/options';
import Sidebar from './components/sidebar';
import Sources from './components/sources';
import ColorBg from './ColorBg';
import { Left, Right } from '@icon-park/react';
import { observer } from 'mobx-react';

// Mock数据
import { editor } from '@stores/editor';
import { pubsub } from '@utils/pubsub';
import { userService } from '@server/user.service';
import { Toast } from '@douyinfe/semi-ui';
import { server } from './server';
import { tdata } from './tdata2';
import DragItem from './common/dragitem';
import HotKeys from './HotKeys';
import { config } from '@config/index';

interface IProps {
  match: { params: { appid: string } };
}

function Editor(props: IProps) {
  const appid = props.match.params.appid;

  const { width = window.innerWidth, height = window.innerHeight, ref } = useResizeDetector();
  const HEADER_HEIGHT = 60;
  const SIDEBAR_WIDTH = 60;
  const [layout, setLayout] = useState({
    sourcesWidth: 310,
    optionsWidth: 260,
    timelineHeight: 300,
  });
  const [show, setShow] = useState({ sources: true, options: true });
  const [loading, setLoading] = useState(true);

  // 拖动过程中center不要动画
  const [noAnimate, setNoAnimate] = useState(false);

  // sourcesBar 移动
  const sourcesBarDrag = useCallback((e: any) => {
    setNoAnimate(true);
    const { sourcesWidth, optionsWidth } = layout;
    // canvas最小600px
    const interval = [310, window.innerWidth - optionsWidth - 600];
    $(document)
      .on('mousemove.ievent.sourcesBar', (em: any) => {
        const ex = em.pageX - e.pageX;
        let sw = sourcesWidth + ex;
        if (sw < interval[0]) {
          sw = interval[0];
        } else if (sw > interval[1]) {
          sw = interval[1];
        }
        layout.sourcesWidth = sw;
        setLayout({ ...layout });
      })
      .on('mouseup.ievent.sourcesBar', () => {
        $(document).off('mousemove.ievent.sourcesBar');
        $(document).off('mousedown.ievent.sourcesBar');
        setNoAnimate(false);
      });
  }, []);

  // 设置区域拖动
  const optionsBarDrag = useCallback((e: any) => {
    setNoAnimate(true);
    const { sourcesWidth, optionsWidth } = layout;
    const interval = [260, window.innerWidth - sourcesWidth - 600];
    $(document)
      .on('mousemove.ievent.optionsBar', (em: any) => {
        const ex = em.pageX - e.pageX;
        let sw = optionsWidth - ex;
        if (sw < interval[0]) {
          sw = interval[0];
        } else if (sw > interval[1]) {
          sw = interval[1];
        }
        layout.optionsWidth = sw;
        setLayout({ ...layout });
      })
      .on('mouseup.ievent.optionsBar', () => {
        $(document).off('mousemove.ievent.optionsBar');
        $(document).off('mousedown.ievent.optionsBar');
        setNoAnimate(false);
      });
  }, []);

  const showPanel = (type: 'options' | 'sources', v: boolean) => {
    setShow({ ...show, [type]: v });
  };

  useEffect(() => {
    pubsub.subscribe('showLayoutPanel', (_msg, params: { type: 'options' | 'sources'; visible: boolean }) => {
      setShow({ ...show, [params.type]: params.visible });
    });
    return () => {
      pubsub.unsubscribe('showLayoutPanel');
    };
  }, [show]);

  const initAppData = useCallback(async () => {
    if (appid) {
      editor.appid = appid;
      const [res, err] = await server.getAppDetail(appid);
      if (err) {
        // 去掉APPID
        // window.history.pushState(null, null, '/editor');
        location.href = '/editor';
        Toast.error(err);
      } else {
        // console.log('resresres', res);
        const json = (await $.get(editor.store.setURL(res.draft_url) + '?t=' + +new Date())) as any;
        editor.data = json;
      }
    }
    if (!editor.data) {
      editor.data = tdata;
    }
    editor.selectPageId = editor.data.selectPageId || editor.data.pages[0].id;
    editor.lastUpdateAppData = JSON.stringify(editor.data);
    setLoading(false);
  }, []);

  useEffect(() => {
    initAppData();

    const onMouseWheel = e => {
      if (e.ctrlKey) {
        e.preventDefault();
      }
    };
    document.addEventListener('mousewheel', onMouseWheel, { passive: false });

    return () => {
      document.removeEventListener('mousewheel', onMouseWheel);
    };
  }, []);

  if (loading) {
    return <div>loading...</div>;
  }

  return (
    <div
      id="h5dsVideoEditor"
      key={editor.languageUpdateKey + '_' + editor.themeUpdateKey}
      ref={ref}
      className={styles.editor}
    >
      <div className={styles.sidebar} style={{ width: SIDEBAR_WIDTH }}>
        <Sidebar />
      </div>
      <div
        className={styles.sources}
        style={{
          left: SIDEBAR_WIDTH,
          width: layout.sourcesWidth,
          transform: show.sources ? 'translateX(0px)' : `translateX(${-layout.sourcesWidth}px)`,
        }}
      >
        <a onMouseDown={sourcesBarDrag} className={styles.sourcesBar}></a>
        <a
          onClick={() => {
            showPanel('sources', !show.sources);
          }}
          className={styles.flodButton}
        >
          <Left
            style={{ transform: `rotate(${show.sources ? 0 : 180}deg)` }}
            theme="outline"
            size="24"
            fill="var(--theme-text)"
          />
        </a>
        <Sources />
      </div>
      <div
        className={styles.header}
        style={{
          height: HEADER_HEIGHT,
          width: width - SIDEBAR_WIDTH - layout.sourcesWidth + (show.sources ? 0 : layout.sourcesWidth),
          left: show.sources ? layout.sourcesWidth + SIDEBAR_WIDTH : SIDEBAR_WIDTH,
        }}
      >
        <Header />
      </div>
      <div
        className={styles.center}
        style={{
          width:
            width -
            SIDEBAR_WIDTH -
            layout.optionsWidth -
            layout.sourcesWidth +
            (show.sources ? 0 : layout.sourcesWidth) +
            (show.options ? 0 : layout.optionsWidth),
          left: show.sources ? layout.sourcesWidth + SIDEBAR_WIDTH : SIDEBAR_WIDTH,
          top: HEADER_HEIGHT,
          transition: noAnimate ? 'none' : '0.5s',
        }}
      >
        <div className={styles.canvas} style={{ height: `calc(100% - ${HEADER_HEIGHT}px)` }}>
          <Canvas />
        </div>
      </div>
      <div
        className={styles.options}
        style={{
          width: layout.optionsWidth,
          top: HEADER_HEIGHT,
          transform: show.options ? 'translateX(0px)' : `translateX(${layout.optionsWidth}px)`,
        }}
      >
        <a onMouseDown={optionsBarDrag} className={styles.optionsBar}></a>
        <a
          onClick={() => {
            showPanel('options', !show.options);
          }}
          className={styles.flodButton}
        >
          <Right
            style={{ transform: `rotate(${show.options ? 0 : 180}deg)` }}
            theme="outline"
            size="24"
            fill="var(--theme-text)"
          />
        </a>
        {editor.movieCreateSuccess && <Options />}
      </div>
      <ColorBg style={{ bottom: 400, left: 300 }} />
      <ColorBg style={{ top: 100, right: 400 }} />
      <DragItem />
      <HotKeys />
    </div>
  );
}

export default observer(Editor);
