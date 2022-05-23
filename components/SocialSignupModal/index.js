import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Button from '../UI/Button'
import Input from '../UI/Input'
import Modal from '../UI/Modal'
import { socialSignup } from '../../modules/auth/authSlice'

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
    min-height: 200px;
  }
`

const LoginContainer = styled.div`
  width: 100%;
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
  @media (max-width: 991px) and (orientation: landscape) {
    font-size: 18px;
    margin: 0 0 10px;
  }
  @media (max-width: 767px) {
    font-size: 18px;
    margin: 0 0 10px;
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
  @media (max-width: 991px) and (orientation: landscape) {
    margin-bottom: 0px;
  }
  @media (max-width: 767px) {
    margin-bottom: 0px;
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
  username: Yup.string()
    .matches(/^[A-Za-z0-9_]+$/, 'usernameConditions')
    .required('usernameRequired'),
})

const SocialSignupModal = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  // const usernameValidFormError = useSelector((state) => state.root.auth.usernameValidFormError)
  const facebookData = useSelector((state) => state.root.auth.facebookData)
  const linkedinData = useSelector((state) => state.root.auth.linkedinData)
  const currentSocialType = useSelector((state) => state.root.auth.currentSocialType)
  const socialSignupError = useSelector((state) => state.root.auth.socialSignupError)

  const { handleSubmit, handleChange, handleBlur, values, errors, touched, isValid, dirty } = useFormik({
    initialValues: {
      username: '',
    },
    validationSchema,
    onSubmit(values) {
      const data = {
        username: values.username,
        roleType: 'member',
        socialType: currentSocialType,
      }
      if (currentSocialType === 'facebook') {
        data.email = facebookData.email
        data.token = facebookData.token
      } else if (currentSocialType === 'linkedIn') {
        data.email = linkedinData.email
        data.token = linkedinData.token
      }
      dispatch(socialSignup(data))
    },
  })

  // const userNameBlur = (event) => {
  //   handleBlur(event)
  //   if (event.target.value !== '') {
  //     dispatch(checkUsername(event.target.value))
  //   }
  // }

  return (
    <>
      <Modal closeOnOutsideClick={false} isOpen={props.open} closeModal={props.closeModal}>
        <PageWrapper>
          <Wrapper>
            <LoginContainer>
              <Heading>{t(`auth.socialSignup.chooseUsername`)}</Heading>
              <form onSubmit={handleSubmit}>
                <CommonForm>
                  <FormGroup>
                    <Label>{t(`auth.socialSignup.enterUsername`)}</Label>
                    {errors.username && touched.username ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.username}`)}</ErrorText>
                    ) : null}
                    {/* {usernameValidFormError ? (
                      <ErrorText>{t(`auth.serverResponses.errors.${usernameValidFormError}`)}</ErrorText>
                    ) : null} */}
                    <Input
                      className="Inputauto"
                      type="text"
                      name="username"
                      placeholder={t('auth.placeholders.username')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      // onBlur={userNameBlur}
                      values={values.username}
                      // hasError={(errors.username && touched.username) || usernameValidFormError}
                      hasError={errors.username && touched.username}
                    />
                  </FormGroup>
                  {socialSignupError ? (
                    <ErrorText>{t(`auth.serverResponses.errors.${socialSignupError}`)}</ErrorText>
                  ) : null}
                  {/* <Button className="Buttonauto" type="submit" disabled={!(isValid && dirty && !usernameValidFormError)}> */}
                  <Button className="Buttonauto" type="submit" disabled={!(isValid && dirty)}>
                  {t(`auth.socialSignup.submit`)}
                  </Button>
                </CommonForm>
              </form>
            </LoginContainer>
          </Wrapper>
        </PageWrapper>
      </Modal>
    </>
  )
}

SocialSignupModal.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}

export default SocialSignupModal
