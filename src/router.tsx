import React from 'react';
import { useRoutes, Navigate } from 'react-router-dom';

import Home from '@/pages/home';
import Detail from '@/pages/detail';
import Ranking from '@/pages/ranking';
import Shelf from '@/pages/shelf';
import Search from '@/pages/search';
import Reader from '@/pages/chapter';
import Booklist from '@/pages/bookList';

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
      path: '/book/:id',
      element: <Detail />,
    },
    {
      path: '*',
      element: <Navigate to="/" />,
    },
  ]);

  return element;
});

export default Router;
