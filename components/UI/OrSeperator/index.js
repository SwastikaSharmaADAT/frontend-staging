import React from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'

const OrSeperatortext = styled.div`
  color: #666;
  width: 100%;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 16px;
  margin: 15px 0 15px;
  text-align: center;
  ::before {
    display: inline-block;
    content: '';
    border-top: 1px solid #eee;
    width: 100%;
    margin: 0;
    -webkit-transform: translateY(-1rem);
    -ms-transform: translateY(-1rem);
    transform: translateY(-1rem);
    position: absolute;
    top: 25px;
    left: 0;
  }
  @media (max-width: 767px) {
    margin: 15px 0;
  }
  span {
    background: #fff;
    position: relative;
    padding: 0 5px;
  }
`

// const SpanText = styled.span`
//   margin: 0 9px;
// `

const OrSeperator = () => {
  const { t } = useTranslation('translation')

  return (
    <OrSeperatortext>
      <span>{t('auth.or')}</span>
    </OrSeperatortext>
  )
}
export default OrSeperator
