import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ProfileCoverImg from '../ProfileCoverImg'
import ProfileDetails from '../ProfileDetails'
import { setUserData } from '../../../modules/profile/myProfileSlice'
import { checkLegacyUserTestEmail } from '../../../utilities/legacyUsersUtils'
import BasicInfoPopup from '../BasicInfoPopup'

const ProfileHeadWrapper = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  position: relative;
  margin: 0 0 16px;
`

const ProfileHead = (props) => {
  const dispatch = useDispatch()

  const closeBasicInfoPopup = () => {
    dispatch(setUserData({ ...props.userDataState, basicInfoReq: false }))
  }

  return (
    <>
      {props.userDataState && props.userDataState.basicInfoReq ? (
        <BasicInfoPopup
          open={props.userDataState.basicInfoReq}
          closeModal={closeBasicInfoPopup}
          legacyEmail={checkLegacyUserTestEmail(props.userDataState)}
          userData={props.userDataState}
        />
      ) : null}
      <ProfileHeadWrapper ref={props.refProp}>
        <ProfileCoverImg userData={props.userDataState} />
        <ProfileDetails userData={props.userDataState} scrollToBlurred={props.scrollToBlurred} />
      </ProfileHeadWrapper>
    </>
  )
}

ProfileHead.propTypes = {
  refProp: PropTypes.object,
  scrollToBlurred: PropTypes.func,
  userDataState: PropTypes.object,
}

export default ProfileHead
