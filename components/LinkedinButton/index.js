import React from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FaLinkedin } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'
import dynamic from 'next/dynamic'
import { closeAllModals, setPageLinkId, setPageLinkPopup, socialUserValidate } from '../../modules/auth/authSlice'
import { useSelector } from 'react-redux'

const LinkedIn = dynamic(() => import('react-linkedin-login-oauth2'), {
  ssr: false,
})

const LinkededButtonText = styled.button`
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
  background: #0072b1;
  border: 0;
  cursor: pointer;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  :hover,
  :focus {
    background: #0072b1;
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

const LinkededButton = (props) => {
  const { t } = useTranslation('translation')
  const dispatch = useDispatch()
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const handleSuccess = async (data) => {
    if (data.code) {
      const res = {
        socialType: 'linkedIn',
        token: data.code,
        email: '',
        t: t,
      }
      const response = await dispatch(socialUserValidate(res))
      if (response && response.success && response.data && response.data.legacyPageUserId) {
        dispatch(closeAllModals())
        dispatch(setPageLinkPopup(true))
        dispatch(setPageLinkId(response.data.legacyPageUserId))
      }
    }
  }

  const handleFailure = (error) => {
    // console.log('err', error.errorMessage)
  }

  return (
    <>
      <LinkedIn
        clientId={process.env.NEXT_PUBLIC_REACT_APP_LINKEDIN_APP_CLIENT_ID}
        state={process.env.NEXT_PUBLIC_REACT_APP_LINKEDIN_APP_STATE}
        onFailure={handleFailure}
        onSuccess={handleSuccess}
        redirectUri={`${window.location.origin}/linkedin`}
        scope="r_emailaddress+r_liteprofile"
        renderElement={({ onClick, disabled }) => (
          <LinkededButtonText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''} onClick={onClick} disabled={disabled} ref={props.refs} {...props}>
            {' '}
            <FaLinkedin /> {t('auth.Sign_in')}
          </LinkededButtonText>
        )}
      />
    </>
  )
}
LinkededButton.propTypes = {
  refs: PropTypes.string,
}

export default LinkededButton
