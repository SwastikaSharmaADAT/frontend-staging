import React, { useEffect } from 'react'
import styled from 'styled-components'
import { AiFillEye } from 'react-icons/ai'
import { RiEditBoxFill, RiDeleteBin6Line } from 'react-icons/ri'
import { IoPricetagSharp } from 'react-icons/io5'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { openInNewTab } from '../../../../../utilities/newTabUtils'
import { currenciesList } from '../../../../../utilities/currenciesList'
import { decimalSeparatorMethod, numberWithCommas } from '../../../../../utilities/decimalSeparator'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../../utilities/imageUtils'
import useTranslateContent from '../../../../../hooks/useTranslateContent'
import { isEmptyObj } from '../../../../../utilities/checkEmptyObject'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 20px 20px 0;
  padding: 0 0 10px 0;
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  text-align: center;
  max-width: 268px;
  min-width: 268px;
  justify-content: center;
  @media (min-width: 991px) and (max-width: 1024px) {
    width: 30%;
    max-width: 100%;
    min-width: inherit;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 46%;
    max-width: 100%;
    min-width: inherit;
  }
  @media (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 20px;
    min-width: inherit;
    width: 100%;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 20px;
    min-width: inherit;
    width: 100%;
  }
`
const CoverImg = styled.div`
  position: relative;
  margin: 0;
  height: 200px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  @media (max-width: 1024px) {
    //max-height: 172px;
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
  }
  .hide {
    // display: none;
    // transition: 0.3s;
    display: block;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    height: 100%;
    width: 100%;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
  }
  // &:hover {
  //   display: block;
  //   .hide {
  //     position: absolute;
  //     background: rgba(0, 0, 0, 0.5);
  //     height: 100%;
  //     width: 100%;
  //     top: 0;
  //     display: flex;
  //     justify-content: center;
  //     align-items: center;
  //     flex-direction: row;
  //   }
  // }
`

const ArtworkName = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 15px auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  color: #000;
  padding: 0 10px;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`
const ArtworkPrice = styled.h1`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  text-align: center;
  color: #000;
  font-family: 'Montserrat-Regular';
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
const RowIcons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 30px;
  width: 100%;
  &.single-icon {
    justify-content: center;
  }
  @media (max-width: 1024px) {
    padding: 0 10px;
  }
`
const IconsWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex: 1;
  svg {
    font-size: 26px;
    color: #fff;
    @media (max-width: 1024px) {
      font-size: 22px;
    }
  }
`
const IconText = styled.div`
  font-size: 12px;
  color: #fff;
  margin: 3px 0 0;
`
const DraftDiv = styled.div`
  font-size: 14px;
  color: #fff;
  margin: 0;
  position: absolute;
  top: 0;
  right: 0;
  background: #222;
  text-transform: uppercase;
  padding: 4px 5px;
  z-index: 1;
  &.chgColor {
    background: red;
  }
  &.fltLeft {
    left: 0;
    width: 22%;
  }
  &.fltLgTextLeft {
    left: 0;
    width: 50%;
  }
  &.gryCol {
    background: #666;
  }
`
const DigitalSpan = styled.span`
  background: #eee;
  padding: 5px;
  text-transform: uppercase;
  font-size: 12px;
`
const NoteDiv = styled.div`
  font-size: 14px;
  color: #fff;
  margin: 0;
  position: absolute;
  top: 22px;
  left: -10px;
  background: #222;
  text-transform: uppercase;
  padding: 0;
  z-index: 1;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  img {
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
  }
  .ShowNote {
    display: none;
    transition: 0.3s;
    min-width: 120px;
    padding: 9px 10px;
    background: #000000;
    font-size: 13px;
    color: #fff;
  }
  &:hover {
    display: block;
    border-radius: 50% 50% 0 0;
    img {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      margin: 9px auto 0;
    }
    .ShowNote {
      position: absolute;
      top: 35px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      text-transform: initial;
      text-align: left;
    }
  }
