import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { articleDetails } from '../../modules/articlePages/articlePagesSlice'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../NewsFeed/RightSection'
import SectionContent from './SectionContent'
import HeadingSection from './HeadingSection'
import Loader from '../UI/BackdropLoader'
import { setAppLanguageCode, setLanguage } from '../../modules/staticContent/staticContentSlice'
import BelowContentAds from '../YourProfile/BelowContentAds'
import MessagePopup from '../YourProfile/MessagePopup'
import { createImageUrl, checkOldImage, imageErrorHandler } from '../../utilities/imageUtils'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  margin-bottom: 30px;
  
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
    max-width: 100%;
  }
`

const BuzzArticleView = ({ oldUrl, articleSlugFromUrl }) => {
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const router = useRouter()
  const { articleType, articleSlug } = router.query
  const languagesData = useSelector((state) => state.root.staticContent.languagesData)
  const [blur,setBlur]=useState(false)

  useEffect(() => {
    const langSettings = async () => {
      if (router.isReady && router.locale) {
        const languageObj = languagesData.find((lang) => lang.languageCode === router.locale)
        if (languageObj) {
          dispatch(setAppLanguageCode(router.locale))
          localStorage.setItem('appLanguageCode', languageObj.languageCode)
          localStorage.setItem('appLanguage', languageObj._id)
          // await i18n.changeLanguage(router.locale)
          router.replace({ path: router.pathname, query: router.query }, '', { locale: router.locale })
        }
      }
    }
    langSettings()
  }, [languagesData])

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const articleDetail = useSelector((state) => state.root.articlePages.articleDetail)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const { t } = useTranslation(['errorResponses', 'translation', 'articles'])

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [userData])

  // useEffect(() => {
  //   return () => {
  //     let _id = localStorage.getItem('appLanguage')
  //     let languageCode = localStorage.getItem('appLanguageCode')
  //     if (_id && languageCode) {
  //       dispatch(setLanguage({ _id, languageCode }))
  //       // i18n.changeLanguage(languageCode)
  //       router.replace({path:router.pathname,query:router.query},'',{locale:languageCode})
  //     }
  //   }
  // }, [])

  // useEffect(() => {
  //   if (
  //     loggedInUsername &&
  //     (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) &&
  //     isLoginToken()
  //   )
  //     dispatch(getUserData(loggedInUsername, 'fetchData', t))
  // }, [dispatch, loggedInUsername, userData])

  

  useEffect(() => {
    if (router.isReady && articleType && articleSlug) {
      dispatch(articleDetails(articleType, articleSlug, t))
    }
    
  }, [articleSlug, articleType, dispatch, userData])

  const redirectHandler = (route) => {
    router.push(route)
  }
  return t(`articles:articleNotAvailable`) !== 'articles:articleNotAvailable' ? (
    <>
      <Head>
        <title>{articleDetail.metadataTitle ? articleDetail.metadataTitle : articleDetail.title}</title>
        <meta
          name="description"
          content={articleDetail.metadataDescription ? articleDetail.metadataDescription : articleDetail.title}
        />
        <meta property="og:url"                content={router.asPath}  key="ogurl" />
        <meta property="og:type"               content="article"  key="ogtype"/>
        <meta property="og:title"              content={articleDetail.metadataTitle ? articleDetail.metadataTitle : articleDetail.title} key="ogtitle" />
        <meta property="og:description"        content={articleDetail.metadataDescription ? articleDetail.metadataDescription : articleDetail.title}  key="ogdesc"/>
        <meta property="og:image"              content={articleDetail && articleDetail.picUrl && articleDetail.picUrl.pictureUrl
            ? checkOldImage(articleDetail.picUrl.pictureUrl, 'auto', 720, 'mediaLibrary', articleType, articleDetail)
            : '/assets/ARTMO-Social-Share.jpg'}  key="ogimage"/>
      </Head>
      {articleType && articleSlug && !isEmptyObj(articleDetail) && (
        <FeedWrapper>
          <YourProfileContainer>
            <LeftContainer>
              {!articleDetail.deleted ? (
                <>
                  <HeadingSection article={articleDetail} articleType={articleType} />
                  <SectionContent
                    article={articleDetail}
                    articleType={articleType}
                    redirectHandler={redirectHandler}
                    loggedInUsername={loggedInUsername}
                  />
                </>
              ) : (
                <>{t(`articles:articleNotAvailable`)}</>
              )}
              <BelowContentAds />
            </LeftContainer>
            <RightSection />
          </YourProfileContainer>
        </FeedWrapper>
      )}
    </>
  ) : (
    <Loader open={true} />
  )
}

export default BuzzArticleView
