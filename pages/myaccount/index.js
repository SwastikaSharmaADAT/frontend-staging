import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import MyAccount from '../../components/MyAccount'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const Account = () => <MyAccount />
export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale,staticFilesArray)),
    },
  })
export default withUser(Account)
