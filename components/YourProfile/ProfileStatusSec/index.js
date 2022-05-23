import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import GiftcardSection from './GiftcardSection'
import NoticeSection from './NoticeSection'
import InviteSection from './InviteSection'
import ReferralSection from './ReferralSection'
import ProfileCompletion from './ProfileCompletion'

const ProfileStatusSecWrap = styled.div`
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
  background: #fff;
  border: 0;
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: row;
  padding: 20px 25px;
  justify-content: space-between;
  &.dashed {
    padding: 0;
    border: 0;
    box-shadow: none;
    background: transparent;
  }
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
`

const ProfileStatusSec = (props) => {
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const profileMeasure = useSelector((state) => state.root.myProfile.profileMeasure)

  const userData = useSelector((state) => state.root.myProfile.userData)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const free = !subscription || (subscription && (subscription.planName === 'basic'))
  const eligible = (userData && userData.userRole === 'artist') && free

  return (
    <>
      {userDataState.userIdentity === 'verifiedUser' && (
        <>
        {profileMeasure && profileMeasure.completeness === "100%" ? null :
          <ProfileStatusSecWrap>
            <ProfileCompletion scrollTo={props.scrollTo} />
          </ProfileStatusSecWrap>
        }
        <ProfileStatusSecWrap className="dashed">
          <GiftcardSection />
          {
          eligible ?
          <ReferralSection />
          : <InviteSection />
          }
        </ProfileStatusSecWrap>
        </>
      )}
    </>
  )
}

ProfileStatusSec.propTypes = {
  scrollTo: PropTypes.func,
}

export default ProfileStatusSec
