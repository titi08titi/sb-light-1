import DownloadIcon from '@mui/icons-material/Download'
import { CircularProgress, IconButton, Tooltip } from '@mui/material'

interface DownloadReportButtonProps {
  year: string
  month: string
  onDownloadClick?: (period: string) => void
  isDownloading?: boolean
}

export function DownloadReportButton(props: DownloadReportButtonProps) {
  const { year, month, isDownloading, onDownloadClick } = props

  const handleClick = () => {
    if (!isDownloading && onDownloadClick) {
      onDownloadClick(`${year}-${month.toString().padStart(2, '0')}`)
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