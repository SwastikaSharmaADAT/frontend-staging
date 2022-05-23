import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { deleteActivity } from '../../../modules/newsFeed/newsFeedSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { countriesUsingDecimal } from '../../../utilities/decimalUsingCountries'
import { currenciesList } from '../../../utilities/currenciesList'
import { decimalSeparatorMethod } from '../../../utilities/decimalSeparator'
import { convertDate } from '../../../utilities/convertDate'
import { stripNonTextTags } from '../../../utilities/parseHtmlUtils'
import ModalComponent from '../../UI/Modal'
import useTranslateContent from '../../../hooks/useTranslateContent'
import ImagePost from './ImagePost'
import PostHeader from './PostHeader'
import LikesSection from './LikesSection'
import CommentsSection from './CommentsSection'
import VideoPost from './VideoPost'
import ArtworkPost from './ArtworkPost'
import AlbumPost from './AlbumPost'
import ShareActivity from './ShareActivity'
import Linkify from 'react-linkify'
import RightSideAds from '../../YourProfile/RightSideAds'
import GiftCardSection from '../../YourProfile/GiftCardSection'

const SinglePostWrap = styled.div`
  display: inline-block;
  width: 100%;
  position: relative;
  padding: 0;
  margin: 0 auto 17px;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  background: #fff;
`

