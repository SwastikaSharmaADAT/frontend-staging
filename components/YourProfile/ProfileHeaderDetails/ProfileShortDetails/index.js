import React, { useCallback, useEffect } from 'react'
import styled from 'styled-components'
import { FiInstagram } from 'react-icons/fi'
import { ImLinkedin, ImSkype } from 'react-icons/im'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { IoLogoYoutube } from 'react-icons/io'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import ProfileFollowsdesp from '../ProfileFollowsdesp'
import { capitalizeFirstChar } from '../../../../utilities/capitalizeFirstChar'
import { checkSocialUrl } from '../../../../utilities/checkSocialUrl'
import { getValuesToShow, checkVisibility } from '../../../../utilities/getProfileValues.js'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { useRouter } from 'next/router'

const ProfileShort = styled.div`
  width: 100%;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  color: #222222;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
const SocialDiv = styled.div`
  font-size: 18px;
  color: #222222;
  margin: 5px 0 0 0;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    margin: 10px 0 0 0;
  }
  a {
    line-height: normal;
    margin: 0 5px 0 0;
    position: relative;
    cursor: pointer;
    display: flex;
  }
  a.skype-link:link {
    color: inherit;
  }
`
const ShortDesp = styled.p`
  font-size: 13px;
  line-height: 21px;
  display: flex;
  align-items: center;
  color: #666666;
  margin: 0;
  padding: 10px 0;
  white-space: break-spaces;
`
const ShortDespTextarea = styled.textarea`
  width: 97%;
  background: transparent;
  padding: 10px;
  resize: none;
  border: 0;
  outline: 0;
  color: #666666;
  font-size: 13px;
  font-family: 'Montserrat-Regular';
  /* display: none; */
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    min-height: 80px;
    font-size: 14px;
  }
