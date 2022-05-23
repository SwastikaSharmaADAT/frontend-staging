import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../../utilities/imageUtils'
import Button from '../../../../UI/Button'
import useTranslateContent from '../../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../../utilities/checkEmptyObject'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

const ListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 20px;
  &.rtl-ar-content {
    direction: rtl;
  }
`
export const DescriptionToggleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  flex: 0 0 100%;
  svg {
    cursor: pointer;
    font-size: 22px;
    color: #222;
    font-weight: bold;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
`
const AboutImg = styled.div`
  width: 150px;
  height: 150px;
  margin: 0 23px 0 0;
  img {
    width: 100%;
    height: 100%;
  }
  @media (max-width: 479px) {
    margin: 0 auto 20px;
  }
`
const AboutDescription = styled.p`
  max-width: calc(100% - 173px);
  font-size: 16px;
  line-height: 1.7;
  display: flex;
  align-items: center;
  color: #666;
  margin: 0;
  padding: 0;
  flex-wrap: wrap;
  width: 100%;
  .DefaultMsg {
    line-height: 1.7;
    color: #666;
  }
  @media (max-width: 479px) {
    font-size: 14px;
    max-width: 100%;
    line-height: 20px;
  }
`
const ProfileBtnWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 0;
  button {
    width: auto;
    height: auto;
    padding: 8px 15px;
    font-family: 'Montserrat-Regular';
  }
`

const AboutTabsSection = ({ aboutMe }) => {
  const { t } = useTranslation('artworks')

  const router = useRouter()
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const [showFullDesc, setShowFullDesc] = useState(false)

  const [description,translateDescription]=useTranslateContent('')

  useEffect(()=>{
    if(!isEmptyObj(aboutMe))
    translateDescription(aboutMe.description)
  },[aboutMe.description])

  return (
    <>
      <ListingWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <AboutImg>
          <img
            src={
              artworkDetail && artworkDetail.userId && artworkDetail.userId.profilePicUrl
                ? createResizeImageUrl(artworkDetail.userId.profilePicUrl, 150, 150, 'profileCover')
                : '/public/assets/artmo-default.png'
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(artworkDetail.userId.profilePicUrl), '/assets/artmo-default.png', 'profileCover', '')
            }}

            alt=""
          />
        </AboutImg>
          <AboutDescription>
            {aboutMe && aboutMe.description && aboutMe.description.length < 401
              ? description
                ? description
                : aboutMe.description
              : aboutMe && aboutMe.description && aboutMe.description.length > 400 && !showFullDesc
              ? description
                ? description.slice(0, 401)
                : aboutMe.description.slice(0, 401)
              : aboutMe && aboutMe.description && aboutMe.description.length > 400 && showFullDesc
              ? description
                ? description
                : aboutMe.description
              : null}
            <DescriptionToggleIcon>
            {aboutMe && aboutMe.description && aboutMe.description.length > 400 && !showFullDesc && (
              <RiArrowDownSLine onClick={() => setShowFullDesc(true)} />
            )}
            {aboutMe && aboutMe.description && aboutMe.description.length > 400 && showFullDesc && (
              <RiArrowUpSLine onClick={() => setShowFullDesc(false)} />
            )}
          </DescriptionToggleIcon>
          </AboutDescription>
        <ProfileBtnWrap>
          <Button
            onClick={() => {
              router.push(`/user/${artworkDetail.userId.username}`)
            }}
          >
            {t(`viewProfile`)}
          </Button>
        </ProfileBtnWrap>
      </ListingWrap>
    </>
  )
}
AboutTabsSection.propTypes = {
  aboutMe: PropTypes.string,
}
export default AboutTabsSection
