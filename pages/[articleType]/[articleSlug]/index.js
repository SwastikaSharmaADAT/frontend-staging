import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import BuzzArticleView from '../../../components/BuzzArticleView'
import oldArtworkUrl from '../../../HOC/oldArtworkUrl'
import publicRoute from '../../../HOC/publicRoute'
import staticFilesArray from '../../../utilities/staticFilesArray'

const BuzzContainer = () =><BuzzArticleView />
  
export async function getStaticPaths() {
  return {
    paths: [
      '/*/*',
    ],
    fallback: true,
  }
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(oldArtworkUrl(BuzzContainer))
