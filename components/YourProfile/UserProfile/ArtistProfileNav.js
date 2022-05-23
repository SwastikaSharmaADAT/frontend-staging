import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { BsArrowRight } from 'react-icons/bs'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import showSection from '../../../utilities/showSection'

const NavSection = styled.span`
li{
  cursor: pointer;
}
`

/**
 *
 * @returns Navigation listing for artist profile
 */
function ArtistProfileNav({refObject}) {
  const { t } = useTranslation('profile')
  const myProfile = useSelector((state) => state.root.myProfile)
  const [userInfo, setUserInfo] = useState(null)
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType
  const userRoleType = useSelector((state) => state.root.myProfile.userData.userRoleType)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])
  const clickAndScroll=(ref)=>{
    refObject.scrollToTarget(ref)
  }
  return (
    <NavSection>
      {showSection(myProfile, 'about') && (
        <li onClick={()=>clickAndScroll(refObject.AboutSectionRef)} >
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
      {showSection(myProfile, 'artworks') && (
        <li onClick={()=>clickAndScroll(refObject.ArtworkSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.artworks`)}
        </li>
      )}
      {showSection(myProfile, 'likedArtworks') && (
        <li onClick={()=>clickAndScroll(refObject.LikedArtworkSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.likedArtworks`)}
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
      {showSection(myProfile, 'techniques') && (
        <li onClick={()=>clickAndScroll(refObject.TechniqueSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.technique`)}
        </li>
      )}
      {showSection(myProfile, 'expertise') && (
        <li onClick={()=>clickAndScroll(refObject.ExpertiseSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.expertise`)}
        </li>
      )}
      {showSection(myProfile, 'awards') && (
        <li onClick={()=>clickAndScroll(refObject.AwardsSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.awards`)}
        </li>
      )}
      {showSection(myProfile, 'pastExhibitons') && (
        <li onClick={()=>clickAndScroll(refObject.PastExhibitionsSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.pastExhibitions`)}{' '}
        </li>
      )}
      {showSection(myProfile, 'publications') && (
        <li onClick={()=>clickAndScroll(refObject.PublicationsSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.publications`)}
        </li>
      )}
      {showSection(myProfile, 'personalInfo') && (
        <li onClick={()=>clickAndScroll(refObject.PersonalInfoSectionRef)}>
          <BsArrowRight />
          {t(`profileNavigator.personalInfo`)}{' '}
        </li>
      )}

    </NavSection>
  )
}
ArtistProfileNav.propTypes = {
  refObject: PropTypes.object,
}
export default ArtistProfileNav
