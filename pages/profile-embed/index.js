import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import BadgeIframe from '../../components/BadgeIframe'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'

const ProfileEmbed = () => <BadgeIframe />

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(ProfileEmbed)
