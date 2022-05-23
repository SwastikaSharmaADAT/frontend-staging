import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import InviteFriends from '../../components/InviteFriends'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Invite = () => <InviteFriends />

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Invite)
