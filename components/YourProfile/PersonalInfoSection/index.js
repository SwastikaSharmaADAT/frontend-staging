import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../../../modules/profile/myProfileSlice'
import { checkPageUser } from '../../../utilities/otherProfile'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import SectionEditContact from './SectionEditContact'
import { useTranslation } from 'next-i18next'

const PersonalInfoWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const PersonalInfoSection = (props) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['successResponses', 'translation'])
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const myProfile = useSelector((state) => state.root.myProfile)
  const isEditingProfile = useSelector((state) => state.root.myProfile.isEditingProfile)
  const [saveState, setSaveState] = useState(false)
  const [dobErr, setDobErr] = useState(false)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const updateData = (data, isValid, visibilityData) => {
    if ((isValid && data.dob) || checkPageUser(userDataState.userRole)) {
      setDobErr(false)
      const relationShip = data.maritalStatus
      delete data.maritalStatus
      const newObj = { ...data, relationShip }
      if (!checkPageUser(userDataState.userRole)) {
        newObj.dob = newObj.dob && newObj.dob.toString()
      }
      let objToSend = {
        city: {
          value: newObj.city,
          visibility: 'public', // By default public visibility always
        },
        profession: {
          value: newObj.profession,
          visibility: visibilityData.profession,
        },
        country: {
          value: newObj.country,
          visibility: 'public', // By default public visibility always
        },
        company: {
          value: newObj.company,
          visibility: visibilityData.company,
        },
        industry: {
          value: newObj.industry,
          visibility: visibilityData.industry,
        },
        languages: {
          value: newObj.languages,
          visibility: visibilityData.languages,
        },
        website: {
          value: newObj.website,
          visibility: visibilityData.website,
        },
      }
      if (!checkPageUser(userDataState.userRole)) {
        objToSend = {
          ...objToSend,
          dob: {
            value: newObj.dob,
            visibility: visibilityData.dob,
          },
          gender: {
            value: newObj.gender,
            visibility: visibilityData.gender,
          },
          relationShip: {
            value: newObj.relationShip,
            visibility: visibilityData.maritalStatus,
          },
        }
      }
      const info = {
        section: 'personal',
        sectionData: objToSend,
      }
      dispatch(editProfile(info, 'personal', '', '', '', t))
    } else if (!data.dob) {
      setDobErr(true)
      props.scrollToDob()
    }
    setSaveState(false)
  }

  const enableSave = () => {
    setSaveState(true)
  }

  const setDobError = (val) => {
    if (val) {
      props.scrollToDob()
    }
    setDobErr(val)
  }

  return (
    <>
      {showSection(myProfile, 'personalInfo') ? (
        <div ref={props.refObject.PersonalInfoSectionRef} id="personalInfo">
          <PersonalInfoWrap ref={props.refProp} className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader enableSave={enableSave} userData={userDataState} setDobError={setDobError} />
            {isEditingProfile ? (
              <SectionEditContact
                userData={userDataState}
                updateData={updateData}
                saveState={saveState}
                dobErr={dobErr}
                setDobError={setDobError}
                dobRef={props.dobRef}
                scrollToDob={props.scrollToDob}
              />
            ) : (
              <SectionContent userData={userDataState} />
            )}
          </PersonalInfoWrap>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

PersonalInfoSection.propTypes = {
  refProp: PropTypes.object,
  dobRef: PropTypes.object,
  scrollToDob: PropTypes.func,
  refObject: PropTypes.object,
}

export default PersonalInfoSection
