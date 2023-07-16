import { SettingIcon, ReportIcon, VideoIcon, VocabularyIcon } from '@/components/icon';
import { RouteConf } from './types';
import { normalizeRoutes } from './utils';

export const routesConf: RouteConf[] = [
  {
    path: '/video-player',
    name: 'videoPlayer',
    title: 'Просмотр видео',
    icon: <VideoIcon />,
  },
  {
    path: '/report',
    name: 'report',
    title: 'Отчеты',
    icon: <ReportIcon />,
    children: [
      {
        path: '/report/daily',
        name: 'report-daily',
        title: 'Ежедневный',
      },
      {
        path: '/report/monthly',
        name: 'report-monthly',
        title: 'Ежемесячный',
      },
      {
        path: '/report/detail',
        name: 'report-detail',
        title: 'Детальный',
      },
      {
        path: '/report/sum-of-materials',
        name: 'report-sum-of-materials',
        title: 'Суммарный по материалам',
      },
    ],
  },
  {
    path: '/vocabulary',
    name: 'vocabulary',
    title: 'Справочник',
    icon: <VocabularyIcon />,
    children: [
      {
        path: '/vocabulary/counterparty',
        name: 'counterparty' as const,
        title: 'Контрагент',
      },
      {
        path: '/vocabulary/cargo',
        name: 'cargo',
        title: 'Грузы',
      },
      {
        path: '/vocabulary/warehouse',
        name: 'warehouse',
        title: 'Склады',
      },
      {
        path: '/vocabulary/car',
        name: 'car',
        title: 'Автомобили',
      },
      {
        path: '/vocabulary/carrier',
        name: 'carrier',
        title: 'Перевозчики',
      },
      {
        path: '/vocabulary/consignee',
        name: 'consignee',
        title: 'Грузоотправитель',
      },
      {
        path: '/vocabulary/consignor',
        name: 'consignor',
        title: 'Грузополучатель',
      },
    ],
  },
  {
    path: '/setting',
    name: 'setting',
    title: 'Настройки',
    icon: <SettingIcon />,
    children: [
      {
        path: '/setting/com-port',
        name: 'setting-com-port',
        title: 'COM-порт',
      },
      {
        path: '/setting/data-source',
        name: 'setting-data-source',
        title: 'Источник данных',
      },
      {
        path: '/setting/data-owner',
        name: 'setting-data-owner',
        title: 'Сведения о владельце',
      },
      {
        path: '/setting/used-field-of-data',
        name: 'setting-used-field-of-data',
        title: 'Используемые поля данных',
      },
      {
        path: '/setting/video-register',
        name: 'setting-video-register',
        title: 'Регистрация видео',
      },
      {
        path: '/setting/dumping',
        name: 'setting-dumping',
        title: 'Выгрузка',
      },
      {
        path: '/setting/users',
        name: 'setting-users',
        title: 'Управление пользователями',
      },
    ],
  },
];

export const rootRoutes: RouteConf[] = [
  {
    path: '/',
    name: 'root',
    title: 'Главная',
    children: routesConf,
  },
];

export const normalizedRoutes = normalizeRoutes(rootRoutes);
