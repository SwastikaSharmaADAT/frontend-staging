import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { Tab, Tabs, TabList } from 'react-tabs'
import { IoGlassesOutline } from 'react-icons/io5'
import { IoCameraOutline } from 'react-icons/io5'
import { IoCopyOutline } from 'react-icons/io5'
import { IoCashOutline } from 'react-icons/io5'
import { IoPeopleOutline } from 'react-icons/io5'
import { IoSettingsOutline } from 'react-icons/io5'
import { useTranslation } from 'next-i18next'
import { unwrapResult } from '@reduxjs/toolkit'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import ModalComponent from '../UI/Modal'
import MediaLibrary from '../UI/MediaLibrary'
import { getVendorUrl } from '../../modules/dashboard/dashboardSlice'
import { toggleLoading } from '../../modules/auth/authSlice'
import ProfileCompletionPopup from './ProfileCompletionPopup'
import { TopWrapper, FullWidthContainer, LeftDiv, IconWrap, TabsName, TabsWrapperMob,ProfileCompletionModalWrap, ProfileIncompleteText, ProfileIncompleteSubText } from './styled.js'
import CloseIcon from '../UI/CloseIcon/CloseIcon'
import ProfileCompletion from '../YourProfile/ProfileStatusSec/ProfileCompletion'
import { profileCompleteness } from '../../modules/profile/myProfileSlice'
import Button from '../UI/Button'


