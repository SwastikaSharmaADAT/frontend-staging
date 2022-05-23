import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import SectionHeader from './../SeeAllAddSectionHeader'
import SectionContent from './SectionContent'


import { getUserWishlist } from '../../../modules/wishlist/wishlistSlice'

const ArtworkSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 16px;
  display: flex;
  flex-direction: column;
  padding: 30px 35px 0;
  justify-content: space-between;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    padding: 15px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const WishlistSection = ({ refObject, currency, conversionRate, decimalSeparator }) => {
  const { t } = useTranslation('profile')
  const router = useRouter()
  const dispatch = useDispatch()
  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const myWishlist = useSelector((state) => state.root.wishlist.myWishlist)

  

  useEffect(() => {
    if (userDataState && userDataState.uuid)  dispatch(getUserWishlist( userDataState.uuid ))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userDataState])


  const addHandler = () => {
    router.push(`/artworks`)
  }

  const seeAllHandler = () => {
    router.push('/artworks?pageType="wishlist"')
  }

  return (
    <>
      <ArtworkSectionWrap className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
          <SectionHeader
            heading="Wishlisted Artworks"
            userData={userDataState}
            addHandler={addHandler}
            type={'artwork'}
            seeAllHandler={seeAllHandler}
            hideSeeAllBtn={(myWishlist && myWishlist.length === 0) ? true : false}
            hideAddBtn={false}
          />
          <SectionContent
            userArtworks={myWishlist}
            currency={currency}
            conversionRate={conversionRate}
            decimalSeparator={decimalSeparator}
          />
      </ArtworkSectionWrap>
    </>
  )
}

WishlistSection.propTypes = {
  refObject: PropTypes.object,
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
}
export default WishlistSection