`

const ListingContent = ({
  art,
  setOpenModal,
  setArtworkInModal,
  setModal,
  currency,
  conversionRate,
  decimalSeparator,
}) => {
  const { t } = useTranslation('dashboard')
  const router = useRouter()

  const [title, translateTitle] = useTranslateContent('')
  const [selfNote, translateSelfNote] = useTranslateContent('')

  useEffect(() => {
    if (!isEmptyObj(art)) translateTitle(art.title)
    translateSelfNote(art.selfNote)
  }, [art.selfNote, art.title])

  const getCurrencyDetail = (value) => {
    const obj = currenciesList.find((cur) => cur.value === value)
    return obj
  }

  const formattedPrice = (price) => {
    if (price.toString().includes(',')) {
      return price.toString().replace(',', '.')
    } else {
      return price
    }
  }
  // console.log(art)
  return (
    <>
      <ItemsWrapper>
        {art.moderated === 0 && !art.isDrafted && <DraftDiv>{t(`artworks.underReview`)}</DraftDiv>}
        {art.moderated === -1 && <DraftDiv>{t(`artworks.pending`)}</DraftDiv>}
        {!art.inStock && <DraftDiv className="chgColor fltLeft">{t(`artworks.sold`)}</DraftDiv>}
        {art.isDrafted && <DraftDiv className="gryCol">{t(`artworks.draft`)}</DraftDiv>}
        {art.isPublished && art.moderated === 1 && <DraftDiv>{t(`artworks.published`)}</DraftDiv>}
        {art.selfNote.length > 0 && (
          <NoteDiv>
            <img src="/assets/Notes.png" alt="" />
            <div className="ShowNote">{selfNote ? selfNote : art && art.selfNote}</div>
          </NoteDiv>
        )}
        <CoverImg>
          <img
            src={
              art && art.artPhotos && art.artPhotos.length > 0 && art.artPhotos[0].pictureUrl
                ? createResizeImageUrl(art.artPhotos[0].pictureUrl, 400, 'auto', 'mediaLibrary')
                : '/assets/artworkdemo.png'
            }
            onError={(e) => {
              imageErrorHandler(
                e,
                createImageUrl(art.artPhotos[0].pictureUrl),
                '/assets/artworkdemo.png',
                'mediaLibrary',
                ''
              )
            }}
            alt="Cover"
          />
          <div className="hide">
            <RowIcons className={!art.inStock ? 'single-icon' : ''}>
              <IconsWrap onClick={() => openInNewTab( `artworks/${art.productSlug}`)}>
                <AiFillEye />
                <IconText>{t(`dashboard:artworks.hover.view`)}</IconText>
              </IconsWrap>

              {art.inStock && (
                <>
                  <IconsWrap
                    onClick={() => {
                      setModal('quickEdit')
                      setArtworkInModal(art)
                      setOpenModal(true)
                    }}
                  >
                    <IoPricetagSharp />
                    <IconText>{t(`artworks.hover.quickEdit`)}</IconText>
                  </IconsWrap>
                  <IconsWrap onClick={() => router.push(`/artworks/edit/${art.productSlug}`)}>
                    <RiEditBoxFill />
                    <IconText>{t(`artworks.hover.edit`)}</IconText>
                  </IconsWrap>
                  <IconsWrap
                    onClick={() => {
                      setModal('delete')
                      setArtworkInModal(art)
                      setOpenModal(true)
                    }}
                  >
                    <RiDeleteBin6Line />
                    <IconText>{t(`artworks.hover.delete`)}</IconText>
                  </IconsWrap>
                </>
              )}
            </RowIcons>
          </div>
        </CoverImg>
        <ArtworkName>{title ? title : art && art.title} {art && art.artworkType === 'digital' ? <DigitalSpan>DIGITAL</DigitalSpan> : ''} </ArtworkName>
        <ArtworkPrice>
          {!art.priceOnRequest
            ? `${getCurrencyDetail(currency).symbol} ${numberWithCommas(formattedPrice(art.price) * conversionRate)}`
            : 'Price On Request'}
        </ArtworkPrice>
      </ItemsWrapper>
    </>
  )
}
ListingContent.propTypes = {
  art: PropTypes.object,
  setOpenModal: PropTypes.func,
  setArtworkInModal: PropTypes.func,
  setModal: PropTypes.func,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}
export default ListingContent