const LeftTabsBar = () => {
  const { t } = useTranslation('dashboard')

  const router = useRouter()
  const dispatch = useDispatch()

  const langCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const profileMeasure = useSelector((state) => state.root.myProfile.profileMeasure)

  /**state to toggle media library popup */
  const [openMediaLibrary, setOpenMediaLibrary] = useState(false)
  const [openProfileCompletePopup, setProfileCompletePopup] = useState(false)
  const [openProfileCompletenessPopup, setProfileCompletenessPopup ] = useState( true )

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    dispatch(profileCompleteness())
  }, [dispatch, loggedInUsername])

  const [width, setWidth] = useState(null);
  const breakpoint = 767;

  useEffect( () => { 
    if ( typeof window !== 'undefined' ) {
      window.addEventListener('resize', () => setWidth(window.innerWidth));
      setWidth(window.innerWidth) ;
      //window.addEventListener('load', () => setWidth(window.innerWidth));
    }
    
  }, [] ) ;

  useEffect(() => {
    if (hasActivePlan && !isEmptyObj(userData) && userData.username === loggedInUsername) {
      if (
        !userData.profilePicUrl ||
        !(!isEmptyObj(userData.city) && userData.city.value) ||
        !(!isEmptyObj(userData.country) && userData.country.value) ||
        !(!isEmptyObj(userData.mobile) && userData.mobile.value)
      ) {
        setProfileCompletePopup(true)
      } else {
        setProfileCompletePopup(false)
        setProfileCompletenessPopup( true )
      }
    }
  }, [hasActivePlan,loggedInUsername,  userData])

   

  const getClassName = (type) => {
    const tabClasses = ['react-tabs__tab']
    const tabSelectedClasses = ['react-tabs__tab', 'react-tabs__tab--selected']
    const route = router.pathname

    if (type === 'dashboard' && (route.includes('/dashboard') || route.includes('/knowledgebase'))) {
      return tabSelectedClasses
    } else if (type === 'settings' && route.includes('/vendor-settings')) {
      return tabSelectedClasses
    } else if (
      type === 'artworks' &&
      (route.includes('/myartworks') || route.includes('/artworks/add') || route.includes('/artworks/edit'))
    ) {
      return tabSelectedClasses
    } else {
      return tabClasses
    }
  }

  const redirectOnHoverClick = (e) => {
    e.stopPropagation()
    router.push('/artworks/add')
  }

  const showAddArtworkOption = () => {
    const route = router.pathname
    if (route.includes('/myartworks') || route.includes('/artworks/add') || route.includes('/artworks/edit')) {
      return false
    }
    return true
  }
  const vendorOrders = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(getVendorUrl({ type: 'orders', langCode: langCode ? langCode : 'en', t:t }))
    const result = await unwrapResult(resultAction)
    if (process.browser && result && result.success ) {
      window.open(result.data.redirectUrl, '_self')
    }
    dispatch(toggleLoading(false))
  }
  const vendorCustomers = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(getVendorUrl({ type: 'customer', langCode: langCode ? langCode : 'en', t:t }))
    const result = await unwrapResult(resultAction)
    if (process.browser && result && result.success) {
      window.open(result.data.redirectUrl, '_self')
    }
    dispatch(toggleLoading(false))
  }

  const redirectToProfileHandler =() => {
    router.push(`/user/${loggedInUsername}`)
    window.scroll({
      top: 0,
      left: 0,
      //behavior: 'smooth',
    })
  }

  return (
    <>
      {openProfileCompletePopup && (
        <ProfileCompletionPopup open={openProfileCompletePopup} closeModal={() => setProfileCompletePopup(false)} />
      )}
      { openProfileCompletenessPopup && (
        <ModalComponent
        closeOnOutsideClick={true}
        isOpen={openProfileCompletenessPopup && profileMeasure && profileMeasure.completeness !== '100%' }
        closeModal={() => setProfileCompletenessPopup(false)}
        >
          <ProfileCompletionModalWrap>
            <CloseIcon
              className='lightbox-close  only-left'
              onclick={() => setProfileCompletenessPopup(false)}
            />
            {/* <ProfileIncompleteText>
              {t(`incompletePopup.mainText`)}
            </ProfileIncompleteText> */}
            <ProfileCompletion/>
            <ProfileIncompleteSubText>
              {t(`incompletePopup.subText`)}
            </ProfileIncompleteSubText>
            <Button onClick={redirectToProfileHandler}>Go to Profile</Button>
          </ProfileCompletionModalWrap>
        </ModalComponent>
      )}
      
      {openMediaLibrary && (
        <ModalComponent
          closeOnOutsideClick={true}
          isOpen={openMediaLibrary}
          closeModal={() => setOpenMediaLibrary(false)}
        >
          <MediaLibrary
            closeModal={() => setOpenMediaLibrary(false)}
            getUploadedImages={() => {}}
            limit={1}
            viewOnly
            fixedLimit={true}
            singleSelection={true}
          />
        </ModalComponent>
      )}
      {
        typeof window !== 'undefined' && (width > breakpoint) ? 
      
      <TopWrapper className="leftTabs">
        <FullWidthContainer>
          <Tabs className='VendorVerticalTabs' defaultIndex={-1}>
            <TabList>
              <Tab onClick={() => router.push('/dashboard')} className={getClassName('dashboard')}>
                <LeftDiv>
                  <IconWrap>
                    <IoGlassesOutline />
                  </IconWrap>
                  <TabsName>{t(`tabLabels.dashboard`)}</TabsName>
                </LeftDiv>
              </Tab>
              <Tab disabled onClick={() => setOpenMediaLibrary(true)}>
                <LeftDiv>
                  <IconWrap>
                    <IoCameraOutline />
                  </IconWrap>
                  <TabsName>{t(`tabLabels.mediaLibrary`)}</TabsName>
                </LeftDiv>
              </Tab>
              <Tab
                onClick={() => router.push('/myartworks')} //TODO redirect to subscription based on 3 checks
                className={[...getClassName('artworks'), 'LabelArtwork']}
              >
                {showAddArtworkOption() && (
                  <div className="hide" onClick={(e) => redirectOnHoverClick(e)}>
                    {t(`tabLabels.addArtwork`)}
                  </div>
                )}
                <LeftDiv>
                  <IconWrap>
                    <IoCopyOutline />
                  </IconWrap>
                  <TabsName>{t(`tabLabels.artworks`)}</TabsName>
                </LeftDiv>
              </Tab>
              <Tab onClick={vendorOrders} disabled>
                <LeftDiv>
                  <IconWrap>
                    <IoCashOutline />
                  </IconWrap>
                  <TabsName>{t(`tabLabels.orders`)}</TabsName>
                </LeftDiv>
              </Tab>
              <Tab onClick={vendorCustomers} disabled>
                <LeftDiv>
                  <IconWrap>
                    <IoPeopleOutline />
                  </IconWrap>
                  <TabsName>{t(`tabLabels.customers`)}</TabsName>
                </LeftDiv>
              </Tab>
              <Tab onClick={() => router.push('/vendor-settings')} className={getClassName('settings')}>
                <LeftDiv>
                  <IconWrap>
                    <IoSettingsOutline />
                  </IconWrap>
                  <TabsName>{t(`tabLabels.settings`)}</TabsName>
                </LeftDiv>
              </Tab>
            </TabList>
          </Tabs>
        </FullWidthContainer>
      </TopWrapper>
      : 
      <TabsWrapperMob>
          <ul className="menuName">
            <li onClick={() => router.push('/dashboard')} className={[...getClassName('dashboard'), 'dashboardStick']}>
              <div>
                <span className="iconWrap"><IoGlassesOutline /></span>
                <span className="menuLabel">{t(`tabLabels.dashboard`)}</span>
              </div>
            </li>
            <li className="mediaLibStick" disabled onClick={() => setOpenMediaLibrary(true)}>
              <div>
                <span className="iconWrap">
                    <IoCameraOutline />
                </span>
                <span className="menuLabel">{t(`tabLabels.mediaLibrary`)}</span>
              </div>
            </li>
            <li
              onClick={() => router.push('/myartworks')} //TODO redirect to subscription based on 3 checks
              className={[...getClassName('artworks'), 'LabelArtwork artworkStick']}
            >
              <div>
                <span className="iconWrap">
                    <IoCopyOutline />
                </span>
                <span className="menuLabel">{t(`tabLabels.artworks`)}</span>
              </div>
            </li>
            <li className="ordersStick"  onClick={vendorOrders} disabled>
              <div>
                <span className="iconWrap">
                    <IoCashOutline />
                </span>
                <span className="menuLabel">{t(`tabLabels.orders`)}</span>
              </div>
            </li>
            <li className="customerStick" onClick={vendorCustomers} disabled>
              <div>
                <span className="iconWrap">
                    <IoPeopleOutline />
                </span>
                <span className="menuLabel">{t(`tabLabels.customers`)}</span>
              </div>
            </li>
            <li onClick={() => router.push('/vendor-settings')} className={[...getClassName('settings'), 'settingsStick']}>
              <div>
              <span className="iconWrap">
                    <IoSettingsOutline />
              </span>
              <span className="menuLabel">{t(`tabLabels.settings`)}</span>
              </div>
            </li>
          </ul>
      </TabsWrapperMob>
      }
    </>
  )
}

export default LeftTabsBar
