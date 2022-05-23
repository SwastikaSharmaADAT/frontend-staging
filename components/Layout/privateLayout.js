import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { seti18n, setRedirectToProfile } from '../../modules/auth/authSlice'
import { connectSocket } from '../../modules/socket/socketSlice'
import Footer from '../Footer'
import Header from '../Header'
import { Container } from './style'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const TopContentBar = styled.div`
  width: 100%;
  flex: 1 0 auto;
`

const PrivateLayout = ({ children }) => {
  const router = useRouter()
  const dispatch = useDispatch()
  const { i18n } = useTranslation()
  const loggedInUserData = useSelector(
    (state) => state.root.auth.loggedInUserData
  )
  const redirectToProfile = useSelector(
    (state) => state.root.auth.redirectToProfile
  )
  const [userData, setUserData] = useState(null)

  const userDataState = useSelector((state) => state.root.myProfile.userData)
  const loggedIn = useSelector((state) => state.root.auth.loggedIn)
  const [isUserActive, setIsUserActive] = useState(null)
  const [connectSocketAgain, setConnectSocketAgain] = useState(false)

  const currRoute = router.asPath

  useEffect(() => {
    dispatch(seti18n(i18n))
  }, [i18n])

  useEffect(() => {
    setUserData(localStorage.getItem('user_info'))
    setIsUserActive(localStorage.getItem('isUserActive'))
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('beforeunload', setPageStatus)
      const pageStatus = localStorage.getItem('pageRefresh')
      if (pageStatus === 'true' && !connectSocketAgain) {
        setConnectSocketAgain(true)
        localStorage.setItem('pageRefresh', false)
      }
      return () => {
        setPageStatus()
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const setPageStatus = () => {
    localStorage.setItem('pageRefresh', true)
  }

  useEffect(() => {
    if (isUserActive === 'true' && loggedIn && connectSocketAgain) {
      dispatch(connectSocket())
      setConnectSocketAgain(false)
    }
  }, [
    isUserActive,
    loggedIn,
    userDataState.isActive,
    connectSocketAgain,
    dispatch,
  ])

  useEffect(() => {
    if (redirectToProfile.render) {
      const username =
        loggedInUserData && loggedInUserData.username
          ? loggedInUserData.username
          : JSON.parse(userData).username
      dispatch(setRedirectToProfile(false))
      if ( redirectToProfile.next === 'landing'){
        return router.push( `${currRoute}` )
      } else {
        return router.push(`/user/${username}`)
      }
      
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [redirectToProfile.render, dispatch, router])

  const hideHeaderFooter = router.pathname.includes('profile-embed')

  return (
    <>
      <TopContentBar>
        {!hideHeaderFooter && <Header />}
        <Container hideHeaderFooter={hideHeaderFooter}>{children}</Container>
      </TopContentBar>
      {!hideHeaderFooter && <Footer />}
    </>
  )
}

PrivateLayout.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
}

export default PrivateLayout
