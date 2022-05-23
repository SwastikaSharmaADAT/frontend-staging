import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from '../NewsFeed/RightSection'
import LeftSection from './LeftSection'

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

const GroupFeed = () => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if(loggedInUsername)
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername])
  return (
    <>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftSection />
          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default GroupFeed
