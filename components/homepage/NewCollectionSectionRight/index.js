import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import NewCollectionSectionSlider from '../NewCollectionSectionSliderRight'
import { getLatestArtworks } from '../../../modules/landingPage/landingPageSlice'

const FeatureWrapper = styled.div`
  position: relative;
  width: 100%;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
  width: auto;
  position: relative;
  margin: 0 0 30;
  display: flex;
  flex-direction: column;
  padding: 30px 18px;
  max-width: 350px;
  margin: 0 auto 30px;
  align-items: center;
  justify-content: center;
  @media (max-width: 1024px) {
    max-width: 310px;
  }
  .react-multiple-carousel__arrow {
    border: 1px solid #000;
    &:before {
      color: #000;
    }
    &:hover {
      background-color: #ffffff;
    }
    @media (max-width: 767px) {
      border: 1px solid #ccc;
    }
  }
`

const FeatureContainer = styled.div`
  width: 100%;
  position: relative;
  /* max-width: 1290px; */
  padding: 0;
  margin: 0 auto;
  display: flex;
  height: 100%;
  flex-direction: column;
  /* @media (max-width: 1280px) {
    width: auto;
  } */
`

const MainHeading = styled.h1`
  text-transform: uppercase;
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: -1px auto -50px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: center;
  color: #000;
`

const NewCollectionSectionRight = () => {
  const { t } = useTranslation('rightSection')

  const dispatch = useDispatch()

  const latestArtworks = useSelector((state) => state.root.landingPage.latestArtworks)

  useEffect(() => {
    dispatch(getLatestArtworks())
  }, [dispatch])

  return (
    <>
      {latestArtworks && latestArtworks.length > 0 && (
        <FeatureWrapper>
          <FeatureContainer>
            <MainHeading>{t(`newArtworks`)}</MainHeading>
            <NewCollectionSectionSlider latestArtworks={latestArtworks} />
          </FeatureContainer>
        </FeatureWrapper>
      )}
    </>
  )
}

export default NewCollectionSectionRight
