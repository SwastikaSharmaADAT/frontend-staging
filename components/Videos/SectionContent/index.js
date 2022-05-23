import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { BiSearch } from 'react-icons/bi'
import { useDispatch, useSelector } from 'react-redux'
import InfiniteScroll from 'react-infinite-scroll-component'
import { default as ReactSelect } from 'react-select'
import { useTranslation } from 'next-i18next'
import Button from '../../UI/Button'
import { fetchCategories } from '../../../modules/newsFeed/newsFeedSlice'
import { getVideos } from '../../../modules/articles/articleSlice'
import GhostLoader from '../../UI/GhostLoader'
import EndMessage from '../../UI/GhostLoader/EndMessage'
import { countriesData } from '../../../utilities/countriesList'
import { userTypeList, convertToLabelValue } from '../../../utilities/videoFilterList'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import useTranslateArray from '../../../hooks/useTranslateArray'
import VideosListingContent from './VideosListingContent'
import VideoPopup from './VideoPopup'
import { useRouter } from 'next/router'
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
  @media (max-width: 767px) {
    padding: 0 5px;
  }
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
    padding: 0px;
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
  @media (max-width: 767px) {
    padding: 0 5px;
  }
  @media (max-width: 479px) {
    flex-direction: column;
    padding: 0px;
  }
