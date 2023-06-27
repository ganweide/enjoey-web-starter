import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const Page1 = React.lazy(() => import('./Page1'));
const Page2 = React.lazy(() => import('./Page2'));
const Page3 = React.lazy(() => import('./Page3'));

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
];
