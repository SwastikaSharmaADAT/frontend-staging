import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useSelector, useDispatch } from 'react-redux'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'


const FollowersPopupWrap = styled.div`
  width: 100%;
  position: relative;
  max-width: 374px;
  min-width: 374px;
  min-height: 400px;
  height: auto;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  @media (max-width: 767px) {
    min-width: 300px;
    max-width: 300px;
  }
`
/**
 * Show list of user's followers
 */
const FollowersPopup = ({ setShowReferrals, firstName, lastName, referrals }) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['successResponses','translation'])
  const router = useRouter()
  const followers = useSelector((state) => state.root.myProfile.followers)
  const userDataState = useSelector((state) => state.root.myProfile.userData)

  const loggedInUserInfo = localStorage.getItem('user_info')
  const loggedInUsername = loggedInUserInfo && JSON.parse(loggedInUserInfo).username

  /** Get account type from local storage */
  const parsedUserInfo = loggedInUserInfo && JSON.parse(loggedInUserInfo)
  const { accountType } = parsedUserInfo


  return (
    <>
      <FollowersPopupWrap>
        <SectionHeader
          firstName={firstName}
          lastName={lastName}
          setShowReferrals={setShowReferrals}
          userType={userDataState && userDataState.userRoleType}
          username={userDataState && userDataState.username}
        />
        <SectionContent referrals={referrals}/>
      </FollowersPopupWrap>
    </>
  )
}
FollowersPopup.propTypes = {
  setShowReferrals: PropTypes.func.isRequired,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
  referrals: PropTypes.object,
}
export default FollowersPopup
