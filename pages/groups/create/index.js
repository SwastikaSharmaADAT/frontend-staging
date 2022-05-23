import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import CreateGroup from '../../../components/AllGroups/CreateGroup'
import withUser from '../../../HOC/auth'
import staticFilesArray from '../../../utilities/staticFilesArray'

const Group = () => <CreateGroup />

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Group)
