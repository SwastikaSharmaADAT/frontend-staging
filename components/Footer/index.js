import React, {useEffect, useState} from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import Copyrights from './Copyrights'
import FooterMenu from './FooterMenu'
import CookieConsent, { Cookies} from 'react-cookie-consent'
//import { Link } from 'react-router-dom'
import { useTranslation } from 'next-i18next'
import ScrollToTop from './ScrollToTop'
import Link from 'next/link'


const FooterWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 18px 0;
  width: 100%;
  background: #222;
  color: #fff;
  
  bottom: 0px;
`

const FooterInnerContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  flex-direction: column;
  @media (max-width: 1280px) {
    width: auto;
  }
`
const CookieContainer = styled.div`
  padding: 6px 30px;
  text-align: center;
  width: 100%;
`
const CookieText = styled.div`
display: inline-block;
font-size: 13px ;
line-height: 20px ;
`
const CookieButtons = styled.div`
display: inline-block;
a {
  font-size: 13px;
  letter-spacing: 0.25px ;
  border: none; 
  margin: 0 0 0 10px;
  transition: all 0s ease 0s;
  padding: 9px 10px 9px 10px;
  background: #fff;
  color: #222;
  cursor: pointer;
  text-align: center ;
  // position: relative;
  // left: 50px;
  text-decoration: none ;
}
button {
  font-size: 13px;
  letter-spacing: 0.25px ;
  border: none; 
  margin: 0 0 0 10px;
  transition: all 0s ease 0s;
  padding: 9px 10px 9px 10px;
  background: #fff;
  color: #222;
  cursor: pointer;
  text-align: center ;
  // position: relative;
  // left: 50px;
  text-decoration: none ;
  border-radius: 0;
}
`
const ConsentWrapper = styled.div`
&.hideConsentBar {
  display:none;
}
#rcc-confirm-button {
  border-radius: 3px;
}
#rcc-decline-button {
  position: absolute;
  right: 0;
  top: 7px;
}
.CookieConsent {
  & * {
    box-sizing: border-box ;
  }
  & > div {
    width: auto;
    display: inline-block !important;
    margin-right: 0 !important;
}
  @media(min-width: 1024px ) {
    height: 69px ;
    display: inline-block !important; 
  }
  z-index: 9 !important ;
}
`

/**
 * @category components
 * @description Footer component
 */
const Footer = () => {
  const [ wrapClass, setWrapClass]= useState();
  const [ showCookie, setShowCookie ] = useState(false) ; 
  const { t } = useTranslation(['translation', 'footer'])
  const router = useRouter()
  const redirectToPage = (route) => {
    router.push(route)
  }
  const onAcceptHandler =() => {
    Cookies.set('CookieConsent', 'true', {sameSite: 'lax', expires: 1}) ;
    setWrapClass('hideConsentBar')
  }
  
  const showCook = () => setTimeout(() => { setShowCookie(true) } , 5000);

  useEffect(()=>{
    window.addEventListener('scroll', showCook, { passive: true });
    return () => {
      clearTimeout(showCook);
    }  
  }, [])
  return (
    <>
      <FooterWrapper>
        <FooterInnerContainer>
          <FooterMenu redirectToPage={redirectToPage} />
          <Copyrights />
        </FooterInnerContainer>
      </FooterWrapper>
      {
        showCookie && (
          <ConsentWrapper className={wrapClass}>
            <CookieConsent
                  sameSite='lax' 
                  location='bottom'
                  buttonText=''
                  cookieName='CookieConsent'
                  hideOnAccept
                  declineButtonText='X'
                  declineButtonStyle={{ background: 'transparent', color: '#fff', fontSize: '13px' }}
                  style={{ background: '#000' }}
                  buttonStyle={{background: '#000', color: '#000', 'border-radius': '0', fontSize: '13px', 'letter-spacing': '0.25px', 'padding': '9px 10px 9px 10px', 'margin': '0 0 0 10px', 'pointer-events': 'none' }}
                  expires={1} 
                  enableDeclineButton
                  flipButtons
                  
                  >
              <CookieContainer>
                <CookieText>{t(`footer:cookieConsent:cookieText`)}</CookieText>
                <CookieButtons>
                  <button ariaAcceptLabel="Accept cookies" onClick={onAcceptHandler}>{t(`footer:cookieConsent:acceptBtnText`)}</button>
                  <Link href="/privacy-policy" target="_blank" className="signup-link" to="privacy-policy">{t(`footer:cookieConsent:policyText`)}</Link>
                </CookieButtons>
              </CookieContainer>
            </CookieConsent>
          </ConsentWrapper>
        )
      }
      
      <ScrollToTop/>
    </>
  )
}

export default Footer
