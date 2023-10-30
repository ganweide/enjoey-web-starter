import React from 'react';
import {RoutePermittedRole} from 'shared/constants/AppConst';

const Page1 = React.lazy(() => import('./SurveyEditor'));
const Page2 = React.lazy(() => import('./AddmissionForm'));
const Page3 = React.lazy(() => import('./ActivitiesForm'));
const Page4 = React.lazy(() => import('./MenuPlanning'));
const Page5 = React.lazy(() => import('./SleepCheck'));
const Page6 = React.lazy(() => import('./Immunization'));
const Page7 = React.lazy(() => import('./HealthCheck'));
const Page8 = React.lazy(() => import('./ToiletCheck'));
const Page9 = React.lazy(() => import('./InjuriesForm'));
const Page10 = React.lazy(() => import('./ChargesForm'));
const Page11 = React.lazy(() => import('./SurveySettings'));
const Page12 = React.lazy(() => import('./Check-inReport'));
const Page13 = React.lazy(() => import('./RoomCheckReport'));
const Page14 = React.lazy(() => import('./ImmunizationReport'));
const Page15 = React.lazy(() => import('./Learning'));
const Page16 = React.lazy(() => import('./SchedulerSettings'));

export const samplePagesConfigs = [
  {
    path: '/sample/SurveyEditor',
    element: <Page1 />,
    permittedRole: [RoutePermittedRole.Admin, RoutePermittedRole.Teacher],
  },
  {
    path: '/sample/AddmissionForm',
    element: <Page2 />,
  },
  {
    path: '/sample/ActivitiesForm',
    element: <Page3 />,
  },
  {
    path: '/sample/MenuPlanning',
    element: <Page4 />,
  },
  {
    path: '/sample/SleepCheck',
    element: <Page5 />,
  },
  {
    path: '/sample/Immunization',
    element: <Page6 />,
  },
  {
    path: '/sample/HealthCheck',
    element: <Page7 />,
  },
  {
    path: '/sample/ToiletCheck',
    element: <Page8 />,
  },
  {
    path: '/sample/InjuriesForm',
    element: <Page9 />,
  },
  {
    path: '/sample/ChargesForm',
    element: <Page10 />,
  },
  {
    path: '/sample/SurveySettings',
    element: <Page11 />,
  },
  {
    path: '/sample/Check-inReport',
    element: <Page12 />,
  },
  {
    path: '/sample/RoomCheckReport',
    element: <Page13 />,
  },
  {
    path: '/sample/ImmunizationReport',
    element: <Page14 />,
  },
  {
    path: '/sample/Learning',
    element: <Page15 />,
  },
  {
    path: '/sample/SchedulerSettings',
    element: <Page16 />,
  },
];
