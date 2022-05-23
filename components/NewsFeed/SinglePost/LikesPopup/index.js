import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'

const LikesPopupWrap = styled.div`
  width: 100%;
  position: relative;
  max-width: 374px;
  min-width: 374px;
  min-height: 270px;
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
const LikesPopup = ({ setLikesPopup, likesData }) => {
  const router = useRouter()

  const redirectToUserProfile = (username) => {
    router.push(`/user/${username}`)
    setLikesPopup(false)
  }

  return (
    <>
      <LikesPopupWrap>
        <SectionHeader setLikesPopup={setLikesPopup} />
        <SectionContent likesData={likesData} redirectToUserProfile={redirectToUserProfile} />
      </LikesPopupWrap>
    </>
  )
}

LikesPopup.propTypes = {
  setLikesPopup: PropTypes.func.isRequired,
  likesData: PropTypes.array,
}

export default LikesPopup