const PostText = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: 1.4;
  margin: 0;
  color: #222;
  border: 0;
  border-top: 1px solid #eee;
  padding: 20px 15px;
  font-family: 'Montserrat-Regular';
  &:empty {
    padding: 0;
  }
  @media (max-width: 1100px) {
    font-size: 15px;
    line-height: 1.4;
  }
  &.smallFont {
    font-size: 15px;
    line-height: 1.4;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const PostDiv = styled.div`
  text-align: center;
  padding: 0 15px 20px;
  margin: 30px -15px 0;
  border-bottom: 1px solid #eee;
`

const PostSubText = styled.div`
  font-style: normal;
  font-size: 18px;
  line-height: normal;
  margin: 0;
  color: #222;
  border: 0;
  padding: 00px 15px 10px;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

const PostDespText = styled.div`
  font-style: normal;
  font-size: 16px;
  line-height: normal;
  margin: 0 0 5px;
  color: #222;
  border: 0;
  padding: 00px 15px 15px;
  font-family: 'Montserrat-Regular';
  overflow: hidden;
  max-height: 2.8em;
  @media (max-width: 767px) {
    font-size: 14px;
  }
  p,
  span {
    padding: 0;
    margin: 0;
    line-height: 2;
  }
  blockquote {
    margin: 0;
  }
  a {
    cursor: pointer;
    margin: 0 0 0 10px;
  }
`
const SeeMoreWrapper = styled.span`
  font-size: 14px;
  color: #666;
  padding: 0 15px;
  cursor: pointer;
`

const RenderPostDescription = ({ info, postType, currency, conversionRate, decimalSeparator }) => {
  const { t } = useTranslation('newsFeed')
  const descriptionRef = useRef(null)
  const router = useRouter()

  const [content, translateContent] =useTranslateContent('')
  const [artMaterial, translateArtMaterial] =useTranslateContent('')
  const [title, translateTitle] =useTranslateContent('')
  const [country, translateCountry] =useTranslateContent('')
  const [city, translateCity] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  useEffect(() => {
    if(!isEmptyObj(info)){
      translateContent(info.content)
      translateArtMaterial(info.artMaterial)
      translateTitle(info.title)
      translateCountry(info.country)
      translateCity(info.city)
      translateDescription(info.description)
    }
  }, [
    info.content,
    info.artMaterial,
    info.title,
    info.country,
    info.city,
    info.description
  ])

  const getDescHeight = () =>
    descriptionRef && descriptionRef.current && descriptionRef.current.getBoundingClientRect().height

  const redirectHandler = (route) => {
    router.push(route)
  }

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  const formattedPrice = (price) => {
    if (price.toString().includes(',')) {
      return price.toString().replace(',', '.')
    } else {
      return price
    }
  }

  const renderLimitedDescription = (text) => (
    <>
      <PostDespText>
        <span ref={descriptionRef}>{ReactHtmlParser(text, { transform: stripNonTextTags })}</span>
      </PostDespText>
      {getDescHeight() > 28 && (
        <SeeMoreWrapper onClick={() => redirectHandler(`/${info.newsFeedType.slice(0, -1)}/${info.articleSlug}`)}>
          {t(`singlePost.seeMore`)}
        </SeeMoreWrapper>
      )}
    </>
  )
  const finaleDate = ( start, end ) => {
    if (  end === '2098-01-01T10:32:00.000Z' ) {
      return 'Permanent'
    }
    return convertDate( start ) + ' - ' + convertDate(end) 
  }      
  const renderContent = (info, postType) => {

    const contentLength = title ? title.length : info && info.title && info.title.length

    if (postType === 'newsfeed') {
      if (info.newsFeedType === 'userPosts') {
        return <PostText className={(appLanguageCode === 'ar' ? 'rtl-ar-content' : '') + (contentLength > 200 ? ' smallFont' : '')}><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{title ? title : info && info.title}</Linkify></PostText>
      } else if (info.newsFeedType === 'videos') {
        return <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{description ? description : info && info.description}</PostText>
      } else if (info.newsFeedType === 'buzzs' || info.newsFeedType === 'potds') {
        return (
          <>
            <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{title ? title : info && info.title}</PostText>
            {description ? renderLimitedDescription(description): info && renderLimitedDescription(info.description)}
          </>
        )
      } else if (info.newsFeedType === 'exhibitions') {
        return (
          <>
            <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{title ? title : info && info.title}</PostText>
            <PostSubText>
              {city ? city :info && info.city}, {country ? country : info && info.country}
            </PostSubText>
            <PostSubText>
              {
                finaleDate( info.startDate, info.endDate )
              }
              {/* {convertDate(info.startDate)} - {convertDate(info.endDate)} */}
            </PostSubText>
            {renderLimitedDescription(description ? description : info && info.description)}
          </>
        )
      } else if (info.newsFeedType === 'artworks') {
        return (
          <>
            <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{title ? title : info && info.title}</PostText>
            <PostSubText>{artMaterial ? artMaterial : info && info.artMaterial}</PostSubText>
            <PostSubText>
              {t(`singlePost.price`)}:{' '}
              {!info.priceOnRequest
                ? `${getCurrencyDetail(currency).symbol} ${decimalSeparatorMethod(
                    (formattedPrice(info.price) * conversionRate).toFixed(2),
                    decimalSeparator
                  )}`
                : t(`singlePost.priceOnRequest`)}
            </PostSubText>
          </>
        )
      } else if (info.newsFeedType === 'albums') {
        return <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}></PostText>
      }
    } else if (postType === 'groupfeed') {
      return <PostText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}><Linkify componentDecorator={(decoratedHref, decoratedText, key) => (<a target="blank" rel="nofollow noopener" href={decoratedHref} key={key}>{decoratedText}</a>)}>{content ? content : info && info.content}</Linkify></PostText>
    }
  }

  return <>{renderContent(info, postType)}</>
}

RenderPostDescription.propTypes = {
  info: PropTypes.object,
  postType: PropTypes.string,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}

const SinglePost = ({  setAddPostModal,
  setAddVideoModal,item, postType, groupLoggedInUserType, singleActivityType,setAddAlbumModal,setEditType,setEditData, index }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['translation', 'successResponses'])
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [decimalSeparator, setDecimalSeparator] = useState('comma')
  const [shareDetails, setShareDetails] = useState({
    activityId: '',
    activityType: '',
    username: '',
  })
  const [shareActivityPopup, setShareActivityPopup] = useState(false)

  const commentBoxRef = useRef(null)
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const userData = useSelector((state) => state.root.myProfile.userData)
  const userCountry = userData && userData.country && userData.country.value ? userData.country.value : 'Germany'

  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

  useEffect(() => {
    if (!isEmptyObj(currentCurrency) && currentCurrency.currency && currentCurrency.conversionRate) {
      setCurrency(currentCurrency.currency)
      setConversionRate(currentCurrency.conversionRate)
    } else {
      if (localCurrency) {
        if (!isEmptyObj(localCurrency) && localCurrency.currency && localCurrency.conversionRate) {
          setCurrency(localCurrency.currency)
          setConversionRate(localCurrency.conversionRate)
        } else {
          setCurrency('EUR')
          setConversionRate(1)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency])

  const renderPostMedia = (info, postType) => {
    if (postType === 'newsfeed') {
      if (
        info.newsFeedType === 'userPosts' ||
        info.newsFeedType === 'buzzs' ||
        info.newsFeedType === 'potds' ||
        info.newsFeedType === 'exhibitions'
      ) {
        return !isEmptyObj(info.picUrl) ? (
          <ImagePost
            pic={info.picUrl.pictureUrl}
            picObj={info.picUrl}
            type={info.newsFeedType}
            activityId={info.articleSlug}
          />
        ) : null
      } else if (info.newsFeedType === 'videos') {
        return <VideoPost videoUrl={info.url} video={info} />
      } else if (info.newsFeedType === 'artworks') {
        return info &&
          info.artPhotos &&
          info.artPhotos.length > 0 &&
          !isEmptyObj(info.artPhotos[0]) &&
          info.artPhotos[0].pictureUrl ? (
          <ArtworkPost picUrl={info.artPhotos[0].pictureUrl} info={info} />
        ) : null
      } else if (info.newsFeedType === 'albums') {
        return <AlbumPost postInfo={info} singleActivityType={singleActivityType} />
      }
    } else if (postType === 'groupfeed') {
      return !isEmptyObj(info.picUrl) ? (
        <ImagePost pic={info.picUrl.pictureUrl} picObj={info.picUrl} type="userPosts" />
      ) : null
    }
  }
  const handleClickOutside = () => {
    setIsMenuOpen(false)
  }

  const toggleActivityMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToCommentBox = () => {
    commentBoxRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const deleteUserActivity = () => {
    dispatch(deleteActivity(item._id, item.newsFeedType, singleActivityType, t))
  }

  const getSlug = () => {
    if (
      postType === 'newsfeed' &&
      (item.newsFeedType === 'buzzs' || item.newsFeedType === 'potds' || item.newsFeedType === 'exhibitions')
    ) {
      return item.articleSlug
    } else if (postType === 'newsfeed' && item.newsFeedType === 'artworks') {
      return item.productSlug
    } else return item._id
  }
  return (
    <>
    { index > 0 && index % 10 === 0 ? <SinglePostWrap><RightSideAds rate={1}/></SinglePostWrap> : <></>}
    { index > 0 && (index+5) % 10 === 0 ? <SinglePostWrap><GiftCardSection className="news-feed" /></SinglePostWrap> : <></>}
      <SinglePostWrap>
        <PostHeader
          setEditData={setEditData}
          setEditType={setEditType}
          setAddAlbumModal={setAddAlbumModal}
          setAddPostModal={setAddPostModal}
          setAddVideoModal={setAddVideoModal}
          handleClickOutside={handleClickOutside}
          toggleActivityMenu={toggleActivityMenu}
          isMenuOpen={isMenuOpen}
          userInfo={item && !isEmptyObj(item.userId) && item.userId}
          postDate={item.dateCreated}
          loggedInUsername={loggedInUsername}
          deleteUserActivity={deleteUserActivity}
          setIsMenuOpen={setIsMenuOpen}
          enableDelete={true}
          postType={postType}
          groupLoggedInUserType={groupLoggedInUserType}
          item={item}
        />
        <RenderPostDescription
          info={item}
          postType={postType}
          currency={currency}
          conversionRate={conversionRate}
          decimalSeparator={decimalSeparator}
        />
        <PostDiv>{renderPostMedia(item, postType)}</PostDiv>
        <LikesSection
          username={item && item.userId && item.userId.username}
          shareActivityPopup={shareActivityPopup}
          setShareDetails={setShareDetails}
          setShareActivityPopup={setShareActivityPopup}
          likes={item && Array.isArray(item.likes) && item.likes}
          comments={item && Array.isArray(item.comments) && item.comments}
          activityId={item._id}
          activityType={postType === 'newsfeed' ? item.newsFeedType : 'userPosts'}
          scrollToCommentBox={scrollToCommentBox}
          userThumbnailsCount={5}
          postType={postType}
          singleActivityType={singleActivityType}
          shareSlug={getSlug()}
        />
        <CommentsSection
          comments={item && Array.isArray(item.comments) && item.comments}
          activityId={item._id}
          activityType={postType === 'newsfeed' ? item.newsFeedType : 'userPosts'}
          activityOwnerInfo={item && !isEmptyObj(item.userId) && item.userId}
          commentBoxRef={commentBoxRef}
          showInLightbox={false}
          postType={postType}
          singleActivityType={singleActivityType}
        />
      </SinglePostWrap>
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

SinglePost.propTypes = {
  item: PropTypes.object,
  postType: PropTypes.string,
  groupLoggedInUserType: PropTypes.string,
  singleActivityType: PropTypes.bool,
  setAddAlbumModal: PropTypes.func,
  setEditType: PropTypes.func,
  setEditData: PropTypes.func,
  setAddPostModal: PropTypes.func,
  setAddVideoModal: PropTypes.func,
  index: PropTypes.number
}

export default SinglePost
