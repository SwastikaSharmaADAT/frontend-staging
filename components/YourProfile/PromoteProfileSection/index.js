import React from 'react'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import { useRouter } from 'next/router'

const PromoteSectionWrapper = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: column;
  padding: 0 0 20px;
  max-width: 350px;
  margin: 0 auto 30px;
`

const FollowsContentWrapper = styled.div`
  text-align: center;
  padding: 0 15px;
`

const PromoteHeading = styled.div`
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: normal;
  color: #222222;
  padding: 0;
  margin: 20px 0 15px;
  font-family: 'Montserrat-Regular';
`

const PromoteDescription = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #666666;
  padding: 0 50px;
  margin: 20px 0 15px;
  font-family: 'Montserrat-Regular';
`

const PromoteButton = styled.button`
  font-weight: 100;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 7px 15px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
  }
`

const PromoteProfileSection = () => {
  const router = useRouter()
  const { t } = useTranslation('badges')

  return (
    <>
      <PromoteSectionWrapper>
        <FollowsContentWrapper>
          <PromoteHeading>{t(`promoteProfileSection.title`)}</PromoteHeading>
          <PromoteDescription>{t(`promoteProfileSection.description`)}</PromoteDescription>
          <PromoteButton onClick={() => router.push('/badges')}>
            {t(`promoteProfileSection.getLinkButton`)}
          </PromoteButton>
        </FollowsContentWrapper>
      </PromoteSectionWrapper>
    </>
  )
}

export default PromoteProfileSection
