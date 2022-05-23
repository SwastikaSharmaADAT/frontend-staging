import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { BiSearch } from 'react-icons/bi'
import { default as ReactSelect } from 'react-select'
import { useTranslation } from 'next-i18next'
import { setArticlesListLoader, articleListing } from '../../../modules/articlePages/articlePagesSlice'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import Button from '../../UI/Button'
import { showList } from '../../../utilities/videoFilterList'
import { countriesData } from '../../../utilities/countriesList'
import { exhibitionCountriesList } from '../../../utilities/exhibitionCountriesList'
import { exhibitionCityList } from '../../../utilities/citiesData'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import useTranslateArray from '../../../hooks/useTranslateArray'
import ListingContent from './ListingContent'
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

const UserListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .infinite-scroll-component {
    overflow: visible!important;
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
    flex-direction: column;
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
  #react-select-50-input {
    display: none ;
  }
  #react-select-51-input{
    display: none ;
  }
  #react-select-52-input{
    display: none ;
  }
`
const FilterWrap = styled.div`
  display: flex;
  background: #ffffff;
  border: 2px solid #eeeeee;
  align-items: center;
  max-width: 268px;
  width: 100%;
  justify-content: space-between;
  &.CityWrap {
    @media (min-width: 768px) and (max-width: 1024px) {
      padding: 0 10px;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      padding: 0 10px;
    }
    @media (max-width: 767px) {
      padding: 0 10px;
    }
    @media (max-width: 479px) {
      padding: 0 10px 0 0;
    }
  }
  select {
    border: 0;
    font-size: 15px;
    color: #222;
    height: 100%;
    margin: 0;
    padding: 0 10px;
    min-height: 40px;
    width: 100%;
    background-position: right 10px center;
    padding-left: 80px;
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
    /* min-height: 40px; */
    width: 100%;
    background-position: right 0 center;
    /* max-width: calc(100% - 120px); */
    :focus {
      outline: 0;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      max-width: inherit;
    }
    @media (max-width: 767px) {
      width: 100%;
      max-width: inherit;
    }
  }
  @media (max-width: 1024px) {
    width: 29%;
    margin: 0 0 10px;
    flex-direction: column;
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
    height: 36px;
    /* overflow: hidden; */
  }
  @media (max-width: 767px) {
    height: 36px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    /* overflow: hidden; */
  }
  @media (max-width: 991px) and (orientation: landscape) {
    /* overflow: hidden; */
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
      @media( max-width: 767px ) {
        input {
          width: 0 ;
        }
      }
      :before {
        color: #222;
        content: 'Country:';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
      }
    }
    &.my-react-select-city {
      @media( max-width: 767px ) {
        input {
          width: 0 ;
        }
      }
      :before {
        color: #222;
        content: 'City:';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
      }
    }
    &.my-react-select-user-type {
      @media( max-width: 767px ) {
        input {
          width: 0 ;
        }
      }
      :before {
        color: #222;
        content: 'Time:';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 2px;
      }
    }
  }
