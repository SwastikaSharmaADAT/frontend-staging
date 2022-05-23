import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MyArticlesListing from '../../components/MyCollectionListing'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const MyArticles = () => <MyArticlesListing />
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(MyArticles)
