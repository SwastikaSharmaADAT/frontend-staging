import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { shuffle } from 'lodash'
import {
  getAllArtists,
  getArtworkDetails,
  getArtworkGenres,
  getArtworkMediums,
  getHighestPrice,
  setCallResetFilter,
} from '../../modules/subscription/subscriptionSlice'
import { isLoginToken } from '../../utilities/authUtils'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData, notifyError } from '../../modules/profile/myProfileSlice'
import { currenciesList } from '../../utilities/currenciesList'
import { convertCurrency } from '../../utilities/convertCurrency'
import { countriesUsingDecimal } from '../../utilities/decimalUsingCountries'
import { toggleLoading } from '../../modules/auth/authSlice'
import { setCurrencyObj } from '../../modules/landingPage/landingPageSlice'
import { countriesData } from '../../utilities/countriesList'
import { createResizeImageUrl, checkGenre } from '../../utilities/imageUtils'
import ArtworkListingSection from './ArtworkListingSection'
import FiltersSection from './FiltersSection'
import ArtworkDetailSection from './ArtworkDetailSection'
import { BiChevronLeft } from 'react-icons/bi'
import {
  TopWrapper,
  CommonWrapper,
  CommonContainer,
  LeftContainer,
  RightContainer,
  FullWidthBanner,
  ArtworkBannerName,
  BackButton
} from './styled.js'
import Head from 'next/head'
import { setSortUsingDay, removeQueryParamsFromRouter } from '../../utilities/artworkSort'

