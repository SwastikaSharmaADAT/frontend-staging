import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'

const DropdownContent = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  background-color: #fff;
  min-width: 120px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
  top: 40px;
  overflow: visible;
  right: 0;
  @media (max-width: 767px) {
    right: inherit;
    left: inherit;
    top: 35px;
    right: 0;
  }
  @media (max-width: 340px) {
    right: 0;
    left: inherit;
    top: 35px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    right: 0;
    top: 46px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 0;
    padding: 0;
    width: 100%;
    text-align: left;
  }
  li {
    color: #666;
    padding: 8px 10px;
    text-decoration: none;
    font-size: 13px;
    border-bottom: 1px solid #eee;
  }
  li:hover {
    background-color: #ddd;
    cursor: pointer;
  }
`
const PostMenu = (props) => {
  const { t } = useTranslation('newsFeed')
  const router=useRouter()

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const deleteHandler = (e) => {
    e.stopPropagation()
    props.setConfirmBox(true)
    props.setIsMenuOpen(false)
  }

  const editHandler = (e) => {
    e.stopPropagation()
    props.setEditData(props.item)
    props.setEditType(props.item.newsFeedType)
    if(props.item.newsFeedType==='albums')
    props.setAddAlbumModal(true)
    else if(props.item.newsFeedType==='userPosts')
    props.setAddPostModal(true)
    else if(props.item.newsFeedType==='videos')
    props.setAddVideoModal(true)
    else if(props.item.newsFeedType==='artworks')
    router.push(`/artworks/edit/${props.item.productSlug}`)
    else
    router.push(`/${props.item.newsFeedType.slice(0, -1)}/edit/${props.item.articleSlug}`)
    
  }
  const editableActivities=['albums','userPosts','videos','buzzs','potds','exhibitions','artworks']
  const editCurrent=props.item&&props.item.newsFeedType&&editableActivities.includes(props.item.newsFeedType)
  const ownerOfPost=props.item&&props.item.userId.username===loggedInUsername
  return (
    <>
      {!props.showConfirmBox && (
        <ClickAwayListener onClickAway={() => props.handleClickOutside()}>
        <DropdownContent>
          
            <ul>
              <li onClick={(e) => deleteHandler(e)}>{t(`singlePost.delete`)}</li>
            </ul>
          
          {editCurrent&&ownerOfPost&&props.postType!=='groupfeed'&&(
            <ul>
            <li onClick={editHandler}>{t(`singlePost.edit`)}</li>
          </ul>
          )
          }
        </DropdownContent>
        </ClickAwayListener>
      )}
    </>
  )
}

PostMenu.propTypes = {
  handleClickOutside: PropTypes.func,
  setIsMenuOpen: PropTypes.func,
  setConfirmBox: PropTypes.func,
  showConfirmBox: PropTypes.bool,
  item: PropTypes.object,
  setAddAlbumModal: PropTypes.func,
  setEditType: PropTypes.func,
  setEditData: PropTypes.func,
  postType: PropTypes.string,
}

export default PostMenu
