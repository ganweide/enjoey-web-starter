import {BiAlignLeft} from 'react-icons/bi';
const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'landing.solutions',
    type: 'group',
    children: [
      {
        id: 'payment',
        title: 'Payment',
        messageId: 'Payment',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/Invoice',
      },
    ],
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Plannings',
    type: 'collapse',
    children: [
      {
        id: 'menu-planning',
        title: 'Menu Planning',
        messageId: 'Menu Planning',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/MenuPlanning',
      },
      {
        id: 'learning',
        title: 'Learning',
        messageId: 'Learning',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/Learning',
      },
    ]
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Albmus',
    type: 'collapse',
    children: [
      {
        id: 'albums',
        title: 'Albums',
        messageId: 'Albums',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/Albums',
      },
      {
        id: 'activity-upload',
        title: 'Activity Upload',
        messageId: 'Activity Upload',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/ActivityMediaUpload',
      },
    ]
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Surveys',
    type: 'collapse',
    children: [
      {
        id: 'survey-editor',
        title: 'Survey Editor',
        messageId: 'Survey Editor',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/SurveyEditor',
      },
      {
        id: 'survey-settings',
        title: 'Survey Settings',
        messageId: 'Survey Settings',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/SurveySettings',
      },
    ]
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Checks',
    type: 'collapse',
    children: [
      {
        id: 'sleep-check',
        title: 'Sleep Check',
        messageId: 'Sleep Check',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/SleepCheck',
      },
      {
        id: 'health-check',
        title: 'Health Check',
        messageId: 'Health Check',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/HealthCheck',
      },
      {
        id: 'toilet-check',
        title: 'Toilet Check',
        messageId: 'Toilet Check',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/ToiletCheck',
      },
    ]
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Forms',
    type: 'collapse',
    children: [
      {
        id: 'survey-form',
        title: 'Addmission Form',
        messageId: 'Addmission Form',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/AddmissionForm',
      },
      {
        id: 'activities-form',
        title: 'Activities Form',
        messageId: 'Activities Form',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/ActivitiesForm',
      },
      {
        id: 'injuries-form',
        title: 'Injuries Form',
        messageId: 'Injuries Form',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/InjuriesForm',
      },
      {
        id: 'injuries-form',
        title: 'Charges Form',
        messageId: 'Charges Form',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/ChargesForm',
      },
    ]
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Room Report',
    type: 'collapse',
    children: [
      {
        id: 'check-in-report',
        title: 'Check-in Report',
        messageId: 'Check-in Report',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/Check-inReport',
      },
      {
        id: 'room-check-report',
        title: 'Room Check Report',
        messageId: 'Room Check Report',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/RoomCheckReport',
      },
      {
        id: 'immunization-report',
        title: 'Immunization Report',
        messageId: 'Immunization Report',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/ImmunizationReport',
      },
      {
        id: 'immunization',
        title: 'Immunization',
        messageId: 'Immunization',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/Immunization',
      },
    ]
  },
  {
    id: 'app',
    title: 'Sample',
    messageId: 'Others',
    type: 'collapse',
    children: [
      {
        id: 'scheduler-settings',
        title: 'Scheduler Settings',
        messageId: 'Scheduler Settings',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/SchedulerSettings',
      },
      {
        id: 'pdf-download',
        title: 'PDF Download',
        messageId: 'PDF Download',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/PDFDownload',
      },
    ]
  },
];
export default routesConfig;
