import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { getNotices, deleteNotice } from '../../../../modules/profile/myProfileSlice'
import SingleNotice from '../SingleNotice'

const NoticeContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 5px dashed #ddd;
  @media (min-width: 1025px) {
    max-width: 48%;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0 16px;
    padding: 20px 10px;
    &.emptyNotices {
      display: none;
    }
  }
  .DefaultMsg {
    line-height: 1.7;
    color: #666;
  }
`
const SectionHeading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0 0 15px;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0 0 10px;
  }
`
const NoticeSection = () => {
  const { t } = useTranslation(['profile','translation','successResponses'])

  const dispatch = useDispatch()
  const notices = useSelector((state) => state.root.myProfile.notices)
  const userUUID = useSelector((state) => state.root.myProfile.userUUID)
  const emptyNoticesErr = useSelector((state) => state.root.myProfile.emptyNoticesErr)

  useEffect(() => {
    if (userUUID) {
      dispatch(getNotices())
    }
  }, [userUUID, dispatch])

  const handleDelete = (id) => {
    dispatch(deleteNotice(id,t))
  }

  return (
    <>
      <NoticeContainer className={!notices || (notices && notices.length === 0) || emptyNoticesErr ? 'emptyNotices' : ''}>
        <SectionHeading>{t(`notices.title`)}</SectionHeading>
        {notices ? (
          <>
            {notices.length > 0 ? (
              <>
                {notices.map((notice, index) => (
                  <SingleNotice key={notice._id} notice={notice} handleDelete={handleDelete} index={index} />
                ))}
              </>
            ) : (
              <span className="DefaultMsg"> {t(`notices.notNoticesFound`)}</span>
            )}
          </>
        ) : null}
        {emptyNoticesErr ? <span className="DefaultMsg">{t(`notices.notNoticesFound`)}</span> : null}
      </NoticeContainer>
    </>
  )
}

export default NoticeSection
