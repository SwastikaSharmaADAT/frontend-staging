import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BuzzListing from '../../components/BuzzListing'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'

const Articles = () => <BuzzListing />
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(Articles)
