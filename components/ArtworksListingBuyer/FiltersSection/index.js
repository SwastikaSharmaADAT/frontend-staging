import React, { useEffect, useState, useCallback, useRef } from 'react'
import { BiSearch } from 'react-icons/bi'
import { FaAngleDown, FaAngleUp } from 'react-icons/fa'
import { default as ReactSelect } from 'react-select'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { Range } from 'rc-slider'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'
import premiumBadge from '../../../public/assets/badge_gold.png'
import { useTranslation } from 'next-i18next'
import 'rc-slider/assets/index.css'
import Select from '../../UI/Select'
import Radio from '../../UI/Radio'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import 'rc-slider/assets/index.css'
import { debounceFunction } from '../../../utilities/debounceFunction'
import { countriesData } from '../../../utilities/countriesList'
import {
  FiltersWrap,
  FiltersBox,
  HeadingRow,
  PriceHeading,
  SearchBar,
  SearchIcon,
  InputBar,
  SearchInput,
  ValuesContainer,
  RadioWrapper,
  RadioWrap,
  FilterButton,
} from '../styled.js'
import { sortOptions } from '../../../utilities/artworkSort'
import { decimalSeparatorMethod } from '../../../utilities/decimalSeparator'
import GiftCardSection from '../../YourProfile/GiftCardSection'
import NeedHelpSection from '../../YourProfile/NeedHelpSection'
import JoinSection from '../../YourProfile/JoinSection'
import { isLoginToken } from '../../../utilities/authUtils'
import { setAllArtists, setArtistOptions } from '../../../modules/subscription/subscriptionSlice'
import useTranslateArray from '../../../hooks/useTranslateArray'
import { useRouter } from 'next/router'
import { timePeriodsData } from '../../../utilities/timePeriodList'
import Loader from '../../UI/BackdropLoader'

