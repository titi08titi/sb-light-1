import { NextPage } from 'next'
import { withMainLayoutPage } from '../../components/layouts/MainLayout'
import { IntrastatUpload } from '#modules/reports'

const IntrastatUploadPage: NextPage = () => {
  return <IntrastatUpload />
}

export default withMainLayoutPage(IntrastatUploadPage, {
  title: 'Intrastat - Upload Additional Information',
})