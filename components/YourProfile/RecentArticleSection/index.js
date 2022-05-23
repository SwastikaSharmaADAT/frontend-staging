import React, { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import { openInNewTab } from '../../../utilities/newTabUtils'
import SingleItem from './SingleItem'
import { useRouter } from 'next/router'
import useTranslateContent from '../../../hooks/useTranslateContent'
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
  align-items: flex-start;
  padding: 0;
`

const List = React.memo(
  ({ articles, titles }) => (
    <>
      {articles.map((article,ind) => (
        <SingleItem  key={article._id} article={article} />
      ))}
    </>
  ),
  (prevProps, nextProps) => {
    if (prevProps.articles.length === nextProps.articles.length) {
      return true // props are equal
    }
    return false // props are not equal -> update the component
  }
)

const RecentArticlesSection = () => {
  const router = useRouter()
  const lang = useSelector((state) => state.root.staticContent.appLanguageCode)

  const { t } = useTranslation('rightSection')
  const buzzArticles = useSelector((state) => state.root.landingPage.buzzArticles)

  let articles = []
  if (buzzArticles && buzzArticles.length > 2) {
    articles = buzzArticles.slice(0, 2)
  } else {
    articles = buzzArticles
  }
  const [title, translateTitle] = useTranslateContent('')

  let titleString = ''

  if(articles.length && lang !== 'en')  {  
    titleString = getString(lang,articles,'title')
  }

  useEffect(()=>{
      if(articles.length && lang !== 'en')
      translateTitle(titleString)
  },[titleString, translateTitle])
  return (
    <>
      {articles && articles.length > 0 && (
        <NeedHelpSectionWrap>
          <SectionHead>
            <SectionHeading>{t(`rightSection:buzz`)}</SectionHeading>
            <SectionHeadButtons onClick={() => openInNewTab(`/buzz`)}>
              <TopButtons>{t(`rightSection:seeAll`)}</TopButtons>
            </SectionHeadButtons>
          </SectionHead>
          <SectionContent>
            <List titles={getArray(title)} articles={articles} />
          </SectionContent>
        </NeedHelpSectionWrap>
      )}
    </>
  )
}

export default RecentArticlesSection
