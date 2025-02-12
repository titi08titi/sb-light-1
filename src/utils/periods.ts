export type PeriodType = 'month' | 'quarter' | 'semester' | 'year'

export interface Period {
  type: PeriodType
  year: number
  quarter?: number
  semester?: number
  month?: number
  label: string
}

export function generatePeriods(startYear: number = new Date().getFullYear() - 2): Period[] {
  const currentYear = new Date().getFullYear()
  const periods: Period[] = []

  // Générer les périodes pour les 2 dernières années + l’année en cours
  for (let year = currentYear; year >= startYear; year--) {
    // 🔹 Ajout de l'année
    periods.push({
      type: 'year',
      year,
      label: `${year}`
    })

    // 🔹 Ajout des semestres
    for (let semester = 1; semester <= 2; semester++) {
      periods.push({
        type: 'semester',
        year,
        semester,
        label: `${year}-S${semester}`
      })
    }

    // 🔹 Ajout des trimestres
    for (let quarter = 1; quarter <= 4; quarter++) {
      periods.push({
        type: 'quarter',
        year,
        quarter,
        label: `${year}-Q${quarter}`
      })
    }

    // 🔹 Ajout des mois
    for (let month = 1; month <= 12; month++) {
      periods.push({
        type: 'month',
        year,
        month,
        label: `${year.toString().substring(2, 4)}-${month.toString().padStart(2, '0')}`
      })
    }
  }

  return periods
}
