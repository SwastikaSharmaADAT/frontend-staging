import React, { useState, useEffect } from 'react'
import { BsArrowRight } from 'react-icons/bs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import showSection from '../../../utilities/showSection'

const NavSection = styled.span`
li{
  cursor: pointer;
}
`
/**
 *
 * @returns Navigation listing for member profile
 */
function MemberProfileNav({ userRoleType,refObject }) {
  const { t } = useTranslation('profile')
  const [userInfo, setUserInfo] = useState(null)
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType
  const myProfile = useSelector((state) => state.root.myProfile)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const clickAndScroll=(ref)=>{
    refObject.scrollToTarget(ref)
  }
  return (
    <NavSection>
      {showSection(myProfile, 'about') && (
        <li onClick={()=>clickAndScroll(refObject.AboutSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.about`)}
        </li>
      )}
      {showSection(myProfile, 'contact') && (
        <li onClick={()=>clickAndScroll(refObject.ContactInfoSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.contact`)}
        </li>
      )}
      {showSection(myProfile, 'activity') && (
        <li onClick={()=>clickAndScroll(refObject.ActivitySectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.activity`)}
        </li>
      )}
      {showSection(myProfile, 'videos') && (
        <li onClick={()=>clickAndScroll(refObject.VideosSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.videos`)}
        </li>
      )}

      {userRoleType === 'personal' && showSection(myProfile, 'artworks') && (
        <li onClick={()=>clickAndScroll(refObject.ArtworkSectionRef)}>
          <BsArrowRight />
  
          {t(`profileNavigator.artworks`)}
        </li>
      )}
      {showSection(myProfile, 'albums') && (
        <li onClick={()=>clickAndScroll(refObject.AlbumsSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.albums`)}
        </li>
      )}

      {userRoleType !== 'page' && loggedInAccountType !== 'page' && showSection(myProfile, 'groups') && (
        <li onClick={()=>clickAndScroll(refObject.GroupsSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.groups`)}
        </li>
      )}
      {userRoleType === 'personal' && showSection(myProfile, 'business') && (
        <li onClick={()=>clickAndScroll(refObject.BusinessSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.business`)}
        </li>
      )}
      {showSection(myProfile, 'personalInfo') && (
        <li onClick={()=>clickAndScroll(refObject.PersonalInfoSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.personalInfo`)}
        </li>
      )}

    </NavSection>
  )
}

MemberProfileNav.propTypes = {
  userRoleType: PropTypes.string,
  refObject: PropTypes.object,
}

export default MemberProfileNav
