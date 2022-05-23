import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ChatMessages from '../../components/ChatMessages'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Chat = () => <ChatMessages/>

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(Chat)
