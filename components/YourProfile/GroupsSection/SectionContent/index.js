import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import SingleGroup from './SingleGroup'

const GroupSection = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: flex-start;
  .DefaultText {
    font-style: normal;
    color: #666;
  }
`

const SectionContent = (props) => {
  const { t } = useTranslation('profile')
  return (
    <>
      <GroupSection>
        {props.userGroups ? (
          <>
            {props.userGroups.length > 0 ? (
              <>
                {props.userGroups.map((group, index) => <SingleGroup key={index} group={group} index={index} />)}
              </>
            ) : (
              <span className="DefaultText">{t(`group.noGroupsFound`)}</span>
            )}
          </>
        ) : null}
      </GroupSection>
    </>
  )
}

SectionContent.propTypes = {
  userGroups: PropTypes.array,
}

export default SectionContent