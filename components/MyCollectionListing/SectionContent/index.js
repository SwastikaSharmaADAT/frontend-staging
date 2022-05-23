import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { getMyCollections } from '../../../modules/collection/collectionSlice'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import { getUserData } from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { isLoginToken } from '../../../utilities/authUtils'
import { useTranslation } from 'next-i18next'
import SliderContainer from '../SliderContainer'
import { getLatestArtworks } from '../../../modules/landingPage/landingPageSlice'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import ListingContent from './ListingContent'

const InviteContentWrapper = styled.div`
  position: relative;
  margin: 14px 0 17px;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const SliderContainerWrap = styled.div`
  position: relative;
  margin: 30px 0;
  padding: 0px 0 0;
  width: 100%;
  .react-multiple-carousel__arrow {
    display: none;
  }
  .react-multi-carousel-list {
    padding: 0px 0 10px;
    @media (max-width: 767px) {
      padding: 10px 0 10px;
      &.center-align {
        justify-content: center;
      }
    }
  }
`

const NoArtworks = styled.div`
  background: #fff;
  padding: 20px;
`

const NoArtHeader = styled.div`
  font-size: 24px;
  text-align: center;
`

const NoArtSub = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: 15px;

`

const UserListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .infinite-scroll-component {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .end-message-container {
    margin: 0 auto;
  }
`

const GhostStyling = styled.div`
  position: relative;
  max-width: 429px;
  width: 100%;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 30px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 30px;
  }
`

const SectionContent = ({ setRightSection }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const {t} = useTranslation('translation')

  const latestArtworks = useSelector((state) => state.root.landingPage.latestArtworks)
  useEffect(() => {
    dispatch(getLatestArtworks())
  }, [dispatch])
  const myCollectionsList = useSelector((state) => state.root.collection.myCollections)

  const userData = useSelector((state) => state.root.myProfile.userData)
  
  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])


  useEffect(() => {
    if (userData && userData.uuid) dispatch(getMyCollections({userId: userData.uuid}))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userData])


  return (
    <>
      <InviteContentWrapper>
        {myCollectionsList !== null && myCollectionsList.length === 0 ?
        <NoArtworks>
          <NoArtHeader>You have no artworks yet!</NoArtHeader>
          <NoArtSub>Check out some of the most recent work on ARTMO: </NoArtSub>
          <SliderContainerWrap>
            <SliderContainer  latestArtworks={latestArtworks}  />
          </SliderContainerWrap>
        </NoArtworks> : 
        <>
          {myCollectionsList &&
          myCollectionsList.length > 0 &&
          myCollectionsList.map((art,ind) => (
            <ListingContent
              ind={ind}
              artwork={art}
              key={art._id}
            />
          ))}
        </>
        }
      </InviteContentWrapper>
    </>
  )
}
SectionContent.propTypes = {
  setRightSection: PropTypes.func,
}
export default SectionContent
