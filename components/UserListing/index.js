import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from '../NewsFeed/RightSection'
import HeadingSection from './HeadingSection'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import MessagePopup from '../YourProfile/MessagePopup'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  align-items: flex-start;
  width: 100%;
  position: relative;
  max-width: 1435px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    max-width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    max-width: 1094px ;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    flex-wrap: nowrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
  @media ( max-width: 1024px ){
    width: auto;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1030px;
  margin-right: 15px;
  margin-bottom: 30px;
  .blurred{
    // filter: blur(5px);
    // pointer-events: none;
    // -webkit-touch-callout: none; /* iOS Safari */
    // -webkit-user-select: none; /* Safari */
    // -khtml-user-select: none; /* Konqueror HTML */
    // -moz-user-select: none; /* Old versions of Firefox */
    // -ms-user-select: none; /* Internet Explorer/Edge */
    // user-select: none; /* Non-prefixed version, currently */
  }
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 880px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    max-width: 795px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    max-width: 717px ;
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
  }
`

const UserListing = () => {
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()
  const router = useRouter()

  const [rightSection, setRightSection] = useState(false)
  const [blur,setBlur]=useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  const BlurSection = styled.div`
  width: 100%;
  position: relative;
  filter: blur(5px);
  overflow: hidden;
  pointer-events: none;
`

  return (
    <>
      <Head>
        <title>Users Directory | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="description" content={"Your Social Art Network | Join-in for free and connect with art enthusiasts, artist, galleries and universities | See amazing collections."} />
        <meta name="og:title" content={"Users Directory | ARTMO | The Art Network | Connecting The Art World"} />
        <meta name="og:description" content={"Your Social Art Network | Join-in for free and connect with art enthusiasts, artist, galleries and universities | See amazing collections."} />
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <HeadingSection />
            <SectionContent blur={blur} setBlur={setBlur} setRightSection={setRightSection} />
          </LeftContainer>
          {process.browser && (window.innerWidth > 1000 || rightSection) && <RightSection />}
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default UserListing
