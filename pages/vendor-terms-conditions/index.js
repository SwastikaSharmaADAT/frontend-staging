import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Head from 'next/head'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getContent } from '../../modules/staticContent/staticContentSlice'
import { isLoginToken } from '../../utilities/authUtils'
import Button from '../../components/UI/Button'
import HeadingSection from '../../components/vendor-terms-conditions/HeadingSection'
import SectionContent from '../../components/vendor-terms-conditions/SectionContent'
import publicRoute from '../../HOC/publicRoute'
import staticFilesArray from '../../utilities/staticFilesArray'


const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: column;
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

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  width: 100%;
  margin-bottom: 50px;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  button {
    width: auto;
    min-width: 200px;
    padding-left: 10px;
    padding-right: 10px;
  }
`

const VendorTermsConditions = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { t } = useTranslation(['staticPages','translation'])

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)

  const content = useSelector((state) => state.root.staticContent.vendorTermsCondContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  useEffect(() => {
    /**get user details on page render */
    if (loggedInUsername && (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) && isLoginToken())
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    dispatch(getContent('Vendor_T_C_header', t, 'vendorTermsConditions', 'header'))
    dispatch(getContent('Vendor_T_C_impOverview', t, 'vendorTermsConditions', 'impOverview'))
    dispatch(getContent('Vendor_T_C_stepByStep', t, 'vendorTermsConditions', 'stepByStep'))
    dispatch(getContent('Vendor_T_C_overview', t, 'vendorTermsConditions', 'overview'))
    dispatch(getContent('Vendor_T_C_fees', t, 'vendorTermsConditions', 'fees'))
    dispatch(getContent('Vendor_T_C_termination', t, 'vendorTermsConditions', 'termination'))
    dispatch(getContent('Vendor_T_C_payoutSchedule', t, 'vendorTermsConditions', 'payoutSchedule'))
    dispatch(getContent('Vendor_T_C_contentEligibility', t, 'vendorTermsConditions', 'contentEligibility'))
    dispatch(getContent('Vendor_T_C_yourObligations', t, 'vendorTermsConditions', 'yourObligations'))
    dispatch(getContent('Vendor_T_C_artmoObligations', t, 'vendorTermsConditions', 'artmoObligations'))
    dispatch(getContent('Vendor_T_C_returns', t, 'vendorTermsConditions', 'returns'))
    dispatch(getContent('Vendor_T_C_provisions', t, 'vendorTermsConditions', 'provisions'))
    dispatch(getContent('Vendor_T_C_shippingReturnPolicy', t, 'vendorTermsConditions', 'shippingReturnPolicy'))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  //console.log(content);

  return (
    <>
      <Head>
        <title>Vendor's Terms and Conditions | ARTMO overview</title>
        <meta name="description" content="Vendor's Terms and Conditions | ARTMO overview, comissions, fees, payments and refunds, account termination and cancellation" />
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <HeadingSection content={content} />
          <SectionContent content={content} />
          <ButtonWrapper>
            <Button onClick={() => router.push('/privacy-policy')}>
              {t(`vendorTermsConditions.seePrivacyPolicy`)}
            </Button>
            <Button onClick={() => router.push('/user-terms-conditions')}>
              {t(`vendorTermsConditions.seeUserTermsConditions`)}
            </Button>
          </ButtonWrapper>
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})
export default publicRoute(VendorTermsConditions)
