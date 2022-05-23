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
import Button from '../../UI/Button'
import { useTranslation } from 'next-i18next'

const ShareLinkWrap = styled.div`
  position: relative;
  margin: 0;
  padding: 0px 10px 10px 15px;
  max-width: 520px;
  margin: auto;
`
const ProfileLinkWrap = styled.div`
  border: 2px solid #eeeeee;
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: 400px;
`

const ProfileLinkInput = styled.input`
  text-overflow: ellipsis;
  padding: 10px;
  overflow: hidden;
  width: 100%;
  border: 0;
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
  padding: 10px;
  color: #222;
  background: #eee;
  min-width: 100px;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  cursor: pointer;
  :hover,
  :focus {
    border: 0;
    outline: 0;
  }
`

const Heading = styled.p`
  color: #222;
  font-size: 17px;
  margin: 20px 0 30px;
  text-align: center;
  line-height: 2;
  @media( max-width: 767px ) {
    font-size: 14px;
    margin: 10px 0 10px;
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

const ShareLink = ({code}) => {
  const { t } = useTranslation(['profile', 'referrals'])

  const profileUrl = code
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

  const handleSharing = async () => {
    if (navigator.share) {
      try {
        await navigator
          .share(profileUrl)
          .then(() =>
            console.log("Hooray! Your content was shared to tha world")
          );
      } catch (error) {
        console.log(`Oops! I couldn't share to the world because: ${error}`);
      }
    } else {
      // fallback code
      console.log(
        "Web share is currently not supported on this browser. Please provide a callback"
      );
    }
  };

  return (
    <>
      <ShareLinkWrap>
        <Heading>{t(`referrals:chooseApp`)}</Heading>
        <SocialIconList>
          <FacebookShareButton url={code} className="Demo__some-network__share-button">
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={t(`referrals:msgContentShort`) + code} className="Demo__some-network__share-button">
            <TwitterIcon size={32} />
          </TwitterShareButton>
          <WhatsappShareButton url={t(`referrals:msgContent`) + code} className="Demo__some-network__share-button">
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
          <button
            onClick={(e) => {
              e.preventDefault()
              if(process.browser) window.open(
                `https://pinterest.com/pin/create/button/?url=&amp;media=&amp;description=${encodeURIComponent(
                  code
                )}`,
                '_blank'
              )
            }}
            className="custom-button"
          >
            <PinterestIcon size={32} />
          </button>
          {/* </PinterestShareButton> */}
          <LinkedinShareButton url={code} className="Demo__some-network__share-button">
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <EmailShareButton url={t(`referrals:msgContent`) + code} subject="My invitation" title="email" className="Demo__some-network__share-button">
            <EmailIcon size={32} />
          </EmailShareButton>
          <RedditShareButton url={t(`referrals:msgContent`) + code} className="Demo__some-network__share-button">
            <RedditIcon size={32} />
          </RedditShareButton>
        </SocialIconList>
        <Heading>{t(`referrals:copyContent`)}</Heading>
        <ProfileLinkWrap>
          <ProfileLinkInput value={code} disabled></ProfileLinkInput>
          <CopyLinkButton onClick={copyToClipboard}>
            {copySuccess ? copySuccess : t(`share.copyLink`)}
          </CopyLinkButton>
        </ProfileLinkWrap>
      </ShareLinkWrap>
    </>
  )
}
ShareLink.propTypes = {
  code: PropTypes.any,
}
export default ShareLink
