import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ArtistSubscription from '../../components/ArtistSubscription'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Subscriptions = () => <ArtistSubscription />
export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale,staticFilesArray)),
    },
  })
export default withUser(Subscriptions)
