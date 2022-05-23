import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { VscChromeClose } from 'react-icons/vsc'
import { BsEyeSlash, BsEye } from 'react-icons/bs'
import { MdEdit } from 'react-icons/md'
import { IoThumbsUpSharp } from 'react-icons/io5'
import { BsCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { getActivityDate } from '../../../../utilities/convertDate'
import {
  commentOnActivity,
  likeComment,
  deleteComment,
  editComment,
  setEditCommentResponse,
  hideComment,
} from '../../../../modules/newsFeed/newsFeedSlice'
import { commentOnGroupActivity, likeGroupComment, deleteGroupComment } from '../../../../modules/groups/groupsSlice'
import ModalComponent from '../../../UI/Modal'
import ConfirmBox from '../../../UI/ConfirmBox'
import LikesPopup from '../LikesPopup'
import { mapToTree } from '../../../../utilities/mapObjectsToTree'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { isLoginToken } from '../../../../utilities/authUtils'
import { closeAllModals, setLoginPopup, setLoginError, setSocialUserError } from '../../../../modules/auth/authSlice'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import Linkify from 'react-linkify'

const CommentsWrap = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 25px 15px;
  &.subComment {
    padding-left: 45px;
  }
  &.deletedSubComment {
    padding-left: 0 !important;
  }

`
const HideWarp = styled.div`
  &.hide {
    background-color: #eee;
    padding: 1px 0;
    img {
      filter: grayscale(0.5);
    }
  }
  &.deleted {
    display: none ;
    background-color: #eee;
    padding: 1px 0;
    img {
      opacity: 0.6;
    }
  }
  &.subcomment {
    margin-left: 47px;
    background-color: #eee;
    padding: 1px 0;
    img {
      filter: grayscale(0.5);
    }
  }

`

const CommentsThumb = styled.div`
  width: 40px;
  height: 40px;
  margin: 0 10px 0 0;
  cursor: pointer;
  img {
    width: 40px;
    height: 40px;
  }
  &.deleted {
    padding-left: 0 !important;
  }

`
const CommentNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: calc(100% - 40px);
  &.deleted {
    font-style: normal;
  }

`

const CommentName = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0 0 3px 0;
  color: #222;
  font-weight: bold;
  width: 100%;
  display: flex;
  justify-content: space-between;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  a {
    width: calc(100% - 10px);
  }
  div {
    &.commentUserInfo {
      cursor: pointer;
    }
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const CommentsDespWrap = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: 1.7;
  margin: 0 0 8px 0;
  color: #222;
  max-width: 100%;
  overflow: hidden;
  &.hiddenComment {
    font-style: normal;
    color: #666;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const CommentsClick = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 100%;
  font-family: 'Montserrat-Regular';
  color: #666;
  font-size: 16px;
  a {
    color: #000;
    margin: 0 5px 0 0;
    cursor: pointer;
    &.replyActive {
      color: #222;
      font-weight: bold;
    }
    &.replyBorder {
      border-left: 1px solid #666;
      /* padding-left: 8px; */
      padding-left: 5px;
    }
    svg {
      color: #aaa;
      vertical-align: middle;
      margin-right: 5px;
      padding-bottom: 4px;
    }
  }
  
  div {
    &.likesCount {
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
      margin: 0 10px 0 0;
      font-size: 14px;
      line-height: 14px;
      svg {
        color: #000;
      }
      .circleIcon {
        svg {
          color: #666;
          font-size: 6px;
        }
      }
      .count {
        cursor: pointer;
      }
      div {
        margin: 0 3px;
      }
    }
  }
  button {
    color: #666;
    font-size: 16px;
    margin: 0 15px 0 0;
    cursor: pointer;
    border: 0;
    background: transparent;
    padding: 0;
    outline: 0;
    :hover,
    :focus {
      color: #666;
      border: 0;
      background: transparent;
      outline: 0;
    }
    :disabled {
      pointer-events: none;
      opacity: 0.5;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const CommentsInput = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 15px;
  justify-content: flex-end;
  flex-wrap: wrap;
`

const CommentsTextArea = styled.textarea`
  padding: 15px;
  font-family: 'Montserrat-Regular';
  margin: 0 0 15px;
  width: 100%;
  resize: none;
  border: 2px solid #eeeeee;
  min-height: 76px;
  overflow: auto;
  font-size: 20px;
  border-radius: 0;
  ::placeholder {
    color: #ccc;
  }
  :hover,
  :focus {
    outline: 0;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const ReplyCommentsTextArea = styled.textarea`
  padding: 15px;
  font-family: 'Montserrat-Regular';
  margin: 0 0 15px;
  width: 100%;
  resize: none;
  border: 2px solid #eeeeee;
  min-height: 76px;
  overflow: auto;
  font-size: 20px;
  border-radius: 0;
  ::placeholder {
    color: #ccc;
  }
  :hover,
  :focus {
    outline: 0;
  }
`

const PublishBtn = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0px;
  outline: 0px;
  padding: 3px 11px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 3px 10px;
  }
  :disabled {
    pointer-events: none;
    opacity: 0.5;
  }
`

const TextareaWrap = styled.div`
  display: flex;
  width: 100%;
  textarea {
    min-height: 40px;
    overflow: auto;
  }
`

const IconsWrap = styled.div`
  display: flex;
  a {
    cursor: pointer;
    margin-left: 5px;
  }
`

const LoadMoreButton = styled.button`
  background: #eee;
  font-style: normal;
  color: #222;
  border: 0px;
  outline: 0px;
  padding: 3px 11px;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  margin: 0 auto;
  :hover,
  :focus {
    outline: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 3px 10px;
  }
`

const BtnWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
`

const CommentsDiv = styled.div`
  &.fixedHeight {
    overflow: auto;
    overflow-x: hidden;
    max-height: 250px;
  }
`

const CommentDate = styled.span`
  margin-left: 10px;
  color: #666;
  font-size: 12px;
`

// TODO Refactor code, move this component to a seperate file...
const RenderComment = ({
  info,
  type,
  parentIndex,
  postType,
  parentHidden,
  replyObj,
  setReplyObj,
  likeUnlikeComment,
  deleteCommentFromActivity,
  hideCommentFromActivity,
  editCommentHandler,
  activityOwnerInfo,
  newComment,
  setNewComment,
  articleViewPage,
  singleActivityType,
}) => {
  const { t } = useTranslation(['newsFeed', 'successResponses'])

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  const dispatch = useDispatch()
  const router = useRouter()
  const editCommentResponse = useSelector((state) => state.root.newsFeed.editCommentResponse)

  const [showLikesPopup, setLikesPopup] = useState(false)
  const [showConfirmBox, setConfirmBox] = useState(false)
  const [isEditingComment, setEditingComment] = useState(false)
  const [hideUnhideComment, setHideUnhideComment] = useState(false)
  const [updatedComment, setUpdatedComment] = useState(info && info.body ? info.body : '')

  const dateOfActivity = getActivityDate(info.dateUpdated)


  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  const commentOnChangeHandler = (e) => {
    const value = e.target.value
    setUpdatedComment(value)
  }

  const redirectToUserProfile = (username) => {
    router.push(`/user/${username}`)
  }

  useEffect(() => {
    if (
      editCommentResponse &&
      editCommentResponse.editing &&
      editCommentResponse.commentId === info._id &&
      isEditingComment
    ) {
      setEditingComment(false)
      dispatch(
        setEditCommentResponse({
          editing: false,
          commentId: '',
        })
      )
    }
  }, [editCommentResponse, isEditingComment, dispatch, info._id])

  const filteredLikes = info.likes.filter((like) => like.username !== loggedInUsername)

  const renderReply = () => {
    if (!isEmptyObj(replyObj) && replyObj.commentId === info._id) {
      return (
        <a className="replyActive replyBorder" onClick={() => replyClickHandler(false)}>
          Reply
        </a>
      )
    } else {
      return (
        <a className="replyBorder" onClick={() => replyClickHandler(true)}>
          Reply
        </a>
      )
    }
  }

  const replyClickHandler = (toggle) => {
    if (!toggle) {
      setReplyObj({})
    } else {
      const obj = {
        commentIndex: parentIndex,
        commentId: info._id,
      }
      setReplyObj(obj)
    }
  }

  const cancelEditCommentHandler = () => {
    if (updatedComment !== info.body) {
      setUpdatedComment(info.body)
    }
    setEditingComment(false)
  }

  const checkConditionToEditDelete = (commentType, commentInfo) => {
    if (commentType === 'comment') {
      if (
        commentInfo.children.length === 0 &&
        commentInfo.userId.username === loggedInUsername &&
        !isEditingComment &&
        !singleActivityType
      ) {
        return true
      }
      return false
    } else if (commentType === 'subcomment') {
      if (commentInfo.userId.username === loggedInUsername && !isEditingComment && !singleActivityType) {
        return true
      }
      return false
    }
  }
  const checkConditionToHideUnhide = (commentType) => {
    if (commentType === 'comment') {
      if (
        activityOwnerInfo.username === loggedInUsername &&
        !isEditingComment &&
        !articleViewPage &&
        !singleActivityType
      ) {
        return true
      }
      return false
    } else if (commentType === 'subcomment') {
      if (
        !parentHidden &&
        activityOwnerInfo.username === loggedInUsername &&
        !isEditingComment &&
        !articleViewPage &&
        !singleActivityType
      ) {
        return true
      }
      return false
    }
  }
  const name =!info.userId?'':
    info.userId && info.userId.firstName && info.userId.lastName
      ? `${info.userId.firstName} ${info.userId.lastName}`
      : info.userId && info.userId.firstName
        ? info.userId.firstName
        : info.userId.username
  const [commentName, translateCommentName] =useTranslateContent('')

  useEffect(() => {
    if (info.userId) translateCommentName(name)
  }, [info.userId, name])
  return (
    <>
      {showLikesPopup && (
        <ModalComponent closeOnOutsideClick={true} isOpen={showLikesPopup} closeModal={() => setLikesPopup(false)}>
          <LikesPopup setLikesPopup={setLikesPopup} likesData={info.likes} />
        </ModalComponent>
      )}
      {showConfirmBox && (
        <ConfirmBox
          open={showConfirmBox}
          closeModal={() => setConfirmBox(false)}
          deleteHandler={() => {
            deleteCommentFromActivity(info._id)
            setConfirmBox(false)
            if (!isEmptyObj(replyObj) && replyObj.commentId === info._id) {
              setReplyObj({})
              if (newComment !== '') {
                setNewComment('')
              }
            }
          }}
          heading={t(`singlePost.deleteText`)}
        />
      )}
      {hideUnhideComment && (
        /**Modal for hide / unhide activity */
        <ConfirmBox
          open={hideUnhideComment}
          closeModal={() => setHideUnhideComment(false)}
          buttonText={info.hidden ? t(`singlePost.capsUnhide`) : t(`singlePost.capsHide`)}
          hideHandler={() => {
            hideCommentFromActivity({
              commentId: info._id,
              type: info.hidden ? t(`singlePost.unhide`) : t(`singlePost.hide`),
            })
            setHideUnhideComment(false)
          }}
          heading={`${t(`singlePost.areYouSure`)} ${
            info.hidden ? t(`singlePost.unhide`) : t(`singlePost.hide`)
          } ${t(`singlePost.thisComment`)}`}
        />
      )}
      {!info.deleted ? (
        <HideWarp className={info.hidden || parentHidden ? 'hide' : null}>
          <CommentsWrap className={type === 'subcomment' ? 'subComment' : null}>
            <CommentsThumb onClick={() => redirectToUserProfile(info.userId.username)}>
              <img
                src={
                  info.userId && info.userId.profilePicUrl
                    ? createResizeImageUrl(info.userId.profilePicUrl, 50, 50, 'profileCover') +
                      '?' +
                      new Date(info.userId.dateUpdated).getTime()
                    : '/assets/artmo-default.png'
                }
                onError={(e) => {
                  const timeSuffix = '?' + new Date(info.userId.dateUpdated).getTime()
                  imageErrorHandler(
                    e,
                    createImageUrl(info.userId.profilePicUrl),
                    '/assets/artmo-default.png',
                    'profileCover',
                    timeSuffix
                  )
                }}
                alt=""
              />
            </CommentsThumb>
            <CommentNameWrap>
              <CommentName>
                <div className="commentUserInfo" onClick={() => redirectToUserProfile(info.userId.username)}>
                  {commentName ? commentName : name}
                  <CommentDate>{dateOfActivity}</CommentDate>
                </div>{' '}
                {postType === 'groupfeed' ? (
                  <>
                    <IconsWrap>
                      {checkConditionToEditDelete(type, info) && (
                        <a onClick={() => setConfirmBox(true)}>
                          <VscChromeClose />
                        </a>
                      )}
                    </IconsWrap>
                  </>
                ) : (
                  <IconsWrap>
                    {checkConditionToHideUnhide(type, info) && (
                      /**hide/unhide icon */
                      <a onClick={() => setHideUnhideComment(true)}>{info.hidden ? <BsEyeSlash /> : <BsEye />}</a>
                    )}
                    {checkConditionToEditDelete(type, info) && (
                      <>
                        <a onClick={() => setEditingComment(true)}>
                          <MdEdit />
                        </a>
                        <a onClick={() => setConfirmBox(true)}>
                          <VscChromeClose />
                        </a>
                      </>

                    )}
                  </IconsWrap>
                )}
              </CommentName>
              {isEditingComment ? (
                <>
                  <TextareaWrap>
                    <CommentsTextArea
                      value={updatedComment}
                      onChange={commentOnChangeHandler}
                      placeholder= {t(`newsFeed:singlePost.placeholderComment`)}
                    ></CommentsTextArea>
                  </TextareaWrap>
                  <CommentsClick>
                    <button onClick={() => cancelEditCommentHandler()}>Cancel</button>
                    <button
                      disabled={updatedComment === '' ? true : false}
                      onClick={() => editCommentHandler(info._id, updatedComment)}
                    >
                      {t(`newsFeed:singlePost.update`)}
                    </button>
                  </CommentsClick>
                </>
              ) : !isEditingComment && type === 'subcomment' && parentHidden ? (
                <>
                  <CommentsDespWrap className="hiddenComment"><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{info.body}</Linkify></CommentsDespWrap>
     
                </>
              ) : !isEditingComment && !info.hidden ? (
                <>
                  <CommentsDespWrap><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{info.body}</Linkify></CommentsDespWrap>
                  <CommentsClick>
                    {filteredLikes.length < info.likes.length ? (
                      <a onClick={() => likeUnlikeComment('unlike', info._id, loggedInUsername)}>
                        {t(`newsFeed:singlePost.liked`)}

                      </a>
                    ) : (
                      <a onClick={() => likeUnlikeComment('like', info._id, loggedInUsername)}>
                        {t(`newsFeed:singlePost.like`)}

                      </a>
                    )}
                    {info.likes && info.likes.length > 0 && (
                      <div className="likesCount">
                        <div className="circleIcon">
                          <BsCircleFill />
                        </div>
                        <div>
                          <IoThumbsUpSharp />
                        </div>
                        <div className="count" onClick={() => setLikesPopup(true)}>
                          {info.likes.length}
                        </div>

                      </div>
                    )}
                    {type === 'comment' && renderReply()}
                  </CommentsClick>
                </>
              ) : !isEditingComment && info.hidden && !parentHidden ? (
                <>
                  <CommentsDespWrap className="hiddenComment"><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{info.body}</Linkify></CommentsDespWrap>
                </>
              ) : null}
            </CommentNameWrap>
          </CommentsWrap>
        </HideWarp>
      ) : (
        <HideWarp className={`deleted ${type}`}>
          <CommentsWrap className={type === 'subcomment' ? 'deletedSubComment' : null}>
            <CommentsThumb>
              <img src={'/assets/artmo-default.png'} alt="" />
            </CommentsThumb>
            <CommentNameWrap>
              <CommentsDespWrap className="deleted">
                {type === 'comment' ? t(`singlePost.commentRemoved`) : t(`singlePost.replyRemoved`)}
              </CommentsDespWrap>
            </CommentNameWrap>
          </CommentsWrap>
        </HideWarp>
      )}

    </>
  )
}

RenderComment.propTypes = {
  info: PropTypes.object,
  parentHidden: PropTypes.bool,
  type: PropTypes.string,
  countIndex: PropTypes.number,
  parentIndex: PropTypes.number,
  postType: PropTypes.string,
  replyObj: PropTypes.object,
  setReplyObj: PropTypes.func,
  likeUnlikeComment: PropTypes.func,
  deleteCommentFromActivity: PropTypes.func,
  hideCommentFromActivity: PropTypes.func,
  editCommentHandler: PropTypes.func,
  activityOwnerInfo: PropTypes.object,
  newComment: PropTypes.string,
  setNewComment: PropTypes.func,
  articleViewPage: PropTypes.bool,
  singleActivityType: PropTypes.bool,
}

const SingleCommentTree = ({
  comment,
  parentCommentIndex,
  replyObj,
  setReplyObj,
  postType,
  likeUnlikeComment,
  deleteCommentFromActivity,
  hideCommentFromActivity,
  editCommentHandler,
  activityOwnerInfo,
  newComment,
  setNewComment,
  activityType,
  articleViewPage,
  singleActivityType,
  activityId,
}) => {
  const dispatch = useDispatch()
  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const [showAllSubComments, setShowAllSubComments] = useState(false)
  const [ replyComment , setReplyComment ] = useState('') ;
  const { t } = useTranslation(['newsFeed', 'successResponses','translation'])
  const loadMoreSubCommentsHandler = () => {
    setShowAllSubComments(true)
  }
  const commentOnChange = (e) => {
    const value = e.target.value
    //setNewComment(value)
    setReplyComment(value) ;
  }

  const openLoginPopup = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  const addReplySingle = () => {
    if (isLoginToken()) {
      if (postType === 'groupfeed') {
        if (!isEmptyObj(replyObj)) {
          dispatch(commentOnGroupActivity('subcomment', activityId, replyComment, replyObj.commentId, t))
          setReplyObj({})
          //setNewComment('')
          setReplyComment('')
        }  else {
          dispatch(commentOnGroupActivity('comment', activityId, newComment, null, t))
          setReplyObj({})
          setNewComment('')
        }
      } else {
        if (!isEmptyObj(replyObj)) {
          dispatch(
            commentOnActivity(
              'subcomment',
              activityId,
              activityType,
              articleViewPage,
              singleActivityType,
              replyComment,
              replyObj.commentId,
              t
            )
          )
          setReplyObj({})
          //setNewComment('')
          setReplyComment('')
        } else {
          dispatch(
            commentOnActivity('comment', activityId, activityType, articleViewPage, singleActivityType, newComment,'',t)
          )
          setReplyObj({})
          setNewComment('')
        }
      }
    } else {
      openLoginPopup()
    }
  }
  comment.children = comment.children.filter((com) => {
    if (activityOwnerInfo.username !== loggedInUsername) {
      return !com.hidden
    } else return com
  })
  return (
    <>
      <RenderComment
        activityOwnerInfo={activityOwnerInfo}
        info={comment}
        type="comment"
        postType={postType}
        activityType={activityType}
        countIndex={comment.startCountFrom}
        parentIndex={parentCommentIndex}
        replyObj={replyObj}
        setReplyObj={setReplyObj}
        likeUnlikeComment={likeUnlikeComment}
        deleteCommentFromActivity={deleteCommentFromActivity}
        hideCommentFromActivity={hideCommentFromActivity}
        editCommentHandler={editCommentHandler}
        newComment={newComment}
        setNewComment={setNewComment}
        articleViewPage={articleViewPage}
        singleActivityType={singleActivityType}
      />
      { !isEmptyObj(replyObj) && replyObj.commentIndex === parentCommentIndex && (<CommentsInput>
        <ReplyCommentsTextArea
          onChange={commentOnChange}
          placeholder="Insert your Reply..."
        ></ReplyCommentsTextArea>
        <PublishBtn disabled={replyComment === '' ? true : false} onClick={() => addReplySingle()}>
          Reply
        </PublishBtn>
      </CommentsInput>)}
      
      {comment.children.length > 0 &&
      (comment.children.length < 6 || (comment.children.length > 5 && showAllSubComments)) ? (
          <>
            {comment.children.map((subComment, subIndex) => (
              <RenderComment
                parentHidden={comment.hidden}
                activityOwnerInfo={activityOwnerInfo}
                key={subComment._id}
                postType={postType}
                info={subComment}
                activityType={activityType}
                type="subcomment"
                countIndex={comment.startCountFrom + subIndex + 1}
                likeUnlikeComment={likeUnlikeComment}
                deleteCommentFromActivity={deleteCommentFromActivity}
                hideCommentFromActivity={hideCommentFromActivity}
                editCommentHandler={editCommentHandler}
                newComment={newComment}
                setNewComment={setNewComment}
                articleViewPage={articleViewPage}
                singleActivityType={singleActivityType}
              />
            ))}
          </>
        ) : comment.children.length > 5 && !showAllSubComments ? (
          <>
            {comment.children.map((subComment, subIndex) => {
              if (subIndex < 5) {
                return (
                  <RenderComment
                    parentHidden={comment.hidden}
                    activityOwnerInfo={activityOwnerInfo}
                    key={subComment._id}
                    activityType={activityType}
                    info={subComment}
                    postType={postType}
                    type="subcomment"
                    countIndex={comment.startCountFrom + subIndex + 1}
                    likeUnlikeComment={likeUnlikeComment}
                    deleteCommentFromActivity={deleteCommentFromActivity}
                    hideCommentFromActivity={hideCommentFromActivity}
                    editCommentHandler={editCommentHandler}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    articleViewPage={articleViewPage}
                    singleActivityType={singleActivityType}
                  />
                )
              } else {
                return null
              }
            })}
            <BtnWrapper>
              <LoadMoreButton onClick={() => loadMoreSubCommentsHandler()}>{t(`newsFeed:singlePost.loadMoreRepliesText`)}</LoadMoreButton>
            </BtnWrapper>
          </>
        ) : null}
    </>
  )
}

SingleCommentTree.propTypes = {
  comment: PropTypes.object,
  parentCommentIndex: PropTypes.number,
  replyObj: PropTypes.object,
  postType: PropTypes.string,
  setReplyObj: PropTypes.func,
  likeUnlikeComment: PropTypes.func,
  deleteCommentFromActivity: PropTypes.func,
  hideCommentFromActivity: PropTypes.func,
  editCommentHandler: PropTypes.func,
  newComment: PropTypes.string,
  setNewComment: PropTypes.func,
  activityOwnerInfo: PropTypes.object,
  articleViewPage: PropTypes.bool,
  activityType: PropTypes.string,
  singleActivityType: PropTypes.bool,
  activityId: PropTypes.string,
}

const CommentsSection = ({
  postType,
  comments,
  activityId,
  activityType,
  commentBoxRef,
  showInLightbox,
  activityOwnerInfo,
  articleViewPage,
  singleActivityType,
}) => {
  const router = useRouter()
  const { groupId } = router.query
  const dispatch = useDispatch()
  const [newComment, setNewComment] = useState('')
  const [replyObj, setReplyObj] = useState({})
  const [showAllComments, setShowAllComments] = useState(false)
  const { t } = useTranslation(['newsFeed', 'successResponses','translation'])

  const [userInfo, setUserInfo] = useState(null)
  const logInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  const loadMoreCommentsHandler = () => {
    setShowAllComments(true)
  }

  const commentOnChange = (e) => {
    const value = e.target.value
    setNewComment(value)
  }

  const openLoginPopup = () => {
    dispatch(closeAllModals())
    dispatch(setLoginPopup(true))
    dispatch(setLoginError(null))
    dispatch(setSocialUserError(null))
  }

  const addComment = () => {
    if (isLoginToken()) {
      if (postType === 'groupfeed') {
        if (!isEmptyObj(replyObj)) {
          dispatch(commentOnGroupActivity('subcomment', activityId, newComment, replyObj.commentId, t))
          setReplyObj({})
          setNewComment('')
        } else {
          dispatch(commentOnGroupActivity('comment', activityId, newComment, null, t))
          setReplyObj({})
          setNewComment('')
        }
      } else {
        if (!isEmptyObj(replyObj)) {
          dispatch(
            commentOnActivity(
              'subcomment',
              activityId,
              activityType,
              articleViewPage,
              singleActivityType,
              newComment,
              replyObj.commentId,
              t
            )
          )
          setReplyObj({})
          setNewComment('')
        } else {
          dispatch(
            commentOnActivity('comment', activityId, activityType, articleViewPage, singleActivityType, newComment,'',t)
          )
          setReplyObj({})
          setNewComment('')
        }
      }
    } else {
      openLoginPopup()
    }
  }

  const likeUnlikeComment = (type, commentId, loggedInUsername) => {
    if (isLoginToken()) {
      if (postType === 'groupfeed') dispatch(likeGroupComment(type, activityId, commentId, loggedInUsername))
      else
        dispatch(
          likeComment(type, activityId, activityType, commentId, loggedInUsername, articleViewPage, singleActivityType)
        )
    } else {
      openLoginPopup()
    }
  }

  const deleteCommentFromActivity = (commentId) => {
    dispatch(deleteComment(activityId, activityType, commentId, articleViewPage,t))
  }
  /**delete group activity comment */
  const deleteGroupCommentFromActivity = (commentId) => {
    dispatch(deleteGroupComment(activityId, commentId, groupId, t))
  }
  /** hide / unhide handler */
  const hideCommentFromActivity = (info) => {
    dispatch(hideComment(activityId, activityType, info.commentId, info.type,t))
  }

  const editCommentHandler = (commentId, comment) => {
    dispatch(editComment(activityId, activityType, comment, commentId, articleViewPage,t))
  }

  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  let treeStructureComments = mapToTree(comments)
  treeStructureComments = treeStructureComments.reverse().filter((com) => {
    if (activityOwnerInfo.username !== logInUsername) {
      return !com.hidden
    } else return com
  })
  return (
    <>
      <CommentsDiv className={showInLightbox ? 'fixedHeight' : null}>
        {treeStructureComments.length < 6 || (treeStructureComments.length > 5 && showAllComments) ? (
          <>
            {treeStructureComments.map((comment, index) => (
              <SingleCommentTree
                key={comment._id}
                postType={postType}
                comment={comment}
                activityOwnerInfo={activityOwnerInfo}
                parentCommentIndex={index}
                replyObj={replyObj}
                setReplyObj={setReplyObj}
                hideCommentFromActivity={hideCommentFromActivity}
                likeUnlikeComment={likeUnlikeComment}
                activityType={activityType}
                deleteCommentFromActivity={
                  postType === 'groupfeed' ? deleteGroupCommentFromActivity : deleteCommentFromActivity
                }
                editCommentHandler={editCommentHandler}
                newComment={newComment}
                setNewComment={setNewComment}
                articleViewPage={articleViewPage}
                singleActivityType={singleActivityType}
                activityId={activityId}
              />
            ))}
          </>
        ) : treeStructureComments.length > 5 && !showAllComments ? (
          <>
            {treeStructureComments.map((comment, index) => {
              if (index < 5) {
                return (
                  <SingleCommentTree
                    key={comment._id}
                    postType={postType}
                    activityOwnerInfo={activityOwnerInfo}
                    comment={comment}
                    parentCommentIndex={index}
                    replyObj={replyObj}
                    activityType={activityType}
                    setReplyObj={setReplyObj}
                    likeUnlikeComment={likeUnlikeComment}
                    hideCommentFromActivity={hideCommentFromActivity}
                    deleteCommentFromActivity={
                      postType === 'groupfeed' ? deleteGroupCommentFromActivity : deleteCommentFromActivity
                    }
                    editCommentHandler={editCommentHandler}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    articleViewPage={articleViewPage}
                    singleActivityType={singleActivityType}
                  />
                )
              } else {
                return null
              }
            })}
            <BtnWrapper>
              <LoadMoreButton onClick={() => loadMoreCommentsHandler()}>{t(`newsFeed:singlePost.loadMoreText`)}</LoadMoreButton>
            </BtnWrapper>
          </>
        ) : null}
      </CommentsDiv>
      <CommentsInput ref={commentBoxRef}>
        <CommentsTextArea
          value={newComment}
          onChange={commentOnChange}
          placeholder= {t(`newsFeed:singlePost.placeholderComment`)}
          className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
        ></CommentsTextArea>
        <PublishBtn disabled={newComment === '' ? true : false} onClick={() => addComment()}>
        {t(`newsFeed:singlePost.publish`)}
        </PublishBtn>
      </CommentsInput>
    </>
  )
}

CommentsSection.propTypes = {
  comments: PropTypes.array,
  activityId: PropTypes.string,
  activityType: PropTypes.string,
  commentBoxRef: PropTypes.object,
  activityOwnerInfo: PropTypes.object,
  showInLightbox: PropTypes.bool,
  postType: PropTypes.string,
  articleViewPage: PropTypes.bool,
  singleActivityType: PropTypes.bool,
}

export default CommentsSection
