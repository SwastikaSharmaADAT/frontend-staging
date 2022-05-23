import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import KnowledgeBaseSection from '../../components/VendorSection/KnowledgeBaseSection'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const KnowledgeBaseContainer = () => <>
  <Head>
    <title>ARTMO Vendor Dashboard | ARTMO</title>
  </Head>
  <KnowledgeBaseSection />
</>
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(KnowledgeBaseContainer)
