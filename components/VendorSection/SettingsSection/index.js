import React, { useEffect, useState } from 'react'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import styled from 'styled-components'
import { useRouter } from 'next/router'
// import './InnerTabs.css'
import { FaBook } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { CommonSection, HeadingSection, LearnMoreBtn, LeftDiv, InnerTabsName, CustomTabsWrapper } from '../styled.js'
import LeftTabsBar from '../LeftTabsBar'
import { getSettings } from '../../../modules/dashboard/dashboardSlice'
import { getUserData, notifyError } from '../../../modules/profile/myProfileSlice'
import { getOrderDetails, setTabSubscription } from '../../../modules/subscription/subscriptionSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import PaymentAlert from '../PaymentAlert/PaymentAlert'
import { isLoginToken } from '../../../utilities/authUtils'
import VendorEmailSection from './VendorEmailSection'
import VacationSection from './VacationSection'
import PayoutSection from './PayoutSection'
import SubscriptionSection from './SubscriptionSection'
import Head from 'next/head'

const Wrapper = styled.div`
.InnerVerticalTabs {
  width: 100%;
  display: flex;
}

.InnerVerticalTabs .react-tabs {
  display: flex;
  margin-left: 0;
  width: 100%;
  height: auto;
}

.InnerVerticalTabs .react-tabs__tab-list {
  display: flex;
  flex-direction: column;
  max-width: 160px;
  width: 100%;
  margin: 0;
  padding: 0px 0 0 0;
  height: 100%;
  background: transparent;
}

.InnerVerticalTabs .react-tabs__tab {
  list-style: none;
  padding: 3px 6px;
  cursor: pointer;
  color: #444;
  min-height: 35px;
  text-transform: uppercase;
  font-size: 16px;
}



.InnerVerticalTabs .react-tabs__tab-panel {
  display: none;
  width: 100%;
  padding: 0 0px 0 20px;
  background: #fff;
}

.InnerVerticalTabs .react-tabs__tab-panel--selected {
  display: block;
}

.InnerVerticalTabs .react-tabs__tab {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  padding: 0 0 0px 20px;
  margin: 0 0 5px;
  text-transform: capitalize;
  min-height: 36px;
  color: #666;
  font-size: 16px;
}

.InnerVerticalTabs .react-tabs__tab--selected {
  background: #222;
  color: #fff;
}

.InnerVerticalTabs .react-tabs__tab--selected:before {
  background: url(../../../assets/Right_polygon_black.png) no-repeat top center;
  width: 17px;
  height: 36px;
  content: ' ';
  top: 0px;
  position: relative;
  display: flex;
  text-align: center;
  margin: 0 auto;
  position: absolute;
  right: -17px;
}

.InnerVerticalTabs .react-tabs__tab:focus {
  outline: 0;
}

/* .InnerVerticalTabs .react-tabs__tab:hover {
  
} */

.InnerVerticalTabs .panel-content {
  padding: 0 0 40px 40px;
}

.InnerVerticalTabs .rtl-ar-content.panel-content {
    direction: rtl;
  }

@media (max-width: 1499px) {
  .InnerVerticalTabs .react-tabs__tab {
    padding: 0 0 0px 20px;
  }

  .InnerVerticalTabs .react-tabs__tab-list {
    max-width: 200px;
  }
}

@media (max-width: 1024px) {
  .InnerVerticalTabs .react-tabs__tab-list {
    max-width: 150px;
  }

  .InnerVerticalTabs .panel-content {
    padding: 20px;
  }
}

@media (max-width: 991px) {
  .InnerVerticalTabs .panel-content {
    padding: 0 20px;
  }
}


@media (max-width: 767px) {
  .InnerVerticalTabs {
    flex-direction: column;
  }

  .InnerVerticalTabs .react-tabs__tab-panel {
    width: 100%;
    padding: 0px 0 0;
  }

  .InnerVerticalTabs .react-tabs__tab-list {
    max-width: 100%;
    width: 100%;
  }

  .InnerVerticalTabs .panel-content {
    padding: 20px 0;
  }

  .InnerVerticalTabs .react-tabs__tab {
    padding: 0 0 0px 20px;
  }
}
`

const SettingsSection = () => {
  const { t } = useTranslation(['dashboard','translation'])

  const dispatch = useDispatch()
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = router.query
  const [tabIndex, setTabIndex] = useState(0)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const tabSubscription = useSelector((state) => state.root.subscription.tabSubscription)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(()=>{
    if(router.isReady){
      setTabIndex(params.page && params.page === 'subscription' ? 2 : 0)
    }
  },[router.isReady, setTabIndex])
  
  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if (!hasActivePlan && !isEmptyObj(userData)) {
      router.push('/subscriptions')
      //notifyError(t(`purchaseSubscriptionMessage`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasActivePlan, router, userData])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    /**fetch current settings */
    dispatch(getSettings(t))
  }, [dispatch])

  useEffect(() => {
    if (params.page && params.page === 'subscription' && tabIndex === 2) {
      setTabIndex(2)
    }
  }, [tabIndex, params])

  useEffect(() => {
    if (params.page && params.page === 'subscription' && params.webQuoteId&& isLoginToken()) {
      const refId = params.webQuoteId&& JSON.parse(params.webQuoteId)
      dispatch(getOrderDetails(refId, 'vendor'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (tabSubscription) {
      setTabIndex(2)
      dispatch(setTabSubscription(false))
    }
  }, [dispatch, tabSubscription])

  return (
    <>
      <Head>
        <title>Settings | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
    <Wrapper>
      <CustomTabsWrapper>
        <LeftTabsBar />
        <CommonSection className="customPanelContent">
          <PaymentAlert />
          <HeadingSection>
            {t(`settings.title`)}
            <LearnMoreBtn onClick={() => router.push('/knowledgebase')}>
              {t(`settings.learnMore`)} <FaBook />
            </LearnMoreBtn>
          </HeadingSection>
          <Tabs
            selectedIndex={tabIndex}
            onSelect={(index) => {
              router.replace({
                query: params,
              })
              setTabIndex(index)
            }}
            className="InnerVerticalTabs"
          >
            <TabList>
              <Tab>
                <LeftDiv>
                  <InnerTabsName> {t(`settings.optionTitles.general`)}</InnerTabsName>
                </LeftDiv>
              </Tab>
              <Tab>
                <LeftDiv>
                  <InnerTabsName>{t(`settings.optionTitles.vacation`)}</InnerTabsName>
                </LeftDiv>
              </Tab>
              <Tab>
                <LeftDiv>
                  <InnerTabsName>{t(`settings.optionTitles.subscription`)}</InnerTabsName>
                </LeftDiv>
              </Tab>
              <Tab>
                <LeftDiv>
                  <InnerTabsName>{t(`settings.optionTitles.payouts`)}</InnerTabsName>
                </LeftDiv>
              </Tab>
            </TabList>

            <TabPanel>
              <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                <VendorEmailSection />
              </div>
            </TabPanel>
            <TabPanel>
              <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                <VacationSection />
              </div>
            </TabPanel>
            <TabPanel>
              <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                <SubscriptionSection />
              </div>
            </TabPanel>
            <TabPanel>
              <div className={appLanguageCode === 'ar' ? 'rtl-ar-content panel-content' : 'panel-content'}>
                <PayoutSection />
              </div>
            </TabPanel>
          </Tabs>
        </CommonSection>
      </CustomTabsWrapper>
    </Wrapper>
    </>
  )
}

export default SettingsSection
