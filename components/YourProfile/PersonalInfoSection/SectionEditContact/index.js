import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { FiChevronDown } from 'react-icons/fi'
import { FaNetworkWired } from 'react-icons/fa'
import Tooltip from '@material-ui/core/Tooltip'
import Select from 'react-select'
// import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles'
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers'
import { RiGroup2Fill } from 'react-icons/ri'
import { BsLockFill } from 'react-icons/bs'
import { datePickerTheme } from '../../../../utilities/datePickerTheme'
import SelectStyled from '../../../UI/Select'
import { customMultiSelectStyles } from '../../../UI/shared/styles'
import { countriesData } from '../../../../utilities/countriesList'
import { languagesData } from '../../../../utilities/languagesList'
import { getMaxDate } from '../../../../utilities/convertDate'
import VisibilityMenu from '../../VisibilityMenu'
import { TooltipContent } from '../../../../utilities/tooltipContent'
import { checkPageUser } from '../../../../utilities/otherProfile'
import { getValuesToPrefill, getVisibilityToPrefill } from '../../../../utilities/getProfileValues'
import useTranslateArray from '../../../../hooks/useTranslateArray'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
`

const ContactTopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  width: 100%;
  margin: 20px 0 0;
  flex-wrap: wrap;
  @media (max-width: 767px) {
    flex-direction: row;
  }
  &.BottomSocialDiv {
    justify-content: flex-start;
    flex-wrap: wrap;
    margin: 20px 0 0;
    flex-direction: row;
  }
  .mt {
    @media (max-width: 767px) {
      margin-top: -10px;
    }
  }
`
const CommonContent = styled.div`
  display: flex;
  max-width: 238px;
  width: 100%;
  flex-direction: column;
  margin: 0 0 25px;
  @media (min-width: 1025px) and (max-width: 1259px) {
    max-width: 48%;
  }
  @media (max-width: 991px) {
    margin: 0 0 15px;
    max-width: 32%;
  }
  @media (max-width: 767px) {
    max-width: 48%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
  }
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
    position: relative;
    .connections-logo {
      margin: 0 5px;
      display: flex;
      align-items: center;
      height: 18px;
      justify-content: center;
      font-size: 19px;
      color: #666;
    }
    div.menu-wrapper {
      cursor: pointer;
      display: flex;
    }
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

const HeadingDivider = styled.div`
  color: #aaa;
  width: 100%;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 14px;
  margin: 30px 0 30px;
  text-align: center;
  ::before {
    display: inline-block;
    content: '';
    border-top: 1px solid #eee;
    width: 100%;
    margin: 0;
    -webkit-transform: translateY(-1rem);
    -ms-transform: translateY(-1rem);
    transform: translateY(-1rem);
    position: absolute;
    top: 25px;
    left: 0;
  }
  @media (max-width: 767px) {
    margin: 15px 0;
  }
  span {
    background: #fff;
    position: relative;
    padding: 0 5px;
  }
`

const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: normal;
  display: flex;
  align-items: center;
  padding-bottom: 5px;
`

const pageUserValidationSchema = Yup.object().shape({
  website: Yup.string().url('invalidUrl'),
})

const validationSchema = Yup.object().shape({
  website: Yup.string().url('invalidUrl'),
  dob: Yup.date('invalidDob').min(new Date('01/01/1900')).max(getMaxDate()).required('dobRequired'),
})

