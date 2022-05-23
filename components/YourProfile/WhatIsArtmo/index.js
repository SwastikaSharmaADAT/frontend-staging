import { useRouter } from 'next/router'
import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'

const NeedHelpSectionWrap = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: row;
  padding: 0;
  max-width: 350px;
  margin: 0 auto 30px;
  align-items: center;
  justify-content: center;
  min-height: 50px;
  cursor: pointer;
  svg {
    font-size: 22px;
    margin: 0 10px 0 0;
  }
`

const WhatIsArtmo = () => {
  const { t } = useTranslation('rightSection')
  const router = useRouter()

  return (
    <>
      <NeedHelpSectionWrap onClick={() => router.push('/what-is-artmo')}>
        {t(`whatIsArtmo`)}
      </NeedHelpSectionWrap>
    </>
  )
}

export default WhatIsArtmo
