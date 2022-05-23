import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'

const SectionHead = styled.div`
  position: relative;
  margin: 0;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0;
  flex-wrap: wrap;
  p {
    color: #000;
    font-size: 14px;
    cursor: pointer;
  }
`
const HeadingSec = styled.div`
  font-family: 'Montserrat-Regular';
  font-style: normal;
  font-size: 14px;
  line-height: normal;
  margin: 0 0 0 0;
  color: #222;
`

const SectionHeader = ({ inviteSectionModal, setInviteSectionModal }) => {
  const { t } = useTranslation('groupsFeed')
  return (
    <>
      <SectionHead>
        <HeadingSec>{t(`invite.title`)}:</HeadingSec>
        <p onClick={() => setInviteSectionModal(true)}>{t(`invite.seeAll`)}</p>
      </SectionHead>
    </>
  )
}
SectionHeader.propTypes = {
  inviteSectionModal: PropTypes.bool,
  setInviteSectionModal: PropTypes.func,
}
export default SectionHeader
