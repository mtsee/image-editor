import { IBox } from '@leafer-ui/interface';
import { App, DragEvent, MoveEvent } from 'leafer-ui';
import { EditorEvent, EditorMoveEvent, EditorScaleEvent, EditorRotateEvent } from '@leafer-in/editor';

export interface IOptions {
  lineColor: string; // 线条的颜色
  gap: number; // 吸附距离
}
/**
 * leafer编辑器的扩展，吸附对齐
 */
export default class EditorLine {
  private _app: App;
  private _options: IOptions;
  constructor(app: App, options?: IOptions) {
    this._app = app;
    this._options = Object.assign(
      {
        lineColor: '#ff0',
        gag: 3,
      },
      options,
    );
    this._init();
  }

  private _ondragMove = (e: EditorEvent) => {
    // console.log('MOVE', e);
    const box = e.target as IBox;
    // console.log(box.getBounds());
  };

  private _ondragDown = (e: EditorEvent) => {
    const frame = this._app.tree.children.find(d => d.name === 'frame');
    // console.log('DOWN---------->', this._app.editor, e, frame?.children);
    console.log('this._app.editor', this._app.editor);
  };

  private _init() {
    this._app.editor.on(EditorEvent.SELECT, this._ondragDown);
    this._app.editor.on(MoveEvent.DOWN, this._ondragDown);
    this._app.editor.on(EditorMoveEvent.MOVE, this._ondragMove);
    this._app.editor.on(EditorRotateEvent.ROTATE, this._ondragMove);
    this._app.editor.on(EditorScaleEvent.SCALE, this._ondragMove);
    // this._app.editor.on(MoveEvent.UP, e => {
    //   console.log('UP', e);
    // });
  }

  public destroy() {}
}
