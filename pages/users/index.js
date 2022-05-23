import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import UserListing from '../../components/UserListing'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'

const userListing = () => <UserListing/>
export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale,staticFilesArray)),
    },
  })
export default publicRoute(userListing)
