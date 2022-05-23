import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Badges from '../../components/Badges'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const BadgesContainer = () => <>
  <Head>
    <title>Badges | ARTMO</title>
    <meta name="description" content='Promote Your Profile | Add a "Follow me on ARTMO" back-link badge to your homepage, website, blog or any online place you maintain.' />
  </Head>
  <Badges />
</>
  
export const getStaticProps = async ({ locale }) => ({
    props: {
      ...(await serverSideTranslations(locale,staticFilesArray)),
    },
  })
  
export default withUser(BadgesContainer)
