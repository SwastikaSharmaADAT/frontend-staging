import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import styled from 'styled-components'
import { IoPencil } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { HiShare } from 'react-icons/hi'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { isLoginToken } from '../../../../utilities/authUtils'
import { convertDate } from '../../../../utilities/convertDate'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { removeImagesFromStr, addImagesInStr, replaceWordpressImage } from '../../../../utilities/imageReplaceUtils'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import ModalComponent from '../../../UI/Modal'
import LikesSection from '../../../NewsFeed/SinglePost/LikesSection'
import CommentsSection from '../../../NewsFeed/SinglePost/CommentsSection'
import ShareActivity from '../../../NewsFeed/SinglePost/ShareActivity'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import MessagePopup from '../../../YourProfile/MessagePopup'

import { followUnfollow} from '../../../../modules/profile/myProfileSlice'
import { closeAllModals, setLoginError, setLoginPopup, setSocialUserError } from '../../../../modules/auth/authSlice'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0 0 17px;
  padding: 30px 30px 15px;
  background: #fff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  @media (max-width: 767px) {
    padding: 15px;
  }
  .blurred{
    * {
      &:nth-child(n+7){
        filter: blur(5px);
        pointer-events: none;
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none; /* Non-prefixed version, currently */
      }
    }
  }
`
const ArticleHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0 0 10px;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  line-height: 1.8;
  text-align: left;
  color: #222222;
  display: flex;
  justify-content: space-between;
  @media (max-width: 767px) {
    font-size: 26px;
    line-height: 1.5;
    margin: 0 0 20px;
    max-width: 100%;
    flex-wrap: wrap;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const ProfileNameHeader = styled.div`
  display: flex;
  padding: 0;
  font-family: 'Montserrat-Regular';
  margin: 25px 0px;
  align-items: center;
  &.rtl-ar-content {
    justify-content: flex-end;
  }
  @media (max-width: 767px) {
    margin: 25px 0;
  }
`

const ProfileThumb = styled.div`
  width: 30px;
  height: 30px;
  margin: 0 10px 0 0;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
  &.rtl-ar-content {
    order: 2;
  }
`
const ProfileNameWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  max-width: calc(100% - 50px);
  &.nameWrapAs {
    flex-direction: row;
  }
`

const ProfileName = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0;
  color: #666;
  font-weight: normal;
  cursor: pointer;
  & .asName{
    text-transform: capitalize;
  }
  & .rtl-ar-content {
    display: flex;
  }
  span {
    &.rtl-ar-content {
      order: 1;
    }
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
  &.singleArticle {
    display: flex;
    span {
      margin-right: 10px;
    }
  }
  & .userRoleType {
    text-transform: capitalize;
    cursor: default;
  }
`
const ArticleDescription = styled.p`
  font-style: normal;
  font-size: 18px;
  line-height: 1.8;
  margin: 0 0 5px 0;
  color: #222;
  font-weight: normal;
  img {
    object-fit: cover;
  }
  &.deleted {
    font-style: normal;
  }
  &.rtl-ar-content {
    text-align: right;
  }
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: 1.5;
    font-weight: normal!important;
    object-fit: cover;
    height: auto;
  }
