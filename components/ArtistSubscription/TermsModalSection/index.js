import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import ReactHtmlParser from 'react-html-parser'
import PropTypes from 'prop-types'
import 'react-accessible-accordion/dist/fancy-example.css'
import { ModalWrapper, HeaderBar, MiddleSection, TermsPopupSubHeading } from '../styled.js'
import './TermsModalSection.module.css'
import Button from '../../UI/Button'
import { capitalizeFirstChar } from '../../../utilities/capitalizeFirstChar'
import { getContent } from '../../../modules/staticContent/staticContentSlice'
import SectionContent from './SectionContent'

const TermsModalSection = ({ acceptHandler, paidPlan, planTitle, roleName }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['subscriptions', 'translation', 'staticPages'])

  const userData = useSelector((state) => state.root.myProfile.userData)
  const vendorTermsContent = useSelector((state) => state.root.staticContent.vendorTermsCondContent)
  const appLanguage = useSelector((state) => state.root.staticContent.appLanguage)

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

  const accordionItem = (title, content) => (
    <AccordionItem>
      <AccordionItemHeading>
        <AccordionItemButton>
          <span style={{ width: '90%' }}>{title}</span>
        </AccordionItemButton>
      </AccordionItemHeading>
      <AccordionItemPanel>
        <p>{ReactHtmlParser(content)}</p>
      </AccordionItemPanel>
    </AccordionItem>
  )

  return (
    <>
      <ModalWrapper>
        <HeaderBar>{t(`termsCondsPopup.title`)}</HeaderBar>
        <MiddleSection>
          <br></br>
          <Accordion allowZeroExpanded>
            {accordionItem(t(`staticPages:vendorTermsConditions.overview`), vendorTermsContent['overview'])}
            {accordionItem(t(`staticPages:vendorTermsConditions.fees`), vendorTermsContent['fees'])}
            {accordionItem(t(`staticPages:vendorTermsConditions.termination`), vendorTermsContent['termination'])}
            {accordionItem(t(`staticPages:vendorTermsConditions.payoutSchedule`), vendorTermsContent['payoutSchedule'])}
            {accordionItem(
              t(`staticPages:vendorTermsConditions.contentEligibility`),
              vendorTermsContent['contentEligibility']
            )}
            {accordionItem(
              t(`staticPages:vendorTermsConditions.yourObligations`),
              vendorTermsContent['yourObligations']
            )}
            {accordionItem(
              t(`staticPages:vendorTermsConditions.artmoObligations`),
              vendorTermsContent['artmoObligations']
            )}
            {accordionItem(t(`staticPages:vendorTermsConditions.returns`), vendorTermsContent['returns'])}
            {accordionItem(t(`staticPages:vendorTermsConditions.provisions`), vendorTermsContent['provisions'])}
          </Accordion>
          <br></br>
        </MiddleSection>
        <HeaderBar className="terms-modal-footer">
          {roleName !== userData.userRole && (
            <p>
              {t(`subscriptions:roleChangeWarning`)} {capitalizeFirstChar(userData.userRole)}{' '}
              {t(`subscriptions:toText`)} {capitalizeFirstChar(roleName)}.
            </p>
          )}
          <Button onClick={() => acceptHandler()}>
            {paidPlan
              ? t(`subscriptions:termsCondsPopup.agreeAndProceed`)
              : `${t(`subscriptions:termsCondsPopup.agreeAndSubscribeTo`)} ${capitalizeFirstChar(planTitle)}`}
          </Button>
        </HeaderBar>
      </ModalWrapper>
    </>
  )
}

TermsModalSection.propTypes = {
  paidPlan: PropTypes.bool,
  planTitle: PropTypes.string,
  acceptHandler: PropTypes.func,
  roleName: PropTypes.string,
}

export default TermsModalSection
