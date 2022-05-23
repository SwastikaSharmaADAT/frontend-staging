import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useTranslation } from 'next-i18next'
import { isLoginToken } from '../../../utilities/authUtils'
import { useSelector } from 'react-redux'
import { setSortUsingDay } from '../../../utilities/artworkSort'

const SidebarUl = styled.div`
  font-weight: 400;
  margin: 0px;
  padding: 0;
  /* color: #fff; */
  color: black;
  font-size: 14px;
  line-height: normal;
  ul {
    margin: 20px;
    padding: 0;
    display: flex;
    flex-direction: column;
    @media (max-width: 767px) {
      margin: 10px 20px 20px 20px;
    }
    li {
      margin: 8px 0;
      padding: 0;
      list-style: none;
      a {
        color: #fff;
        font-size: 18px;
        line-height: normal;
        cursor: pointer;
        @media (max-width: 767px) {
          font-size: 16px;
        }
      }
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
  .SideBar .MuiPaper-root {
    background: #222;
    padding: 0px;
    max-width: 300px;
    width: 100%;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
  }
`

const SidebarMenu = ({ redirectToPage, handleUserTypeRedirection, userDataState, signupModalOpen }) => {
  const { t } = useTranslation('sidebar')
  const [userInfo, setUserInfo] = useState(null)
  const accountType = userInfo && JSON.parse(userInfo).accountType
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const [ artworkSort, setArtworkSort ] = useState('random')

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect( () => {
   setArtworkSort( setSortUsingDay() ) 
  }, [])

  return (
    <>
      <SidebarUl className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <ul>
          <li onClick={() => redirectToPage('/artworks?page="artworks"&sort="'+artworkSort+'"') } >
            <a>{t(`artwork`)}</a>
          </li>
          <li onClick={() => redirectToPage('/articles')}>
            <a>{t(`buzz`)}</a>
          </li>
          <li onClick={() => handleUserTypeRedirection('/users', '')}>
            <a>{t(`user`)}</a>
          </li>
          <li onClick={() => handleUserTypeRedirection('/users?userType=artist', 'artist')}>
            <a>{t(`artists`)}</a>
          </li>
          <li onClick={() => handleUserTypeRedirection('/users?userType=gallery', 'gallery')}>
            <a>{t(`galleries`)}</a>
          </li>
          <li onClick={() => handleUserTypeRedirection('/users?userType=museum', 'museum')}>
            <a>{t(`museums`)}</a>
          </li>
          <li onClick={() => handleUserTypeRedirection('/users?userType=company', 'company')}>
            <a>{t(`companies`)}</a>
          </li>
          <li onClick={() => handleUserTypeRedirection('/users?userType=university', 'university')}>
            <a>{t(`universities`)}</a>
          </li>
          <li onClick={() => redirectToPage('/exhibition')}>
            <a>{t(`exhibitions`)}</a>
          </li>
          <li onClick={() => redirectToPage('/genres')}>
            <a>{t(`genres`)}</a>
          </li>
          {!isLoginToken() && (
            <li onClick={()=> signupModalOpen()}>
              <a>{t(`groups`)}</a>
            </li>
          )}
          <li onClick={() => redirectToPage('/potd')}>
            <a>{t(`potd`)}</a>
          </li>
          <li onClick={() => redirectToPage('/videos')}>
            <a>{t(`videos`)}</a>
          </li>
        </ul>
      </SidebarUl>
    </>
  )
}

SidebarMenu.propTypes = {
  redirectToPage: PropTypes.func,
  handleUserTypeRedirection: PropTypes.func,
  userDataState: PropTypes.object,
  signupModalOpen: PropTypes.func
}

export default SidebarMenu
