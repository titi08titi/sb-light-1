import DownloadIcon from '@mui/icons-material/Download'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'

interface DownloadReportButtonProps {
  year: number
  month?: number
  quarter?: number
  semester?: number
  onDownloadClick?: (period: string) => void
  isDownloading?: boolean
}

export function DownloadReportButton(props: DownloadReportButtonProps) {
  const { year, month, quarter, semester, isDownloading, onDownloadClick } = props

  // Détermination du format correct pour `period`
  let period: string = year.toString()

  if (semester) {
    period = `${year}S${semester}`
  } else if (quarter) {
    period = `${year}Q${quarter}`
  } else if (month) {
    period = `${year}${month.toString().padStart(2, '0')}`
  }

  const handleClick = () => {
    if (!isDownloading && onDownloadClick) {
      onDownloadClick(period)
    }
  }

  return (
    <Tooltip title="Download Report">
      <IconButton 
        onClick={handleClick}
        color="secondary"
        disabled={isDownloading}
      >
        {isDownloading ? (
          <CircularProgress size={24} color="secondary" />
        ) : (
          <DownloadIcon />
        )}
      </IconButton>
    </Tooltip>
  )
}
