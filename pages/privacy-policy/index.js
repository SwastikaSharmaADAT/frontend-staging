import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isLoginToken } from '../../utilities/authUtils'
import Button from '../../components/UI/Button'
import HeadingSection from '../../components/privacy-policy/HeadingSection'
import SectionContent from '../../components/privacy-policy/SectionContent'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'


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
  flex-direction: column;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  button {
    width: auto;
    min-width: 200px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const PrivacyPolicy = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['staticPages','translation'])

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const privacyPolicyContent = useSelector((state) => state.root.staticContent.privacyPolicyContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    dispatch(getContent('Privacy_Policy_header', t, 'privacyPolicyPage', 'header'))
    dispatch(getContent('Privacy_Policy_accPrivacySettings', t, 'privacyPolicyPage', 'accPrivacySettings'))
    dispatch(getContent('Privacy_Policy_dataSecurity', t, 'privacyPolicyPage', 'dataSecurity'))
    dispatch(getContent('Privacy_Policy_collectingPersonalData', t, 'privacyPolicyPage', 'collectingPersonalData'))
    dispatch(getContent('Privacy_Policy_adsOnArtmo', t,'privacyPolicyPage', 'adsOnArtmo'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <Head>
        <title>Privacy Policy | ARTMO</title>
        <meta name="description" content='PRIVACY POLICY English English 简体中文 Deutsch Español Русский Português Français Italiano Polski 日本語 한국어 हिन्दी العربية עִבְרִית Bahasa Melayu বাংলা ਪੰਜਾਬੀ Harshen Hausa తెలుగు Basa […]' />
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <HeadingSection content={privacyPolicyContent} />
          <SectionContent content={privacyPolicyContent} />
          <ButtonWrapper>
            <Button onClick={() => router.push('/user-terms-conditions')}>
              {t(`privacyPolicyPage.seeUserTermsConditions`)}
            </Button>
            <Button onClick={() => router.push('/vendor-terms-conditions')}>
              {t(`privacyPolicyPage.seeVendorTermsConditions`)}
            </Button>
          </ButtonWrapper>
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})

export default publicRoute(PrivacyPolicy)
