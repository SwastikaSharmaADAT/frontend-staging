import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import { MdKeyboardArrowRight } from 'react-icons/md'
import { FaUser, FaStarOfLife, FaEnvelope, FaSignInAlt, FaRegImage, FaFileInvoiceDollar, FaRegCreditCard } from 'react-icons/fa'
import { IoLockClosed } from 'react-icons/io5'
import { BsBellFill } from 'react-icons/bs'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isLoginToken } from '../../utilities/authUtils'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { setWebNoti } from '../../modules/notifications/notificationSlice'
import UserImageContainer from './UserImageContainer'
import AccountSection from './AccountSection'
import ChangePassword from './ChangePassword'
import PrivacySection from './PrivacySection'
import NotificationsSection from './NotificationsSection'
import WebNotificationsSection from './WebNotificationsSection'
import SocialConnect from './SocialConnect'
import MyPhotosSection from './MyPhotosSection'
import DeleteAccountSection from './DeleteAccountSection'
import Head from 'next/head'
import { unwrapResult } from '@reduxjs/toolkit'
import { getVendorUrl } from '../../modules/dashboard/dashboardSlice'
import { toggleLoading } from '../../modules/auth/authSlice'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
  .AccountVerticalTabs {
    width: 100%;
    display: flex;
  }
  .AccountVerticalTabs .react-tabs {
    display: flex;
    margin-left: 0;
    width: 100%;
    height: auto;
  }

  .AccountVerticalTabs .react-tabs__tab-list {
    display: flex;
    flex-direction: column;
    max-width: 360px;
    width: 100%;
    margin: 0;
    padding: 0;
  }

  .AccountVerticalTabs .react-tabs__tab {
    list-style: none;
    padding: 3px 6px;
    cursor: pointer;
    color: #666;
    min-height: 35px;
    background: #eee;
    border-bottom: 1px solid #fff;
  }

  .AccountVerticalTabs .react-tabs__tab--selected {
    background: #000;
  }

  .AccountVerticalTabs .react-tabs__tab-panel {
    display: none;
    width: 100%;
    padding: 0 0px 0 20px;
  }

  .AccountVerticalTabs .react-tabs__tab-panel--selected {
    display: block;
  }

  .AccountVerticalTabs .react-tabs__tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }

  .AccountVerticalTabs .react-tabs__tab--selected {
    color: #fff;
  }
  .AccountVerticalTabs .react-tabs__tab:focus {
    outline: 0;
  }
  .AccountVerticalTabs .react-tabs__tab:hover {
    background: #000;
    color: #fff;
  }

  .AccountVerticalTabs .rtl-ar-content.panel-content {
    direction: rtl;
  }

  @media (max-width: 767px) {
    .AccountVerticalTabs {
      flex-direction: column;
    }
    .AccountVerticalTabs .react-tabs__tab-panel {
      width: auto;
      padding: 20px 0 0;
    }
    .AccountVerticalTabs .react-tabs__tab-list {
      max-width: 100%;
    }
  }
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`

const FullWidthContainer = styled.div`
  width: 100%;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  box-shadow: 1px 1px 6px rgb(0 0 0 / 10%);
  background: #fff;
  padding: 30px;
  @media (max-width: 767px) {
    width: auto;
    padding: 15px;
  }
  @media (min-width: 600px) and (max-width: 991px) and (orientation: landscape) {
    width: 100%;
  }
`
const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  @media (max-width: 767px) {
    width: 30px;
  }
  svg {
    font-size: 18px;
  }
`
const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`
const TabsName = styled.div`
  border-left: 1px solid #666;
  padding-left: 20px;
  line-height: 28px;
  font-size: 16px;
  @media (max-width: 767px) {
    padding-left: 10px;
    line-height: 28px;
    font-size: 14px;
    margin-left: 5px;
  }
`
const ArrowDiv = styled.div`
  display: flex;
  svg {
    font-size: 28px;
  }
