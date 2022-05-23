import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { ImLinkedin } from 'react-icons/im'
import { FiInstagram, FiChevronDown } from 'react-icons/fi'
import { FaFacebook, FaTwitter, FaNetworkWired } from 'react-icons/fa'
import Tooltip from '@material-ui/core/Tooltip'
import { IoLogoYoutube } from 'react-icons/io'
import { RiGroup2Fill } from 'react-icons/ri'
import { BsLockFill } from 'react-icons/bs'
import Textarea from '../../../UI/Textarea'
import VisibilityMenu from '../../VisibilityMenu'
import { TooltipContent } from '../../../../utilities/tooltipContent'
import { getValuesToPrefill, getVisibilityToPrefill } from '../../../../utilities/getProfileValues'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
`

const ContactTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: 20px 0;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: row;
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
  &.PageDiv {
    margin: 0px 0 20px;
    justify-content: flex-start;
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
    textarea {
      height: 140px;
      color: #222;
      &.OpeningHoursTextarea {
        padding: 10px;
      }
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      flex-direction: row;
      justify-content: space-between;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      flex-direction: row;
      justify-content: space-between;
    }
  }
  &.topDiv {
    margin: 20px 0 20px;
    @media (max-width: 1024px) {
      margin: 20px 0 0px;
    }
  }
`
const CommonContent = styled.div`
  display: flex;
  max-width: 238px;
  width: 100%;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1259px) {
    max-width: 48%;
    margin-bottom: 15px;
  }
  @media (max-width: 767px) {
    margin: 0 0 10px;
    max-width: 48%;
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
    padding: 0 0 13px 0;
    margin: 0;
    font-family: 'Montserrat-Regular';
    display: flex;
    align-items: center;
    position: relative;
    .connections-logo {
      margin: 0 5px;
      display: flex;
      align-items: center;
      height: 18px;
      justify-content: center;
      font-size: 19px;
      color: #666;
    }
    div.menu-wrapper {
      cursor: pointer;
      display: flex;
    }
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
      margin: 0;
    }
    img {
      margin: 0 5px;
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

const InputSelected = styled.input`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0 10px;
  margin: 0;
  font-family: 'Montserrat-Regular';
  height: 36px;
  border: 2px solid #eeeeee;
  outline: none;
  -moz-appearance: textfield;
  &:hover,
  &:focus {
    outline: none;
  }
  ::-webkit-outer-spin-button,
  ::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
  ${(props) => (props.readOnly ? 'background-color:#EBEBE4;' : '')}
