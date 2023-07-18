import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const Page1 = React.lazy(() => import('./Page1'));
const Page2 = React.lazy(() => import('./Page2'));
const Page3 = React.lazy(() => import('./Page3'));
const Page4 = React.lazy(() => import('./Page4'));
const Page5 = React.lazy(() => import('./Page5'));
const Page6 = React.lazy(() => import('./Page6'));
const Page7 = React.lazy(() => import('./Page7'));
const Page8 = React.lazy(() => import('./Page8'));
const Page9 = React.lazy(() => import('./Page9'));

export const samplePagesConfigs = [
  {
    path: '/sample/page-1',
    element: <Page1 />,
    permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.Teacher],
  },
  {
    path: '/sample/page-2',
    element: <Page2 />,
  },
  {
    path: '/sample/page-3',
    element: <Page3 />,
  },
  {
    path: '/sample/page-4',
    element: <Page4 />,
  },
  {
    path: '/sample/page-5',
    element: <Page5 />,
  },
  {
    path: '/sample/page-6',
    element: <Page6 />,
  },
  {
    path: '/sample/page-7',
    element: <Page7 />,
  },
  {
    path: '/sample/page-8',
    element: <Page8 />,
  },
  {
    path: '/sample/page-9',
    element: <Page9 />,
  },
];
