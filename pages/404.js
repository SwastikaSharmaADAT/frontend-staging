import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import { useEffect } from 'react'
import PageNotFound from '../components/PageNotFound'
import publicRoute from '../HOC/publicRoute'
import staticFilesArray from '../utilities/staticFilesArray'

const Custom404 = () => {
  return(<>
    <Head>
      <title>Page not found | ARTMO</title>
    </Head>
    <PageNotFound />
  </>)
}
  
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray )),
  },
})
export default publicRoute(Custom404)
