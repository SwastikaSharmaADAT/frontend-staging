import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Referrals from '../../components/Referrals'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'

const ReferralsRoute = () => <Referrals />

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(ReferralsRoute)
