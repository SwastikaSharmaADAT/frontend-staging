import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { ImLinkedin } from 'react-icons/im'
import { FiInstagram } from 'react-icons/fi'
import { FaFacebook, FaTwitter } from 'react-icons/fa'
import { IoLogoYoutube } from 'react-icons/io'
import { useTranslation } from 'next-i18next'
import {
  getValuesToShow,
  checkContactSectionVal,
  checkContactSectionEmpty,
  checkVisibility,
  checkContactSectionVisibility,
} from '../../../../utilities/getProfileValues.js'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  .DefaultMsg {
    line-height: 1.7;
    color: #666;
    font-size: 16px;
  }
`

const ContactTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: 20px 0;
  flex-wrap: wrap;
  &.wrapDiv {
    @media (max-width: 991px) and (orientation: landscape) {
      margin-bottom: 0;
    }
    @media (max-width: 767px) {
      margin-bottom: 0;
    }
  }
  &.pageDiv {
    justify-content: flex-start;
    @media (max-width: 991px) and (orientation: landscape) {
      flex-direction: column;
      margin-top: 0;
    }
    @media (max-width: 767px) {
      margin-top: 0;
    }
    .addressDiv {
      margin-right: 45px;
      @media (min-width: 768px) and (max-width: 1024px) {
        margin-right: 0px;
        max-width: 45%;
        white-space: normal;
      }
      @media (max-width: 991px) and (orientation: landscape) {
        margin-right: 0px;
      }
      @media (max-width: 767px) {
        margin-right: 0px;
      }
    }
  }
  @media (max-width: 767px) {
    flex-direction: column;
  }
  @media (max-width: 479px) {
    flex-direction: column;
  }
  &.BottomSocialDiv {
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 20px 0 0;
    flex-direction: row;
  }
`
const CommonContent = styled.div`
  display: flex;
  margin-right: 15px;
  white-space: nowrap;
  &.openingHourDiv {
    white-space: break-spaces !important;
  }
  @media (min-width: 768px) {
    margin: 0 0 15px;
  }
  @media (max-width: 767px) {
    margin: 0 0 10px;
    max-width: 100%;
    white-space: normal;
  }
  @media (max-width: 479px) {
    margin: 0 0 10px;
    max-width: 100%;
  }
  label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #222222;
    padding: 0;
    margin: 0;
    font-family: 'Montserrat-Regular';
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
      margin: 0;
    }
  }
  &.BottomSocialCont {
    max-width: fit-content;
    margin: 0 15px 15px 0;
    svg,
    img {
      font-size: 21px;
      margin: 0 11px 0 0;
    }
  }
`

const InputSelected = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0;
  margin: 0 0 0 5px;
  font-family: 'Montserrat-Regular';
  border-bottom: 1px solid #eee;
  word-break: break-word;
  &.pageType {
    border-bottom: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const SbHeading = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0;
  margin: 25px 0 0;
  display: inline-block;
  width: 100%;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const SocialBox = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  margin: 0;
  height: 36px;
  padding: 0 15px;
  background: #eeeeee;
  border: 2px solid #eeeeee;
  display: flex;
  align-items: center;
  word-break: break-word;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
    padding: 0 10px;
  }
