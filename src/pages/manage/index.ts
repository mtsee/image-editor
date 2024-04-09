import Manage from './Manage';

const routes = [{ path: '/manage', meta: { auth: true }, exact: true, component: Manage }];

export { routes };
