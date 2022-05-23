import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import InviteContent from './InviteContent'

const FollowsSectionWrap1 = styled.div`
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  width: auto;
  position: relative;
  display: flex;
  flex-direction: column !important;
  padding: 0 0 20px;
  max-width: 350px;
  margin: 0 auto 30px;
  @media( max-width: 1024px ){
    display: none ;
  }
`

const FollowsBanner = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: #222 ;
  img {
    width: 100%;
    height: 100%;
  }
`

const BannerInnerText = styled.div`
  text-align: center;
  position: absolute;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  text-transform: uppercase;
  color: #fff;
  @media (max-width: 479px) {
    font-size: 18px;
    line-height: normal;
  }
`

const FollowsContent = styled.div`
  text-align: center;
  padding: 0 15px;
`

const FollowDesp = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  color: #222222;
  padding: 0;
  margin: 20px 0 15px;
  font-family: 'Montserrat-Regular';
`

const FollowButton = styled.button`
  min-height: 30px;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222;
  width: auto;
  border: 0;
  padding: 0 15px;
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
    font-weight: bold;
    font-size: 14px;
    padding: 0 10px;
  }
`

const InviteSection = () => {
  const { t } = useTranslation('invite')

  const router = useRouter()

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const [showServices, setShowServices] = useState(true)
  return (
    <>
      <FollowsSectionWrap1>
        <FollowsBanner>
          {/* <img src='/assets/bannerhead.png' alt="Banner" /> */}
          <BannerInnerText>{t(`title`)}</BannerInnerText>
        </FollowsBanner>

        <FollowsContent>
          <FollowDesp>
            <InviteContent
              showServices={showServices}
              setShowServices={setShowServices}
              userData={userData}
            />
          </FollowDesp>
          <FollowButton onClick={() => router.push('/invite')}>{t(`seeMore`)}</FollowButton>
        </FollowsContent>
      </FollowsSectionWrap1>
    </>
  )
}

export default InviteSection
