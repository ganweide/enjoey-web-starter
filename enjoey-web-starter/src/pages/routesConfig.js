import {BiAlignLeft} from 'react-icons/bi';
const routesConfig = [
  {
    id: 'app',
    title: 'Sample',
    messageId: 'landing.solutions',
    type: 'group',
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
        id: 'menu-planning',
        title: 'Menu Planning',
        messageId: 'Menu Planning',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/MenuPlanning',
      },
      {
        id: 'immunization',
        title: 'Immunization',
        messageId: 'Immunization',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/Immunization',
      },
      {
        id: 'survey-settings',
        title: 'Survey Settings',
        messageId: 'Survey Settings',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/SurveySettings',
      },
    ],
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
    ]
  },
];
export default routesConfig;
