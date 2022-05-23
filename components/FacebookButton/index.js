import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FaFacebook } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'
import { closeAllModals, setPageLinkId, setPageLinkPopup, socialUserValidate } from '../../modules/auth/authSlice'
import { useSelector } from 'react-redux'

const FacebookButtonText = styled.button`
  max-width: 130px;
  height: 36px;
  color: #fff;
  font-size: 16px;
  margin: 0;
  text-decoration: none;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #4868ad;
  border: 0;
  cursor: pointer;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  :hover,
  :focus {
    background: #4868ad;
    outline: none;
  }
  &.rtl-ar-content {
    svg {
      order: 2;
      margin: 0 0 0 8px;
    }
  }
  svg {
    margin: 0 8px 0 0;
    font-size: 18px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-width: 47%;
  }
`

const FacebookButton = (props) => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const responseFacebook = async (res) => {
    if (res.email && res.accessToken) {
      const data = {
        socialType: 'facebook',
        token: res.accessToken,
        email: res.email,
        t:t
      }
      const response = await dispatch(socialUserValidate(data))
      if (response.success && response.data.legacyPageUserId) {
        dispatch(closeAllModals())
        dispatch(setPageLinkPopup(true))
        dispatch(setPageLinkId(response.data.legacyPageUserId))
      }
    }
  }

  const isFacebookApp = () => {
    const ua = typeof window !== 'undefined' && (navigator.userAgent || navigator.vendor || window.opera)
    return ua.indexOf('FBAN') > -1 || ua.indexOf('FBAV') > -1 || ua.indexOf('Instagram') > -1
  }

  return (
    <>
      <FacebookLogin
        disableMobileRedirect={!isFacebookApp()}
        appId={process.env.NEXT_PUBLIC_REACT_APP_FACEBOOK_LOGIN_APP_ID}
        state={process.env.NEXT_PUBLIC_REACT_APP_FACEBOOK_APP_STATE}
        autoLoad={isFacebookApp()}
        fields="name,email,picture"
        callback={responseFacebook}
        render={(renderProps) => (
          <FacebookButtonText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''} onClick={renderProps.onClick} ref={props.refs} {...props}>
            <FaFacebook />
            {t('auth.Sign_in')}
          </FacebookButtonText>
        )}
      />
    </>
  )
}

FacebookButton.propTypes = {
  refs: PropTypes.string,
}

export default FacebookButton
