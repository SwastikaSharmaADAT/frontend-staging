import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../NewsFeed/RightSection'
import HeadingSection from './HeadingSection'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

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
  }
`

const MyArticleListing = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const [rightSection, setRightSection] = useState(false)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  return (
    <>
      <Head>
        <title>My Articles | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <HeadingSection />
            <SectionContent setRightSection={setRightSection} />
          </LeftContainer>

          {process.browser && (window.innerWidth > 1000 || rightSection) && <RightSection />}
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default MyArticleListing
