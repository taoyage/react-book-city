import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';
import { Loading } from '@/components';

// import Home from '@/pages/home';
// import Detail from '@/pages/detail';
// import Ranking from '@/pages/ranking';
// import Shelf from '@/pages/shelf';
// import Search from '@/pages/search';
// import Chapter from '@/pages/chapter';
// import Booklist from '@/pages/bookList';

const Home = React.lazy(() => import('@/pages/home'));
const Detail = React.lazy(() => import('@/pages/detail'));
const Ranking = React.lazy(() => import('@/pages/ranking'));
const Shelf = React.lazy(() => import('@/pages/shelf'));
const Search = React.lazy(() => import('@/pages/search'));
const Chapter = React.lazy(() => import('@/pages/chapter'));
const Booklist = React.lazy(() => import('@/pages/bookList'));

const Router: React.FC = React.memo(() => {
  const element = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: '/shelf',
      element: <Shelf />,
    },
    {
      path: '/ranking',
      element: <Ranking />,
    },
    {
      path: '/search',
      element: <Search />,
    },
    {
      path: '/popular',
      element: <Booklist />,
    },
    {
      path: '/recommend',
      element: <Booklist />,
    },
    {
      path: '/finish',
      element: <Booklist />,
    },
    {
      path: '/book/:id',
      element: <Detail />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  return <React.Suspense fallback={<Loading />}>{element}</React.Suspense>;
});

export default Router;
