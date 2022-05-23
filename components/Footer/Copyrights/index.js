import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

const CopyrightsWrapper = styled.p`
  position: relative;
  margin: 0;
  width: 100%;
  font-size: 12px;
  color: #666;
  padding: 0;
  text-align: center;
  @media (max-width: 767px) {
    display: none;
  }
`

/**
 * @category components
 * @description Footer component
 */
const Copyrights = () => {
  const { t } = useTranslation(['translation', 'footer'])
  return (
    t(`footer:copyrightText`) !== "footer:copyrightText" &&  <>
      <CopyrightsWrapper>{t(`footer:copyrightText`)}</CopyrightsWrapper>
    </>
  )
}

export default Copyrights
