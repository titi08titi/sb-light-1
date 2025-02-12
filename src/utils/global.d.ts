// Auth type definitions
export type User = {
  id?: string | null
  name?: string | null
  email?: string | null
}

export type JWTToken = {
  accessToken: string | undefined
  refreshToken: string | undefined
  accessTokenExpiresAt: number | undefined
  refreshTokenExpiresAt: number
  user: User
}

export type RefreshTokenResponse = {
  access_token: string
  expires_in: number
  refresh_expires_in: number
  refresh_token: string
  token_type: string
  id_token: string
  'not-before-policy': number
  session_state: string
  scope: string
}

// Query type definitions
type Order = 'asc' | 'desc'

// Business type definitions
export type Process = {
  id: number
  name: string
  comment: string
  nbProcessedRows: number
  variationDate: string
  duration: string
  assemblyName: string
  assemblyVersion: string
  creationDate: string
  modificationDate: string
  status: string
}

export interface ProcessInfoSummary {
  lastProcessesInfo: LastProcessesInfo[]
  areFinished: boolean
  areValid: boolean
  isUnprocessedFSP: boolean
  isUnprocessedGR: boolean
  processesInError: string
}

export interface LastProcessesInfo {
  processId: number
  processName: string
  processComment?: string
  nbProcessedRows: number
  processStatus: string
  variationDate?: string
  modificationDate: string
  creationDate: string
  duration: string
  hasFailed: boolean
  isFinished: boolean
}

export interface ProcessStatistic {
  eventId: number
  simEventDate: string
  startProcessDate: string
  waitDuration: string
  importDoneDate: string
  importDuration: string
  computationDoneDate: string
  computationDuration: string
  exportDoneDate: string
  exportDuration: string
  fullProcessDuration: string
}

export interface UserActionLog {
  id: number
  action: string
  businessUnit: string
  comment: string
  email: string
  json: string
  creationDate: string
}

export interface SlackUserModel {
  id: string
  teamId: string
  profile: SlackUserProfileModel
}

export interface SlackUserProfileModel {
  email: string
  imageOriginal: string
  image_24: string
  image_32: string
  image_48: string
  image_72: string
  image_192: string
  image_512: string
  image_1024: string
}

export interface GlobalParameterModel {
  key: string
  value?: string
  creationDate: string
  modificationDate: string
}

export interface TaxNumberModel {
  purchaseOrderUuid: string
  supplierId: number
  taxNumber: string
}

export interface FlowNodeModel {
  id: string
  label: string
  type: NodeType
  final?: boolean
  previous: FlowNodeModel[]
  data?: any
  position?: { x: number; y: number }
  sourcePosition?: 'top' | 'right' | 'bottom' | 'left'
  targetPosition?: 'top' | 'right' | 'bottom' | 'left'
}

export interface ProcessNameModel {
  name: string
  shortName?: string
  longName: string
  category: string
  displayOrder?: number
  service: string
  workflowId?: number
  creationDate: string
  modificationDate: string
}

export interface IntrastatHistoryModel {
  year: number
  month: number
  variationDate: string
  isOpen: boolean
}

export interface IntrastatResultModel {
  year: number
  month: number
  type: string
  campaign: string
  originCountry: string
  destinationCountry: string
  intrastatCode: string
  supplier: string
  supplierTaxNumber: string
  customer: string
  customerTaxNumber: string
  quantity: number
  amount: number
  currency: string
  weight: number
  isError: boolean
  modificationDate: string
}

export interface IntrastatErrorModel {
  year: number
  month: number
  type: string
  intrastatMissing: number
  taxNumberMissing: number
  weightMissing: number
  modificationDate: string
}

export interface IntrastatItemWithoutCodeModel {
  year: number
  month: number
  campaign: string
  itemId: number
}

export interface IntrastatCampaignWithoutTaxNumberModel {
  debTypeCode: string
  campaign: string
  supplierCustomerId?: string
  sourceCountry: string
  targetCountry: string
  stockCode?: string
  purchaseOrder?: string
}

export interface PeriodModel {
  year: number
  month: number
}

