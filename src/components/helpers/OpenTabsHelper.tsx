import { SbPage } from '#utils/constants'

function openTab(url: string) {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export function openCampaignDetailsTab(campaignCode: string) {
  openTab(`${SbPage.campaignsDetails}?code=${campaignCode}`)
}

export function openItemDetailsTab(itemId: string) {
  openTab(`${SbPage.itemsDetails}?id=${itemId}`)
}

export function openPurchaseOrderDetailsTab(uuid: string) {
  openTab(`${SbPage.purchaseOrderDetails}?uuid=${uuid}`)
}
