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
        url: '/sample/page-1',
      },
      {
        id: 'survey-form',
        title: 'Survey Form',
        messageId: 'Survey Form',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/page-2',
      },
      {
        id: 'activities-form',
        title: 'Activities Form',
        messageId: 'Activities Form',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/page-3',
      },
      {
        id: 'menu-planning',
        title: 'Menu Planning',
        messageId: 'Menu Planning',
        type: 'item',
        icon: <BiAlignLeft />,
        url: '/sample/page-4',
      },
    ],
  },
];
export default routesConfig;
