import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { default as ReactSelect } from 'react-select'
import { BiSearch } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry'
import {
  setUsersListLoader,
  userListing,
  setEnableUserSearch,
  setCheckUserType,
} from '../../../modules/profile/myProfileSlice'
import Button from '../../UI/Button'
import UsersListSkeleton from '../../UI/GhostLoader/UsersListSkeleton'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import { userTypeList, sortByList } from '../../../utilities/videoFilterList'
import { countriesData } from '../../../utilities/countriesList'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import useTranslateArray from '../../../hooks/useTranslateArray'
import UserListingContent from './UserListingContent'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { getUserName } from '../../../utilities/otherProfile'
import RightSideAds from '../../YourProfile/RightSideAds'
import { getArray } from '../../../utilities/getTranslatedContent'
import { isLoginToken } from '../../../utilities/authUtils'
import MessagePopup from '../../YourProfile/MessagePopup'

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
const TopSearchBar = styled.div`
  display: flex;
  margin: 0 0 17px;
  button {
    max-width: calc(100% - 86%);
    margin: 0;
    height: auto;
    font-size: 18px;
    @media (max-width: 767px) {
      font-size: 16px;
    }
    @media (max-width: 479px) {
      max-width: 100%;
      padding: 10px;
      margin: 10px 0 0 0;
      width: auto;
    }
  }
  @media (max-width: 479px) {
    display: flex;
    flex-wrap: wrap;
    button {
      flex-basis: 48%;
      margin: 10px 3px 0 3px;
    }
  }
`

const HeaderSearchBar = styled.div`
  display: flex;
  width: 100%;
  height: 50px;
  margin: 0;
  background: #ffffff;
  border: 2px solid #eeeeee;
  @media (max-width: 991px) {
    width: 100%;
  }
  @media (max-width: 479px) {
    flex-basis: 100%;
    width: auto;
  }
`
const SearchIcon = styled.div`
  width: 60px;
  height: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 28px;
    color: #000;
    font-weight: bold;
  }
`

const SearchInput = styled.input`
  width: calc(100% - 32px);
  height: 50px;
  color: #000;
  background: transparent;
  border: 0;
  font-size: 18px;
  font-weight: 400;
  padding: 0;
  ::placeholder {
    color: #aaa;
  }
  :focus,
  :hover {
    outline: none;
    border: 0;
  }
`
const FilterSearch = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin: 0 0 30px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  .btn-mob-search {
    display: flex;
    width: 100%;
    flex-wrap: wrap;
    justify-content: space-between;
    button {
      flex-basis: 48%;
    }
  }
`
const FilterWrap = styled.div`
  display: flex;
  background: #ffffff;
  border: 2px solid #eeeeee;
  align-items: center;
  //max-width: 268px;
  max-width: 24%;
  width: 100%;
  justify-content: space-between;
  &.CityWrap {
    input {
      ::placeholder {
        color: #aaa;
      }
      @media (max-width: 767px) and (orientation: landscape) {
        width: 100%;
      }
    }
  }
  select {
    border: 0;
    font-size: 15px;
    color: #222;
    height: 100%;
    margin: 0;
    padding: 0 15px 0 0;
    width: auto;
    background-position: right 0 center;
    max-width: 100px;
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      max-width: inherit;
    }
    @media (max-width: 767px) {
      width: 100%;
      max-width: inherit;
    }
  }
  input {
    border: 0;
    font-size: 15px;
    color: #222;
    height: 100%;
    margin: 0;
    padding: 0 10px;
    width: 100%;
    box-sizing: border-box;
    background-position: right 0 center;
    :focus {
      outline: 0;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      max-width: inherit;
    }
    @media (max-width: 767px) {
      max-width: inherit;
    }
  }
  @media (max-width: 767px) {
    height: 36px;
  }
  @media (max-width: 1024px) {
    width: 48%;
    margin: 0 0 10px;
    flex-direction: column;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 100%;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 100%;
  }
  @media (min-width: 480px) and (max-width: 767px) {
    width: 44%;
    max-width: inherit;
  }
  @media (max-width: 479px) {
    max-width: 100%;
    width: auto;
    flex-direction: column;
    align-items: flex-start;
  }
  .CustomBoxSelect {
    width: 100%;
    background-color: #fff;
    border: 0;
    outline: 0;
    svg {
      display: none;
    }
    > :first-child {
      border: 0;
      :hover,
      :focus {
        border: 0;
        outline: 0;
      }
    }
    :hover,
    :focus {
      border: 0;
      outline: 0;
    }
    .css-j3q34b-Control {
      border: 0;
      outline: 0;
      :hover,
      :focus {
        border: 0;
        outline: 0;
      }
    }
    &.my-react-select-country {
      :before {
        color: #222;
        content: '${(props) => props.country}';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
      }
    }
    &.my-react-select-user-type {
      :before {
        color: #222;
        content: '${(props) => props.userType}';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
      }
    }
    &.my-react-select-sort-by {
      :before {
        color: #222;
        content: '${(props) => props.sortBy}';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
      }
    }
  }
