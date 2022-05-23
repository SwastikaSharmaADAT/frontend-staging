import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { getRecentVideos } from '../../../modules/landingPage/landingPageSlice'
import SingleVideo from './SingleVideo'
import VideoPopup from '../../Videos/SectionContent/VideoPopup'
import { useRouter } from 'next/router'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { getArray, getString } from '../../../utilities/getTranslatedContent'

const FeatureWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 50px 0 70px 0;
  width: 100%;
  background: #0e0e0e;
  @media ( max-width: 767px ){
    height: 315px ;
    padding: 100px 0 30px;
  }
  .res-wrap {
    padding: 0 15px ;
  }
  // @media ( min-width: 767px ) and ( max-width: 1250px) {
  //   .res-wrap {
  //     padding: 0 15px ;
  //   }
  // }
`

const MainHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0.7em 0 1.5em;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 34px;
  text-align: center;
  color: #fff;
  @media( max-width: 767px ) {
    margin: 0 auto 30px;
    font-size: 24px;
  }
`

const VideosContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-wrap: wrap;
  justify-content: center;
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
  // @media(max-width: 767px) {
  //   padding: 0 15px;
  // }
`
const VideosWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    width: 100%;
    justify-content: space-between;
    
    @media (max-width: 767px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    li {
      text-align: center;
      margin: 0 0 15px;
      padding: 0;
      max-width: 418px;
      border: 1px solid #ffffff;
      background: #222222;
      width: 100%;
      display: inline-block;
      overflow: hidden;
      position: relative;
      @media( min-width: 767px ) {
      flex: 0 0 33.3%;
      box-sizing: border-box;
      max-width: 466px;
      border: none;
      }
      
      @media (max-width: 1280px) {
        max-width: 32%;
      }
      @media (max-width: 767px) {
        max-width: 48%;
      }
      @media (max-width: 479px) {
        max-width: 100%;
      }
      a {
        color: #fff;
        font-size: 14px;
        line-height: 17px;
        text-transform: uppercase;
        img {
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
        }
        svg {
          font-size: 40px;
          position: absolute;
        }
        :hover {
          img {
            transform: scale(1.05);
          }
          h1 {
            background: #666;
            transition: all 0.2s ease-in-out;
          }
        }
      }
    }
  }
`

const ButtonText = styled.button`
  background: #000;
  border: 1px solid #fff;
  font-style: normal;
  color: #fff;
  align-items: center;
  font-size: 16px;
  cursor: pointer;
  font-family: 'Montserrat-Regular';
  font-weight: normal;
  font-style: normal;
  padding: 7px 15px;
  margin: 0 auto;
  :hover,
  :focus {
    background: #666666;
    outline: none;
  }
`
const VideosContent = styled.div`
// position: relative;
// margin: 0;
// display: flex;
// flex-direction: row;
// justify-content: space-between;
// width: 100%;
// align-items: center;
// padding: 0;
position: relative;
    margin: 0px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
        -ms-flex-direction: row;
            flex-direction: row;
    -webkit-box-pack: justify;
    -ms-flex-pack: justify;
        justify-content: space-between;
    width: 100%;
    -webkit-box-align: start;
        -ms-flex-align: start;
            align-items: flex-start;
    padding: 0px;
`

const Videos = () => {
  const router = useRouter()

  const dispatch = useDispatch()
  const { t } = useTranslation('landingPageB')

  const [popUp, setPopup] = useState(false)
  const [popUpVideo, setPopUpVideo] = useState()

  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)
  const recentVideos = useSelector((state) => state.root.landingPage.recentVideos)
  const rerender = useSelector((state) => state.root.myProfile.reRenderLandingPage)
  // To call api again after logout
  useEffect(() => {
    if (rerender) {
      dispatch(getRecentVideos())
    }
  }, [dispatch, rerender])

  useEffect(() => {
    dispatch(getRecentVideos())
  }, [dispatch])

  const [title, translateTitle] = useTranslateContent('')

  let titleString = ''

  if(recentVideos.length && lang !== 'en')  {  
    titleString = getString(lang,recentVideos,'title')
  }

  useEffect(()=>{
      if(titleString && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])
  return (
    <>
      <VideoPopup popUpVideo={popUpVideo} popUp={popUp} setPopup={setPopup} />
      {recentVideos && recentVideos.length > 0 && (
        <FeatureWrapper>
          <div className="res-wrap">
          <VideosContainer>
            <MainHeading>{t(`videosSection.title`)}</MainHeading>
            <VideosWrap>
              <VideosContent>
                {recentVideos.map((vid,ind) => (
                  <SingleVideo 
                      ind={ind}
                      titles={getArray(title)}
                      setPopup={setPopup}
                      setPopUpVideo={setPopUpVideo}
                      vid={vid}
                      key={vid._id} />
                ))}
              </VideosContent>
            </VideosWrap>
            <ButtonText onClick={() => openInNewTab(`/videos`)}>{t(`videosSection.seeMore`)}</ButtonText>
          </VideosContainer>
          </div>
        </FeatureWrapper>
      )}
    </>
  )
}

export default Videos
