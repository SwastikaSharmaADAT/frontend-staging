import React from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'
import {
  closeAllModals,
  setSignupPopup,
  setUsernameValidFormError,
  setEmailValidFormError,
  setSignupError,
  setSocialUserError,
  setLoginPopup,
  setLoginError,
} from '../../modules/auth/authSlice'
import {  initiateNewThread, fetchConversations, populateChatBox, setMessageState } from '../../modules/messages/messagesSlice'
import { isLoginToken } from '../../utilities/authUtils'

const PageErrorWrapper = styled.div`
  height: calc(100vh - 64px - 112px);
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
      -ms-flex-align: center;
          align-items: center;
  -webkit-box-pack: center;
      -ms-flex-pack: center;
          justify-content: center;
  text-align: center;
  padding: 30px 15px;
  margin-top: 64px;
  background: #f3f4f8;
  & * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
`

const PageErrorInner= styled.div`
  p {
    color: #222;
    font-size: 24px;
    line-height: 1.4;
    margin: 0 0 20px 0;
    strong{
      font-size:30px;
      font-weight: bold;
    }
    @media( max-width: 1024px ) {
      font-size: 20px ;
    }
  }

  a{
    font-size: 28px;
    background: #fff;
    padding: 8px 30px;
    color: #222;
    font-weight: 500;
    line-height: 1;
    display: inline-block;
    border: 1px solid #dcdcdc;
	text-decoration: none;
  }
`

const PageErrorTop = styled.div`
  margin: 0 0 50px 0;
`

const PageErrorBottom = styled.div``

const PageErrorBottomLinks = styled.div`
  p {
    color: #858586;
    font-size: 18px;
    text-decoration: none;
    cursor: pointer !important;
  }
`

const PageErrorBtns = styled.div`
  margin: 0 0 20px 0;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: distribute;
  justify-content: space-around;
  @media( max-width:300px ){
      margin: 0;
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
  }
  a{
    cursor:pointer;
    &:hover{
      color: #fff ;
      background: #000 ;
    }
    @media (max-width:575px) {
      font-size: 22px;
      padding: 8px 15px;
    }
    @media( max-width:300px ){
      margin: 0 0 20px 0;
    }
  }

`


const MyArticleListing = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('staticPages', 'landingPage')
  const params = router.query
  const userData = useSelector((state) => state.root.myProfile.userData)

  const openSignupModal = () => {
    dispatch(closeAllModals())
    dispatch(setSignupPopup(true))
    dispatch(setUsernameValidFormError(null))
    dispatch(setEmailValidFormError(null))
    dispatch(setSignupError(null))
    dispatch(setSocialUserError(null))
  }

  const openLoginModal = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

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
    //onClose()
    if (isLoginToken()) {
      helpClickHandler()
    } else {
      window.location.href = `mailto:hello@artmo.com`
    }
  }

  return (
    <PageErrorWrapper>
      <PageErrorInner>
        <PageErrorTop>
          <p><strong>{t(`pageNotFound.404`)}</strong><br/>
          { ReactHtmlParser(t(`pageNotFound.pageNotFound`))} &#128516;
          </p>
          <PageErrorBtns>
            {
              !isLoginToken() && <a onClick={()=>openLoginModal()}>{t(`landingPage:loggedOutBanner.logIn`)}</a>
            }
            <a onClick={() => router.push('/')} >{t(`pageNotFound.goBackHome`)}</a>
          </PageErrorBtns>
        </PageErrorTop>
        <PageErrorBottom>
          {
            !isLoginToken() && ( <>
              <p>{t(`pageNotFound.signUpTextNotFound`)}</p>
              <PageErrorBtns>
                <a onClick={()=>openSignupModal()}>{t(`landingPage:loggedOutBanner.signUp`)}</a>
              </PageErrorBtns>
            </>)
          }
          <PageErrorBottomLinks>
            <p onClick={()=>clickHandler()}>Need Help ... Contact Us ...</p>
          </PageErrorBottomLinks>
        </PageErrorBottom>
      </PageErrorInner>
    </PageErrorWrapper>
  )
}

export default MyArticleListing
