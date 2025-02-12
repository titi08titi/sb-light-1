import { useMutation } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { FileData, UploadResponse } from './types'

// Define upload functions outside of the hook
const uploadTaxNumbersRequest = async (data: FileData[]): Promise<UploadResponse> => {
  toast.info('This is a demo - Tax numbers upload endpoint would be called here')
  return { count: data.length }
}

const uploadIntrastatCodesRequest = async (data: FileData[]): Promise<UploadResponse> => {
  toast.info('This is a demo - Intrastat codes upload endpoint would be called here')
  return { count: data.length }
}

export const useIntrastatUpload = () => {
  const uploadTaxNumbers = useMutation({
    mutationFn: uploadTaxNumbersRequest,
    onError: (error: Error) => {
      toast.error(`Failed to upload tax numbers: ${error.message}`)
    }
  })

  const uploadIntrastatCodes = useMutation({
    mutationFn: uploadIntrastatCodesRequest,
    onError: (error: Error) => {
      toast.error(`Failed to upload intrastat codes: ${error.message}`)
    }
  })

  return {
    uploadTaxNumbers,
    uploadIntrastatCodes
  }
}



/*


import { useMutation } from '@tanstack/react-query'

import { getSbClientWithToken } from '#core/client'
import { Endpoint } from '#utils/constants'
import { TaxNumberModel } from '#utils/global'

const createTaxNumbers = async (data) => {
  const { taxNumbers } = data
  if (taxNumbers.length === 0) {
    return
  }
  const request = []
  const sbClientWithToken = await getSbClientWithToken()
  request.push(sbClientWithToken.post(`${Endpoint.SUPPORT}/tax-numbers`, taxNumbers))
  return Promise.allSettled(request).then((response) => {
    const rejected = response.filter((result) => result.status === 'rejected')
    if (rejected.length > 0) {
      //@ts-ignore reason is not defined in PromiseAllSettledResult
      const errors = rejected.map((result) => result.reason.message)
      throw new Error(`Failed to create tax numbers: ${errors.join(', ')}`)
    }
  })
}

const useCreateTaxNumbers = (taxNumbers: TaxNumberModel[]) => {
  return useMutation([taxNumbers], createTaxNumbers)
}

export interface TaxNumbersFilterKey {
  purchaseOrderId?: string
  supplierId?: number
  taxNumber?: number
}

export { useCreateTaxNumbers }


*/