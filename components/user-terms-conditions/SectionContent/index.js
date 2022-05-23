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

const SectionContent = ({ userContent }) => {
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
          {accordionItem(t(`usersTermsConditions.overview`), userContent['overview'])}
          {accordionItem(t(`usersTermsConditions.contentEligibility`), userContent['contentEligibility'])}
          {accordionItem(t(`usersTermsConditions.feesPayments`), userContent['feesPayments'])}
          {accordionItem(t(`usersTermsConditions.accountTermination`), userContent['accTermination'])}
          {accordionItem(t(`usersTermsConditions.provisions`), userContent['provisions'])}
        </Accordion>
      </div>
    </>
  )
}

SectionContent.propTypes = {
  userContent: PropTypes.any,
}

export default SectionContent
