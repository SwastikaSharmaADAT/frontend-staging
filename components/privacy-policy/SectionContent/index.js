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
          {accordionItem(t(`privacyPolicyPage.accountPrivacySettings`), content['accPrivacySettings'])}
          {accordionItem(t(`privacyPolicyPage.dataSecurity`), content['dataSecurity'])}
          {accordionItem(t(`privacyPolicyPage.collectingPersonalData`), content['collectingPersonalData'])}
          {accordionItem(t(`privacyPolicyPage.adsOnArtmo`), content['adsOnArtmo'])}
        </Accordion>
      </div>
    </>
  )
}

SectionContent.propTypes = {
  content: PropTypes.any,
}

export default SectionContent
