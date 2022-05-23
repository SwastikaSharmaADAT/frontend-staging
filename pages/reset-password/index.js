import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Button from '../../components/UI/Button'
import Input from '../../components/UI/Input'
import { toggleLoading, resetPassword, setLoginPopup, verifyToken, setForgetPassPopup } from '../../modules/auth/authSlice'
import { notifySuccess } from '../../modules/profile/myProfileSlice'
import { useRouter } from 'next/router'
import staticFilesArray from '../../utilities/staticFilesArray'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  // min-height: 100vh;
  justify-content: center;
  @media (max-width: 500px) {
    padding: 20px;
  }
  @media (min-width: 1025px) {
    min-height: calc(100vh - 178px);
  }
`

const Wrapper = styled.div`
  padding: 35px 37px;
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 30px auto 0;
  background: #fff;
  font-style: normal;
  font-weight: 400;
  display: flex;
  margin: auto;
  text-align: center;
  @media (max-width: 767px) {
    padding: 15px;
    margin: 0 auto;
  }
`

const LoginContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
`
const Heading = styled.h1`
  margin: 0 0 30px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 24px;
  text-align: left;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  @media (max-width: 767px) {
    font-size: 18px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    font-size: 18px;
  }
`
const FormGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  .Inputauto {
    width: auto;
  }
`

const CommonForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  .Buttonauto {
    max-width: 200px;
  }
`

const Label = styled.label`
  font-weight: 400;
  margin: 0 0 10px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 18px;
  text-align: left;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
  &.token-expire{
    margin: 0 auto;
    font-size: 16px;
  }
  .underline{
    text-decoration: underline;
    cursor: pointer;
  }
`

const validationSchema = Yup.object().shape({
  password: Yup.string()
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^?&*])(?=.{8,})/, 'passwordConditions')
    .matches(/^(?=.*)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$/, 'passwordConditions')
    .required('passwordRequired'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'passwordsMustMatch')
    .required('confirmPasswordRequired'),
})

const ChangePassword = () => {

  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('translation')

  let query = router.query
  const resetPassState = useSelector((state) => state.root.auth.resetPass)
  const resetPassError = useSelector((state) => state.root.auth.resetPassError)

  const [tokenStatus,setTokenStatus] = useState('init')


  useEffect(()=>{
    const checkToken=async()=>{
    const response = await dispatch(verifyToken({t, data:{token:query['token']}}))
    setTokenStatus(response ? 'active' : 'expire')
    }
    if(query['token'])
    checkToken()
  },[query['token']])

  useEffect(() => {
    if (resetPassState) {
      dispatch(toggleLoading(false))
      router.push('/')
      notifySuccess(t(`auth.serverResponses.success.passwordResetSuccess`))
      dispatch(setLoginPopup(true))
      return
    }
  }, [dispatch, router, resetPassState, t])

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit(values) {
      if (query['token']) {
        const data = {
          password: values.password,
          token: query['token'],
        }
        dispatch(resetPassword(data))
      }
    },
  })
  const OpenResetModal=()=>{
    dispatch(setForgetPassPopup(true))
  }
  return (
    <>
      <PageWrapper>
      {tokenStatus === 'active' ? 
        <Wrapper>
            <LoginContainer>
              <Heading>{t(`changePassword.resetPass`)}</Heading>
              <form onSubmit={handleSubmit}>
                <CommonForm>
                  <FormGroup>
                    <Label>{t(`changePassword.enterNewPass`)}</Label>
                    {errors.password && touched.password ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.password}`)}</ErrorText>
                    ) : null}
                    <Input
                      className="Inputauto"
                      type="password"
                      name="password"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.password}
                      hasError={errors.password && touched.password}
                    />
                  </FormGroup>
                  <FormGroup>
                    <Label>{t(`changePassword.confirmNewPass`)}</Label>
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.confirmPassword}`)}</ErrorText>
                    ) : null}
                    <Input
                      className="Inputauto"
                      type="password"
                      name="confirmPassword"
                      placeholder=""
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.confirmPassword}
                      hasError={errors.confirmPassword && touched.confirmPassword}
                    />
                  </FormGroup>
                  {resetPassError ? <ErrorText>{t(`auth.serverResponses.errors.${resetPassError}`)}</ErrorText> : null}
                  <Button className="Buttonauto" type="submit" disabled={!(isValid && dirty)}>
                    {t(`changePassword.submit`)}
                  </Button>
                </CommonForm>
              </form>
            </LoginContainer>
        </Wrapper>
          : tokenStatus==='expire' ? 
          <Wrapper>
            <LoginContainer>
              <ErrorText className="token-expire" >
              <span>{t(`auth.serverResponses.errors.resetTokenExpired`)} &nbsp;</span>
              <span onClick={OpenResetModal} className="underline" >{t(`auth.serverResponses.errors.forgotPassword`)}</span>
              </ErrorText>
            </LoginContainer>
          </Wrapper>
          : <></>}
      </PageWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default ChangePassword
