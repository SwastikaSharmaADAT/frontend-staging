import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Button from '../UI/Button'
import Input from '../UI/Input'
import { forgotPassword } from '../../modules/auth/authSlice'
import CloseIcon from '../UI/CloseIcon/CloseIcon'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100vw;
  @media (max-width: 500px) {
    width: 80vw;
  }
`

const Wrapper = styled.div`
  padding: 35px 37px;
  position: relative;
  max-width: 600px;
  width: 100%;
  margin: 0 auto;
  background: #fff;
  font-style: normal;
  font-weight: 400;
  min-height: 240px;
  @media (max-width: 767px) {
    padding: 20px 15px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    min-height: 220px;
  }
`

const LoginContainer = styled.div`
  width: 100%;
  .forgot-password-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
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
`

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('invalidEmail')
    .matches(
      /^(([^<>()[\]\\.,;:$^*\s@"]+(\.[^<>()[\]\\.,;:$^*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'invalidEmail'
    )
    .required('emailRequired'),
})

const ForgotPassword = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const forgetPassError = useSelector((state) => state.root.auth.forgetPassError)

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema,
    onSubmit(values) {
      const data = {
        ...values,
      }
      dispatch(forgotPassword(data))
    },
  })

  return (
    <>
      <PageWrapper>
        <Wrapper>
          <LoginContainer>
            <CloseIcon className="forgot-password-close" onclick={() => props.closeModal(false)} />
            <Heading>{t(`translation:forgotPassword.title`)}</Heading>
            <form onSubmit={handleSubmit}>
              <CommonForm>
                <FormGroup>
                  <Label>{t(`translation:forgotPassword.enterEmail`)}</Label>
                  {errors.email && touched.email ? (
                    <ErrorText>{t(`auth.validationErrs.${errors.email}`)}</ErrorText>
                  ) : null}
                  <Input
                    className="Inputauto"
                    type="email"
                    name="email"
                    placeholder={t('auth.placeholders.email')}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.email}
                    hasError={errors.email && touched.email}
                  />
                </FormGroup>
                {forgetPassError ? <ErrorText>{t(`auth.serverResponses.errors.${forgetPassError}`)}</ErrorText> : null}
                <Button className="Buttonauto" type="submit" disabled={!(isValid && dirty)}>
                  {t(`translation:forgotPassword.submit`)}
                </Button>
              </CommonForm>
            </form>
          </LoginContainer>
        </Wrapper>
      </PageWrapper>
    </>
  )
}
ForgotPassword.propTypes = {
  closeModal: PropTypes.func,
}
export default ForgotPassword
