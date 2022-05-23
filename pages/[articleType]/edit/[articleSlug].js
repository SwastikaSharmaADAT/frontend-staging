import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ArticleSection from '../../../components/Articles'
import withUser from '../../../HOC/auth'
import staticFilesArray from '../../../utilities/staticFilesArray'

const Articles = () => <ArticleSection />
  
export async function getStaticPaths() {
  return {
    paths: [
      '/*/edit/*',
    ],
    fallback: true,
  }
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale,staticFilesArray)),
  },
})

export default withUser(Articles)
