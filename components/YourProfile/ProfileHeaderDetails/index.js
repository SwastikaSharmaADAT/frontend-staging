import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { editProfile, followUnfollow, addConnection, blockUser } from '../../../modules/profile/myProfileSlice'
import ProfileHeaderButtons from '../ProfileHeaderButtons'
import ModalComponent from '../../UI/Modal'
import FollowersPopup from '../FollowersPopup'
import FollowingPopup from '../FollowingPopup'
import ConnectionsPopup from '../ConnectionsPopup'
import useTranslateContent from '../../../hooks/useTranslateContent'
import renderPremiumBatch from '../../../utilities/renderPremiumBatch'
import ProfileShortDetails from './ProfileShortDetails'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

const ProfileHeaderDetailsWrap = styled.div`
  width: calc(100% - 155px);
  position: relative;
  @media (max-width: 767px) {
    margin: 15px 0 0;
    width: 100%;
  }
`
const TopWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1199px) {
    flex-direction: column;
  }
  @media (max-width: 767px) {
    margin: 0 0 15px;
    width: 100%;
    flex-direction: column;
  }
  &.TopNewPage {
    @media (max-width: 1199px) {
      flex-direction: row;
    }
    @media (max-width: 767px) {
      flex-direction: column;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      flex-direction: row;
      justify-content: flex-start;
      button {
        font-size: 16px;
        padding: 0 10px;
        margin-top: 3px;
        min-height: 40px;
      }
    }
  }
`

const ProfileName = styled.div`
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 29px;
  margin: 0 10px 0 0;
  display: flex;
  align-items: center;
  color: #222;
  img {
    padding-left: 5px;
    width: 20px;
    height: 20px;
  }
`
const StatusCircle = styled.div`
  width: 10px;
  height: 10px;
  background: ${(props) => (props.color ? props.color : '#666666')};
  margin: 0 0 0 10px;
  border-radius: 50%;
`

const BottomWrap = styled.div`
  width: 100%;
  position: relative;
