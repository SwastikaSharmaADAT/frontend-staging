import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { isLoginToken } from '../../utilities/authUtils'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { getLatestArtworks } from '../../modules/landingPage/landingPageSlice'
import { getOrderDetails } from '../../modules/subscription/subscriptionSlice'
import StyledCheckbox from '../UI/CustomCheckbox'
import MemberSectionContent from '../MemberSubscription/SectionContent'
import Head from 'next/head'
import {
  FeedWrapper,
  FullWidthContainer,
  FullWidthWrap,
  MainHeading,
  SliderContainerWrap,
  SecondaryHeading,
  ChooseProfile,
  FormGroup,
  ToggleContent,
  LabelSpan,
} from './styled.js'
import BannerHead from './BannerHead'
import ArtistSectionContent from './SectionContent'
import UnderagePopup from './UnderagePopup'

import SliderContainer from './SliderContainer'

const ArtistSubscription = () => {
  const { t } = useTranslation(['subscriptions', 'translation'])

  const dispatch = useDispatch()
  const router = useRouter()

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const params = router.query

  const [showUnderagePopup, setUnderagePopup] = useState(false)
  const [animateSvgs, setAnimateSvgs] = useState(false)
  const [artist, setArtist] = useState(true)

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const accountType = userInfo && JSON.parse(userInfo).accountType
  const userData = useSelector((state) => state.root.myProfile.userData)
  const latestArtworks = useSelector((state) => state.root.landingPage.latestArtworks)
  const subscription = useSelector((state) => state.root.myProfile.userData.userSubscription)

  const checkArtist = () => {
    if (!isEmptyObj(userData)) {
      if (userData.userRole === 'member') {
        return false
      } else if (userData.userRole === 'artist') {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }

  const [isArtist, setIsArtist] = useState(!isEmptyObj(userData) ? checkArtist() : false)

  useEffect(() => {
    if (!isEmptyObj(userData)) {
      if (userData.userRole === 'member') {
        setIsArtist(false)
      } else if (userData.userRole === 'artist') {
        setIsArtist(true)
      } else {
        setIsArtist(false)
      }
    } else {
      setIsArtist(false)
    }
  }, [userData])

  const handleArtistChange = (e) => {
    setIsArtist(e.target.checked)
  }

  const allowedUserRoles = ['artist', 'member']

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  /** Effect to not allow page user access subscription page */
  useEffect(() => {
    if (accountType === 'page' || (!isEmptyObj(userData) && !allowedUserRoles.includes(userData.userRole))) {
      router.push('/')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  useEffect(() => {
    dispatch(getLatestArtworks())
  }, [dispatch])

  useEffect(() => {
    /**get user details on page render */
    if (
      loggedInUsername &&
      (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) &&
      isLoginToken()
    ) {
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
    }
  }, [dispatch, loggedInUsername, userData])

  useEffect(() => {
    if (params.webQuoteId && isLoginToken()) {
      const refId = params.webQuoteId && JSON.parse(params.webQuoteId)
      dispatch(getOrderDetails(refId, 'subscription'))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const defaultCountry = 'Germany'


  useEffect(() => {

    if (!isEmptyObj(userData) && userData.username === loggedInUsername) {
      if (userData && userData.dob && !isEmptyObj(userData.dob) && userData.dob.value) {
        const userDOB = new Date(userData.dob.value)
        const todayDate = new Date()

        let diff = todayDate.getTime() - userDOB.getTime()
        const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25))

        if (age < 18) {
          setUnderagePopup(true)
        } else {
          setUnderagePopup(false)
        }
      } else {
        setUnderagePopup(true)
      }
    }
  }, [loggedInUsername, userData])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll, { passive: true });
    };
  }, [animateSvgs])

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > 400) {
      if (!animateSvgs) {
        setAnimateSvgs(true);
      }
    }
  };


  useEffect(() => {
    dispatch(getLatestArtworks())
  }, [dispatch])

  return (
    <>
      <Head>
        <title>Subscription | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      {showUnderagePopup ? (
        <UnderagePopup
          open={showUnderagePopup}
          closeModal={() => setUnderagePopup(false)}
          username={loggedInUsername}
          userData={userData}
        />
      ) : (
        <FeedWrapper>
          <FullWidthWrap>
            <MainHeading>{t(`subscriptions:makeArtSeenHeading`)}</MainHeading>
            <SliderContainerWrap>
              <SliderContainer latestArtworks={latestArtworks} />
            </SliderContainerWrap>
            {userData.userRoleType === 'personal' && !subscription && (
              <ChooseProfile className="subscription-pg">
              <div className="title">Choose Your Profile Type</div>
              <FormGroup className="cPorfileForm form-section">
              <span onClick={()=>{setIsArtist(false)}} className={ !isArtist ? 'firstspan btnDes boldTxt' : 'firstspan btnDes' }>{t(`profile:profileHead.memberProfile`)}</span>{' '}
              <StyledCheckbox checked={isArtist} onChange={handleArtistChange} />
              <span onClick={()=>{setIsArtist(true)}} className={ isArtist ? 'popoverDiv btnDes boldTxt' : 'popoverDiv btnDes' }>
                {t(`profile:profileHead.artistProfile`)}
              </span>
            </FormGroup>
            {
              isArtist ? <div className="helpSection help-artist"><div className="large-ft" dangerouslySetInnerHTML={{__html:t(`profile:profileHead.profileDesc.artist.firstline`)}}></div>{t(`profile:profileHead.profileDesc.artist.secondline`)}</div> : <div className="helpSection help-member"><div className="large-ft" dangerouslySetInnerHTML={{__html:t(`profile:profileHead.profileDesc.member.firstline`)}}></div>{t(`profile:profileHead.profileDesc.member.secondline`)}</div>
            }
            </ChooseProfile>
            )}
          </FullWidthWrap>
          <FullWidthWrap className='secondaryWrap'>
          <SecondaryHeading>{t(`subscriptions:promoteWorkHeading`)}</SecondaryHeading>
          </FullWidthWrap>
          <BannerHead isArtist={isArtist} />
          <FullWidthContainer>
            <MainHeading className="BottomHeading">{t(`subscriptions:pickPlanHeading`)}</MainHeading>
            {isArtist ? (
              <ArtistSectionContent
                isArtist={isArtist}
                userCountry={
                  userData && userData.country && userData.country.value ? userData.country.value : defaultCountry
                }
              />
            ) : (
              <MemberSectionContent
                isArtist={isArtist}
                userCountry={
                  userData && userData.country && userData.country.value ? userData.country.value : defaultCountry
                }
              />
            )}
          </FullWidthContainer>
        </FeedWrapper>
      )}
    </>
  )
}

export default ArtistSubscription
