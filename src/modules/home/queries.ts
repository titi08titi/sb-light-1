import { useQuery } from '@tanstack/react-query'

import moment from 'moment'

import { getSbClientWithToken } from '#core/client'
import { DefaultDateFormat, Endpoint } from '#utils/constants'
import { ProcessInfoSummary, ProcessStatistic } from '#utils/global'

export interface ProcessStatisticsKey {
  startDate?: string
  endDate?: string
}

async function getProcessesInfoSummary() {
  const sbClientWithToken = await getSbClientWithToken()
  return sbClientWithToken.get(`${Endpoint.PROCESSES}/summary`).then((res) => res.data)
}

const useProcessesInfoSummary = () => useQuery<ProcessInfoSummary>(['Home_Get_ProcessesInfoSummary'], getProcessesInfoSummary)

async function getProcessesStatistics({ queryKey }) {
  const [, filters] = queryKey
  const searchParams = new URLSearchParams()
  let filter = ''
  const sbClientWithToken = await getSbClientWithToken()

  if (filters) {
    if (filters.startDate) {
      searchParams.append('startDate', moment(filters.startDate).format(DefaultDateFormat))
    }
    if (filters.endDate) {
      searchParams.append('endDate', moment(filters.endDate).format(DefaultDateFormat))
    }
    filter = `?${searchParams.toString()}`
  }
  return sbClientWithToken.get(`${Endpoint.PROCESSES}/statistics${filter}`).then((res) => res.data)
}

const useProcessesStatistics = (processStatisticsKey?: ProcessStatisticsKey) =>
  useQuery<ProcessStatistic[]>(['Home_Get_ProcessesStatistics', processStatisticsKey], getProcessesStatistics)

export { useProcessesInfoSummary, useProcessesStatistics }
