import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import SettingsSection from '../../components/VendorSection/SettingsSection'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Dashboard = () => <SettingsSection />
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Dashboard)
