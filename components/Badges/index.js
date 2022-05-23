import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../NewsFeed/RightSection'
import BannerHead from './BannerHead'
import ContentShown from './ContentShown'
import { useTranslation } from 'next-i18next'

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
    margin-right: 0px;
  }
`

const Badges = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
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

  return (
    <>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <BannerHead />
            <ContentShown type="square" />
            <ContentShown type="rectangle" />
            <ContentShown type="normal" />
            <ContentShown type="favicon" />
          </LeftContainer>
          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default Badges
