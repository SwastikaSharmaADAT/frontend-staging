import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import ReactHtmlParser from 'react-html-parser'
import 'react-accessible-accordion/dist/fancy-example.css'
// import './accordian.css'
import GoogleContacts from 'react-google-contacts'
// for later use
import MicrosoftLogin from 'react-microsoft-login'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { getOutlookContacts } from '../../../modules/staticContent/staticContentSlice'
import { notifyError } from '../../../modules/profile/myProfileSlice'
import { setSignupSuccess, toggleLoading } from '../../../modules/auth/authSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import { useRouter } from 'next/router'
import Input from '../../UI/Input'
import Button from '../../UI/Button'
import CancelButton from '../../UI/CancelButton'
import SingleContact from '../SingleContact/SingleContact'
import { inviteToArtmo } from '../../../modules/staticContent/staticContentSlice'
import {
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  FacebookMessengerShareButton,
  FacebookMessengerIcon
} from 'react-share'
import ShareLink from '../ShareLink'
import SidebarContact from '../SidebarContact'
import axios from 'axios'

const InviteContentWrapper = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 0 30px;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  /* width: 100%; */
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 10px 30px 15px;
  }
  .sample-email {
    max-width: 500px;
    margin: 0 auto;
    width: 100%;
  }
  .text-center {
    text-align: center;
    background-color: #eee;
    padding: 15px;
  }
  .accordion {
    border: 0;
    border-radius: 0;
    margin: 30px;
}
p {
  max-width: 600px;
  line-height: 2;
  text-align: center;
  color: #222;
  @media (max-width: 767px) {
    font-size: 14px;
    text-align: center;
  }
}
.accordion__button {
    display: flex;
    align-items: center;
    width: auto;
    justify-content: space-between;
    background: #fff;
    border: 2px solid #eee;
    margin:0;
    // font-size: 24px;
    line-height: 29px;
    color: #222222;
    padding: 15px;
    box-shadow: none;
}
.accordion__button:focus, .accordion__button:hover{
    outline: 0;
    box-shadow: none;
    background: #fff;
}
.accordion__button:before{
    order: 2;
    margin-top: -5px;
    color: #666;
}
.accordion__button:before {
    transform: rotate(45deg);
}
.accordion__button[aria-expanded='true']::before, .accordion__button[aria-selected='true']::before {
    transform: rotate(224deg);
    margin-top: 4px;
}
.accordion__panel {
    padding: 20px;
    animation: fadein 0.35s ease-in;
    border: 2px solid #eee;
    border-top: 0;
    margin: 0 0 15px;
    color: #222;
    box-shadow: none;
}
.accordion__panel p{
    margin: 0;
    padding: 0;
}
.accordion__item{
    margin: 0 0 15px;
}
.accordion__button:hover {
    /* background-color: transparent; */
    box-shadow: none;
}
.accordion__item + .accordion__item {
    border-top: 0;
}
@media (max-width: 767px) {
    .accordion {
        margin: -15px;
    }
    .accordion__button {
        font-size: 16px;
        line-height: normal;
        padding: 10px;
    }
    .accordion__panel{
        padding: 15px;
        font-size: 14px;
    }
    .accordion__button span {
        max-width: 80%;
    }
}
`
const PickEmail = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
const PickEmailHeading = styled.div`
  margin: 50px 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  font-size: 24px;
  color: #666;
  justify-content: center;
  @media (max-width: 767px) {
    font-size: 24px;
    text-align: center;
    line-height: 1.6;
    margin: 10px 0 15px;
  }
`
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
  height: 100%;
  flex-wrap: wrap;
`

