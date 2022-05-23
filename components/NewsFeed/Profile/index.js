import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import ProgressBar from '@ramonak/react-progress-bar'
import { useTranslation } from 'next-i18next'
import { getUserData, profileCompleteness } from '../../../modules/profile/myProfileSlice'
import { checkOtherUser } from '../../../utilities/otherProfile'
import useTranslateContent from '../../../hooks/useTranslateContent'
import ProfileCoverImg from './ProfileCoverImg'
import ProfileImage from './ProfileImage'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'


const UserProfileWrap = styled.div`
  width: 100%;
  position: relative;
  padding: 0 0 28px;
  margin: 0 auto 17px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
`

const ProfileCompletionWrap = styled.div`
  padding: 0 15px;
  &.profileCompleted {
    display: none;
  }
  div > div > div > span {
    display: none;
  }
`

const ProfileName = styled.h1`
  margin: 15px 0 10px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 20px;
  text-align: center;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  cursor: pointer;
`

const ProfileFollows = styled.div`
  margin: 0 0 15px;
  padding: 0;
  color: #666;
  line-height: normal;
  font-size: 14px;
  text-align: center;
`

const SectionHeading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: normal;
  color: #222222;
  padding: 0;
  margin: 0 0 10px;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0 0 10px;
  }
  &.ProgressBarHeading {
    display: flex;
    justify-content: flex-start;
    @media (min-width: 600px) and (max-width: 1024px) {
      font-size: 14px;
    }
    span {
      margin: 0 0 0 5px;
      font-family: 'Montserrat-Medium';
      font-weight: 100;
    }
  }
`

const TopButtons = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const Profile = () => {
  const { t } = useTranslation(['newsFeed','translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = router.query

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const profileMeasure = useSelector((state) => state.root.myProfile.profileMeasure)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if(username)
      dispatch(getUserData(username, 'fetchData',t))
    if (!checkOtherUser(username)) {
      dispatch(profileCompleteness())
    }
  }, [dispatch, username])

  const redirectToUserProfile = (userInfo) => {
    router.push(`/user/${userInfo}`)
  }

  const splitPercentage = (str) => {
    const fields = str.split('%')
    return parseInt(fields[0])
  }
  const name =
    userDataState && userDataState.firstName && userDataState.lastName
      ? `${userDataState.firstName} ${userDataState.lastName}`
      : userDataState.firstName
        ? userDataState.firstName
        : userDataState.username


  const [nameTitle, translateNameTitle] = useState(name)


  useEffect(() => {
    if(!isEmptyObj(userDataState))
    translateNameTitle(name)
  }, [name])
  return (
    <>
      <UserProfileWrap>
        <ProfileCoverImg userData={userDataState} />
        <ProfileImage userData={userDataState} redirectToUserProfile={redirectToUserProfile} username={username} />
        <ProfileName onClick={() => redirectToUserProfile(username)}>{nameTitle ? nameTitle : !isEmptyObj(userDataState) && name}</ProfileName>
        <ProfileFollows>
          {userDataState && userDataState.followersCount ? userDataState.followersCount : 0}{' '}
          {userDataState.followersCount > 1 ? t(`profile.followerPlural`) : t(`profile.follower`)}
        </ProfileFollows>
        {!checkOtherUser(username) && (
          <>
            <ProfileCompletionWrap className={ profileMeasure && profileMeasure.completeness === '100%' ? 'profileCompleted' : '' }>
              <SectionHeading className="ProgressBarHeading">
                {t(`profile.profileCompleteness`)}:<span>{profileMeasure && profileMeasure.completeness}</span>
              </SectionHeading>
              <ProgressBar
                completed={
                  profileMeasure && profileMeasure.completeness ? splitPercentage(profileMeasure.completeness) : 0
                }
                bgColor="#222"
                margin="0 0 15px"
                height="10px"
                borderRadius="0"
                isLabelVisible={false}
              />
            </ProfileCompletionWrap>
            <TopButtons onClick={() => redirectToUserProfile(loggedInUsername)}>
              {t(`profile.editProfile`)}
            </TopButtons>
          </>
        )}
      </UserProfileWrap>
    </>
  )
}

export default Profile
