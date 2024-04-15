/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'PubSub';
declare module 'react-moveable';
declare module 'undo-redo-manager2';
declare module 'simple-query-string';
