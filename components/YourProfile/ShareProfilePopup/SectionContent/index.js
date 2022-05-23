import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon,
  EmailIcon,
  EmailShareButton,
  RedditShareButton,
  RedditIcon,
} from 'react-share'
import { useTranslation } from 'next-i18next'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  padding: 10px 15px;
`
const ProfileLinkWrap = styled.div`
  border: 2px solid #eeeeee;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
`

const ProfileLinkInput = styled.input`
  text-overflow: ellipsis;
  overflow: hidden;
  width: 100%;
  border: 0;
  padding: 0px;
  margin: 0;
  color: #222;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  max-width: calc(100% - 80px);
  :hover,
  :focus {
    border: 0;
    outline: 0;
  }
`
const CopyLinkButton = styled.button`
  border: 0;
  padding: 0px;
  margin: 0;
  color: #aaa;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  background: transparent;
  cursor: pointer;
  :hover,
  :focus {
    border: 0;
    outline: 0;
  }
`

const SocialIconList = styled.div`
  button {
    /* margin-right: 10px;
    @media (max-width: 479px) {
      margin-right: 7px;
    } */
    :hover,
    :focus {
      outline: 0;
    }
  }
  /* button:last-child {
    margin-right: 0px;
  } */
  display: flex;
  justify-content: space-between;
  img {
    margin: 0 10px 10px 0;
  }
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
  .custom-button {
    background-color: transparent;
    border: none;
    padding: 0px;
    font: inherit;
    color: inherit;
    cursor: pointer;
    svg {
      @media (max-width: 767px) {
        width: 32px;
        height: 32px;
      }
    }
  }
`

const SectionContent = (props) => {
  const { t } = useTranslation('profile')

  const profileUrl = process.browser && window.location.origin + '/user/' + props.props.userData.username
  const [copySuccess, setCopySuccess] = useState('')
  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = profileUrl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopySuccess(t(`share.copiedText`))
  }
  const subject = t(`emailShare.profileShare.subject`)
  const bodyText1 = t(`emailShare.profileShare.bodyText1`)
  const bodyText2 = t(`emailShare.bodyText2`)
  const bodyText = bodyText1+' '+ profileUrl + ' '+ bodyText2
  return (
    <>
      <SectionContentWrap>
        <ProfileLinkWrap>
          <ProfileLinkInput value={profileUrl} disabled></ProfileLinkInput>
          <CopyLinkButton onClick={copyToClipboard}>
            {copySuccess ? copySuccess : t(`share.copyLink`)}
          </CopyLinkButton>
        </ProfileLinkWrap>
        <SocialIconList>
          <FacebookShareButton url={profileUrl} title="facebook" className="Demo__some-network__share-button">
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={profileUrl} title="twitter" className="Demo__some-network__share-button">
            <TwitterIcon size={32} />
          </TwitterShareButton>
          <WhatsappShareButton url={profileUrl} title="whatsapp" className="Demo__some-network__share-button">
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
          <button
            onClick={(e) => {
              e.preventDefault()
              if(process.browser) window.open(
                `https://pinterest.com/pin/create/button/?url=&amp;media=&amp;description=${encodeURIComponent(
                  profileUrl
                )}`,
                '_blank'
              )
            }}
            className="custom-button"
          >
            <PinterestIcon size={32} />
          </button>
          {/* </PinterestShareButton> */}
          <LinkedinShareButton url={profileUrl} title="linkedin" className="Demo__some-network__share-button">
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <EmailShareButton subject={subject} body={bodyText} url="" title="email" className="Demo__some-network__share-button">
            <EmailIcon size={32} />
          </EmailShareButton>
          <RedditShareButton url={profileUrl} title="reddit" className="Demo__some-network__share-button">
            <RedditIcon size={32} />
          </RedditShareButton>
        </SocialIconList>
      </SectionContentWrap>
    </>
  )
}
SectionContent.propTypes = {
  props: PropTypes.any,
}
export default SectionContent
