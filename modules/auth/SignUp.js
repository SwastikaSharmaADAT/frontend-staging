import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { MdVisibility, MdVisibilityOff } from 'react-icons/md'
import { useTranslation } from 'next-i18next'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { datePickerTheme } from '../../utilities/datePickerTheme'
import { getMaxDate } from '../../utilities/convertDate'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import FacebookButton from '../../components/FacebookButton'
import LinkededButton from '../../components/LinkedinButton'
import OrSeperator from '../../components/UI/OrSeperator'
import SignupCondition from '../../components/SignupConditions'
import SignupBackgroundBg from '../../components/SignupBackground'
import TopSignupbar from '../../components/SignupSnoozeBar'
import CloseIcon from '../../components/UI/CloseIcon/CloseIcon'
import {
  checkUsername,
  signup,
  checkEmail,
  closeAllModals,
  setLoginPopup,
  setLoginError,
  setSocialUserError,
} from './authSlice'
import { event } from '../../lib/gtag'
import { useRouter } from 'next/router'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  @media (max-width: 991px) {
    max-width: 90vw;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    // max-width: 47vw;
  }
`

const Wrapper = styled.div`
  padding: 0;
  position: relative;
  max-width: 550px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  font-style: normal;
  font-weight: 400;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) {
    display: flex;
    height: auto !important;
  }
  @media (max-width: 991px) {
    overflow-y: auto;
    height: calc(100vh - 510px);
  }
  @media (max-width: 767px) {
    overflow-y: auto;
    height: calc(100vh - 175px);
  }
  &.signupWrap{
    @media (max-width: 767px) {
      overflow-y: auto;
      height: calc(100vh - 90px);
    } 
  }

  @media (max-width: 991px) and (orientation: landscape) {
    height: calc(100vh - 100px) !important;
    width: 60vw;
  }
  @media (min-width: 320px) and (max-width: 767px) and (orientation: landscape) {
    width: 100%;
  }
`

const LoginContainer = styled.div`
  padding: 37px 35px;
  @media (max-width: 767px) {
    padding: 30px 20px;
    max-width: inherit;
    width: auto;
    min-height: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 20px 20px 37px;
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
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 20px;
  }
