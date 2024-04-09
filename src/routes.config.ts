import { routes as homeRoutes } from '@pages/home';
// import { routes as testRoutes } from "@pages/test";
// import { routes as manageRoutes } from "@pages/manage";
import { routes as editorRoutes } from '@pages/editor';

// 管理页面
import NotFound from '@components/not-found';
import IndexLayout from '@layout/index-layout';

const routes = [
  // {
  //   path: "/manage",
  //   exact: false,
  //   component: ManageLayout,
  //   routes: [...manageRoutes],
  // },
  {
    path: '/',
    exact: false,
    component: IndexLayout,
    meta: { auth: false },
    routes: [...editorRoutes, ...homeRoutes, { path: '*', exact: false, component: NotFound }],
  },
];

export { routes };
