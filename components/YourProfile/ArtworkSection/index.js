import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import { getUserArts, getUserLikedArts } from '../../../modules/profile/myProfileSlice'
import { setAllArtists } from '../../../modules/subscription/subscriptionSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import showSection from '../../../utilities/showSection'
import SectionHeader from './../SeeAllAddSectionHeader'
import SectionContent from './SectionContent'

const ArtworkSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px 0;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const ArtworkSection = ({ liked, refObject, currency, conversionRate, decimalSeparator }) => {
  const { t } = useTranslation('profile')
  const router = useRouter()

  const dispatch = useDispatch()
  const { username } = router.query
  const userArtworks = useSelector((state) => state.root.myProfile.userArtworks)
  const userLikedArtworks = useSelector((state) => state.root.myProfile.userLikedArtworks)
  const myProfile = useSelector((state) => state.root.myProfile)
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    if (isLoginToken()) {
      dispatch(getUserArts(username))
      dispatch(getUserLikedArts(username))
    }
  }, [dispatch, username])

  const addHandler = () => {
    router.push(`/artworks/add`)
  }

  const seeAllHandler = () => {
    const params = router.query
    const userId = userDataState && userDataState.uuid

    if (userDataState && userDataState.userRole === 'artist') {
      const userFullName = userDataState && `${userDataState.firstName} ${userDataState.lastName}`
      const userObj = {
        firstName: userDataState && userDataState.firstName,
        fullName: userFullName,
        lastName: userDataState && userDataState.lastName,
        username: username,
        _id: userId,
      }
      dispatch(setAllArtists([userObj]))
      const artistIdArr = [userId]

      params.artist = JSON.stringify(artistIdArr)
      router.push({ pathname: '/artworks', query: params })
    } else if (userDataState && userDataState.userRole === 'member') {
      dispatch(setAllArtists([]))
      params.member = JSON.stringify(userId)
      router.push({ pathname: '/artworks', query: params })
    }
  }

  return (
    <>
      {showSection(myProfile, liked ? 'likedArtworks' : 'artworks') ? (
        <div
          ref={liked ? refObject.LikedArtworkSectionRef : refObject.ArtworkSectionRef}
          id={liked ? 'likedArtworks' : 'artworks'}
        >
          <ArtworkSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
            <SectionHeader
              heading={liked ? t(`artwork.likedArtworks`) : t(`artwork.title`)}
              userData={userDataState}
              addHandler={addHandler}
              type={'artwork'}
              seeAllHandler={seeAllHandler}
              hideSeeAllBtn={(userArtworks && userArtworks.length === 0) || liked ? true : false}
              hideAddBtn={liked ? true : false}
            />
            <SectionContent
              userArtworks={liked ? userLikedArtworks : userArtworks}
              currency={currency}
              conversionRate={conversionRate}
              decimalSeparator={decimalSeparator}
            />
          </ArtworkSectionWrap>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

ArtworkSection.propTypes = {
  liked: PropTypes.bool,
  refObject: PropTypes.object,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}
export default ArtworkSection
