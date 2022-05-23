import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
} from '../../../modules/auth/authSlice'

const JoinSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: column;
  padding: 0;
  max-width: 350px;
  margin: 0 auto 30px;
  &.width100 {
    width: 100%;
  }
`
const HeadingBar = styled.div`
  text-align: center;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222;
  min-height: 52px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  @media (max-width: 479px) {
    font-size: 18px;
    line-height: normal;
  }
  &.clickable {
    cursor: pointer;
  }
`

const JoinBanner = styled.div.withConfig({
  componentId: 'JoinBannerWrapperStyling',
})`
  width: 100%;
  height: 217px;
  display: flex;
  position: relative;
  justify-content: flex-start;
  align-items: center;
  background: url('/assets/Sign-Up-Feature.gif') no-repeat right center #000;
  background-size: 100%;
`

const BannerLink = styled.div`
  font-size: 20px;
  line-height: 24px;
  color: #fff;
  max-width: 135px;
  padding-left: 20px;
  @media (max-width: 479px) {
    font-size: 18px;
    line-height: normal;
  }
`
const ButtonSignUp = styled.button`
  font-weight: bold;
  font-size: 16px;
  text-align: center;
  color: #222;
  background: #fff;
  width: auto;
  border: 0;
  padding: 10px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 30px 0 0;
  :hover {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
`

const JoinSection = ({ showOnlyHeading }) => {
  const { t } = useTranslation('rightSection')

  const dispatch = useDispatch()

  const openSignupModal = () => {
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <>
      <JoinSectionWrap className={showOnlyHeading ? 'width100 filterSec' : 'filterSec'}>
        <HeadingBar className={showOnlyHeading ? 'clickable' : ''} onClick={() => showOnlyHeading && openSignupModal()}>
          {t(`joinText`)}
        </HeadingBar>
        {!showOnlyHeading && (
          <JoinBanner>
            <BannerLink>
              {t(`connectText`)}
              <ButtonSignUp onClick={() => openSignupModal()}>{t(`signUp`)}</ButtonSignUp>
            </BannerLink>
          </JoinBanner>
        )}
      </JoinSectionWrap>
    </>
  )
}

JoinSection.propTypes = {
  showOnlyHeading: PropTypes.bool,
}

export default JoinSection
