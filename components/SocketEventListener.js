import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { getUserData } from '../modules/profile/myProfileSlice'
import { useRouter } from 'next/router'
import { useTranslation } from 'next-i18next'

const SocketEventListener = (props) => {
  const dispatch = useDispatch()
  const {t} = useTranslation('translation')
  const { socketObj } = props
  const router = useRouter()
  const loggedInUserData = useSelector((state) => state.root.auth.loggedInUserData)
  const [userData, setUserData] = useState(null)

  useEffect(()=>{
    setUserData(localStorage.getItem('user_info'))
  },[])

  const pathname = router.pathname
  let urlUsername = ''
  if (pathname.includes('/user/')) {
    const strArray = pathname.split('/')
    urlUsername = strArray[2]
  }

  useEffect(() => {
    socketObj.on('connect', function () {
      const username =
        loggedInUserData && loggedInUserData.username ? loggedInUserData.username : userData&&JSON.parse(userData) && JSON.parse(userData).username
      if (username&&((pathname.includes('/user/') && urlUsername === username) || pathname === '/')) {
        dispatch(getUserData(username, 'fetchData',t))
      }
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, socketObj])

  return <></>
}

SocketEventListener.propTypes = {
  socketObj: PropTypes.object,
}

export default SocketEventListener