`

const TopButtons = styled.button`
  height: 36px;
  &.follow-btn {
    margin-left: 10px;
    height: 30px;
  }
  margin-left: 10px;
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 0 10px;
  cursor: pointer;
  display: flex;
  align-items: center;
  &.rtl-ar-content {
    order: 1;
  }
  svg {
    margin: 0 5px 0 0;
  }
  :hover{
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    margin: 8px 5px 5px 0;
  }
  @media (max-width: 767px) {
    margin-right: 5px;
    margin-left: 0px;
    height: 30px;
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
  &.btnFollowUnfollow{
    min-width:100px;
    margin-left: 10px;
    height: 30px;
    text-align: center;
    display:block;
  }
  & .loadingFol {
    text-align: center;
    margin: 0 auto ;
    border: 3px solid #000;
    border-radius: 50%;
    border-top: 3px solid #f3f3f3;
    width: 15px;
    height: 15px;
    -webkit-animation: spin 2s linear infinite; /* Safari */
    animation: spin 2s linear infinite;
  }
  @-webkit-keyframes spin {
    0% { -webkit-transform: rotate(0deg); }
    100% { -webkit-transform: rotate(360deg); }
  }
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`

const LeftHead = styled.div`
  display: flex;
  width: 100%;
  @media (max-width: 767px) {
    margin-bottom: 15px;
  }
  &.rtl-ar-content {
    order: 2;
    text-align: right;
    width: auto;
  }
`

const ExhiInfo = styled.div`
  font-style: normal;
  font-size: 24px;
  line-height: normal;
  margin: 0;
  color: #222;
  border: 0;
  padding: 0px 0px 10px;
  font-family: 'Montserrat-Regular';
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const SectionDescription = ({ article, articleType, redirectHandler, loggedInUsername }) => {
  const { t } = useTranslation(['translation', 'articles'])
  const dispatch = useDispatch()

  const [shareDetails, setShareDetails] = useState({
    activityId: '',
    activityType: '',
    username: '',
  })
  const [shareActivityPopup, setShareActivityPopup] = useState(false)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const commentBoxRef = useRef(null)
  const scrollToCommentBox = () => {
    commentBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  const [descLength, setDescLength] = useState() ; 

  useEffect( ()=>{ if (article && article.description) { setDescLength(article.description.length) } }) ; 
  const getSlug = () => {
    if (articleType === 'buzz' || articleType === 'potd' || articleType === 'exhibition') {
      return article.articleSlug
    } else return article._id
  }
  const byUser =
    article && article.userId && article.userId.firstName && article.userId.lastName
      ? `${article.userId.firstName} ${article.userId.lastName} , ${article.userId.userRoleId.roleName}`
      : article.userId && article.userId.firstName
      ? article.userId.firstName
      : article.userId && article.userId.username
      ? article.userId.username
      : ''
  const [title, translateTitle] = useTranslateContent('')
  const [name, translateName] = useState(byUser && 'by ' + byUser)
  const [city, translateCity] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')
  const [description, translateDescription] = useTranslateContent('')
  const [removedImagesArr, setRemovedImagesArr] = useState([])
  const [ userFollowed, setUserFollowed ] = useState( false ) 
  const [ sameUserArticle, setSameUserArtilcle ] = useState( false ) 
  useEffect(() => {
    if (!isEmptyObj(article)) {
      let newCountry
      if ( article.country === "Viet Nam") {
       newCountry = "Vietnam"
      }  else {
        newCountry = article.country
      }
      setUserFollowed( article && article.userId && article.userId.isFollowed )
      
      const parsedStr = article.description ? removeImagesFromStr(article.description, setRemovedImagesArr) : ''
      translateTitle(article && article.title)
      translateName(byUser && 'by ' + byUser)
      translateCity(article.city)
      translateCountry(newCountry)
      translateDescription(parsedStr)
    }
  }, [article, byUser])

  useEffect(()=>{
    setSameUserArtilcle(article && article.userId && article.userId.username === loggedInUsername)
  }, [])

  

  const feedPostType = "newsfeed"
  // Logic for Follow Unfollow User 
  const openLoginPopHandler = () => {
    if (!isLoginToken()) {
      dispatch(closeAllModals())
      dispatch(setLoginPopup(true))
      dispatch(setLoginError(null))
      dispatch(setSocialUserError(null))
    }
  }
  const followUnfollowUser = (toFollow, action) => {
    if ( action === 'unfollow' ) {
      setUserFollowed( false ) 
    } else {
      setUserFollowed( true )
    }
    dispatch(followUnfollow(toFollow, action, 'followers', false, true, t))
  }
  
  
  const setFollowUnfollowBtn = sameUserArticle ? '' : userFollowed ? <TopButtons className="btnFollowUnfollow" onClick={() => followUnfollowUser(article.userId._id, 'unfollow')}>{t(`articles:articleFollowed`)}</TopButtons> : <TopButtons className="btnFollowUnfollow" onClick={() => followUnfollowUser(article.userId._id, 'follow')}>{t(`articles:articleFollow`)}</TopButtons>

  const finaleDate = ( start, end ) => {
    if (  end === '2098-01-01T10:32:00.000Z' ) {
      return 'Permanent'
    }
    return convertDate( start ) + ' - ' + convertDate(end) 
  }

  return (
    <>
      <ModalComponent
        closeOnOutsideClick={true}
        isOpen={shareActivityPopup}
        closeModal={() => setShareActivityPopup(false)}
      >
        <ShareActivity shareDetails={shareDetails} setShareActivityPopup={setShareActivityPopup} viewArticle={true} />
      </ModalComponent>
      <FeatureWrapper>
        {!article.deleted ? (
          <>
            <ArticleHeading
              className={
                appLanguageCode === 'ar' &&
                !(isLoginToken() && article && article.userId && article.userId.username === loggedInUsername)
                  ? 'rtl-ar-content'
                  : ''
              }
            >
              {article && article.title && (
                <LeftHead className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
                  {title ? title : article && article.title}
                </LeftHead>
              )}
              {isLoginToken() && article && article.userId && article.userId.username === loggedInUsername && (
                <TopButtons
                  onClick={() => redirectHandler(`/${articleType}/edit/${article.articleSlug}`)}
                  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
                >
                  <IoPencil /> {t(`articles:buzzListing.edit`)}
                </TopButtons>
              )}
              <TopButtons
                onClick={() => {
                  setShareDetails({
                    activityId: getSlug(),
                    activityType: `${articleType}s`,
                    username: article && article.userId && article.userId.username,
                    feedPostType,
                  })
                  setShareActivityPopup(true)
                }}
              >
                <HiShare /> Share
              </TopButtons>
              
            </ArticleHeading>
            {articleType === 'exhibition' && (
              <ExhiInfo className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
                {city}
                {(country || article.startDate || article.endDate) && ','} {country}{' '}
                { (article.startDate || article.endDate) && ' - '}
                {
                  finaleDate( article.startDate, article.endDate )
                }
                {/* {(article.startDate || article.endDate) && ' - '} {article.startDate && convertDate(article.startDate)}
                {article.endDate && ' - '}
                {article.endDate && convertDate(article.endDate)} */}
              </ExhiInfo>
            )}
            <ProfileNameHeader className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <ProfileThumb
                onClick={() =>
                  article &&
                  article.userId &&
                  article.userId.username &&
                  redirectHandler(`/user/${article.userId.username}`)
                }
                className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
              >
                <img
                  src={
                    article && article.userId && article.userId.profilePicUrl
                      ? createResizeImageUrl(article.userId.profilePicUrl, 50, 50, 'profileCover') +
                        '?' +
                        new Date(article.userId.dateUpdated).getTime()
                      : '/assets/artmo-default.png'
                  }
                  onError={(e) => {
                    const timeSuffix = '?' + new Date(article.userId.dateUpdated).getTime()
                    imageErrorHandler(
                      e,
                      createImageUrl(article.userId.profilePicUrl),
                      '/assets/artmo-default.png',
                      'profileCover',
                      timeSuffix
                    )
                  }}
                  alt=""
                />
              </ProfileThumb>
              <ProfileNameWrap className="nameWrapAs">
                <ProfileName
                  onClick={() =>
                    article &&
                    article.userId &&
                    article.userId.username &&
                    redirectHandler(`/user/${article.userId.username}`)
                  }
                  className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}
                >
                  <span className={appLanguageCode === 'ar' ? 'rtl-ar-content asName' : 'asName'}>{name}</span>
                </ProfileName>
                { 
                  isLoginToken() ? setFollowUnfollowBtn :
                  (<TopButtons className="btnFollowUnfollow" onClick={openLoginPopHandler}>{t(`articles:articleFollow`)}</TopButtons>)
                }
              </ProfileNameWrap>
            </ProfileNameHeader>
           {!isLoginToken() && descLength > 1000 && <MessagePopup className="description articleView" />}              
            <ArticleDescription className={appLanguageCode === 'ar' ? `rtl-ar-content ${!isLoginToken() && descLength > 1000 && 'blurred'}` : `${!isLoginToken() && descLength > 1000 &&  'blurred'}`}>
              {article &&
                article.description &&
                ReactHtmlParser(
                  description
                    ? addImagesInStr(description, removedImagesArr)
                    : replaceWordpressImage(article.description)
                )}
            </ArticleDescription>
          </>
        ) : (
          <ArticleDescription className={appLanguageCode === 'ar' ? 'rtl-ar-content deleted' : 'deleted'}>
            {t(`articles:articleNotAvailable`)}
          </ArticleDescription>
        )}
        <LikesSection
          username={article && article.userId && article.userId.username}
          shareActivityPopup={shareActivityPopup}
          setShareDetails={setShareDetails}
          setShareActivityPopup={setShareActivityPopup}
          likes={article && Array.isArray(article.likes) && article.likes ? article.likes : []}
          comments={article && Array.isArray(article.comments) && article.comments ? article.comments : []}
          scrollToCommentBox={scrollToCommentBox}
          userThumbnailsCount={5}
          postType="newsfeed"
          activityId={article._id}
          activityType={`${articleType}s`}
          shareSlug={getSlug()}
          articleViewPage={true}
        />
        <CommentsSection
          comments={article && Array.isArray(article.comments) && article.comments ? article.comments : []}
          postType="newsfeed"
          activityId={article._id}
          activityType={`${articleType}s`}
          activityOwnerInfo={article && !isEmptyObj(article.userId) && article.userId}
          commentBoxRef={commentBoxRef}
          showInLightbox={false}
          articleViewPage={true}
        />
      </FeatureWrapper>
    </>
  )
}

SectionDescription.propTypes = {
  article: PropTypes.object,
  articleType: PropTypes.string,
  redirectHandler: PropTypes.func,
  loggedInUsername: PropTypes.string,
}

export default SectionDescription
