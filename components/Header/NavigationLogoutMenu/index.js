import React, { useEffect } from 'react'
import styled from 'styled-components'
import { CgMenuGridR } from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoCloseOutline } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosCart } from 'react-icons/io'
import { useTranslation } from 'next-i18next'
import { BsFillBookmarkFill } from 'react-icons/bs'
import { getLocalCart } from '../../../modules/cart/cartSlice'
import CartContainer from '../CartContainer'
import { BiChevronDown } from 'react-icons/bi'
import { closeAllModals, setLoginError, setLoginPopup, setSocialSignupError } from '../../../modules/auth/authSlice'

const NavUl = styled.div`
  font-weight: 400;
  margin: 0px;
  padding: 0;
  color: #fff;
  font-size: 11px;
  line-height: 14px;
  .red-badge-cart {
    background-color: #ff0000;
    &.grey-bg {
      background-color: #bab8b8; 
    }
    color: #fff;
    font-size: 11px;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 10px;
    min-height: 10px;
    line-height: 15px;
    position: absolute;
    top: 0;
    right: 20px;
    width: 15px;
    height: 15px;
    font-family: 'Montserrat-Medium';
    &.empty {
      background: #444;
    }
    @media (min-width: 991px) and (max-width: 1024px) {
      right: -9px;
    }
    @media (max-width: 991px) {
      font-size: 9px;
      min-width: 10px;
      min-height: 10px;
      padding: 2px;
      line-height: 9px;
      top: 0px;
      right: -12px;
    }
    @media (max-width: 767px) {
      font-size: 7px;
      min-width: 4px;
      min-height: 4px;
      padding: 2px;
      line-height: 8px;
      top: -3px;
      right: -10px;
      width: 12px;
      height: 12px;
    }
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin: 0 15px;
      padding: 0;
      &.moreBtn{
        .more-smal {
          font-size: 12px;
          margin-left: 2px;
          vertical-align: middle;     
        }
      }
      @media (max-width: 767px) {
        margin: 0 5px;
      }
      a {
        color: #fff;
        font-size: 12px;
        line-height: 12px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        text-align: center;
        align-items: center;
        cursor: pointer;
        position: relative;
        img {
          margin: 0 0 5px;
          width: 31px;
        }
        .red-badge-cart {
          right: -5px ;
          top: -2px ;
          @media ( max-width: 767px ) {
           // right: 44px ;
          }
        }
        svg {
          font-size: 26px;
          margin: 1px 0 3px;
          @media (max-width: 767px) {
            font-size: 24px;
          }
        }
        div {
          @media (max-width: 767px) {
            display: none;
          }
        }
      }
    }
  }
`

const NavigationLogoutMenu = (props) => {
  const { t } = useTranslation('header')

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getLocalCart())
  }, [dispatch])
  const cart = useSelector((state) => state.root.cart.cart)
  const redirectToSignUp = (e) => {
    e.stopPropagation()
    props.closeCartContainer()
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialSignupError(null))
  }
  return (
    <>
      <NavUl>
        <ul>
          <li>
            <a className="header-cart" onClick={props.toggleCartContainer} ref={props.cartRef}>
              {cart && cart.length > 0 ? <span className="red-badge-cart">{cart.length}</span> : null}
              <IoIosCart />
              <div>{t(`logoutMenu.cart`)}</div>
              {props.cartContainer && (
                <CartContainer
                  cartRef={props.cartRef}
                  deleteItem={props.deleteItem}
                  redirectToSignUp={redirectToSignUp}
                  loggedOut={true}
                />
              )}
            </a>
          </li>
          <li className="moreBtn">
            <a onClick={() => props.toggleSideMenu()}>
              {
                props.isSideMenuOpen ? <IoCloseOutline/> : <GiHamburgerMenu />
              }
              <div>{t(`logoutMenu.more`)}<BiChevronDown className="more-smal" /></div>
            </a>
          </li>
        </ul>
      </NavUl>
    </>
  )
}

NavigationLogoutMenu.propTypes = {
  toggleSideMenu: PropTypes.func,
  cartRef: PropTypes.object,
  cartContainer: PropTypes.bool,
  toggleCartContainer: PropTypes.func,
  closeCartContainer: PropTypes.func,
  deleteItem: PropTypes.string,
  isSideMenuOpen: PropTypes.bool
}

export default NavigationLogoutMenu
