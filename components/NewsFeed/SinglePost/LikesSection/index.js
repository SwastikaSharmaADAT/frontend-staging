import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { IoThumbsUpSharp, IoChatbubbleSharp } from 'react-icons/io5'
import { HiShare } from 'react-icons/hi'
import { FiPlus } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { likeAnActivity } from '../../../../modules/newsFeed/newsFeedSlice'
import { likeAGroupActivity } from '../../../../modules/groups/groupsSlice'
import ModalComponent from '../../../UI/Modal'
import LikesPopup from '../LikesPopup'
import { mapToTree } from '../../../../utilities/mapObjectsToTree'
import { isLoginToken } from '../../../../utilities/authUtils'
import { closeAllModals, setLoginPopup, setLoginError, setSocialUserError } from '../../../../modules/auth/authSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { useSelector } from 'react-redux'

const LikesWrap = styled.div`
  display: flex;
  margin: 0;
  font-family: 'Montserrat-Regular';
  border-bottom: 1px solid #eee;
  justify-content: space-between;
  padding: 15px;
  /* padding: 12px; for lightbox */
  @media (max-width: 767px) {
    flex-direction: column;
    justify-content: flex-start;
  }
`

const LikesDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin: 0 30px 0 0;
  /* margin: 0 15px 0 0; for lightbox */
`

const LikesCount = styled.div`
  color: #000;
  font-size: 24px;
  .clickable {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 18px;
  }