`
const MobFilterWrap = styled.div`
position: relative;
bottom: 35px;
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
      width: '150px',
    },
  }),
  indicatorsContainer: () => ({
    right: '4px',
    position: 'relative',
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
    left: '30px',
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

const customStyles3 = {
  singleValue: () => ({
    paddingLeft: '45px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  input: () => ({
    paddingLeft: '45px',
    caretColor: 'transparent',
    margin: '2px 0 0',
  }),
  valueContainer: () => ({
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    width: '300px',
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

const SectionContent = ({ setRightSection, blur, setBlur }) => {
  const { t } = useTranslation('articles')

  const dispatch = useDispatch()
  const router = useRouter()
  const params = router.query
  const path = router && router.pathname
  const pageType = path.slice(1)
  const countries = exhibitionCountriesList(t)
  const citiesData = exhibitionCityList(t)
  const newCitiesData = [{ label: 'All', value: '' }, ...citiesData]
  const newCountriesData = [{ label: 'All', value: '' }, ...countries]

  const [ cityDataForDropDown, setCityDataForDropDown ] = useState( newCitiesData )
  

  const articlesList = useSelector((state) => state.root.articlePages.articlesList)
  const articlesListCount = useSelector((state) => state.root.articlePages.articlesListCount)
  const loading = useSelector((state) => state.root.articlePages.articlesListLoader)

  const [hasMore, setHasMore] = useState(true)
  const [title, setTitle] = useState('')
  const [country, setCountry] = useState(params && params.country ? params.country : '')
  const [city, setCity] = useState('')
  const [show, setShow] = useState('current')
  const [disableResetBtn, setDisableResetBtn] = useState(true) 
  const [ permanentFilterSelected , setPermanentFilterSelected ] = useState( false )

  const articlesLimit = 10

  useEffect(() => {
    dispatch(setArticlesListLoader(true))
    if (pageType === 'exhibition') {
      const filters = {
        title,
        country,
        city,
        show,
      }
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing', filters))
    } else {
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, pageType])

  /**
   * @description:This function will be called once user reaches bottom of the page and there are more posts to show
   */
  const fetchData = () => {
    if(!isLoginToken()) { 
      setHasMore(false)
      setBlur(true)
      return 
    }
    setHasMore(true)
    if (articlesList.length < articlesListCount) {
      if (pageType === 'exhibition') {
        const filters = {
          title,
          country,
          city,
          show,
        }
        dispatch(articleListing(pageType, articlesLimit, articlesList.length, 'listing', filters))
      } else {
        dispatch(articleListing(pageType, articlesLimit, articlesList.length, 'listing'))
      }
    } else {
      if (typeof window !== 'undefined' && window.innerWidth < 1001) {
        setRightSection(true)
      }
      setHasMore(false)
    }
  }

  const redirectHandler = (route) => {
    router.push(route)
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
    setDisableResetBtn(false)
  }

  // const handleCityChange = (e) => {
  //   setCity(e.target.value)
  //   setDisableResetBtn(false)
  // }

  const handleSearchChange = () => {
    setHasMore(true)
    if (pageType === 'exhibition') {
      let timeFilter = show === 'permanent' ? 'current' : show
      const filters = {
        title,
        country,
        city,
        show: timeFilter,
      }
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing', filters))
      setDisableResetBtn(false)
    }
  }
  const resetSearchChange = () => {
    setTitle('')
    setCity('')
    setCityDataForDropDown( newCitiesData )
    setCountry('')
    setShow('current')
    setPermanentFilterSelected( false ) 
    // setNameState([])
   const filters = {
        title : '',
        country: '',
        city: '',
        show
      }
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing', filters))
    setDisableResetBtn(true)
  }
  const handleShowChange = (e) => {
    setShow(e.value)
    let show ;
    e.value === 'permanent' ? show = 'current' : show = e.value 
    e.label === 'Permanent' ? setPermanentFilterSelected( true ) : setPermanentFilterSelected( false)
    setHasMore(true)
    if (pageType === 'exhibition') {
      const filters = {
        title,
        country,
        city,
        show,
      }
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing', filters))
    }
    setDisableResetBtn(false)
  }

  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      window.innerWidth < 1000 &&
      !loading &&
      articlesList &&
      (articlesList.length === 0 || (articlesListCount && articlesListCount < 3))
    ) {
      setRightSection(true)
      setHasMore(false)
    }
  }, [setRightSection, articlesList, loading, articlesListCount])

  const [showArr, translateShowArr] = useTranslateArray(showList, 'label')
  useEffect(() => {
    translateShowArr(showList, 'label')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateShowArr, showList.length])

  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth );
  const breakpoint = 767;
  useEffect( () => { 
    if ( typeof window !== 'undefined' ) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
    
  }, [] ) ;

  useEffect(() => {
    if (params.country) {
      CountryListChangeHandler({value: params.country})
    }
  }, [])

  useEffect(() => {
    if (title !== '' || city !== '' || country !== '') {
      setDisableResetBtn(false)
    } else {
      setDisableResetBtn(true)
    }
  }, [title, city, country])

  const CountryListChangeHandler = ( e ) => {
    setCountry(e.value)
    let filteredCities = [ { label: 'All', value: '' } ] 
    newCitiesData.forEach((city) => { 
      if ( e.value === city.country ) {
        filteredCities.push( city )
      }
    })
    setCity('')
    if ( e.value === '' ) {
      setCityDataForDropDown( newCitiesData )
    } else {
      setCityDataForDropDown( filteredCities )
    }
    
    let country = e.value
    
    setHasMore(true)
    if (pageType === 'exhibition') {
      let timeFilter = show === 'permanent' ? 'current' : show
      const filters = {
        title,
        country,
        city,
        show: timeFilter ,
      }
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing', filters))
    }
    setDisableResetBtn(false)
  }

  const handleCityChange = (e) => {
    setCity(e.value)
    let city = e.value
    setHasMore(true)
    if (pageType === 'exhibition') {
      let timeFilter = show === 'permanent' ? 'current' : show
      const filters = {
        title,
        country,
        city,
        show: timeFilter,
      }
      dispatch(articleListing(pageType, articlesLimit, 0, 'listing', filters))
    }
    setDisableResetBtn(false)
  }

const permanentArticleArray = ( articlesList ) => {
  let newArticles = [] ; 
  articlesList.forEach( ( article ) => { 
    if ( article.endDate === '2098-01-01T10:32:00.000Z' ) {
      newArticles.push( article ) 
    }
  })
  return newArticles  ;
}

const articleListsToShow = ( articlesList ) => {
  if ( permanentFilterSelected ) {
    let permanentArray =  permanentArticleArray( articlesList ) 
    if ( permanentArray.length > 0 ) {
      return permanentArray.map( (article, index ) => (
        <ListingContent
            key={article._id}
            type={pageType}
            article={article}
            redirectHandler={redirectHandler}
            index = {index}
          />
      ))
    } else {
      return  <EndMessage postFetch={false} type="articles" />
    }
  } else {
    return  articlesList.map((article, index) => (
        <ListingContent
          key={article._id}
          type={pageType}
          article={article}
          redirectHandler={redirectHandler}
          index = {index}
        />
      ))
  }
}


  return (
    <>
    
    <div className={blur ? 'blurred' : ''}>
      <InviteContentWrapper>
        {pageType === 'exhibition' && (
          <>
            <TopSearchBar>
              <HeaderSearchBar>
                <SearchIcon>
                  <BiSearch />
                </SearchIcon>
                <SearchInput
                  type="text"
                  value={title}
                  placeholder={t(`buzzListing.placeholderSearchTitle`)}
                  onChange={handleTitleChange}
                />
              </HeaderSearchBar>
              {
                width > breakpoint && (
                  <>
                  <Button disabled={disableResetBtn} onClick={() => resetSearchChange()}>
                    {' '}
                    Reset{' '}
                  </Button>
                  <Button onClick={() => handleSearchChange()}>{t(`articles:buzzListing.search`)}</Button>
                </>
                )
              }
              
            </TopSearchBar>
            <FilterSearch>
              <FilterWrap>
                <ReactSelect
                  className="CustomBoxSelect my-react-select-country"
                  styles={{ ...customMultiSelectStyles, ...customStyles4 }}
                  name="country"
                  options={newCountriesData}
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  menuPlacement="auto"
                  maxMenuHeight={ width < breakpoint ? 150 : 300 }
                  //isSearchable={width < breakpoint ? false : true }
                  placeholder=""
                  value={newCountriesData ? newCountriesData.find((item) => item.value === country) : ''}
                  onChange={CountryListChangeHandler}
                />
              </FilterWrap>
              <FilterWrap className='CityWrap'>
                <ReactSelect
                  className="CustomBoxSelect my-react-select-city"
                  styles={{ ...customMultiSelectStyles, ...customStyles3 }}
                  name="city"
                  options={cityDataForDropDown}
                  menuPlacement="auto"
                  maxMenuHeight={ width < breakpoint ? 150 : 300 }
                  //isSearchable={width < breakpoint ? false : true }
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  placeholder=""
                  value={cityDataForDropDown ? cityDataForDropDown.find((item) => item.value === city) : ''}
                  onChange={handleCityChange}
                />
              </FilterWrap>
              {/* <FilterWrap className="CityWrap">
                <input type="text" value={city} placeholder={t(`buzzListing.city`)} onChange={handleCityChange} />
              </FilterWrap> */}
              <FilterWrap>
                <ReactSelect
                  className="CustomBoxSelect my-react-select-user-type"
                  styles={{ ...customMultiSelectStyles, ...customStyles, ...customStyles3 }}
                  name="show"
                  options={showArr}
                  menuPlacement="auto"
                  maxMenuHeight={ width < breakpoint ? 150 : 300 }
                  //isSearchable={width < breakpoint ? false : true }
                  components={{
                    IndicatorSeparator: () => null,
                  }}
                  placeholder=""
                  value={showArr ? showArr.find((item) => item.value === show) : ''}
                  onChange={handleShowChange}
                />
              </FilterWrap>
            </FilterSearch>
            {
            width < breakpoint && (<MobFilterWrap><Button disabled={disableResetBtn} onClick={() => resetSearchChange()}>
            {' '}
            Reset{' '}
          </Button><Button onClick={() => handleSearchChange()}>{t(`articles:buzzListing.search`)}</Button></MobFilterWrap>)
            } 
          </>
        )}
        {loading ? (
          <InviteContentWrapper>
            <UserListingWrap>
              <>
                <GhostStyling>
                  <GhostLoader articleFetch />
                </GhostStyling>
                <GhostStyling>
                  <GhostLoader articleFetch />
                </GhostStyling>
              </>
            </UserListingWrap>
          </InviteContentWrapper>
        ) : (
          <UserListingWrap>
            
            {articlesList && articlesList.length > 0 ? (
              <InfiniteScroll
                //scrollableTarget={'root'}
                dataLength={articlesList.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                  !permanentFilterSelected && (
                    <>
                      <GhostStyling>
                        <GhostLoader articleFetch />
                      </GhostStyling>
                      <GhostStyling>
                        <GhostLoader articleFetch />
                      </GhostStyling>
                    </>
                  )
                  
                }
                endMessage={<></>}
              >
              {articleListsToShow( articlesList )}
              </InfiniteScroll>
            ) : (
              articlesList && <EndMessage postFetch={false} type="articles" />
            )}
          </UserListingWrap>
        )}
        {!blur && !hasMore && articlesList && articlesList.length > 10 && <EndMessage postFetch={true} type="articles" />}
      </InviteContentWrapper>
    </div>
    {blur && <MessagePopup className="listing userView" />} 
    </>
  )
}
SectionContent.propTypes = {
  setRightSection: PropTypes.func,
}
export default SectionContent
