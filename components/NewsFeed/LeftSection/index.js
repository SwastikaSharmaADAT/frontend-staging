import React from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import Profile from '../Profile'
import ManageArtwork from '../ManageArtwork'
import Hashtags from '../Hashtags'
import { checkOtherUser } from '../../../utilities/otherProfile'

const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 220px;
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 28%;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    max-width: 30%;
  }
  @media (max-width: 599px) {
    margin: 0 auto;
    max-width: 300px;
    order: 3;
  }
`

const LeftSection = ({ singleActivity }) => {
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  
  return (
    <LeftContainer>
      {!singleActivity && <Profile />}
      {userDataState.userRoleType === 'personal' && !singleActivity && !checkOtherUser(userDataState.username) && <ManageArtwork />}
      {/* <Hashtags /> */}
    </LeftContainer>
  )
}

LeftSection.propTypes = {
  singleActivity: PropTypes.bool,
}

export default LeftSection
