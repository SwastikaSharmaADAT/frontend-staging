import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import NewsFeed from '../../../../components/NewsFeed'
import OldUrlRedirection from '../../../../components/OldUrlRedirection'
import checkOldUrl from '../../../../HOC/checkOldUrl'
import publicRoute from '../../../../HOC/publicRoute'
import { setAppLanguageCode } from '../../../../modules/staticContent/staticContentSlice'
import staticFilesArray from '../../../../utilities/staticFilesArray'


const NewsContainer = () => {
  const router=useRouter()
  const dispatch=useDispatch()
  const params=router.query
  const currentUrl = global.window && window.location.href
  var pathNameRegex = /http[s]*:\/\/[^\/]+(\/.+)/
  var matches = currentUrl&&currentUrl.match(pathNameRegex)
  const paramExist=matches&&matches.length&&matches[1].includes(router.locale+'/')

  const languagesData=useSelector((state)=>state.root.staticContent.languagesData)

  const singleActivityTypes = ['post', 'video', 'album']
  const articleTypes = ['buzz', 'potd', 'exhibition']

  
if(singleActivityTypes.includes(params.articleSlug)&&!articleTypes.includes(params.articleType))
return<NewsFeed singleActivity={true} />
else
return<NewsFeed singleActivity={false} />
}

export async function getStaticPaths() {
  return {
    paths: [
      '/*/*/*',
    ],
    fallback: true,
  }
}
export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale,staticFilesArray)),
  },
})

export default checkOldUrl(publicRoute(NewsContainer))
