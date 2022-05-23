import React, { useRef, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { lowerCase } from 'lodash'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import {
  setEditingHeader,
  setEditingAbout,
  setEditingContact,
  setEditingProfile,
  setUserData,
  setCoverPhoto,
  setProfilePhoto,
} from '../../../modules/profile/myProfileSlice'
import { countriesUsingDecimal } from '../../../utilities/decimalUsingCountries'
import { isEmptyObj } from '../../../utilities/checkEmptyObject.js'
import { isLoginToken } from '../../../utilities/authUtils'
import { getUserData } from '../../../modules/profile/myProfileSlice'
import RightSection from '../../../components/NewsFeed/RightSection'
import ProfileHead from '../../../components/YourProfile/ProfileHead'
import ProfileStatusSec from '../../../components/YourProfile/ProfileStatusSec'
import AboutSection from '../../../components/YourProfile/AboutSection'
import BiographySection from '../../../components/YourProfile/BiographySection'
import ContactInfoSection from '../../../components/YourProfile/ContactInfoSection'
import ActivitySection from '../../../components/YourProfile/ActivitySection'
import VideosSection from '../../../components/YourProfile/VideosSection'
import ArtworkSection from '../../../components/YourProfile/ArtworkSection'
import AlbumsSection from '../../../components/YourProfile/AlbumsSection'
import GroupsSection from '../../../components/YourProfile/GroupsSection'
import TechniqueSection from '../../../components/YourProfile/TechniqueSection'
import ExpertiseSection from '../../../components/YourProfile/ExpertiseSection'
import CollectionSection from '../../../components/YourProfile/CollectionSection'
import AwardsSection from '../../../components/YourProfile/AwardsSection'
import NewsSection from '../../../components/YourProfile/NewsSection'
import FacultySection from '../../../components/YourProfile/FacultySection'
import PastExhibitionsSection from '../../../components/YourProfile/PastExhibitionsSection'
import PublicationsSection from '../../../components/YourProfile/PublicationsSection'
import BusinessSection from '../../../components/YourProfile/BusinessSection'
import PersonalInfoSection from '../../../components/YourProfile/PersonalInfoSection'
import UserProfile from '../../../components/YourProfile/UserProfile'
import UserProfileConnections from '../../../components/YourProfile/UserProfileConnections'
import BlockedUserProfile from '../../../components/YourProfile/BlockedUserSection'
import { useRouter } from 'next/router'
import publicRoute from '../../../HOC/publicRoute'
import staticFilesArray from '../../../utilities/staticFilesArray'
import { getUserName } from '../../../utilities/otherProfile'
import { useTranslation } from 'next-i18next'
import Loader from '../../../components/UI/BackdropLoader'
import Head from 'next/head'
import BelowContentAds from '../../../components/YourProfile/BelowContentAds'
import MessagePopup from '../../../components/YourProfile/MessagePopup'
import { createResizeImageUrl } from '../../../utilities/imageUtils'
import WishlistSection from '../../../components/YourProfile/WishlistSection'

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
const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 350px;
  @media (max-width: 1279px) {
    margin-left: 15px;
  }
  @media (max-width: 479px) {
    margin-left: 0;
  }
  @media (max-width: 1024px) {
    max-width: 100%;
  }
`
const BlockedWrapper = styled.div`
  width: 100%;
`

const YourProfile = () => {
  const dispatch = useDispatch()
  const head = useRef(null)
  const about = useRef(null)
  const contact = useRef(null)
  const profile = useRef(null)
  const dob = useRef(null)

  const AboutSectionRef = useRef(null)
  const ContactInfoSectionRef = useRef(null)
  const ActivitySectionRef = useRef(null)
  const VideosSectionRef = useRef(null)
  const ArtworkSectionRef = useRef(null)
  const LikedArtworkSectionRef = useRef(null)
  const AlbumsSectionRef = useRef(null)
  const GroupsSectionRef = useRef(null)
  const TechniqueSectionRef = useRef(null)
  const ExpertiseSectionRef = useRef(null)
  const AwardsSectionRef = useRef(null)
  const PastExhibitionsSectionRef = useRef(null)
  const NewsSectionRef = useRef(null)
  const FacultySectionRef = useRef(null)
  const PublicationsSectionRef = useRef(null)
  const BusinessSectionRef = useRef(null)
  const PersonalInfoSectionRef = useRef(null)

  const scrollToTarget = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const refObject = {
    AboutSectionRef,
    ContactInfoSectionRef,
    ActivitySectionRef,
    VideosSectionRef,
    ArtworkSectionRef,
    AlbumsSectionRef,
    TechniqueSectionRef,
    ExpertiseSectionRef,
    AwardsSectionRef,
    LikedArtworkSectionRef,
    PastExhibitionsSectionRef,
    NewsSectionRef,
    FacultySectionRef,
    PublicationsSectionRef,
    BusinessSectionRef,
    GroupsSectionRef,
    PersonalInfoSectionRef,
    scrollToTarget,
  }
  const { t } = useTranslation(['translation', 'profile'])
  const router = useRouter()
  const { username } = router.query

  const [currency, setCurrency] = useState('EUR')
  const [conversionRate, setConversionRate] = useState(1)
  const [decimalSeparator, setDecimalSeparator] = useState('comma')

  const [userInfo, setUserInfo] = useState(null)
  const loggedInAccountType = userInfo && JSON.parse(userInfo).accountType
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userIdentity = useSelector((state) => state.root.myProfile.userData.userIdentity)
  const userRoleType = useSelector((state) => state.root.myProfile.userData.userRoleType)
  const isProfileLocked = useSelector((state) => state.root.myProfile.isProfileLocked)
  const loggedInUserBlocked = useSelector((state) => state.root.myProfile.loggedInUserBlocked)
  const userDataState = useSelector((state) => state.root.myProfile.userData)

  const userData = useSelector((state) => state.root.myProfile.userData)
  const userCountry = userData && userData.country && userData.country.value ? userData.country.value : 'Germany'
  const currentCurrency = useSelector((state) => state.root.landingPage.currencyObj)
  const [currencyInfo, setCurrencyInfo] = useState(null)
  const localCurrency = currencyInfo && JSON.parse(currencyInfo)

  const [ loggedInUserProfile, setLoggedInUserProfile ] = useState( false  ) 

  useEffect(()=>{
    if ( isLoginToken ) {
      if (userDataState.username === loggedInUsername ) {
        setLoggedInUserProfile( true )
      } else {
        setLoggedInUserProfile( false )
      }
    }
    //setLoggedInUserProfile( false )
  }, [userDataState, loggedInUsername ])

  useEffect(() => {
    setCurrencyInfo(localStorage.getItem('currencyInfo'))
  }, [])

  useEffect(() => {
    if (countriesUsingDecimal.includes(userCountry)) {
      setDecimalSeparator('dot')
    } else {
      setDecimalSeparator('comma')
    }
  }, [userCountry])

  useEffect(() => {
    if (!isEmptyObj(currentCurrency) && currentCurrency.currency && currentCurrency.conversionRate) {
      setCurrency(currentCurrency.currency)
      setConversionRate(currentCurrency.conversionRate)
    } else {
      if (localCurrency) {
        if (!isEmptyObj(localCurrency) && localCurrency.currency && localCurrency.conversionRate) {
          setCurrency(localCurrency.currency)
          setConversionRate(localCurrency.conversionRate)
        } else {
          setCurrency('EUR')
          setConversionRate(1)
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentCurrency])

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {

    
    if (userDataState.username !== username) {
      dispatch(
        setUserData({
          ...userDataState,
          firstName: '',
          lastName: '',
          country: {},
          city: {},
          username: username,
          userRoleId: '',
          followersCount: 0,
          followingCount: 0,
          connectionCount: 0,
          userRole: '',
          bio: '',
          profilePicUrl: 'temp',
          coverPicUrl: '',
          aboutMe: '',
          isActive: false,
        })
      )
    }
    dispatch(setCoverPhoto(false))
    dispatch(setProfilePhoto(false))
    if (username) dispatch(getUserData(username, 'fetchData', t))

    if ((userDataState.username !== username) && (username === 'artmogallery')) router.push('/user/artmo')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, username])

  useEffect(() => {
    if (username && (userDataState.username !== username)) dispatch(getUserData(username, 'fetchData', t))
  }, [dispatch])


  const scrollTo = (ref) => {
    if (ref === 'head') {
      head.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(setEditingHeader(true))
    } else if (ref === 'about') {
      about.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(setEditingAbout(true))
    } else if (ref === 'contact') {
      contact.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(setEditingContact(true))
    } else if (ref === 'profile') {
      profile.current.scrollIntoView({ behavior: 'smooth' })
      dispatch(setEditingProfile(true))
    }
  }

  const scrollToDob = () => {
    dob.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }

  const scrollToBlurred = () => {
    contact.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
  }
  //console.log(lowerCase(userDataState.username), lowerCase(username))
  
  return t(`profile:placeholderIntro`) !== 'profile:placeholderIntro' ? (
    <>
      <div>
        <Head>
          <title>
            {!isEmptyObj(userDataState) ? getUserName(userDataState) : ''} | ARTMO | The Art Network | Connecting The Art
            World
          </title>
          <meta
            name="description"
            content={
              userDataState.firstName +
              ' ' +
              userDataState.lastName +
              " is on ARTMO. Join ARTMO to view profiles, social-art-network, join-in for free, artists, members, collections, exhibitions, galleries, paintings, sculptures, installations, drawings, collage"
            }
          />
          <meta name="og:url" content={router.asPath}/>
          <meta
            name="og:title"
            content={
              userDataState.firstName +
              ' ' +
              userDataState.lastName +
              ' | ARTMO | The Art Network | Connecting The Art World'
            }
          />
          <meta name="og:image"              
                content={userDataState && userDataState.pictureUrl
              ? createResizeImageUrl(userDataState.profilePicUrl, 150, 150, 'profileCover')
              : '/assets/ARTMO-Social-Share.jpg'}/>
        </Head>
      </div>
      <YourProfileWrapper className={userDataState.username === username ? "notranslate" : ''}>
        <YourProfileContainer>
          <>
            {(isProfileLocked || loggedInUserBlocked) && (
              <BlockedWrapper>
                <BlockedUserProfile />
              </BlockedWrapper>
            )}
            {!isProfileLocked && !loggedInUserBlocked && (
              <>
                <LeftContainer>
                  {userDataState &&
                    userDataState.username &&
                    username && (
                      <>
                        <ProfileHead refProp={head} scrollToBlurred={scrollToBlurred} userDataState={userDataState} />
                        <ProfileStatusSec scrollTo={scrollTo} />
                        {
                          userRoleType === 'personal' && (
                            <ArtworkSection
                                refObject={refObject}
                                currency={currency}
                                conversionRate={conversionRate}
                                decimalSeparator={decimalSeparator}
                              />
                          )
                        }
                        {
                          userRoleType === 'personal' && (
                            <CollectionSection
                                refObject={refObject}
                                currency={currency}
                                conversionRate={conversionRate}
                                decimalSeparator={decimalSeparator}
                              />
                          )
                        }
                        {
                          loggedInUserProfile && userRoleType === 'personal' && (
                            <WishlistSection 
                              refObject={refObject}
                              currency={currency}
                              conversionRate={conversionRate}
                              decimalSeparator={decimalSeparator} 
                            />
                          )
                        }
                        {
                          !isLoginToken() &&   <MessagePopup className="singleUserProf"/>
                        }
                        <AboutSection refObject={refObject} refProp={about} />
                        {
                          isLoginToken() && userRoleType === 'personal' && <TechniqueSection refObject={refObject} />
                        }
                        <BiographySection />
                        {!isLoginToken() ? (
                          <ContactInfoSection refObject={refObject} refProp={contact} />
                        ) : (
                          <>
                            <ContactInfoSection refObject={refObject} refProp={contact} />
                            <ActivitySection refObject={refObject} />
                            <VideosSection refObject={refObject} />
                            { userRoleType === 'personal' && (
                              <ArtworkSection
                                refObject={refObject}
                                liked
                                currency={currency}
                                conversionRate={conversionRate}
                                decimalSeparator={decimalSeparator}
                              />
                            )}
                            <AlbumsSection refObject={refObject} />
                            {userRoleType !== 'page' && loggedInAccountType !== 'page' && (
                              <GroupsSection refObject={refObject} />
                            )}
                            {userRoleType === 'personal' && (
                              <>
                                <ExpertiseSection refObject={refObject} />
                                <AwardsSection refObject={refObject} />
                                <PublicationsSection refObject={refObject} />
                                <BusinessSection refObject={refObject} />
                              </>
                            )}
                            {userRoleType === 'page' && (
                              <>
                                <NewsSection refObject={refObject} />
                                {
                                  userDataState.userRole !== 'company' && <FacultySection refObject={refObject} />
                                }
                                
                              </>
                            )}
                            {
                              userDataState.userRole !== 'company' &&  userDataState.userRole !== 'member' && <PastExhibitionsSection refObject={refObject} />
                            }
                            <PersonalInfoSection
                              refObject={refObject}
                              refProp={profile}
                              scrollToDob={scrollToDob}
                              dobRef={dob}
                            />
                          </>
                        )}
                      </>
                    )}
                  <BelowContentAds/>
                </LeftContainer>
                <RightContainer>
                  {/* {userIdentity === 'authUser' ? (
                    <>
                      <UserProfile refObject={refObject} />
                      {userRoleType === 'personal' && <UserProfileConnections scrollToBlurred={scrollToBlurred} />}
                    </>
                  ) : null} */}
                  <RightSection identityUser={userIdentity} refObject={refObject} userRoleType={userRoleType} scrollToBlurred={scrollToBlurred} />
                </RightContainer>
              </>
            )}

            {/* Render Right side navigation for other user */}
          </>
        </YourProfileContainer>
      </YourProfileWrapper>
    </>
  ) : (
    <Loader open={true} />
  )
}

export async function getStaticPaths() {
  return {
    paths: ['/user/*'],
    fallback: true,
  }
}

export const getStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale, staticFilesArray)),
  },
})

export default publicRoute(YourProfile)
