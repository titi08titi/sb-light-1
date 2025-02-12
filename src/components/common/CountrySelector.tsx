import { Autocomplete, Box, TextField } from '@mui/material'
import { FlagIcon, FlagIconCode } from 'react-flag-kit'
import { COUNTRIES, Country } from '../../utils/countries'

interface CountrySelectorProps {
  value: Country | null
  onChange: (country: Country | null) => void
  label?: string
  error?: boolean
  helperText?: string
  required?: boolean
}

export function CountrySelector({ 
  value,
  onChange,
  label = 'Country',
  error = false,
  helperText,
  required = false
}: CountrySelectorProps) {
  return (
    <Autocomplete
      value={value}
      onChange={(_, newValue) => onChange(newValue)}
      options={COUNTRIES}
      getOptionLabel={(option) => `${option.code} - ${option.name}`}
      renderOption={(props, option) => (
        <Box component="li" sx={{ '& > img': { mr: 2, flexShrink: 0 } }} {...props}>
          <FlagIcon code={option.code as FlagIconCode} size={20} />
          <Box sx={{ ml: 2 }}>
            {option.code} - {option.name}
          </Box>
        </Box>
      )}
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
              <Box sx={{ ml: 1, mr: -0.5 }}>
                <FlagIcon code={value.code as FlagIconCode} size={20} />
              </Box>
            )
          }}
        />
      )}
    />
  )
}