const SectionEditContact = (props) => {
  const { t } = useTranslation(['profile', 'translation'])

  const [menuState, setMenuState] = useState({
    city: false,
    profession: false,
    country: false,
    company: false,
    industry: false,
    languages: false,
    website: false,
    dob: false,
    gender: false,
    maritalStatus: false,
  })

  const [visibilityValue, setVisibilityValue] = useState({
    // city: getVisibilityToPrefill(props.userData, 'city', 'public'),
    city: 'public',
    profession: getVisibilityToPrefill(props.userData, 'profession', 'public'),
    // country: getVisibilityToPrefill(props.userData, 'country', 'public'),
    country: 'public',
    company: getVisibilityToPrefill(props.userData, 'company', 'public'),
    industry: getVisibilityToPrefill(props.userData, 'industry', 'public'),
    languages: getVisibilityToPrefill(props.userData, 'languages', 'public'),
    website: getVisibilityToPrefill(props.userData, 'website', 'public'),
    dob: getVisibilityToPrefill(props.userData, 'dob', 'private'),
    gender: getVisibilityToPrefill(props.userData, 'gender', 'private'),
    maritalStatus: getVisibilityToPrefill(props.userData, 'maritalStatus', 'private'),
  })

  const handleClickOutside = (field) => {
    let newStateObj = { ...menuState }
    newStateObj[field] = false
    setMenuState(newStateObj)
  }

  const toggleVisibilityMenu = (field) => {
    let newStateObj = { ...menuState }
    newStateObj[field] = !menuState[field]
    setMenuState(newStateObj)
  }

  const handleVisibilityChange = (e, field, value) => {
    e.stopPropagation()
    let visibilityStateObj = { ...visibilityValue }
    visibilityStateObj[field] = value
    setVisibilityValue(visibilityStateObj)

    let menuStateObj = { ...menuState }
    menuStateObj[field] = false
    setMenuState(menuStateObj)
  }

  const renderIcon = (visibility) => {
    if (visibility === 'public') {
      return (
        <div className="connections-logo">
          <RiGroup2Fill />
        </div>
      )
    } else if (visibility === 'private') {
      return (
        <div className="connections-logo">
          <BsLockFill />
        </div>
      )
    } else if (visibility === 'connections') {
      return (
        <div className="connections-logo">
          <FaNetworkWired />
        </div>
      )
    }
  }

  const initialValues = {
    city: getValuesToPrefill(props.userData, 'city'),
    profession: getValuesToPrefill(props.userData, 'profession'),
    company: getValuesToPrefill(props.userData, 'company'),
    industry: getValuesToPrefill(props.userData, 'industry'),
    website: getValuesToPrefill(props.userData, 'website'),
    gender: getValuesToPrefill(props.userData, 'gender'),
    maritalStatus: getValuesToPrefill(props.userData, 'maritalStatus'),
    country: getValuesToPrefill(props.userData, 'country'),
    languages: getValuesToPrefill(props.userData, 'languages'),
    dob: getValuesToPrefill(props.userData, 'dob'),
  }

  const { handleChange, handleBlur, values, errors, touched, isValid, setFieldValue, setFieldTouched } = useFormik({
    initialValues,
    validationSchema: checkPageUser(props.userData.userRole) ? pageUserValidationSchema : validationSchema,
  })
  useEffect(() => {
    if (props.saveState) {
      // props.updateData(values, isValid, initialValues)
      props.updateData(values, isValid, visibilityValue)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.saveState])

  const handleCountryChange = (name, item) => {
    setFieldValue(name, item.value)
  }

  const handleLanguagesChange = (name, item) => {
    setFieldValue(name, item ? item.map((option) => option.value) : [])
  }

  const handleDateChange = (val) => {
    if (val === null || val === undefined) {
      props.setDobError(true)
      props.scrollToDob()
    } else {
      props.setDobError(false)
    }
    setFieldValue('dob', val)
  }
  const [languagesArr, translateLanguagesArr] = useTranslateArray(languagesData, 'label')
  useEffect(() => {
    translateLanguagesArr(languagesData, 'label')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateLanguagesArr, languagesData.length])
  const countries = countriesData(t)
  return (
    <>
      <SectionContentWrap>
        <ContactTopWrap>
          <CommonContent>
            <label>
              {t(`personalInfo.city`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.city]}>
                {renderIcon(visibilityValue.city)}
              </Tooltip>{' '}
              {/* <FiChevronDown /> */}
              {/* <div onClick={() => toggleVisibilityMenu('city')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.city && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="city"
                    value={visibilityValue.city}
                  />
                )}
              </div> */}
            </label>
            <InputSelected
              type="text"
              name="city"
              value={values.city}
              placeholder={t(`personalInfo.placeholderCity`)}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.city}
            />
          </CommonContent>
          <CommonContent>
            <label>
              {t(`personalInfo.country`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.country]}>
                {renderIcon(visibilityValue.country)}
              </Tooltip>{' '}
              {/* <FiChevronDown /> */}
              {/* <div onClick={() => toggleVisibilityMenu('country')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.country && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="country"
                    value={visibilityValue.country}
                  />
                )}
              </div> */}
            </label>
            <Select
              className="CustomBoxSelect"
              styles={customMultiSelectStyles}
              name="country"
              options={countries}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder={t(`personalInfo.placeholderCountry`)}
              onBlur={() => setFieldTouched('country', true)}
              value={countries ? countries.find((item) => item.value === values.country) : ''}
              onChange={(item) => handleCountryChange('country', item)}
            />
          </CommonContent>
          {props.userData.userRole === 'member' ? (
            <CommonContent>
              <label>
                {t(`personalInfo.profession`)}:
                <Tooltip
                  arrow
                  disableFocusListener
                  enterTouchDelay={0}
                  title={TooltipContent[visibilityValue.profession]}
                >
                  {renderIcon(visibilityValue.profession)}
                </Tooltip>{' '}
                <div onClick={() => toggleVisibilityMenu('profession')} className="menu-wrapper">
                  <FiChevronDown />
                  {menuState.profession && (
                    <VisibilityMenu
                      handleClickOutside={handleClickOutside}
                      handleVisibilityChange={handleVisibilityChange}
                      fieldName="profession"
                      value={visibilityValue.profession}
                    />
                  )}
                </div>
              </label>
              <InputSelected
                type="text"
                name="profession"
                value={values.profession}
                placeholder={t(`personalInfo.placeholderProfession`)}
                onChange={handleChange}
                onBlur={handleBlur}
                values={values.profession}
              />
            </CommonContent>
          ) : null}
          <CommonContent>
            <label>
              {t(`personalInfo.company`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.company]}>
                {renderIcon(visibilityValue.company)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('company')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.company && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="company"
                    value={visibilityValue.company}
                  />
                )}
              </div>
            </label>
            <InputSelected
              type="text"
              name="company"
              value={values.company}
              placeholder={t(`personalInfo.placeholderCompany`)}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.company}
            />
          </CommonContent>
          <CommonContent>
            <label>
              {t(`personalInfo.industry`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.industry]}>
                {renderIcon(visibilityValue.industry)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('industry')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.industry && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="industry"
                    value={visibilityValue.industry}
                  />
                )}
              </div>
            </label>
            <InputSelected
              type="text"
              name="industry"
              value={values.industry}
              placeholder={t(`personalInfo.placeholderIndustry`)}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.industry}
            />
          </CommonContent>
          <CommonContent>
            <label>
              {t(`personalInfo.languages`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.languages]}>
                {renderIcon(visibilityValue.languages)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('languages')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.languages && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="languages"
                    value={visibilityValue.languages}
                  />
                )}
              </div>
            </label>
            <Select
              className="CustomBoxSelect"
              styles={customMultiSelectStyles}
              name="languages"
              options={languagesArr}
              components={{
                IndicatorSeparator: () => null,
                ClearIndicator: null,
              }}
              placeholder={t(`personalInfo.placeholderLanguages`)}
              onBlur={() => setFieldTouched('languages', true)}
              isMulti={true}
              value={languagesArr ? languagesArr.filter((item) => values.languages.indexOf(item.value) >= 0) : []}
              onChange={(item) => handleLanguagesChange('languages', item)}
            />
          </CommonContent>
          <CommonContent className={props.userData.userRole === 'member' ? 'LastColumn' : null}>
            <label>
              {t(`personalInfo.website`)}:
              <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.website]}>
                {renderIcon(visibilityValue.website)}
              </Tooltip>{' '}
              <div onClick={() => toggleVisibilityMenu('website')} className="menu-wrapper">
                <FiChevronDown />
                {menuState.website && (
                  <VisibilityMenu
                    handleClickOutside={handleClickOutside}
                    handleVisibilityChange={handleVisibilityChange}
                    fieldName="website"
                    value={visibilityValue.website}
                  />
                )}
              </div>
            </label>
            <InputSelected
              type="text"
              name="website"
              value={values.website}
              placeholder={t(`personalInfo.placeholderWebsite`)}
              onChange={handleChange}
              onBlur={handleBlur}
              values={values.website}
            />
            {errors.website && touched.website ? (
              <ErrorText>{t(`translation:auth.validationErrs.${errors.website}`)}</ErrorText>
            ) : null}
          </CommonContent>
        </ContactTopWrap>

        {!checkPageUser(props.userData.userRole) && (
          <>
            <HeadingDivider ref={props.dobRef}>
              <span>{t(`personalInfo.visibleInfo`)}</span>
            </HeadingDivider>

            <ContactTopWrap>
              <CommonContent>
                <label>
                  {t(`personalInfo.dateOfBirth`)}:
                  <Tooltip arrow disableFocusListener enterTouchDelay={0} title={TooltipContent[visibilityValue.dob]}>
                    {renderIcon(visibilityValue.dob)}
                  </Tooltip>{' '}
                  <div onClick={() => toggleVisibilityMenu('dob')} className="menu-wrapper">
                    <FiChevronDown />
                    {menuState.dob && (
                      <VisibilityMenu
                        handleClickOutside={handleClickOutside}
                        handleVisibilityChange={handleVisibilityChange}
                        fieldName="dob"
                        value={visibilityValue.dob}
                      />
                    )}
                  </div>
                </label>
                <ThemeProvider theme={datePickerTheme}>
                  <MuiPickersUtilsProvider utils={DateFnsUtils}>
                    <KeyboardDatePicker
                      id="date-picker-dialog"
                      format="MM/dd/yyyy"
                      placeholder={t(`personalInfo.placeholderDob`)}
                      name="dob"
                      value={values.dob}
                      onBlur={handleBlur}
                      onChange={handleDateChange}
                      KeyboardButtonProps={{
                        'aria-label': 'change date',
                      }}
                      inputVariant="outlined"
                      autoComplete="off"
                      // InputProps={{ readOnly: true }}
                      clearable
                      minDate={new Date('01/01/1900')}
                      maxDate={getMaxDate()}
                      maxDateMessage="Date filled should be minimum 16 years back"
                      disableFuture={true}
                    />
                  </MuiPickersUtilsProvider>
                </ThemeProvider>
                {/* {errors.dob && touched.dob ? <ErrorText>{t(`auth.validationErrs.${errors.dob}`)}</ErrorText> : null} */}
                {props.dobErr ? <ErrorText>{t(`personalInfo.errorDob`)} </ErrorText> : null}
              </CommonContent>
              <CommonContent>
                <label>
                  {t(`personalInfo.gender`)}:
                  <Tooltip
                    arrow
                    disableFocusListener
                    enterTouchDelay={0}
                    title={TooltipContent[visibilityValue.gender]}
                  >
                    {renderIcon(visibilityValue.gender)}
                  </Tooltip>{' '}
                  <div onClick={() => toggleVisibilityMenu('gender')} className="menu-wrapper">
                    <FiChevronDown />
                    {menuState.gender && (
                      <VisibilityMenu
                        handleClickOutside={handleClickOutside}
                        handleVisibilityChange={handleVisibilityChange}
                        fieldName="gender"
                        value={visibilityValue.gender}
                      />
                    )}
                  </div>
                </label>
                <SelectStyled
                  name="gender"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.gender}
                  values={values.gender}
                >
                  <option value="" selected disabled>
                    {t(`personalInfo.genderDropdown.option1`)}
                  </option>
                  <option value="male">{t(`personalInfo.genderDropdown.option2`)}</option>
                  <option value="female">{t(`personalInfo.genderDropdown.option3`)}</option>
                  <option value="diverse">{t(`personalInfo.genderDropdown.option4`)}</option>
                </SelectStyled>
              </CommonContent>
              <CommonContent className="mt">
                <label>
                  {t(`personalInfo.relationshipStatus`)}:
                  <Tooltip
                    arrow
                    disableFocusListener
                    enterTouchDelay={0}
                    title={TooltipContent[visibilityValue.maritalStatus]}
                  >
                    {renderIcon(visibilityValue.maritalStatus)}
                  </Tooltip>{' '}
                  <div onClick={() => toggleVisibilityMenu('maritalStatus')} className="menu-wrapper">
                    <FiChevronDown />
                    {menuState.maritalStatus && (
                      <VisibilityMenu
                        handleClickOutside={handleClickOutside}
                        handleVisibilityChange={handleVisibilityChange}
                        fieldName="maritalStatus"
                        value={visibilityValue.maritalStatus}
                      />
                    )}
                  </div>
                </label>
                <SelectStyled
                  name="maritalStatus"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.maritalStatus}
                  values={values.maritalStatus}
                >
                  <option value="" selected disabled>
                    {t(`personalInfo.relationDropdown.option1`)}
                  </option>
                  <option value="single">{t(`personalInfo.relationDropdown.option2`)}</option>
                  <option value="married">{t(`personalInfo.relationDropdown.option3`)}</option>
                  <option value="partnership">{t(`personalInfo.relationDropdown.option4`)}</option>
                </SelectStyled>
              </CommonContent>
            </ContactTopWrap>
          </>
        )}
      </SectionContentWrap>
    </>
  )
}

SectionEditContact.propTypes = {
  updateData: PropTypes.func,
  saveState: PropTypes.bool,
  userData: PropTypes.object,
  dobErr: PropTypes.bool,
  setDobError: PropTypes.func,
  dobRef: PropTypes.object,
  scrollToDob: PropTypes.func,
}

export default SectionEditContact
