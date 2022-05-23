import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import DashboardSection from '../../components/VendorSection/DashboardSection'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Dashboard = () => <DashboardSection/>
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Dashboard)
