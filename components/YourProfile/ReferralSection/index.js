import { useRouter } from 'next/router'
import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useTranslation } from 'next-i18next'
import styled from 'styled-components'
import badge from '../../../public/assets/badge_gold.png'
import ReferralProgress from './ReferralProgress'
import { referralUsers } from '../../../modules/profile/myProfileSlice'
import ReactHtmlParser from 'react-html-parser'

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
`

const FollowsBanner = styled.div`
  width: 100%;
  height: 74px;
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  background: #000;
  img {
    width: 28px;
    height: 28px;
    margin-left: 10px;
    margin-bottom: -6px;
  }
  .bg {
    width: 100%;
    height: 100%;
    object-fit: cover;
    margin: 0;
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
  &.defBanText{
    text-transform: capitalize;
    font-size: 22px ;
  }
`

const FollowsContent = styled.div`
  text-align: center;
  padding: 0 15px;
`

const FollowDesp = styled.p`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 1.7;
  color: #222222;
  padding: 0;
  margin: 20px 0 15px;
  font-family: 'Montserrat-Regular';
  &.defBanDesc{
    font-size: 20px ;
    font-family: 'Montserrat-Medium';
  }
`

const FollowButton = styled.button`
  min-height: 30px;
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
const HighlightText = styled.div`
  color: red ;
  font-size: 14px ; 
  margin-top: 10px ;
  font-family: 'Montserrat-Medium';
`

const InviteSection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('referrals')

  const goal = 10;
  const router = useRouter()

  const [confirmedReferrals, setConfirmedReferrals] = useState(false)


  const referrals = useSelector((state) => state.root.myProfile.referralUsers)

  useEffect(() => {
      dispatch(referralUsers())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useEffect(() => {
    if (referrals && referrals.length > 0) {
      const confirmed = referrals.filter((item) => { 
        const dateCreated = new Date(item.dateCreated).getTime()
        const legacyRef = dateCreated < 1641229200000//Mon Jan 03 2022 18:00:00 GMT+0100
        return (item.confirmedStatus === true || legacyRef )
      })
      setConfirmedReferrals(confirmed)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, referrals])


  return (
      <>
        <FollowsSectionWrap1>
          <FollowsBanner>
            {
              confirmedReferrals && confirmedReferrals.length > 0 ? 
              <BannerInnerText>{t(`referralProgram`)}<img src={'/assets/badge_gold.png'}/></BannerInnerText>
              :
              <BannerInnerText className='defBanText'>{ReactHtmlParser(t(`defaultBannerHeading`))} <img src={'/assets/badge_gold.png'}/></BannerInnerText>
            }
            
          </FollowsBanner>

          {
            confirmedReferrals && confirmedReferrals.length > 0 ?
            <FollowsContent>
              <ReferralProgress sidebar={true} referrals={confirmedReferrals ? confirmedReferrals.length : 0} goal={goal}/>
              <FollowButton onClick={() => router.push('/referrals')}>{t(`viewReferrals`)}</FollowButton>
            </FollowsContent>
          : 
            <FollowsContent>
              <FollowDesp className='defBanDesc'>
                {/* {t(`ctaText`)} */}
                {ReactHtmlParser(t(`defCtaText`))}
              </FollowDesp>
              <FollowButton onClick={() => router.push('/referrals')}>{t(`seeMore`)}</FollowButton>
              <HighlightText>{t(`highlightText`)}</HighlightText>
            </FollowsContent>
          }
        </FollowsSectionWrap1>
      </>
  )
}

export default InviteSection
