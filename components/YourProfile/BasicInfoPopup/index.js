import React, { useCallback } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Select from 'react-select'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { datePickerTheme } from '../../../utilities/datePickerTheme'
import { getMaxDate } from '../../../utilities/convertDate'
import Button from '../../UI/Button'
import ButtonLight from '../../UI/ButtonLight'
import Modal from '../../UI/Modal'
import { editProfile } from '../../../modules/profile/myProfileSlice'
import { checkEmail } from '../../../modules/auth/authSlice'
import { debounceFunction } from '../../../utilities/debounceFunction'
import { countriesData } from '../../../utilities/countriesList'

const PageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 400px;
  width: 100vw;
  @media (max-width: 500px) {
    width: 90vw;
  }
`

const Wrapper = styled.div`
  padding: 25px 25px 50px;
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
    overflow-y: auto;
    height: calc(100vh - 150px);
    min-height: inherit;
  }
`

const LoginContainer = styled.div`
  width: 100%;
`
const Heading = styled.h1`
  margin: 0 0 15px;
  padding: 0;
  color: #222;
  line-height: normal;
  font-size: 18px;
  text-align: left;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  @media (max-width: 991px) and (orientation: landscape) {
    margin: 0 0 10px;
  }
  @media (max-width: 767px) {
    margin: 0 0 10px;
  }
