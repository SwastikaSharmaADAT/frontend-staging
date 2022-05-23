import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import ReactHtmlParser from 'react-html-parser'
import { useSelector } from 'react-redux'

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
  blockquote {
    border-left: 1px solid #aaa;
    margin-top: 20px;
  }
  &.rtl-ar-content {
    direction: rtl;
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

const SubHeadingSection = styled.div`
  position: relative;
  padding: 0;
  background: #fff;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  color: #666;
  padding: 20px 20px;
  display: flex;
  align-items: center;
  padding-top: 0px;
  &.italic-heading {
    font-style: normal;
    padding: 0px;
    font-size: 18px;
    margin-left: 10px;
  }
`

const HeadingSection = ({ content }) => {
  const { t } = useTranslation('staticPages')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <HeadingWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <BannerBar>{t(`mobileApp.title`)}</BannerBar>
        <blockquote>
          <SubHeadingSection className="italic-heading">{t(`mobileApp.subHeading`)}</SubHeadingSection>
        </blockquote>
        <SubHeadingSection>{ReactHtmlParser(content['header'])}</SubHeadingSection>
      </HeadingWrapper>
    </>
  )
}

HeadingSection.propTypes = {
  content: PropTypes.any,
}

export default HeadingSection
