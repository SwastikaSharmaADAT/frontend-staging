import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import InfiniteScroll from 'react-infinite-scroll-component'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import GhostLoader from '../../../UI/GhostLoader'
import { countriesUsingDecimal } from '../../../../utilities/decimalUsingCountries'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject.js'
import { deleteArtwork, getArtworklist } from '../../../../modules/dashboard/dashboardSlice'
import QuickEditModal from '../QuickEditModal'
import ModalComponent from '../../../UI/Modal'
import ConfirmBox from '../../../UI/ConfirmBox'
import EndMessage from '../../../UI/GhostLoader/EndMessage'
import ListingContent from './ListingContent'

const ListingWrap = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin: 55px 0 0;
  .infinite-scroll-component {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    flex-direction: row;
    justify-content: flex-start;
    overflow: visible !important;
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .end-message-container {
    text-align: center;
    margin: 0 auto;
  }
`
const GhostStyling = styled.div`
  position: relative;
  margin: 0 20px 20px 0;
  max-width: 268px;
  width: 100%;
  justify-content: center;
  @media (min-width: 991px) and (max-width: 1024px) {
    width: 30%;
    max-width: 100%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    width: 46%;
    max-width: 100%;
  }
  @media (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 20px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
`
const ArtworkListing = ({ keyword, limit, hasMore, setHasMore }) => {
  const { t } = useTranslation('dashboard')

  const dispatch = useDispatch()
  /**Select required fields from redux */
  const { artworksLoader, artworksCount, artworks } = useSelector((state) => state.root.dashboard)

  const [openModal, setOpenModal] = useState(false)
  const [artworkInModal, setArtworkInModal] = useState()
  const [modal, setModal] = useState('')
  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [decimalSeparator, setDecimalSeparator] = useState('comma')
  const userData = useSelector((state) => state.root.myProfile.userData)
  const userCountry = userData && userData.country && userData.country.value ? userData.country.value : 'Germany'
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

  useEffect(() => {
    if (!isEmptyObj(currentCurrency) && currentCurrency.currency && currentCurrency.conversionRate) {
      setCurrency(currentCurrency.currency)
      setConversionRate(currentCurrency.conversionRate)
    } else {
      if (localCurrency) {
        if (!isEmptyObj(localCurrency) && localCurrency.currency && localCurrency.conversionRate) {
          setCurrency(localCurrency.currency)
          setConversionRate(localCurrency.conversionRate)
        } else {
          setCurrency('EUR')
          setConversionRate(1)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency])

  /**Func to fetch more data once user reaches end of page */
  const fetchData = () => {
    setHasMore(true)
    /**If more artworks are there, fetch them else set haseMore to false */
    if (artworks.length < artworksCount) {
      dispatch(getArtworklist({ limit: JSON.parse(limit), offset: artworks.length, search: keyword, t: t }))
    } else setHasMore(false)
  }
  return (
    <>
      <ModalComponent closeOnOutsideClick={true} isOpen={openModal} closeModal={() => setOpenModal(false)}>
        {modal === 'quickEdit' && <QuickEditModal setOpenModal={setOpenModal} artworkInModal={artworkInModal} />}
        {modal === 'delete' && (
          <ConfirmBox
            open={openModal}
            closeModal={() => setOpenModal(false)}
            deleteHandler={() => {
              dispatch(deleteArtwork({ artworkId: artworkInModal._id, t: t }))
              setOpenModal(false)
            }}
            confirmButtonText={t(`artworks.delete.confirmButton`)}
            heading={t(`artworks.delete.confirmDeleteText`)}
          />
        )}
      </ModalComponent>

      {artworksLoader ? (
        <ListingWrap>
          <>
            <GhostStyling>
              <GhostLoader video />
            </GhostStyling>{' '}
            <GhostStyling>
              <GhostLoader video />
            </GhostStyling>{' '}
            <GhostStyling>
              <GhostLoader video />
            </GhostStyling>{' '}
          </>
        </ListingWrap>
      ) : (
        <ListingWrap>
          {artworks && artworks.length > 0 ? (
            <InfiniteScroll
              //scrollableTarget="root"
              dataLength={artworks.length}
              next={fetchData}
              hasMore={hasMore}
              loader={
                <>
                  <GhostStyling>
                    <GhostLoader video />
                  </GhostStyling>{' '}
                  <GhostStyling>
                    <GhostLoader video />
                  </GhostStyling>{' '}
                  <GhostStyling>
                    <GhostLoader video />
                  </GhostStyling>{' '}
                  <GhostStyling>
                    <GhostLoader video />
                  </GhostStyling>
                </>
              }
              endMessage={<></>}
            >
              {artworks &&
                artworks.length > 0 &&
                artworks.map((art, ind) => (
                  <ListingContent
                    setModal={setModal}
                    setArtworkInModal={setArtworkInModal}
                    setOpenModal={setOpenModal}
                    key={ind}
                    art={art}
                    currency={currency}
                    conversionRate={conversionRate}
                    decimalSeparator={decimalSeparator}
                  />
                ))}
            </InfiniteScroll>
          ) : (
            artworks && <EndMessage noArtworks />
          )}
        </ListingWrap>
      )}
      {!hasMore && artworks.length > 10 && <EndMessage artworksFetch />}
    </>
  )
}
ArtworkListing.propTypes = {
  artworks: PropTypes.array,
  keyword: PropTypes.string,
  limit: PropTypes.number,
  hasMore: PropTypes.bool,
  setHasMore: PropTypes.func,
}
export default ArtworkListing
