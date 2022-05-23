import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ArtworkListingSection from '../../components/VendorSection/ArtworkListingSection'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const ArtworkListingSectionContainer = () => <ArtworkListingSection />
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(ArtworkListingSectionContainer)
