import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { getJoinRequests } from '../../../modules/groups/groupsSlice'
import ModalComponent from '../../UI/Modal'
import ListingsPopup from '../ListingsPopup'


const JoinRequestsWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 15px 17px;
  margin: 0 auto 16px;
  align-items: center;
  justify-content: center;
`

const JoinRequestsContent = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  color: #222222;
  padding: 0;
  span {
    color: #fff;
    background-color: #aaa;
    padding: 0px 5px;
    font-weight: bold;
    margin-left: 5px;
    &.clickable {
      cursor: pointer;
      background-color: red;
    }
  }
`

const JoinRequests = () => {
  const { t } = useTranslation('groupsFeed')

  const dispatch = useDispatch()
  const router = useRouter()
  const { groupId } = router.query

  const groupJoinRequests = useSelector((state) => state.root.groups.groupJoinRequests)
  const [openJoinReqPopup, setJoinReqPopup] = useState(false)

  useEffect(() => {
    dispatch(getJoinRequests(groupId))
  }, [dispatch, groupId])

  return (
    <>
      <ModalComponent
        className="group-member-modal"
        isOpen={openJoinReqPopup}
        closeModal={() => setJoinReqPopup(false)}
        closeOnOutsideClick={true}
      >
        <ListingsPopup 
          closeModal={setJoinReqPopup}
          title={t(`joinRequests.title`)}
          type="joinList"
          groupMembers={groupJoinRequests}
        />
      </ModalComponent>
      <JoinRequestsWrap>
        <JoinRequestsContent>
          {t(`joinRequests.title`)}{' '}
          {groupJoinRequests && groupJoinRequests.length > 0 ? (
            <span className="clickable" onClick={() => setJoinReqPopup(true)}>
              {groupJoinRequests.length}
            </span>
          ) : (
            <span>0</span>
          )}
        </JoinRequestsContent>
      </JoinRequestsWrap>
    </>
  )
}

export default JoinRequests
