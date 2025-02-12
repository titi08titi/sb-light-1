import { Stack, FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, Typography } from '@mui/material'
import React from 'react'
import { NoData } from '#components/common'
import { IntrastatHistoryModel } from '#utils/global'
import { DefaultMenuProps } from '#utils/theme'

type IntrastatPeriodFormProps = {
  intrastatHistoryArchives: IntrastatHistoryModel[]
  selectedPeriod?: string
  onPeriodChanged?: (period: string) => void
}

export default function IntrastatPeriodForm(props: IntrastatPeriodFormProps) {
  const { intrastatHistoryArchives, selectedPeriod, onPeriodChanged } = props

  const periods =
    intrastatHistoryArchives != undefined
      ? intrastatHistoryArchives
          .filter((period) => period.isOpen)
          .map((period, id) => {
            let label = period.year.toString()
            let value = period.year.toString()

            if (period.semester) {
              label = `${period.year}S${period.semester}`
              value = `${period.year}S${period.semester}`
            } else if (period.quarter) {
              label = `${period.year}Q${period.quarter}`
              value = `${period.year}Q${period.quarter}`
            } else if (period.month) {
              label = `${period.year}${period.month.toString().padStart(2, '0')}`
              value = `${period.year}${period.month.toString().padStart(2, '0')}`
            }

            return { id, label, value }
          })
      : []

  const handlePeriodChanged = (event: SelectChangeEvent<string>) => {
    onPeriodChanged?.(event.target.value)
  }

  return periods.length > 0 ? (
    <Stack spacing={2} minHeight={450}>
      <Typography color="text.primary">Select the current Intrastat period:</Typography>
      <FormControl sx={{ width: 300 }} size="small">
        <InputLabel id="name-label" color="secondary">
          Period
        </InputLabel>
        <Select
          labelId="name-label"
          id="period"
          color="secondary"
          value={selectedPeriod || ''}
          onChange={handlePeriodChanged}
          input={<OutlinedInput label="Period" />}
          MenuProps={DefaultMenuProps}
        >
          {periods.map((period) => (
            <MenuItem key={period.value} value={period.value}>
              {period.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Stack>
  ) : (
    <NoData message="No period available" />
  )
}
