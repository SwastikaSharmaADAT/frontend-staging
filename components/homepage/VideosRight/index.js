import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { getRecentVideos } from '../../../modules/landingPage/landingPageSlice'
import SingleVideo from './SingleVideo'
import VideoPopup from '../../Videos/SectionContent/VideoPopup'
import { useRouter } from 'next/router'
import { getArray, getString } from '../../../utilities/getTranslatedContent'

const NeedHelpSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: column;
  padding: 18px;
  max-width: 350px;
  margin: 0 auto 30px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  svg {
    font-size: 22px;
    margin: 0 10px 0 0;
  }
  @media (max-width: 1024px) {
    max-width: 310px;
  }
  @media (max-width: 991px) {
    max-width: 315px;
  }
`
const SectionHead = styled.div`
  position: relative;
  margin: 0 0 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0;
  @media (max-width: 767px) {
    padding: 0 0 15px;
  }
`
const SectionHeading = styled.h1`
  text-transform: uppercase;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #222222;
  padding: 0;
  margin: 0;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    line-height: normal;
    margin: 0;
  }
`

const SectionHeadButtons = styled.div`
  width: auto;
  position: relative;
  display: flex;
  @media (max-width: 767px) {
    margin-top: 0px;
  }
`

const TopButtons = styled.button`
  font-weight: 400;
  font-size: 14px;
  line-height: normal;
  text-align: center;
  color: #222222;
  background: #eeeeee;
  width: auto;
  border: 0;
  padding: 6px 13px;
  cursor: pointer;
  display: flex;
  align-items: center;
  :hover {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
`

const SectionContent = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  padding: 0;
`

const VideosRight = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)

  const { t } = useTranslation(['translation', 'landingPage'])
  const [description, translateDescription] = useTranslateContent('')

  const recentVideos = useSelector((state) => state.root.landingPage.recentVideos)
  const rerender = useSelector((state) => state.root.myProfile.reRenderLandingPage)

  const [popUp, setPopup] = useState(false)
  const [popUpVideo, setPopUpVideo] = useState()

  // To call api again after logout
  useEffect(() => {
    if (rerender) {
      dispatch(getRecentVideos())
    }
  }, [dispatch, rerender])

  useEffect(() => {
    dispatch(getRecentVideos())
  }, [dispatch])

  let VideosSidebar = []
  if (recentVideos && recentVideos.length > 2) {
    VideosSidebar = recentVideos.slice(0, 2)
  } else {
    VideosSidebar = recentVideos
  }
  
    let descriptionString = ''
    if(VideosSidebar.length && lang !== 'en')    
    descriptionString = getString(lang,VideosSidebar,'description')

  useEffect(()=>{
    if(descriptionString && lang !== 'en')
      translateDescription(descriptionString)
  },[descriptionString, translateDescription])
  
  return (
    <>
      <VideoPopup popUpVideo={popUpVideo} popUp={popUp} setPopup={setPopup} />
      {VideosSidebar && VideosSidebar.length > 0 && (
        <NeedHelpSectionWrap>
          <SectionHead>
            <SectionHeading>{t(`landingPage:videosSection.title`)}</SectionHeading>
            <SectionHeadButtons onClick={() => router.push(`/videos`)}>
              <TopButtons>{t(`rightSection:seeAll`)}</TopButtons>
            </SectionHeadButtons>
          </SectionHead>
          <SectionContent>
            {VideosSidebar.map((vid,ind) => (
              <SingleVideo ind={ind} names={getArray(description)} setPopup={setPopup} setPopUpVideo={setPopUpVideo} vid={vid} key={vid._id} />
            ))}
          </SectionContent>
        </NeedHelpSectionWrap>
      )}
    </>
  )
}

export default VideosRight
