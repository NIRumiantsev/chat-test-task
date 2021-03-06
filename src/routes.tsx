import { FC } from 'react';
import { Route } from 'react-router-dom'
import { MessengerPage, LoginPage } from 'UI';

type RouteItem = {
  path: string,
  component: FC<any>,
};

const routes: RouteItem[] = [
  {
    path: '/',
    component: MessengerPage,
  },
  {
    path: '/login',
    component: LoginPage,
  },
];

const appRoutes = routes.map((route: RouteItem, index: number) => (
  <Route
    exact
    path={route.path}
    component={route.component}
    key={`page-route-${index}`}
  />
));

export { routes, appRoutes };