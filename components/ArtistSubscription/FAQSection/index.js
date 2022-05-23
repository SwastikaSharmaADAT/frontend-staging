import React from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import { populateChatBox, setMessageState } from '../../../modules/messages/messagesSlice.js'
import { BsEnvelope } from 'react-icons/bs'
import { SectionContentWrapper, InnerBannerBar, AskQuestion } from '../styled.js'
import 'react-accessible-accordion/dist/fancy-example.css'
import './FAQSection.module.css'

const FAQSection = ({ subscriptionContent, artistType }) => {
  const dispatch = useDispatch()

  const userData = useSelector((state) => state.root.myProfile.userData)

  const { t } = useTranslation('subscriptions')

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
  const messageAdminHandler = () => {
    dispatch(setMessageState({ key: 'chatPopup', value: true }))
    dispatch(populateChatBox({ senderUser: {}, receiverUser: userData.adminDetails }))
  }

  return (
    <>
      <SectionContentWrapper>
        <InnerBannerBar>
          {t(`faq.title`)}
          <AskQuestion onClick={messageAdminHandler}>
            <BsEnvelope /> {t(`faq.askQuestion`)}
          </AskQuestion>
        </InnerBannerBar>
        <Accordion allowZeroExpanded>
          {artistType &&
            accordionItem(
              t(`faq.questionLabels.subscriptionFee`),
              subscriptionContent['faqSubscriptionFee']
            )}
          {artistType &&
            accordionItem(t(`faq.questionLabels.basicAccount`), subscriptionContent['faqBasicAccount'])}
          {accordionItem(
            t(`faq.questionLabels.cancelSubscription`),
            subscriptionContent['faqCancelRefund']
          )}
          {accordionItem(t(`faq.questionLabels.paymentForSelling`), subscriptionContent['faqForSelling'])}
          {accordionItem(t(`faq.questionLabels.publishAndSell`), subscriptionContent['faqPublishSell'])}
          {artistType &&
            accordionItem(t(`faq.questionLabels.howArtmoSurvive`), subscriptionContent['faqNoCommision'])}
        </Accordion>
      </SectionContentWrapper>
    </>
  )
}

FAQSection.propTypes = {
  subscriptionContent: PropTypes.object,
  artistType: PropTypes.bool,
}

export default FAQSection
