import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useDispatch, useSelector } from 'react-redux'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { IoCameraSharp } from 'react-icons/io5'
import Select from 'react-select'
import Button from '../../UI/Button'
import Modal from '../../UI/Modal'
import UploadPhotoModal from '../../YourProfile/UploadPhotoModal'
import { editProfile, uploadPhoto } from '../../../modules/profile/myProfileSlice'
import { countriesData } from '../../../utilities/countriesList'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import {
  createImageUrl,
  createResizeImageUrl,
  imageErrorHandler,
  uploadImageToMediaLibrary,
} from '../../../utilities/imageUtils'


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
  font-size: 24px;
  text-align: center;
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

const UploadImage = styled.div`
  max-width: 398px;
  width: 100%;
  height: 150px;
  position: relative;
  margin: 15px auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 3px dashed #eeeeee;
  font-size: 14px;
  cursor: pointer;
  box-sizing: border-box;
  &.removeBorder {
    border: 0;
    cursor: auto;
  }
  svg {
    color: #aaa;
    font-size: 62px;
    @media (max-width: 479px) {
      font-size: 24px;
    }
  }
  img {
    max-height: 150px;
  }
`

const ImgWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 5px;
  span {
    margin-top: -10px;
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
  profilePicUrl: Yup.string().required('profileImageRequired'),
  city: Yup.string().required('cityRequired'),
  country: Yup.string().required('countryRequired'),
  mobile: Yup.string()
    .matches(
      /^(\+{0,})(\d{0,})([(]{1}\d{1,3}[)]{0,}){0,}(\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}(\s){0,}$/gm,
      'invalidPhone'
    )
    .required('phoneRequired'),
})

