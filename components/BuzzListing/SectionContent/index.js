import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { articleListing } from '../../../modules/articlePages/articlePagesSlice'
import { getVideos } from '../../../modules/articles/articleSlice'
import { getRecentVideos } from '../../../modules/landingPage/landingPageSlice'
import ArticleSlider from './ArticleSlider'
import VideoSlider from './VideoSlider'

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

const SectionContent = () => {
  const { t } = useTranslation(['articles', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()

  const buzzArticles = useSelector((state) => state.root.articlePages.sliderBuzzItems)
  const exhibitionArticles = useSelector((state) => state.root.articlePages.sliderExhibitionItems)
  const potdArticles = useSelector((state) => state.root.articlePages.sliderPotdItems)
  const videos = useSelector((state) => state.root.article.videos)

  useEffect(() => {
    dispatch(articleListing('buzz', 10, 0, 'slider'))
    dispatch(articleListing('exhibition', 10, 0, 'slider'))
    dispatch(articleListing('potd', 10, 0, 'slider'))
    dispatch(getVideos({ t }))
  }, [dispatch])

  const redirectHandler = (route) => {
    router.push(route)
  }

  return (
    <>
      <InviteContentWrapper>
        {buzzArticles && buzzArticles.length > 0 && (
          <ArticleSlider
            title={t(`buzzListing.title`)}
            articles={buzzArticles}
            type="buzz"
            redirectHandler={redirectHandler}
          />
        )}
        {exhibitionArticles && exhibitionArticles.length > 0 && (
          <ArticleSlider
            title={t(`exhibitionListing.title`)}
            articles={exhibitionArticles}
            type="exhibition"
            redirectHandler={redirectHandler}
          />
        )}
        {potdArticles && potdArticles.length > 0 && (
          <ArticleSlider
            title={t(`potd.title`)}
            articles={potdArticles}
            type="potd"
            redirectHandler={redirectHandler}
          />
        )}
        {videos && videos.length > 0 && (
          <VideoSlider title="Videos" videos={videos} type="videos" redirectHandler={redirectHandler} />
        )}
      </InviteContentWrapper>
    </>
  )
}

export default SectionContent
