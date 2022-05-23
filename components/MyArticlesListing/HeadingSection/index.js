import React, {useState, useEffect} from 'react'
import styled from 'styled-components'
import ButtonGrey from '../../UI/ButtonGrey'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'

const HeadingWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const BannerBar = styled.div`
  position: relative;
  padding: 0;
  background: #222;
  font-weight: normal;
  font-size: 36px;
  line-height: normal;
  color: #ffffff;
  padding: 0px 30px;
  text-transform: uppercase;
  min-height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
    min-height: auto;
  }
`

const HeadingSection = () => {
  const { t } = useTranslation('articles')
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  
  return (
    <>
      <HeadingWrapper className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
      <BannerBar>{t(`myArticle.title`)} <ButtonGrey onClick={() => router.push(`/user/${loggedInUsername}/activity/add-article`)}>Add Article</ButtonGrey></BannerBar>
      </HeadingWrapper>
    </>
  )
}

export default HeadingSection