`

const SectionContent = (props) => {
  const { t } = useTranslation('profile')

  const [facebookUserName , setFacebookUsername ] = useState() 
  const [linkdinUserName , setLinkdinUsername ] = useState()
  const [instagramUserName , setInstagramUsername ] = useState()
  const [youtubeUserName , setYoutubeUsername ] = useState()
  const [twitterUserName , setTwitterUsername ] = useState()
  const [vkontakteUserName , setVkontakteUsername ] = useState()
  const getLastItem = (thePath) => {
   let  usernameFromPath = thePath.replace(/\/\s*$/, "")
   let lastVal = usernameFromPath.substring(usernameFromPath.lastIndexOf('/') + 1)
    return lastVal
  }
  useEffect( () => {
  const facebookURL = getValuesToShow(props.userData, 'facebook', 'value')
  const linkdinURL = getValuesToShow(props.userData, 'linkedin', 'value')
  const instagramURL = getValuesToShow(props.userData, 'instagram', 'value')
  const youtubeURL = getValuesToShow(props.userData, 'youtube', 'value')
  const twitterURL = getValuesToShow(props.userData, 'twitter', 'value')
  const vkontakteURL = getValuesToShow(props.userData, 'vkontakte', 'value')
  facebookURL && setFacebookUsername( getLastItem( facebookURL ))
  linkdinURL && setLinkdinUsername( getLastItem( linkdinURL ))
  instagramURL && setInstagramUsername( getLastItem( instagramURL ))
  youtubeURL && setYoutubeUsername( getLastItem( youtubeURL ))
  twitterURL && setTwitterUsername( getLastItem( twitterURL ))
  vkontakteURL && setVkontakteUsername( getLastItem( vkontakteURL ))
  }, [props.userData])
  

  return (
    <>
      <SectionContentWrap>
        {props.userData ? (
          <>
            {checkContactSectionEmpty(props.userData) || !checkContactSectionVisibility(props.userData) ? (
              <span className="DefaultMsg">{t(`contact.noContactInfoFound`)}</span>
            ) : (
              <>
                <ContactTopWrap className={props.userData.userRoleType === 'page' ? 'wrapDiv' : null}>
                  {getValuesToShow(props.userData, 'email', 'condition') && checkVisibility(props.userData, 'email') ? (
                    <CommonContent>
                      <label>{t(`contact.email`)}:</label>
                      <InputSelected>{getValuesToShow(props.userData, 'email', 'value')}</InputSelected>
                    </CommonContent>
                  ) : null}

                  {getValuesToShow(props.userData, 'skype', 'condition') && checkVisibility(props.userData, 'skype') ? (
                    <CommonContent>
                      <label>{t(`contact.skype`)}:</label>
                      <InputSelected>{getValuesToShow(props.userData, 'skype', 'value')}</InputSelected>
                    </CommonContent>
                  ) : null}

                  {getValuesToShow(props.userData, 'mobile', 'condition') &&
                  checkVisibility(props.userData, 'mobile') ? (
                      <CommonContent>
                        <label>{t(`contact.phone`)}:</label>
                        <InputSelected>{getValuesToShow(props.userData, 'mobile', 'value')}</InputSelected>
                      </CommonContent>
                    ) : null}
                </ContactTopWrap>
                {props.userData.userRoleType === 'page' && (
                  <ContactTopWrap className="pageDiv">
                    {getValuesToShow(props.userData, 'address', 'condition') ? (
                      <CommonContent className="addressDiv">
                        <label>{t(`contact.address`)}:</label>
                        <InputSelected className="pageType">
                          {getValuesToShow(props.userData, 'address', 'value')}
                        </InputSelected>
                      </CommonContent>
                    ) : null}
                    {getValuesToShow(props.userData, 'openingHours', 'condition') ? (
                      <CommonContent className="openingHourDiv">
                        <label>{t(`contact.openingHours`)}:</label>
                        <InputSelected className="pageType">
                          {getValuesToShow(props.userData, 'openingHours', 'value')}
                        </InputSelected>
                      </CommonContent>
                    ) : null}
                  </ContactTopWrap>
                )}
                {checkVisibility(props.userData, 'facebook') ? (
                  <>
                    {checkContactSectionVal(props.userData) ? null : (
                      <SbHeading>{t(`contact.socialMedia`)}:</SbHeading>
                    )}
                    <ContactTopWrap className="BottomSocialDiv">
                      {getValuesToShow(props.userData, 'linkedin', 'condition') ? (
                        <CommonContent className="BottomSocialCont">
                          <SocialBox>
                            <ImLinkedin /> {linkdinUserName}
                          </SocialBox>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'instagram', 'condition') ? (
                        <CommonContent className="BottomSocialCont">
                          <SocialBox>
                            <FiInstagram /> {instagramUserName}
                          </SocialBox>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'facebook', 'condition') ? (
                        <CommonContent className="BottomSocialCont">
                          <SocialBox>
                            <FaFacebook /> {facebookUserName}
                          </SocialBox>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'youtube', 'condition') ? (
                        <CommonContent className="BottomSocialCont">
                          <SocialBox>
                            <IoLogoYoutube /> {youtubeUserName}
                          </SocialBox>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'twitter', 'condition') ? (
                        <CommonContent className="BottomSocialCont">
                          <SocialBox>
                            <FaTwitter /> {twitterUserName}
                          </SocialBox>
                        </CommonContent>
                      ) : null}
                      {getValuesToShow(props.userData, 'vkontakte', 'condition') ? (
                        <CommonContent className="BottomSocialCont">
                          <SocialBox>
                            <img src='/assets/vk_icon.png' alt="VKontakte" />{' '}
                            {vkontakteUserName}
                          </SocialBox>
                        </CommonContent>
                      ) : null}
                    </ContactTopWrap>
                  </>
                ) : null}
              </>
            )}
          </>
        ) : null}
      </SectionContentWrap>
    </>
  )
}

SectionContent.propTypes = {
  userData: PropTypes.object,
}

export default SectionContent
