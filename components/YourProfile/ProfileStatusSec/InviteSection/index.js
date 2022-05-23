import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { getNotices, deleteNotice } from '../../../../modules/profile/myProfileSlice'
import SingleNotice from '../SingleNotice'
import Button from '../../../UI/Button'
import { useRouter } from 'next/router'

const InviteContainer = styled.div`
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
  border: 5px dashed #ddd;
  p {
    line-height: 1.7;
    color: #666;
  }
  @media (min-width: 1025px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    padding: 20px 10px;
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
  max-width: 372px;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0 0 10px;
  }
`
const InviteButton = styled.button`
  font-weight: 100;
  font-size: 18px;
  line-height: 22px;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 7px 15px;
  cursor: pointer;
  display: flex;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`
const InviteSection = () => {
  const { t } = useTranslation(['profile','translation','successResponses', 'invite'])

  const dispatch = useDispatch()
  const notices = useSelector((state) => state.root.myProfile.notices)
  const userUUID = useSelector((state) => state.root.myProfile.userUUID)
  const emptyNoticesErr = useSelector((state) => state.root.myProfile.emptyNoticesErr)
  const router = useRouter();
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
      <InviteContainer>
        <SectionHeading>{t(`invite:followers`)}</SectionHeading>
        <p>{t(`invite:ctaText`)}</p>
        <InviteButton onClick={() => router.push('/invite')}>{t(`invite:seeMoreButtonLabel`)}</InviteButton>
      </InviteContainer>
    </>
  )
}

export default InviteSection
