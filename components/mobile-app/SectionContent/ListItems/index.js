import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import {  useSelector } from 'react-redux'

const ItemWrapper = styled.div`
  display: flex;
  width: 49%;
  margin-bottom: 30px;
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    // flex-direction: column;
    height: 100%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    flex-direction: column;
    height: 100%;
    width: 100%;
  }
  @media (max-width: 767px) {
    width: 100%;
  }
  @media (max-width: 479px) {
    flex-direction: column;
    height: 100%;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    width: 49%;
    flex-direction: column;
  }
`

const Item = styled.div`
  display: flex;
  flex-direction: row;
  width: 180px;
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    flex-direction: column;
  }
  img {
    width: 180px;
    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
    }
    @media (max-width: 479px) {
      width: 100%;
    }
    @media (max-width: 767px) and (orientation: landscape) {
      width: 100%;
    }
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 479px) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 100%;
  }
`

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 180px);
  margin-left: 5px;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 100%;
    height: 100%;
    margin-left: 0;
  }
  @media (max-width: 479px) {
    width: 100%;
    height: 100%;
    margin-left: 0;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    width: 100%;
    margin-left: 0;
  }
`

const PanelContent = styled.div`
  background: #fff;
  border: 1px solid #ccc;
  padding: 10px;
  color: #666;
  a {
    text-decoration: none;
    color: #222;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    min-height: 270px;
  }
`

const PanelHead = styled.div`
  background: #888;
  color: #fff;
  padding: 10px;
`

const ListItem = ({ pic, content, index }) => {
  const { t } = useTranslation('staticPages')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <ItemWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
      <Item>
        <img src={pic} alt="" />
      </Item>
      <Panel>
        <PanelHead>
          {index !== '4' ? `${t(`mobileApp.step`)} ${index}` : `${t(`mobileApp.done`)}`}
        </PanelHead>
        <PanelContent>{ReactHtmlParser(content[`step${index}`])}</PanelContent>
      </Panel>
    </ItemWrapper>
  )
}

ListItem.propTypes = {
  pic: PropTypes.string,
  index: PropTypes.string,
  content: PropTypes.any,
}

export default ListItem
