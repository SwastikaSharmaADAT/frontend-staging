import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 34px 15px;
  background: #222;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  color: #fff;
  font-size: 36px;
  @media (max-width: 767px) {
    padding: 15px;
    font-size: 24px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const GroupBarHeading = ({ type }) => {
  const { t } = useTranslation('translation')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  return (
    <>
      <GroupBarHeadWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        {type === 'create' ? t('groups.createPageTitle') : t('groups.editGroupTitle')}
      </GroupBarHeadWrapper>
    </>
  )
}

GroupBarHeading.propTypes = {
  type: PropTypes.string,
}

export default GroupBarHeading
