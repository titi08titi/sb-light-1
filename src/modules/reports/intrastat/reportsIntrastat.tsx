import { useState } from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import DownloadIcon from '@mui/icons-material/Download'
import { toast } from 'react-toastify'

import { IntrastatReportsTable } from '#components'
import { CountrySelector } from '#components/common/CountrySelector'
import { PeriodSelector } from '#components/common/PeriodSelector'
import { ConfirmDialog } from '#components/common/ConfirmDialog'
import { ErrorBoundary } from '#components/common/ErrorBoundary'

import { Country } from '#utils/countries'
import { Period } from '#utils/periods'
import { splitPeriod } from '../helper'
import { useDownloadIntrastat, useIntrastatHistoryArchives } from './queries'

export default function ReportsIntrastat() {
  const {
    //isLoading: isIntrastatArchivesLoading,
    //isError: isIntrastatArchivesError,
    //isSuccess: isIntrastatArchivesSuccess,
    //error: errorIntrastatArchives,
    data: dataIntrastatHistoryArchives,
  } = useIntrastatHistoryArchives()

  //const [data] = useState(mockData)
  const [isDownloading, setIsDownloading] = useState(false)
  const [sourceCountry, setSourceCountry] = useState<Country | null>(null)
  const [destinationCountry, setDestinationCountry] = useState<Country | null>(null)
  const [selectedPeriod, setSelectedPeriod] = useState<Period | null>(null)
  const [confirmOpen, setConfirmOpen] = useState(false)

  const downloadQuery = useDownloadIntrastat(
    sourceCountry ? [sourceCountry] : [],
    destinationCountry ? [destinationCountry] : [],
    selectedPeriod
  )

  const handleDownload = async () => {
    if (isDownloading) return

    setIsDownloading(true)
    try {
      const { data: fileData } = await downloadQuery.refetch()

      if (!fileData) {
        throw new Error('No data received')
      }

      // Création du fichier et téléchargement
      const url = window.URL.createObjectURL(fileData)
      const link = document.createElement('a')
      link.href = url

      // Extraction du format `largePeriod`
      let largePeriodLabel = selectedPeriod?.label || 'ALL'
      try {
        const { year, month, quarter, semester, type } = splitPeriod(selectedPeriod?.label || '')

        if (type === 'year') {
          largePeriodLabel = year
        } else if (type === 'month') {
          largePeriodLabel = `${year}${month}`
        } else if (type === 'quarter') {
          largePeriodLabel = `${year}Q${quarter}`
        } else if (type === 'semester') {
          largePeriodLabel = `${year}S${semester}`
        }
      } catch (e) {
        console.warn('Invalid period format, using raw label:', selectedPeriod?.label)
      }

      const sourceCode = sourceCountry?.code || 'ALL'
      const destCode = destinationCountry?.code || 'ALL'
      const timestamp = new Date().toISOString().split('T')[0]
      link.download = `intrastat_${sourceCode}_to_${destCode}_${largePeriodLabel}_${timestamp}.xlsx`

      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      setTimeout(() => {
        window.URL.revokeObjectURL(url)
      }, 100)

      toast.success('Report downloaded successfully')
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Failed to download report'
      toast.error(message)
      console.error('Download error:', error)
    } finally {
      setIsDownloading(false)
      setConfirmOpen(false)
    }
  }

  const handleCancel = () => {
    setConfirmOpen(false)
  }

  const getConfirmationMessage = () => {
    const from = sourceCountry?.name || 'all countries'
    const to = destinationCountry?.name || 'all countries'
    const period = selectedPeriod?.label ? ` for ${selectedPeriod.label}` : ''
    
    return `Do you want to download the Intrastat report for goods flow from ${from} to ${to}${period}?`

  }

  return (
    <ErrorBoundary>
      <Stack spacing={3} sx={{ mb: 3 }}>
        <Stack direction="row" spacing={2} alignItems="flex-start">
          <Box sx={{ flex: 1 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Select flow direction:
            </Typography>
            <Stack direction="row" spacing={2} alignItems="center">
              <Box sx={{ width: 300 }}>
                <CountrySelector
                  value={sourceCountry}
                  onChange={setSourceCountry}
                  label="Source Country"
                />
              </Box>
              <Typography variant="h6" color="text.secondary">→</Typography>
              <Box sx={{ width: 300 }}>
                <CountrySelector
                  value={destinationCountry}
                  onChange={setDestinationCountry}
                  label="Destination Country"
                />
              </Box>
            </Stack>
          </Box>
          <Box sx={{ width: 600 }}>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              Choose a specific period:
            </Typography>
            <PeriodSelector
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              label="Select Period"
            />
          </Box>
          <Box sx={{ pt: 4 }}>
            <Button
              variant="contained"
              color="secondary"
              startIcon={<DownloadIcon />}
              onClick={() => setConfirmOpen(true)}
              disabled={isDownloading}
            >
              {isDownloading ? 'Downloading...' : 'Download'}
            </Button>
          </Box>
        </Stack>
      </Stack>

      <IntrastatReportsTable 
        dataSet={dataIntrastatHistoryArchives}
        onDownloadClick={handleDownload}
        isDownloading={isDownloading}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="Confirm Download"
        message={getConfirmationMessage()}
        onConfirm={handleDownload}
        onCancel={handleCancel}
      />
    </ErrorBoundary>
  )
}



/*
  const {
    isLoading: isIntrastatArchivesLoading,
    isError: isIntrastatArchivesError,
    isSuccess: isIntrastatArchivesSuccess,
    error: errorIntrastatArchives,
    data: dataIntrastatHistoryArchives,
  } = useIntrastatHistoryArchives()

  const [selectedPeriod, setSelectedPeriod] = React.useState<string>('')

  const {
    data: dataDownloadedFile,
    isError: isIntrastatDownloadedFileError,
    isFetched: isIntrastatDownloadedFileFetched,
    error: errorIntrastatDownloadedFile,
  } = useDownloadIntrastatReport(selectedPeriod)

  useEffect(() => {
    if (isIntrastatArchivesError) {
      toast.error(`Intrastrat archives error: ${errorIntrastatArchives}`)
    }
  }, [isIntrastatArchivesError, errorIntrastatArchives])

  useEffect(() => {
    if (isIntrastatDownloadedFileError) {
      toast.error(`Intrastat downloaded file error: ${errorIntrastatDownloadedFile}`)
    }
  }, [isIntrastatDownloadedFileError, errorIntrastatDownloadedFile])

  useEffect(() => {
    if (dataDownloadedFile) {
      toast.success(`Intrastrat downloaded file success for the period: ${selectedPeriod}`)
      const url = window.URL.createObjectURL(dataDownloadedFile)
      const link = document.createElement('a')
      link.href = url
      const { year, month } = splitPeriod(selectedPeriod)
      const filename = `intrastat_${year}_${month}.xlsx`
      link.setAttribute('download', filename)
      document.body.appendChild(link)
      link.click()
    }
  }, [dataDownloadedFile])

  const handleDownloadReport = (period: string) => {
    setSelectedPeriod(period)
  }

  const renderReportsArchives = () => {
    return (
      <>
        {isIntrastatArchivesLoading && <Loader />}
        {isIntrastatArchivesError && <UnexpectedError />}
        {isIntrastatArchivesSuccess && (
          <IntrastatReportsTable
            dataSet={dataIntrastatHistoryArchives}
            onDownloadClick={handleDownloadReport}
            isDownloaded={isIntrastatDownloadedFileFetched}
          />
        )}
      </>
    )
    */