`

const SocialLogin = styled.div`
  display: flex;
  justify-content: space-between;
  @media (max-width: 550px) {
    flex-direction: row;
    > button {
      max-width: inherit;
      //margin-bottom: 15px;
      width: 49%;
    }
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
  .MuiOutlinedInput-root.MuiInputBase-formControl {
    border-radius: 0;
    border: 2px solid #eee;
    border-color: ${(props) => (props.hasError ? '#d62d1e' : '#eee')};
    outline: 0;
    box-shadow: none;
    font-size: 14px;
    padding-right: 0 !important;
    color: #222;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
    font-size: 16px;
    padding: 0 4px;
    height: 40px;
    svg {
      position: inherit;
    }
    .MuiOutlinedInput-input {
      padding: 10px;
      font-family: 'Montserrat-Regular';
      font-weight: 400;
      font-size: 16px;
      color: #222;
      &::placeholder {
        color: #666;
        opacity: 1;
      }
    }
  }
  .Datepicker {
    fieldset {
      border: 0;
    }
  }
  &.m-t-10 {
    margin-top: 10px;
  }
  .rtl-ar-content {
    direction: rtl;
  }
`

const CommonForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
`
const Info = styled.div`
  padding-bottom: 15px;
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
`

const RightContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 580px;
  max-width: calc(100% - 203px);
  @media (max-width: 767px) {
    max-width: inherit;
    width: auto;
    min-height: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-width: 100%;
    min-height: 520px;
  }
  // .signup-close {
  //   position: absolute;
  //   right: 10px;
  //   top: 10px;
  // }
  .signup-close {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 25px;
  }
`

const BottomSpan = styled.span`
  flex-direction: row;
  justify-content: center;
  color: #222;
  text-align: center;
  width: 100%;
  display: flex;
  font-size: 16px;
  margin-top: 10px;
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
`

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('invalidEmail')
    .matches(
      /^(([^<>()[\]\\.,;:$^*\s@"]+(\.[^<>()[\]\\.,;:$^*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'invalidEmail'
    )
    .required('emailRequired'),
  password: Yup.string()
    .matches(/^(?=.*)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$/, 'passwordConditions')
    .required('passwordRequired'),
  username: Yup.string()
    .matches(/^[A-Za-z0-9_]+$/, 'usernameConditions')
    .min(3, 'usernameTooShort')
    .required('usernameRequired'),
  dob: Yup.date('invalidDob').nullable().min(new Date('01/01/1900')).max(getMaxDate()).required('dobRequired'),
})

export const SignUp = (props) => {
  const dispatch = useDispatch()
  const [isArtist, setIsArtist] = useState(false)
  const [isMember, setIsMember] = useState(false)
  const [showPass, setShowPass] = useState(false)
  const [termsSelected, setTermsSelected] = useState(false)
  const [termsSelectedError, setTermsSelectedError] = useState(false)
  const [profileSelectedError, setProfileSelectedError] = useState(false)
  const [pickerStatus, setPickerStatus] = useState(false)
  const usernameValidFormError = useSelector((state) => state.root.auth.usernameValidFormError)
  const emailValidFormError = useSelector((state) => state.root.auth.emailValidFormError)
  const signupError = useSelector((state) => state.root.auth.signupError)
  const socialUserError = useSelector((state) => state.root.auth.socialUserError)
  const legacyPageUserId = useSelector((state) => state.root.auth.legacyPageUserId)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const router = useRouter()
  const params = router.query

  const referralCode = localStorage.getItem('referralCode')

  // const [alreadySnooze, setAlreadySnooze] = useState(null)
  // const alreadySnoozeValue = alreadySnooze && JSON.parse(alreadySnooze)

  // useEffect(() => {
  //   setAlreadySnooze(localStorage.getItem('snoozed_popup'))
  // })

  // const { t, i18n } = useTranslation(['translation'])
  const { t } = useTranslation(['translation', 'profile'])

  const handleArtistChange = (e) => {
    if (!e.target.checked) {
      setProfileSelectedError(true)
    } else {
      setProfileSelectedError(false)
    }
    setIsArtist(e.target.value === 'artist' ? true : false)
    setIsMember(e.target.value === 'member' ? true : false)
  }

  const handleTermsSelectedChange = (e) => {
    if (!e.target.checked) {
      setTermsSelectedError(true)
    } else {
      setTermsSelectedError(false)
    }
    setTermsSelected(e.target.checked)
  }

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty, setFieldValue } = useFormik({
    initialValues: {
      email: '',
      password: '',
      username: '',
      dob: null,
    },
    validationSchema,
    onSubmit(values) {
      if (!termsSelected) {
        setTermsSelectedError(true)
        return
      } else if (!isArtist && !isMember) {
        setProfileSelectedError(true)
        return
      } else {
        const data = {
          ...values,
          legacyPageUserId,
          referralCode: referralCode ? referralCode : null,
          roleType: isArtist ? 'artist' : 'member',
          tnC: true,
        }
        event({ action: 'click', category: 'auth', label: 'signup', value: 1 })
        dispatch(signup(data))
      }
    },
  })

  const togglePassVisibility = () => {
    setShowPass(!showPass)
  }

  const userNameBlur = (event) => {
    handleBlur(event)
    if (event.target.value !== '') {
      dispatch(checkUsername(event.target.value))
    }
  }

  const emailBlur = (event) => {
    handleBlur(event)
    if (event.target.value !== '' && !(errors.email && touched.email)) {
      dispatch(checkEmail(event.target.value))
    }
  }

  const openLoginModal = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  return (
    <>
      <PageWrapper>
        <Wrapper className="signupWrap">
          <SignupBackgroundBg></SignupBackgroundBg>
          <RightContainer>
            <HeadingContainer>
              {/* {!props.snooze && !alreadySnoozeValue && <CloseIcon className="signup-close" onclick={() => props.closeModal(false)} />}
              {props.snooze && !alreadySnoozeValue && <TopSignupbar />} */}

              {!props.snooze && <CloseIcon className="signup-close" onclick={() => props.closeModal(false)} />}
              {props.snooze && <TopSignupbar />}
              <Heading>{t('auth.SignUp')}</Heading>
            </HeadingContainer>
            <LoginContainer>
              {legacyPageUserId && <Info>{t('auth.legacyPageLinkInfo')} </Info>}
              <SocialLogin>
                <FacebookButton />
                <LinkededButton />
              </SocialLogin>
              <OrSeperator />
              <form onSubmit={handleSubmit}>
                <CommonForm>
                  <FormGroup>
                    {errors.email && touched.email ? (
                      <ErrorText className="error-email">{t(`auth.validationErrs.${errors.email}`)}</ErrorText>
                    ) : null}
                    {emailValidFormError && !errors.email && touched.email ? (
                      <ErrorText className="error-email-2">
                        {t(`auth.serverResponses.errors.${emailValidFormError}`)}
                      </ErrorText>
                    ) : null}
                    <Input
                      type="email"
                      name="email"
                      placeholder={t('auth.placeholders.email')}
                      onChange={handleChange}
                      onBlur={emailBlur}
                      values={values.email}
                      hasError={(errors.email && touched.email) || emailValidFormError}
                    />
                  </FormGroup>
                  <FormGroup>
                    {errors.username && touched.username ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.username}`)}</ErrorText>
                    ) : null}
                    {usernameValidFormError && !errors.username && touched.username ? (
                      <ErrorText>{t(`auth.serverResponses.errors.${usernameValidFormError}`)}</ErrorText>
                    ) : null}
                    <Input
                      type="text"
                      name="username"
                      placeholder={t('auth.placeholders.username')}
                      onChange={handleChange}
                      onBlur={userNameBlur}
                      values={values.username}
                      hasError={(errors.username && touched.username) || usernameValidFormError}
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
                  <FormGroup className="m-t-10" hasError={errors.dob && touched.dob}>
                    {errors.dob && touched.dob ? <ErrorText>{t(`auth.validationErrs.${errors.dob}`)}</ErrorText> : null}
                    <ThemeProvider theme={datePickerTheme} className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
                      <MuiPickersUtilsProvider
                        utils={DateFnsUtils}
                        className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
                      >
                        <KeyboardDatePicker
                          className="Datepicker"
                          autoComplete="off"
                          InputProps={{ readOnly: true }}
                          id="date-picker-dialog"
                          format="MM/dd/yyyy"
                          placeholder={t(`profile:personalInfo.placeholderDob`)}
                          name="dob"
                          value={values.dob}
                          onBlur={handleBlur}
                          invalidDateMessage=""
                          invalidLabel=""
                          emptyLabel={null}
                          onChange={(val) => setFieldValue('dob', val)}
                          KeyboardButtonProps={{
                            'aria-label': 'change date',
                          }}
                          inputVariant="outlined"
                          clearable
                          minDate={new Date('01/01/1900')}
                          maxDate={getMaxDate()}
                          disableFuture={true}
                          className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
                          onClick={() => setPickerStatus(true)}
                          onClose={() => setPickerStatus(false)}
                          open={pickerStatus}
                        />
                      </MuiPickersUtilsProvider>
                    </ThemeProvider>
                  </FormGroup>
                  <SignupCondition
                    legacyPageUserId={legacyPageUserId}
                    isArtist={isArtist}
                    isMember={isMember}
                    profileSelectedError={profileSelectedError}
                    termsSelected={termsSelected}
                    termsSelectedError={termsSelectedError}
                    handleArtistChange={handleArtistChange}
                    handleTermsSelectedChange={handleTermsSelectedChange}
                  />
                  {signupError ? <ErrorText>{t(`auth.serverResponses.errors.${signupError}`)}</ErrorText> : null}
                  {socialUserError ? (
                    <ErrorText>{t(`auth.serverResponses.errors.${socialUserError}`)}</ErrorText>
                  ) : null}
                  <Button
                    type="submit"
                    className="btn btn-primary"
                    disabled={
                      !(
                        isValid &&
                        dirty &&
                        !usernameValidFormError &&
                        !emailValidFormError &&
                        !termsSelectedError &&
                        !profileSelectedError
                      )
                    }
                  >
                    {t('auth.Sign_up')}
                  </Button>
                </CommonForm>
              </form>
              <BottomSpan>
                {t('auth.alreadySignedUp')} <a onClick={openLoginModal}>{t('auth.logInHere')}</a>
              </BottomSpan>
            </LoginContainer>
          </RightContainer>
        </Wrapper>
      </PageWrapper>
    </>
  )
}
SignUp.propTypes = {
  closeModal: PropTypes.func,
  snooze: PropTypes.bool,
}
