import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import PostHeader from '../../../NewsFeed/SinglePost/PostHeader'
import LikesSection from '../../../NewsFeed/SinglePost/LikesSection'
import ModalComponent from '../../../UI/Modal'
import CommentsSection from '../../../NewsFeed/SinglePost/CommentsSection'
import ShareActivity from '../../../NewsFeed/SinglePost/ShareActivity'
import { useSelector } from 'react-redux'

const SectionContentWrap = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  max-width: 390px;
  width: 100%;
  color: #222;
  background: #fff;
  display: flex;
  flex-direction: column;
  margin-left: 10px;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-left: 0px;
  }
  @media (max-width: 767px) {
    margin: 0;
    max-width: 100%;
    height: 100vh;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    height: auto;
    margin: 0;
    max-width: 100%;
  }
`

const PostText = styled.div`
  font-style: normal;
  font-size: 24px;
  line-height: normal;
  margin: 0;
  color: #222;
  border: 0;
  border-top: 1px solid #eee;
  padding: 20px 15px;
  font-family: 'Montserrat-Regular';
  border-bottom: 1px solid #eee;
  @media (max-width: 991px) and (orientation: landscape) {
    font-size: 15px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const SectionRight = (props) => {
  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  const commentBoxRef = useRef(null)

  const scrollToCommentBox = () => {
    commentBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const [shareDetails, setShareDetails] = useState({ activityId: '', activityType: '', username: '' })
  const [shareActivityPopup, setShareActivityPopup] = useState(false)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <SectionContentWrap>
        <PostHeader
          userInfo={props.userInfo}
          postDate={props.postDate}
          loggedInUsername={loggedInUsername}
          enableDelete={false}
        />
        <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{props.albumTitle}</PostText>
        <LikesSection
          likes={props.likes}
          comments={props.comments}
          activityId={props.activityId}
          activityType={props.activityType}
          userThumbnailsCount={2}
          scrollToCommentBox={scrollToCommentBox}
          username={props.activityOwnerUsername}
          shareActivityPopup={shareActivityPopup}
          setShareDetails={setShareDetails}
          setShareActivityPopup={setShareActivityPopup}
          shareSlug={props.shareSlug}
          singleActivityType={props.singleActivityType}
        />
        <CommentsSection
          comments={props.comments}
          activityId={props.activityId}
          activityType={props.activityType}
          activityOwnerInfo={props.userInfo}
          commentBoxRef={commentBoxRef}
          showInLightbox={true}
          singleActivityType={props.singleActivityType}
        />
      </SectionContentWrap>
      <ModalComponent
        closeOnOutsideClick={true}
        isOpen={shareActivityPopup}
        closeModal={() => setShareActivityPopup(false)}
      >
        <ShareActivity shareDetails={shareDetails} setShareActivityPopup={setShareActivityPopup} />
      </ModalComponent>
    </>
  )
}

SectionRight.propTypes = {
  userInfo: PropTypes.object,
  likes: PropTypes.array,
  comments: PropTypes.array,
  postDate: PropTypes.string,
  albumTitle: PropTypes.string,
  activityId: PropTypes.string,
  activityType: PropTypes.string,
  activityOwnerUsername: PropTypes.string,
  shareSlug: PropTypes.string,
  singleActivityType: PropTypes.bool,
}

export default SectionRight
