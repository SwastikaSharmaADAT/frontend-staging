import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../../components/NewsFeed/RightSection'
import HeadingSection from '../../components/mobile-app/HeadingSection'
import SectionContent from '../../components/mobile-app/SectionContent'
import LanguageSelect from '../../components/Maintenance/LanguageSelect'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'
import ModalComponent from '../../components/UI/Modal'
import useTranslateContent from '../../hooks/useTranslateContent'
import ReactHtmlParser from 'react-html-parser'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
  min-height: 100vh;
  background: #000;
  
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

const ModalContents = styled.div`
  max-width: 400px;
  background: #fff;
  padding: 25px;
  text-align: center;
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
  }
`

const Maintenance = () => {
  const dispatch = useDispatch()
  const {t} =useTranslation('translation')

  const maintenanceTitle = 'ARTMO IS CURRENTLY UNDERGOING MAINTENANCE'
  const maintenanceContent = 'Just a quick update, we\'ll be back in 2 hours.<br/>Thanks for your patience.<br/>Your Team ARTMO'

  const [title, translateTitle] =useTranslateContent('')
  const [content, translateContent] =useTranslateContent('')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

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
    translateTitle(maintenanceTitle)
    translateContent(maintenanceContent)
  }, [maintenanceTitle,maintenanceContent])

  return (
    <>
      <Head>
        <title>Maintenance | ARTMO</title>
        <meta name="description" content="ARTMO is under maintenance" />
      </Head>
      <FeedWrapper>
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={true}
        >
          <ModalContents>
           <h2>{title ? title : maintenanceTitle}</h2>
           <p>{ content ? ReactHtmlParser(content) : maintenanceContent && ReactHtmlParser(maintenanceContent)}</p>
           <LanguageSelect footer={false}/>
          </ModalContents>
        </ModalComponent>
      </FeedWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(Maintenance)
