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
const Page17 = React.lazy(() => import('./PDFDownload'));
const Page18 = React.lazy(() => import('./Albums'));
const Page19 = React.lazy(() => import('./ActivityMediaUpload'));
const Page20 = React.lazy(() => import('./Invoice'));
const Page21 = React.lazy(() => import('./CheckoutForm'));
const Page22 = React.lazy(() => import('./AppointmentForm'));
const Page23 = React.lazy(() => import('./EmailEditor'));
const Page24 = React.lazy(() => import('./ImportCSV'));
const Page25 = React.lazy(() => import('./DocumentUpload'));
const Page26 = React.lazy(() => import('./DocumentView'));
const Page27 = React.lazy(() => import('./PaymentSetup'));
const Page28 = React.lazy(() => import('./EventCalendar'));
const Page29 = React.lazy(() => import('./ButtonTest'));
const Page30 = React.lazy(() => import('./HtmlEditors'));
const Page31 = React.lazy(() => import('./TenantPlan'));
const Page32 = React.lazy(() => import('./TaxForm'));
const Page33 = React.lazy(() => import('./PaymentDetails'));
const Page34 = React.lazy(() => import('./AuditLog'));
const Page35 = React.lazy(() => import('./ReactDataGridReport'));
const Page36 = React.lazy(() => import('./LeaveApplicationForm'));
const Page37 = React.lazy(() => import('./Migration'));

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
  {
    path: '/sample/PDFDownload',
    element: <Page17 />,
  },
  {
    path: '/sample/Albums',
    element: <Page18 />,
  },
  {
    path: '/sample/ActivityMediaUpload',
    element: <Page19 />,
  },
  {
    path: '/sample/Invoice',
    element: <Page20 />,
  },
  {
    path: '/sample/CheckoutForm',
    element: <Page21 />,
  },
  {
    path: '/sample/AppointmentForm',
    element: <Page22 />,
  },
  {
    path: '/sample/EmailEditor',
    element: <Page23 />,
  },
  {
    path: '/sample/ImportCSV',
    element: <Page24 />,
  },
  {
    path: '/sample/DocumentUpload',
    element: <Page25 />,
  },
  {
    path: '/sample/DocumentView',
    element: <Page26 />,
  },
  {
    path: '/sample/PaymentSetup',
    element: <Page27 />,
  },
  {
    path: '/sample/EventCalendar',
    element: <Page28 />,
  },
  {
    path: '/sample/ButtonTest',
    element: <Page29 />,
  },
  {
    path: '/sample/HtmlEditors',
    element: <Page30 />,
  },
  {
    path: '/sample/TenantPlan',
    element: <Page31 />,
  },
  {
    path: '/sample/TaxForm',
    element: <Page32 />,
  },
  {
    path: '/sample/PaymentDetails',
    element: <Page33 />,
  },
  {
    path: '/sample/AuditLog',
    element: <Page34 />,
  },
  {
    path: '/sample/ReactDataGridReport',
    element: <Page35 />,
  },
  {
    path: '/sample/LeaveApplicationForm',
    element: <Page36 />,
  },
  {
    path: '/sample/Migration',
    element: <Page37 />,
  },
];
