import React from 'react'
import styled from 'styled-components'
import { FaSignInAlt } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import Label from '../../../components/UI/Label'
import FacebookButton from '../../../components/UI/FacebookButton'
import LinkedinButton from '../../UI/LinkedinButton'
import { disconnectSocialAccount } from '../../../modules/myAccount/myAccountSlice'
import { disconnectSocial } from '../../../modules/profile/myProfileSlice'

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
    :placeholder {
      color: #666;
    }
    :disabled {
      color: #8a8a8a;
    }
  }
`
const ButtonSideDiv = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 15px;
  width: 100%;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  .PaddingRight {
    padding-right: 15px;
    @media (max-width: 991px) {
      padding-right: 0px;
    }
  }
  .PaddingLeft {
    padding-left: 15px;
    @media (max-width: 991px) {
      padding-left: 0px;
    }
  }
`

const SocialConnect = () => {
  const { t } = useTranslation('myaccount')
  const dispatch = useDispatch()
  const userData = useSelector((state) => state.root.myProfile.userData)
  /**
   * method to disconnect social media
   * @param {string} type ('facebook','linkedIm')
   */
  const disconnectHandler = async (type) => {
    /**call the thunk to update settings */
    const resultAction = await dispatch(disconnectSocialAccount({data:type, t:t}))
    const result = await unwrapResult(resultAction)
    /**if success, update state */
    if (result.success) dispatch(disconnectSocial(type))
  }
  return (
    <>
      <CommonSection>
        <LeftDiv>
          <IconWrap>
            <FaSignInAlt />
          </IconWrap>
          <TabsName>{t(`socialConnect.title`)}</TabsName>
        </LeftDiv>
        {userData && userData.viaFacebook === 'false' && userData.viaLinkedIn === 'false' ? (
          <>{t(`socialConnect.notConnected`)}</>
        ) : (
          <ButtonSideDiv>
            {userData && userData.viaFacebook === 'true' && (
              <FormGroup className="PaddingRight">
                <Label>{t(`socialConnect.disconnectFacebook`)}</Label>
                <FacebookButton onClick={() => disconnectHandler('facebook')} />
              </FormGroup>
            )}
            {userData && userData.viaLinkedIn === 'true' && (
              <FormGroup className="PaddingLeft">
                <Label>{t(`socialConnect.disconnectLinkedin`)}</Label>
                <LinkedinButton onClick={() => disconnectHandler('linkedIn')} />
              </FormGroup>
            )}
          </ButtonSideDiv>
        )}
        {!userData.IsPassword && <p>{t(`socialConnect.passwordWarning`)}</p>}
      </CommonSection>
    </>
  )
}

export default SocialConnect
