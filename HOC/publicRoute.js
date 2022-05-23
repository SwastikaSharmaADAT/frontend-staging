import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import {
  closeAllModals,
  setLoggedIn,
  setLoginError,
  setLoginPopup,
  setShowLoggedOutNoti,
} from '../modules/auth/authSlice'
import { notifyError } from '../modules/profile/myProfileSlice'
import { disconnectSocket } from '../modules/socket/socketSlice'
import { isLoginToken } from '../utilities/authUtils'
import { setReRenderLandingPage} from '../modules/profile/myProfileSlice'

function publicRoute(Child) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const params = router.query
    const { t } = useTranslation(['errorResponses','translation'])
    const notifyState = useSelector(
      (state) => state.root.auth.showLoggedOutNoti
    )

    useEffect(() => {
      if (isLoginToken()) {
        dispatch(setLoggedIn(true))
      } else {
        if (params.reason && params.reason === 'sessionExpired') {
          dispatch(closeAllModals())
          dispatch(setLoginError(null))
          dispatch(setLoginPopup(true))
          dispatch(disconnectSocket())
          localStorage.setItem('isUserActive', false)
          router.push({ pathname: '/', query: {} })
          dispatch(setReRenderLandingPage(true))
          notifyError(t(`auth.sessionExpired`))
        } else if (params.reason && params.reason === 'loggedOutUser') {
          if (notifyState) {
            dispatch(setShowLoggedOutNoti(false))
            notifyError(t(`auth.loginToContinue`))
          }
          router.push({ pathname: '/', query: {} })
        } else if (params.reason && params.reason === 'blockedByAdmin') {
          notifyError(
            t(`translation:auth.serverResponses.errors.blockedByAdmin`)
          )
          router.push({ pathname: '/', query: {} })
        }
        dispatch(setLoggedIn(false))
      }
    }, [params.reason])

    return <Child {...props}></Child>
  }
}

export default publicRoute
