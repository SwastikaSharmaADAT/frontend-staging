import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import PropTypes from 'prop-types'
import { isLoginToken } from '../../../../utilities/authUtils'
import { checkOtherUser } from '../../../../utilities/otherProfile'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { getUserData } from '../../../../modules/profile/myProfileSlice'
import RightSection from '../../../../components/NewsFeed/RightSection'
import CenterSection from '../../../../components/NewsFeed/CenterSection'
import SingleActivitySection from '../../../../components/NewsFeed/SingleActivitySection'
import SingleActivityLoggedOut from '../../../../components/NewsFeed/SingleActivityLoggedOut'
import LeftSection from '../../../../components/NewsFeed/LeftSection'
import withUser from '../../../../HOC/auth'
import staticFilesArray from '../../../../utilities/staticFilesArray'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

const YourProfileWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    width: 1094px ;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
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

const NewsFeed = ({ singleActivity }) => {
  const {t} = useTranslation('translation')
  const dispatch = useDispatch()
  const router = useRouter()
  const { username, activityType, activityId } = router.query

  const socketObj = useSelector((state) => state.root.socket.socketObj)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const activityLocked = useSelector((state) => state.root.newsFeed.isActivitiesLocked)
  const [showRefreshOverlay, setShowRefreshOverlay] = useState(false)
  const singleActivityTypes = ['post', 'video', 'album']
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && isEmptyObj(userDataState) && isLoginToken()){
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
    }
  }, [dispatch, userDataState, loggedInUsername])

  /**
   * Listen to newActivitiesAdded socket event and on receiving it show refresh overlay to own news feed page...
   */
  useEffect(() => {
    if (isLoginToken() && !checkOtherUser(username) && userDataState.userRoleType === 'personal' && !singleActivity) {
      if (socketObj) {
        socketObj.on('newActivitiesAdded', function () {
          setShowRefreshOverlay(true)
        })
      }
    }
  }, [socketObj, userDataState.userRoleType, username, singleActivity])

  // Redirect to homepage if user is not logged in
  useEffect(() => {
    if (!isLoginToken() && !singleActivity) {
      router.push('/')
    } else if (singleActivity && !singleActivityTypes.includes(activityType)) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, singleActivity])

  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth)
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [])

  return (
    <>
      <Head>
        <title>News Feed | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <YourProfileWrapper>
        {isLoginToken() && !singleActivity ? (
          <YourProfileContainer>
           { width > 1023 && (<LeftSection />)}
            <CenterSection
              activityLocked={activityLocked}
              showRefreshOverlay={showRefreshOverlay}
              setShowRefreshOverlay={setShowRefreshOverlay}
            />
            <RightSection />
          </YourProfileContainer>
        ) : (
          singleActivity && (
            <YourProfileContainer>
              { width > 1023 && (<LeftSection singleActivity={true} />)}
              {isLoginToken() ? (
                <SingleActivitySection username={username} activityType={activityType} activityId={activityId} />
              ) : (
                <SingleActivityLoggedOut />
              )}
              <RightSection />
            </YourProfileContainer>
          )
        )}
      </YourProfileWrapper>
    </>
  )
}

NewsFeed.propTypes = {
  singleActivity: PropTypes.bool,
}

export async function getStaticPaths() {
  return {
    paths: [
      '/user/*/activity',
    ],
    fallback: true,
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})

export default withUser(NewsFeed)
