import { Autocomplete, Box, Chip, TextField } from '@mui/material'
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth'
import CalendarViewQuarterIcon from '@mui/icons-material/CalendarViewWeek'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { Period, PeriodType, generatePeriods } from '../../utils/periods'

interface PeriodSelectorProps {
  value: Period | null
  onChange: (period: Period | null) => void
  label?: string
  error?: boolean
  helperText?: string
  required?: boolean
  periodTypes?: PeriodType[]
}

export function PeriodSelector({
  value,
  onChange,
  label = 'Period',
  error = false,
  helperText,
  required = false,
  periodTypes = ['month', 'quarter', 'year']
}: PeriodSelectorProps) {
  const periods = generatePeriods().filter(p => periodTypes.includes(p.type))

  const getIcon = (type: PeriodType) => {
    switch (type) {
      case 'year':
        return <CalendarMonthIcon fontSize="small" />
      case 'quarter':
        return <CalendarViewQuarterIcon fontSize="small" />
      case 'month':
        return <CalendarTodayIcon fontSize="small" />
    }
  }

  const getColor = (type: PeriodType) => {
    switch (type) {
      case 'year':
        return 'primary'
      case 'quarter':
        return 'secondary'
      case 'month':
        return 'info'
    }
  }

  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={periods}
      getOptionLabel={(option) => option.label}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {getIcon(option.type)}
            {option.label}
          </Box>
        </Box>
      )}
      groupBy={(option) => option.type.toUpperCase()}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          required={required}
          error={error}
          helperText={helperText}
          InputProps={{
            ...params.InputProps,
            startAdornment: value && (
              <Box sx={{ ml: 1, mr: 1 }}>
                <Chip
                  icon={getIcon(value.type)}
                  label={value.label}
                  color={getColor(value.type)}
                  size="small"
                />
              </Box>
            )
          }}
        />
      )}
    />
  )
}