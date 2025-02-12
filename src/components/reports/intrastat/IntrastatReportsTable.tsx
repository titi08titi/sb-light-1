import { Box, Chip, Paper } from '@mui/material'
import { GridColDef } from '@mui/x-data-grid'
import moment from 'moment'
import { StyledDataGrid } from '#components/common'
import { DownloadReportButton } from '../DownloadReportButton'
import LockOpenIcon from '@mui/icons-material/LockOpen'
import LockIcon from '@mui/icons-material/Lock'
import { IntrastatHistoryModel } from '#utils/global'

interface IntrastatReportsTableProps {
  dataSet: IntrastatHistoryModel[]
  onDownloadClick?: (period: string) => void
  isDownloading?: boolean
}

export default function IntrastatReportsTable(props: IntrastatReportsTableProps) {
  const { dataSet, onDownloadClick, isDownloading } = props

  const rows = dataSet.map((res, id) => {
    let periodLabel = res.year.toString()
    if (res.semester) periodLabel = `${res.year}S${res.semester}`
    else if (res.quarter) periodLabel = `${res.year}Q${res.quarter}`
    else if (res.month) periodLabel = `${res.year}${res.month.toString().padStart(2, '0')}`

    return { id, ...res, periodLabel }
  })

  const columns: GridColDef[] = [
    { field: 'year', headerName: 'Year', width: 70 },
    { 
      field: 'periodLabel', 
      headerName: 'Period', 
      width: 90,
      renderCell: (params) => (
        <Chip label={params.value} color="primary" size="small" />
      )
    },
    { field: 'processId', headerName: 'Process ID', width: 70 },
    {
      field: 'variationDate',
      headerName: 'Variation Date',
      width: 120,
      valueFormatter: (value: any) => moment(value.value).format('YYYY-MM-DD'),
    },
    { 
      field: 'isOpen', 
      headerName: 'Status', 
      width: 100,
      renderCell: (params) => (
        <Chip
          icon={params.value ? <LockOpenIcon /> : <LockIcon />}
          label={params.value ? 'Open' : 'Archived'}
          color={params.value ? 'success' : 'error'}
          size="small"
          variant="outlined"
          sx={{ 
            minWidth: 85,
            '& .MuiChip-icon': {
              fontSize: 16
            }
          }}
        />
      )
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <DownloadReportButton
          year={params.row.year}
          month={params.row.month}
          quarter={params.row.quarter}
          semester={params.row.semester}
          onDownloadClick={onDownloadClick}
          isDownloaded={isDownloading}
        />
      ),
    }
  ]

  return (
    <Paper elevation={2}>
      <Box sx={{ height: 400, width: '100%' }}>
        <StyledDataGrid
          rows={rows}
          columns={columns}
          disableRowSelectionOnClick
          getRowClassName={(params) => 
            params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
          }
          initialState={{
            pagination: {
              paginationModel: { pageSize: 10 }
            },
          }}
        />
      </Box>
    </Paper>
  )
}
