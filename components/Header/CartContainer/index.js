import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import Button from '../../UI/Button'
import ButtonLight from '../../UI/ButtonLight'
import { isLoginToken } from '../../../utilities/authUtils'
import { countriesUsingDecimal } from '../../../utilities/decimalUsingCountries'
import { isEmptyObj } from '../../../utilities/checkEmptyObject.js'
import { getCartDetails } from '../../../modules/cart/cartSlice'
import CartItem from './CartItem'
import { useRouter } from 'next/router'
import { event } from '../../../lib/gtag'

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
      top: 50px;
      right: -138px;
    }
    :before {
      @media (max-width: 767px) {
        left: 148px;
        top: -8px;
      }
    }
    div {
      @media (max-width: 767px) {
        display: flex !important;
      }
    }
    &.cartSm {
      @media (max-width: 767px) {
        right: -81px !important;
      }
      :before {
        @media (max-width: 767px) {
          left: 204px !important;
        }
      }
    }
    &.logout {
      @media (min-width: 768px) and (max-width: 1024px) {
        right: 20px !important;
      }
      @media (max-width: 767px) {
        right: 20px !important;
      }
      :before {
        @media (min-width: 768px) and (max-width: 1024px) {
          left: 72px !important;
        }
        @media (max-width: 767px) {
          left: 245px !important;
        }
        @media (max-width: 767px) and (orientation: landscape) {
          left: 260px !important;
        }
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
    right: 5px;
  }
  :before {
    background: url('/assets/Polygon.png') no-repeat top center;
    width: 15px;
    height: 15px;
    content: ' ';
    top: -8px;
    position: relative;
    display: flex;
    text-align: center;
    margin: 0 auto;
    @media (max-width: 767px) {
      left: 63px;
      margin: inherit;
      top: -11px;
    }
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
const LineBreak = styled.br`
  margin-bottom : 5px  ;
`

function CartContainer({ redirectMagento, loggedOut, deleteItem, redirectToSignUp }) {
  const { t } = useTranslation(['translation', 'header'])

  const router = useRouter()
  const dispatch = useDispatch()

  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [decimalSeparator, setDecimalSeparator] = useState('comma')

  const cart = useSelector((state) => state.root.cart.cart)
  const localCart = localStorage.getItem('detailedCart') && JSON.parse(localStorage.getItem('detailedCart'))
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)

  const userCountry = userData && userData.country && userData.country.value ? userData.country.value : 'Germany'
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

  useEffect(() => {
    if (!isEmptyObj(currentCurrency) && currentCurrency.currency && currentCurrency.conversionRate) {
      setCurrency(currentCurrency.currency)
      setConversionRate(currentCurrency.conversionRate)
    } else {
      if (localCurrency) {
        if (!isEmptyObj(localCurrency) && localCurrency.currency && localCurrency.conversionRate) {
          setCurrency(localCurrency.currency)
          setConversionRate(localCurrency.conversionRate)
        } else {
          setCurrency('EUR')
          setConversionRate(1)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency])

  useEffect(() => {
    if (isLoginToken()) dispatch(getCartDetails(t))
  }, [dispatch])
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
                <CartItem
                  key={item._id}
                  item={item}
                  deleteItem={deleteItem}
                  currency={currency}
                  conversionRate={conversionRate}
                  decimalSeparator={decimalSeparator}
                />
              </>
            ))}
          {loggedOut &&
            localCart &&
            localCart.length > 0 &&
            localCart.map((item) => (
              <>
                <CartItem
                  key={item._id}
                  item={item}
                  deleteItem={deleteItem}
                  currency={currency}
                  conversionRate={conversionRate}
                  decimalSeparator={decimalSeparator}
                />
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
          <Button onClick={() => router.push('/artworks')}>{t(`header:cart.seeArtworks`)}</Button>
          <LineBreak/>
            <Button onClick={() => router.push('/artworks?pageType="wishlist"')}>My Wishlist</Button>
          <LineBreak/>
          <ButtonLight label={t(`header:cart.giftCard`)} onClick={() => router.push('/giftcard')}>{t(`header:cart.seeArtworks`)}</ButtonLight>
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
            onClick={(e) => {
                isLoginToken() ? redirectMagento(e) : redirectToSignUp(e)
            }}
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
