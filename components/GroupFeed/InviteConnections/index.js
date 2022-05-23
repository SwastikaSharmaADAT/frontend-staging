import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SectionHeader from './SectionHeader'
import SectionContent from './SectionContent'

const InviteConnectionsWrap = styled.div`
  position: relative;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 0 0 17px;
  padding: 17px;
`

const InviteConnections = () => {
  const [inviteSectionModal, setInviteSectionModal] = useState(false)
  return (
    <>
      <InviteConnectionsWrap>
        <SectionHeader inviteSectionModal={inviteSectionModal} setInviteSectionModal={setInviteSectionModal} />
        <SectionContent inviteSectionModal={inviteSectionModal} setInviteSectionModal={setInviteSectionModal} />
      </InviteConnectionsWrap>
    </>
  )
}
InviteConnections.propTypes = {
  component: PropTypes.func,
}
export default InviteConnections
