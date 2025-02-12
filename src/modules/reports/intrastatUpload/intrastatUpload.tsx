import { Grid } from '@mui/material'
import { FileUploadSection } from '#components/common/FileUploadSection'
import { useIntrastatUpload } from './queries'
import { FileData } from './types'

export default function IntrastatUpload() {
  const { uploadTaxNumbers, uploadIntrastatCodes } = useIntrastatUpload()

  const handleTaxNumberUpload = async (data: FileData[]) => {
    const result = await uploadTaxNumbers.mutateAsync(data)
    return result.count
  }

  const handleIntrastatCodeUpload = async (data: FileData[]) => {
    const result = await uploadIntrastatCodes.mutateAsync(data)
    return result.count
  }

  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <FileUploadSection
          title="Tax Numbers"
          acceptedFileTypes=".csv"
          onUpload={handleTaxNumberUpload}
          confirmMessage="Are you sure you want to update the Tax Numbers?"
          successMessage={(count) => `${count} Tax Numbers have been successfully updated!`}
        />
      </Grid>
      <Grid item xs={6}>
        <FileUploadSection
          title="Intrastat Codes"
          acceptedFileTypes=".csv"
          onUpload={handleIntrastatCodeUpload}
          confirmMessage="Are you sure you want to update the Intrastat Codes?"
          successMessage={(count) => `${count} Intrastat Codes have been successfully updated!`}
        />
      </Grid>
    </Grid>
  )
}



/*

import Grid from '@mui/material/Grid2'

import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ExpandableCard, ExpandableErrorPanel } from '#components/common'
import TaxNumberActionTable from '#components/support/TaxNumberActionTable'
import { hasFeatureAccess } from '#core/authorizations'
import useAuth from '#hooks/useAuth'
import { Feature, SbPage } from '#utils/constants'
import { ErrorInfo, TaxNumberModel } from '#utils/global'

import { useCreateTaxNumbers } from './queries'

export default function Imports() {
  const [taxNumbers, setTaxNumbers] = React.useState<TaxNumberModel[]>()
  const [csvErrors, setCsvErrors] = useState<ErrorInfo[]>([])
  const {
    mutate: mutateCreateTaxNumbers,
    isSuccess: isCreateTaxNumbersSuccess,
    error: errorCreateTaxNumbers,
  } = useCreateTaxNumbers(taxNumbers)

  const { userRoles } = useAuth()
  const hasRights = hasFeatureAccess(SbPage.supportImports, Feature.supportImports, userRoles)

  useEffect(() => {
    if (isCreateTaxNumbersSuccess) {
      toast.success('Create tax number successfully saved')
    } else if (errorCreateTaxNumbers) {
      toast.error('Error occurred during creating tax numbers ')
    }
  }, [isCreateTaxNumbersSuccess, errorCreateTaxNumbers])

  function handleUploading(): void {
    setCsvErrors([])
  }

  function handleFileUploaded(file: File | null): void {
    toast.info(`File uploaded successfully ${file.name}`)
  }

  function handleSave(taxNumbers: TaxNumberModel[]): void {
    setTaxNumbers(taxNumbers)
    mutateCreateTaxNumbers({ taxNumbers })
  }

  function handleErrors(errors: ErrorInfo[]): void {
    setCsvErrors(errors)
  }

  function handleParseErrors(errors: Papa.ParseError[]): void {
    toast.error(`Import errors: ${errors.flatMap((e) => e.message).join(', ')}`)
  }

  return (
    <Grid container>
      <Grid size={12}>
        {hasRights && (
          <ExpandableCard title={'Import tax number'} className="mt-5" open>
            {csvErrors.length > 0 && (
              <Grid size={12}>
                <ExpandableErrorPanel
                  open
                  className="mb-5"
                  errors={csvErrors}
                  message="Uploaded file contains one or more errors"
                  title={'Error'}
                />
              </Grid>
            )}
            <Grid size={12}>
              <TaxNumberActionTable
                onUploading={handleUploading}
                onFileUploaded={handleFileUploaded}
                onSave={handleSave}
                onErrors={handleErrors}
                onParseErrors={handleParseErrors}
              />
            </Grid>
          </ExpandableCard>
        )}
      </Grid>
    </Grid>
  )
}


*/