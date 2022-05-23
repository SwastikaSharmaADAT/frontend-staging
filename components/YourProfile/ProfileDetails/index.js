import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ProfileImage from '../ProfileImage'
import ProfileHeaderDetails from '../ProfileHeaderDetails'
import { useSelector } from 'react-redux'

const ProfileDetailsWrapper = styled.div`
  width: auto;
  position: relative;
  padding: 20px 34px;
  display: flex;
  flex-direction: row;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    padding: 15px;
    flex-direction: column;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const ProfileDetails = (props) => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return ( 
    <ProfileDetailsWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
      <ProfileImage userData={props.userData} />
      <ProfileHeaderDetails userData={props.userData} scrollToBlurred={props.scrollToBlurred} />
    </ProfileDetailsWrapper>
)}

ProfileDetails.propTypes = {
  userData: PropTypes.object,
  scrollToBlurred: PropTypes.func,
}

export default ProfileDetails
