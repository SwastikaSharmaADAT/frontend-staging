import React, { useState, useEffect }from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import 'react-accessible-accordion/dist/fancy-example.css'
import {
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from 'react-share'
import { toggleLoading} from '../../../../modules/auth/authSlice'
import axios from 'axios'


const InviteContentWrapper = styled.div``
const EmailDivWrap = styled.div`
position: relative;
margin: 0 auto 17px;
padding: 0;
background: #ffffff;
display: flex;
flex-direction: row;
width: 100%;
align-items: flex-start;
justify-content: center;
max-width: 500px;
height: 100%;
`

const EmailDiv = styled.div`
  text-align: center;
  margin: 0 10px;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #666;
  a {
    color: #222;
    text-decoration: none;
  }
  img, svg {
    width: 50px;
    height: 50px;
  }
  @media (max-width: 479px) {
    margin: 0 10px 15px;
    min-width: 80px;
    font-size: 12px;
    img, svg{
      max-width: 30px;
    }
  }
  & *:focus{
    outline:none !important; 
  }
`

const InviteContent = ({ showServices, userData}) => {
  const { t } = useTranslation(['invite','translation'])
  const dispatch = useDispatch()
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const profileUrl = 'https://artmo.com/user/' + userData.username + '?utm_source=email&utm_medium=invite_link&utm_campaign=invite' ;

  const [ shortLink, setShortLink ] = useState() 
  const shortenLink = async (link) => {
    try {
      dispatch(toggleLoading(true))
      const axiosInstance = axios.create();
      const response = await axiosInstance.post(
        'https://api.tinyurl.com/create?api_token=49qopi5fUiHzWzjkHeL6PaMVxiYh4J5p43uVfSnu0b4YJxV9NftiLCuDtl3j',
        {url: link,
        domain: 'artmo.app'},
      )
      if (response && response.data && response.data.data && response.data.data.tiny_url) {
        dispatch(toggleLoading(false))
        return response.data.data.tiny_url
      } else {
        dispatch(toggleLoading(false))
        return link
      }
    } catch (err) {
      dispatch(toggleLoading(false))
      return link
    }
  }
  const getShortURL = async ( profileUrl ) => {
    let result;
      try {
        result = await shortenLink( profileUrl );
        setShortLink( result )
      } catch (e) {
        throw e;
      }
      //return result.link;
  }
  useEffect( ()=>{
    let newProfileURL = 'https://artmo.com/user/' + userData.username
    
    const urlWithUtm = newProfileURL+'?utm_source=email&utm_medium=invite_link&utm_campaign=invite'
    getShortURL( urlWithUtm ) ;
  }, [ userData ])

  const emailContent = encodeURIComponent(t(`emailContentText1`) + '\r\n' + shortLink + '\r\n\r\n' + t(`emailContentText2`))
  const emailLink = 'mailto:?subject=Invitation%20to%20ARTMO&body=' + emailContent

  return (
    <>
      <InviteContentWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        {showServices && (
            <EmailDivWrap>
                <EmailDiv>
                  <a target="_blank" href={emailLink}>
                  <svg viewBox="0 0 64 64" width="50" height="50"><rect width="64" height="64" rx="0" ry="0" fill="#7f7f7f"></rect><path d="M17,22v20h30V22H17z M41.1,25L32,32.1L22.9,25H41.1z M20,39V26.6l12,9.3l12-9.3V39H20z" fill="white"></path></svg>
                  </a>
                </EmailDiv>
                <EmailDiv>
                <FacebookMessengerShareButton appId='1667567323259558' url={shortLink} className="Demo__some-network__share-button">
                  <FacebookMessengerIcon size={32} />
                </FacebookMessengerShareButton>
                </EmailDiv>
                <EmailDiv>
                    <WhatsappShareButton url={t(`emailContentText1`) + '\r\n' + shortLink + '\r\n\r\n' + t(`emailContentText2`)} className="Demo__some-network__share-button">
                    <WhatsappIcon size={50} />
                    </WhatsappShareButton>
                </EmailDiv>
            </EmailDivWrap>
        )}
      </InviteContentWrapper>
    </>
  )
}
InviteContent.propTypes = {
  showServices: PropTypes.bool,
  setShowServices: PropTypes.func,
}
export default InviteContent