`

const SbHeading = styled.h2`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0;
  margin: 25px 0 0;
  display: flex;
  width: 100%;
  align-items: center;
  position: relative;
  img {
    margin: 0 5px;
  }
  .connections-logo {
    margin: 0 5px;
    display: flex;
    align-items: center;
    height: 18px;
    justify-content: center;
    font-size: 19px;
    color: #666;
  }
  div.menu-wrapper {
    cursor: pointer;
    display: flex;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const InputSocialBox = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0;
  margin: 0 0 8px;
  font-family: 'Montserrat-Regular';
  height: 36px;
  border: 2px solid #eeeeee;
  outline: none;
  width: 100%;
  display: flex;
  flex-direction: row;
  &:hover,
  &:focus {
    outline: none;
  }
`
const InputSocialDiv = styled.div`
  max-width: 238px;
  width: 100%;
  display: flex;
  flex-direction: column;
  @media (min-width: 768px) and (max-width: 1259px) {
    max-width: 48%;
    margin-bottom: 15px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
    max-width: 48%;
  }
  @media (max-width: 479px) {
    font-size: 14px;
    line-height: normal;
    max-width: 100%;
  }
`

const SocialIconBox = styled.div`
  width: 35px;
  height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`
const InputSocial = styled.input`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  height: 36px;
  border: 0;
  outline: none;
  width: calc(100% - 35px);
  &:hover,
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: normal;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`

const checkURL = (str) =>
  /((https?):\/\/)(www.)?[a-z0-9-]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#-]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/.test(
    str
  )

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('invalidEmail')
    .matches(
      /^(([^<>()[\]\\.,;:$^*\s@"]+(\.[^<>()[\]\\.,;:$^*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'invalidEmail'
    ),
  skype: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  // linkedin: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  // facebook: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  // youtube: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  // instagram: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  // twitter: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  // vkontakte: Yup.string().test('urlNotAllowed', 'urlNotAllowed', (value) => !checkURL(value)),
  mobile: Yup.string().matches(
    /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm,
    'invalidPhone'
  ),
})

const SectionEditContact = (props) => {
  const { t } = useTranslation(['translation', 'profile'])

  const [menuState, setMenuState] = useState({
    email: false,
    skype: false,
    mobile: false,
    allSocialMedia: false,
    address: false,
    openingHours: false,
  })

  const [visibilityValue, setVisibilityValue] = useState({
    email: getVisibilityToPrefill(props.userData, 'email', 'public'),
    // email: props.userData && props.userData.emailVisibility ? props.userData.emailVisibility : 'public',
    skype: getVisibilityToPrefill(props.userData, 'skype', 'public'),
    mobile: getVisibilityToPrefill(props.userData, 'mobile', 'private'),
    allSocialMedia: getVisibilityToPrefill(props.userData, 'facebook', 'public'),
    address: 'public',
    openingHours: 'public',
  })

  const handleClickOutside = (field) => {
    let newStateObj = { ...menuState }
    newStateObj[field] = false
    setMenuState(newStateObj)
  }

  const toggleVisibilityMenu = (field) => {
    let newStateObj = { ...menuState }
    newStateObj[field] = !menuState[field]
    setMenuState(newStateObj)
  }

  const handleVisibilityChange = (e, field, value) => {
    e.stopPropagation()
    let visibilityStateObj = { ...visibilityValue }
    visibilityStateObj[field] = value
    setVisibilityValue(visibilityStateObj)

    let menuStateObj = { ...menuState }
    menuStateObj[field] = false
    setMenuState(menuStateObj)
  }

  const renderIcon = (visibility) => {
    if (visibility === 'public') {
      return (
        <div className="connections-logo">
          <RiGroup2Fill />
        </div>
      )
    } else if (visibility === 'private') {
      return (
        <div className="connections-logo">
          <BsLockFill />
        </div>
      )
    } else if (visibility === 'connections') {
      return (
        <div className="connections-logo">
          <FaNetworkWired />
        </div>
      )
    }
  }

  const initialValues = {
    email: getValuesToPrefill(props.userData, 'email'),
    skype: getValuesToPrefill(props.userData, 'skype'),
    linkedin: getValuesToPrefill(props.userData, 'linkedin'),
    facebook: getValuesToPrefill(props.userData, 'facebook'),
    youtube: getValuesToPrefill(props.userData, 'youtube'),
    instagram: getValuesToPrefill(props.userData, 'instagram'),
    twitter: getValuesToPrefill(props.userData, 'twitter'),
    vkontakte: getValuesToPrefill(props.userData, 'vkontakte'),
    mobile: getValuesToPrefill(props.userData, 'mobile'),
    address: getValuesToPrefill(props.userData, 'address'),
    openingHours: getValuesToPrefill(props.userData, 'openingHours'),
  }

  const { handleChange, handleBlur, values, errors, touched, isValid } = useFormik({
    initialValues,
    validationSchema,
  })

  useEffect(() => {
    if (props.saveState) {
      props.updateData(values, isValid, visibilityValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.saveState])

  return (
    <>
      <SectionContentWrap>
        <ContactTopWrap className={props.userData.userRoleType === 'page' ? 'topDiv' : null}>
          <CommonContent>
            <label>
              {t(`profile:contact.email`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.email]}>
                {renderIcon(visibilityValue.email)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('email')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.email && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="email"
                    value={visibilityValue.email}
                  />
                )}
              </div>
            </label>
            <InputSelected
              type="email"
              value={values.email}
              name="email"
              placeholder={t(`profile:contact.email`)}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.email}
              readOnly={true}
            />
            {errors.email && touched.email ? <ErrorText>{t(`auth.validationErrs.${errors.email}`)}</ErrorText> : null}
          </CommonContent>
          <CommonContent>
            <label>
              {t(`profile:contact.skype`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.skype]}>
                {renderIcon(visibilityValue.skype)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('skype')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.skype && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="skype"
                    value={visibilityValue.skype}
                  />
                )}
              </div>
            </label>
            <InputSelected
              type="text"
              name="skype"
              value={values.skype}
              placeholder={t(`profile:contact.placeholderSkype`)}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.skype}
            />
            {errors.skype && touched.skype ? <ErrorText>{t(`auth.validationErrs.${errors.skype}`)}</ErrorText> : null}
          </CommonContent>
          <CommonContent>
            <label>
              {t(`profile:contact.phoneNumber`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.mobile]}>
                {renderIcon(visibilityValue.mobile)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('mobile')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.mobile && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="mobile"
                    value={visibilityValue.mobile}
                  />
                )}
              </div>
            </label>
            <InputSelected
              type="text"
              name="mobile"
              placeholder="Phone Number"
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.mobile}
              value={values.mobile}
            />
            {errors.mobile && touched.mobile ? (
              <ErrorText>{t(`auth.validationErrs.${errors.mobile}`)}</ErrorText>
            ) : null}
          </CommonContent>
        </ContactTopWrap>

        {props.userData.userRoleType === 'page' && (
          <ContactTopWrap className="PageDiv">
            <CommonContent className="addressDiv">
              <label>
                {t(`profile:contact.address`)}:
                <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.address]}>
                  {renderIcon(visibilityValue.address)}
                </Tooltip>{' '}
              </label>
              <InputSelected
                type="text"
                name="address"
                value={values.address}
                placeholder={t(`profile:contact.placeholderAddress`)}
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.address}
              />
            </CommonContent>
            <CommonContent>
              <label>
                {t(`profile:contact.openingHours`)}:
                <Tooltip
                  arrow
                  disableFocusListener
                  enterTouchDelay={0}
                  title={TooltipContent[visibilityValue.openingHours]}
                >
                  {renderIcon(visibilityValue.openingHours)}
                </Tooltip>{' '}
              </label>
              <Textarea
                className="OpeningHoursTextarea"
                name="openingHours"
                value={values.openingHours}
                placeholder={t(`profile:contact.placeholderOpenHours`)}
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.openingHours}
              />
            </CommonContent>
          </ContactTopWrap>
        )}
        <SbHeading>
          {t(`profile:contact.socialMedia`)}:
          <Tooltip
            arrow
            disableFocusListener
            enterTouchDelay={0}
            title={TooltipContent[visibilityValue.allSocialMedia]}
          >
            {renderIcon(visibilityValue.allSocialMedia)}
          </Tooltip>{' '}
          <div onClick={() => toggleVisibilityMenu('allSocialMedia')} className="menu-wrapper">
            <FiChevronDown />
            {menuState.allSocialMedia && (
              <VisibilityMenu
                handleClickOutside={handleClickOutside}
                handleVisibilityChange={handleVisibilityChange}
                fieldName="allSocialMedia"
                value={visibilityValue.allSocialMedia}
              />
            )}
          </div>
        </SbHeading>

        <ContactTopWrap>
          <InputSocialDiv>
            <InputSocialBox>
              <SocialIconBox>
                <FaFacebook color={values.facebook ? '#222' : '#ccc'} />
              </SocialIconBox>
              <InputSocial
                type="text"
                name="facebook"
                placeholder="Facebook"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.facebook}
                value={values.facebook}
              />
            </InputSocialBox>
            {errors.facebook && touched.facebook ? (
              <ErrorText>{t(`auth.validationErrs.${errors.facebook}`)}</ErrorText>
            ) : null}
          </InputSocialDiv>

          <InputSocialDiv>
            <InputSocialBox>
              <SocialIconBox>
                <FiInstagram color={values.instagram ? '#222' : '#ccc'} />
              </SocialIconBox>
              <InputSocial
                type="text"
                name="instagram"
                placeholder="Instagram"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.instagram}
                value={values.instagram}
              />
            </InputSocialBox>
            {errors.instagram && touched.instagram ? (
              <ErrorText>{t(`auth.validationErrs.${errors.instagram}`)}</ErrorText>
            ) : null}
          </InputSocialDiv>

          <InputSocialDiv>
            <InputSocialBox>
              <SocialIconBox>
                <ImLinkedin color={values.linkedin ? '#222' : '#ccc'} />
              </SocialIconBox>
              <InputSocial
                type="text"
                name="linkedin"
                placeholder="Linkedin"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.linkedin}
                value={values.linkedin}
              />
            </InputSocialBox>
            {errors.linkedin && touched.linkedin ? (
              <ErrorText>{t(`auth.validationErrs.${errors.linkedin}`)}</ErrorText>
            ) : null}
          </InputSocialDiv>

          <InputSocialDiv>
            <InputSocialBox>
              <SocialIconBox>
                <IoLogoYoutube color={values.youtube ? '#222' : '#ccc'} />
              </SocialIconBox>
              <InputSocial
                type="text"
                name="youtube"
                placeholder="Youtube"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.youtube}
                value={values.youtube}
              />
            </InputSocialBox>
            {errors.youtube && touched.youtube ? (
              <ErrorText>{t(`auth.validationErrs.${errors.youtube}`)}</ErrorText>
            ) : null}
          </InputSocialDiv>

          <InputSocialDiv>
            <InputSocialBox>
              <SocialIconBox>
                <FaTwitter color={values.twitter ? '#222' : '#ccc'} />
              </SocialIconBox>
              <InputSocial
                type="text"
                name="twitter"
                placeholder="Twitter"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.twitter}
                value={values.twitter}
              />
            </InputSocialBox>
            {errors.twitter && touched.twitter ? (
              <ErrorText>{t(`auth.validationErrs.${errors.twitter}`)}</ErrorText>
            ) : null}
          </InputSocialDiv>

          <InputSocialDiv>
            <InputSocialBox>
              <SocialIconBox>
                <img src="/assets/vk_icon.png" alt="" style={{ opacity: !values.vkontakte ? 0.3 : null }} />
              </SocialIconBox>
              <InputSocial
                type="text"
                name="vkontakte"
                placeholder="Vkontakte"
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.vkontakte}
                value={values.vkontakte}
              />
            </InputSocialBox>
            {errors.vkontakte && touched.vkontakte ? (
              <ErrorText>{t(`auth.validationErrs.${errors.vkontakte}`)}</ErrorText>
            ) : null}
          </InputSocialDiv>
        </ContactTopWrap>
      </SectionContentWrap>
    </>
  )
}

SectionEditContact.propTypes = {
  updateData: PropTypes.func,
  saveState: PropTypes.bool,
  userData: PropTypes.object,
}

export default SectionEditContact
