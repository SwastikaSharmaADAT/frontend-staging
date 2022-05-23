import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { FaBook } from 'react-icons/fa'
import { useTranslation } from 'next-i18next'
import ReactHtmlParser from 'react-html-parser'
import {
  CommonSection,
  HeadingSection,
  LearnMoreBtn,
  SectionRow,
  SectionCols,
  SecHeading,
  SecDescription,
  CustomTabsWrapper,
} from '../styled.js'
import LeftTabsBar from '../LeftTabsBar'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import { getUserData, notifyError } from '../../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../../utilities/authUtils'
import { isEmptyObj } from '../../../utilities/checkEmptyObject.js'
import PaymentAlert from '../PaymentAlert/PaymentAlert.js'
import Head from 'next/head'

const DashboardSection = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['dashboard','translation'])
  const vendorDashboardContent = useSelector((state) => state.root.staticContent.vendorDashboardContent)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    if (!hasActivePlan && !isEmptyObj(userData)) {
      router.push('/subscriptions')
     // notifyError(t(`purchaseSubscriptionMessage`))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasActivePlan, router, userData])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    dispatch(getContent('Vendor_dashboard_artwork_approval', t, 'vendorDashboard', 'vendorDashboardArtworkApproval'))
    dispatch(getContent('Vendor_dashboard_artwork_upload', t,'vendorDashboard', 'vendorDashboardArtworkUpload'))
    dispatch(getContent('Vendor_dashboard_how_artwork_approved', t, 'vendorDashboard', 'vendorDashboardHowArtworkApproved'))
    dispatch(getContent('Vendor_dashboard_sold_artworks', t, 'vendorDashboard', 'vendorDashboardSoldArtworks'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  return (
    <>
      <Head>
        <title>Dashboard | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <CustomTabsWrapper>
        <LeftTabsBar />
        <CommonSection className="customPanelContent">
          <PaymentAlert />
          <HeadingSection>
            {t(`dashboard.title`)}
            <LearnMoreBtn onClick={() => router.push('/knowledgebase')}>
              {t(`dashboard.learnMore`)} <FaBook />
            </LearnMoreBtn>
          </HeadingSection>
          <SectionRow>
            <SectionCols className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <SecDescription>
                {ReactHtmlParser(vendorDashboardContent['vendorDashboardArtworkApproval'])}
              </SecDescription>
            </SectionCols>
            <SectionCols className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <SecDescription>
                {ReactHtmlParser(vendorDashboardContent['vendorDashboardHowArtworkApproved'])}
              </SecDescription>
            </SectionCols>
            <SectionCols className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <SecDescription>{ReactHtmlParser(vendorDashboardContent['vendorDashboardArtworkUpload'])}</SecDescription>
            </SectionCols>
            <SectionCols className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <SecDescription>{ReactHtmlParser(vendorDashboardContent['vendorDashboardSoldArtworks'])}</SecDescription>
            </SectionCols>
          </SectionRow>
        </CommonSection>
      </CustomTabsWrapper>
    </>
  )
}

export default DashboardSection
