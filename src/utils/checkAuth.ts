import { matchRoutes } from 'react-router-config';
import { routes } from '../routes.config';
import { config } from '@config/index';

export function checkAuth(): boolean {
  const mroutes = matchRoutes(
    routes,
    config.basename ? location.pathname.replace(`/${config.basename}`, '') : location.pathname,
  );
  let auth = false;
  const last = mroutes[mroutes.length - 1];
  if (last?.route.meta) {
    auth = last.route.meta.auth;
  }
  return auth;
}
