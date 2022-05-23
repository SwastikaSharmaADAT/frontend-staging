import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { useRouter } from 'next/router'
import useTranslateContent from '../../../hooks/useTranslateContent'

const BannerCaptionWrapper = styled.div`
    max-width: 44.6%;
    background: rgba(102, 102, 102, 0.5);
    border: 1px solid rgba(255, 255, 255, 0.05);
    padding: 15px 15px 8px;
    width: auto;
    color: rgb(255, 255, 255);
    box-sizing: border-box;
    min-width: 255px;
    cursor: pointer;
    // @media( max-width: 450px ) {
    //   max-width: 92%;
    //   width: 100%;
    // }
    @media ( max-width: 767px ) {
      min-width: 200px;
    }
`

const TopTagline = styled.h3`
  color: #ffffff;
  //text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
  font-size: 16px;
  line-height: normal;
  color: #fff;
  font-family: 'Montserrat-Regular';
  margin-bottom: 1em;
  margin-top: 0;
  font-weight: normal;
  font-style: normal;
  margin-bottom: 8px;
  cursor: pointer;
  @media ( max-width: 767px ) {
    font-size: 14px;
    margin-bottom: 3px ;
  }
`

const TopHeading = styled.h1`
  // font-family: 'Montserrat-Medium';
  // font-weight: 100;
  // font-style: normal;
  // font-size: 24px;
  // color: #ffffff;
  // text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
  // margin: 0 0 10px 0;
  // padding: 0;
  // @media (max-width: 767px) {
  //   font-size: 18px;
  //   line-height: normal;
  // }
   // text-shadow: rgb(0 0 0 / 50%) 1px 1px 8px;
    font-size: 24px;
    color: rgb(255, 255, 255);
    font-family: Montserrat-Regular;
    font-weight: 400;
    line-height: 1.6em;
    margin-bottom: 1em;
    margin-top: 8px;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    display: -webkit-box;
    font-weight: normal;
    font-style: normal;
    cursor: pointer;
    @media ( max-width: 767px ) {
      font-size: 17px;
      line-height: normal;
      margin-bottom: 5px ;
      margin-top: 5px;
    }
`

// const BannerPara = styled.p`
//   display: none; 
//   margin: 0 0 10px 0;
//   padding: 0;
//   color: #ffffff;
//   text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
//   font-size: 12pt;
//   color: #fff;
//   font-style: normal;
//   line-height: 1.6em;
//   margin-bottom: 1em;
//   @media( max-width: 450px ) {
//     display: none ;
//   }
// `

const SeeMoreLink = styled.a`
    color: #fff;
    font-family: 'Montserrat-Regular';
    padding-right: 1.75em;
    display: inline-block;
    position: relative;
	  font-size: 14px;
   // text-shadow: 1px 1px 8px rgba(0, 0, 0, 0.5);
    line-height: normal;
    font-weight: normal;
    font-style: normal;
    @media ( max-width: 767px ) {
      font-size: 14px;
     
    }
`

const BannerCaption = ({ featuredPost, type }) => {
  const { t } = useTranslation(['translation', 'landingPageB'])
  const router = useRouter()

  const truncate = ( string, no_words ) => {
    return string.split(" ").splice(0,no_words).join(" ");
  }
  const [title,translateTitle]=useTranslateContent('')
  useEffect(()=>{
    if(!isEmptyObj(featuredPost))
    translateTitle(featuredPost.title)
  },[featuredPost, translateTitle])
  return (
    <>
      {!isEmptyObj(featuredPost) && (
        <BannerCaptionWrapper onClick={() => openInNewTab(`/${type}/${featuredPost.articleSlug}`)}>
          <TopTagline>{t(`landingPage:bannerSection.todaysFeature`)}</TopTagline>
          <TopHeading>{title ? title : featuredPost.title}</TopHeading>
          {/* <BannerPara>{ReactHtmlParser( truncate (featuredPost.description, 25 ), { transform: stripNonTextTags })}</BannerPara> */}
          <SeeMoreLink>
            {t(`landingPage:bannerSection.seeMore`)}
          </SeeMoreLink>
        </BannerCaptionWrapper>
      )}
    </>
  )
}

BannerCaption.propTypes = {
  featuredPost: PropTypes.object,
  type: PropTypes.string,
}

export default BannerCaption
