import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { upperCase } from 'lodash'
import { useTranslation } from 'next-i18next'
import { getGroupUsers } from '../../../modules/groups/groupsSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import ModalComponent from '../../UI/Modal'
import ListingsPopup from '../ListingsPopup'

const ProfileConnectionsWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 20px 17px;
  margin: 0 auto 16px;
  text-align: left;
`

const ProfileName = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  color: #222222;
  padding: 0;
  margin: 0 0 15px;
`

const ConnectionsUl = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const ConnectionsLi = styled.div`
  width: 28px;
  height: 28px;
  margin: 0 4px 4px 0;

  p {
    cursor: pointer;
  }
  a {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  &.see-all {
    width: auto;
    height: auto;
    margin: 0;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #222;
    padding: 0 10px;
  }
  img {
    width: 28px;
    height: 28px;
  }
`
/**
 *
 * @returns group members listing to be displayed on group page
 */
const GroupMembers = () => {
  const { t } = useTranslation(['groupsFeed', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  const params = router.query

  useEffect(() => {
    /** call the API to fetch users of the current page */
    if (params.groupId) {
      const offset=0
      const limit=10
      dispatch(getGroupUsers({ info: { groupId: params.groupId,offset,limit }, t }))
    }
  }, [dispatch, params.groupId])

  /**state hook to toggle popup */
  const [groupMemberModal, setGroupMemberModal] = useState(false)

  /** get group members and info from redux */
  const groupMembers = useSelector((state) => state.root.groups.currentPageGroupMembers)
  const groupInfo = useSelector((state) => state.root.groups.groupInfo)
  return (
    <>
      <ModalComponent
        className="group-member-modal"
        isOpen={groupMemberModal}
        closeModal={() => {
          setGroupMemberModal(false)
        }}
        closeOnOutsideClick={true}
      >
        <ListingsPopup title={t(`memberSection.title`)} closeModal={setGroupMemberModal} groupMembers={groupMembers} />
      </ModalComponent>
      <ProfileConnectionsWrap>
        <ProfileName>
          {groupInfo && upperCase(groupInfo.title)} {t(`memberSection.members`)} (
          {groupMembers ? groupMembers.length : 0}):
        </ProfileName>
        <ConnectionsUl>
          {groupMembers.slice(0, 12).map((member) => (
            <ConnectionsLi key={member.user._id}>
              <a onClick={() => router.push(`/user/${member.user.username}`)}>
                <img
                  src={
                    member.user.profilePicUrl
                      ? createResizeImageUrl(member.user.profilePicUrl, 50, 50, 'profileCover')
                      : '/assets/artmo-default.png'
                  }
                  onError={(e) => {
                    imageErrorHandler(
                      e,
                      createImageUrl(member.user.profilePicUrl),
                      '/assets/artmo-default.png',
                      'profileCover',
                      ''
                    )
                  }}
                  title={`${
                    member && member.user && member.user.firstName && member.user.lastName
                      ? member.user.firstName + ' ' + member.user.lastName
                      : member.user.username
                  }`}
                  alt="groupMemberImg"
                />
              </a>
            </ConnectionsLi>
          ))}
          <ConnectionsLi className="see-all">
            <p className="see-all" onClick={() => setGroupMemberModal(true)}>
              {t(`memberSection.seeAll`)}
            </p>
          </ConnectionsLi>
        </ConnectionsUl>
      </ProfileConnectionsWrap>
    </>
  )
}

export default GroupMembers
