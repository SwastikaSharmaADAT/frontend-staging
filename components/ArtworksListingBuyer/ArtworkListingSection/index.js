import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import BuyerArtworksListSkeleton from '../../UI/GhostLoader/BuyerArtworksListSkeleton'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import { setArtworksListLoader, allArtworksListing } from '../../../modules/subscription/subscriptionSlice'
import { ListingWrap, GhostStyling } from '../styled.js'
import ListingContent from './ListingContent'
import { setSortUsingDay } from '../../../utilities/artworkSort'
import GiftCardSection from '../../YourProfile/GiftCardSection'
import { isLoginToken } from '../../../utilities/authUtils'

const ArtworkListingSection = ({
  sellerType,
  setSellerType,
  artworkType,
  setArtworkType,
  country,
  seriesDetails,
  setCountry,
  timePeriod,
  setTimePeriod,
  setSeriesDetails,
  medium,
  setMedium,
  genre,
  setGenre,
  hasMore,
  setHasMore,
  obj,
  setPrice,
  setPosition,
  artist,
  sizeFilter,
  setSizeFilter,
  setArtist,
  search,
  setSearch,
  subjects,
  setSubjects,
  member,
  setMember,
  sort,
  setSort,
  redirectFromDetails,
  setRedirectFromDetails,
  currency,
  conversionRate,
  decimalSeparator,
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  recallApi,
  setRecallApi,
  setObj,
  setLength,
  showWishlistedArtworks,
  setWishlistedArtworks
}) => {
  const router = useRouter()
  const dispatch = useDispatch()

  const artworksList = useSelector((state) => state.root.subscription.artworksList)
  const artworksListCount = useSelector((state) => state.root.subscription.artworksListCount)
  const loading = useSelector((state) => state.root.subscription.artworksListLoader)
  const artworkLoading = useSelector((state) => state.root.subscription.artworkLoading)

  const [load, setLoad] = useState(false)

  const artworksLimit = 25

  useEffect(() => {
    const params = router.query
    if (router.isReady && !params.sort) {
      //const options = ['mostLiked', 'random']
      setSort(setSortUsingDay())
      setCallUseEffect(!callUseEffect)
      setInitialPageLoad(true)
    }
    if ( params.pageType) {
      setWishlistedArtworks( true )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady, router.query])

  useEffect(() => {
    dispatch(setArtworksListLoader(true))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  /**UseEffect is called initially */
  useEffect(() => {
    const params = router.query
    const srch = params.search
    if (router.isReady) {
      if (srch) setSearch(JSON.parse(srch))

      const sellTyp = params.sellerType
      if (sellTyp) setSellerType(JSON.parse(sellTyp))

      const artTyp = params.artworkType
      if (artTyp) setArtworkType(JSON.parse(artTyp))

      const cty = params.country
      if (cty) setCountry(JSON.parse(cty))

      const tmp = params.timePeriod
      if (tmp) setTimePeriod(JSON.parse(tmp))

      const serData = params.seriesDetails
      if (serData) setSeriesDetails(JSON.parse(serData))

      const med = params.medium
      if (med) setMedium(JSON.parse(med))

      const gen = params.genre
      if (gen) setGenre(JSON.parse(gen))

      const sub = params.subjects
      if (sub) setSubjects(JSON.parse(sub))

      const memberFilter = params.member
      if (memberFilter) setMember(JSON.parse(memberFilter))

      const le = params.lengthEnd
      if (le) setSizeFilter({ ...sizeFilter, lengthEnd: JSON.parse(le) })

      const ls = params.lengthStart
      if (ls) setSizeFilter({ ...sizeFilter, lengthStart: JSON.parse(ls) })

      const ws = params.widthStart
      if (ws) setSizeFilter({ ...sizeFilter, widthStart: JSON.parse(ws) })

      const we = params.widthEnd
      if (we) setSizeFilter({ ...sizeFilter, widthEnd: JSON.parse(we) })

      const hs = params.heightStart
      if (hs) setSizeFilter({ ...sizeFilter, heightStart: JSON.parse(hs) })

      const he = params.heightEnd
      if (he) setSizeFilter({ ...sizeFilter, heightEnd: JSON.parse(he) })

      const prc = params.price
      if (prc) {
        setPosition([JSON.parse(prc)[2], JSON.parse(prc)[3]])
        setPrice(JSON.parse(prc))
      }

      const art = params.artist
      if (art) setArtist(JSON.parse(art))

      const srt = params.sort
      if (srt) setSort(JSON.parse(srt))
      if (
        !artworkLoading &&
        !recallApi &&
        (srch ||
          sellTyp ||
          cty ||
          med ||
          gen ||
          art ||
          sub ||
          memberFilter ||
          srt ||
          le ||
          ls ||
          ws ||
          we ||
          hs ||
          he ||
          serData ||
          search ||
          country ||
          timePeriod ||
          medium ||
          genre ||
          artist ||
          sellerType ||
          artworkType ||
          subjects ||
          member ||
          sizeFilter.lengthEnd ||
          sizeFilter.lengthStart ||
          sizeFilter.widthStart ||
          sizeFilter.widthEnd ||
          sizeFilter.heightStart ||
          sizeFilter.heightEnd ||
          sort)
      ) {
        const filtersObj = {
          ...obj,
          search: srch ? JSON.parse(srch) : '',
          country: cty ? JSON.parse(cty) : [],
          timePeriod: tmp ? JSON.parse(tmp) : '',
          member: memberFilter ? JSON.parse(memberFilter) : '',
          sellerType: sellTyp ? JSON.parse(sellTyp) : '',
          artworkType: artTyp ? JSON.parse(artTyp) : '',
          medium: med ? JSON.parse(med) : [],
          genre: gen ? JSON.parse(gen) : [],
          artist: art ? JSON.parse(art) : [],
          subjects: sub ? JSON.parse(sub) : [],
          seriesDetails: serData ? JSON.parse(serData) : [],
          price: {
            start: prc ? JSON.parse(prc)[0] : 0,
            end: prc ? JSON.parse(prc)[1] : 0,
          },
          size: {
            ...obj.size,
            length: { start: ls ? JSON.parse(ls) : 0, end: le ? JSON.parse(le) : 0 },
            width: { start: ws ? JSON.parse(ws) : 0, end: we ? JSON.parse(we) : 0 },
            height: { start: hs ? JSON.parse(hs) : 0, end: he ? JSON.parse(he) : 0 },
          },
        }
        setObj(filtersObj)
        if ( params.pageType ) {
          dispatch(allArtworksListing(artworksLimit, 0, filtersObj, srt ? JSON.parse(srt) : '',"wishlist"))
        } else {
          dispatch(allArtworksListing(artworksLimit, 0, filtersObj, srt ? JSON.parse(srt) : ''))
        }
      } else if (!artworkLoading && !recallApi) {
        if ( params.pageType  ) {
          dispatch(allArtworksListing(artworksLimit, 0, obj, sort, "wishlist"))
        } else {
          dispatch(allArtworksListing(artworksLimit, 0, obj, sort))
        }
      }
      if (redirectFromDetails) setRedirectFromDetails(false)
      if (recallApi) setRecallApi(false)
    }
    // eslint-disable-next-line
  }, [dispatch, router.query, recallApi, router.isReady])

  /**
   * @description:This function will be called once user reaches bottom of the page and there are more users to show
   */
  const fetchData = async () => {
    setLoad(true)
    setHasMore(true)
    if (artworksList.length < artworksListCount) {
      let response ; 
      if ( showWishlistedArtworks === true ) { 
        response = await dispatch(allArtworksListing(artworksLimit, artworksList.length, obj, sort, "wishlist"))
      } else {
        response = await dispatch(allArtworksListing(artworksLimit, artworksList.length, obj, sort))
      }
      //const response = await dispatch(allArtworksListing(artworksLimit, artworksList.length, obj, sort))
      if (response) setLoad(false)
    } else {
      setHasMore(false)
    }
  }
  if ( artworksList && artworksList.length === artworksListCount) setHasMore(false)
  if ( artworksList &&  artworksList.length ) setLength( artworksList.length)
  return (
    <>
      {loading ? (
        <ResponsiveMasonry columnsCountBreakPoints={{ 320: 2, 479: 2, 600: 2, 750: 2, 900: 2, 1024: 3 }}>
          <Masonry className="MasonryGrid">
            <GhostStyling>
              <BuyerArtworksListSkeleton />
            </GhostStyling>
            <GhostStyling>
              <BuyerArtworksListSkeleton />
            </GhostStyling>
            <GhostStyling>
              <BuyerArtworksListSkeleton />
            </GhostStyling>
          </Masonry>
        </ResponsiveMasonry>
      ) : (
        <ListingWrap>
          {artworksList && artworksList.length > 0 ? (
            <InfiniteScroll
              //scrollableTarget="root"
              dataLength={artworksList.length}
              next={fetchData}
              hasMore={hasMore}
              loader={
                load && (
                  <>
                    <ResponsiveMasonry columnsCountBreakPoints={{ 320: 2, 479: 2, 600: 2, 750: 2, 900: 2, 1024: 3 }}>
                      <Masonry className="MasonryGrid">
                        <GhostStyling>
                          <BuyerArtworksListSkeleton />
                        </GhostStyling>
                        <GhostStyling>
                          <BuyerArtworksListSkeleton />
                        </GhostStyling>
                        <GhostStyling>
                          <BuyerArtworksListSkeleton />
                        </GhostStyling>
                      </Masonry>
                    </ResponsiveMasonry>
                  </>
                )
              }
              endMessage={<></>}
            >
              <ResponsiveMasonry columnsCountBreakPoints={{ 320: 2, 479: 2, 600: 2, 750: 3, 900: 3, 1024: 3 }}>
                <Masonry className="MasonryGrid">
                  {artworksList &&
                    artworksList.map((art, k) => {
                      const ad = (k % 20 === 0 && k !== 0) ? <GiftCardSection isLogin={isLoginToken()} className="artwork-dir" /> : <></>
                      return (
                        <>
                        {ad}
                        <ListingContent
                          key={art._id}
                          artwork={art}
                          currency={currency}
                          conversionRate={conversionRate}
                          decimalSeparator={decimalSeparator}
                          callUseEffect={callUseEffect}
                          setCallUseEffect={setCallUseEffect}
                          setInitialPageLoad={setInitialPageLoad}
                          recallApi={recallApi}
                          setRecallApi={setRecallApi}
                        />
                        </>
                      )
                  })}
                </Masonry>
              </ResponsiveMasonry>
            </InfiniteScroll>
          ) : (
            artworksList && <EndMessage postFetch={false} type="artworks" />
          )}
        </ListingWrap>
      )}
      {!hasMore && artworksList && artworksList.length > 10 && <EndMessage postFetch={true} type="artworks" />}
      { (showWishlistedArtworks === true) &&  !artworksList  && <EndMessage postFetch={true} type="wishlist"/>}
    </>
  )
}

ArtworkListingSection.propTypes = {
  country: PropTypes.any,
  setCountry: PropTypes.func,
  medium: PropTypes.any,
  setMedium: PropTypes.func,
  genre: PropTypes.any,
  setGenre: PropTypes.func,
  artist: PropTypes.any,
  setArtist: PropTypes.func,
  search: PropTypes.any,
  setSearch: PropTypes.func,
  callUseEffect: PropTypes.any,
  setCallUseEffect: PropTypes.func,
  initialPageLoad: PropTypes.bool,
  setInitialPageLoad: PropTypes.func,
  subjects: PropTypes.array,
  setSubjects: PropTypes.func,
  member: PropTypes.string,
  setMember: PropTypes.func,
  sort: PropTypes.any,
  setSort: PropTypes.func,
  redirectFromDetails: PropTypes.bool,
  setRedirectFromDetails: PropTypes.func,
  price: PropTypes.array,
  setPrice: PropTypes.func,
  setPosition: PropTypes.func,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  sizeFilter: PropTypes.object,
  setSizeFilter: PropTypes.func,
  hasMore: PropTypes.bool,
  setHasMore: PropTypes.func,
  obj: PropTypes.object,
  recallApi: PropTypes.bool,
  setRecallApi: PropTypes.func,
  sellerType: PropTypes.any,
  setSellerType: PropTypes.func,
  artworkType: PropTypes.any,
  setArtworkType: PropTypes.func,
  timePeriod: PropTypes.array,
  setTimePeriod: PropTypes.func,
  setSeriesDetails: PropTypes.func,
  setObj: PropTypes.func,
  setLength: PropTypes.func,
  showWishlistedArtworks: PropTypes.bool,
  setWishlistedArtworks: PropTypes.func
}

export default ArtworkListingSection
