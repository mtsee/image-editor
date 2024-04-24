import { View } from './index';
import type { IViewProps } from './View';
import ReactDOM from 'react-dom/client';
// import Store from './stores/Store';

export default class CoreView {
  private _props: IViewProps = {
    data: undefined,
    target: document.body,
    env: 'editor',
    resourceHost: '',
  };

  constructor(params: IViewProps) {
    Object.assign(this._props, params);
  }

  public init() {
    return new Promise(resolve => {
      const { target, callback, data, ...other } = this._props;
      if (!data) {
        return new Error('data数据为页面数据，必须传入');
      }
      ReactDOM.createRoot(target!).render(
        <View
          {...other}
          data={data}
          target={target}
          callback={store => {
            if (callback) {
              callback(store);
            }
            resolve(store);
          }}
        />,
      );
    });
  }
}
