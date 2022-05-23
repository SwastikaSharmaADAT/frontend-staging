import axios from 'axios'
import Router from 'next/router'
import { onLogout, isLoginToken } from './authUtils'
(async () => {
   /** Handle request data */
  axios.interceptors.request.use(
    (config) => {
      config.headers['Refresh-Token'] = localStorage.getItem('refresh_token')
      return config;
    },
    (error) => {
      return Promise.reject(error);
    });

    
  /** Handle response data */
  axios.interceptors.response.use(
    function (response) {
      if(response.status && response.status === 200 && response.data  && response.data.success) {
        if(response.data.data && response.data.data.refreshToken) {
          localStorage.setItem('refresh_token',response.data.data.refreshToken)
        }
        if(response.data.accessToken) {
          localStorage.setItem('auth_token',response.data.data && response.data.data.token ? response.data.data.token :
          response.data.accessToken)
        }
      }
      return response
    },
    function (error) {
      if (error.response) {
        /** Logout if any case authorization */
        const { status, data } = error.response
        if ((status === 401 || status === 403) && data.messageCode !== 'blockedByAdmin') {         
          if (isLoginToken()) {
            onLogout()
            Router.push({
              pathname: '/',
              query: { reason: 'sessionExpired' },
            })
          } else {
            /** Don't add any notifyError here as that will trigger multiple toasts on session expire */
            Router.reload('/')
          }
        } else if (status === 403 && data.messageCode === 'blockedByAdmin' && isLoginToken()) {
          onLogout()
          Router.push({
            pathname: '/',
            query: { reason: 'blockedByAdmin' },
          })
          // Router.push('/')
        }
      }
      /** Response error */
      return Promise.reject(error)
    }
  )
})()
