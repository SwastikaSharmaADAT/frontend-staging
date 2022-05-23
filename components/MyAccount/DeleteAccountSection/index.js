import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { RiDeleteBin6Line } from 'react-icons/ri'
import { AiOutlineCreditCard } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import Label from '../../../components/UI/Label'
import Input from '../../../components/UI/Input'
import Button from '../../../components/UI/Button'
import { reset, toggleLoading } from '../../../modules/auth/authSlice'
import { deleteUserData } from '../../../modules/myAccount/myAccountSlice'
import { disconnectSocket } from '../../../modules/socket/socketSlice'
import { notifySuccess } from '../../../modules/profile/myProfileSlice'
import { onLogout } from '../../../utilities/authUtils'
import { useRouter } from 'next/router'
import ReactHtmlParser from 'react-html-parser'


const CommonSection = styled.div`
  width: 100%;
  p {
    color: orange;
    font-size: 14px;
  }
`
const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 22px;
    color: #666;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
`
const LeftDiv = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  margin: 0 0 15px;
`
const TabsName = styled.div`
  padding-left: 10px;
  line-height: 28px;
  font-size: 18px;
  color: #666;
  font-weight: 600;
`
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 15px;
  width: 100%;
  input {
    color: #000;
    width: 100%;
    box-sizing: border-box;
    :placeholder {
      color: #666;
    }
    :disabled {
      color: #8a8a8a;
    }
  }
  button {
    max-width: 200px;
  }
`

const DeleteAccountSection = () => {
  const { t } = useTranslation(['myaccount','translation','successResponses'])
  const dispatch = useDispatch()
  const router = useRouter()

  const [oldPassword, setOldPassword] = useState('')
  const [ userSubscriptionType, setUserSubscriptionType ] = useState( false ) 
  const userData = useSelector((state) => state.root.myProfile.userData)

  useEffect( () => {
      if ( userData.userRole === 'artist' && userData.subscription ) {
        if ( userData.subscription.title === "plus" || userData.subscription.title === "pro" ) {
          setUserSubscriptionType( true )  
        }
      } else if ( userData.userRole === 'member' && userData.subscription ) {
        if ( userData.subscription.title === "pro" ) {
          setUserSubscriptionType( true )  
        }
      }
  }, [userData])

  const handlePasswordChange = (e) => {
    setOldPassword(e.target.value)
  }
  const deleteDataHandler = async (e) => {
    e.preventDefault()
    if (oldPassword) {
      await dispatch(toggleLoading(true))
      const resultAction = await dispatch(deleteUserData({ oldPassword, type: 'userDelete',t }))
      const result = await unwrapResult(resultAction)
      if (result && result.success) {
        setOldPassword('')
        dispatch(disconnectSocket())
        localStorage.setItem('isUserActive', false)
        notifySuccess(t(`successResponses:auth.signOutMessage`))
        dispatch(reset())
        onLogout()
      }
      await dispatch(toggleLoading(false))
    }
  }
  const redirectToSubscriptionHandler = () => {
    router.push('/vendor-settings?page=subscription')
  }
  return (
    <>
      <CommonSection>
        { userSubscriptionType && (
          <>
          <LeftDiv>
          <IconWrap>
            <AiOutlineCreditCard/>
          </IconWrap>
          <TabsName>{t(`deleteAccount.managePaymentsTitle`)}</TabsName>
        </LeftDiv>
        <Label className="mngPaymentSec">{ ReactHtmlParser(t(`deleteAccount.managePaymentsText`))}<br/>{t(`deleteAccount.managePaymentsText2`)} "{t(`deleteAccount.managePaymentsQuoteText`)}"</Label>
        <FormGroup>
          <Button className="widFull" onClick={redirectToSubscriptionHandler}>
          {t(`deleteAccount.managePaymentsButtonText`)}
          </Button>
        </FormGroup>
        </>
        )}
        
        <LeftDiv>
          <IconWrap>
            <RiDeleteBin6Line />
          </IconWrap>
          <TabsName>{t(`deleteAccount.title`)}</TabsName>
        </LeftDiv>
        <Label>{t(`deleteAccount.warningText`)}</Label>
        <FormGroup>
          <Label>
            {t(`deleteAccount.password`)} <span>*</span>
          </Label>
          <form autocomplete="off">
          <Input value={oldPassword} type="password" autocomplete="no" onChange={handlePasswordChange} />
          </form>
        </FormGroup>
        <FormGroup>
          <Button disabled={!oldPassword} onClick={deleteDataHandler}>
            {t(`myaccount:deleteAccount.title`)}
          </Button>
          {!userData.IsPassword && <p>{t(`deleteAccount.passwordWarning`)}</p>}
        </FormGroup>
      </CommonSection>
    </>
  )
}

export default DeleteAccountSection
