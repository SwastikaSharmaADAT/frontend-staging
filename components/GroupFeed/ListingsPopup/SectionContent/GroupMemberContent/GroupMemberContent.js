import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Popover } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { makeStyles } from '@material-ui/core/styles'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import { addAsModerator, removeFromGroup } from '../../../../../modules/groups/groupsSlice'
import { toggleLoading } from '../../../../../modules/auth/authSlice'
import ConfirmBox from '../../ConfirmBox/ConfirmBox'
import useTranslateArray from '../../../../../hooks/useTranslateArray'
import SingleItem from './SingleItem'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 15px 0 0;
  padding: 0 15px 30px;
  overflow-y: auto;
  max-height: 180px;
  @media (max-width: 767px) {
    max-height: 135px;
  }
  /* ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: rgba(241, 241, 241, 0.233);
    border-radius: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background: white;
    cursor: pointer;
    border-radius: 10px;
  } */
  .MuiPaper-elevation8 .MuiPaper-root .MuiPopover-paper {
    left: 400px;
    height: 118px;
  }
  .disabledItem {
    color: #666;
    font-style: normal;
    cursor: auto;
  }
`
const useStyles = makeStyles((theme) => ({
  popoverMenu: {
    padding: theme.spacing(2),
  },
}))
/**
 *
 * @returns: content for group members popup
 */
function GroupMemberContent() {
  const { t } = useTranslation(['groupsFeed', 'translation', 'successResponses'])

  const dispatch = useDispatch()
  const router = useRouter()
  const params = router.query

  const [member, setMember] = useState()
  const [anchorEl, setAnchorEl] = useState(null)
  const [confirmModal, setConfirmModal] = useState(false)

  const groupMembers = useSelector((state) => state.root.groups.currentPageGroupMembers)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const loggedInUserType = useSelector((state) => state.root.groups.loggedInUserType)

  const classes = useStyles()

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  /**sets the state on click of HiDots */
  const handleClick = (event, member) => {
    setMember(member)
    setAnchorEl(event.currentTarget)
  }

  /**handles closing of submenu */
  const handleClose = () => {
    setAnchorEl(null)
  }
  /**adds user as moderator */
  const moderatorHandler = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(addAsModerator({ userId: member.user._id, groupId: params.groupId, t: t }))
    const result = await unwrapResult(resultAction)
    if (result.status === 200) {
      setAnchorEl(null)
    }
    dispatch(toggleLoading(false))
  }
  const removeUserHandler = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(removeFromGroup({ userId: member.user._id, groupId: params.groupId, t: t }))
    const result = await unwrapResult(resultAction)
    if (result.status) setConfirmModal(false)
    dispatch(toggleLoading(false))
  }
  const open = Boolean(anchorEl)
  return (
    <>
      <SectionContentWrap>
        {groupMembers &&
          groupMembers.length > 0 &&
          groupMembers.map((member) => (
            <SingleItem
              loggedInUsername={loggedInUsername}
              handleClick={handleClick}
              loggedInUserType={loggedInUserType}
              member={member}
            />
          ))}
        <Popover
          className={`group-popover ${classes.popoverMenu}`}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
        >
          {member && !member.isModerator ? (
            <p className="menu-item" style={{ cursor: 'pointer' }} onClick={moderatorHandler}>
              {' '}
              {t(`listingPopup.assignModerator`)}{' '}
            </p>
          ) : (
            <p className="menu-item disabledItem">{t(`listingPopup.addedAsModerator`)}</p>
          )}
          <p
            className="menu-item"
            style={{ cursor: 'pointer' }}
            onClick={() => {
              setConfirmModal(true)
              setAnchorEl(null)
            }}
          >
            {' '}
            {t(`listingPopup.removeFromGroup`)}
          </p>
        </Popover>
        <ConfirmBox
          isOpen={confirmModal}
          closeModal={() => setConfirmModal(false)}
          title={t(`listingPopup.deleteConfirm`)}
          onSuccess={removeUserHandler}
        />
      </SectionContentWrap>
    </>
  )
}
GroupMemberContent.propTypes = {
  // groupMembers: PropTypes.array,
}
export default GroupMemberContent
