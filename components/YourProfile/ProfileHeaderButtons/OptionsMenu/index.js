import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { useTranslation } from 'next-i18next'
import { lowerCase } from 'lodash'

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  background-color: #fff;
  min-width: 120px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 40px;
  overflow: visible;
  right: 0;
  @media (max-width: 767px) {
    right: inherit;
    left: inherit;
    top: 35px;
  }
  @media (max-width: 340px) {
    right: 0;
    left: inherit;
    top: 35px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    right: inherit;
    top: 46px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;
    width: 100%;
    text-align: left;
  }
  li {
    color: #666;
    padding: 8px 10px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid #eee;
    &.disableForBlock {
      opacity: 0.6;
      pointer-events: none;
    }
  }
  li:hover {
    background-color: #ddd;
    cursor: pointer;
    &.disableConnect {
      cursor: auto;
      background-color: #f1f1f1;
    }
  }
`

const VisibilityMenu = (props) => {
  const { t } = useTranslation('profile')

  const connectClickHandler = (e) => {
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      e.stopPropagation()
      props.scrollToBlurred()
      props.closeMoreMenu()
    } else {
      props.addConnectionRequest(e)
    }
  }

  const shareClickHandler = (e) => {
    e.stopPropagation()
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      props.scrollToBlurred()
    } else {
      props.setShareProfilePopup(true)
    }
    props.closeMoreMenu()
  }

  const blockClickHandler = (e, type) => {
    if (props.userData && props.userData.userIdentity === 'guestUser') {
      e.stopPropagation()
      props.scrollToBlurred()
      props.closeMoreMenu()
    } else {
      props.blockUserRequest(e, type)
    }
  }

  const renderConnect = () => {
    if (props.userData.haveConnection === 'true') {
      return (
        <li className={props.userData.haveBlockedUser === 'true' ? 'disableForBlock' : 'disableConnect'}>
          {t(`profileHead.connected`)}
        </li>
      )
    } else if (props.userData.haveConnection === 'false' && props.userData.havePendingRequest === 'true') {
      return (
        <li className={props.userData.haveBlockedUser === 'true' ? 'disableForBlock' : 'disableConnect'}>
          {t(`profileHead.requestPending`)}
        </li>
      )
    } else if (props.userData.haveConnection === 'false' && props.userData.haveSentRequest === 'true') {
      return (
        <li className={props.userData.haveBlockedUser === 'true' ? 'disableForBlock' : 'disableConnect'}>
          {t(`profileHead.requestSent`)}
        </li>
      )
    } else if (
      (!props.userData.haveConnection || props.userData.haveConnection === 'false') &&
      (!props.userData.havePendingRequest || props.userData.havePendingRequest === 'false') &&
      (!props.userData.haveSentRequest || props.userData.haveSentRequest === 'false')
    ) {
      if (props.userData.haveBlockedUser === 'true') {
        return <li className="disableForBlock">{t(`profileHead.connect`)}</li>
      } else {
        return <li onClick={(e) => connectClickHandler(e)}>{t(`profileHead.connect`)}</li>
      }
    }
  }
  return (
    <>
      <DropdownContent>
        <ClickAwayListener onClickAway={() => props.handleClickOutside()}>
          <ul>
            {props.userData.userRoleType === 'personal' && props.accountType === 'personal' && renderConnect()}
            <li onClick={(e) => shareClickHandler(e)}>{t(`profileHead.shareProfile`)}</li>
            {props.userData.userRoleType === 'personal' && props.accountType === 'personal' && (
              <>
                {props.userData.adminDetails &&
                lowerCase(props.userData.adminDetails.username) === lowerCase(props.userData.username) ? (
                  <></>
                ) : props.userData.haveBlockedUser === 'true' ? (
                  <li onClick={(e) => blockClickHandler(e, 'unblock')}>{t(`profileHead.unblock`)}</li>
                ) : (
                  <li onClick={(e) => blockClickHandler(e, 'block')}>{t(`profileHead.block`)}</li>
                )}
              </>
            )}
          </ul>
        </ClickAwayListener>
      </DropdownContent>
    </>
  )
}

VisibilityMenu.propTypes = {
  handleClickOutside: PropTypes.func,
  addConnectionRequest: PropTypes.func,
  userData: PropTypes.object,
  blockUserRequest: PropTypes.func,
  scrollToBlurred: PropTypes.func,
  closeMoreMenu: PropTypes.func,
  setShareProfilePopup: PropTypes.func,
  accountType: PropTypes.string,
}

export default VisibilityMenu
