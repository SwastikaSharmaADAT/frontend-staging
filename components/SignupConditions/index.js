import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import StyledCheckbox from '../UI/CustomCheckbox'
import Popover from './Popover'
import Link from 'next/link'
import Radio from '../UI/Radio'
import { useSelector } from 'react-redux'

const SignupConditionrow = styled.div`
  color: #222;
  width: 100%;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 16px;
  margin: 15px 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  span {
    font-size: 14px;
    b {
      font-family: 'Montserrat-Medium';
      font-weight: 100;
    }
  }
  svg {
    top: 2px;
    position: relative;
    left: 5px;
    color: #222;
    cursor: pointer;
  }
  .SignInPopover {
    display: flex;
    width: 100%;
    align-items: center;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
  .signup-link {
    color: #222;
  }
`
const UserRoleRadioWrapper = styled.div`
  background: #eee;
  color: #222;
  padding: 13px;
  line-height: normal;
  font-size: 14px;
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: left;
  border: 1px solid #ccc ;
  &.rtl-ar-content {
    direction: rtl;
  }
`

const ChooseRoleHeading = styled.h1`
  font-size: 16px;
  color: #222;
  font-weight: normal;
  padding: 0;
  margin: 0 0 10px 0;
  font-family: 'Montserrat-Regular';
  text-align: center ;
  &.rtl-ar-content {
    text-align: right;
  }
`

export const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
`

export const RadioDiv = styled.div`
  width: 48%;
  display: flex;
  align-items: center;
  justify-content: center;
  > div:first-child {
    margin: 0;
  }
  .container {
    padding-left: 22px;
    margin-bottom: 19px;
    input:checked ~ .checkmark {
      border: 2px solid #000;
    }
    .checkmark {
      border: 2px solid #aaa;
      background-color: #fff;
    }
    input:checked ~ .checkmark:after {
      background: #222222;
    }
    :hover input ~ .checkmark {
      border: 2px solid #000;
    }
  }
`


export const RadioText = styled.div`
  padding: 2px 0 0 5px;
  color: #222;
  font-size: 14px;
`

export const CreatePageInfo = styled.div`
  text-align: center ;
  padding: 2px 0 0 5px;
  color: #222;
  font-size: 11px;
  font-family: 'Montserrat-Regular';
  line-height: 14px;
  span {
    position: relative;
    top: 2px;
    svg {
      font-size: 13px;
      cursor: pointer;
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
`

const StyledCheckboxWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: row;
  width: 100%;
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px !important;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
`




const SignupCondition = ({
  handleArtistChange,
  handleTermsSelectedChange,
  isArtist,
  isMember,
  termsSelected,
  profileSelectedError,
  termsSelectedError,
  legacyPageUserId
}) => {
  const { t } = useTranslation(['translation'])
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <UserRoleRadioWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
      {
        profileSelectedError ? <ErrorText>{t('auth.validationErrs.profileType')}</ErrorText> : null 
      }
        <ChooseRoleHeading className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('auth.userRoleChoose')}</ChooseRoleHeading>
        
        <RadioWrap>
          <RadioDiv>
            <Radio name="userRoleSelect" value={'artist'} checked={isArtist} onChange={handleArtistChange} />
            <RadioText>{t('auth.artistRole')}</RadioText>
          </RadioDiv>
          <RadioDiv>
            <Radio name="userRoleSelect" value={'member'} checked={isMember} onChange={handleArtistChange} />
            <RadioText>{t('auth.memberRole')}</RadioText>
          </RadioDiv>
        </RadioWrap>
      </UserRoleRadioWrapper>
      {!legacyPageUserId&&<CreatePageInfo  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        {t('auth.createAPageText')}{' '}
        {/* <span>
          <BsFillQuestionCircleFill />
        </span> */}
      </CreatePageInfo>}
      <SignupConditionrow  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <FormGroup>
          {termsSelectedError ? <ErrorText>{t('auth.validationErrs.termsNotAccepted')}</ErrorText> : null}
          <StyledCheckboxWrapper>
            <StyledCheckbox checked={termsSelected} onChange={handleTermsSelectedChange} />{' '}
            <span>
              {t('auth.acceptText')} <a target="_blank" href="/user-terms-conditions" className="signup-link"><b>{t('auth.t&C')}</b></a> {t('auth.and')} <a target="_blank" className="signup-link" href="/privacy-policy" to="privacy-policy"><b>{t('auth.privacyPolicy')}</b></a>
            </span>
          </StyledCheckboxWrapper>
        </FormGroup>
      </SignupConditionrow>
    </>
  )
}

SignupCondition.propTypes = {
  legacyPageUserId: PropTypes.string,
  isArtist: PropTypes.bool,
  isMember: PropTypes.bool,
  profileSelectedError: PropTypes.bool,
  termsSelected: PropTypes.bool,
  termsSelectedError: PropTypes.bool,
  handleArtistChange: PropTypes.func,
  handleTermsSelectedChange: PropTypes.func,

}

export default SignupCondition
