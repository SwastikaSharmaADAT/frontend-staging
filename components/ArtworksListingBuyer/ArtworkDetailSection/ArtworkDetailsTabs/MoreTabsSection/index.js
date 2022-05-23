import { unwrapResult } from '@reduxjs/toolkit'
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import { getMoreVendorArtworks, setAllArtists } from '../../../../../modules/subscription/subscriptionSlice'
import Button from '../../../../UI/Button'
import ListingContent from './ListingContent'
import useTranslateContent from '../../../../../hooks/useTranslateContent'
import { getArray, getString } from '../../../../../utilities/getTranslatedContent'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'


const ListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 15px 0;
  width: 100%;
  .DefaultMsg {
    line-height: 1.7;
    color: #666;
    font-size: 16px;
    margin: 40px 0;
  }
  .MasonryGrid {
    > div {
      width: 100%!important;
    }
  }
`

const ProfileBtnWrap = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 20px 0;
  padding: 0;
  button {
    width: auto;
    height: auto;
    padding: 8px 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    font-family: 'Montserrat-Regular';
  }
`

const MoreTabsSection = ({
  currency,
  conversionRate,
  decimalSeparator,
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  insertToTitle,
  setArtist,
  artworkDetail,
}) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { artworkSlug } = router.query
  const { t } = useTranslation(['artworks','translation'])
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)


  const [moreArtworks, setMoreArtwoks] = useState([])

  useEffect(() => {
    const fetchMoreArtworks = async () => {
      const resultAction = await dispatch(getMoreVendorArtworks({data:{ artworkId: artworkSlug },t}))
      const result = await unwrapResult(resultAction)
      if (result&&result.success) setMoreArtwoks(result.data.moreArtworks)
    }
    if(artworkSlug)fetchMoreArtworks()
  }, [artworkSlug, dispatch])

  const showAllArtworksFromVendor = () => {
    const artistId = artworkDetail && artworkDetail.userId && artworkDetail.userId._id
    const artistName =
      artworkDetail && artworkDetail.userId && `${artworkDetail.userId.firstName} ${artworkDetail.userId.lastName}`

    const artistUserObj = {
      firstName: artworkDetail && artworkDetail.userId && artworkDetail.userId.firstName,
      fullName: artistName,
      lastName: artworkDetail && artworkDetail.userId && artworkDetail.userId.lastName,
      username: artworkDetail && artworkDetail.userId && artworkDetail.userId.username,
      _id: artistId,
    }
    insertToTitle(artistName)
    setArtist([artistId])
    dispatch(setAllArtists([artistUserObj]))
    setCallUseEffect(!callUseEffect)
    setInitialPageLoad(true)
  }
  const [title, translateTitle] = useTranslateContent('')

  let titleString = ''

  if(moreArtworks.length && lang !== 'en')  {  
    titleString = getString(lang,moreArtworks,'title')
  }

  useEffect(()=>{
      if(titleString && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])

  return (
    <>
      <ListingWrap>
        <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 479: 1, 600: 2, 750: 3, 900: 3, 1024: 4 }}>
        {moreArtworks && moreArtworks.length > 0 ? (
          <Masonry className="MasonryGrid">
                {moreArtworks &&
                  moreArtworks.length > 0 &&
                  moreArtworks.map((art,ind) => (
                    <ListingContent
                      ind={ind}
                      titles={getArray(title)}
                      artwork={art}
                      key={art._id}
                      currency={currency}
                      conversionRate={conversionRate}
                      decimalSeparator={decimalSeparator}
                    />
                  ))}
              </Masonry>
            ) : (
              <span className="DefaultMsg">{t(`tabsSection.noMoreArtworksAdded`)}</span>
            )}
        </ResponsiveMasonry>
        <ProfileBtnWrap>
          <Button onClick={() => showAllArtworksFromVendor()}>
            {t(`tabsSection.showAllArtworksFrom`)}{' '}
            {artworkDetail &&
            artworkDetail.userId &&
            artworkDetail.userId.firstName &&
            artworkDetail.userId.lastName
              ? `${artworkDetail.userId.firstName} ${artworkDetail.userId.lastName}`
              : artworkDetail.userId && artworkDetail.userId.username
                ? artworkDetail.userId.username
                : ''}
          </Button>
        </ProfileBtnWrap>
      </ListingWrap>
    </>
  )
}

MoreTabsSection.propTypes = {
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  callUseEffect: PropTypes.bool,
  setCallUseEffect: PropTypes.func,
  setInitialPageLoad: PropTypes.func,
  insertToTitle: PropTypes.func,
  setArtist: PropTypes.func,
  artworkDetail: PropTypes.object,
}

export default MoreTabsSection
