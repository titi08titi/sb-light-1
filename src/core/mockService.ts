import {
  mockProcesses,
  mockProcessSummary,
  mockProcessStatistics,
  mockProcessNames,
  mockGlobalParameters,
  mockIntrastatHistory,
  mockIntrastatResults,
  mockIntrastatErrors,
  mockIntrastatItemsWithoutCode,
  mockIntrastatCampaignsWithoutTaxNumber
} from './mockData'

class MockService {
  async getProcesses() {
    return mockProcesses
  }

  async getProcessSummary() {
    return mockProcessSummary
  }

  async getProcessStatistics() {
    return mockProcessStatistics
  }

  async getProcessNames() {
    return mockProcessNames
  }

  async getGlobalParameter(key: string) {
    return mockGlobalParameters.find(p => p.key === key)
  }

  async updateGlobalParameter(key: string, value: string) {
    const param = mockGlobalParameters.find(p => p.key === key)
    if (param) {
      param.value = value
      return true
    }
    return false
  }

  async getIntrastatHistory() {
    return mockIntrastatHistory
  }

  async getIntrastatResults() {
    return mockIntrastatResults
  }

  async getIntrastatErrors() {
    return mockIntrastatErrors
  }

  async getIntrastatItemsWithoutCode() {
    return mockIntrastatItemsWithoutCode
  }

  async getIntrastatCampaignsWithoutTaxNumber() {
    return mockIntrastatCampaignsWithoutTaxNumber
  }

  async downloadIntrastatReport() {
    // Mock a blob response
    return new Blob(['Mock Intrastat Report'], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' })
  }
}</content>