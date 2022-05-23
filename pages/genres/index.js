import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Head from 'next/head'
import Genre from '../../components/Genre'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'

const Buzz = () => (<>
  <Head>
    <title>Genres | ARTMO | The Art Network | Connecting The Art World</title>
    <meta name="description" content="Learn about all visual art genres and art media | Find artists and collections from all different genres." />
  </Head>
  <Genre/>
</>
)
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale,staticFilesArray)),
  },
})

export default publicRoute(Buzz)
