import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import ReactHtmlParser from 'react-html-parser'
import { getContent } from '../../../../../modules/staticContent/staticContentSlice'
import { useTranslation } from 'next-i18next'
import useTranslateContent from '../../../../../hooks/useTranslateContent'

const ListingWrap = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 20px 30px;
  line-height: 1.7;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  background: #fff;
  margin-bottom: 20px;
  font-size: 16px;
  color: #666;
  h4 {
    color: #222;
    font-size: 24px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const DescriptionHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 15px 0 15px;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: normal;
  text-align: left;
  color: #222;
  &.rtl-ar-content {
    text-align: right;
  }
  @media (max-width: 767px) {
    font-size: 18px;
  }
`
const AboutDescription = styled.p`
  max-width: 100%;
  font-size: 16px;
  line-height: 1.7;
  display: flex;
  align-items: center;
  color: #666;
  margin: 0;
  padding: 0;
  @media (max-width: 479px) {
    font-size: 14px;
    max-width: 100%;
    line-height: 20px;
  }
`

// const ListDescription = styled.p`
//   max-width: 100%;
//   font-size: 16px;
//   line-height: 36px;
//   display: flex;
//   align-items: flex-start;
//   color: #222222;
//   margin: 0;
//   padding: 0;
//   ::before {
//     counter-increment: section;
//     content: counter(section) '.';
//     padding-right: 5px;
//   }
//   @media (max-width: 479px) {
//     font-size: 14px;
//     max-width: 100%;
//     line-height: 20px;
//   }
// `

const ShippingPolicySection = ({ shippingPolicy }) => {
  const dispatch = useDispatch()

  const [shipPolicy,translateShipPolicy]=useTranslateContent('')
  useEffect(()=>{
    if(shippingPolicy)
    translateShipPolicy(shippingPolicy)
  },[shippingPolicy,translateShipPolicy])

  const {t}=useTranslation(['translation','artworks'])
  useEffect(() => {
    dispatch(getContent('ARTWORK_DETAILS_artmo_policy', t, 'artworkDetails'))
  }, [dispatch])

  const artmoShippingPolicy = useSelector((state) => state.root.staticContent.artmoShippingPolicy)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return (
    <>
      <ListingWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        {shippingPolicy && shippingPolicy.length > 0 && (
          <>
            <DescriptionHeading className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`artworks:returnPolicyTitle`)}</DescriptionHeading>
            <AboutDescription>{shipPolicy ? shipPolicy : shippingPolicy}</AboutDescription>
          </>
        )}
        <DescriptionHeading>{t(`artworks:shippingPolicyTitle`)}</DescriptionHeading>
        {ReactHtmlParser(artmoShippingPolicy)}
      </ListingWrap>
    </>
  )
}
ShippingPolicySection.propTypes = {
  shippingPolicy: PropTypes.string,
}
export default ShippingPolicySection