const ProfileCompletionPopup = (props) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['dashboard','successResponses','translation'])

  const countries = countriesData(t)

  const [openUploadModal, setUploadModal] = useState(false)
  const [photoVal, setPhotoVal] = useState(null)

  const userData = useSelector((state) => state.root.myProfile.userData)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)

  const closeModal = () => {
    setPhotoVal(null)
    setUploadModal(false)
  }

  const handleOnChange = (data) => {
    setPhotoVal(data)
  }

  const applyHandler = async () => {
    if (photoVal) {
      let image = photoVal.result
      fetch(image)
        .then((res) => res.blob())
        .then(async (blob) => {
          uploadImageToMediaLibrary(blob, photoVal.filename)
          const formD = new FormData()
          formD.append('imageType', 'profile')
          formD.append('image', blob, photoVal.filename)
          const responseObj = await dispatch(uploadPhoto(formD, 'profile', true,t))
          closeModal()
          if (!isEmptyObj(responseObj)) {
            setFieldValue('profilePicUrl', responseObj.profilePicUrl)
            setFieldValue('dateUpdated', responseObj.dateUpdated)
          }
        })
    }
  }

  const initialValues = {
    profilePicUrl: !isEmptyObj(userData) && userData.profilePicUrl ? userData.profilePicUrl : '',
    mobile: !isEmptyObj(userData) && userData.mobile && userData.mobile.value ? userData.mobile.value : '',
    city: !isEmptyObj(userData) && userData.city && userData.city.value ? userData.city.value : '',
    country: !isEmptyObj(userData) && userData.country && userData.country.value ? userData.country.value : '',
    dateUpdated: !isEmptyObj(userData) && userData.dateUpdated ? userData.dateUpdated : '',
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
    initialValues,
    validationSchema,
    onSubmit(values) {
      const personalObj = {
        city: {
          value: values.city,
          visibility: 'public',
        },
        country: {
          value: values.country,
          visibility: 'public',
        },
        mobile: {
          value: values.mobile,
          visibility: userData && userData.mobile && userData.mobile.visibility,
        },
      }
      const personalInfo = {
        section: 'dashboardPopup',
        sectionData: personalObj,
      }

      const profilePicObj = {
        profilePicUrl: values.profilePicUrl,
        dateUpdated: values.dateUpdated,
      }

      const editProfileResponse = dispatch(editProfile(personalInfo, 'dashboardPopup', false, profilePicObj,'',t))
      editProfileResponse.then((response) => {
        if (response === 'success') {
          props.closeModal()
          router.push('?vmstep=thankyou&membership_type=' + subscription.title + '&user_role=' + userData.userRole)
        }
      })
    },
  })

  const handleCountryChange = (name, item) => {
    setFieldValue(name, item.value)
  }

  return (
    <>
      <UploadPhotoModal
        open={openUploadModal}
        closeModal={closeModal}
        type="profile"
        action="Upload"
        value={photoVal}
        onChange={handleOnChange}
        isCover={false}
        applyHandler={applyHandler}
      />
      <Modal closeOnOutsideClick={false} isOpen={props.open} closeModal={props.closeModal}>
        <PageWrapper>
          <Wrapper>
            <LoginContainer>
              <Heading>{t(`profileCompletionPopup.title`)}</Heading>
              <form onSubmit={handleSubmit}>
                <ImgWrapper>
                  <UploadImage
                    className={values.profilePicUrl ? 'removeBorder' : null}
                    onClick={() => !values.profilePicUrl && setUploadModal(true)}
                  >
                    {values.profilePicUrl ? (
                      <img
                        src={
                          createResizeImageUrl(values.profilePicUrl, 150, 150, 'profileCover') +
                        '?' +
                        new Date(values.dateUpdated).getTime()
                        }
                        onError={(e) => {
                          const timeSuffix = '?' + new Date(values.dateUpdated).getTime()
                          imageErrorHandler(
                            e,
                            createImageUrl(values.profilePicUrl),
                            '/assets/mo-fallback-image.png',
                            'profileCover',
                            timeSuffix
                          )
                        }}
                        alt=""
                      />
                    ) : (
                      <>
                        <IoCameraSharp />
                        {t(`profileCompletionPopup.addProfileImage`)}
                      </>
                    )}
                  </UploadImage>
                  {errors.profilePicUrl && touched.profilePicUrl ? (
                    <ErrorText>
                      {t(`profileCompletionPopup.validationErrors.${errors.profilePicUrl}`)}
                    </ErrorText>
                  ) : null}
                </ImgWrapper>
                <CommonForm>
                  <CommonContent>
                    <InputSelected
                      type="text"
                      name="mobile"
                      placeholder={t(`profileCompletionPopup.placeholder.phone`)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.mobile}
                      value={values.mobile}
                    />
                    {errors.mobile && touched.mobile ? (
                      <ErrorText>{t(`profileCompletionPopup.validationErrors.${errors.mobile}`)}</ErrorText>
                    ) : null}
                  </CommonContent>
                  <CommonContent>
                    <InputSelected
                      type="text"
                      name="city"
                      value={values.city}
                      placeholder={t(`profileCompletionPopup.placeholder.city`)}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      values={values.city}
                    />
                    {errors.city && touched.city ? (
                      <ErrorText>{t(`profileCompletionPopup.validationErrors.${errors.city}`)}</ErrorText>
                    ) : null}
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
                      placeholder={t(`profileCompletionPopup.placeholder.country`)}
                      onBlur={() => setFieldTouched('country', true)}
                      value={countries ? countries.find((item) => item.value === values.country) : ''}
                      onChange={(item) => handleCountryChange('country', item)}
                      maxMenuHeight={110}
                    />
                    {errors.country && touched.country ? (
                      <ErrorText>{t(`profileCompletionPopup.validationErrors.${errors.country}`)}</ErrorText>
                    ) : null}
                  </CommonContent>
                  <Button className="Buttonauto" type="submit" disabled={!(isValid && dirty)}>
                    {t(`profileCompletionPopup.startSellingArt`)}
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

ProfileCompletionPopup.propTypes = {
  closeModal: PropTypes.func,
  open: PropTypes.bool,
}

export default ProfileCompletionPopup