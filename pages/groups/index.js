import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import AllGroups from '../../components/AllGroups'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Groups = () => <AllGroups />
export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale,staticFilesArray)),
    },
  })
  
export default withUser(Groups)
