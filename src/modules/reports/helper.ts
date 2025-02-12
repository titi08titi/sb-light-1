export const splitPeriod = (period: string) => {
  if (!period) {
    throw new Error('Invalid period. Expected format is YYYY, YYYYQn, YYYYSn, or YYYYMM.')
  }

  const yearMatch = period.match(/^(\d{4})$/) // Année (2024)
  const quarterMatch = period.match(/^(\d{4})Q([1-4])$/) // Trimestre (2024Q1)
  const semesterMatch = period.match(/^(\d{4})S([1-2])$/) // Semestre (2024S1)
  const monthMatch = period.match(/^(\d{4})(0[1-9]|1[0-2])$/) // Mois (202401)

  if (yearMatch) {
    return { year: yearMatch[1], type: 'year' }
  } else if (quarterMatch) {
    return { year: quarterMatch[1], quarter: quarterMatch[2], type: 'quarter' }
  } else if (semesterMatch) {
    return { year: semesterMatch[1], semester: semesterMatch[2], type: 'semester' }
  } else if (monthMatch) {
    return { year: monthMatch[1], month: monthMatch[2], type: 'month' }
  }

  throw new Error('Invalid period format. Expected YYYY, YYYYQn, YYYYSn, or YYYYMM.')
}
