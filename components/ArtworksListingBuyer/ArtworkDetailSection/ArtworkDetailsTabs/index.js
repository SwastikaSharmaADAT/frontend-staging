import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isEmptyObj } from '../../../../utilities/checkEmptyObject'
import { getVendorDetails } from '../../../../modules/subscription/subscriptionSlice'
import useTranslateContent from '../../../../hooks/useTranslateContent'
import MoreTabsSection from './MoreTabsSection'
import AboutTabsSection from './AboutTabsSection'
import ShippingPolicySection from './ShippingPolicySection'


const TabsContainer = styled.div`
  width: 100%;
  position: relative;
  font-family: 'Montserrat-Regular';
  margin: 33px 0 0;
  .MuiTab-labelIcon .MuiTab-wrapper > *:first-child {
    margin-bottom: 0;
    order: 2;
  }
  .TabsContentDiv {
    background: #fff;
    font-size: 16px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .MuiAppBar-colorPrimary {
    box-shadow: none !important;
    background: transparent;
    margin-top: 0;
    border-bottom: 1px solid #ccc;
  }
  .MuiTabs-indicator {
    display: none !important;
    background-color: #222;
    height: 4px;
  }
  .Mui-selected {
    background: #222 !important;
    color: #fff !important;
    .MuiTab-wrapper {
      color: #fff !important;
    }
  }
  .MuiButtonBase-root.MuiTab-root {
    opacity: 1;
    min-height: 25px;
    font-size: 16px;
    color: #666;
    min-width: auto;
    padding: 4px 12px;
    background: #fff;
    font-weight: 400;
    max-width: inherit;
    letter-spacing: normal;
    @media (min-width: 992px) and (max-width: 1024px) {
      font-size: 14px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
    @media (max-width: 767px) {
      font-size: 14px;
      max-width: inherit;
    }
  }
  .MuiButtonBase-root .MuiTab-wrapper {
    display: flex;
    flex-direction: row;
    font-family: 'Montserrat-Regular';
    color: #222;
  }
  .MuiTab-root {
    text-transform: capitalize;
  }
  .Mui-selected {
    .Count {
      color: #222;
    }
  }
  .MuiTabs-flexContainer {
    @media (min-width: 992px) and (max-width: 1024px) {
      overflow-x: scroll;
    }
    @media (max-width: 767px) {
      flex-direction: column;
    }
  }
`

function TabPanel(props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <>{children}</>}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  }
}

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
    backgroundColor: 'transparent',
  },
  Count: {
    backgroundColor: 'transparent',
    fontSize: '16px',
    color: '#222',
    fontFamily: 'Montserrat-Regular',
    width: '24px',
    height: '20px',
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
    margin: '0 0 0 10px',
  },
  HeaderTabs: {
    flexGrow: 1,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    fontSize: '15px',
    fontFamily: 'Montserrat-Medium',
    color: '#222',
    minHeight: 'inherit',
  },
}))

const ArtworkDetailsTabs = ({
  currency,
  conversionRate,
  decimalSeparator,
  callUseEffect,
  setCallUseEffect,
  setInitialPageLoad,
  insertToTitle,
  setArtist,
}) => {
  const { t } = useTranslation('artworks')

  const dispatch = useDispatch()
  const router = useRouter()
  const { artworkSlug } = router.query
  const artworkDetail = useSelector((state) => state.root.subscription.artworkDetail)
  const classes = useStyles()
  const [value, setValue] = useState(0)
  const [vendorDetails, setVendorDetails] = useState()
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  useEffect(() => {
    const fetchVendorDetails = async () => {
      const resultAction = await dispatch(getVendorDetails({data:{ artworkId: artworkSlug },t}))
      const result = await unwrapResult(resultAction)
      if (result&&result.success) setVendorDetails(result.data)
    }
    if(artworkSlug)
      fetchVendorDetails()
  }, [artworkSlug, dispatch])

  const [aboutMe, translateAboutMe] =useTranslateContent('')
  const [shipping, translateShipping] =useTranslateContent('')
  useEffect(() => {
    if(!isEmptyObj(vendorDetails)){
      translateAboutMe(vendorDetails && vendorDetails.aboutMe)
      translateShipping(vendorDetails && vendorDetails.shippingPolicy.shippingPolicy)
    }
  }, [vendorDetails])
  return (
    <>
      {!isEmptyObj(artworkDetail) && !isEmptyObj(vendorDetails) && (
        <TabsContainer>
          <div className={classes.root}>
            <AppBar position="static">
              <Tabs className={classes.HeaderTabs} value={value} onChange={handleChange} aria-label="">
                <Tab
                  label={`${t(`detailPageTabs.moreFrom`)} ${
                    artworkDetail.userId && artworkDetail.userId.firstName && artworkDetail.userId.lastName
                      ? `${artworkDetail.userId.firstName} ${artworkDetail.userId.lastName}`
                      : artworkDetail.userId && artworkDetail.userId.username
                        ? artworkDetail.userId.username
                        : ''
                  }`}
                  {...a11yProps(0)}
                />
                <Tab
                  label={`${t(`detailPageTabs.about`)} ${
                    artworkDetail.userId && artworkDetail.userId.firstName && artworkDetail.userId.lastName
                      ? `${artworkDetail.userId.firstName} ${artworkDetail.userId.lastName}`
                      : artworkDetail.userId && artworkDetail.userId.username
                        ? artworkDetail.userId.username
                        : ''
                  }`}
                  {...a11yProps(1)}
                />
                <Tab label={t(`detailPageTabs.shipPolicy`)} {...a11yProps(2)} />
              </Tabs>
            </AppBar>
            <TabPanel value={value} index={0}>
              <MoreTabsSection
                currency={currency}
                conversionRate={conversionRate}
                decimalSeparator={decimalSeparator}
                insertToTitle={insertToTitle}
                callUseEffect={callUseEffect}
                setCallUseEffect={setCallUseEffect}
                setInitialPageLoad={setInitialPageLoad}
                setArtist={setArtist}
                artworkDetail={artworkDetail}
              />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AboutTabsSection aboutMe={aboutMe?aboutMe:vendorDetails && vendorDetails.aboutMe} />
            </TabPanel>
            <TabPanel value={value} index={2}>
              <ShippingPolicySection shippingPolicy={shipping?shipping:vendorDetails && vendorDetails.shippingPolicy.shippingPolicy} />
            </TabPanel>
          </div>
        </TabsContainer>
      )}
    </>
  )
}

ArtworkDetailsTabs.propTypes = {
  currency: PropTypes.string,
  conversionRate: PropTypes.any,
  decimalSeparator: PropTypes.string,
  callUseEffect: PropTypes.bool,
  setCallUseEffect: PropTypes.func,
  setInitialPageLoad: PropTypes.func,
  insertToTitle: PropTypes.func,
  setArtist: PropTypes.func,
}

export default ArtworkDetailsTabs
