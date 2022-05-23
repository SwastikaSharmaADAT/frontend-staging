import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { stripNonTextTagsExcludeHeaders } from '../../../../utilities/parseHtmlUtils'
import { createImageUrl, checkOldImage, imageErrorHandler } from '../../../../utilities/imageUtils'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import { useSelector } from 'react-redux'
import RightSideAds from '../../../YourProfile/RightSideAds'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { convertDate } from '../../../../utilities/convertDate'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 0 30px;
  padding: 0 0 10px 0;
  background: #fff;
  border: 0;
  max-width: 429px;
  width: 100%;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    max-width: 48%;
    margin: 0 auto 30px;
  }
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 auto 30px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 15px;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    max-height: 240px;
    object-fit: cover;
  }
  svg {
    font-size: 70px;
    color: #fff;
    position: absolute;
    cursor: pointer;
    @media (max-width: 767px) {
      font-size: 40px;
    }
  }
`
const Username = styled.div`
  font-family: 'Montserrat-Regular';
  padding: 0 15px;
  margin: 0 0 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 1.8;
  color: #222;
  cursor: pointer;
`
const DescriptionText = styled.div`
  padding: 0 15px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 28px;
  color: #222;
  font-family: 'Montserrat-Regular';
  padding: 15px;
  p,
  span {
    margin: 0;
    padding: 0;
  }
  max-height: 7em;
  overflow: hidden;
`

const SeeMoreWrapper = styled.span`
  font-size: 14px;
  color: #666;
  line-height: 4;
  padding: 0 15px;
  cursor: pointer;
`

const ExhiInfo = styled.div`
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0 0 0 16px;
  color: #666;
  border: 0;
  padding: 10px 0px 0px;
  font-family: 'Montserrat-Regular';
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const ListingContent = ({ article, type, redirectHandler, index }) => {
  
  const descriptionRef = useRef(null)
  const [val, setVal] = useState()
  const [city, translateCity] = useTranslateContent('')
  const [country, translateCountry] = useTranslateContent('')

  const getDescHeight = () =>
    descriptionRef && descriptionRef.current && descriptionRef.current.getBoundingClientRect().height

  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  // To rerender component
  useEffect(() => {
    if (!val) {
      const value = getDescHeight()
      setVal(value)
    }
  }, [val])
  const [title, translateTitle] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(article)){
      let newCountry
      if ( article.country === "Viet Nam") {
       newCountry = "Vietnam"
      }  else {
        newCountry = article.country
      }
      translateTitle(article.title)
      translateDescription(article.description)
      translateCity(article.city)
      translateCountry( newCountry )
    }
  }, [article.title,article.description,article.city,article.country ])

  const finaleDate = ( start, end ) => {
    if (  end === '2098-01-01T10:32:00.000Z' ) {
      return 'Permanent'
    }
    return convertDate( start ) + ' - ' + convertDate(end) 
  }

  return (
    <>
      {
        index !==0 && index % 5 === 0 && <ItemsWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}><RightSideAds rate={1} interNations={index % 10 === 0}/></ItemsWrapper>
      }
      <ItemsWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <CoverImg onClick={() => redirectHandler(`/${type}/${article.articleSlug}`)}>
          <img
            src={
              article && article.picUrl === null
                ? '/assets/image_not_available.png'
                : article.picUrl && article.picUrl.pictureUrl
                ? checkOldImage(article.picUrl.pictureUrl, 450, 250, 'mediaLibrary', type, article)
                : '/assets/mo-fallback-image.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(article.picUrl.pictureUrl),
                '/assets/mo-fallback-image.png',
                'mediaLibrary',
                ''
              )
            }}
            alt="Cover"
          />
        </CoverImg>
        <Username onClick={() => redirectHandler(`/${type}/${article.articleSlug}`)}>{title?title:article && article.title}</Username>
        { type === 'exhibition' && (
          <ExhiInfo className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
                {city}
                {(country || article.startDate || article.endDate) && ','} {country}{' '}
                { (article.startDate || article.endDate) && ' - '}
                {
                  finaleDate( article.startDate, article.endDate )
                }
                 {/* {article.startDate && convertDate(article.startDate)}
                {article.endDate && ' - '}
                {article.endDate && convertDate(article.endDate)} */}
          </ExhiInfo>
        )
        }
        <DescriptionText>
          <span ref={descriptionRef}>{ReactHtmlParser((description?description:article && article.description).replace(/<[^>]+>/g, ''))}</span>
        </DescriptionText>
        {getDescHeight() > 54 && (
          <SeeMoreWrapper onClick={() => redirectHandler(`/${type}/${article.articleSlug}`)}>
            See more...
          </SeeMoreWrapper>
        )}
      </ItemsWrapper>
    </>
  )
}

ListingContent.propTypes = {
  article: PropTypes.object,
  type: PropTypes.string,
  redirectHandler: PropTypes.func,
}

export default ListingContent
