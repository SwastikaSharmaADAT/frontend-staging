import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AddArtworkSection from '../../../components/VendorSection/AddArtworkSection'
import withUser from '../../../HOC/auth'
import staticFilesArray from '../../../utilities/staticFilesArray'

const Add = () => <AddArtworkSection editType/>

export async function getStaticPaths() {
  return {
    paths: [
      '/artworks/edit/*',
    ],
    fallback: true,
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Add)
