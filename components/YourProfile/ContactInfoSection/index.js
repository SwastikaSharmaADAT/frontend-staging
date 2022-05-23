import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { editProfile } from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
//import MessagePopup from '../MessagePopup'
import showSection from '../../../utilities/showSection'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'
import SectionEditContact from './SectionEditContact'
import { useTranslation } from 'next-i18next'


const ContactInfoWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px;
  justify-content: space-between;
  &.blurred {
    align-items: center;
    justify-content: center;
    -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
    -khtml-user-select: none; /* Konqueror HTML */
    -moz-user-select: none; /* Old versions of Firefox */
    -ms-user-select: none; /* Internet Explorer/Edge */
    user-select: none; /* Non-prefixed version, currently */
  }
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

const BlurSection = styled.div`
  width: 100%;
  position: relative;
  filter: blur(5px);
  overflow: hidden;
  pointer-events: none;
`

const ContactInfoSection = (props) => {
  const dispatch = useDispatch()
  const {t} =useTranslation(['successResponses','translation'])
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const isEditingContact = useSelector((state) => state.root.myProfile.isEditingContact)
  const myProfile = useSelector((state) => state.root.myProfile)
  const [saveState, setSaveState] = useState(false)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const updateData = (data, isValid, visibilityData) => {
    if (isValid) {
      const objToSend = {
        email: {
          value: data.email,
          visibility: visibilityData.email,
        },
        skype: {
          value: data.skype,
          visibility: visibilityData.skype,
        },
        mobile: {
          value: data.mobile,
          visibility: visibilityData.mobile,
        },
        linkedin: {
          value: data.linkedin,
          visibility: visibilityData.allSocialMedia,
        },
        facebook: {
          value: data.facebook,
          visibility: visibilityData.allSocialMedia,
        },
        youtube: {
          value: data.youtube,
          visibility: visibilityData.allSocialMedia,
        },
        instagram: {
          value: data.instagram,
          visibility: visibilityData.allSocialMedia,
        },
        twitter: {
          value: data.twitter,
          visibility: visibilityData.allSocialMedia,
        },
        vkontakte: {
          value: data.vkontakte,
          visibility: visibilityData.allSocialMedia,
        },
        address: {
          value: data.address,
          visibility: 'public',
        },
        openingHours: {
          value: data.openingHours,
          visibility: 'public',
        },
      }
      const info = {
        section: 'contact',
        sectionData: objToSend,
      }
      dispatch(editProfile(info, 'contact','','','',t))
    }
    setSaveState(false)
  }

  const enableSave = () => {
    setSaveState(true)
  }

  const renderContactInfo = () => (
    <>
      <SectionHeader enableSave={enableSave} userData={userDataState} />
      {isEditingContact ? (
        <SectionEditContact userData={userDataState} updateData={updateData} saveState={saveState} />
      ) : (
        <SectionContent userData={userDataState} />
      )}
    </>
  )

  return (
    <>
      {showSection(myProfile, 'contact') ? (
        <div ref={props.refObject.ContactInfoSectionRef} id="contactInfo">
          {!isEmptyObj(userDataState) && userDataState.userIdentity === 'guestUser' ? (
            <>
              <ContactInfoWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content blurred' : 'blurred'} ref={props.refProp}>
                {/* <MessagePopup className="singleUserProf"/> */}
                <BlurSection>{renderContactInfo()}</BlurSection>
              </ContactInfoWrap>
            </>
          ) : (
            <ContactInfoWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''} ref={props.refProp}>{renderContactInfo()}</ContactInfoWrap>
          )}
        </div>

      ) : (
        <></>
      )}
    </>
  )
}

ContactInfoSection.propTypes = {
  refProp: PropTypes.object,
  refObject: PropTypes.object,
  ContactInfoSectionRef:PropTypes.object,
}

export default ContactInfoSection
