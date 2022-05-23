import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import Connections from '../../../../components/Connections'
import staticFilesArray from '../../../../utilities/staticFilesArray'

const ConnectionContainer = () => <Connections />

export async function getStaticPaths() {
  return {
    paths: [
      '/user/*/connections',
    ],
    fallback: true,
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default ConnectionContainer
