import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { isLoginToken } from '../../../utilities/authUtils'
import LanguageSelect from '../LanguageSelect'
import LanguagePopup from '../../LanguagePopup'
import { fetchConversations, populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice'
import { useRouter } from 'next/router'


const FooterMenuWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  @media (max-width: 767px) {
    margin-bottom: 0px;
  }
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 991px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    @media (max-width: 767px) {
      flex-direction: row;
      flex-wrap: nowrap;
    }
    li {
      display: flex;
      flex-direction: column;
      justify-content: center;
      text-align: center;
      margin: 0;
      padding: 0;
      max-width: 276px;
      height: 36px;
      background: #000;
      width: 100%;
      :hover {
        background-color: #0a0a0a ;
        border-color: #0a0a0a;
      }
      @media (max-width: 1280px) {
        max-width: 24%;
      }
      @media (max-width: 991px) {
        max-width: 49%;
        margin: 0 0 15px;
      }
      @media (max-width: 767px) {
        padding: 0 10px;
        margin: 0;
        max-width: inherit;
      }
      &.TermsBox {
        @media (max-width: 767px) {
          display: none;
        }
      }
      a {
        color: #888888 ;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        text-transform: uppercase;
        &:hover {
          background-color: #0a0a0a ;
          border-color: #0a0a0a;
        }
        @media (max-width: 479px) {
          font-size: 12px;
        }
        &.contactLink {
          text-decoration: none;
        }
      }
      .CustomBoxSelect {
        width: 100%;
        border: 0;
        outline: 0;
        text-transform: capitalize;
        svg {
          display: none;
        }
        > :first-child {
          border: 0;
          :hover,
          :focus {
            border: 0;
            outline: 0;
          }
        }
        :hover,
        :focus {
          border: 0;
          outline: 0;
        }
        &.my-react-select {
          :before {
            color: #fff;
            line-height: 34px;
            padding-left: 10px;
            padding-right: 10px;
            position: absolute;
            top: 2px;
            left: 40px;
            @media (min-width: 992px) and (max-width: 1024px) {
              left: 15px;
            }
            @media (max-width: 767px) {
              display: none;
            }
          }
          select__menu-list::-webkit-scrollbar {
            width: 4px;
            height: 0px;
          }
          select__menu-list::-webkit-scrollbar-track {
            background: #f1f1f1;
          }
          select__menu-list::-webkit-scrollbar-thumb {
            background: #888;
          }
          select__menu-list::-webkit-scrollbar-thumb:hover {
            background: #555;
          }
        }
      }
      &.lastChild {
        a {
          display: flex;
          justify-content: space-between;
          align-items: center;
          @media (max-width: 1024px) {
            justify-content: center;
          }
          span {
            padding-left: 75px;
            @media (max-width: 767px) {
              padding-left: 0px;
              @media (max-width: 1024px) {
                padding-left: 0px;
              }
            }
          }
        }
        .LanguageLabel {
          text-overflow: ellipsis;
          white-space: nowrap;
          overflow: hidden;
          text-align: left;
        }
        @media (max-width: 767px) {
          max-width: 160px;
        }
      }
      &:nth-child(2) {
        @media (max-width: 767px) {
          margin: 0 10px;
        }
      }
    }
  }
`

/**
 * @category components
 * @description Footer component
 */
const FooterMenu = ({ redirectToPage }) => {
  const { t } = useTranslation('footer')

  const router = useRouter()
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.root.myProfile.userData)

  const helpClickHandler = async () => {
    if (router.pathname.includes('messages')) {
      const { uuid } = userData.adminDetails
      const params = router.query
      params.userID = uuid
      router.push({ pathname: '/messages', query: params })
      dispatch(fetchConversations(true))
      window.scrollTo(0, 0)
      return
    }

    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: userData.adminDetails }))
  }

  const clickHandler = () => {
    if (isLoginToken()) {
      helpClickHandler()
    } else {
      if (typeof window !== 'undefined') window.location.href = `mailto:hello@artmo.com`
    }
  }
  return (
    t(`language`) !== "language" && <>
      <FooterMenuWrap langPlaceholder={t(`language`)}>
        <ul>
          <li onClick={() => redirectToPage('/about')}>
            <a>{t(`about`)}</a>
          </li>
          <li>
            <a onClick={clickHandler} className="contactLink">
              {t(`contact`)}
            </a>
          </li>
          <li className="TermsBox" onClick={() => redirectToPage('/user-terms-conditions')}>
            <a>{t(`tcp`)}</a>
            
          </li>
          <li className="lastChild">
            <LanguagePopup className="footeLanguagePop"/>
          </li>
        </ul>
      </FooterMenuWrap>
    </>
  )
}

FooterMenu.propTypes = {
  redirectToPage: PropTypes.func,
}

export default FooterMenu
