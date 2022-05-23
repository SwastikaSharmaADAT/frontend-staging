import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import GroupBarHeading from '../AllGroups/GroupBarHeading'
import GroupContainer from '../AllGroups/GroupContainer'
import { getUserData, notifyError } from '../../modules/profile/myProfileSlice'
import RightSection from '../NewsFeed/RightSection'
import BelowContentAds from '../YourProfile/BelowContentAds'
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
  flex-wrap: wrap;
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

const GroupWrapper = styled.div`
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

const AllGroups = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('translation')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const accountType = userInfo && JSON.parse(userInfo).accountType

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if (accountType === 'page') {
      notifyError(t(`auth.serverResponses.errors.notAuthorizedToAccessPage`))
      router.replace('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    /**get user details on page render */
    if(loggedInUsername)
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername])
  return (
    <>
      <Head>
        <title>Groups | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <GroupWrapper>
              <GroupBarHeading />
              <GroupContainer />
            </GroupWrapper>
            <AdWrapper>
              <BelowContentAds inContainer={false}/>
            </AdWrapper>
          </LeftContainer>
          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default AllGroups