`

const CommonForm = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0px;
  @media (min-width: 768px) and (max-width: 1024px) {
    flex-direction: row;
    justify-content: space-between;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    margin-bottom: 0px;
    flex-direction: row;
    justify-content: space-between;
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
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 48%;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-width: 48%;
  }
  &.TopNewPageInput {
    @media (min-width: 768px) and (max-width: 1024px) {
      max-width: 100%;
      margin-top: 8px;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      max-width: 100%;
      margin-top: 4px;
      margin-right: 10px;
    }
    @media (max-width: 767px) and (orientation: landscape) {
      max-width: 100%;
      margin-top: 8px;
      margin-right: 10px;
    }
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
    @media (max-width: 767px) {
      font-size: 14px;
      line-height: normal;
      margin: 0;
    }
    img {
      margin: 0 5px;
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

const DefaultName = styled.p`
  color: #666666;
  margin: 0;
  font-weight: 100;
  font-size: 20px;
  font-style: normal;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`

const validationSchema = Yup.object().shape({
  firstName: Yup.string().required('firstNameRequired'),
  lastName: Yup.string().required('lastNameRequired'),
})

const pageValidationSchema = Yup.object().shape({
  firstName: Yup.string().required('instituteNameRequired'),
})

const ProfileHeaderDetails = (props) => {
  const { t } = useTranslation(['profile', 'successResponses', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const isEditingHeader = useSelector((state) => state.root.myProfile.isEditingHeader)

  const [bioValue, setBioValue] = useState(props.userData && props.userData.bio ? props.userData.bio : '')
  const [bioCharCount, setBioCharCount] = useState(props.userData && props.userData.bio ? props.userData.bio.length : 0)
  const [showFollowers, setShowFollowers] = useState(false)
  const [showFollowing, setShowFollowing] = useState(false)
  const [showConnections, setShowConnections] = useState(false)
  const [moreMenu, setMoreMenu] = useState(false)

  const checkArtist = () => {
    if (props.userData) {
      if (props.userData.userRole === 'member') {
        return false
      } else if (props.userData.userRole === 'artist') {
        return true
      }
    } else {
      return false
    }
  }

  const [isArtist, setIsArtist] = useState(props.userData ? checkArtist() : false)

  let initialValues = {
    firstName: props.userData && props.userData.firstName ? props.userData.firstName : '',
    lastName: props.userData && props.userData.lastName ? props.userData.lastName : '',
  }

  useEffect(() => {
    if (props.userData.bio !== bioValue) {
      setBioValue(props.userData.bio)
      if (props.userData.bio) {
        setBioCharCount(props.userData.bio.length)
      }
    }

    if (props.userData.userRole === 'member' && isArtist) {
      setIsArtist(false)
    } else if (props.userData.userRole === 'artist' && !isArtist) {
      setIsArtist(true)
    }

    if (props.userData.userRoleType === 'personal') {
      if (props.userData.firstName !== initialValues.firstName || props.userData.lastName !== initialValues.lastName) {
        initialValues.firstName = props.userData.firstName ? props.userData.firstName : ''
        initialValues.lastName = props.userData.lastName ? props.userData.lastName : ''
      }
    } else if (props.userData.userRoleType === 'page') {
      if (props.userData.firstName !== initialValues.firstName) {
        initialValues.firstName = props.userData.firstName ? props.userData.firstName : ''
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.userData])

  const handleCancelClick = () => {
    if (props.userData.bio !== bioValue) {
      setBioValue(props.userData.bio)
      if (props.userData.bio) {
        setBioCharCount(props.userData.bio.length)
      }
    }

    if (props.userData.userRole === 'member' && isArtist) {
      setIsArtist(false)
    } else if (props.userData.userRole === 'artist' && !isArtist) {
      setIsArtist(true)
    }

    if (props.userData.userRoleType === 'personal') {
      if (props.userData.firstName !== values.firstName || props.userData.lastName !== values.lastName) {
        setFieldValue('firstName', props.userData.firstName ? props.userData.firstName : '')
        setFieldValue('lastName', props.userData.lastName ? props.userData.lastName : '')
        setErrors({})
        setFieldTouched('firstName', false)
        setFieldTouched('lastName', false)
      } else if (props.userData.firstName === '' || props.userData.lastName === '') {
        setErrors({})
        setFieldTouched('firstName', false)
        setFieldTouched('lastName', false)
      }
    } else if (props.userData.userRoleType === 'page') {
      if (props.userData.firstName !== values.firstName) {
        setFieldValue('firstName', props.userData.firstName ? props.userData.firstName : '')
        setErrors({})
        setFieldTouched('firstName', false)
      } else if (props.userData.firstName === '') {
        setErrors({})
        setFieldTouched('firstName', false)
      }
    }
  }

  const bioOnChange = (e) => {
    const value = e.target.value
    const length = value.length
    setBioValue(value)
    setBioCharCount(length)
  }

  const handleArtistChange = (e) => {
    setIsArtist(e.target.checked)
  }

  const handleClickOutside = () => {
    setMoreMenu(false)
  }

  const toggleMoreMenu = () => {
    setMoreMenu(!moreMenu)
  }

  const redirectToConnections = () => {
    router.push(`/user/${props.userData.username}/connections`)
  }

  const { handleChange, handleBlur, values, errors, touched, validateForm, setFieldTouched, setFieldValue, setErrors } =
    useFormik({
      initialValues,
      enableReinitialize: true,
      validationSchema: props.userData.userRoleType === 'page' ? pageValidationSchema : validationSchema,
    })

  const updateData = () => {
    validateForm().then((res) => {
      if (Object.keys(res).length === 0) {
        // valid
        const aboutImages = props.userData.aboutMe && props.userData.aboutMe.images ? props.userData.aboutMe.images : []
        const data = {
          section: 'others',
          sectionData: {
            bio: bioValue,
            biography:
              props.userData.biography && props.userData.biography.description
                ? props.userData.biography.description
                : '',
            aboutMe:
              props.userData.aboutMe && props.userData.aboutMe.description ? props.userData.aboutMe.description : '',
            profileSwitchTo: isArtist ? 'artist' : 'member',
            images: aboutImages,
            biographyImages:
              props.userData.biography && props.userData.biography.images ? props.userData.biography.images : [],
            ...values,
          },
        }
        if (props.userData.userRoleType === 'page') {
          data.sectionData.profileSwitchTo = ''
        }
        dispatch(editProfile(data, 'head', '', '', '', t))
      } else {
        // invalid
        setFieldTouched('firstName', true)
        if (props.userData.userRoleType === 'personal') {
          setFieldTouched('lastName', true)
        }
      }
    })
  }

  const followUser = (toFollow, action, listType) => {
    dispatch(followUnfollow(toFollow, action, listType, true, '', t))
  }
  const unFollowUser = ( toUnFollow, action, listType ) => {
    dispatch(followUnfollow(toUnFollow, action, listType, true, '', t))
  }

  const addConnectionRequest = (e) => {
    e.stopPropagation()
    const userInfo = {
      username: props.userData.username,
    }
    dispatch(addConnection(userInfo, t))
    setMoreMenu(false)
  }

  const blockUserRequest = (e, type) => {
    e.stopPropagation()
    const userInfo = {
      username: props.userData.username,
      type: type,
    }
    dispatch(blockUser({ ...userInfo, t }, t))
    setMoreMenu(false)
  }

  const [fname, translateFName] = useState(props.userData && props.userData.firstName)
  const [lname, translateLName] = useState(props.userData && props.userData.lastName)

  useEffect(() => {
    if (!isEmptyObj(props.userData)) translateFName(props.userData && props.userData.firstName)
    translateLName(props.userData && props.userData.lastName)
  }, [props.userData])
  const renderName = () => {
    if (props.userData && props.userData.userRoleType === 'personal') {
      return (
        <>
          {props.userData && props.userData.firstName && props.userData.lastName ? (
            <>
              {fname ? <>{fname}</> : <>{props.userData && props.userData.firstName}</>}{' '}
              {lname ? <>{lname}</> : <>{props.userData && props.userData.lastName}</>}{' '}
              {renderPremiumBatch(props.userData.subscription)}
              {props.userData.isActive === 'true' ? <StatusCircle color="#3ead43" /> : <StatusCircle color="#666666" />}
            </>
          ) : props.userData && !props.userData.firstName && !props.userData.lastName ? (
            <>
              {props.userData.userIdentity === 'verifiedUser' ? (
                <DefaultName>{t(`profileHead.enterName`)}</DefaultName>
              ) : (
                <>
                  {props.userData.username ? (
                    <>
                      {props.userData.username}
                      {renderPremiumBatch(props.userData.subscription)}
                    </>
                  ) : null}
                </>
              )}
              {props.userData.isActive === 'true' ? <StatusCircle color="#3ead43" /> : <StatusCircle color="#666666" />}
            </>
          ) : null}
        </>
      )
    } else if (props.userData && props.userData.userRoleType === 'page') {
      return (
        <>
          {props.userData && props.userData.firstName ? (
            <>
              {fname ? <>{fname}</> : <>{props.userData && props.userData.firstName}</>}
              {props.userData.isActive === 'true' ? <StatusCircle color="#3ead43" /> : <StatusCircle color="#666666" />}
            </>
          ) : props.userData && !props.userData.firstName ? (
            <>
              {props.userData.userIdentity === 'verifiedUser' ? (
                <DefaultName>{t(`profileHead.enterInstitute`)}</DefaultName>
              ) : (
                <>{props.userData.username ? <>{props.userData.username}</> : null}</>
              )}
              {props.userData.isActive === 'true' ? <StatusCircle color="#3ead43" /> : <StatusCircle color="#666666" />}
            </>
          ) : null}
        </>
      )
    }
  }
  return (
    <>
      {showFollowers && (
        <ModalComponent closeOnOutsideClick={true} isOpen={showFollowers} closeModal={() => setShowFollowers(false)}>
          <FollowersPopup
            firstName={props.userData && props.userData.firstName ? props.userData.firstName : null}
            lastName={props.userData && props.userData.lastName ? props.userData.lastName : null}
            setShowFollowers={setShowFollowers}
          />
        </ModalComponent>
      )}
      {showFollowing && (
        <ModalComponent closeOnOutsideClick={true} isOpen={showFollowing} closeModal={() => setShowFollowing(false)}>
          <FollowingPopup
            firstName={props.userData && props.userData.firstName ? props.userData.firstName : null}
            lastName={props.userData && props.userData.lastName ? props.userData.lastName : null}
            setShowFollowing={setShowFollowing}
          />
        </ModalComponent>
      )}
      {showConnections && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={showConnections}
          closeModal={() => setShowConnections(false)}
        >
          <ConnectionsPopup
            firstName={props.userData && props.userData.firstName ? props.userData.firstName : null}
            lastName={props.userData && props.userData.lastName ? props.userData.lastName : null}
            setShowConnections={setShowConnections}
          />
        </ModalComponent>
      )}
      <ProfileHeaderDetailsWrap>
        <TopWrap className={props.userData.userRoleType === 'page' ? 'TopNewPage' : null}>
          {!isEditingHeader ? (
            <ProfileName> {renderName()}</ProfileName>
          ) : (
            <CommonForm>
              <CommonContent className={props.userData.userRoleType === 'page' ? 'TopNewPageInput' : null}>
                {/* <label>First Name:</label> */}
                <InputSelected
                  type="text"
                  name="firstName"
                  value={values.firstName}
                  placeholder={
                    props.userData.userRoleType === 'page'
                      ? t(`profileHead.placeholderInstitureName`)
                      : t(`profileHead.placeholderFirstName`)
                  }
                  onChange={handleChange}
                  onBlur={handleBlur}
                  values={values.firstName}
                />
                {errors.firstName && touched.firstName ? (
                  <ErrorText>{t(`translation:auth.validationErrs.${errors.firstName}`)}</ErrorText>
                ) : null}
              </CommonContent>
              {props.userData.userRoleType === 'personal' && (
                <CommonContent>
                  <InputSelected
                    type="text"
                    name="lastName"
                    value={values.lastName}
                    placeholder={t(`profileHead.placeholderLastName`)}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    values={values.lastName}
                  />
                  {errors.lastName && touched.lastName ? (
                    <ErrorText>{t(`translation:auth.validationErrs.${errors.lastName}`)}</ErrorText>
                  ) : null}
                </CommonContent>
              )}
            </CommonForm>
          )}
          <ProfileHeaderButtons
            userData={props.userData}
            isArtist={isArtist}
            handleArtistChange={handleArtistChange}
            updateData={updateData}
            handleCancelClick={handleCancelClick}
            handleClickOutside={handleClickOutside}
            menuState={moreMenu}
            toggleMenu={toggleMoreMenu}
            followUser={followUser}
            unFollowUser={unFollowUser}
            addConnectionRequest={addConnectionRequest}
            blockUserRequest={blockUserRequest}
            scrollToBlurred={props.scrollToBlurred}
            closeMoreMenu={() => setMoreMenu(false)}
          />
        </TopWrap>
        <BottomWrap>
          <ProfileShortDetails
            userData={props.userData}
            bioOnChange={bioOnChange}
            bioCharCount={bioCharCount}
            bioValue={bioValue}
            setShowFollowers={setShowFollowers}
            setShowFollowing={setShowFollowing}
            setShowConnections={setShowConnections}
            scrollToBlurred={props.scrollToBlurred}
            redirectToConnections={() => redirectToConnections()}
          />
        </BottomWrap>
      </ProfileHeaderDetailsWrap>
    </>
  )
}

ProfileHeaderDetails.propTypes = {
  userData: PropTypes.object,
  scrollToBlurred: PropTypes.func,
}

export default ProfileHeaderDetails