const EmailDiv = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  align-items: center;
  max-width: 145px;
  padding: 20px 0 20px;
  text-align: center;
  margin: 0 10px;
  border: 2px solid #eee;
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
    width: 30px;
    height: 30px;
    margin: 0 0 15px;
  }
  @media (max-width: 479px) {
    margin: 0 10px 15px;
    min-width: 80px;
    font-size: 12px;
    img, svg{
      max-width: 30px;
    }
  }
  > :first-child {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  @media( max-width: 1024px ) {
    margin: 10px;
  }
  @media( max-width: 767px ) {
    flex-basis: 40%;
  }
`

const TemplateContainer = styled.div`
  background: #fff;
  padding: 0 0 40px;
`

const TemplateHeading = styled.h2`
  background: #000;
  padding: 30px 0;
  color: #fff;
  @media (max-width: 479px) {
      font-size: 20px;
  }
`

const TemplateContent = styled.div`
  figure {
    margin: 0 0 30px;
  }
  figcaption {
    font-size: 12px;
  }
  p {
    font-size: 18px;
    span { 
      text-decoration: underline;
      font-weight: 800;
      cursor: pointer;
    }
  }
  img {
    width: 120px;
    margin: 30px 0 0;
  }
  @media (max-width: 479px) {
    p {
      font-size: 16px;
    }
  }
` 

const SelectedWrap = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 0 0 15px;
`
const SelectedCount = styled.div`
  display: flex;
  align-items: center;
  color: #666;
  font-size: 14px;
  span {
    margin: 0 5px 0 0;
  }
  input {
    margin: 0 0 0 10px;
    padding: 0 10px;
    @media (max-width: 479px) {
      max-width: 140px;
      font-size: 14px;
      padding: 0 10px;
    }
  }
`
const PickerEmailWrap = styled.div`
  background: #e7e9ec;
  padding: 10px 10px 0;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  flex-wrap: wrap;
  max-height: 540px;
  overflow-y: auto;
  p {
    width: 100%;
    text-align: center;
    margin-bottom: 20px;
  }
`
const BottomBar = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 15px 0;
  justify-content: center;
  p {
    color: #666;
    font-size: 14px;
  }
  textarea {
    width: 100%;
    margin: 0 0 15px;
    color: #222;
    ::placeholder {
      color: #222;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  button {
    background: #000;
    width: auto;
    margin: 0;
    padding: 8px 15px;
    height: auto;
    text-transform: uppercase;
    font-family: 'Montserrat-Regular';
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .cancel {
    margin-left: 15px;
    background-color: #eee;
    font-size: 16px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
`

const InviteContent = ({ setContacts, contacts, setShowOther, setShowServices, showServices, howDoesThisWork, userData}) => {
  const dispatch = useDispatch()
  const loadingState = useSelector((state) => state.root.auth.loading)
  const { t } = useTranslation(['invite','translation'])
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const router = useRouter()

  /**search input state */
  const [input, setInput] = useState('')
  /**emails checked by user from list */
  let [selectedEmails, setSelectedEmails] = useState([])
  /**manually types emails */
  const [customEmails, setCustomEmails] = useState([])
  const filteredContacts =
    input !== '' ? contacts.filter((contact) => contact.title.toLowerCase().includes(input.toLowerCase())) : contacts
  const profileUrl = 'https://artmo.com/user/' + userData.username

  /**add emails to array */
  const selectedTags = (tags) => {
    setCustomEmails(tags)
  }

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

  /**reducer to invite selected emails to Artmo */
  const submitHandler = async () => {
    sessionStorage.removeItem('msal.idtoken')
    sessionStorage.removeItem('msal.client.info')
    dispatch(toggleLoading(true))
    selectedEmails = selectedEmails.concat(customEmails)
    selectedEmails = [...new Set([...selectedEmails, ...customEmails])]
    const resultAction = await dispatch(inviteToArtmo({data:selectedEmails,t}))
    const result = await unwrapResult(resultAction)
    if (result.success) {
      setShowServices(true)
      setCustomEmails([])
      setSelectedEmails([])
      setContacts([])
      setShowOther(false)
      if (typeof window !== 'undefined') 
        window.scrollTo({
          top: 220,
          left: 0,
          behavior: 'smooth',
        })
    }
    dispatch(toggleLoading(false))
  }
  const cancelHandler = () => {
    sessionStorage.removeItem('msal.idtoken')
    sessionStorage.removeItem('msal.client.info')
    setShowServices(true)
    setCustomEmails([])
    setSelectedEmails([])
    setContacts([])
    setShowOther(false)
    if (typeof window !== 'undefined') 
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'smooth',
      })
  }
  

  const [openAccordion1, setOpenAccordion1] = useState(false)
  const [openAccordion2, setOpenAccordion2] = useState(false)

  const [success, setSuccess] = useState(false)

  /**show manual mails text area */
  const manualMails = () => {
    /**close accordions if open */
    setOpenAccordion1(false)
    setOpenAccordion2(false)
    setShowOther(true)
    setShowServices(false)
    if (process.browser) {
      window.scrollTo({
        top: 220,
        left: 0,
        behavior: 'smooth',
      })
    }
  }
  /**this functions triggers when gmail contacts are fetched */
  const gmailSuccess = (data) => {
    /**close accordions if open */
    setOpenAccordion1(false)
    setOpenAccordion2(false)
    setSuccess(true)
    setContacts(data)
    if (data.length === 0) {
      notifyError(t(`errorResponses:auth.noContactsFound`))
      dispatch(toggleLoading(false))
      return
    }
    setShowServices(false)
    dispatch(toggleLoading(false))
    if (process.browser) {
      window.scrollTo({
        top: 480,
        left: 0,
        behavior: 'smooth',
      }) 
    }
  }
  const authHandler = async (err, data) => {
    let newData = []
    if (!err) {
      await dispatch(toggleLoading(true))
      const resultAction = await dispatch(getOutlookContacts({data:data.accessToken,t}))
      let contacts = await unwrapResult(resultAction)
      contacts.forEach((contact) => {
        if (contact && contact.emailAddresses && contact.emailAddresses[0] && contact.emailAddresses[0].address) {
          newData.push({
            title: contact.displayName,
            email: contact.emailAddresses[0].address,
          })
        }
      })
      setOpenAccordion1(false)
      setOpenAccordion2(false)
      // setShowServices(false)
      if (newData.length === 0) {
        sessionStorage.removeItem('msal.idtoken')
        sessionStorage.removeItem('msal.client.info')
        await dispatch(toggleLoading(false))
        notifyError(t(`errorResponses:auth.noContactsFound`))
        return true
      }
      setShowServices(false)
      setSuccess(true)
      setContacts(newData)
      if (process.browser) {
        window.scrollTo({
          top: 480,
          left: 0,
          behavior: 'smooth',
        })
      }
      await dispatch(toggleLoading(false))
    }
  }
  
  const [ shortLink, setShortLink ] = useState() 
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

  const gmailLink = 'https://mail.google.com/mail/?view=cm&fs=1&to=&su=Invitation%20to%20ARTMO&body=' + emailContent
  const emailLink = 'mailto:?subject=Invitation%20to%20ARTMO&body=' + emailContent+''

  return (
    <>
      <InviteContentWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        {showServices && (
          <PickEmail>
            <PickEmailHeading>{t(`pickEmailService`)}</PickEmailHeading>
            <EmailDivWrap>
              {/* Google email service */}
              <GoogleContacts
                clientId={process.env.NEXT_PUBLIC_REACT_APP_GOOGLE_CLIENT_ID}
                onRequest={() => dispatch(toggleLoading(true))}
                buttonText="Import"
                render={(renderProps) => (
                  <EmailDiv>
                    <a target="_blank" href={gmailLink}>
                      <img src='/assets/gmail.svg' alt="" />
                      {t(`gmailText`)}
                    </a>
                  </EmailDiv>
                )}
                onSuccess={gmailSuccess}
                onFailure={() => dispatch(toggleLoading(false))}
              />
                <EmailDiv>
                  <a target="_blank" href={emailLink}>
                    <img src='/assets/email.svg' alt="" />
                    {t(`emailText`)}
                  </a>
                </EmailDiv>
              <EmailDiv>
                <WhatsappShareButton url={t(`emailContentText1`) + '\r\n' + shortLink + '\r\n\r\n' + t(`emailContentText2`)} className="Demo__some-network__share-button">
                  <WhatsappIcon size={32} />
                  {t(`whatsAppText`)}
                </WhatsappShareButton>
              </EmailDiv>
              <EmailDiv>
                <LinkedinShareButton title="Join ARTMO, the Art Community" summary={t(`emailContent`)} source='ARTMO' url={shortLink} className="Demo__some-network__share-button">
                  <LinkedinIcon size={32} />
                  {t(`linkedinText`)}
                </LinkedinShareButton>
              </EmailDiv>
              <EmailDiv>
                <FacebookMessengerShareButton appId='1667567323259558' url={shortLink} className="Demo__some-network__share-button">
                  <FacebookMessengerIcon size={32} />
                  {t(`messengerText`)}
                </FacebookMessengerShareButton>
              </EmailDiv>
            </EmailDivWrap>
            <p>{t(`sendManually`)}</p>
            <ShareLink code={shortLink}/>
            <SidebarContact/>
            <p><a target="_blank" href="https://artmo.com/buzz/invite-friends-get-followers-and-extend-your-network">{t(`learnMore`)}</a></p>
          </PickEmail>
        )}
        {
          success ?
          <>
          <SelectedWrap>
            <SelectedCount>
              <span>{selectedEmails.length}</span> {t(`selectedText`)}
              <Input value={input} type="text" placeholder="Search..." onChange={(e) => setInput(e.target.value)} />
            </SelectedCount>
          </SelectedWrap>
          <PickerEmailWrap>
            {filteredContacts && filteredContacts.length > 0 ? (
              filteredContacts.map((contact) => (
                <SingleContact
                  selectedEmails={selectedEmails}
                  setSelectedEmails={setSelectedEmails}
                  contact={contact}
                  key={contact.email}
                />
              ))
            ) : (
              <p>{t(`emptyResultText`)}</p>
            )}
          </PickerEmailWrap>
          <BottomBar>
            <Button
                className="invite"
                disabled={!(selectedEmails.length > 0 || customEmails.length > 0)}
                onClick={submitHandler}
              >
                {t(`sendInvitesButtonLabel`)}
              </Button>
            <CancelButton className="cancel" onClick={cancelHandler} />
          </BottomBar>
          </>
          : null
        }
        {/* <Accordion allowZeroExpanded>
          <AccordionItem dangerouslySetExpanded={openAccordion1} onClick={() => setOpenAccordion1(!openAccordion1)}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <span>{t(`howInviteWork`)}</span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel>
              <p>{ReactHtmlParser(howDoesThisWork)}</p>
            </AccordionItemPanel>
          </AccordionItem>
          <AccordionItem dangerouslySetExpanded={openAccordion2} onClick={() => setOpenAccordion2(!openAccordion2)}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <span>{t(`emailTemplateText`)}</span>
              </AccordionItemButton>
            </AccordionItemHeading>
            <AccordionItemPanel className="text-center">
              <TemplateContainer>
              <TemplateHeading>{userData && userData.firstName} {userData && userData.lastName} {t(`template.hasInvitedYou`)}</TemplateHeading>
              <TemplateContent>
                <p>{t(`template.emailContent`)}</p>
                <p>{t(`template.click`)} <span onClick={() => router.push('/user/' + (userData && userData.username))}>{t(`template.here`)}</span> {t(`template.seeMyProfile`)}</p>
                <p>{t(`template.kit`)}</p>
                <p>{t(`template.whatIsArtmo`)} ~ <span onClick={() => router.push('/what-is-artmo')}>{t(`template.learnMore`)}</span></p>
              </TemplateContent>
              </TemplateContainer>
            </AccordionItemPanel>
          </AccordionItem>
        </Accordion> */}
      </InviteContentWrapper>
    </>
  )
}
InviteContent.propTypes = {
  setContacts: PropTypes.func,
  setShowOther: PropTypes.func,
  contacts: PropTypes.array,
  showServices: PropTypes.bool,
  setShowServices: PropTypes.func,
  howDoesThisWork: PropTypes.string,
}
export default InviteContent