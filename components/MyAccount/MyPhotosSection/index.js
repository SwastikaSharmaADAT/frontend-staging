import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaRegImage } from 'react-icons/fa'
import { useDispatch } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import ModalComponent from '../../UI/Modal/index'
import { useTranslation } from 'next-i18next'
import Label from '../../../components/UI/Label'
import { downloadUserPhotos } from '../../../modules/myAccount/myAccountSlice'
import Button from '../../../components/UI/Button'
import ButtonRed from '../../../components/UI/ButtonRed'
import { toggleLoading } from '../../../modules/auth/authSlice'
import { deleteUserData } from '../../../modules/myAccount/myAccountSlice'
import ConfirmBox from '../../UI/ConfirmBox'
import { getUserData, setAuthUserDetails, setCoverPhoto, setProfilePhoto } from '../../../modules/profile/myProfileSlice'


const CommonSection = styled.div`
  width: 100%;
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
  .download-warning {
    color: #d62d1e;
    font-style: normal;
    font-size: 14px;
  }
`
const ButtonSideDiv = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 0 15px;
  width: 100%;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  button {
    margin-top: 0;
    &.BgBlack {
      background: #000;
    }
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

const MyPhotosSection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['myaccount', 'successResponses', 'translation'])

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  const downloadPicsHandler = (e) => {
    e.preventDefault()
    dispatch(downloadUserPhotos(t))
  }
  const [confirmModal, setConfirmModal] = useState(false)

  const deleteDataHandler = async (e) => {
    e.preventDefault()
    await dispatch(toggleLoading(true))
    const resultAction = await dispatch(deleteUserData({ oldPassword: '', type: 'photos',t }))
    const result = await unwrapResult(resultAction)
    if (result && result.success) {
      dispatch(getUserData(loggedInUsername, 'fetchData',t))
      dispatch(setProfilePhoto(false))
      dispatch(setAuthUserDetails({ profilePicUrl: '' }))
      dispatch(setCoverPhoto(false))
      setConfirmModal(false)}
    await dispatch(toggleLoading(false))
  }
  const modalHandler = () => {
    setConfirmModal(true)
  }

  return (
    <> <ModalComponent closeOnOutsideClick={true} isOpen={confirmModal} closeModal={() => setConfirmModal(false)}>
      <ConfirmBox
        open={confirmModal}
        closeModal={() => setConfirmModal('')}
        deleteHandler={deleteDataHandler}
        confirmButtonText={t(`myPhotos.buttonDelete`)}
        heading={t(`myPhotos.imagesWarning`)}
      ></ConfirmBox>
    </ModalComponent>

    <CommonSection>
      <LeftDiv>
        <IconWrap>
          <FaRegImage />
        </IconWrap>
        <TabsName>{t(`myPhotos.title`)}</TabsName>
      </LeftDiv>
      <Label>{t(`myPhotos.warningText`)}</Label>
      <ButtonSideDiv>
        <FormGroup className="PaddingRight">
          <Button className="BgBlack" onClick={(e) => downloadPicsHandler(e)}>
            {t(`myPhotos.button1`)}
          </Button>
          <p className="download-warning">{t(`myPhotos.downloadWarning`)}</p>
        </FormGroup>
        <FormGroup className="PaddingLeft">
          <ButtonRed onClick={modalHandler}>{t(`myaccount:myPhotos.button2`)}</ButtonRed>
        </FormGroup>
      </ButtonSideDiv>
    </CommonSection>
    </>
  )
}

export default MyPhotosSection
