import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import ListItem from './ListItems'
import {  useSelector } from 'react-redux'

const InviteContentWrapper = styled.div`
  position: relative;
  margin: 25px 0 17px;
  padding: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const ListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`

const NoteDiv = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 25px 0 17px;
  color: #666;
  font-size: 18px;
  &.rtl-ar-content {
    direction: rtl;
  }
`

const SectionContent = ({ content }) => {
  const { t } = useTranslation(['translation', 'staticPages'])
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <InviteContentWrapper>
        <ListingWrap>
          <ListItem pic='/assets/mobileApp/step1.jpg' content={content} index="1" />
          <ListItem pic='/assets/mobileApp/step2.jpg' content={content} index="2" />
          <ListItem pic='/assets/mobileApp/step3.png' content={content} index="3" />
          <ListItem pic='/assets/mobileApp/step4.jpg' content={content} index="4" />
        </ListingWrap>
        <NoteDiv className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          {t(`staticPages:mobileApp.note`)}
          <br />
          {ReactHtmlParser(content['note'])}
        </NoteDiv>
      </InviteContentWrapper>
    </>
  )
}

SectionContent.propTypes = {
  content: PropTypes.any,
}

export default SectionContent
