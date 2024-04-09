import Editor from './Editor';

const routes = [
  {
    path: '/:appid',
    ssr: false,
    exact: true,
    component: Editor,
  },
  {
    path: '/',
    ssr: false,
    exact: true,
    component: Editor,
  },
];

export { routes };