`
const UserListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  .infinite-scroll-component {
    overflow-x: hidden !important ;
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start; */
    .MasonryGrid {
      @media (max-width: 991px) {
        text-align: center;
      }
    }
    .MasonryGrid > div {
      margin: 0 12px !important;
    }
    .MasonryGrid > div > div {
      margin-bottom: 24px !important;
    }
    .MasonryGrid > div:first-child {
      margin-left: 0 !important;
    }
    .MasonryGrid > div:last-child {
      margin-right: 0 !important;
    }
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .end-message-container {
    margin: 0 auto;
  }
  &.Loading {
    justify-content: flex-start;
  }
`
const GhostStylingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
`

const GhostStyling = styled.div`
  position: relative;
  max-width: 275px;
  width: 100%;
  margin: 0 10px 20px 0;
  justify-content: flex-start;
  @media (min-width: 992px) and (max-width: 1024px) {
    width: 47%;
    max-width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
    max-width: 100%;
    margin: 0 auto 15px;
  }
  @media (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 20px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
`

const ItemsWrapper = styled.div`
  @media (min-width: 992px) and (max-width: 1024px) {
    width: 97%;
    max-width: 100%;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 97%;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
`

const customStyles = {
  singleValue: () => ({
    paddingLeft: '60px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  input: () => ({
    position: 'relative',
    paddingLeft: '80px',
    caretColor: 'transparent',
    margin: '2px 0 0',
  }),
  valueContainer: () => ({
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    width: '230px',
    position: 'relative',
    zIndex: '0',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      width: '200px',
    },
  }),
  indicatorsContainer: () => ({
    right: '4px',
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  control: () => ({
    justifyContent: 'space-between',
    display: 'flex',
    minHeight: '36px',
    alignItems: 'center',
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
}

const customStyles3 = {
  singleValue: () => ({
    paddingLeft: '50px !important',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '67%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  input: () => ({
    paddingLeft: '50px',
    caretColor: 'transparent',
    marginTop: '3px',
  }),
  valueContainer: () => ({
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '40px',
    width: '220px',
    position: 'relative',
    zIndex: '0',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      width: '200px',
    },
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
}

const customStyles2 = {
  singleValue: () => ({
    paddingLeft: '27px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '67%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  input: () => ({
    paddingLeft: '27px',
    caretColor: 'transparent',
    marginTop: '2px',
  }),
  valueContainer: () => ({
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '40px',
    width: '196px',
    position: 'relative',
    zIndex: '0',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      width: '200px',
    },
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
}

const customStyles4 = {
  singleValue: () => ({
    position: 'relative',
    left: '60px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '80%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  input: () => ({
    left: '80px',
    caretColor: 'transparent',
    margin: '2px 0 0',
    position: 'relative',
  }),
  valueContainer: () => ({
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    width: '200px',
    position: 'relative',
    zIndex: '0',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      width: '150px',
    },
    '@media only screen and (max-width: 767px)': {
      width: '270px',
    },
  }),
  indicatorsContainer: () => ({
    left: '10px',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
  menu: (styles) => ({
    ...styles,
    width: '100%',
  }),
}

const SectionContent = ({ setRightSection ,setBlur, blur}) => {
  const { t } = useTranslation('userListing')
  const countries = countriesData(t)

  const dispatch = useDispatch()
  const router = useRouter()

  const params = router.query
  const searchParam = params.search && JSON.parse(params.search)
  const userTypeParam = params.userType ? params.userType : ''
  const newCountriesData = [{ label: 'All', value: '' }, ...countries]

  const usersList = useSelector((state) => state.root.myProfile.usersList)
  const usersListCount = useSelector((state) => state.root.myProfile.usersListCount)
  const usersToKeep = useSelector((state) => state.root.myProfile.usersToKeepForLang)
  const loading = useSelector((state) => state.root.myProfile.usersListLoader)
  const enableUserSearch = useSelector((state) => state.root.myProfile.enableUserSearch)
  const checkUserType = useSelector((state) => state.root.myProfile.checkUserType)

  const [hasMore, setHasMore] = useState(true)
  const [load, setLoad] = useState(false)
  const [title, setTitle] = useState(searchParam ? searchParam : '')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [userType, setUserType] = useState(userTypeParam ? userTypeParam : '')
  const [sortBy, setSortBy] = useState('last_login')
  const [disableResetBtn, setDisableResetBtn] = useState(true)

  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' && window.innerWidth)
  const breakpoint = 767
  useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener('resize', () => setWindowWidth(window.innerWidth))
  }, [])

  useEffect(() => {
    if (userTypeParam) {
      setUserType(userTypeParam)
    }
  }, [params, userTypeParam])

  const usersLimit = 15

  useEffect(() => {
    if (!searchParam) setTitle('')
  }, [searchParam])

  useEffect(() => {
    if (title !== '' || city !== '' || country !== '' || sortBy !== 'last_login' || userType !== '') {
      setDisableResetBtn(false)
    } else {
      setDisableResetBtn(true)
    }
  }, [title, city, country, userType, sortBy])


  useEffect(() => {
    if (enableUserSearch) {
      setTitle(searchParam)
      setHasMore(true)
      const filters = {
        country,
        city,
        userType,
      }
      dispatch(setUsersListLoader(true))
      dispatch(userListing(usersLimit, 0, sortBy, searchParam, filters))
      dispatch(setEnableUserSearch(false))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParam, dispatch, enableUserSearch])

  // Effect to call users listing api again when userType param is added/updated while on users page
  useEffect(() => {
    if (checkUserType.val && checkUserType.type === userTypeParam) {
      setUserType(userTypeParam)
      setHasMore(true)
      const filters = {
        country,
        city,
        userType: userTypeParam,
      }
      dispatch(setUsersListLoader(true))
      dispatch(userListing(usersLimit, 0, sortBy, searchParam ? title : '', filters))
      dispatch(setCheckUserType({ val: false, type: '' }))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userTypeParam, dispatch, checkUserType])

  useEffect(() => {
    if (router.isReady) {
      dispatch(setUsersListLoader(true))
      dispatch(
        userListing(usersLimit, 0, sortBy, title, {
          country,
          city,
          userType: userTypeParam ? userTypeParam : '',
        })
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, router.isReady])
  // const [nameState, setNameState] = useState([])
  const [cityState, setCityState] = useState([])
  const [countryState, setCountryState] = useState([])
  const [typeState, setTypeState] = useState([])
  /**
   * @description:This function will be called once user reaches bottom of the page and there are more users to show
   */
  const fetchData = async () => {
    if(!isLoginToken()) { 
      setHasMore(false)
      setBlur(true)
      return 
    }
    setLoad(true)
    setHasMore(true)
    if (usersList.length < usersListCount) {
      // setNameState([...nameState, ...names])
      setCityState([...cityState, ...cities])
      setCountryState([...countryState, ...cntries])
      setTypeState([...typeState, ...types])

      const response = await dispatch(
        userListing(usersLimit, usersList.length, sortBy, title, {
          country,
          city,
          userType,
        })
      )
      if (response) {
        setLoad(false)
      }
    } else {
      setRightSection(true)
      setHasMore(false)
      setLoad(false)
    }
  }

  const redirectHandler = (route) => {
    router.push(route)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }

  const handleCityChange = (e) => {
    setCity(e.target.value)
  }
  
  const handleSearchChange = () => {
    if (process.browser && window.innerWidth < 1000) setRightSection(false)
    setHasMore(true)
    // setNameState([])
    setCityState([])
    setCountryState([])
    setTypeState([])
    // translateAllNames('')
    translateAllCities('')
    translateAllCities('')
    translateAllCountries('')
    const filters = {
      country,
      city,
      userType,
    }

    dispatch(setUsersListLoader(true))
    dispatch(userListing(usersLimit, 0, sortBy, title, filters))
    setDisableResetBtn(false)
  }

  const handleCountryFilterChange = ( e ) => {
    if (process.browser && window.innerWidth < 1000) setRightSection(false)
    let country = e.value 
    setHasMore(true)
    setCountry(country)
    setCityState([])
    setCountryState([])
    setTypeState([])
    translateAllCities('')
    translateAllCities('')
    translateAllCountries('')
    const filters = {
      country,
      city,
      userType,
    }
    dispatch(setUsersListLoader(true))
    dispatch(userListing(usersLimit, 0, sortBy, title, filters))
    setDisableResetBtn(false)
  }

  const handleUserTypeFilterChange = ( e ) => {
    if (process.browser && window.innerWidth < 1000) setRightSection(false)
    let userType = e.value 
    setHasMore(true)
    setUserType(userType)
    setCityState([])
    setCountryState([])
    setTypeState([])
    translateAllCities('')
    translateAllCities('')
    translateAllCountries('')
    const filters = {
      country,
      city,
      userType,
    }
    dispatch(setUsersListLoader(true))
    dispatch(userListing(usersLimit, 0, sortBy, title, filters))
    setDisableResetBtn(false)
  }

  const handleFilterSortBy = ( e ) => {
    if (process.browser && window.innerWidth < 1000) setRightSection(false)
    let sortBy = e.value 
    setHasMore(true)
    setSortBy(sortBy)
    setCityState([])
    setCountryState([])
    setTypeState([])
    translateAllCities('')
    translateAllCities('')
    translateAllCountries('')
    const filters = {
      country,
      city,
      userType,
    }
    dispatch(setUsersListLoader(true))
    dispatch(userListing(usersLimit, 0, sortBy, title, filters))
    setDisableResetBtn(false)
  }


  const resetSearchChange = () => {
    setTitle('')
    setCity('')
    setUserType('')
    setCountry('')
    setSortBy('last_login')
    // setNameState([])
    setCityState([])
    setCountryState([])
    setTypeState([])
    // translateAllNames('')
    translateAllCities('')
    translateAllCities('')
    translateAllCountries('')
    const filters = {
      country: '',
      city: '',
      userType: '',
    }
    dispatch(setUsersListLoader(true))
    dispatch(userListing(usersLimit, 0, 'last_login', '', filters))
    setDisableResetBtn(true)
  }
  useEffect(() => {
    if (
      process.browser &&
      window.innerWidth < 1000 &&
      !loading &&
      usersList &&
      (usersList.length === 0 || usersListCount < 3)
    ) {
      setRightSection(true)
      setHasMore(false)
    }
  }, [usersListCount, setRightSection, usersList, loading])

  const [userTypeArr, translateUserTypeArr] = useTranslateArray()
  const [sortArr, translateSortArr] = useTranslateArray()

  useEffect(() => {
    if (userTypeList && userTypeList.length > 0 && sortByList && sortByList.length > 0) {
      translateUserTypeArr(userTypeList, 'label')
      translateSortArr(sortByList, 'label')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateUserTypeArr, translateSortArr, userTypeList.length, sortByList.length])

  const enterClickHandler = (event) => {
    if (event.charCode === 13) {
      handleSearchChange()
    }
  }
  // const [allNames, translateAllNames] = useTranslateContent('')
  const [allCities, translateAllCities] = useTranslateContent('')
  const [allCountries, translateAllCountries] = useTranslateContent('')
  const [allTypes, translateAllTypes] = useTranslateContent('')
  // let allUser = '',
  let allCity = '',
    allCountry = '',
    allType = ''
  if (usersList && usersList.length) {
    const arr = usersToKeep ? usersList.slice(-usersToKeep) : usersList
    arr.forEach((user, ind) => {
      if (ind < arr.length - 1) {
        // allUser = allUser.concat(`${user && getUserName(user)} <span translate="no">NA</span>; `)
        allCity = allCity.concat(`${user.city && user.city.value} <span translate="no"></span>; ${ind}`)
        allCountry = allCountry.concat(`${user.country && user.country.value} <span translate="no"></span>; ${ind}`)
        allType = allType.concat(
          `${user && user.userRole.length && user.userRole[0].roleName} <span translate="no"></span>; ${ind}`
        )
      } else {
        // allUser = allUser.concat(`${user && getUserName(user)}`)
        allCity = allCity.concat(`${user.city && user.city.value}`)
        allCountry = allCountry.concat(`${user.country && user.country.value}`)
        allType = allType.concat(`${user && user.userRole.length && user.userRole[0].roleName}`)
      }
    })
  }

  useEffect(() => {
    // if (allUser) translateAllNames(allUser)
    if (allCity) translateAllCities(allCity)
    if (allCountry) translateAllCountries(allCountry)
    if (allType) translateAllTypes(allType)
  }, [allCity, allCountry, allType])
  // }, [allUser, allCity, allCountry, allType])
  // let names = [],
  let cities = [],
    cntries = [],
    types = []
  if (allCities) {
    cities =  getArray(allCities)
    cntries = getArray(allCountries)
    types = getArray(allTypes)
  }

  return (
    <>
    
    <div className={blur ? 'blurred' : ''}>
      <InviteContentWrapper onKeyPress={enterClickHandler}>
        <TopSearchBar>
          <HeaderSearchBar>
            <SearchIcon>
              <BiSearch />
            </SearchIcon>
            <SearchInput
              type="text"
              placeholder={t(`listing.searchbyname`)}
              value={title}
              onChange={handleTitleChange}
              maxLength="20"
            />
          </HeaderSearchBar>
          {windowWidth > breakpoint && (
            <>
              <Button disabled={disableResetBtn} onClick={() => resetSearchChange()}>
                {' '}
                Reset{' '}
              </Button>
              <Button onClick={() => handleSearchChange()}>{t(`listing.search`)} </Button>
            </>
          )}
        </TopSearchBar>
        <FilterSearch>
          <FilterWrap country={t(`listing.country`)}>
            <ReactSelect
              className="CustomBoxSelect my-react-select-country"
              styles={{ ...customMultiSelectStyles, ...customStyles4 }}
              name="country"
              options={newCountriesData}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder=""
              value={newCountriesData ? newCountriesData.find((item) => item.value === country) : ''}
              onChange={handleCountryFilterChange}
            />
          </FilterWrap>
          <FilterWrap className="CityWrap">
            <input type="text" value={city} placeholder={t(`listing.placeholderCity`)} onChange={handleCityChange} />
          </FilterWrap>
          <FilterWrap userType={t(`listing.userType`)}>
            <ReactSelect
              className="CustomBoxSelect my-react-select-user-type"
              styles={{ ...customMultiSelectStyles, ...customStyles, ...customStyles3 }}
              name="userType"
              options={userTypeArr}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder=""
              value={userTypeArr ? userTypeArr.find((item) => item.value === userType) : ''}
              onChange={handleUserTypeFilterChange}
            />
          </FilterWrap>
          <FilterWrap sortBy={t(`listing.sortBy`)} className="SortBYWrap">
            <ReactSelect
              className="CustomBoxSelect my-react-select-sort-by"
              styles={{ ...customMultiSelectStyles, ...customStyles, ...customStyles2 }}
              name="sortBy"
              options={sortArr}
              components={{
                IndicatorSeparator: () => null,
              }}
              placeholder=""
              value={sortArr ? sortArr.find((item) => item.value === sortBy) : ''}
              onChange={handleFilterSortBy}
            />
          </FilterWrap>
          {windowWidth < breakpoint && (
            <div className="btn-mob-search">
              <Button disabled={disableResetBtn} onClick={() => resetSearchChange()}>
                {' '}
                Reset{' '}
              </Button>
              <Button onClick={() => handleSearchChange()}>{t(`userListing:listing.search`)} </Button>
            </div>
          )}
        </FilterSearch>
        {loading ? (
          <InviteContentWrapper className="Loading">
            <UserListingWrap>
              <>
                <GhostStyling>
                  <UsersListSkeleton />
                </GhostStyling>
                <GhostStyling>
                  <UsersListSkeleton />
                </GhostStyling>
                <GhostStyling>
                  <UsersListSkeleton />
                </GhostStyling>
              </>
            </UserListingWrap>
          </InviteContentWrapper>
        ) : (
          <UserListingWrap>
            {usersList && usersList.length > 0 ? (
              <InfiniteScroll
                //scrollableTarget="root"
                dataLength={usersList.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                  load && (
                    <>
                      <GhostStylingWrap>
                        <GhostStyling>
                          <UsersListSkeleton />
                        </GhostStyling>
                        <GhostStyling>
                          <UsersListSkeleton />
                        </GhostStyling>
                        <GhostStyling>
                          <UsersListSkeleton />
                        </GhostStyling>
                      </GhostStylingWrap>
                    </>
                  )
                }
                endMessage={<></>}
              >
                <ResponsiveMasonry columnsCountBreakPoints={{ 320: 1, 479: 1, 600: 2, 750: 2, 900: 2, 1024: 3 }}>
                  <Masonry className="MasonryGrid">
                    {usersList &&
                      usersList.map((user, index) =>
                        index !== 0 && index % 7 === 0 ? (
                          <>
                            <ItemsWrapper>
                              <RightSideAds rate={1} interNations={ index !== 0 && index % 14 === 0} />
                            </ItemsWrapper>
                            <UserListingContent
                              cities={[...cityState, ...cities]}
                              cntries={[...countryState, ...cntries]}
                              types={[...typeState, ...types]}
                              // names={[...nameState, ...names]}
                              key={index}
                              index={index}
                              user={user}
                              redirectHandler={redirectHandler}
                            />
                          </>
                        ) : (
                          <UserListingContent
                            cities={[...cityState, ...cities]}
                            cntries={[...countryState, ...cntries]}
                            types={[...typeState, ...types]}
                            // names={[...nameState, ...names]}
                            key={index}
                            index={index}
                            user={user}
                            redirectHandler={redirectHandler}
                          />
                        )
                      )}
                  </Masonry>
                </ResponsiveMasonry>
              </InfiniteScroll>
            ) : (
              usersList && <EndMessage postFetch={false} type="users" />
            )}
          </UserListingWrap>
        )}
        {!blur && !hasMore && usersList && usersList.length > 8 && <EndMessage postFetch={true} type="users" />}
      </InviteContentWrapper>
    </div>
    {blur && <MessagePopup className="listing userView" />}
    </>
  )
}
SectionContent.propTypes = {
  setRightSection: PropTypes.func,
  match: PropTypes.object,
  params: PropTypes.object,
  search: PropTypes.string,
  setBlur: PropTypes.func,
}
export default SectionContent
