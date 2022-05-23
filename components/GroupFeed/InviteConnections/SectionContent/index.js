import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { getInviteUserList, inviteConnection } from '../../../../modules/groups/groupsSlice'
import ModalComponent from '../../../UI/Modal'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import ListingsPopup from '../../ListingsPopup'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 15px 0 0;
  padding: 0;
  .all-invited {
    font-size: 14px;
    color: #969696;
    font-style: normal;
  }
`

const FollowingList = styled.div`
  position: relative;
  margin: 0 0 10px;
  padding: 0 0 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const FollowsWrap = styled.div`
  display: flex;
  font-family: 'Montserrat-Regular';
`

const FollowingThumb = styled.div`
  width: 35px;
  height: 35px;
  margin: 0 10px 0 0;
  a {
    cursor: pointer;
    img {
      width: 100%;
      height: 100%;
      max-height: 35px;
    }
  }
`
const FollowsNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  max-width: calc(100% - 45px);
  width: 100%;
`

const FollowsName = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0 0 3px 0;
  color: #222;
  font-weight: bold;
  cursor: pointer;
`

const FollowersCount = styled.div`
  font-style: normal;
  font-size: 12px;
  line-height: normal;
  margin: 0;
  color: #666;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`
const FollowButton = styled.button`
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #fff;
  background: #222222;
  width: auto;
  border: 0;
  padding: 4px 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-left: 5px;
  min-width: 60px;
  justify-content: center;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 12px;
    padding: 4px 10px;
  }
`
const FollowedButton = styled.button`
  font-weight: bold;
  font-size: 12px;
  line-height: 18px;
  text-align: center;
  color: #222;
  background: #eee;
  width: auto;
  border: 0;
  padding: 4px 10px;
  display: flex;
  align-items: center;
  margin-left: 5px;
  min-width: 60px;
  justify-content: center;
  :hover,
  :focus {
    outline: 0;
    border: 0;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 12px;
    padding: 4px 10px;
  }
`

const SectionContent = ({ inviteSectionModal, setInviteSectionModal }) => {
  const { t } = useTranslation(['groupsFeed', 'translation', 'successResponses'])

  const dispatch = useDispatch()
  const router = useRouter()
  const params = router.query

  useEffect(() => {
    const limit=10
    const offset=0
    /** call the API to fetch connections of logged in user */
    dispatch(getInviteUserList({ info: { groupId: params.groupId, limit, offset }, t }))
  }, [dispatch, params.groupId])

  /**get group info and suggestion list from redux */
  const groupInfo = useSelector((state) => state.root.groups.groupInfo)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const listLoader = useSelector((state) => state.root.groups.inviteUsersListLoading)
  let inviteUserList = useSelector((state) => state.root.groups.inviteUserList)
  inviteUserList = inviteUserList.filter((user) => !user.reqSent && !user.reqSent)

  /** handles click event for invite button in listing */
  const inviteHandler = (userId) => {
    dispatch(inviteConnection({ userId, groupId: params.groupId, t: t }))
  }
  return (
    <>
      {inviteUserList && inviteUserList.length > 0 ? (
        <SectionContentWrap>
          {inviteUserList &&
            inviteUserList.length > 0 &&
            inviteUserList.slice(0, 3).map((user) => (
              <FollowingList key={user._id}>
                <FollowsWrap>
                  <FollowingThumb>
                    <a onClick={() => router.push(`/user/${user.username}`)}>
                      <img
                        src={
                          user.profilePicUrl
                            ? createResizeImageUrl(user.profilePicUrl, 50, 50, 'profileCover')
                            : '/assets/artmo-default.png'
                        }
                        onError={(e) => {
                          imageErrorHandler(
                            e,
                            createImageUrl(user.profilePicUrl),
                            '/assets/artmo-default.png',
                            'profileCover',
                            ''
                          )
                        }}
                        alt=""
                      />
                    </a>
                  </FollowingThumb>
                  <FollowsNameWrap>
                    {user.firstName && user.lastName ? (
                      <FollowsName onClick={() => router.push(`/user/${user.username}`)}>{`${
                        user.firstName + ' ' + user.lastName
                      }`}</FollowsName>
                    ) : (
                      <FollowsName
                        onClick={() => router.push(`/user/${user.username}`)}
                      >{`${user.username}`}</FollowsName>
                    )}
                    <FollowersCount>
                      {user.followersDetails && user.followersDetails.followersCount
                        ? user.followersDetails.followersCount
                        : 0}{' '}
                      {user.followersDetails &&
                      user.followersDetails.followersCount &&
                      user.followersDetails.followersCount === 1
                        ? t(`invite.follower`)
                        : t(`invite.followerPlural`)}
                    </FollowersCount>
                  </FollowsNameWrap>
                </FollowsWrap>
                {!user.reqSent && !user.inviteSent ? (
                  <FollowButton onClick={() => inviteHandler(user._id)}>Invite</FollowButton>
                ) : (
                  <FollowedButton>{t(`invite.invited`)}</FollowedButton>
                )}
              </FollowingList>
            ))}
        </SectionContentWrap>
      ) : listLoader ? (
        <SectionContentWrap>
          <p className="all-invited">{t(`invite.loading`)}</p>
        </SectionContentWrap>
      ) : userData.connectionCount > 0 ? (
        <SectionContentWrap>
          <p className="all-invited">{t(`invite.allConnectionsInvited`)}</p>
        </SectionContentWrap>
      ) : (
        <SectionContentWrap>
          <p className="all-invited">{t(`invite.noConnectionsToInvite`)}</p>
        </SectionContentWrap>
      )}
      <ModalComponent
        className="group-member-modal"
        isOpen={inviteSectionModal}
        closeModal={() => {
          setInviteSectionModal(false)
        }}
        closeOnOutsideClick={true}
      >
        <ListingsPopup 
          closeModal={setInviteSectionModal}
          title={`${t(`invite.inviteTo`)} ${groupInfo.title} `}
          type={'invite'}
          groupMembers={inviteUserList}
        />
      </ModalComponent>
    </>
  )
}
SectionContent.propTypes = {
  inviteSectionModal: PropTypes.bool,
  setInviteSectionModal: PropTypes.func,
}
export default SectionContent
