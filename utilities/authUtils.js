import Router from 'next/router'
import { notifyError } from '../modules/profile/myProfileSlice'

/** @desc Is login token */
export const isLoginToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('auth_token') ? true : false
  }
  return false
}
  

/** @desc After successful logout api response*/
export const onLogout = async() => {
  localStorage.setItem('auth_token', '')
  localStorage.setItem('refresh_token', '')
  localStorage.setItem('user_info', '')
  localStorage.setItem('userCart', [])
  localStorage.setItem('detailedCart', [])
  localStorage.setItem('activeSubscription', '')
  Router.push('/')
  return true
}

/** @desc If token not found in local storage */
export const tokenNotFoundHandler = (t) => {
  notifyError(t(`errorResponses:auth.somethingWentWrong`))
  Router.push('/')
}
