import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { isLoginToken } from '../../../utilities/authUtils'
import { useRouter } from 'next/router'

const CollectionWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0 0 40px;
  width: 100%;
  background: #0A0A0A !important;
`

const CollectionContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    width: 1094px ;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
`
const CollectionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (min-width: 768px) and (max-width: 991px) {
      display: flex;
      flex-flow: row wrap;
      -webkit-box-pack: justify;
      justify-content: space-between;
    }
    @media (max-width: 767px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    li {
      text-align: center;
      margin: 15px;
      padding: 0;
      max-width: 347px;
      background: #222222;
      border: 1px solid #ffffff;
      width: 100%;
      display: inline-block;
      overflow: hidden;
      @media ( min-width: 1280px ) and ( max-width: 1500px){
        max-width: 300px;
      }
      @media (min-width: 1153px ) and (max-width: 1280px) {
        width: 267px;
      }
      @media( min-width: 1025px ) and ( max-width: 1152px){
        width: 236px ;
      }
      @media (max-width: 1024px) {
        width: auto;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        flex: 0 0 calc(50% - 5px);
        margin: 10px;
      }
      @media (max-width: 767px) {
        max-width: 48%;
      }
      @media (max-width: 479px) {
        max-width: 46%;
      }
      @media (max-width: 767px) {
        flex: 0 0 calc(50% - 10px);
        margin: 5px
      }
      a {
        color: #fff;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        text-transform: uppercase;
        img {
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
          height: 100px ;
          @media (max-width: 767px) {
            min-height: 100px;
          }
        }
        h1 {
          background: #000;
          transition: all 0.2s ease-in-out;
        }
        :hover {
          img {
            transform: scale(1.05);
          }
          h1 {
            background: #666;
            transition: all 0.2s ease-in-out;
          }
        }
      }
    }
  }
`

const CollectionHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 8px 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
`

const CollectionSection = () => {
  const { t } = useTranslation('landingPage')
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  return (
    <>
      <CollectionWrapper>
        <CollectionContainer>
          <CollectionWrap>
            <ul>
              <li>
                <a onClick={() => isLoginToken() ? router.push(`/user/${loggedInUsername}/activity`) : router.push(`/what-is-artmo`) }>
                  <img src='/assets/home-img.png' alt="Home" />
                  <CollectionHeading>{t(`gridSection.home`)}</CollectionHeading>
                </a>
              </li>
              <li>
                <a onClick={() => router.push(`/users?userType=artist`)}>
                  <img src='/assets/artists-img.png' alt="Artist" />
                  <CollectionHeading>{t(`gridSection.artists`)}</CollectionHeading>
                </a>
              </li>
              <li>
                <a onClick={() => router.push(`/users?userType=gallery`)}>
                  <img src='/assets/galleries-img.png' alt="Gallery" />
                  <CollectionHeading>{t(`gridSection.galleries`)}</CollectionHeading>
                </a>
              </li>
              <li>
                <a onClick={() => router.push(`/exhibition`)}>
                  <img src='/assets/exhibitions-img.png' alt="Exhibition" />
                  <CollectionHeading>{t(`gridSection.exhibitions`)}</CollectionHeading>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a onClick={() => router.push(`/users`)}>
                  <img src='/assets/users-img.png' alt="Users" />
                  <CollectionHeading>{t(`gridSection.users`)}</CollectionHeading>
                </a>
              </li>
              <li>
                <a onClick={() => router.push(`/artworks`)}>
                  <img src='/assets/collections-img.png' alt="Artworks" />
                  <CollectionHeading>{t(`gridSection.artwork`)}</CollectionHeading>
                </a>
              </li>
              <li>
                <a onClick={() => router.push(`/genres`)}>
                  <img src='/assets/genres-img.png' alt="Genres" />
                  <CollectionHeading>{t(`gridSection.genres`)}</CollectionHeading>
                </a>
              </li>
              <li>
                <a onClick={() => router.push(`/users?userType=university`)}>
                  <img src='/assets/university-img.png' alt="University" />
                  <CollectionHeading>{t(`gridSection.universities`)}</CollectionHeading>
                </a>
              </li>
            </ul>
          </CollectionWrap>
        </CollectionContainer>
      </CollectionWrapper>
    </>
  )
}

export default CollectionSection
