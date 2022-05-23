import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { getUserSubGroups } from '../../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'


const GroupsSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const GroupsSection = ({refObject}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { username } = router.query
  const userGroups = useSelector((state) => state.root.myProfile.userGroups)
  const myProfile = useSelector((state) => state.root.myProfile)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    if (isLoginToken() && username) {
      dispatch(getUserSubGroups(username))
    }
  }, [dispatch, username])

  return (
    <>
      {showSection(myProfile, 'groups') ? (
        <div ref={refObject.GroupsSectionRef} id="groups">
          <GroupsSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader userData={userDataState} />
            <SectionContent userGroups={userGroups} />
          </GroupsSectionWrap>
        </div>
      ) : (
        <></>
      )}
    </>

  )
}
GroupsSection.propTypes = {
  refObject:PropTypes.object
}
export default GroupsSection
