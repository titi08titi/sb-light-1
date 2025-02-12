export const TIME_SECURITY_MARGIN = 10 // 5 minutes

export enum Environment {
  LOCALHOST = 'localhost',
  STAGING = 'staging',
}

export enum SbApiUrl {
  LOCALHOST = 'http://localhost:5000/',
}

export const SITE_NAME = 'Sb'
export const MAX_PAGE_SIZE = 25
export const BASE_SLACK_URI = 'https://ca.slack-edge.com'
export const DefaultDateFormat = 'YYYY-MM-DD'
export const DefaultDateTimeFormat = 'YYYY-MM-DD HH:mm:ss'
export const DefaultTimeFormat = 'HH:mm:ss'
export const DefaultVatRateFormat = new Intl.NumberFormat('fr-FR', {
  style: 'percent',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
})

export enum Role {
  visitor = 'sb-visitor',
  admin = 'sb-admin',
  accountingUser = 'sb-accounting-user',
  accountingManager = 'sb-accounting-manager',
  fiscalreportManager = 'sb-fiscalreport-manager',
}

export enum Feature {
  validateIntrastat = 'validateIntrastat',
  manage = 'manage',
}

export enum Endpoint {
  INTRASTRASTS = '/intrastats',
  USERS = '/users',
}

export enum ExportGoodsReceiptsStatus {
  CANCEL = 'CANCEL',
  RETRY = 'RETRY',
}

export enum SbPage {
  home = '/',
  manageIntrastat = '/reports/manageIntrastat',
  intrastat = '/reports/intrastat',
  intrastatUpload = '/reports/intrastatUpload',
}

export const MENU_ITEMS = [
  {
    title: 'Home',
    href: SbPage.home,
    icon: 'Home',
  },
  {
    title: 'Reports',
    icon: 'Reports',
    expanded: false,
    children: [
      {
        title: 'Intrastat',
        href: SbPage.intrastat,
        icon: 'ReportsIntrastat',
        child: true,
      },
      {
        title: 'Intrastat Upload',
        href: SbPage.intrastatUpload,
        icon: 'ReportsIntrastat',
        child: true,
      },
      {
        title: 'Manage intrastat',
        href: SbPage.manageIntrastat,
        icon: 'ManageIntrastat',
        child: true,
      },
    ],
  },
]

export const MENU_USER_ITEMS = [
  {
    title: 'About',
    href: SbPage.intrastat,
    icon: 'Info',
  },
]

export const MENU_MONITORING_ITEMS = [
  {
    title: 'Elastic',
    href: SbPage.intrastat,
    icon: 'Elastic',
  },
]

export enum ExportStatusGroup {
  OK = 'OK',
  KO = 'KO',
  WAITING = 'WAITING',
  OTHER = 'OTHER',
}

export enum GlobalParameter {
  ExportsEnabled,
  SamEnabled,
}

export enum ProcessStatus {
  InProgress = 'InProgress',
  Done = 'Done',
  Error = 'Error',
  Ignored = 'Ignored',
  ErrorChecked = 'ErrorChecked',
}

export enum SbHistoryAction {
  Delete = 'Delete',
  Insert = 'Insert',
  Gateway = 'Gateway',
  Update = 'Update',
}

export enum SbHistoryBusinessUnit {
  Intrastats = 'Intrastats'
}

export enum NodeType {
  Campaign = 'Campaign',
  Item = 'Item',
  AccountingType = 'AccountingType',
}
