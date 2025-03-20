import { 
  DashboardOutlined,
  SettingOutlined,
  MobileOutlined,
  FileTextOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  UserOutlined,
  PictureOutlined,
  GiftOutlined,
  ShopOutlined,
  UsergroupAddOutlined,
  MailOutlined,
  HighlightOutlined
} from '@ant-design/icons';
import { APP_PREFIX_PATH } from 'configs/AppConfig'

const dashBoardNavTree = [{
  key: 'main',
  path: `${APP_PREFIX_PATH}/main`,
  title: 'sidenav.main',
  icon: DashboardOutlined,
  breadcrumb: false,
  submenu: [
    {
      key: 'main-dashboard',
      path: `${APP_PREFIX_PATH}/main/dashboard`,
      title: 'sidenav.dashboard',
      icon: DashboardOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-catalog', 
      path: `${APP_PREFIX_PATH}/main/catalog`,
      title: 'sidenav.main.catalog',
      icon: ShoppingCartOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'main-catalog-products',
          path: `${APP_PREFIX_PATH}/main/catalog/products`,
          title: 'sidenav.main.catalog.products',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-catalog-categories',
          path: `${APP_PREFIX_PATH}/main/catalog/categories`,
          title: 'sidenav.main.catalog.categories',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-catalog-collections',
          path: `${APP_PREFIX_PATH}/main/catalog/collections`,
          title: 'sidenav.main.catalog.collections',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-catalog-combo',
          path: `${APP_PREFIX_PATH}/main/catalog/combo`,
          title: 'sidenav.main.catalog.combo',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'main-orders',
      path: `${APP_PREFIX_PATH}/main/orders`,
      title: 'sidenav.main.orders',
      icon: ShoppingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-clients',
      path: `${APP_PREFIX_PATH}/main/clients`,
      title: 'sadenav.main.clients',
      icon: UserOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'main-clients-user-list',
          path: `${APP_PREFIX_PATH}/main/clients/user-list`,
          title: 'sidenav.main.userlist',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-clients-user-group',
          path: `${APP_PREFIX_PATH}/main/clients/user-group`,
          title: 'sidenav.main.usergroup',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-clients-setting',
          path: `${APP_PREFIX_PATH}/main/clients/setting`,
          title: 'sidenav.main.setting',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'main-baners',
      path: `${APP_PREFIX_PATH}/main/banners`,
      title: 'sidenav.main.banners',
      icon: PictureOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-promocods',
      path: `${APP_PREFIX_PATH}/main/promocods`,
      title: 'sidenav.main.promocods',
      icon: GiftOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-scheduler',
      path: `${APP_PREFIX_PATH}/main/scheduler`,
      title: 'sidenav.main.scheduler',
      icon: HighlightOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-offline-points',
      path: `${APP_PREFIX_PATH}/main/offline-points`,
      title: 'sidenav.main.offlinepoints',
      icon: ShopOutlined,
      breadcrumb: true,
      submenu: [
        {
          key: 'main-offline-points-address',
          path: `${APP_PREFIX_PATH}/main/offline-points/address`,
          title: 'sidenav.main.offlinepoints.address',
          icon: '',
          breadcrumb: false,
          submenu: []
        },
        {
          key: 'main-offline-points-geozone',
          path: `${APP_PREFIX_PATH}/main/offline-points/geozone`,
          title: 'sidenav.main.offlinepoints.geozone',
          icon: '',
          breadcrumb: false,
          submenu: []
        }
      ]
    },
    {
      key: 'main-employees',
      path: `${APP_PREFIX_PATH}/main/employees`,
      title: 'sidenav.main.employees',
      icon: UsergroupAddOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'main-mailings',
      path: `${APP_PREFIX_PATH}/main/mailings`,
      title: 'sidenav.main.mailings',
      icon: MailOutlined,
      breadcrumb: false,
      submenu: []
    },
  
  ]
}]

const systemsBoardNavTree = [{
  key: 'systems',
  path: `${APP_PREFIX_PATH}/systems`,
  title: 'sidenav.systems',
  icon: '',
  breadcrumb: false,
  submenu: [
    {
      key: 'systems-setting',
      path: `${APP_PREFIX_PATH}/systems/setting`,
      title: 'sidenav.systems.setting',
      icon: SettingOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'systems-mobile-apps',
      path: `${APP_PREFIX_PATH}/systems/mobile-apps`,
      title: 'sidenav.systems.mobileapps',
      icon: MobileOutlined,
      breadcrumb: false,
      submenu: []
    },
    {
      key: 'systems-logs',
      path: `${APP_PREFIX_PATH}/systems/logs`,
      title: 'sidenav.systems.logs',
      icon: FileTextOutlined,
      breadcrumb: false,
      submenu: []
    }
  ]
}]




const navigationConfig = [
  ...dashBoardNavTree,
  ...systemsBoardNavTree

]

export default navigationConfig;