const customStyles = {
  multiValue: (styles) => ({
    ...styles,
    backgroundColor: '#fff',
    border: '2px solid #eee',
    maxWidth: '275px',
  }),
  valueContainer: () => ({
    alignItems: 'center',
    display: 'flex',
    flexWrap: 'wrap',
    padding: '2px 0px',
    position: 'relative',
    overflow: 'hidden',
    width: '100%',
  }),
  control: () => ({
    border: '0',
    borderRadius: 0,
    boxShadow: 'none',
    display: 'flex',
    minHeight: '40px',
    width: '100%',
  }),
  placeholder: () => ({
    color: '#aaa',
    paddingLeft: '0',
  }),
  menu: (styles) => ({
    ...styles,
    width: 'calc(100% + 45px)',
    left: -15,
   'z-index': '99' 
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: 'transparent',
    display: 'block !important',
    background: `url('/assets/language_cross.png') no-repeat right center`,
    borderRadius: 0,
    paddingLeft: '7px',
    width: '15px',
    marginRight: '5px',
    ':hover': {
      backgroundColor: 'transparent',
      color: 'transparent',
    },
  }),
}
const FiltersSection = ({
  country,
  setCountry,
  medium,
  setMedium,
  genre,
  setGenre,
  seriesDetails,
  artist,
  price,
  position,
  setPosition,
  setPrice,
  setArtist,
  sort,
  setSort,
  search,
  setSearch,
  sellerType,
  setSellerType,
  artworkType,
  setArtworkType,
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  currenciesList,
  currency,
  handleCurrencyChange,
  sizeFilter,
  setSizeFilter,
  insertToTitle,
  conversionRate,
  decimalSeparator,
  showResetOption,
  resetFilter,
  getArtists,
  timePeriod,
  setTimePeriod,
  serSeriesDetails,
  articlesListLength,
}) => {
  //const { t } = useTranslation(['translation', 'artworks', 'countries'])
  const { t } = useTranslation('artworks','countries','sortOptions')
  const htBreakpoint = 150
  const [height, setHeight] = useState(0)
  useEffect(() => {
    window.addEventListener('scroll', () => setHeight(window.scrollY))
  }, [])
  const countries = countriesData(t)
  const sortArr = sortOptions(t)

  const timePeriods = timePeriodsData(t)
  const router = useRouter()

  const dispatch = useDispatch()
  let sortFilter = useRef(null)

  const [showSizeFilter, setShowSizeFilter] = useState(false)
  const { artworkMediums, artworkGenres, allArtists, maxArtworkPrice } = useSelector((state) => state.root.subscription)
  const cancelToken = useSelector((state) => state.root.subscription.allArtworksApiCancelToken)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  const [ isDetail , setIsDetail ] = useState(false) 

  const checkIfDetail  = [
    '/artworks/[artworkSlug]'
  ]

  useEffect( () =>{
    if ( checkIfDetail.includes( router.pathname ) ) {
      setIsDetail( true )
    } else {
      setIsDetail( false  )
    }
  }, [])

  const renderArtistLabel = (user) => {
    if (user.firstName && user.lastName) return `${user.firstName} ${user.lastName}`
    return user.username
  }

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  
  let newArtist = [...allArtists]
  let newMedium = [...artworkMediums]
  let newGenre = [...artworkGenres]
  let newCountry = [...countries]
  let newTimePeriods = [...timePeriods]
  newArtist = newArtist.map((o) => ({ value: o._id, label: renderArtistLabel(o) }))
  newMedium = newMedium.map((o) => ({ value: o._id, label: o.title }))
  newGenre = newGenre.map((o) => ({ value: o._id, label: o.title }))
  newCountry = newCountry.map((o) => ({ value: o.value, label: o.label }))
  newTimePeriods = newTimePeriods.map((o) => ({ value: o.value, label: o.label }))
  const [minval, setMinVal] = useState(50)
  const [maxval, setMaxval] = useState(maxArtworkPrice ? maxArtworkPrice : 250000)
  const [initSort, setInitSort] = useState(true)

  const [mediumArr, translateMediumArr] = useTranslateArray(newMedium, 'label')
  const [genreArr, translateGenreArr] = useTranslateArray(newGenre, 'label')
  const [artistArr, translateArtistArr] = useTranslateArray(newArtist, 'label')
  useEffect(() => {
    if (newMedium && newMedium.length > 0) translateMediumArr(newMedium, 'label')
    if (newGenre && newGenre.length > 0) translateGenreArr(newGenre, 'label')
    if (newArtist && newArtist.length > 0) translateArtistArr(newArtist, 'label')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    translateMediumArr,
    translateGenreArr,
    sortOptions.length,
    newMedium.length,
    newArtist.length,
    newGenre.length,
  ])
  useEffect(() => {
    setMinVal(price[0] ? price[0] : 50)
    setMaxval(price[1] ? price[1] : maxArtworkPrice)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [price])

  

  useEffect( () => {
    artistArr && insertToTitle (artistArr ? artistArr : [], 'artist')
  }, [artistArr])

  useEffect(() => {
    if (maxArtworkPrice !== maxval) {
      setMaxval(maxArtworkPrice)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [maxArtworkPrice])

  const resetFilterHandler = () => {
    resetFilter()
    setInitSort(true)
    setCallUseEffect(!callUseEffect)
    setInitialPageLoad(true)
    setShowSizeFilter(false)
    setMinVal(50)
    setMaxval(maxArtworkPrice)
  }

  /** Method to call artworks api with filters */
  const callFiltersApi = () => {
    setCallUseEffect(!callUseEffect)
    setInitialPageLoad(true)
  }

  /** Debounced versions of getArtists and search api call methods */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceGetArtists = useCallback(debounceFunction(getArtists, 500), [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallApi = useCallback(debounceFunction(callFiltersApi, 500), [])

  const handleArtistInputChange = (inputVal) => {
    if (inputVal && inputVal.length > 2) {
      debounceGetArtists(inputVal)
    }
  }

  /** To check if filters other than sort exists, we need to show reset filter button */
  const parseParams = (querystring) => {
    const params = new URLSearchParams(querystring)
    const obj = {}
    // iterate over all keys
    for (const key of params.keys()) {
      if (params.getAll(key).length > 1) {
        obj[key] = params.getAll(key)
      } else {
        obj[key] = params.get(key)
      }
    }
    return obj
  }
  // const filtersSelected = () => {
  //   const search = history.location.search.substring(1)
  //   const params = parseParams(search);
  //   // || params.sort !== JSON.stringify('random')
  //   if (Object.keys(params).length > 1 || !initSort) return true
  //   return false
  // }
  const filtersSelected = () => {
    if ((Object.keys(router.query).length > 1 && router.query.sort) || (router.query.sort !== JSON.stringify("random") && router.query.sort !== JSON.stringify("mostLiked") && router.query.sort !== JSON.stringify("latest") )  ) return true
    return false
  }
  const minPos = 0
  const maxPos = 20
  const minLogval = Math.log(50)

  const maxLogval = Math.log(maxArtworkPrice)
  const scale = (maxLogval - minLogval) / (maxPos - minPos)

  const calcLog = (reqVal) => Math.exp((Math.floor(reqVal) / 5 - 0) * scale + minLogval)
  const [menuIsOpen, setMenuIsOpen] = useState(false)
  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth)
  const [showFilter, toggleFilter] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', () => setWidth(window.innerWidth))
    }
  }, [])
  useEffect(() => {
    if (width > 1023) {
      toggleFilter(true)
    } else {
      toggleFilter(false)
    }
  }, [width])

  const toggleFilterHandler = () => {
    toggleFilter(!showFilter)
  }
  const iconToShow = !showFilter ? <FaAngleDown /> : <FaAngleUp className="angle-up" />
  const bottomReached  = typeof window !== 'undefined' &&  (window.innerHeight + window.scrollY) >= document.body.offsetHeight-20 ? true : false
  const getClassNames = () => {
    const classesArr = []
    if (width >  1023 &&  height > htBreakpoint) {
      if ( articlesListLength > 3) {
        classesArr.push('make-sticky')
        classesArr.push('addScr')
      }
    }
    if ( articlesListLength > 3 && bottomReached ) {
      var carIndex = classesArr.indexOf("make-sticky")
      classesArr.splice( carIndex, 1)
      classesArr.push('sticckyBtm')
    }
    if (appLanguageCode === 'ar') {
      classesArr.push('rtl-ar-content')
    }
    isDetail && classesArr.push('detailPgFilter')
    return classesArr
  }

  return t(`artworkListing.sellerType`) !== 'artworkListing.sellerType' ? (
    <>
      {showFilter && (
        <FiltersWrap className={getClassNames().join(' ')}>
          {showResetOption && filtersSelected() && !isDetail && (
            <FiltersBox className="resetBox">
              <SearchBar className="resetLink">
                <span onClick={() => resetFilterHandler()}>{t(`artworkListing.resetFilters`)}</span>
              </SearchBar>
            </FiltersBox>
          )}
          <GiftCardSection isLogin={isLoginToken()} filtersSection={true} hide={!showFilter} />
          <FiltersBox className="TopPadding">
            <SearchBar className="type-rad">
              {t(`artworkListing.sellerType`)}
              <RadioWrapper>
                <RadioWrap>
                  <Radio
                    onChange={() => {
                      setSellerType('')
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    checked={sellerType === ''}
                    classText="removeClass"
                    name="type"
                  />
                  {t(`artworkListing.allOption`)}
                </RadioWrap>
                <RadioWrap>
                  <Radio
                    onChange={() => {
                      setSellerType('premium')
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    checked={sellerType === 'premium'}
                    classText="removeClass"
                    name="type"
                  />
                  {t(`artworkListing.premiumOption`)}
                  <img width="17px" height="16px" src="/assets/premium_badge.png" alt="premium badge icon" />
                </RadioWrap>
              </RadioWrapper>
            </SearchBar>
          </FiltersBox>
          <FiltersBox className="TopPadding">
            <SearchBar className="type-rad">
            {t(`artworkListing.artworkType`)}
              <RadioWrapper>
                <RadioWrap>
                  <Radio
                    onChange={() => {
                      setArtworkType('')
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    checked={artworkType === ''}
                    classText="removeClass"
                    name="arttype"
                  />
                  {t(`artworkListing.allOption`)}
                </RadioWrap>
                <RadioWrap>
                  <Radio
                    onChange={() => {
                      setArtworkType('physical')
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    checked={artworkType === 'physical'}
                    classText="removeClass"
                    name="arttype"
                  />
                  {t(`artworkListing.physicalOption`)}
                </RadioWrap>
                <RadioWrap>
                  <Radio
                    onChange={() => {
                      setArtworkType('digital')
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    checked={artworkType === 'digital'}
                    classText="removeClass"
                    name="arttype"
                  />
                  {t(`artworkListing.digitalOption`)}
                </RadioWrap>
              </RadioWrapper>
            </SearchBar>
          </FiltersBox>
          <FiltersBox>
            <SearchBar>
              <ReactSelect
                openMenuOnFocus={true}
                ref={(ip) => (sortFilter = ip)}
                onMenuOpen={() => setMenuIsOpen(true)}
                onMenuClose={() => setMenuIsOpen(false)}
                className="CustomBoxSelect"
                styles={{ ...customMultiSelectStyles, ...customStyles }}
                placeholder={t(`artworkListing.placeholderSort`)}
                options={sortArr}
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: null,
                  DropdownIndicator: () => null,
                }}
                value={sortArr ? sortArr.find((item) => item.value === sort) || null : null}
                onChange={(item) => {
                  setInitSort(false)
                  setSort(item.value)
                  if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel()
                  }
                  setCallUseEffect(!callUseEffect)
                  setInitialPageLoad(true)
                }}
              />
              <SearchIcon>
                {menuIsOpen ? <RiArrowUpSLine /> : <RiArrowDownSLine onClick={() => sortFilter.focus()} />}
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <FiltersBox className="TopPadding">
            <HeadingRow>
              <PriceHeading>{t(`artworkListing.filterByPrice`)}</PriceHeading>
              <Select value={currency} onChange={(e) => handleCurrencyChange(e)}>
                {currenciesList.map((item, index) => (
                  <option value={item.value} key={index}>
                    {item.value}
                  </option>
                ))}
              </Select>
            </HeadingRow>
            <ValuesContainer>
              <span>
                {getCurrencyDetail(currency).symbol}{' '}
                {Math.floor(parseFloat(decimalSeparatorMethod((minval * conversionRate).toFixed(2), decimalSeparator)))}
              </span>{' '}
              <span>
                {getCurrencyDetail(currency).symbol}{' '}
                {Math.floor(parseFloat(decimalSeparatorMethod((maxval * conversionRate).toFixed(2), decimalSeparator)))}{' '}
              </span>
            </ValuesContainer>
            <Range
              allowCross={false}
              value={position}
              onChange={(val) => {
                setMinVal(Math.floor(calcLog(val[0]).toFixed(0)))
                setMaxval(Math.floor(calcLog(val[1]).toFixed(0)))
                setPosition(val)
              }}
              onAfterChange={() => {
                setPrice([minval, maxval, position[0], position[1]])
                setCallUseEffect(!callUseEffect)
                setInitialPageLoad(true)
              }}
            />
          </FiltersBox>
          <FiltersBox>
            <SearchBar>
              <SearchInput
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  if (e.target.value.length > 1 || e.target.value.length === 0) {
                    debounceCallApi()
                  }
                }}
                placeholder={t(`artworkListing.placeholderSearch`)}
              />
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <FiltersBox className="SizeSelect" onClick={() => setShowSizeFilter(!showSizeFilter)}>
            <div className="size">
              {t(`artworkListing.size`)}
              <SearchIcon>{showSizeFilter ? <RiArrowUpSLine /> : <RiArrowDownSLine />}</SearchIcon>
            </div>
          </FiltersBox>
          {showSizeFilter && (
            <FiltersBox>
              <div className="sizeSlider">
                <span className="sizeValue">{t(`artworkListing.height`)}</span>
                <ValuesContainer>
                  <span> {isNaN(sizeFilter.heightStart) ? 0 : sizeFilter.heightStart}cm</span>{' '}
                  <span> {isNaN(sizeFilter.heightEnd) ? 0 : sizeFilter.heightEnd}cm</span>
                </ValuesContainer>
                <Range
                  min={0}
                  max={150}
                  value={[sizeFilter.heightStart, sizeFilter.heightEnd]}
                  onChange={(val) =>
                    setSizeFilter({
                      ...sizeFilter,
                      heightStart: val[0],
                      heightEnd: val[1],
                    })
                  }
                  onAfterChange={() => {
                    setCallUseEffect(!callUseEffect)
                    setInitialPageLoad(true)
                  }}
                  allowCross={false}
                  handleStyle={[
                    { backgroundColor: '#222', borderColor: '#222' },
                    { backgroundColor: '#222', borderColor: '#222' },
                  ]}
                  trackStyle={[{ backgroundColor: '#222' }, { backgroundColor: '#222' }]}
                  dotStyle={{ backgroundColor: '#222' }}
                  activeDotStyle={{ backgroundColor: '#222' }}
                />
                <InputBar>
                  <input
                    type="number"
                    placeholder={t(`artworkListing.heightStart`)}
                    value={sizeFilter.heightStart}
                    onChange={(e) => {
                      setSizeFilter({
                        ...sizeFilter,
                        heightStart: parseInt(e.target.value),
                        heightEnd:
                          sizeFilter.heightEnd < parseInt(e.target.value) || isNaN(sizeFilter.heightEnd)
                            ? parseInt(e.target.value)
                            : sizeFilter.heightEnd,
                      })
                      if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel()
                      }
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    min="0"
                    max="150"
                  />
                  <input
                    type="number"
                    placeholder={t(`artworkListing.heightEnd`)}
                    value={sizeFilter.heightEnd}
                    onChange={(e) => {
                      setSizeFilter({
                        ...sizeFilter,
                        heightEnd: parseInt(e.target.value),
                      })
                      if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel()
                      }
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    min={sizeFilter.heightStart}
                    max="150"
                  />
                </InputBar>
              </div>
              <div className="sizeSlider">
                <span className="sizeValue">{t(`artworkListing.length`)}</span>
                <ValuesContainer>
                  <span> {isNaN(sizeFilter.lengthStart) ? 0 : sizeFilter.lengthStart}cm</span>{' '}
                  <span> {isNaN(sizeFilter.lengthEnd) ? 0 : sizeFilter.lengthEnd}cm</span>
                </ValuesContainer>
                <Range
                  min={0}
                  max={150}
                  value={[sizeFilter.lengthStart, sizeFilter.lengthEnd]}
                  onChange={(val) =>
                    setSizeFilter({
                      ...sizeFilter,
                      lengthStart: val[0],
                      lengthEnd: val[1],
                    })
                  }
                  onAfterChange={() => {
                    setCallUseEffect(!callUseEffect)
                    setInitialPageLoad(true)
                  }}
                  allowCross={false}
                  handleStyle={[
                    { backgroundColor: '#222', borderColor: '#222' },
                    { backgroundColor: '#222', borderColor: '#222' },
                  ]}
                  trackStyle={[{ backgroundColor: '#222' }, { backgroundColor: '#222' }]}
                  dotStyle={{ backgroundColor: '#222' }}
                  activeDotStyle={{ backgroundColor: '#222' }}
                />
                <InputBar>
                  <input
                    type="number"
                    placeholder={t(`artworkListing.lengthStart`)}
                    value={sizeFilter.lengthStart}
                    onChange={(e) => {
                      setSizeFilter({
                        ...sizeFilter,
                        lengthStart: parseInt(e.target.value),
                        lengthEnd:
                          sizeFilter.lengthEnd < parseInt(e.target.value) || isNaN(sizeFilter.lengthEnd)
                            ? parseInt(e.target.value)
                            : sizeFilter.lengthEnd,
                      })
                      if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel()
                      }
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    min="0"
                    max="150"
                  />
                  <input
                    type="number"
                    placeholder={t(`artworkListing.lengthEnd`)}
                    value={sizeFilter.lengthEnd}
                    onChange={(e) => {
                      setSizeFilter({
                        ...sizeFilter,
                        lengthEnd: parseInt(e.target.value),
                      })
                      if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel()
                      }
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    min={sizeFilter.lengthStart}
                    max="150"
                  />
                </InputBar>
              </div>
              <div className="sizeSlider">
                <span className="sizeValue">{t(`artworkListing.width`)}</span>
                <ValuesContainer>
                  <span> {isNaN(sizeFilter.widthStart) ? 0 : sizeFilter.widthStart}cm</span>{' '}
                  <span> {isNaN(sizeFilter.widthEnd) ? 0 : sizeFilter.widthEnd}cm</span>
                </ValuesContainer>
                <Range
                  min={0}
                  max={150}
                  value={[sizeFilter.widthStart, sizeFilter.widthEnd]}
                  onChange={(val) =>
                    setSizeFilter({
                      ...sizeFilter,
                      widthStart: val[0],
                      widthEnd: val[1],
                    })
                  }
                  onAfterChange={() => {
                    setCallUseEffect(!callUseEffect)
                    setInitialPageLoad(true)
                  }}
                  allowCross={false}
                  handleStyle={[
                    { backgroundColor: '#222', borderColor: '#222' },
                    { backgroundColor: '#222', borderColor: '#222' },
                  ]}
                  trackStyle={[{ backgroundColor: '#222' }, { backgroundColor: '#222' }]}
                  dotStyle={{ backgroundColor: '#222' }}
                  activeDotStyle={{ backgroundColor: '#222' }}
                />
                <InputBar>
                  <input
                    type="number"
                    placeholder={t(`artworkListing.widthStart`)}
                    value={sizeFilter.widthStart}
                    onChange={(e) => {
                      setSizeFilter({
                        ...sizeFilter,
                        widthStart: parseInt(e.target.value),
                        widthEnd:
                          sizeFilter.widthEnd < parseInt(e.target.value) || isNaN(sizeFilter.widthEnd)
                            ? parseInt(e.target.value)
                            : sizeFilter.widthEnd,
                      })
                      if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel()
                      }
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    min="0"
                    max="150"
                  />
                  <input
                    type="number"
                    placeholder={t(`artworkListing.widthEnd`)}
                    value={sizeFilter.widthEnd}
                    onChange={(e) => {
                      setSizeFilter({
                        ...sizeFilter,
                        widthEnd: parseInt(e.target.value),
                      })
                      if (typeof cancelToken != typeof undefined) {
                        cancelToken.cancel()
                      }
                      setCallUseEffect(!callUseEffect)
                      setInitialPageLoad(true)
                    }}
                    min={sizeFilter.widthStart}
                    max="150"
                  />
                </InputBar>
              </div>
              
            </FiltersBox>
          )}
          <FiltersBox>
            <SearchBar>
              <ReactSelect
                noOptionsMessage={() => t(`artworks:artworkListing.insertMessage`)}
                className="CustomBoxSelect"
                styles={{ ...customMultiSelectStyles, ...customStyles }}
                placeholder={t(`artworkListing.artist`)}
                options={newArtist}
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: null,
                  DropdownIndicator: () => null,
                }}
                isMulti={true}
                openMenuOnFocus={true}
                value={artistArr ? artistArr.filter((item) => artist.indexOf(item.value) >= 0) || [] : []}
                onInputChange={handleArtistInputChange}
                onChange={(item) => {
                  
                  insertToTitle(item ? item : [], 'artist')
                  setArtist(item ? item.map((option) => option.value) : [])
                  if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel()
                  }
                  setCallUseEffect(!callUseEffect)
                  setInitialPageLoad(true)
                  if (item === null) {
                    dispatch(setAllArtists([]))
                  } else {
                    dispatch(setArtistOptions({ item, type: 'change' }))
                  }
                }}
                onBlur={(e) => e.target.value && dispatch(setArtistOptions({ item: artist, type: 'blur' }))}
              />
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <FiltersBox>
            <SearchBar>
              <ReactSelect
                //noOptionsMessage={() => t(`artworks:artworkListing.insertMessage`)}
                openMenuOnClick={false}
                className="CustomBoxSelect"
                styles={{ ...customMultiSelectStyles, ...customStyles }}
                name="genreId"
                placeholder={t(`artworkListing.country`)}
                options={newCountry}
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: null,
                  DropdownIndicator: () => null,
                }}
                isMulti={true}
                value={newCountry ? newCountry.filter((item) => country.indexOf(item.value) >= 0) : []}
                onChange={(item) => {
                  insertToTitle(item ? item : [], 'country')
                  setCountry(item ? item.map((option) => option.value) : [])
                  if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel()
                  }
                  setCallUseEffect(!callUseEffect)
                  setInitialPageLoad(true)
                }}
              />
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <FiltersBox>
            <SearchBar>
              <ReactSelect
                className="CustomBoxSelect"
                styles={{ ...customMultiSelectStyles, ...customStyles }}
                name="artMediumId"
                placeholder={t(`artworkListing.medium`)}
                options={mediumArr}
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: null,
                  DropdownIndicator: () => null,
                }}
                isMulti={true}
                value={mediumArr ? mediumArr.filter((item) => medium.indexOf(item.value) >= 0) : []}
                onChange={(item) => {
                  insertToTitle(item ? item : [], 'medium')
                  setMedium(item ? item.map((option) => option.value) : [])
                  if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel()
                  }
                  setCallUseEffect(!callUseEffect)
                  setInitialPageLoad(true)
                }}
              />
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <FiltersBox>
            <SearchBar>
              <ReactSelect
                className="CustomBoxSelect"
                styles={{ ...customMultiSelectStyles, ...customStyles }}
                placeholder={t(`artworkListing.genre`)}
                options={genreArr}
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: null,
                  DropdownIndicator: () => null,
                }}
                isMulti={true}
                value={genreArr ? genreArr.filter((item) => genre.indexOf(item.value) >= 0) : []}
                onChange={(item) => {
                  insertToTitle(item ? item : [], 'genre')
                  setGenre(item ? item.map((option) => option.value) : [])
                  if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel()
                  }
                  setCallUseEffect(!callUseEffect)
                  setInitialPageLoad(true)
                }}
              />
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <FiltersBox>
            <SearchBar>
              <ReactSelect
                className="CustomBoxSelect"
                styles={{ ...customMultiSelectStyles, ...customStyles }}
                name="timePeriod"
                placeholder={t(`artworkListing.timePeriod`)}
                options={newTimePeriods}
                menuPlacement="auto"
                components={{
                  IndicatorSeparator: () => null,
                  ClearIndicator: null,
                  DropdownIndicator: () => null,
                }}
                isMulti={true}
                value={newTimePeriods ? newTimePeriods.filter((item) => timePeriod.indexOf(item.value) >= 0) : []}
                onChange={(item) => {
                  setTimePeriod(item ? item.map((option) => option.value) : [])
                  if (typeof cancelToken != typeof undefined) {
                    cancelToken.cancel()
                  }
                  setCallUseEffect(!callUseEffect)
                  setInitialPageLoad(true)
                }}
              />
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
            </SearchBar>
          </FiltersBox>
          <NeedHelpSection isLogin={isLoginToken()} filtersSection={true} />
          {!isLoginToken() && <JoinSection className="filterSec" showOnlyHeading={true} />}
        </FiltersWrap>
      )}
      {width < 1023 && <><GiftCardSection isLogin={isLoginToken()} filtersSection={true} hide={showFilter}/><FilterButton className={ `${isDetail ? 'detailPage' : ' '} ${showFilter && isLoginToken() ? 'toggled' : ' '}` } onClick={toggleFilterHandler}> Filters {iconToShow}</FilterButton></>}
    </>
  ) : (
    <Loader open={true} />
  )
}
FiltersSection.propTypes = {
  country: PropTypes.any,
  setCountry: PropTypes.func,
  medium: PropTypes.any,
  setMedium: PropTypes.func,
  genre: PropTypes.any,
  setGenre: PropTypes.func,
  artist: PropTypes.any,
  seriesDetails: PropTypes.any,
  sort: PropTypes.any,
  setSort: PropTypes.func,
  setArtist: PropTypes.func,
  search: PropTypes.any,
  setSearch: PropTypes.func,
  sellerType: PropTypes.any,
  setSellerType: PropTypes.func,
  artworkType: PropTypes.any,
  setArtworkType: PropTypes.func,
  callUseEffect: PropTypes.any,
  setCallUseEffect: PropTypes.func,
  setInitialPageLoad: PropTypes.func,
  price: PropTypes.any,
  setPrice: PropTypes.func,
  position: PropTypes.array,
  setPosition: PropTypes.func,
  currenciesList: PropTypes.array,
  currency: PropTypes.string,
  handleCurrencyChange: PropTypes.func,
  sizeFilter: PropTypes.object,
  setSizeFilter: PropTypes.func,
  insertToTitle: PropTypes.func,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  removeFromTitle: PropTypes.func,
  showResetOption: PropTypes.func,
  resetFilter: PropTypes.func,
  getArtists: PropTypes.func,
  timePeriod: PropTypes.array,
  setTimePeriod: PropTypes.func,
  setSeriesDetails: PropTypes.func,
  articlesListLength: PropTypes.number,
}
export default FiltersSection
