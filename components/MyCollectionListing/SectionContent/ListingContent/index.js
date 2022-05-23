import React, { useRef, useEffect, useState } from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { useTranslation } from "next-i18next";
import ReactHtmlParser from "react-html-parser";
import { stripNonTextTags } from "../../../../utilities/parseHtmlUtils";
import {
  createImageUrl,
  createNsfwImageUrl,
  checkOldImage,
  imageErrorHandler,
} from "../../../../utilities/imageUtils";
import useTranslateContent from "../../../../hooks/useTranslateContent";
import { useSelector } from "react-redux";
import { isLoginToken } from '../../../../utilities/authUtils'
import { openInNewTab } from '../../../../utilities/newTabUtils'
import { saveAs } from 'file-saver'
import { downloadArtwork } from '../../../../modules/collection/collectionSlice'
import { useDispatch } from 'react-redux'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 0 30px;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 0;
  max-width: 429px;
  width: 100%;
  @media (min-width: 768px) and (max-width: 1024px) {
    width: 48%;
  }
  @media (max-width: 767px) {
    max-width: 48%;
    margin: 0 auto 30px;
  }
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 auto 30px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`;
const CoverImg = styled.div`
  position: relative;
  margin: 0 0 15px;
  width: 100%;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
    max-height: 240px;
    object-fit: cover;
  }
  svg {
    font-size: 70px;
    color: #fff;
    position: absolute;
    cursor: pointer;
    @media (max-width: 767px) {
      font-size: 40px;
    }
  }
`;
const Username = styled.div`
  font-family: "Montserrat-Regular";
  padding: 0 15px;
  margin: 0 0 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  color: #000;
  cursor: pointer;
`;
const DescriptionText = styled.div`
  padding: 0 15px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: normal;
  color: #222;
  font-family: "Montserrat-Regular";
  p,
  span {
    margin: 0;
    padding: 0;
  }
  max-height: 54px;
  overflow: hidden;
`;

const StatusText = styled.div`
  background: #000;
  color: #fff;
  position: absolute;
  top: 0;
  left: 0;
  padding: 3px 8px;
  text-transform: uppercase;
`

const ActionButtons = styled.div`
  background: rgba(0, 0, 0, 0.7);
  color: #fff;
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  right: 0;
`

const ActionButton = styled.div`
  padding: 6px 12px;
`

const SeeMoreWrapper = styled.span`
  font-size: 14px;
  color: #666;
  padding: 0 15px;
  cursor: pointer;
`;

const ListingContent = ({ artwork, type, redirectHandler }) => {
  const descriptionRef = useRef(null)
  const dispatch = useDispatch()
  const [val, setVal] = useState()
  const { t } = useTranslation("artworks")
  const getDescHeight = () =>
    descriptionRef &&
    descriptionRef.current &&
    descriptionRef.current.getBoundingClientRect().height;

  // To rerender component
  useEffect(() => {
    if (!val) {
      const value = getDescHeight()
      setVal(value)
    }
  }, [val]);
  const [title, translateTitle] =useTranslateContent('')
  const [description, translateDescription] =useTranslateContent('')
  const appLanguageCode = useSelector(
    (state) => state.root.staticContent.appLanguageCode
  )

  const downloadImg = async (artwork) => {
    if (artwork.artPhotos && artwork.artPhotos[0] && artwork.artPhotos[0].pictureUrl) {
      dispatch(downloadArtwork({artworkSlug: artwork.productSlug}, t))
    }
  };

  return (
    <>
      <ItemsWrapper
        className={appLanguageCode === "ar" ? "rtl-ar-content" : ""}
      >
        <CoverImg>
          <ActionButtons>
            <ActionButton onClick={(e) => openInNewTab(`/artworks/${artwork.productSlug}`,e)}>View</ActionButton>
            <ActionButton onClick={(e) => downloadImg(artwork)}>Download</ActionButton>
          </ActionButtons>
          <img
            src={
              artwork.artPhotos[0] &&
              createNsfwImageUrl(
                {
                  path: artwork.artPhotos[0].pictureUrl,
                  login: isLoginToken(),
                  age: 21,
                  genreList: artwork && artwork.genreId ? artwork.genreId : null,
                },
                400,
                'auto',
                'mediaLibrary',
                false
              )
            }
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(artwork.artPhotos[0].pictureUrl), '/public/assets/artworkdemo.png', 'mediaLibrary', '')
            }}
            alt="Cover"
          />
        </CoverImg>
        <Username
          onClick={(e) => openInNewTab(`/artwork/${artwork.productSlug}`,e)}
        >{artwork.title}
        </Username>
      </ItemsWrapper>
    </>
  );
};

ListingContent.propTypes = {
  artwork: PropTypes.object,
  redirectHandler: PropTypes.func,
};

export default ListingContent;
