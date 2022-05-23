import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import GroupFeed from '../../../components/GroupFeed'
import withUser from '../../../HOC/auth'
import staticFilesArray from '../../../utilities/staticFilesArray'

const Groups = () => <GroupFeed />

export async function getStaticPaths() {
  return {
    paths: [
      '/groups/*',
    ],
    fallback: true,
  }
}

  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Groups)
