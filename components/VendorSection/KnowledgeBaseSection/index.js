import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'
import 'react-accessible-accordion/dist/fancy-example.css'
// import './accordian.css'
import { CommonSection, HeadingSection, CustomTabsWrapper } from '../styled.js'
import LeftTabsBar from '../LeftTabsBar'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import { getUserData, notifyError } from '../../../modules/profile/myProfileSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { isLoginToken } from '../../../utilities/authUtils'
import PaymentAlert from '../PaymentAlert/PaymentAlert'

const Container = styled.div`
min-height: 100vh ;
.accordion {
    border: 0;
    border-radius: 0;
    margin: 30px 0;
}

.accordion__button {
    display: flex;
    align-items: center;
    width: auto;
    justify-content: space-between;
    background: #fff;
    border: 2px solid #eee;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    margin: 0;
    font-size: 16px;
    line-height: 22px;
    color: #222222;
    padding: 15px;
    box-shadow: none;

}

.accordion__button:focus,
.accordion__button:hover {
    outline: 0;
    box-shadow: none;
    background: #fff;
}

.accordion__button:before {
    order: 2;
    margin-top: -5px;
    color: #666;
}

.accordion__button:before {
    transform: rotate(45deg);
}

.accordion__button[aria-expanded='true']::before,
.accordion__button[aria-selected='true']::before {
    transform: rotate(224deg);
    margin-top: 4px;
}

.accordion__panel {
    padding: 20px;
    animation: fadein 0.35s ease-in;
    border: 2px solid #eee;
    box-sizing: border-box;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    border-top: 0;
    margin: 0 0 15px;
    color: #222;
    background: #fff;
    font-size: 16px;
    line-height: 22px;
    box-shadow: none;
}

.accordion__panel p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    line-height: 22px;
}

.accordion__item {
    margin: 0 0 15px;
}

.accordion__button:hover {
    background-color: #fff;
}

.accordion__item+.accordion__item {
    border-top: 0;
}

@media (max-width: 767px) {
    .accordion {
        margin: 0px;
    }

    .accordion__button {
        font-size: 16px;
        line-height: normal;
        padding: 10px;
    }

    .accordion__panel {
        padding: 15px;
        font-size: 14px;
    }

    .accordion__panel p,
    .accordion__button {
        font-size: 14px;
    }

    .accordion__button span {
        max-width: 80%;
    }
}
`

const KnowledgeBaseSection = () => {
  const router = useRouter()
  const { t } = useTranslation(['dashboard','translation'])

  const dispatch = useDispatch()
  const vendorDashboardContent = useSelector((state) => state.root.staticContent.vendorDashboardContent)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const hasActivePlan = useSelector((state) => state.root.myProfile.userData.userSubscription)
  const userData = useSelector((state) => state.root.myProfile.userData)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

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
    dispatch(getContent('Knowledgebase_vacation_mode', t, 'vendorDashboard', 'knowledgebaseVacationMode'))
    dispatch(getContent('Knowledgebase_submit_artwork', t, 'vendorDashboard', 'knowledgebaseSubmitArtwork'))
    dispatch(getContent('Knowledgbase_product_not_visible', t, 'vendorDashboard', 'knowledgbaseProductNotVisible'))
    dispatch(getContent('Knowledgbase_photo_requirements', t, 'vendorDashboard', 'knowledgbasePhotoRequirements'))
    dispatch(
      getContent('Knowledgbase_certificate_authenticity', t, 'vendorDashboard', 'knowledgbaseCertificateAuthenticity')
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, appLanguage])

  const accordionItem = (title, content) => (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <span>{title}</span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>{ReactHtmlParser(content)}</p>
      </AccordionItemPanel>
    </AccordionItem>
  )

  return (
    <>
      <Container>
        <CustomTabsWrapper>
          <LeftTabsBar />
          <CommonSection className="customPanelContent">
            <PaymentAlert />
            <HeadingSection>{t(`knowledgeBase.title`)}</HeadingSection>
            <Accordion allowZeroExpanded>
              {accordionItem(
                t(`knowledgebase.accordion1`),
                vendorDashboardContent['knowledgebaseVacationMode']
              )}
              {accordionItem(
                t(`knowledgebase.accordion2`),
                vendorDashboardContent['knowledgebaseSubmitArtwork']
              )}
              {accordionItem(
                t(`knowledgebase.accordion3`),
                vendorDashboardContent['knowledgbaseProductNotVisible']
              )}
              {accordionItem(
                t(`knowledgebase.accordion4`),
                vendorDashboardContent['knowledgbasePhotoRequirements']
              )}
              {accordionItem(
                t(`knowledgebase.accordion5`),
                vendorDashboardContent['knowledgbaseCertificateAuthenticity']
              )}
            </Accordion>
          </CommonSection>
        </CustomTabsWrapper>
      </Container>
    </>
  )
}

export default KnowledgeBaseSection
