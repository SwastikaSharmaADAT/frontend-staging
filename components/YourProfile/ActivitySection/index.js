import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { getUserActivities } from '../../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import SectionHeader from '../SeeAllAddSectionHeader'
import { addPost } from '../../../modules/newsFeed/newsFeedSlice'
import ModalComponent from '../../UI/Modal'
import AddPostPopup from '../../NewsFeed/AddPostPopup'
import showSection from '../../../utilities/showSection'
import SectionContent from './SectionContent'

const AboutSectionWrap = styled.div`
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

const ActivitySection = (props) => {
  const { t } = useTranslation(['profile','successResponses','translation','errorResponses'])

  const dispatch = useDispatch()  
  const router = useRouter()
  const { username } = router.query
  const userActivities = useSelector((state) => state.root.myProfile.userActivities)
  const myProfile = useSelector((state) => state.root.myProfile)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const [addPostModal, setAddPostModal] = useState(false)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [editType, setEditType] = useState('')
  const [editData, setEditData] = useState('')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  
  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if (isLoginToken() && username) {
      dispatch(getUserActivities(username))
    }
  }, [dispatch, username])

  const addHandler = async ({ info, postImgObj }) => {
    dispatch(addPost({ info: info, type: 'profile', username: username, postImgObj: postImgObj },t))
    setAddPostModal(false)
  }

  const seeAllHandler = () => {
    if ( loggedInUsername === username ) {
      router.push(`/user/${username}/activity?activityType=posts`)
    } else {
      router.push(`/user/${username}/activity`)
    }
    
  }

  const closeEditPost=()=>{
    setEditType('')
    setEditData('')
    setAddPostModal(false)
  }

  return (
    <>
      {showSection(myProfile, 'activity') ? (
        <div ref={props.refObject.ActivitySectionRef} id="activity">
          <ModalComponent closeOnOutsideClick={true} isOpen={addPostModal} closeModal={closeEditPost}>
            <AddPostPopup setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} setModal={setAddPostModal} addPostHandler={addHandler} />
          </ModalComponent>
          <AboutSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader
              heading={t(`profile:activity.title`)}
              userData={userDataState}
              addHandler={addHandler}
              seeAllHandler={seeAllHandler}
              setModal={setAddPostModal}
              hideSeeAllBtn={userActivities && userActivities.length === 0 ? true : false}
            />
            <SectionContent setAddPostModal={setAddPostModal} setEditData={setEditData} editData={editData} editType={editType} setEditType={setEditType} userActivities={userActivities} />
          </AboutSectionWrap>
        </div>
      ) : (
        <></>
      )}
    </>

  )
}
ActivitySection.propTypes = {
  refProp: PropTypes.object,
  ActivitySectionRef:PropTypes.object,
  refObject:PropTypes.object,
}
export default ActivitySection
