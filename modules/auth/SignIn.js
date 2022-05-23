import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { useTranslation } from 'next-i18next'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import FacebookButton from '../../components/FacebookButton'
import LinkededButton from '../../components/LinkedinButton'
import OrSeperator from '../../components/UI/OrSeperator'
import CloseIcon from '../../components/UI/CloseIcon/CloseIcon'
import {
  login,
  closeAllModals,
  setForgetPassPopup,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
  setForgetPassError,
  setPageLinkPopup,
  setPageLinkId,
  setCredentials,
} from './authSlice'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 90vw;
  }
`

const Wrapper = styled.div`
  position: relative;
  max-width: 344px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  font-style: normal;
  font-weight: 400;
  min-height: 380px;
  min-width: 344px;
  @media (max-width: 991px) {
    overflow-y: auto;
    height: calc(100vh - 680px);
    min-height: 420px;
  }
  @media (max-width: 767px) {
    overflow-y: auto;
    height: calc(100vh - 510px);
    max-width: 300px;
    min-width: 300px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    overflow-y: auto;
    height: calc(100vh - 150px);
    min-height: inherit;
  }
`

const LoginContainer = styled.div`
  padding: 35px 37px;
  @media (max-width: 991px) {
    padding: 20px 15px;
  }
  .signin-close {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 25px;
    padding: 35px 37px;
    @media (max-width: 991px) {
      padding: 20px 15px;
    }
  }
`

const Heading = styled.h1`
  margin: 0;
  padding: 0;
  color: #fff;
  line-height: normal;
  font-size: 24px;
  text-align: center;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
`

const SocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
`
const HeadingContainer = styled.div`
  background: #222;
  text-align: center;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    color: #fff;
  }
  .signin-close {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 25px;
  }
`
const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  svg {
    position: absolute;
    font-size: 20px;
    /* top: ${(props) => (props.hasError ? '24px' : '10px')}; */
    top: 10px;
    color: #ccc;
    right: 15px;
    cursor: pointer;
  }
  .eyeWrapper {
    position: relative;
    border: 2px solid #eee;
    border-color: ${(props) => (props.hasError ? '#d62d1e' : '#eee')};
    display: flex;
    align-items: center;
    height: 36px;

    input {
      height: auto;
      margin: 0;
      border: 0;
    }
  }
`

const CommonForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
`

const BottomSpan = styled.span`
  flex-direction: row;
  justify-content: center;
  color: #222;
  text-align: center;
  width: 100%;
  display: flex;
  a {
    font-size: 16px;
    text-decoration: none;
    color: #222;
    cursor: pointer;
    margin: 0 0 0 5px;
    :hover {
      color: #222;
      text-decoration: none;
    }
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding-bottom: 15px;
  }
  &.tpMarg {
    margin-top: 10px ;
  }
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
`

const ForgotPass = styled.span`
  cursor: pointer;
  color: #222;
  padding: 10px 0 5px;
  text-align: center;
`

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .matches(/^\S*$/, 'noSpacesUsername')
  .required('emailUsernameRequired'),
  password: Yup.string().required('passwordRequired'),
})

/**
 * @description SignIn
 * @param {*} param0
 */
export const SignIn = (props) => {
  const dispatch = useDispatch()
  const [showPass, setShowPass] = useState(false)

  //Commented 11-11-2021
  // const [alreadySnooze, setAlreadySnooze] = useState(null)
  // const alreadySnoozeValue = alreadySnooze && JSON.parse(alreadySnooze)

  // useEffect(() => {
  //   setAlreadySnooze(localStorage.getItem('snoozed_popup'))
  // })

  
  const loginError = useSelector((state) => state.root.auth.loginError)
  const socialUserError = useSelector((state) => state.root.auth.socialUserError)

  const { t } = useTranslation('translation')
  const onSubmit = async (values) => {
    const data = {
      ...values,
      t: t,
    }
    const response = await dispatch(login(data))
    if (response.success && response.data.legacyPageUserId) {
      dispatch(setCredentials(values))
      dispatch(closeAllModals())
      dispatch(setPageLinkPopup(true))
      dispatch(setPageLinkId(response.data.legacyPageUserId))
    }
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit,
  })

  const togglePassVisibility = () => {
    setShowPass(!showPass)
  }

  const openForgotPassModal = () => {
    dispatch(closeAllModals())
    dispatch(setForgetPassError(null))
    dispatch(setForgetPassPopup(true))
  }

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
      <PageWrapper>
        <Wrapper>
          <HeadingContainer>
            {/* {!alreadySnoozeValue && <CloseIcon className="signin-close" onclick={() => props.closeModal(false)} />} */}
            <CloseIcon className="signin-close" onclick={() => props.closeModal(false)} />
            <Heading>{t('auth.Log_In')}</Heading>
          </HeadingContainer>
          <LoginContainer>
            <SocialLogin>
              <FacebookButton />
              <LinkededButton />
            </SocialLogin>
            <OrSeperator />
            <form onSubmit={handleSubmit}>
              <CommonForm>
                <FormGroup>
                  {errors.email && touched.email ? (
                    <ErrorText>{t(`auth.validationErrs.${errors.email}`)}</ErrorText>
                  ) : null}
                  <Input
                    type="text"
                    name="email"
                    placeholder={t('auth.placeholders.emailUsername')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.email}
                    hasError={errors.email && touched.email}
                  />
                </FormGroup>
                <FormGroup hasError={errors.password && touched.password}>
                  {errors.password && touched.password ? (
                    <ErrorText>{t(`auth.validationErrs.${errors.password}`)}</ErrorText>
                  ) : null}
                  <div className="eyeWrapper">
                    <Input
                      type={showPass ? 'text' : 'password'}
                      name="password"
                      placeholder={t('auth.placeholders.password')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.password}
                      hasError={errors.password && touched.password}
                    />
                    {showPass ? (
                      <MdVisibility onClick={() => togglePassVisibility()} />
                    ) : (
                      <MdVisibilityOff onClick={() => togglePassVisibility()} />
                    )}
                  </div>
                </FormGroup>
                <ForgotPass onClick={openForgotPassModal}>{t(`auth.forgotPassword`)}</ForgotPass>
                {loginError ? <ErrorText>{t(`auth.serverResponses.errors.${loginError}`)}</ErrorText> : null}
                {socialUserError ? <ErrorText>{t(`auth.serverResponses.errors.${socialUserError}`)}</ErrorText> : null}
                <Button type="submit" className="btn btn-primary" disabled={!(isValid && dirty)}>
                  {t('auth.Log_In')}
                </Button>
              </CommonForm>
            </form>
            <BottomSpan>
            <a onClick={openSignupModal}>{t('auth.newToArtmo')}? {t('auth.Sign_Up')}</a>
            </BottomSpan>
            <BottomSpan className="tpMarg">
            <a href="mailto:hello@artmo.com">{t('auth.needHelp')}</a>
            </BottomSpan>
          </LoginContainer>
        </Wrapper>
      </PageWrapper>
    </>
  )
}
SignIn.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}
