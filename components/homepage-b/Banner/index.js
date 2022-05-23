import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import BannerCaption from '../BannerCaption'
import { getFeaturedPost } from '../../../modules/landingPage/landingPageSlice'
import { createResizeImageUrl, createImageUrl, checkValidBackgroundImage } from '../../../utilities/imageUtils'
import { isLoginToken } from '../../../utilities/authUtils'

const BannerWrapper = styled.div`
  background: url(${(props) => props.pic});
  //padding: 35px;
  //min-height: 600px;
  background-color: black;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  //background-position: 0 -100px;
  background-attachment: fixed;
  //height: 90vh;
  height: 70vh;
  @media (max-width: 767px) {
    background: url(${(props) => props.pic});
    height: 490px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
  @media (min-width: 767px) and (max-width: 1250px) {
    background: url(${(props) => props.pic});
    height: 370px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
  }
`
const BannerContainerLogin = styled.div`
  // width: 100%;
  // position: relative;
  // max-width: 1290px;
  // padding: 0 15px;
  // margin: 0 auto;
  // display: flex;
  // height: 100%;
  // align-items: flex-start;
  // padding: 3% 0 9% ; 
  width: 100%;
  position: relative;
  max-width: 1290px;
  margin: 0px auto;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: 100%;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  padding: 3% 15px 9%;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (max-width: 1024px) {
    align-items: center;
    flex-direction: column;
    align-items: flex-start;
    padding: 3% 8% 9%;
  }
`

const HomepageBanner = ({ topRef }) => {
  const dispatch = useDispatch()

  const featuredPost = useSelector((state) => state.root.landingPage.featuredPost)
  const [bannerImg, setBannerImg] = useState(null)

  useEffect(() => {
    dispatch(getFeaturedPost())
  }, [dispatch])

  useEffect(() => {
    ;(() => {
      if (featuredPost && featuredPost.article && featuredPost.article.picUrl) {
        const resolutionUrl = createResizeImageUrl(featuredPost.article.picUrl.pictureUrl, 1920, 700, 'mediaLibrary')
        const origUrl = createImageUrl(featuredPost.article.picUrl.pictureUrl)

        const img = new Image()
        img.src = resolutionUrl
        setBannerImg(origUrl)
        // if (img.complete) {
        //   setBannerImg(resolutionUrl)
        // } else {
        //   img.onload = () => {
        //     setBannerImg(resolutionUrl)
        //   }
        //   img.onerror = () => {
        //     setBannerImg(origUrl)
        //   }
        // }
      }
    })()
  }, [featuredPost])

  return (
    <BannerWrapper ref={topRef} pic={bannerImg} className={isLoginToken() && 'userLoggedIn'}>
      <BannerContainerLogin>
        <BannerCaption
          featuredPost={featuredPost && featuredPost.article}
          type={featuredPost && featuredPost.onModel && featuredPost.onModel.slice(0, -1)}
        />
      </BannerContainerLogin>
    </BannerWrapper>
  )
}

export default HomepageBanner