`
const FilterWrap = styled.div`
  display: flex;
  align-items: center;
  max-width: 268px;
  width: 100%;
  justify-content: space-between;
  &.placeHolder {
    position: relative;
    :before {
      color: #222;
      content: '${(props) => props.category}';
      line-height: 34px;
      padding-left: 10px;
      padding-right: 10px;
      position: absolute;
      top: 2px;
      left: 0;
    }
  }
  select {
    border: 0;
    font-size: 15px;
    color: #222;
    height: 100%;
    margin: 0;
    padding: 0 15px;
    min-height: 40px;
    width: 100%;
    background-position: right 10px center;
    background-color: #ffffff;
    border: 2px solid #eeeeee;
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
  @media (max-width: 1024px) {
    width: 32%;
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
  }
  .CustomBoxSelect {
    width: 100%;
    background-color: #fff;
    svg {
      display: none;
    }
    &.my-react-select-country {
      :before {
        color: #222;
        content: '${(props) => props.country}';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 4px;
      }
    }
    &.my-react-select-category {
      :before {
        color: #222;
        content: '${(props) => props.category}';
        line-height: 34px;
        padding-left: 10px;
        padding-right: 10px;
        position: absolute;
        top: 4px;
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
        top: 4px;
      }
    }
  }
`
const MobFilterWrap = styled.div`
  position: relative;
  bottom: 35px;
`
const UserListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  .infinite-scroll-component {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
    justify-content: space-between;
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .end-message-container {
    text-align: center;
    margin: 0 auto;
  }
  &.mTop{
    margin-top: 30px ;
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
    paddingLeft: '80px',
    caretColor: 'transparent',
    marginTop: '3px',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      paddingLeft: '0',
    },
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
      width: '170px',
    },
  }),
  indicatorsContainer: () => ({
    right: '0px',
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
    border: '2px solid #eee',
  }),
}

const customStyles2 = {
  singleValue: () => ({
    paddingLeft: '70px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '67%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  input: () => ({
    paddingLeft: '30px',
    caretColor: 'transparent',
    marginTop: '3px',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      paddingLeft: '0',
    },
  }),
}

const customStyles3 = {
  singleValue: () => ({
    paddingLeft: '70px',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    width: '100%',
    color: '#222',
    margin: '1px 15px 0',
  }),
  valueContainer: () => ({
    flexWrap: 'nowrap',
    display: 'flex',
    alignItems: 'center',
    paddingLeft: '10px',
    width: '220px',
    position: 'relative',
    zIndex: '0',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      width: '200px',
    },
  }),
  input: () => ({
    paddingLeft: '35px',
    caretColor: 'transparent',
    marginTop: '3px',
    '@media only screen and (min-width: 768px) and (max-width: 1024px)': {
      paddingLeft: '0',
    },
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
    left: '25px',
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

const SectionContent = ({ setRightSection, blur, setBlur }) => {
  const { t } = useTranslation(['videos', 'translation'])

  const countries = countriesData(t)

  const dispatch = useDispatch()
  const router = useRouter()
  const newCountriesData = [{ label: 'All', value: '' }, ...countries]
  let categories = useSelector((state) => state.root.newsFeed.categoryList)
  categories = convertToLabelValue(categories)
  categories = [{ label: 'All', value: '' }, ...categories]
  const videos = useSelector((state) => state.root.article.videos)
  const loading = useSelector((state) => state.root.article.loading)
  const metadata = useSelector((state) => state.root.article.metadata)
  const videosLoader = useSelector((state) => state.root.article.videosLoader)

  /**states for our pagination & video popup */
  const [hasMore, setHasMore] = useState(true)
  const [popUp, setPopup] = useState(false)
  const [popUpVideo, setPopUpVideo] = useState()

  /**states for our filters */
  const [keyword, setKeyword] = useState('')
  const [country, setCountry] = useState('')
  const [videoCategory, setVideoCategory] = useState('')
  const [userType, setUserType] = useState('')

  const [callUseEffect, setCallUseEffect] = useState(false)
  const [click, setClick] = useState(false)

  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth)
  const breakpoint = 767
  useEffect(() => {
    typeof window !== 'undefined' && window.addEventListener('resize', () => setWidth(window.innerWidth))
  }, [])

  /**UseEffect is called initially */
  useEffect(() => {
    const params = router.query
    const key = params.keyword
    if (key) setKeyword(key)
    const cty = params.country
    if (cty) setCountry(cty)
    const vc = params.videoCategory
    if (vc) setVideoCategory(vc)
    const ut = params.userType
    if (ut) setUserType(ut)
    if (!loading && (key || vc || ut || cty || country || keyword || videoCategory || userType)) {
      dispatch(getVideos({ keyword: key, videoCategory: vc, userType: ut, country: cty, t: t }))
    } else if (!loading) {
      dispatch(getVideos({t}))
    }
    dispatch(fetchCategories(t))
    // eslint-disable-next-line
  }, [dispatch, router.params])

  /**search onChange handler */
  const searchInputHandler = (e) => {
    setKeyword(e.target.value)
  }

  let obj = {}
  useEffect(() => {
    setHasMore(true)
    if (process.browser && window.innerWidth < 1000) setRightSection(false)
    if (click) {
      const params = router.query
      if (keyword) {
        params.keyword = keyword
        obj.keyword = keyword
      } else {
        delete params.keyword
      }
      if (videoCategory) {
        obj.videoCategory = videoCategory
        params.videoCategory = videoCategory
      } else {
        delete params.videoCategory
      }
      if (country) {
        obj.country = country
        params.country = country
      } else {
        delete params.country
      }
      if (userType) {
        obj.userType = userType
        params.userType = userType
      } else {
        delete params.userType
      }
      obj.t = t
      router.push({ query: params })
      dispatch(getVideos(obj))
      setClick(false)
    }
    // eslint-disable-next-line
  }, [callUseEffect, router, dispatch])

  /**search onClick handler */
  const searchHandler = () => {
    setClick(true)
    setCallUseEffect(!callUseEffect)
  }

  /**fetch data func for pagination */
  const fetchData = async () => {
    if(!isLoginToken()) { 
      setHasMore(false)
      setBlur(true)
      return 
    }
    let obj2 = {}
    setHasMore(true)
    /**check for filters */
    if (keyword) obj2.keyword = keyword
    if (videoCategory) obj2.videoCategory = videoCategory
    if (country) obj2.country = country
    if (userType) obj2.userType = userType
    obj.t = t
    if (videos.length < metadata[0].total) {
      await dispatch(getVideos({ ...obj2, page: metadata && metadata[0].page + 1 }))
    } else {
      if (process.browser && window.innerWidth < 1001) {
        setRightSection(true)
      }
      setHasMore(false)
    }
  }
  useEffect(() => {
    if (
      process.browser &&
      window.innerWidth < 1000 &&
      !videosLoader &&
      videos &&
      (videos.length === 0 || (metadata && metadata[0].total < 3))
    ) {
      setRightSection(true)
      setHasMore(false)
    }
  }, [metadata, setRightSection, videos, videosLoader])

  const [cat, translateCat] = useTranslateArray(categories, 'label')
  const [typeOfUser, translateTypeOfUser] = useTranslateArray(userTypeList, 'label')
  useEffect(() => {
    if (categories && categories.length > 1) translateCat(categories, 'label')
    if (userTypeList && userTypeList.length > 1) translateTypeOfUser(userTypeList, 'label')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translateCat, categories.length, translateTypeOfUser, userTypeList.length])

  return (
    <>
    
    <div className={blur ? 'blurred' : ''}>
      <VideoPopup popUpVideo={popUpVideo} popUp={popUp} setPopup={setPopup} />
      <InviteContentWrapper>
        <>
          <TopSearchBar>
            <HeaderSearchBar>
              <SearchIcon>
                <BiSearch />
              </SearchIcon>
              <SearchInput
                type="text"
                value={keyword}
                onChange={searchInputHandler}
                placeholder={t(`listing.placeholderSearch`)}
              />
            </HeaderSearchBar>
            {width > breakpoint && <Button onClick={searchHandler}>{t(`listing.search`)}</Button>}
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
                onChange={(val) => setCountry(val.value)}
              />
            </FilterWrap>
            <FilterWrap className="placeHolder" category={t(`listing.category`)}>
              <ReactSelect
                className="CustomBoxSelect my-react-select-category"
                styles={{ ...customMultiSelectStyles, ...customStyles, ...customStyles2 }}
                name="videoCategory"
                options={cat}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder=""
                value={cat ? cat.find((item) => item.value === videoCategory) : ''}
                onChange={(val) => setVideoCategory(val.value)}
              />
            </FilterWrap>
            <FilterWrap userType={t(`listing.userType`)}>
              <ReactSelect
                className="CustomBoxSelect my-react-select-user-type"
                styles={{ ...customMultiSelectStyles, ...customStyles, ...customStyles3 }}
                name="userType"
                options={typeOfUser}
                components={{
                  IndicatorSeparator: () => null,
                }}
                placeholder=""
                value={typeOfUser ? typeOfUser.find((item) => item.value === userType) : ''}
                onChange={(val) => setUserType(val.value)}
              />
            </FilterWrap>
          </FilterSearch>
          {width < breakpoint && (
            <MobFilterWrap>
              <Button onClick={searchHandler}>{t(`videos:listing.search`)}</Button>
            </MobFilterWrap>
          )}
        </>
        { 
        <InviteContentWrapper className="mTop">
          <UserListingWrap className="mTop">
            {videos && videos.length > 0 ? (
              <InfiniteScroll
                // scrollableTarget="root"
                dataLength={videos.length}
                next={fetchData}
                hasMore={hasMore}
                loader={
                  <>
                    <GhostStyling>
                      <GhostLoader video />
                    </GhostStyling>
                    <GhostStyling>
                      <GhostLoader video />
                    </GhostStyling>
                  </>
                }
                endMessage={<></>}
              >
                {videos &&
                  videos.map((video, index) => (
                    index !== 0 && index % 5 === 0 ? (
                        <VideosListingContent
                          setPopup={setPopup}
                          setPopUpVideo={setPopUpVideo}
                          video={video}
                          key={video._id}
                          displayAd={true}
                        />
                    ) : (
                      <VideosListingContent
                      setPopup={setPopup}
                      setPopUpVideo={setPopUpVideo}
                      video={video}
                      key={video._id}
                    /> 
                    )
                  )
                )}
              </InfiniteScroll>
            ) : (
              videos && <EndMessage noVideos />
            )}
          </UserListingWrap>
        </InviteContentWrapper>
        }
        {!blur && !hasMore && videos.length > 6 && <EndMessage videoFetch />}
      </InviteContentWrapper>
    </div>
    {blur && <MessagePopup className="listing userView" />}
    </>
  )
}
SectionContent.propTypes = {
  props: PropTypes.any,
  location: PropTypes.any,
  setRightSection: PropTypes.func,
}
export default SectionContent
