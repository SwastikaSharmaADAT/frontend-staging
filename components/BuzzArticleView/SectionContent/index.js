import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { articleListing } from '../../../modules/articlePages/articlePagesSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import ArticleSlider from '../../BuzzListing/SectionContent/ArticleSlider'
import SectionDescription from './SectionDescription'
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

const SectionContent = ({ article, articleType, redirectHandler, loggedInUsername }) => {
  const { t } = useTranslation('articles')

  const dispatch = useDispatch()

  const buzzArticles = useSelector((state) => state.root.articlePages.sliderBuzzItems)

  useEffect(() => {
    if (articleType === 'buzz') {
      dispatch(articleListing('buzz', 10, 0, 'slider'))
    }
  }, [dispatch, articleType])
  
  return (
    <div  >
      <InviteContentWrapper>
        {!isEmptyObj(article) && (
          <SectionDescription
            article={article}
            articleType={articleType}
            redirectHandler={redirectHandler}
            loggedInUsername={loggedInUsername}
          />
        )}
        {articleType === 'buzz' && buzzArticles && buzzArticles.length > 0 && (
          <ArticleSlider
            title={t(`buzzListing.title`)}
            articles={buzzArticles}
            type="buzz"
            redirectHandler={redirectHandler}
          />
        )}
      </InviteContentWrapper>
    </div>
  )
}

SectionContent.propTypes = {
  article: PropTypes.object,
  articleType: PropTypes.string,
  redirectHandler: PropTypes.func,
  loggedInUsername: PropTypes.string,
}

export default SectionContent
