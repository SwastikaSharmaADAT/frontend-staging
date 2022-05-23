import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useRouter } from 'next/router'
import { useDispatch } from 'react-redux'
import { AiFillEye } from 'react-icons/ai'
import { useTranslation } from 'next-i18next'
import { setAllArtists } from '../../../../modules/subscription/subscriptionSlice'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../utilities/imageUtils'

const ArtworkPostWrap = styled.div`
  width: 100%;
  max-height: 1000px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 10px;
  height: 100%;
  position: relative;
  img {
    width: 100%;
    max-height: 1000px;
  }
`
const ArtworkTextWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  font-size: 36px;
  position: absolute;
  cursor: pointer;
  height: 100%;
  background: rgba(0,0,0,0.4);

  svg {
    font-size: 48px;
  }
`

const ArtworkPost = ({ picUrl, info }) => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation('newsFeed')

  const redirectHandler = () => {
    if(info && info.productSlug)
      router.push(`/artworks/${info.productSlug}`)
  }
  return (
    <>
      {picUrl && (
        <ArtworkPostWrap>
          <img
            src={createResizeImageUrl(picUrl, 'auto', 720, 'mediaLibrary')}
            onError={(e) => {
              imageErrorHandler(e, createImageUrl(picUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
            }}
            alt="ArtworkBG"
          />
          <ArtworkTextWrap onClick={() => redirectHandler()}>
            <AiFillEye />
            {t(`singlePost.seeInStore`)}
          </ArtworkTextWrap>
        </ArtworkPostWrap>
      )}
    </>
  )
}

ArtworkPost.propTypes = {
  picUrl: PropTypes.string,
  info: PropTypes.string,
}

export default ArtworkPost
