import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import HeadingSection from '../BuzzListing/HeadingSection'
import { isEmptyObj } from '../../utilities/checkEmptyObject'
import { getUserData } from '../../modules/profile/myProfileSlice'
import { isLoginToken } from '../../utilities/authUtils'
import RightSection from '../NewsFeed/RightSection'
import SectionContent from './SectionContent'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'
import { capitalize } from 'lodash'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  align-items: flex-start;
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
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  margin-bottom: 30px;
  .blurred{
    // filter: blur(5px);
    // pointer-events: none;
    // -webkit-touch-callout: none; /* iOS Safari */
    // -webkit-user-select: none; /* Safari */
    // -khtml-user-select: none; /* Konqueror HTML */
    // -moz-user-select: none; /* Old versions of Firefox */
    // -ms-user-select: none; /* Internet Explorer/Edge */
    // user-select: none; /* Non-prefixed version, currently */
  }
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 625px;
  }
  @media (max-width: 991px) {
    margin-right: 0;
  }
`

const ArticleListing = ({ type }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation('translation')
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const userData = useSelector((state) => state.root.myProfile.userData)
  const [rightSection, setRightSection] = useState(false)
  const [blur,setBlur]=useState(false)

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  useEffect(() => {
    /**get user details on page render */
    if (
      loggedInUsername &&
      (isEmptyObj(userData) || (userData && userData.username !== loggedInUsername)) &&
      isLoginToken()
    )
      dispatch(getUserData(loggedInUsername, 'fetchData', t))
  }, [dispatch, loggedInUsername, userData])

  return (
    <>
      <Head>
        <title>{`${type && capitalize(type)} | ARTMO | The Art Network | Connecting The Art World`}</title>
        <meta
          name="description"
          content={
            'Art news and stories | Picture of the day | Find Exhibitions | Search for Galleries | See amazing Videos'
          }
        />
        <meta name="og:title" content={type + '| ARTMO | The Art Network | Connecting The Art World'} />
        <meta
          name="og:description"
          content={
            'Art news and stories | Picture of the day | Find Exhibitions | Search for Galleries | See amazing Videos'
          }
        />
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <HeadingSection requestType={type} />
            <SectionContent blur={blur} setBlur={setBlur} setRightSection={setRightSection} />
          </LeftContainer>

          {typeof window !== 'undefined' && (window.innerWidth > 1000 || rightSection) && <RightSection />}
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}
ArticleListing.propTypes = {
  type: PropTypes.string,
}
export default ArticleListing
