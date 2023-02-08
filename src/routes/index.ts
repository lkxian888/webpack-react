import { lazy } from 'react';

const Home = lazy(
  () => import(/* webpackChunkName:"Home", webpackPrefetch: true */ '@/pages/Home'),
);
const Detail = lazy(
  () => import(/* webpackChunkName:"Detail", webpackPrefetch: true */ '@/pages/Detail'),
);
// const Home = lazy(() => import('@/pages/Home'));
// const Detail = lazy(() => import('@/pages/Detail'));

export default [
  {
    path: '/',
    name: 'home',
    redirect: '/detail',
    exact: true,
    component: Home,
  },
  {
    path: '/detail',
    name: 'home',
    exact: true,
    component: Detail,
  },
];
