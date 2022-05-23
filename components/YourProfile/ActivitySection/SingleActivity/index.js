import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { MdEdit } from 'react-icons/md'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { dateFromNow } from '../../../../utilities/convertDate'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'
import { useRouter } from 'next/router'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'

const PostWrap = styled.div`
  position: relative;
  margin: 0 0 40px;
  width: 100%;
  max-width: 33.33%;
  display: flex;
  .edit{
    position: absolute;
    right: 15px;
    cursor: pointer;
  }
  @media (min-width: 1025px) and (max-width: 1210px) {
    max-width: 100%;
    margin: 0 0 25px;
  }
  @media (max-width: 991px) {
    max-width: 49%;
    margin: 0 0 35px;
  }
  @media (max-width: 479px) {
    margin: 0 0 25px;
    max-width: 100%;
  }
  :last-child {
    margin: 0;
  }
  :nth-last-child(2) {
    margin: 0;
    @media (min-width: 1025px) and (max-width: 1210px) {
      margin: 0 0 25px;
    }
    @media (max-width: 479px) {
      margin: 0 0 25px;
    }
  }
`
const PostIcon = styled.div`
  width: 49px;
  height: 50px;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const PostContent = styled.div`
  width: calc(100% - 70px);
  font-size: 16px;
  line-height: 1.5;
  padding-right: 10px;
  color: #222222;
  margin: 0 0 0 8px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: 1.5;
  }
`
const PostDescription = styled.div`
  cursor: pointer;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  .DefaultTitle {
    font-style: normal;
    color: #666;
  }
  p,
  span {
    margin: 0;
    padding: 0;
  }
`

const PostReactionsDiv = styled.div`
  font-size: 14px;
  line-height: 17px;
  color: #666;
  margin: 7px 0 0;
  @media (max-width: 767px) {
    line-height: normal;
  }
`
function SingleActivity({ activity, renderDecription, redirectHandler,setAddPostModal,setEditData,setEditType }) {
  const { t } = useTranslation('profile')
  const router=useRouter()

  const [date, translateDate] =useTranslateContent('')
  const [description, translateDecription] =useTranslateContent('')
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(() => {
    if(!isEmptyObj(activity)){
      translateDate(dateFromNow(activity && activity.dateCreated))
      translateDecription(activity && activity.description)
    }
  }, [activity])
  
  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const editHandler=(e)=>{
    e.stopPropagation()
      if (activity.type === 'userPosts') {
        setEditData(activity)
        setEditType('userPosts')
        setAddPostModal(true)
      } else {
        router.push(`/${activity.type.slice(0, -1)}/edit/${activity.articleSlug}`)
      }
    
  }
  const ownerOfPost=activity&&activity.userId.username===loggedInUsername
  return (
    <PostWrap key={activity._id}>
      {/* {ownerOfPost&&<MdEdit onClick={editHandler} className="edit"/>} */}
      <PostIcon>
        <img
          src={
            activity && activity.picUrl && activity.picUrl.pictureUrl
              ? createResizeImageUrl(activity.picUrl.pictureUrl, 150, 150, 'mediaLibrary') +
              '?' +
              new Date(activity.dateUpdated).getTime()
              : '/assets/artmo-default.png'
          }
          onClick={() => redirectHandler(activity)}
          onError={(e) => {
            imageErrorHandler(e, createImageUrl(activity.picUrl.pictureUrl), '/assets/artmo-default.png', 'mediaLibrary', '')
          }}
          alt="Post"
        />
      </PostIcon>
      <PostContent>
        <PostDescription onClick={() => redirectHandler(activity)}>{description ? renderDecription(activity, description) : activity && renderDecription(activity, activity.description)}</PostDescription>
        <PostReactionsDiv>
          {date ? date : activity && dateFromNow(activity.dateCreated)} •{' '}
          <span>
            {activity.likes} {t(`activity.reactions`)}
          </span>
        </PostReactionsDiv>
      </PostContent>
    </PostWrap>
  )
}
SingleActivity.propTypes = {
  activity: PropTypes.object,
  renderDecription: PropTypes.func,
  redirectHandler: PropTypes.func,
}
export default SingleActivity