`

const LikesLabel = styled.div`
  color: #aaa;
  font-size: 17px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const UserLikes = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  @media (max-width: 767px) {
    justify-content: flex-start;
    margin: 0 0 10px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const UserThumb = styled.div`
  img {
    width: 33px;
    height: 36px;
    margin: 0 0 0 5px;
    cursor: pointer;
    /* margin: 0 5px 0 0; for lightbox */
    @media (max-width: 767px) {
      margin: 0 5px 0 0;
    }
  }
  svg {
    width: 33px;
    height: 36px;
    margin: 0 0 0 5px;
    color: #aaa;
    cursor: pointer;
    @media (max-width: 767px) {
      margin: 0 5px 0 0;
    }
  }
`

const LikesBtnWrap = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin: 0px;
  @media (max-width: 767px) {
    min-height: 46px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    min-height: 46px;
  }
  /* margin: 0 15px 0 0; for lightbox */
`

const UsersButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #000;
  background: transparent;
  width: auto;
  border: 0;
  padding: 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 5px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent;
  }
  @media (max-width: 767px) {
    margin-left: 0px;
    font-size: 14px;
    height: auto;
    padding: 5px 10px;
    line-height: normal;
    @media (max-width: 359px) {
      padding: 5px 0 5px 10px;
      font-size: 13px;
    }
  }
  svg {
    margin: 0 8px 0 0;
    font-size: 18px;
    color: #aaa;
    @media (max-width: 359px) {
      font-size: 16px;
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const LikesSection = ({
  likes,
  comments,
  activityId,
  activityType,
  setShareDetails,
  setShareActivityPopup,
  username,
  postType,
  scrollToCommentBox,
  userThumbnailsCount,
  articleViewPage,
  singleActivityType,
  shareSlug,
}) => {
  const { t } = useTranslation('newsFeed')

  const dispatch = useDispatch()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const [showLikesPopup, setLikesPopup] = useState(false)
  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])
  const filteredLikes = likes.filter((like) => like.username !== loggedInUsername)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)


  const likeUnlike = (type) => {
    if (isLoginToken()) {
      if (postType === 'groupfeed') dispatch(likeAGroupActivity(type, activityId, loggedInUsername))
      else
        dispatch(
          likeAnActivity(type, activityId, activityType, loggedInUsername, articleViewPage, '', singleActivityType)
        )
    } else {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialUserError(null))
    }
  }

  const redirectToUserProfile = (username) => {
    router.push(`/user/${username}`)
  }

  let len = 0
  /**If username is activity owner, show length including hidden comments else exclude them */
  if (loggedInUsername !== username) {
    /**Convert to tree structure comments and find its length */
    let treeStructureComments = mapToTree(comments)
    for (let i = 0; i < treeStructureComments.length; i++) {
      if (!treeStructureComments[i].hidden) {
        for (let j = 0; j < treeStructureComments[i].children.length; j++) {
          if (!treeStructureComments[i].children[j].hidden) {
            len++
          }
        }
        len++
      }
    }
  } else {
    len = comments.length
  }
  return (
    <>
      {showLikesPopup && (
        <ModalComponent closeOnOutsideClick={true} isOpen={showLikesPopup} closeModal={() => setLikesPopup(false)}>
          <LikesPopup setLikesPopup={setLikesPopup} likesData={likes} />
        </ModalComponent>
      )}
      <LikesWrap>
        <UserLikes className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <LikesDiv>
            <LikesCount>
              {likes && likes.length > 0 ? (
                <span className="clickable" onClick={() => setLikesPopup(true)}>
                  {likes.length}
                </span>
              ) : (
                0
              )}
            </LikesCount>
            <LikesLabel>
              {likes && likes.length > 1
                ? t(`singlePost.lowerLikePlural`)
                : t(`singlePost.lowerLike`)}
            </LikesLabel>
          </LikesDiv>
          <LikesDiv>
            <LikesCount>{len}</LikesCount>
            <LikesLabel>
              {len > 1 ? t(`singlePost.lowerCommentPlural`) : t(`singlePost.lowerComment`)}
            </LikesLabel>
          </LikesDiv>
        </UserLikes>
        <UserThumb>
          {likes.map((like, index) => {
            if (index < userThumbnailsCount) {
              return (
                <img
                  onClick={() => redirectToUserProfile(like.username)}
                  src={
                    like.profilePicUrl
                      ? createResizeImageUrl(like.profilePicUrl, 50, 50, 'profileCover') +
                      '?' +
                      new Date(like.dateUpdated).getTime()
                      : '/assets/artmo-default.png'
                  }
                  onError={(e) => {
                    const timeSuffix = '?' + new Date(like.dateUpdated).getTime()
                    imageErrorHandler(
                      e,
                      createImageUrl(like.profilePicUrl),
                      '/assets/artmo-default.png',
                      'profileCover',
                      timeSuffix
                    )
                  }}
                  alt=""
                  key={like._id}
                />
              )
            } else {
              return null
            }
          })}
          {likes.length > userThumbnailsCount && <FiPlus onClick={() => setLikesPopup(true)} />}
        </UserThumb>
      </LikesWrap>

      <LikesBtnWrap>
        <UsersButton onClick={() => likeUnlike(filteredLikes.length < likes.length ? 'unlike' : 'like')} className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          {filteredLikes.length < likes.length ? (
            <>
              <IoThumbsUpSharp color="#222" /> {t(`singlePost.liked`)}{' '}
            </>
          ) : (
            <>
              <IoThumbsUpSharp /> {t(`singlePost.like`)}{' '}
            </>
          )}
        </UsersButton>
        <UsersButton onClick={() => scrollToCommentBox()} className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <IoChatbubbleSharp /> {t(`singlePost.comment`)}
        </UsersButton>
        <UsersButton
          onClick={() => {
            setShareDetails({ activityId: shareSlug, activityType: activityType, username: username, postType })
            setShareActivityPopup(true)
          }}
          className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
        >
          <HiShare /> {t(`singlePost.share`)}
        </UsersButton>
      </LikesBtnWrap>
    </>
  )
}

LikesSection.propTypes = {
  likes: PropTypes.array,
  comments: PropTypes.array,
  activityId: PropTypes.string,
  shareSlug: PropTypes.string,
  activityType: PropTypes.string,
  shareActivityPopup: PropTypes.bool,
  setShareActivityPopup: PropTypes.func,
  setShareDetails: PropTypes.func,
  username: PropTypes.string,
  postType: PropTypes.string,
  scrollToCommentBox: PropTypes.func,
  userThumbnailsCount: PropTypes.number,
  articleViewPage: PropTypes.bool,
  singleActivityType: PropTypes.bool,
}

export default LikesSection