const ArtworkListingBuyer = ({ detail }) => {
  const { t } = useTranslation(['translation', 'artworks', 'countries', 'errorResponses'])
  const countries = countriesData(t)

  const dispatch = useDispatch()
  const router = useRouter()

  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  const [randomImage, setRandomImage] = useState(true)
  const [sellerType, setSellerType] = useState('')
  const [artworkType, setArtworkType] = useState('')
  const [titleCountry, setTitleCountry] = useState([])
  const [titleArtist, setTitleArtist] = useState([])
  const [titleGenre, setTitleGenre] = useState([])
  const [titleMedium, setTitleMedium] = useState([])
  const [country, setCountry] = useState([])
  const [timePeriod, setTimePeriod] = useState([])
  const [seriesDetails, setSeriesDetails] = useState([])
  const [medium, setMedium] = useState([])
  const [genre, setGenre] = useState([])
  const [artist, setArtist] = useState([])
  const [sort, setSort] = useState()
  const [subjects, setSubjects] = useState([])
  const [member, setMember] = useState('')
  const [price, setPrice] = useState([])
  const [search, setSearch] = useState('')
  const [hasMore, setHasMore] = useState(true)
  const [sizeFilter, setSizeFilter] = useState({
    lengthStart: 0,
    lengthEnd: 0,
    widthStart: 0,
    widthEnd: 0,
    heightStart: 0,
    heightEnd: 0,
  })
  const [callUseEffect, setCallUseEffect] = useState(false)
  const [initialPageLoad, setInitialPageLoad] = useState(false)
  const [redirectFromDetails, setRedirectFromDetails] = useState(false)
  const [position, setPosition] = useState([0, 100])
  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [decimalSeparator, setDecimalSeparator] = useState('comma')
  const [conversionComplete, setConverionComplete] = useState(false)
  const [recallApi, setRecallApi] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [ showWishlistedArtworks, setWishlistedArtworks ] = useState( false )
  const artworksList = useSelector((state) => state.root.subscription.artworksList)

  const { artworkSlug } = router.query
  const { artworkMediums, artworkGenres, maxArtworkPrice, callResetFilter, allArtists } = useSelector(
    (state) => state.root.subscription
  )

  let newMedium = [...artworkMediums]
  let newGenre = [...artworkGenres]
  let newCountry = [...countries]

  newMedium = newMedium.map((o) => ({ value: o._id, label: o.title }))
  newGenre = newGenre.map((o) => ({ value: o._id, label: o.title }))
  newCountry = newCountry.map((o) => ({ value: o.value, label: o.label }))

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

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])
  /**get artworkSlug from params and fetch its details */
  useEffect(() => {
    const getDetails = async () => {
      if (detail && artworkSlug) {
        const result = await dispatch(getArtworkDetails(artworkSlug, history))
        if (result && result.messageCode === 'artworkNotFound') {
          notifyError(t(`errorResponses:subscriptions.artworkNotFound`))
          router.push('/artworks')
        }
      }
    }
    getDetails()
  }, [artworkSlug, dispatch, detail, router])
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const userCountry = userData && userData.country && userData.country.value ? userData.country.value : 'Germany'

  useEffect(() => {
    /**get user details on page render */
    if (
      loggedInUsername &&
      (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) &&
      isLoginToken()
    ) {
      // const name = JSON.parse(localStorage.getItem('user_info')).username
      
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
    }
  }, [dispatch, loggedInUsername, userData])


  useEffect(()=>{
    const params = router.query
    if (!isLoginToken()  && params.pageType) {
      setWishlistedArtworks( false )
      router.push('/artworks')
    }
  },[router])

  useEffect(() => {
    dispatch(getArtworkMediums())
    dispatch(getArtworkGenres())
    dispatch(getHighestPrice())
  }, [dispatch])

  /* Method to get artist dropdown options on typing */
  const getArtists = (searchParam) => {
    dispatch(getAllArtists({ data: { search: searchParam, type: 'name' }, t }))
  }

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

  const resetFilter = () => {
    if ( !detail ) {
      removeQueryParamsFromRouter(router, ['pageType'])
    }
    setTitleArtist([])
    setTitleGenre([])
    setTitleMedium([])
    setTitleCountry([])
    //const options = ['mostLiked', 'random']
    setSort( setSortUsingDay() )
    setSellerType('')
    setArtworkType('')
    setCountry([])
    setTimePeriod([])
    setSeriesDetails([])
    setMedium([])
    setGenre([])
    setArtist([])
    setSubjects([])
    setMember('')
    setPrice([])
    setSearch('')
    setSizeFilter({
      lengthStart: 0,
      lengthEnd: 0,
      widthStart: 0,
      widthEnd: 0,
      heightStart: 0,
      heightEnd: 0,
    })
    setPosition([0, 100])
    setWishlistedArtworks( false )
  }
  const showResetHandler = () => {
    if ( router.pathname === '/artworks') {
      if (
        titleArtist.length === 0 &&
        titleGenre.length === 0 &&
        titleMedium.length === 0 &&
        sellerType.length === 0 &&
        artworkType.length === 0 &&
        titleCountry.length === 0 &&
        country.length === 0 &&
        medium.length === 0 &&
        genre.length === 0 &&
        artist.length === 0 &&
        subjects.length === 0 &&
        member.length === 0 &&
        price.length === 0 &&
        search.length === 0 &&
        sizeFilter.lengthStart === 0 &&
        sizeFilter.lengthEnd === 0 &&
        sizeFilter.widthStart === 0 &&
        sizeFilter.widthEnd === 0 &&
        sizeFilter.heightStart === 0 &&
        sizeFilter.heightEnd === 0
      ) {
        if (sort === 'random' || sort === 'mostLiked' || sort === 'latest') {
          return false
        } else {
          return true
        }
      } else {
        return true
      }
    }
  }
  useEffect(() => {
    if (callResetFilter) {
      resetFilter()
      dispatch(setCallResetFilter(false))
      setCallUseEffect(!callUseEffect)
      setInitialPageLoad(true)
    }
  }, [callResetFilter, callUseEffect, dispatch])

  const intialFilterObj = {
    search: '',
    sellerType: '',
    artworkType: '',
    price: {
      start: 0,
      end: 0,
    },
    size: {
      length: {
        start: 0,
        end: 0,
      },
      width: {
        start: 0,
        end: 0,
      },
      height: {
        start: 0,
        end: 0,
      },
    },
    medium: [],
    genre: [],
    artist: [],
    subjects: [],
    country: [],
    member: '',
  }
  const [obj, setObj] = useState(intialFilterObj)
  const [length, setLength] = useState(0)


  // search useEffect
  useEffect(() => {
    setHasMore(true)
    const params = router.query
    if ( params.page && !detail ) {
      removeQueryParamsFromRouter(router, ['page']);
      setWishlistedArtworks( false )
    }
    if ( params.pageType) {
      setWishlistedArtworks( true )
    }
    if (initialPageLoad) {
      const filterObj = { ...obj }
      if (search) {
        params.search = JSON.stringify(search)
        filterObj.search = search
      } else {
        delete params.search
      }
      if (sellerType) {
        params.sellerType = JSON.stringify(sellerType)
        filterObj.sellerType = sellerType
      } else {
        delete params.sellerType
      }
      if (artworkType) {
        params.artworkType = JSON.stringify(artworkType)
        filterObj.artworkType = artworkType
      } else {
        delete params.artworkType
      }
      if (subjects.length > 0) {
        params.subjects = JSON.stringify(subjects)
        filterObj.subjects = subjects
      } else {
        delete params.subjects
      }
      if (member) {
        params.member = JSON.stringify(member)
        filterObj.member = member
      } else {
        delete params.member
      }
      if (country.length > 0) {
        filterObj.country = country
        params.country = JSON.stringify(country)
      } else {
        delete params.country
      }
      if (timePeriod.length > 0) {
        filterObj.timePeriod = timePeriod
        params.timePeriod = JSON.stringify(timePeriod)
      } else {
        delete params.timePeriod
      }
      if (seriesDetails.length > 0) {
        filterObj.seriesDetails = seriesDetails
        params.seriesDetails = JSON.stringify(seriesDetails)
      } else {
        delete params.seriesDetails
      }
      if (price.length > 0 && (price[0] !== 50 || price[1] !== maxArtworkPrice)) {
        filterObj.price.start = price[0]
        filterObj.price.end = price[1]
        params.price = JSON.stringify(price)
      } else {
        delete params.price
      }
      if (sort) {
        filterObj.sort = sort
        params.sort = JSON.stringify(sort)
      } else {
        delete params.sort
      }
      if (sizeFilter.lengthEnd) {
        filterObj.size.length.end = sizeFilter.lengthEnd
        params.lengthEnd = JSON.stringify(sizeFilter.lengthEnd)
      } else {
        delete params.lengthEnd
      }
      if (sizeFilter.lengthStart) {
        filterObj.size.length.start = sizeFilter.lengthStart
        params.lengthStart = JSON.stringify(sizeFilter.lengthStart)
      } else {
        delete params.lengthStart
      }
      if (sizeFilter.widthStart) {
        filterObj.size.width.start = sizeFilter.widthStart
        params.widthStart = JSON.stringify(sizeFilter.widthStart)
      } else {
        delete params.widthStart
      }
      if (sizeFilter.widthEnd) {
        filterObj.size.width.end = sizeFilter.widthEnd
        params.widthEnd = JSON.stringify(sizeFilter.widthEnd)
      } else {
        delete params.widthEnd
      }
      if (sizeFilter.heightStart) {
        filterObj.size.height.start = sizeFilter.heightStart
        params.heightStart = JSON.stringify(sizeFilter.heightStart)
      } else {
        delete params.heightStart
      }
      if (sizeFilter.heightEnd) {
        filterObj.size.height.end = sizeFilter.heightEnd
        params.heightEnd = JSON.stringify(sizeFilter.heightEnd)
      } else {
        delete params.heightEnd
      }
      if (artist.length > 0) {
        filterObj.artist = artist
        params.artist = JSON.stringify(artist)
      } else {
        delete params.artist
      }
      if (medium.length > 0) {
        filterObj.medium = medium
        params.medium = JSON.stringify(medium)
      } else {
        delete params.medium
      }
      if (genre.length > 0) {
        filterObj.genre = genre
        params.genre = JSON.stringify(genre)
      } else {
        delete params.genre
      }
      const shouldReplace = router.pathname === '/artworks' ? true : false
      if (shouldReplace) {
        router.replace({ pathname: '/artworks', query: params })
      } else {
        delete params.artworkSlug
        router.push({ pathname: '/artworks', query: params })
      }
      setInitialPageLoad(false)
      setRandomImage(false)
      setObj(filterObj)
    } else if (!initialPageLoad && allArtists.length === 0) {
      // delete params.artworkSlug
      // For deleting artist query params from URL on page refresh
      const params = router.query

      if (params.artist && JSON.parse(params.artist) && JSON.parse(params.artist).length > 0) {
        const idsArr = params.artist
        /** Calling get all artist api with artist ids array */
        dispatch(getAllArtists({ data: { search: idsArr, type: 'ids' }, t }))

        /** Old logic to delete artist filter from url on refresh */
        // delete params.artist
        // const shouldReplace = router.pathname === '/artworks' ? true : false
        // if (shouldReplace) {
        //   router.replace({ pathname: '/artworks', query: params })
        // } else {
        //   router.push({ pathname: '/artworks', query: params })
        // }
      }
    }
    // eslint-disable-next-line
  }, [callUseEffect, router, dispatch, initialPageLoad])

  const disableLoading = () => {
    dispatch(toggleLoading(false))
    setConverionComplete(true)
  }

  const resetOnErr = () => {
    setCurrency('EUR')
    setConversionRate(1)
    disableLoading()
    notifyError(t(`translation:auth.serverResponses.errors.internalServerError`))
  }

  useEffect(() => {
    if (conversionComplete) {
      const obj = {
        currency,
        conversionRate,
      }
      localStorage.setItem('currencyInfo', JSON.stringify(obj))
      dispatch(setCurrencyObj(obj))
      setConverionComplete(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [conversionComplete])

  const handleCurrencyChange = (e) => {
    dispatch(toggleLoading(true))
    setCurrency(e.target.value)
    if (e.target.value !== 'EUR') {
      convertCurrency(e.target.value, setConversionRate, disableLoading, resetOnErr)
    } else {
      setConversionRate(1)
      disableLoading()
    }
  }
  const insertToTitle = (val, type) => {
    if (type === 'country') {
      setTitleCountry([...val])
    } else if (type === 'artist') {
      setTitleArtist([...val])
    } else if (type === 'genre') {
      setTitleGenre([...val])
    } else if (type === 'medium') {
      setTitleMedium([...val])
    } else if (type === 'genreFromDescription') {
      setTitleGenre([val])
    } else if (type === 'mediumFromDescription') {
      setTitleMedium([val])
    }
  }

  const [bannerImage, setBannerImage] = useState()
  useEffect(() => {
    const getBannerImage = () => {
      let imagesArr = []
      if (artworksList && artworksList.length > 0) {
        artworksList.forEach((element) => {
          if (element.artPhotos && element.artPhotos.length) imagesArr.push(element.artPhotos[0])
          if (Array.isArray(artworksList) && !checkGenre(artworksList) && element.artPhotos.length)
            imagesArr.push(element.artPhotos[0])
        })
        if (imagesArr && imagesArr.length > 0) {
          let shuffledArr = shuffle(imagesArr)
          return shuffledArr && shuffledArr.length > 0 && shuffledArr[0] && shuffledArr[0].pictureUrl
        }
      }
    }
    if (!bannerImage) {
      const image = getBannerImage()
      setBannerImage(image)
      setRandomImage(false)
    }
  }, [artworksList, randomImage, bannerImage])

  /**useEffect to set title on page reload */
  useEffect(() => {
    if (newMedium.length > 0 && titleMedium.length === 0 && medium.length > 0) {
      let arr1 = []
      medium.forEach((med) => {
        const resultObj = newMedium.find((o) => o.value === med)
        arr1.push(resultObj)
      })
      setTitleMedium(arr1)
    }
    if (newGenre.length > 0 && titleGenre.length === 0 && genre.length > 0) {
      let arr1 = []
      genre.forEach((gen) => {
        const resultObj = newGenre.find((o) => o.value === gen)
        arr1.push(resultObj)
      })
      setTitleGenre(arr1)
    }
    if (newCountry.length > 0 && titleCountry.length === 0 && country.length > 0) {
      let arr1 = []
      country.forEach((con) => {
        const resultObj = newCountry.find((o) => o.value === con)
        arr1.push(resultObj)
      })
      setTitleCountry(arr1)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [medium, genre, country, newMedium, newGenre, newCountry])
  const separator = (type, ind) => {
    if (type === 'artist') {
      if (ind > 0) return ' • '
    } else if (type === 'country') {
      if (titleArtist.length > 0) return ' • '
    } else if (type === 'medium') {
      if (titleArtist.length > 0 || titleCountry.length > 0) return ' • '
    } else if (type === 'genre') {
      if (titleArtist.length > 0 || titleCountry.length > 0 || titleMedium.length > 0) return ' • '
    }
    return ''
  }
  return (
    <>
      <Head>
        <title>{!detail ? 'Artworks' : artworkDetail && artworkDetail.title} | ARTMO | The Art Network | Connecting The Art World</title>
        <meta name="description" content={"Buy and Sell art | Publish your collection | Find contemporary art from all over the world | Search by genre, medium, country, price and artists."} />
        <meta name="og:title" content={"Artworks | ARTMO | The Art Network | Connecting The Art World"} />
        <meta name="og:description" content={"Buy and Sell art | Publish your collection | Find contemporary art from all over the world | Search by genre, medium, country, price and artists."} />
      </Head>
      <TopWrapper className={detail && 'detail-section'}>
        {!detail && (
          <FullWidthBanner banner={bannerImage ? createResizeImageUrl(bannerImage, 2000, 160, 'mediaLibrary') : null}>
            <ArtworkBannerName>
              {
                showWishlistedArtworks && 'Your Wishlist'
              }
              {titleArtist.length > 0 &&
                titleArtist.slice(0, 3).map((item, ind) => `${separator('artist', ind)}${item.label}`)}
              {titleCountry.length > 0 &&
                titleCountry
                  .slice(-1)
                  .slice(0, 1)
                  .map((item) => `${separator('country')}${item.label}`)}
              {titleMedium.length > 0 &&
                titleMedium
                  .slice(-1)
                  .slice(0, 1)
                  .map((item) => `${separator('medium')}${item.label}`)}
              {titleGenre.length > 0 &&
                titleGenre
                  .slice(-1)
                  .slice(0, 1)
                  .map((item) => `${separator('genre')}${item.label}`)}
              { 
                !showWishlistedArtworks &&
                !titleArtist.length &&
                !titleCountry.length &&
                !titleMedium.length &&
                !titleGenre.length &&
                t(`artworks:artworksTitle`)}
            </ArtworkBannerName>
          </FullWidthBanner>
        )}
        <CommonWrapper>
          <CommonContainer>
          {detail ? 
          <BackButton onClick={() => router.push('/artworks')}>
            <BiChevronLeft/>
          </BackButton> : 
            <LeftContainer>
              <FiltersSection
                insertToTitle={insertToTitle}
                callUseEffect={callUseEffect}
                setCallUseEffect={setCallUseEffect}
                country={country}
                setCountry={setCountry}
                timePeriod={timePeriod}
                setTimePeriod={setTimePeriod}
                seriesDetails={seriesDetails}
                setSeriesDetails={setSeriesDetails}
                position={position}
                setPosition={setPosition}
                medium={medium}
                setMedium={setMedium}
                genre={genre}
                price={price}
                setPrice={setPrice}
                setGenre={setGenre}
                artist={artist}
                sort={sort}
                setSort={setSort}
                setArtist={setArtist}
                sellerType={sellerType}
                setSellerType={setSellerType}
                artworkType={artworkType}
                setArtworkType={setArtworkType}
                search={search}
                setSearch={setSearch}
                setInitialPageLoad={setInitialPageLoad}
                initialPageLoad={initialPageLoad}
                currenciesList={currenciesList}
                currency={currency}
                handleCurrencyChange={handleCurrencyChange}
                sizeFilter={sizeFilter}
                setSizeFilter={setSizeFilter}
                conversionRate={conversionRate}
                decimalSeparator={decimalSeparator}
                showResetOption={showResetHandler}
                resetFilter={resetFilter}
                getArtists={getArtists}
                articlesListLength={length}
              />
            </LeftContainer>
            }
            {detail ? (
                <ArtworkDetailSection
                  setCountry={setCountry}
                  setTimePeriod={setTimePeriod}
                  setSeriesDetails={setSeriesDetails}
                  resetFilter={resetFilter}
                  insertToTitle={insertToTitle}
                  callUseEffect={callUseEffect}
                  setCallUseEffect={setCallUseEffect}
                  setInitialPageLoad={setInitialPageLoad}
                  initialPageLoad={initialPageLoad}
                  setMedium={setMedium}
                  setGenre={setGenre}
                  setSubjects={setSubjects}
                  setRedirectFromDetails={setRedirectFromDetails}
                  decimalSeparator={decimalSeparator}
                  setArtist={setArtist}
                />
              ) : (
              <RightContainer>
                <ArtworkListingSection
                  hasMore={hasMore}
                  setHasMore={setHasMore}
                  obj={obj}
                  setObj={setObj}
                  setLength={setLength}
                  callUseEffect={callUseEffect}
                  setCallUseEffect={setCallUseEffect}
                  setPosition={setPosition}
                  country={country}
                  price={price}
                  setPrice={setPrice}
                  setCountry={setCountry}
                  timePeriod={timePeriod}
                  setTimePeriod={setTimePeriod}
                  seriesDetails={seriesDetails}
                  setSeriesDetails={setSeriesDetails}
                  subjects={subjects}
                  setSubjects={setSubjects}
                  member={member}
                  setMember={setMember}
                  redirectFromDetails={redirectFromDetails}
                  setRedirectFromDetails={setRedirectFromDetails}
                  medium={medium}
                  setMedium={setMedium}
                  genre={genre}
                  setGenre={setGenre}
                  artist={artist}
                  setArtist={setArtist}
                  search={search}
                  setSearch={setSearch}
                  sellerType={sellerType}
                  setSellerType={setSellerType}
                  setArtworkType={setArtworkType}
                  sort={sort}
                  setSort={setSort}
                  initialPageLoad={initialPageLoad}
                  setInitialPageLoad={setInitialPageLoad}
                  currency={currency}
                  conversionRate={conversionRate}
                  decimalSeparator={decimalSeparator}
                  sizeFilter={sizeFilter}
                  setSizeFilter={setSizeFilter}
                  recallApi={recallApi}
                  setRecallApi={setRecallApi}
                  showWishlistedArtworks={showWishlistedArtworks}
                  setWishlistedArtworks={setWishlistedArtworks}
                />
            </RightContainer>
            )}
          </CommonContainer>
        </CommonWrapper>
      </TopWrapper>
    </>
  )
}

ArtworkListingBuyer.propTypes = {
  detail: PropTypes.bool,
}

export default ArtworkListingBuyer