`

const CommonForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  @media (max-width: 991px) and (orientation: landscape) {
    margin-bottom: 0px;
  }
  @media (max-width: 767px) {
    margin-bottom: 0px;
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

const CommonContent = styled.div`
  display: flex;
  max-width: 100%;
  width: 100%;
  flex-direction: column;
  margin: 0 0 15px;
  label {
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #222222;
    padding: 0 0 13px 0;
    margin: 0;
    font-family: 'Montserrat-Regular';
    display: flex;
    align-items: center;
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
      margin: 0;
    }
    img {
      margin: 0 5px;
    }
  }
  &.BottomSocialCont {
    max-width: fit-content;
    margin: 0 15px 15px 0;
    svg,
    img {
      font-size: 21px;
      margin: 0 11px 0 0;
    }
  }
  select {
    height: 40px;
    color: #222;
  }

  &.LastColumn {
    margin: 0 auto 20px;
  }
  .CustomBoxSelect {
    :hover,
    :focus {
    }
    svg {
      display: none;
    }
  }
  .css-1pahdxg-control {
    border: 2px solid #eee;
    border-radius: 0;
    box-shadow: none;
    :hover,
    :focus {
      box-shadow: none;
    }
  }
  fieldset {
    box-shadow: none;
    border: 0;
  }
  .MuiOutlinedInput-root.MuiInputBase-formControl {
    border-radius: 0;
    border: 2px solid #eee;
    outline: 0;
    box-shadow: none;
    font-size: 14px;
    padding-right: 0 !important;
    color: #222;
    font-family: 'Montserrat-Regular';
    font-weight: 400;
    font-size: 16px;
    padding: 0;
    height: 40px;
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
`

const InputSelected = styled.input`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  color: #222222;
  padding: 0 10px;
  margin: 0;
  font-family: 'Montserrat-Regular';
  height: 36px;
  border: 2px solid #eeeeee;
  outline: none;
  &:hover,
  &:focus {
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .Buttonauto {
    max-width: 48%;
  }
  .m-top-8 {
    margin-top: 8px;
  }
`

// eslint-disable-next-line no-unused-vars
const dropdownIndicatorStyles = (base, state) => {
  let changes = {
    background: `url('/assets/select_arrow.png') no-repeat center center`,
    width: '30px',
  }
  return Object.assign(base, changes)
}

const customStyles = {
  control: () => ({
    border: '2px solid #eee',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    minHeight: '36px',
  }),
  dropdownIndicator: dropdownIndicatorStyles,
}

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('firstNameRequired'),
  lastName: Yup.string().required('lastNameRequired'),
  dob: Yup.date('invalidDob').nullable().min(new Date('01/01/1900')).max(getMaxDate()).required('dobRequired'),
})

const legacyUserValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('firstNameRequired'),
  lastName: Yup.string().required('lastNameRequired'),
  email: Yup.string()
    .email('invalidEmail')
    .matches(
      /^(([^<>()[\]\\.,;:$^*\s@"]+(\.[^<>()[\]\\.,;:$^*\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'invalidEmail'
    )
    .required('emailRequired'),
  dob: Yup.date('invalidDob').nullable().min(new Date('01/01/1900')).max(getMaxDate()).required('dobRequired'),
})

const BasicInfoPopup = (props) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { t } = useTranslation(['profile', 'successResponses', 'translation'])
  const countries = countriesData(t)

  const basicInfoErr = useSelector((state) => state.root.myProfile.basicInfoErr)
  const emailValidFormError = useSelector((state) => state.root.auth.emailValidFormError)

  const initialValues = {
    firstName: props.userData && props.userData.firstName ? props.userData.firstName : '',
    lastName: props.userData && props.userData.lastName ? props.userData.lastName : '',
    city: props.userData && props.userData.city && props.userData.city.value ? props.userData.city.value : '',
    country:
      props.userData && props.userData.country && props.userData.country.value ? props.userData.country.value : '',
    dob: props.userData && props.userData.dob && props.userData.dob.value ? props.userData.dob.value : null,
  }

  const filledInitialValues = {
    firstName: props.userData && props.userData.firstName ? props.userData.firstName : '',
    lastName: props.userData && props.userData.lastName ? props.userData.lastName : '',
    city: props.userData && props.userData.city && props.userData.city.value ? props.userData.city.value : '',
    country:
      props.userData && props.userData.country && props.userData.country.value ? props.userData.country.value : '',
    dob: props.userData && props.userData.dob && props.userData.dob.value ? props.userData.dob.value : null,
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    touched,
    isValid,
    dirty,
    setFieldValue,
    setFieldTouched,
  } = useFormik({
    enableReinitialize: true,
    initialValues: props.legacyEmail ? { ...filledInitialValues, email: '' } : initialValues,
    validationSchema: props.legacyEmail ? legacyUserValidationSchema : validationSchema,
    onSubmit(values) {
      const roleName = props.userData && props.userData.userRole;
      const isSocial = props.userData && (JSON.parse(props.userData.viaFacebook) || JSON.parse(props.userData.viaFacebook));
      if (isSocial) {
        router.push({
          pathname: router.pathname,
          query: {...router.query, new_registration: 'true', role: 'um_' + roleName},
        })
      }
      const data = {
        ...values,
        city: {
          value: values.city,
          visibility: 'public',
        },
        country: {
          value: values.country,
          visibility: 'public',
        },
        dob: {
          value: values.dob,
          visibility: 'private',
        },
      }
      if (props.legacyEmail) {
        data.email = {
          value: values.email,
          visibility: 'public',
        }
      }
      const info = {
        section: 'initial',
        sectionData: data,
      }
      dispatch(editProfile(info, 'basicInfo', '', '', '', t))
    },
  })

  const handleCountryChange = (name, item) => {
    setFieldValue(name, item.value)
  }
  /** Debounced version of check email method */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCheckEmail = useCallback(debounceFunction(checkEmailApi, 1000), [])

  /**Method to dispatch check email api */
  function checkEmailApi(val) {
    dispatch(checkEmail(val))
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
      <Modal closeOnOutsideClick={false} isOpen={props.open} closeModal={props.closeModal}>
        <PageWrapper>
          <Wrapper>
            <LoginContainer>
              <Heading>{t(`basicInfo.fillDetailsText`)}</Heading>
              <form onSubmit={handleSubmit}>
                <CommonForm>
                  {props.legacyEmail && (
                    <CommonContent>
                      <InputSelected
                        type="email"
                        name="email"
                        value={values.email}
                        values={values.email}
                        onChange={emailChange}
                        onBlur={handleBlur}
                        placeholder={t(`profile:basicInfo.placeholderEmail`)}
                      />
                      {errors.email && touched.email ? (
                        <ErrorText>{t(`translation:auth.validationErrs.${errors.email}`)}</ErrorText>
                      ) : null}
                      {!(errors.email && touched.email) && emailValidFormError ? (
                        <ErrorText>{t(`translation:auth.serverResponses.errors.${emailValidFormError}`)}</ErrorText>
                      ) : null}
                    </CommonContent>
                  )}

                  <CommonContent>
                    <InputSelected
                      type="text"
                      name="firstName"
                      value={values.firstName}
                      placeholder={t(`basicInfo.placeholderFirstName`)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.firstName}
                    />
                    {errors.firstName && touched.firstName ? (
                      <ErrorText>{t(`translation:auth.validationErrs.${errors.firstName}`)}</ErrorText>
                    ) : null}
                  </CommonContent>
                  <CommonContent>
                    <InputSelected
                      type="text"
                      name="lastName"
                      value={values.lastName}
                      placeholder={t(`basicInfo.placeholderLastName`)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.lastName}
                    />
                    {errors.lastName && touched.lastName ? (
                      <ErrorText>{t(`translation:auth.validationErrs.${errors.lastName}`)}</ErrorText>
                    ) : null}
                  </CommonContent>
                  <CommonContent>
                    <ThemeProvider theme={datePickerTheme}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
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
                        />
                      </MuiPickersUtilsProvider>
                    </ThemeProvider>
                    {errors.dob && touched.dob ? (
                      <ErrorText>{t(`translation:auth.validationErrs.${errors.dob}`)}</ErrorText>
                    ) : null}
                  </CommonContent>
                  <CommonContent>
                    <InputSelected
                      type="text"
                      name="city"
                      value={values.city}
                      placeholder={t(`basicInfo.placeholderCity`)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.city}
                    />
                  </CommonContent>
                  <CommonContent>
                    <Select
                      className="CustomBoxSelect"
                      styles={customStyles}
                      name="country"
                      options={countries}
                      components={{
                        IndicatorSeparator: () => null,
                      }}
                      placeholder={t(`basicInfo.placeholderCountry`)}
                      onBlur={() => setFieldTouched('country', true)}
                      value={countries ? countries.find((item) => item.value === values.country) : ''}
                      onChange={(item) => handleCountryChange('country', item)}
                      maxMenuHeight={110}
                    />
                  </CommonContent>
                  {basicInfoErr ? <ErrorText>{t(`auth.serverResponses.errors.${basicInfoErr}`)}</ErrorText> : null}
                  <ButtonWrapper>
                    <Button className="Buttonauto" type="submit" disabled={!(isValid && dirty && !emailValidFormError)}>
                      {t(`basicInfo.save`)}
                    </Button>
                    <ButtonLight
                      className="Buttonauto m-top-8"
                      onClick={props.closeModal}
                      label={t(`basicInfo.cancel`)}
                    ></ButtonLight>
                  </ButtonWrapper>
                </CommonForm>
              </form>
            </LoginContainer>
          </Wrapper>
        </PageWrapper>
      </Modal>
    </>
  )
}

BasicInfoPopup.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  legacyEmail: PropTypes.bool,
  userData: PropTypes.object,
}

export default BasicInfoPopup
