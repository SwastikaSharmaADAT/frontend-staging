import React from 'react'
import styled from 'styled-components'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import ButtonLight from '../../UI/ButtonLight'
import RightSection from '../../NewsFeed/RightSection'
import { useSelector } from 'react-redux'

const YourProfileWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (max-width: 1024px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 870px;
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`

const ProfileCoverImgWrapper = styled.div`
  width: 100%;
  position: relative;
  height: 392px;
  display: flex;
  align-items: center;
  overflow: hidden;
  justify-content: center;
  background: linear-gradient(0deg, #f5f5f5, #f5f5f5);
  object-fit: cover;
  img {
    width: 100%;
    height: 100%;
    @media (max-width: 767px) {
    }
  }
  @media (max-width: 767px) {
    padding: 0;
    flex-direction: column;
    height: 190px;
  }
`
const ProfileDetailsWrapper = styled.div`
  width: auto;
  position: relative;
  padding: 20px 34px;
  display: flex;
  flex-direction: row;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    padding: 15px;
    flex-direction: column;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
const ProfileImage = styled.div`
  width: 134px;
  position: relative;
  height: 134px;
  display: flex;
  align-items: center;
  margin: -70px 20px 0 0;
  background: #fff;
  justify-content: center;
  background: linear-gradient(0deg, #eeeeee, #eeeeee);
  img {
    max-height: 134px;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  @media (max-width: 767px) {
    margin: -70px auto 0;
    width: 100px;
    height: 100px;
  }
`
const ProfileHeaderDetailsWrap = styled.div`
  width: calc(100% - 155px);
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 24px;
  color: #222222;
  flex-direction: column;
  align-items: center;
  @media (max-width: 767px) {
    margin: 15px 0 0;
    width: 100%;
    font-size: 18px;
  }
  button {
    max-width: 130px;
    font-family: 'Montserrat-Regular';
    margin: 20px auto;
  }
`

const YourProfile = () => {
  const router = useRouter()
  const { t } = useTranslation('profile')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <YourProfileWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <ProfileCoverImgWrapper />
            <ProfileDetailsWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <ProfileImage />
              <ProfileHeaderDetailsWrap>
                {t(`blockSection.accountUnavailable`)}
                <ButtonLight label={t(`blockSection.goToHome`)} onClick={() => router.push('/')} />
              </ProfileHeaderDetailsWrap>
            </ProfileDetailsWrapper>
          </LeftContainer>
          <RightSection />
        </YourProfileContainer>
      </YourProfileWrapper>
    </>
  )
}

export default YourProfile
