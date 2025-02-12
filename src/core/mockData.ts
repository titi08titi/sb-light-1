import { 
  Process, 
  ProcessInfoSummary,
  ProcessStatistic,
  ProcessNameModel,
  GlobalParameterModel,
  IntrastatHistoryModel,
  IntrastatResultModel,
  IntrastatErrorModel,
  IntrastatItemWithoutCodeModel,
  IntrastatCampaignWithoutTaxNumberModel
} from '#utils/global'

// Mock data for processes
export const mockProcesses: Process[] = [
  {
    id: 1,
    name: "ImportStocks",
    comment: "Import stocks from warehouse",
    nbProcessedRows: 1500,
    variationDate: "2024-01-22",
    duration: "00:05:23",
    assemblyName: "Sb.Process",
    assemblyVersion: "1.0.0",
    creationDate: "2024-01-22T08:00:00",
    modificationDate: "2024-01-22T08:05:23",
    status: "Done"
  },
  {
    id: 2, 
    name: "ProcessData",
    comment: "Process warehouse data",
    nbProcessedRows: 1200,
    variationDate: "2024-01-22",
    duration: "00:03:45",
    assemblyName: "Sb.Process",
    assemblyVersion: "1.0.0", 
    creationDate: "2024-01-22T08:05:23",
    modificationDate: "2024-01-22T08:09:08",
    status: "Done"
  },
  {
    id: 3,
    name: "SendDataWarehouseRefresh",
    comment: "Send data to warehouse",
    nbProcessedRows: 1000,
    variationDate: "2024-01-22",
    duration: "00:02:15",
    assemblyName: "Sb.Process",
    assemblyVersion: "1.0.0",
    creationDate: "2024-01-22T08:09:08",
    modificationDate: "2024-01-22T08:11:23",
    status: "Done"
  }
]

// Mock data for process summary
export const mockProcessSummary: ProcessInfoSummary = {
  lastProcessesInfo: [
    {
      processId: 1,
      processName: "ImportStocks",
      processComment: "Import completed successfully",
      nbProcessedRows: 1500,
      processStatus: "Done",
      variationDate: "2024-01-22",
      modificationDate: "2024-01-22T08:05:23",
      creationDate: "2024-01-22T08:00:00",
      duration: "00:05:23",
      hasFailed: false,
      isFinished: true
    },
    {
      processId: 2,
      processName: "ProcessData", 
      processComment: "Processing completed successfully",
      nbProcessedRows: 1200,
      processStatus: "Done",
      variationDate: "2024-01-22",
      modificationDate: "2024-01-22T08:09:08",
      creationDate: "2024-01-22T08:05:23",
      duration: "00:03:45",
      hasFailed: false,
      isFinished: true
    },
    {
      processId: 3,
      processName: "SendDataWarehouseRefresh",
      processComment: "Data sent successfully",
      nbProcessedRows: 1000,
      processStatus: "Done", 
      variationDate: "2024-01-22",
      modificationDate: "2024-01-22T08:11:23",
      creationDate: "2024-01-22T08:09:08",
      duration: "00:02:15",
      hasFailed: false,
      isFinished: true
    }
  ],
  areFinished: true,
  areValid: true,
  isUnprocessedFSP: false,
  isUnprocessedGR: false,
  processesInError: ""
}

// Mock data for process statistics
export const mockProcessStatistics: ProcessStatistic[] = [
  {
    eventId: 1,
    simEventDate: "2024-01-22",
    startProcessDate: "2024-01-22T08:00:00",
    waitDuration: "00:00:00",
    importDoneDate: "2024-01-22T08:05:23",
    importDuration: "00:05:23",
    computationDoneDate: "2024-01-22T08:09:08", 
    computationDuration: "00:03:45",
    exportDoneDate: "2024-01-22T08:11:23",
    exportDuration: "00:02:15",
    fullProcessDuration: "00:11:23"
  },
  {
    eventId: 2,
    simEventDate: "2024-01-23",
    startProcessDate: "2024-01-23T08:00:00",
    waitDuration: "00:00:00",
    importDoneDate: "2024-01-23T08:04:45",
    importDuration: "00:04:45",
    computationDoneDate: "2024-01-23T08:08:15",
    computationDuration: "00:03:30",
    exportDoneDate: "2024-01-23T08:10:00",
    exportDuration: "00:01:45",
    fullProcessDuration: "00:10:00"
  }
]

