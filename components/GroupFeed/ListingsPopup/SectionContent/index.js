import React from 'react'
import PropTypes from 'prop-types'
import InviteSectionContent from './InviteSectionContent/InviteSectionContent'
import GroupMemberContent from './GroupMemberContent/GroupMemberContent'
import JoinRequestList from './JoinRequestList/JoinRequestList'

/**render listing according to type */
const SectionContent = ({ groupMembers, type }) => {
  if (type === 'invite') return <InviteSectionContent type={type}  />
  else if (type === 'joinList') return <JoinRequestList type={type}  />
  else return <GroupMemberContent type={type}  />
}

SectionContent.propTypes = {
  groupMembers: PropTypes.func,
  type: PropTypes.string,
}

export default SectionContent
