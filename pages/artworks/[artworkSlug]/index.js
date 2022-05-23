import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import ArtworkListingBuyer from '../../../components/ArtworksListingBuyer'
import publicRoute from '../../../HOC/publicRoute'
import staticFilesArray from '../../../utilities/staticFilesArray'

const Add = () => <ArtworkListingBuyer detail/>

export async function getStaticPaths() {
  return {
    paths: [
      '/artworks/*',
    ],
    fallback: true,
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(Add)
