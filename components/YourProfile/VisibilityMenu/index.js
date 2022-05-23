import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { FaNetworkWired } from 'react-icons/fa'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { RiGroup2Fill } from 'react-icons/ri'
import { BsLockFill } from 'react-icons/bs'
import { useTranslation } from 'next-i18next'

const DropdownContent = styled.div`
  display: flex;
  position: absolute;
  background-color: #f1f1f1;
  min-width: 170px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 15px;
  overflow: visible;
  @media (min-width: 768px) and (max-width: 991px) {
    right: 0px;
    top: 21px;
  }
  &.shiftRight {
    @media (min-width: 768px) and (max-width: 991px) and (orientation: landscape) {
      right: 10px;
    }
    @media (min-width: 992px) and (max-width: 1024px) {
      right: 10px;
    }
  }
  /* :before {
    background: url('/assets/dropdown_arrow_top.png') no-repeat top center;
    width: 15px;
    height: 15px;
    content: ' ';
    top: -6px;
    position: relative;
    margin: 0 auto;
    display: flex;
    text-align: center;
    left: 45%;
  } */
  /* @media (max-width: 767px) {
    top: 76px;
  } */
  ul {
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;
    width: 100%;
    text-align: left;
  }
  li {
    color: black;
    padding: 8px 5px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid #dcdcdc;
    svg {
      margin: 0 5px;
      font-size: 18px;
      color: #666666;
    }
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: flex-start;
    &.selected {
      background-color: #ddd !important;
    }
  }
  li:hover {
    /* background-color: #ddd; */
    cursor: pointer;
  }
`

const VisibilityMenu = (props) => {
  const { t } = useTranslation('profile')

  return (
    <>
      <DropdownContent className={props.fieldName === 'maritalStatus' ? 'shiftRight' : null}>
        <ClickAwayListener onClickAway={() => props.handleClickOutside(props.fieldName)}>
          <ul>
            <li
              className={props.value === 'public' ? 'selected' : null}
              onClick={(e) => props.handleVisibilityChange(e, props.fieldName, 'public')}
            >
              {t(`visibility.public`)} <RiGroup2Fill />
            </li>
            <li
              className={props.value === 'private' ? 'selected' : null}
              onClick={(e) => props.handleVisibilityChange(e, props.fieldName, 'private')}
            >
              {t(`visibility.private`)} <BsLockFill />
            </li>
            <li
              className={props.value === 'connections' ? 'selected' : null}
              onClick={(e) => props.handleVisibilityChange(e, props.fieldName, 'connections')}
            >
              {t(`visibility.connectionsOnly`)} <FaNetworkWired />
            </li>
          </ul>
        </ClickAwayListener>
      </DropdownContent>
    </>
  )
}

VisibilityMenu.propTypes = {
  handleClickOutside: PropTypes.func,
  fieldName: PropTypes.string,
  handleVisibilityChange: PropTypes.func,
  value: PropTypes.string,
}

export default VisibilityMenu
