import React, { useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import { checkUsername, checkEmail } from '../modules/auth/authSlice'
import { addNewPage, setAddPageSuccess } from '../modules/pages/pagesSlice'
import { debounceFunction } from '../utilities/debounceFunction'
import Button from './UI/Button'
import Input from './UI/Input'
import CreateBackground from './CreateBackground'
import Select from './UI/Select'
import CloseIcon from './UI/CloseIcon/CloseIcon'
import { event } from '../lib/gtag'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  min-height: 100vh;
  justify-content: center;
  @media (max-width: 991px) {
    max-width: 90vw;
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
  display: flex;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  min-height: 450px;
  @media (min-width: 768px) {
    display: flex;
    height: auto !important;
  }
  @media (max-width: 991px) {
    overflow-y: auto;
    min-height: 400px;
  }
  @media (max-width: 767px) {
    overflow-y: auto;
    min-width: 265px;
    min-height: 400px;
  }

  @media (max-width: 991px) and (orientation: landscape) {
    width: 60vw;
    min-height: 100%;
    height: 80vh !important;
  }
  .create-page-close {
    position: absolute;
    right: 10px;
    top: 10px;
  }
`

const LoginCon = styled.div`
  padding: 37px 35px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  @media (max-width: 550px) {
    padding: 37px 20px;
  }
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    padding: 20px;
  }
  form {
    @media (max-width: 991px) and (orientation: landscape) {
      overflow-y: scroll;
      max-height: 60vh;
    }
  }
`
const Heading = styled.h1`
  padding: 0;
  margin: 0;
  color: #fff;
  line-height: normal;
  font-size: 24px;
  text-align: left;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
`

const FormGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
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
  min-height: 450px;
  max-width: calc(100% - 203px);
  @media (max-width: 767px) {
    max-width: inherit;
    width: 100%;
    min-height: auto;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-width: 100%;
    min-height: auto;
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

const validationSchema = Yup.object().shape({
  email: Yup.string()
    .email('invalidEmail')
    .matches(
      /^(([^<>()[\]\\.,;:$^*\s@"]+(\.[^<>()[\]\\.,;:$^*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'invalidEmail'
    )
    .required('emailRequired'),
  name: Yup.string().required('instituteNameRequired'),
  type: Yup.string().required('instituteTypeRequired'),
  username: Yup.string()
    .matches(/^[A-Za-z0-9_]+$/, 'usernameConditions')
    .min(3, 'usernameTooShort')
    .required('usernameRequired'),
})

const CreatePage = ({ modalState, closeModal }) => {
  const dispatch = useDispatch()
  const usernameValidFormError = useSelector((state) => state.root.auth.usernameValidFormError)
  const emailValidFormError = useSelector((state) => state.root.auth.emailValidFormError)
  const addPageError = useSelector((state) => state.root.pages.addPageError)
  const addPageSuccess = useSelector((state) => state.root.pages.addPageSuccess)

  const { t } = useTranslation(['translation', 'successResponses'])

  useEffect(() => {
    if (addPageSuccess && modalState) {
      dispatch(setAddPageSuccess(false))
      closeModal()
    }
  }, [addPageSuccess, modalState, dispatch, closeModal])

  const { handleSubmit, handleChange, handleBlur, values, errors, touched } = useFormik({
    initialValues: {
      email: '',
      name: '',
      type: '',
      username: '',
    },
    validationSchema,
    onSubmit(values) {
      event({ action: 'click', category: 'page', label: 'create page', value: 1 })
      dispatch(addNewPage(values, t))
    },
  })

  /** Debounced versions of check username and check email methods */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCheckUsername = useCallback(debounceFunction(checkUsernameApi, 750), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCheckEmail = useCallback(debounceFunction(checkEmailApi, 1000), [])

  /**Method to dispatch check username api */
  function checkUsernameApi(val) {
    dispatch(checkUsername(val))
  }

  /**Method to dispatch check email api */
  function checkEmailApi(val) {
    dispatch(checkEmail(val))
  }

  /**Method to handle on change of username field */
  const userNameChange = (event) => {
    handleChange(event)
    if (event.target.value !== '') {
      debounceCheckUsername(event.target.value)
    }
  }

  /**Method to handle on change of email field */
  const emailChange = (event) => {
    handleChange(event)
    if (event.target.value !== '' && !(errors.email && touched.email)) {
      debounceCheckEmail(event.target.value)
    }
  }

  return (
    <>
      <PageWrapper>
        <Wrapper>
          <CreateBackground></CreateBackground>
          <RightContainer>
            <HeadingContainer>
              <CloseIcon className="create-page-close" onclick={() => closeModal(false)} />
              <Heading>{t('createPage.title')}</Heading>
            </HeadingContainer>
            <LoginCon>
              <form onSubmit={handleSubmit}>
                <CommonForm>
                  <FormGroup>
                    {errors.type && touched.type ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.type}`)}</ErrorText>
                    ) : null}
                    <Select
                      name="type"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.type}
                      values={values.type}
                      hasError={errors.type && touched.type}
                    >
                      <option value="" selected disabled>
                        {t('createPage.institutionType.title')}
                      </option>
                      <option value="gallery">{t('createPage.institutionType.gallery')}</option>
                      <option value="university">{t('createPage.institutionType.university')}</option>
                      <option value="museum">{t('createPage.institutionType.museum')}</option>
                      <option value="company">{t('createPage.institutionType.company')}</option>
                    </Select>
                  </FormGroup>
                  <FormGroup>
                    {errors.name && touched.name ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.name}`)}</ErrorText>
                    ) : null}
                    <Input
                      type="text"
                      name="name"
                      placeholder={t('createPage.institutionName')}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.name}
                      hasError={errors.name && touched.name}
                    />
                  </FormGroup>
                  <FormGroup>
                    {errors.email && touched.email ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.email}`)}</ErrorText>
                    ) : null}
                    {emailValidFormError ? (
                      <ErrorText>{t(`auth.serverResponses.errors.${emailValidFormError}`)}</ErrorText>
                    ) : null}
                    <Input
                      type="email"
                      name="email"
                      placeholder={t('createPage.officialEmail')}
                      onChange={emailChange}
                      onBlur={handleBlur}
                      values={values.email}
                      hasError={(errors.email && touched.email) || emailValidFormError}
                    />
                  </FormGroup>
                  <FormGroup>
                    {errors.username && touched.username ? (
                      <ErrorText>{t(`auth.validationErrs.${errors.username}`)}</ErrorText>
                    ) : null}
                    {usernameValidFormError ? (
                      <ErrorText>{t(`auth.serverResponses.errors.${usernameValidFormError}`)}</ErrorText>
                    ) : null}
                    <Input
                      type="text"
                      name="username"
                      placeholder={t('createPage.username')}
                      onChange={userNameChange}
                      onBlur={handleBlur}
                      values={values.username}
                      hasError={(errors.username && touched.username) || usernameValidFormError}
                    />
                  </FormGroup>
                  {addPageError ? <ErrorText>{t(`auth.serverResponses.errors.${addPageError}`)}</ErrorText> : null}
                  <Button type="submit" className="btn btn-primary">
                    {t('createPage.create')}
                  </Button>
                </CommonForm>
              </form>
            </LoginCon>
          </RightContainer>
        </Wrapper>
      </PageWrapper>
    </>
  )
}

CreatePage.propTypes = {
  modalState: PropTypes.bool,
  closeModal: PropTypes.func,
}

export default CreatePage
