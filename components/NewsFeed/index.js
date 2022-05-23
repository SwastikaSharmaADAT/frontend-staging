import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { isLoginToken } from '../../utilities/authUtils'
import { checkOtherUser } from '../../utilities/otherProfile'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import RightSection from './RightSection'
import CenterSection from './CenterSection'
import SingleActivitySection from './SingleActivitySection'
import SingleActivityLoggedOut from './SingleActivityLoggedOut'
import LeftSection from './LeftSection'
import { useTranslation } from 'next-i18next'
import { getType } from '../../modules/articles/articleSlice'
import { unwrapResult } from '@reduxjs/toolkit'
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
  // @media (max-width: 1280px) {
  //   width: auto;
  // }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`

const NewsFeed = ({ singleActivity, oldUrl,articleSlugFromUrl }) => {
  const router = useRouter()
  const dispatch = useDispatch()

  useEffect(()=>{
    const getArticleType=async()=>{
      const resultAction=await dispatch(getType({articleSlug:articleSlugFromUrl}))
      const response=await unwrapResult(resultAction)
      if(response&&response.data&&response.data.type){
        router.push(`/${response.data.type}/${articleSlugFromUrl}`)
      }else router.push(`/articles`)
    }
    if(oldUrl) getArticleType()
  },[])

  const {t} = useTranslation('translation')
  const { articleType, articleSlug, activityId } = router.query

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
    if (loggedInUsername && isEmptyObj(userDataState) && isLoginToken()) dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userDataState])

  /**
   * Listen to newActivitiesAdded socket event and on receiving it show refresh overlay to own news feed page...
   */
  useEffect(() => {
    if (isLoginToken() && !checkOtherUser(articleType) && userDataState.userRoleType === 'personal' && !singleActivity) {
      if (socketObj) {
        socketObj.on('newActivitiesAdded', function () {
          setShowRefreshOverlay(true)
        })
      }
    }
  }, [socketObj, userDataState.userRoleType, articleType, singleActivity])

  // Redirect to homepage if user is not logged in
  // useEffect(() => {
  //   if (!isLoginToken() && !singleActivity) {
  //     router.push('/')
  //   } else if (singleActivity && !singleActivityTypes.includes(articleSlug)) {
  //     router.push('/')
  //   }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [router, singleActivity])

  return (
    <>
      <Head>
        <title>Home | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="description" content={"Social Art Network | Join in for free | See amazing Collections | Galleries | Artists | Buzz | Exhibitions | Universities"} />
        <meta name="og:title" content={"Home | ARTMO | The Art Network | Connecting The Art World"} />
        <meta name="og:description" content={"Social Art Network | Join in for free | See amazing Collections | Galleries | Artists | Buzz | Exhibitions | Universities"} />
      </Head>
      <YourProfileWrapper>
        {isLoginToken() && !singleActivity ? (
          <YourProfileContainer>
            <LeftSection />
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
              <LeftSection singleActivity={true} />
              {isLoginToken() ? (
                <SingleActivitySection username={articleType} activityType={articleSlug} activityId={activityId} />
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

export default NewsFeed
