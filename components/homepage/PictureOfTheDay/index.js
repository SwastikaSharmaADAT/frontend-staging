import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { openInNewTab } from '../../../utilities/newTabUtils'
import SinglePotd from './SinglePotd'
import { useRouter } from 'next/router'
import { getArray, getString } from '../../../utilities/getTranslatedContent'
import useTranslateContent from '../../../hooks/useTranslateContent'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 45px 0;
  width: 100%;
  background: #0A0A0A;
  @media (max-width: 767px) {
    padding: 30px 0 80px 0;
  }
  @media( max-width: 1250px ){
    .mobile-wrap {
      padding: 0 15px
    }
  }
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0.7em 0;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  @media (max-width: 767px) {
    font-size: 24px;
  }
`

const VideosContainer = styled.div`
  width: 100%;
  position: relative;
  background: #000 ;
  max-width: 1435px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
  border: 1px solid #fff;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    width: 1094px ;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
`
const VideosWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  max-width: 1290px;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 767px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    li {
      text-align: center;
      margin: 0 0 15px;
      padding: 0;
      max-width: 418px;
      background: #000;
      //border: 1px solid #ffffff;
      width: 100%;
      display: inline-block;
      overflow: hidden;
      position: relative;
      &:nth-child(3) { 
        @media (max-width: 767px) {
          display: none
        }
      }
      @media (max-width: 767px) {
        flex: 0 0 48%;
      }
      a {
        color: #fff;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        text-transform: uppercase;
        img {
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
          max-height: 190px;
          height: 100%;
          overflow: hidden;
        }
        :hover {
          img {
            transform: scale(1.05);
          }
          h1 {
            //background: #666;
            background: #000 ;
            transition: all 0.2s ease-in-out;
          }
        }
      }
    }
  }
`

const ButtonText = styled.button`
  background: #000;
  border-top: 1px solid #4c4c4c;
  border-right: 0;
  border-left: 0;
  border-bottom: 0;
  width: 100%;
  font-style: normal;
  color: #fff;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  font-weight: normal;
  font-style: normal;
  padding: 7px 15px;
  margin: 30px auto 0;
  :hover,
  :focus {
    background: #666666;
    //background: #000 ;
    outline: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

const PictureOfTheDay = () => {
  const router = useRouter()

  const { t } = useTranslation(['landingPage'])
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)
  const potdArticles = useSelector((state) => state.root.landingPage.potdArticles)

  const [title, translateTitle] = useTranslateContent('')

  let titleString = ''

  if(potdArticles.length && lang !== 'en')  {  
    titleString = getString(lang,potdArticles,'title')
  }

  useEffect(()=>{
      if(titleString && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])
  return (
    <>
      {potdArticles && potdArticles.length > 0 && (
        <FeatureWrapper>
          <div className="mobile-wrap">
          <VideosContainer>
            <MainHeading>{t(`potdSection.title`)}</MainHeading>
            <VideosWrap>
              <ul>
                {potdArticles.map((article,ind) => (
                  <SinglePotd ind={ind} titles={getArray(title)} key={article._id} article={article} openInNewTab={openInNewTab} />
                ))}
              </ul>
            </VideosWrap>
            <ButtonText onClick={() => router.push(`/potd`)}>{t(`potdSection.seeMore`)}</ButtonText>
          </VideosContainer>
          </div>
        </FeatureWrapper>
      )}
    </>
  )
}

export default PictureOfTheDay