`

const MyAccount = () => {
  const { t } = useTranslation(['myaccount', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = router.query
  const [tabIndex, setTabIndex] = useState(params.web ? 4 : 0)

  const webNoti = useSelector((state) => state.root.notifications.webNoti)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const accountType = userInfo && JSON.parse(userInfo).accountType
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    /**get user details on page render */
    if (isLoginToken() && loggedInUsername) dispatch(getUserData(loggedInUsername, 'fetchData', t))
  }, [dispatch, loggedInUsername])

  const vendorBuyer = async () => {
    dispatch(toggleLoading(true))
    const resultAction = await dispatch(getVendorUrl({ type: 'orders', langCode: appLanguageCode ? appLanguageCode : 'en', t:t }))
    const result = await unwrapResult(resultAction)
    console.log(resultAction, result)
    if (process.browser && result && result.success ) {
      window.open(result.data.redirectUrl, '_self')
    } else {
      window.open('https://shop.artmo.com/sales/order/history/', '_self')
    }
    dispatch(toggleLoading(false))
  }

  useEffect(() => {
    if (accountType === 'page') {
      if (params.web && tabIndex !== 3) setTabIndex(3)
      if (webNoti) dispatch(setWebNoti(false))
    } else {
      if (params.web && tabIndex !== 4) setTabIndex(4)
      if (webNoti) dispatch(setWebNoti(false))
    }
  }, [tabIndex, params, webNoti, dispatch, accountType])
  return (
    <>
      <Head>
        <title>My Account | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <FullWidthContainer>
            <Tabs
              selectedIndex={tabIndex}
              onSelect={(index) => {
                document.body.scrollTo({
                  top: 0,
                  behavior: 'smooth',
                })
                delete params.web
                router.replace({
                  search: !isEmptyObj(params) ? params.toString() : '',
                })
                setTabIndex(index)
              }}
              className="AccountVerticalTabs"
            >
              <TabList>
                <UserImageContainer />
                <Tab>
                  <LeftDiv>
                    <IconWrap>
                      <FaUser />
                    </IconWrap>
                    <TabsName>{t(`account.title`)}</TabsName>
                  </LeftDiv>
                  <ArrowDiv>
                    <MdKeyboardArrowRight />
                  </ArrowDiv>
                </Tab>
                {userData.userRoleType === 'personal' && (
                  <Tab>
                    <LeftDiv>
                      <IconWrap>
                        <FaStarOfLife />
                      </IconWrap>
                      <TabsName>
                        {userData.IsPassword ? t(`changePassword.changeTitle`) : t(`changePassword.setTitle`)}
                      </TabsName>
                    </LeftDiv>
                    <ArrowDiv>
                      <MdKeyboardArrowRight />
                    </ArrowDiv>
                  </Tab>
                )}
                <Tab>
                  <LeftDiv>
                    <IconWrap>
                      <IoLockClosed />
                    </IconWrap>
                    <TabsName>{t(`privacy.title`)}</TabsName>
                  </LeftDiv>
                  <ArrowDiv>
                    <MdKeyboardArrowRight />
                  </ArrowDiv>
                </Tab>
                <Tab>
                  <LeftDiv>
                    <IconWrap>
                      <FaEnvelope />
                    </IconWrap>
                    <TabsName>{t(`notifications.title`)}</TabsName>
                  </LeftDiv>
                  <ArrowDiv>
                    <MdKeyboardArrowRight />
                  </ArrowDiv>
                </Tab>
                <Tab>
                  <LeftDiv>
                    <IconWrap>
                      <BsBellFill />
                    </IconWrap>
                    <TabsName>{t(`webNotifications.title`)}</TabsName>
                  </LeftDiv>
                  <ArrowDiv>
                    <MdKeyboardArrowRight />
                  </ArrowDiv>
                </Tab>
                {userData.userRoleType === 'personal' && (
                  <Tab>
                    <LeftDiv>
                      <IconWrap>
                        <FaSignInAlt />
                      </IconWrap>
                      <TabsName>{t(`socialConnect.title`)}</TabsName>
                    </LeftDiv>
                    <ArrowDiv>
                      <MdKeyboardArrowRight />
                    </ArrowDiv>
                  </Tab>
                )}
                <Tab>
                  <LeftDiv>
                    <IconWrap>
                      <FaRegImage />
                    </IconWrap>
                    <TabsName>{t(`myPhotos.title`)}</TabsName>
                  </LeftDiv>
                  <ArrowDiv>
                    <MdKeyboardArrowRight />
                  </ArrowDiv>
                </Tab>
                {userData.userRoleType === 'personal' && (
                  <Tab>
                    <LeftDiv>
                      <IconWrap>
                        <RiDeleteBin6Line />
                      </IconWrap>
                      <TabsName>{t(`deleteAccount.title`)}</TabsName>
                    </LeftDiv>
                    <ArrowDiv>
                      <MdKeyboardArrowRight />
                    </ArrowDiv>
                  </Tab>
                )}
                {userData.userRoleType === 'personal' && (
                  <Tab onClick={vendorBuyer}>
                      <LeftDiv>
                        <IconWrap>
                          <FaFileInvoiceDollar />
                        </IconWrap>
                        <TabsName>{t(`myOrders.title`)}</TabsName>
                      </LeftDiv>
                      <ArrowDiv>
                        <MdKeyboardArrowRight />
                      </ArrowDiv>
                  </Tab>
                )}
                {userData.userRoleType === 'personal' && (
                  <Tab onClick={() => router.push('/mygiftcard')}>
                    <LeftDiv>
                      <IconWrap>
                        <FaRegCreditCard />
                      </IconWrap>
                      <TabsName>{t(`myGiftcards.title`)}</TabsName>
                    </LeftDiv>
                    <ArrowDiv>
                      <MdKeyboardArrowRight />
                    </ArrowDiv>
                  </Tab>
                )}
              </TabList>

              <TabPanel>
                <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                  <AccountSection />
                </div>
              </TabPanel>
              {userData.userRoleType === 'personal' && (
                <TabPanel>
                  <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                    <ChangePassword />
                  </div>
                </TabPanel>
              )}
              <TabPanel>
                <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                  <PrivacySection />
                </div>
              </TabPanel>
              <TabPanel>
                <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                  <NotificationsSection />
                </div>
              </TabPanel>
              <TabPanel>
                <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                  <WebNotificationsSection />
                </div>
              </TabPanel>
              {userData.userRoleType === 'personal' && (
                <TabPanel>
                  <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                    <SocialConnect />
                  </div>
                </TabPanel>
              )}
              <TabPanel>
                <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                  <MyPhotosSection />
                </div>
              </TabPanel>
              {userData.userRoleType === 'personal' && (
                <TabPanel>
                  <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                    <DeleteAccountSection />
                  </div>
                </TabPanel>
              )}
            </Tabs>
          </FullWidthContainer>
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default MyAccount
