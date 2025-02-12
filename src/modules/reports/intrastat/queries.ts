import { useQuery } from '@tanstack/react-query'

import { getSbClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import { IntrastatHistoryModel } from '#utils/global'

import { splitPeriod } from '../helper'
import { Country } from '#utils/countries'
import { Period } from '#utils/periods'

interface DownloadParams {
  largePeriod?: string // Format dynamique (ex: "2024Q3", "202401", "2024")
  sourceCountries?: string[] // Liste des pays source
  targetCountries?: string[] // Liste des pays destination
}

export const downloadIntrastat = async (params: DownloadParams): Promise<Blob> => {
  try {
    const sbClient = await getSbClientWithToken()
    const queryParams = new URLSearchParams()

    if (params.largePeriod) {
      queryParams.append('largeperiod', params.largePeriod)
    }
    if (params.sourceCountries && params.sourceCountries.length > 0) {
      queryParams.append('sourcecountries', params.sourceCountries.join(';'))
    }
    if (params.targetCountries && params.targetCountries.length > 0) {
      queryParams.append('targetcountries', params.targetCountries.join(';'))
    }

    const response = await sbClient.get(`/intrastats/download-by-params?${queryParams.toString()}`, {
      responseType: 'blob',
      timeout: 30000
    })

    return new Blob([response.data], { 
      type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    })
  } catch (error) {
    console.error('Download error:', error)
    throw new Error(error instanceof Error ? error.message : 'Failed to download report')
  }
}

export const useDownloadIntrastat = (sourceCountries?: Country[] | null, targetCountries?: Country[] | null, period?: Period | null) => {
  return useQuery(
    ['intrastat', 'download', { 
      sourceCountries: sourceCountries?.map(c => c.code), 
      targetCountries: targetCountries?.map(c => c.code),
      period: period?.label 
    }],
    () => downloadIntrastat({
      largePeriod: period ? period.label : undefined, // On envoie directement `largePeriod`
      sourceCountries: sourceCountries?.map(c => c.code),
      targetCountries: targetCountries?.map(c => c.code)
    }),
    {
      enabled: false,
      cacheTime: 0,
      retry: 1,
      retryDelay: 1000
    }
  )
}

// Download with filters
const fetchDownloadIntrastatReport = async ({ queryKey }) => {
  const [, period] = queryKey
  const { year, quarter, semester, month, type } = splitPeriod(period)

  const sbClientWithToken = await getSbClientWithToken()
  const searchParams = new URLSearchParams()

  let largePeriod: string
  switch (type) {
    case 'year':
      largePeriod = year
      break
    case 'quarter':
      largePeriod = `${year}Q${quarter}`
      break
    case 'semester':
      largePeriod = `${year}S${semester}`
      break
    case 'month':
      largePeriod = `${year}${month}`
      break
    default:
      throw new Error('Unknown period type')
  }

  searchParams.append('largeperiod', largePeriod)

  return sbClientWithToken
    .get(`${Endpoint.INTRASTRASTS}/download-by-params?${searchParams.toString()}`, { responseType: 'blob' })
    .then((res) => res.data)
}

const useDownloadIntrastatReport = (sourceCountries?: Country[] | null, targetCountries?: Country[] | null, period?: Period | null) => 
  useQuery(
    ['ReportsIntrastat_Get_DownloadIntrastatReport', period?.label], 
    fetchDownloadIntrastatReport, 
    {
      enabled: !!period,
      refetchOnWindowFocus: false,
      cacheTime: 0,
    }
  )


export const useIntrastatHistoryArchives = () => {
  const fetchIntrastatHistoryArchives = async () => {
    const sbClientWithToken = await getSbClientWithToken()
    return sbClientWithToken.get(`${Endpoint.INTRASTRASTS}/history-archives`).then((res) => res.data)
  }

  return useQuery<IntrastatHistoryModel[]>(
    ['ReportsIntrastat_Get_IntrastatHistoryArchives'], fetchIntrastatHistoryArchives)
}



/////////////OLD//////////////////////
/*
const fetchIntrastatHistoryArchives = async () => {
  const sbClientWithToken = await getSbClientWithToken()
  return sbClientWithToken.get(`${Endpoint.INTRASTRASTS}/history-archives`).then((res) => res.data)
}

const useIntrastatHistoryArchives = () =>
  useQuery<IntrastatHistoryModel[]>(['ReportsIntrastat_Get_IntrastatHistoryArchives'], fetchIntrastatHistoryArchives)

const fetchDownloadIntrastatReport = async ({ queryKey }) => {
  const [, period] = queryKey
  const { month, year } = splitPeriod(period)

  const sbClientWithToken = await getSbClientWithToken()
  const searchParams = new URLSearchParams()
  searchParams.append('year', year)
  searchParams.append('month', month)
  return sbClientWithToken
    .get(`${Endpoint.INTRASTRASTS}/download?${searchParams.toString()}`, { responseType: 'blob' })
    .then((res) => res.data)
}

const useDownloadIntrastatReport = (period: string) =>
  useQuery(['ReportsIntrastat_Get_DownloadIntrastatReport', period], fetchDownloadIntrastatReport, {
    enabled: !!period,
    refetchOnWindowFocus: false,
    cacheTime: 0,
  })

export { useIntrastatHistoryArchives, useDownloadIntrastatReport }
*/