import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ArticleListing from '../../components/ArticleListing'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'

const Buzz = () => <ArticleListing type="potd" />
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(Buzz)
