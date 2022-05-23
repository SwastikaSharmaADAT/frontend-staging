import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import UpdateGroup from '../../../components/AllGroups/UpdateGroup'
import withUser from '../../../HOC/auth'
import staticFilesArray from '../../../utilities/staticFilesArray'

const updateGroup = () => <UpdateGroup />

export async function getStaticPaths() {
  return {
    paths: [
      '/groups/*/edit',
    ],
    fallback: true,
  }
}

  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(updateGroup)
