import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import SectionContainer from '../Genre/SectionContainer'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from '../NewsFeed/RightSection'
import { useTranslation } from 'next-i18next'
import BelowContentAds from '../YourProfile/BelowContentAds'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const CommonContainer = styled.div`
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
  @media (min-width: 992px) and (max-width: 1024px) {
    flex-wrap: nowrap;
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
  
  margin-bottom: 20px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`
const AdWrapper = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  // background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 620px;
  }
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`

const Genre = () => {
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
        <CommonContainer>
          <LeftContainer>
            <SectionContainer />
            <AdWrapper>
              <BelowContentAds inContainer={false}/>
            </AdWrapper>
          </LeftContainer>

          <RightSection />
        </CommonContainer>
      </FeedWrapper>
    </>
  )
}

export default Genre