`

const DescriptionBox = styled.div`
  width: 50%;
  border: 2px solid #eee;
  position: relative;
  flex-wrap: wrap;
  justify-content: flex-end;
  display: flex;
  margin: 10px 0 0;
  bottom: 90px;
  &.pageDesp {
    width: 99%;
    bottom: 0px;
  }
  &.fulWid {
    width: 99%;
    bottom: 0px;
  }
  @media (max-width: 767px) {
    width: 99%;
    bottom: 200px;
    &.fulWid {
      bottom: 75px;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
    bottom: 130px;
    height: 130px;
    &.fulWid {
      bottom: 75px;
    }
  }
  @media (min-width: 1050px) and (max-width: 1200px) {
    width: 99%;
    bottom: 190px;
    &.fulWid {
      bottom: 70px;
    }
  }
  @media (max-width: 991px) {
    margin: 0;
  }
  .countDiv {
    font-size: 13px;
    color: #ccc;
    align-items: flex-end;
    padding: 0 10px 5px;
  }
`

const ProfileShortDetails = (props) => {
  const router = useRouter()

  const { t } = useTranslation('profile')
  const isEditingHeader = useSelector((state) => state.root.myProfile.isEditingHeader)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)

  const renderRoleOrProfession = useCallback(() => {
    if (props.userData && props.userData.userRoleType === 'personal') {
      if (props.userData.userRole) {
        if (props.userData.userRole === 'artist') {
          return capitalizeFirstChar(props.userData.userRole)
        } else if (props.userData.userRole === 'member') {
          if (
            getValuesToShow(props.userData, 'profession', 'condition') &&
            checkVisibility(props.userData, 'profession')
          ) {
            return getValuesToShow(props.userData, 'profession', 'value')
          } else {
            return capitalizeFirstChar(props.userData.userRole)
          }
        }
      } else {
        return null
      }
    } else if (props.userData && props.userData.userRoleType === 'page') {
      return capitalizeFirstChar(props.userData.userRole)
    }
  }, [props.userData])

  const socialIconClickHandler = (url) => {
    // console.log(url)
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      props.scrollToBlurred()
    } else {
      openInNewTab( url)
    }
  }
  const [description, translateDescription] = useTranslateContent('')
  const [role, translateRole] = useTranslateContent('')
  const [city, translateCity] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')

  useEffect(() => {
    if (!isEmptyObj(props.userData)) {
      translateDescription(props.userData && props.userData.bio)
      translateRole(props.userData && renderRoleOrProfession())
      translateCity(props.userData && getValuesToShow(props.userData, 'city', 'value'))
      translateCountry(props.userData && getValuesToShow(props.userData, 'country', 'value'))
    }
  }, [props.userData, renderRoleOrProfession])

  return (
    <>
      <ProfileShort>
        <div>
          {props.userData && !isEditingHeader ? (
            <>
              {role ? role : renderRoleOrProfession()}
              {getValuesToShow(props.userData, 'city', 'condition') ? (
                <>
                  {' '}
                  <span>•</span> {city ? city : props.userData && getValuesToShow(props.userData, 'city', 'value')}
                </>
              ) : null}
              {getValuesToShow(props.userData, 'country', 'condition') ? (
                <>
                  {' '}
                  <span>•</span>{' '}
                  {country ? country : props.userData && getValuesToShow(props.userData, 'country', 'value')}
                </>
              ) : null}
            </>
          ) : null}
        </div>
      </ProfileShort>
      {props.userData && props.userData.bio && !isEditingHeader ? (
        <ShortDesp>{description ? description : props.userData && props.userData.bio}</ShortDesp>
      ) : null}
      {isEditingHeader ? (
        <DescriptionBox
          className={(subscription && 'fulWid') || (props.userData.userRoleType === 'page' && 'pageDesp')}
        >
          <ShortDespTextarea
            value={props.bioValue}
            onChange={props.bioOnChange}
            maxLength={200}
            placeholder={t(`profile:placeholderIntro`)}
          ></ShortDespTextarea>
          <span className="countDiv">{props.bioCharCount}/200</span>
        </DescriptionBox>
      ) : null}
      {!isEditingHeader && (
        <ProfileFollowsdesp
          userData={props.userData}
          setShowFollowers={props.setShowFollowers}
          setShowFollowing={props.setShowFollowing}
          setShowConnections={props.setShowConnections}
          scrollToBlurred={props.scrollToBlurred}
          redirectToConnections={props.redirectToConnections}
        />
      )}
      
      <SocialDiv>
        {props.userData && !isEditingHeader ? (
          <>
            {checkVisibility(props.userData, 'facebook') ? (
              <>
                {getValuesToShow(props.userData, 'instagram', 'condition') ? (
                  
                  <a onClick={() => socialIconClickHandler(`${getValuesToShow(props.userData, 'instagram', 'value')}`)}>
                    <FiInstagram />
                  </a>
                ) : null}
                {getValuesToShow(props.userData, 'linkedin', 'condition') ? (
                  <a onClick={() => socialIconClickHandler(`${getValuesToShow(props.userData, 'linkedin', 'value')}`)}>
                    <ImLinkedin />
                  </a>
                ) : null}
                {getValuesToShow(props.userData, 'twitter', 'condition') ? (
                  <a onClick={() => socialIconClickHandler(`${getValuesToShow(props.userData, 'twitter', 'value')}`)}>
                    <FaTwitter />
                  </a>
                ) : null}
                {getValuesToShow(props.userData, 'facebook', 'condition') ? (
                  <a onClick={() => socialIconClickHandler(`${getValuesToShow(props.userData, 'facebook', 'value')}`)}>
                    <FaFacebook />
                  </a>
                ) : null}
                {getValuesToShow(props.userData, 'youtube', 'condition') ? (
                  <a onClick={() => socialIconClickHandler(`${getValuesToShow(props.userData, 'youtube', 'value')}`)}>
                    <IoLogoYoutube />
                  </a>
                ) : null}
                {getValuesToShow(props.userData, 'vkontakte', 'condition') ? (
                  <a onClick={() => socialIconClickHandler(`${getValuesToShow(props.userData, 'vkontakte', 'value')}`)}>
                    <img src="/assets/vk_icon.png" alt="" />
                  </a>
                ) : null}
              </>
            ) : null}
            {getValuesToShow(props.userData, 'skype', 'condition') && checkVisibility(props.userData, 'skype') ? (
              <a
                className="skype-link"
                href={
                  props.userData.userIdentity !== 'guestUser' &&
                  `skype:${getValuesToShow(props.userData, 'skype', 'value')}?userinfo`
                }
                onClick={() => (props.userData.userIdentity === 'guestUser' ? props.scrollToBlurred() : null)}
              >
                <ImSkype />
              </a>
            ) : null}
          </>
        ) : null}
      </SocialDiv>
    </>
  )
}

ProfileShortDetails.propTypes = {
  userData: PropTypes.object,
  bioOnChange: PropTypes.func,
  bioCharCount: PropTypes.number,
  bioValue: PropTypes.string,
  setShowFollowers: PropTypes.func,
  setShowFollowing: PropTypes.func,
  setShowConnections: PropTypes.func,
  scrollToBlurred: PropTypes.func,
  redirectToConnections: PropTypes.func,
}

export default ProfileShortDetails
