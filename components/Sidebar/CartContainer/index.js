import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import arrowImage from '../../../public/assets/Polygon.png'
import Button from '../../UI/Button'
import ButtonLight from '../../UI/ButtonLight'
import { isLoginToken } from '../../../utilities/authUtils'
import { getCartDetails } from '../../../modules/cart/cartSlice'
import CartItem from './CartItem'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  .list-item {
    padding: 0 15px 15px;
    margin: 0 !important;
  }
  min-width: 315px;
  box-sizing: border-box;
  padding: 15px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 66px;
  overflow: visible;
  padding: 14px;
  box-sizing: border-box;

  .scrollable-div {
    color: black !important;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    max-height: 220px;
    overflow-x: hidden;
    min-height: 20px;
  }
  margin: 0 !important;
  p {
    color: #222;
  }

  &.header-sub-menu {
    @media (min-width: 1025px) {
      top: 70px;
    }
    @media (max-width: 767px) {
      display: flex !important;
      flex-direction: column;
    }

    div {
      @media (max-width: 767px) {
        display: flex !important;
      }
    }
    &.logout {
      @media (min-width: 768px) and (max-width: 1024px) {
        right: 20px !important;
      }
      @media (max-width: 767px) {
        right: 20px !important;
      }
    }
  }
  .infinite-scroll-component {
    cursor: default;
    .end-message-container {
      cursor: default;
      margin: auto;
      p {
        color: #222;
        cursor: default;
      }
      @media (max-width: 767px) {
        justify-content: center;
      }
    }
    @media (max-width: 767px) {
      flex-direction: column;
      width: 100%;
    }
  }

  @media (max-width: 479px) {
    min-width: 300px;
  }

  .list-ul {
    list-style: none;
    display: flex;
    width: 100%;
    margin: 0;
    padding: 0;
    flex-direction: column !important;
    margin-top: -14px;
    max-height: 222px;
    overflow: auto;
    .end-message {
      cursor: auto;
    }
    ::-webkit-scrollbar {
      width: 8px;
      margin-right: 1px;
    }

    ::-webkit-scrollbar-track {
      background: rgba(241, 241, 241, 0.233);
    }

    ::-webkit-scrollbar-thumb {
      background: #222;
      cursor: pointer;
    }
  }
`

function CartContainer({ redirectMagento, loggedOut, deleteItem, redirectToSignUp }) {
  const { t } = useTranslation(['translation', 'header'])

  const router = useRouter()
  const dispatch = useDispatch()

  const cart = useSelector((state) => state.root.cart.cart)
  const localCart = localStorage.getItem('detailedCart') && JSON.parse(localStorage.getItem('detailedCart'))
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)

  // useEffect(() => {
  //   if (isLoginToken()) dispatch(getCartDetails())
  // }, [dispatch])
  return (
    <>
      <DropdownContent
        className={
          !isLoginToken() ? 'header-sub-menu logout' : hasActivePlan ? 'header-sub-menu cartSm' : 'header-sub-menu'
        }
      >
        <div className="scrollable-div">
          {!loggedOut &&
            cart &&
            cart.length > 0 &&
            cart.map((item) => (
              <>
                <CartItem key={item._id} item={item} deleteItem={deleteItem} />
              </>
            ))}
          {loggedOut &&
            localCart &&
            localCart.length > 0 &&
            localCart.map((item) => (
              <>
                <CartItem key={item._id} item={item} deleteItem={deleteItem} />
              </>
            ))}
          {isLoginToken() && cart && cart.length === 0 && t(`header:cart.emptyCartWarning`)}
          {!isLoginToken() &&
            ((localCart && localCart.length === 0) || !localCart) &&
            t(`header:cart.emptyCartWarning`)}
        </div>
        {(!isLoginToken() && (!localCart || (localCart && localCart.length === 0))) ||
        (isLoginToken() && (!cart || (cart && cart.length === 0))) ? (
          <>
            <Button onClick={() => router.push('/artworks')}>See Artworks</Button>
            <br/>
            <ButtonLight label={t(`header:cart.giftCard`)} onClick={() => router.push('/giftcard')}>{t(`header:cart.giftCard`)}</ButtonLight>
          </>
        ) : (
          <Button
            disabled={
              isLoginToken()
                ? (cart && cart.find((item) => !item.inStock)) || (cart && !cart.length)
                  ? true
                  : false
                : !localCart ||
                  (localCart && localCart.find((item) => !item.inStock)) ||
                  (localCart && !localCart.length)
                ? true
                : false
            }
            onClick={(e) => {isLoginToken() ? redirectMagento(e) : redirectToSignUp(e)}}
          >
            {t(`header:cart.checkoutButton`)}
          </Button>
        )}
      </DropdownContent>
    </>
  )
}
CartContainer.propTypes = {
  redirectMagento: PropTypes.func,
  loggedOut: PropTypes.bool,
  cartRef: PropTypes.object,
  redirectToSignUp: PropTypes.func,
  deleteItem: PropTypes.string,
}
export default CartContainer
