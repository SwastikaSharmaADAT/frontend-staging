import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { userPages } from '../../../modules/newsFeed/newsFeedSlice'
import { switchAnAccount } from '../../../modules/pages/pagesSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { checkOtherUser } from '../../../utilities/otherProfile'
import SingleArtwork from './SingleArtwork'
import { useTranslation } from 'next-i18next'

const ManageArtwork = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {t} =useTranslation(['translation'])
  const { username } = router.query

  /**fetch pages detail from slice */
  const userPagesDetail = useSelector((state) => state.root.newsFeed.userPagesDetail)

  /** Get account type from local storage */
  const userInfo = localStorage.getItem('user_info')
  const parsedUserInfo = userInfo && JSON.parse(userInfo)
  const { accountType } = parsedUserInfo

  /** Method to switch to page account */
  const switchToPageHandler = (pageUserId) => {
    if (accountType === 'personal' && !checkOtherUser(username)) {
      dispatch(switchAnAccount(pageUserId,t))
    }
  }

  /** Method to redirect to page profile */
  const redirectToPageProfile = (pageUsername) => {
    router.push(`/user/${pageUsername}`)
  }

  useEffect(() => {
    /**dispatch reducer to call API on component mount */
    if(username)
      dispatch(userPages(username))
  }, [dispatch, username])

  return (
    <>
      {userPagesDetail &&
        userPagesDetail.map((page) => {
          if (!isEmptyObj(page) && page.pageUserId !== null && !isEmptyObj(page.pageUserId)) {
            return (
              <SingleArtwork
                page={page}
                redirectToPageProfile={redirectToPageProfile}
                switchToPageHandler={switchToPageHandler}
                username={username}
              />
            )
          } else {
            return null
          }
        })}
    </>
  )
}

export default ManageArtwork
