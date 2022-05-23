import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { featuredPosts } from '../../../modules/articlePages/articlePagesSlice'
import FeaturedPostSlider from '../FeaturedPostSlider'

const HeadingWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 479px) {
    flex-direction: column;
  }
`

const BannerBar = styled.div`
  position: relative;
  padding: 0;
  background: #222;
  font-weight: normal;
  font-size: 36px;
  line-height: normal;
  color: #ffffff;
  padding: 0px 30px;
  text-transform: uppercase;
  min-height: 60px;
  display: flex;
  align-items: center;
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
    min-height: auto;
  }
`

const HeadingSection = ({ requestType }) => {
  const { t } = useTranslation('articles')

  const dispatch = useDispatch()
  const router = useRouter()

  const featuredPostsList = useSelector((state) => state.root.articlePages.featuredPostsList)

  const [width, setWidth] = useState(typeof window !== 'undefined' && window.innerWidth );
  const breakpoint = 767;
  useEffect( () => { 
    if ( typeof window !== 'undefined' ) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
    }
    
  }, [] ) ;

  useEffect(() => {
    dispatch(featuredPosts(requestType))
  }, [dispatch, requestType])

  const redirectHandler = (route) => {
    router.push(route)
  }
  const getTitle = () => {
    if (requestType === 'buzz') return t(`buzzListing.title`)
    else if (requestType === 'exhibition') return t(`exhibitionListing.title`)
    else if (requestType === 'potd') return t(`potd.title`)
    else if (requestType === 'all') return t(`buzzListing.titleShort`)
  }
  return (
    <>
    {typeof window !== 'undefined' && width > 767 && 
      (
        <>
        {featuredPostsList && featuredPostsList.length > 0 && (
        <FeaturedPostSlider posts={featuredPostsList} redirectHandler={redirectHandler} />
        )}
        </>
      )
    }
      <HeadingWrapper>
        <BannerBar>{getTitle()}</BannerBar>
      </HeadingWrapper>
    </>
  )
}

HeadingSection.propTypes = {
  requestType: PropTypes.string,
}

export default HeadingSection
