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
const ActivityLinkWrap = styled.div`
  border: 2px solid #eeeeee;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  margin: 0 0 15px;
`

const ActivityLinkInput = styled.input`
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


  const createNewsFeedPostUrl = () => {
    const activityType = props.props.shareDetails.activityType
    if(process.browser) {
      if (activityType === 'buzzs' || activityType === 'potds' || activityType === 'exhibitions') {
        return `${window.location.origin}/${activityType.slice(0, -1)}/${props.props.shareDetails.activityId}`
      } else if (activityType === 'artworks') {
        return `${window.location.origin}/artworks/${props.props.shareDetails.activityId}`
      } else if (activityType === 'userPosts') {
        return `${window.location.origin}/${props.props.shareDetails.username}/post/${props.props.shareDetails.activityId}`
      } else {
        return `${window.location.origin}/${props.props.shareDetails.username}/${activityType.slice(0, -1)}/${
          props.props.shareDetails.activityId
        }`
      }
    }
  }

  let activityUrl = ''

  if(process.browser) {
    if (props.props.viewArticle) {
      activityUrl = `${window.location.origin}/${props.props.shareDetails.activityType.slice(0, -1)}/${
        props.props.shareDetails.activityId
      }`
    } else if (props.props.artwork) {
      activityUrl = `${window.location.origin}/artworks/${props.props.artworkId}`
    } else {
      activityUrl =
      props.props.shareDetails.postType === 'groupfeed'
        ? `${window.location.origin}/${props.props.shareDetails.username}/${props.props.shareDetails.postType}/view/${props.props.shareDetails.activityId}`
        : createNewsFeedPostUrl()
    }
  }

  const type = props.props.shareDetails ? props.props.shareDetails.activityType : undefined

  const [copySuccess, setCopySuccess] = useState('')

  const copyToClipboard = () => {
    const textField = document.createElement('textarea')
    textField.innerText = activityUrl
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopySuccess('Copied!')
  }
  let subjectText = ""
  let bodyText1 = ""
  const bodyText2 = t(`emailShare.bodyText2`)
  
  if ( props.props.artwork ) {
    subjectText = t(`emailShare.artworkShare.subject`)
    bodyText1 = t(`emailShare.artworkShare.bodyText1`)
  } else if ( props.props.viewArticle ) {
    subjectText = t(`emailShare.articleShare.subject`)
    bodyText1 = t(`emailShare.articleShare.bodyText1`)
  } else {
    subjectText = t(`emailShare.postShare.subject`)
    bodyText1 = t(`emailShare.postShare.bodyText1`)
  }
  const bodyText = bodyText1+' '+ activityUrl + ' '+ bodyText2

  return (
    <>
      <SectionContentWrap>
        <ActivityLinkWrap>
          <ActivityLinkInput value={activityUrl} disabled></ActivityLinkInput>
          <CopyLinkButton onClick={copyToClipboard}>{copySuccess ? copySuccess : 'Copy Link'}</CopyLinkButton>
        </ActivityLinkWrap>
        <SocialIconList>
          <FacebookShareButton url={activityUrl} title="facebook" className="Demo__some-network__share-button">
            <FacebookIcon size={32} />
          </FacebookShareButton>
          <TwitterShareButton url={activityUrl} title="twitter" className="Demo__some-network__share-button">
            <TwitterIcon size={32} />
          </TwitterShareButton>
          <WhatsappShareButton url={activityUrl} title="whatsapp" className="Demo__some-network__share-button">
            <WhatsappIcon size={32} />
          </WhatsappShareButton>
          {type !== 'videos' ? (
            <button
              onClick={(e) => {
                e.preventDefault()
                if(process.browser) window.open(
                  `https://pinterest.com/pin/create/button/?url=&amp;media=&amp;description=${encodeURIComponent(
                    activityUrl
                  )}`,
                  '_blank'
                )
              }}
              className="custom-button"
            >
              <PinterestIcon size={32} />
            </button>
          ) : null}
          {/* </PinterestShareButton> */}
          <LinkedinShareButton url={activityUrl} title="linkedin" className="Demo__some-network__share-button">
            <LinkedinIcon size={32} />
          </LinkedinShareButton>
          <EmailShareButton subject={subjectText} body={bodyText} url="" title="email" className="Demo__some-network__share-button">
            <EmailIcon size={32} />
          </EmailShareButton>
          <RedditShareButton url={activityUrl} title="reddit" className="Demo__some-network__share-button">
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
