import styles from './errorBoundary.module.less';
import { Button } from '@douyinfe/semi-ui';
import React, { Component } from 'react';

interface ErrorBoundaryProps {
  children?: JSX.Element;
}

interface ErrorBoundaryStates {
  errorMsgMap: any;
  hasError: boolean;
  errorMsg: string;
}

export interface IAppProps {}

export default class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryStates> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      errorMsg: '',
      errorMsgMap: {
        timeout: '抱歉，加载超时！', // 错误信息对应提示文字
      },
    };
  }

  static getDerivedStateFromError(error: any) {
    // 更新 state 使下一次渲染能够显示降级后的 UI
    return { hasError: true, errorMsg: error.message };
  }

  // componentDidCatch (error, errorInfo) {
  //     // 你同样可以将错误日志上报给服务器
  //     logErrorToMyService(error, errorInfo);
  // }

  public render() {
    const { errorMsgMap, hasError, errorMsg } = this.state;

    if (hasError !== false) {
      // 你可以自定义降级后的 UI 并渲染
      return (
        <div className={styles.errorBoundary}>
          <h1>{errorMsgMap[errorMsg] || '抱歉，加载失败！'}</h1>
          <Button type="primary" key="console" onClick={() => window.location.reload()}>
            重新加载
          </Button>
        </div>
      );
    } else {
      return this.props.children;
    }
  }
}
