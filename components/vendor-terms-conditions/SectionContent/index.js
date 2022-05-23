import React from 'react'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { useTranslation } from 'next-i18next'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import 'react-accessible-accordion/dist/fancy-example.css'

const SectionContent = ({ content }) => {
  const { t } = useTranslation('staticPages')

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
      <div style={{ width: '100%' }}>
        <Accordion allowZeroExpanded>
          {accordionItem(t(`vendorTermsConditions.impOverview`), content['impOverview'])}
          {accordionItem(t(`vendorTermsConditions.stepByStep`), content['stepByStep'])}
        </Accordion>
        <br></br>
        <Accordion allowZeroExpanded>
          {accordionItem(t(`vendorTermsConditions.overview`), content['overview'])}
          {accordionItem(t(`vendorTermsConditions.fees`), content['fees'])}
          {accordionItem(t(`vendorTermsConditions.termination`), content['termination'])}
          {accordionItem(t(`vendorTermsConditions.payoutSchedule`), content['payoutSchedule'])}
          {accordionItem(t(`vendorTermsConditions.contentEligibility`), content['contentEligibility'])}
          {accordionItem(t(`vendorTermsConditions.yourObligations`), content['yourObligations'])}
          {accordionItem(t(`vendorTermsConditions.artmoObligations`), content['artmoObligations'])}
          {accordionItem(t(`vendorTermsConditions.returns`), content['returns'])}
          {accordionItem(t(`vendorTermsConditions.provisions`), content['provisions'])}
        </Accordion>
        <Accordion allowZeroExpanded>
          {accordionItem(t(`vendorTermsConditions.shippingReturnPolicy`), content['shippingReturnPolicy'])}
        </Accordion>
      </div>
    </>
  )
}

SectionContent.propTypes = {
  content: PropTypes.any,
}

export default SectionContent
