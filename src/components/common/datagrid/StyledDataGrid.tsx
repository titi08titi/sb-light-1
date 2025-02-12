import { styled } from '@mui/material/styles'
import { DataGrid } from '@mui/x-data-grid'

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  '& .MuiDataGrid-row.even': {
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : theme.palette.grey[200],
  }
}))

export { StyledDataGrid }