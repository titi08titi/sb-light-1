import axios from 'axios'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000'

// Create axios instance with default config
const sbClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
})

// Mock data generator for development
const generateMockExcelData = () => {
  const header = ['Country', 'Year', 'Month', 'Type', 'Amount', 'Currency']
  const rows = [
    ['FR', '2024', '01', 'IMPORT', '1000', 'EUR'],
    ['DE', '2024', '01', 'EXPORT', '2000', 'EUR'],
    ['IT', '2024', '01', 'IMPORT', '3000', 'EUR']
  ]
  const csvContent = [header, ...rows]
    .map(row => row.join(','))
    .join('\n')

  return Buffer.from(csvContent, 'utf-8')
}

// Mock interceptor for development
sbClient.interceptors.response.use(
  async (response) => {
    if (response.config.url?.includes('/intrastats/download')) {
      try {
        const mockData = generateMockExcelData()
        const blob = new Blob([mockData], {
          type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        })
        return {
          ...response,
          data: blob,
          status: 200,
          statusText: 'OK',
          headers: {
            'content-type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'content-disposition': 'attachment; filename=intrastat.xlsx'
          }
        }
      } catch (error) {
        console.error('Mock data generation failed:', error)
        throw new Error('Failed to generate mock data')
      }
    }
    return response
  },
  (error) => {
    if (error.code === 'ECONNABORTED') {
      return Promise.reject(new Error('Request timeout - please try again'))
    }
    if (error.response?.status === 404) {
      return Promise.reject(new Error('Report not found'))
    }
    if (error.response?.status === 403) {
      return Promise.reject(new Error('Not authorized to download this report'))
    }
    return Promise.reject(error)
  }
)

export const getSbClientWithToken = async () => {
  return sbClient
}

export default sbClient