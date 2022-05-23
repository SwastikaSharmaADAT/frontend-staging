import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import ReactHtmlParser from 'react-html-parser'
import { AiOutlineFilePdf } from 'react-icons/ai'

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
  text-transform: capitalize;
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
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-bottom: 0px;
`

const SubHeading = styled.div`
  blockquote {
    border-left: 1px solid #aaa;
    font-style: normal;
    margin-left: 15px;
    span {
      padding-left: 15px;
    }
  }
`

const PdfButton = styled.button`
  background: #e04444;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 16px;
  margin-top: 10px;
  cursor: pointer;
  width: auto;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  padding: 12px 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    margin-right: 10px;
  }
  :hover,
  :focus {
    background: #e04444;
    outline: none;
  }
`

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  width: 100%;
`
const HeadingSection = ({ artworkContent }) => {
  const { t } = useTranslation('staticPages')

  return (
    <>
      <HeadingWrapper>
        <BannerBar>{t(`artworkUploadInst.headerTitle`)}</BannerBar>
        <SubHeadingSection>
          <SubHeading>{ReactHtmlParser(artworkContent['header'])}</SubHeading>
          <ButtonWrapper>
            <PdfButton onClick={() => window.open('/assets/ARTMO_Artwork_Upload_Instructions_Physical.pdf', '_blank')}>
              <AiOutlineFilePdf />
              {t(`artworkUploadInst.pdf`)}
            </PdfButton>
            <PdfButton onClick={() => window.open('/assets/ARTMO_Artwork_Upload_Instructions_Digital.pdf', '_blank')}>
              <AiOutlineFilePdf />
              {t(`artworkUploadInst.pdfDigital`)}
            </PdfButton>
          </ButtonWrapper>
        </SubHeadingSection>
      </HeadingWrapper>
    </>
  )
}


HeadingSection.propTypes = {
  artworkContent: PropTypes.any,
}

export default HeadingSection