// Mock data for process names
export const mockProcessNames: ProcessNameModel[] = [
  {
    name: "ImportStocks",
    shortName: "Import",
    longName: "Import Stocks Process",
    category: "Import",
    displayOrder: 1,
    service: "Sb.Import",
    workflowId: 1,
    creationDate: "2024-01-01T00:00:00",
    modificationDate: "2024-01-01T00:00:00"
  },
  {
    name: "ProcessData",
    shortName: "Process",
    longName: "Process Data",
    category: "Process",
    displayOrder: 2,
    service: "Sb.Process",
    workflowId: 2,
    creationDate: "2024-01-01T00:00:00",
    modificationDate: "2024-01-01T00:00:00"
  },
  {
    name: "SendDataWarehouseRefresh",
    shortName: "Send",
    longName: "Send Data Warehouse Refresh",
    category: "Export",
    displayOrder: 3,
    service: "Sb.Export",
    workflowId: 3,
    creationDate: "2024-01-01T00:00:00",
    modificationDate: "2024-01-01T00:00:00"
  }
]

// Mock data for global parameters
export const mockGlobalParameters: GlobalParameterModel[] = [
  {
    key: "SAM.ENABLED",
    value: "true",
    creationDate: "2024-01-01T00:00:00",
    modificationDate: "2024-01-01T00:00:00"
  },
  {
    key: "SAM.EXPORTS.ENABLED",
    value: "true", 
    creationDate: "2024-01-01T00:00:00",
    modificationDate: "2024-01-01T00:00:00"
  }
]

// Mock data for intrastat
export const mockIntrastatHistory: IntrastatHistoryModel[] = [
  {
    year: 2024,
    month: 1,
    variationDate: "2024-01-01",
    isOpen: true
  },
  {
    year: 2023,
    month: 12,
    variationDate: "2023-12-01",
    isOpen: false
  }
]

export const mockIntrastatResults: IntrastatResultModel[] = [
  {
    year: 2024,
    month: 1,
    type: "IMPORT",
    campaign: "CAMPAIGN1",
    originCountry: "FR",
    destinationCountry: "IT",
    intrastatCode: "12345678",
    supplier: "Supplier 1",
    supplierTaxNumber: "FR123456789",
    customer: "Customer 1",
    customerTaxNumber: "IT987654321",
    quantity: 100,
    amount: 1000,
    currency: "EUR",
    weight: 500,
    isError: false,
    modificationDate: "2024-01-15"
  }
]

export const mockIntrastatErrors: IntrastatErrorModel[] = [
  {
    year: 2024,
    month: 1,
    type: "IMPORT",
    intrastatMissing: 2,
    taxNumberMissing: 1,
    weightMissing: 3,
    modificationDate: "2024-01-15"
  }
]

export const mockIntrastatItemsWithoutCode: IntrastatItemWithoutCodeModel[] = [
  {
    year: 2024,
    month: 1,
    campaign: "CAMPAIGN1",
    itemId: 12345
  }
]

export const mockIntrastatCampaignsWithoutTaxNumber: IntrastatCampaignWithoutTaxNumberModel[] = [
  {
    debTypeCode: "DEB1",
    campaign: "CAMPAIGN1",
    supplierCustomerId: "SUP123",
    sourceCountry: "FR",
    targetCountry: "IT",
    stockCode: "STOCK1",
    purchaseOrder: "PO123"
  }
]</content>