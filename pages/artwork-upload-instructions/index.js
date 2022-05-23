import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import ArtworkUploadSection from '../../components/ArtworkUploadSection'
import withUser from '../../HOC/auth'
import staticFilesArray from '../../utilities/staticFilesArray'

const ArtworkUploadSectionContainer = () => <>
  <Head>
    <title>Artwork Upload Instructions | ARTMO</title>
    <meta name="description" content='Artwork Upload Instructions English English 简体中文 Deutsch Español Русский Português Français Italiano Polski 日本語 한국어 हिन्दी العربية עִבְרִית Bahasa Melayu বাংলা ਪੰਜਾਬੀ Harshen Hausa తెలుగు […]' />
  </Head>
  <ArtworkUploadSection />
</>
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default withUser(ArtworkUploadSectionContainer)
