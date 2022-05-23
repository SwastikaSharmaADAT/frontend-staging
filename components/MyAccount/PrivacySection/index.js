import React, { useEffect, useState } from 'react'
import { IoLockClosed } from 'react-icons/io5'
import { BsFillQuestionCircleFill } from 'react-icons/bs'
import { useDispatch, useSelector } from 'react-redux'
import { unwrapResult } from '@reduxjs/toolkit'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import Tooltip from '@material-ui/core/Tooltip'
import Label from '../../../components/UI/Label'
import Select from '../../../components/UI/Select'
import Button from '../../../components/UI/Button'
import Radio from '../../../components/UI/Radio'
import Input from '../../../components/UI/Input'
import ButtonBlue from '../../../components/UI/ButtonBlue'
import {
  getUserSettings,
  saveUserSettings,
  downloadUserData,
  deleteUserData,
} from '../../../modules/myAccount/myAccountSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { toggleLoading } from '../../../modules/auth/authSlice'
import {
  CommonSection,
  LeftDiv,
  IconWrap,
  TabsName,
  FormGroup,
  RadioDiv,
  RadioText,
  RadioWrap,
  BlockDiv,
} from './styled'
import {
  setAuthUserDetails,
  setCoverPhoto,
  setProfilePhoto,
  setUserData,
} from '../../../modules/profile/myProfileSlice'

const PrivacySection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['myaccount', 'successResponses', 'translation'])

  const [downloadPass, setDownloadPass] = useState('')
  const userData = useSelector((state) => state.root.myProfile.userData)
  const privacySettings = useSelector((state) => state.root.myAccount.privacySettings)
  const [oldPassword, setOldPassword] = useState('')

  /**get privacy settings on component mount */
  useEffect(() => {
    if (isEmptyObj(privacySettings)) {
      dispatch(getUserSettings())
    }
  }, [dispatch, privacySettings])
  const handlePasswordChange = (e) => {
    setOldPassword(e.target.value)
  }
  const deleteDataHandler = async (e) => {
    e.preventDefault()
    if (oldPassword) {
      await dispatch(toggleLoading(true))
      const resultAction = await dispatch(deleteUserData({ oldPassword, t }))
      const result = await unwrapResult(resultAction)
      if (result && result.success) {
        setOldPassword('')
        dispatch(setProfilePhoto(false))
        dispatch(setAuthUserDetails({ profilePicUrl: '' }))
        dispatch(setUserData({ ...userData, profilePicUrl: '', coverPicUrl: '' }))
        dispatch(setCoverPhoto(false))
      }
      await dispatch(toggleLoading(false))
    }
  }

  const initialValues = {
    showProfile: privacySettings && privacySettings.showProfile,
    activityWall: privacySettings && privacySettings.activityWall,
    privateMessage: privacySettings && privacySettings.privateMessage,
    hideDirectory: privacySettings && privacySettings.hideDirectory === true ? 'yes' : 'no',
    showOnlineStatus: privacySettings && privacySettings.showOnlineStatus === true ? 'yes' : 'no',
  }

  const { handleSubmit, handleChange, values } = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit(values) {
      const obj = {
        ...values,
        hideDirectory: values.hideDirectory === 'yes' ? true : false,
        showOnlineStatus: values.showOnlineStatus === 'yes' ? true : false,
      }
      dispatch(saveUserSettings(obj, t))
    },
  })

  const downloadDataHandler = async (e) => {
    e.preventDefault()
    if (downloadPass) {
      const response = await dispatch(downloadUserData(downloadPass, t))
      if (response === 'success') {
        setDownloadPass('')
      }
    }
  }

  return (
    <>
      <CommonSection>
        <LeftDiv>
          <IconWrap>
            <IoLockClosed />
          </IconWrap>
          <TabsName>{t(`privacy.title`)}</TabsName>
        </LeftDiv>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>
              {t(`privacy.profilePrivacy`)}
              <Tooltip
                arrow
                disableFocusListener
                enterTouchDelay={0}
                title={t(`myaccount:privacy.tooltips.tip1`)}
                placement="right-end"
              >
                <div className="QuestionTootip">
                  <BsFillQuestionCircleFill />
                </div>
              </Tooltip>
            </Label>
            <Select name="showProfile" onChange={handleChange} value={values.showProfile}>
              <option value="everyone">{t(`privacy.showProfileOptions.everyone`)}</option>
              <option value="onlyMe">{t(`privacy.showProfileOptions.onlyMe`)}</option>
              {userData.userRoleType === 'personal' && (
                <option value="following">{t(`privacy.showProfileOptions.following`)}</option>
              )}
              <option value="followers">{t(`privacy.showProfileOptions.followers`)}</option>
              {userData.userRoleType === 'personal' && (
                <option value="connections">{t(`privacy.showProfileOptions.connections`)}</option>
              )}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>
              {t(`privacy.hideProfile`)}
              <Tooltip
                arrow
                disableFocusListener
                enterTouchDelay={0}
                title={t(`myaccount:privacy.tooltips.tip2`)}
                placement="right-end"
              >
                <div className="QuestionTootip">
                  <BsFillQuestionCircleFill />
                </div>
              </Tooltip>
            </Label>
            <RadioWrap>
              <RadioDiv>
                <Radio
                  name="hideDirectory"
                  value={'yes'}
                  checked={values.hideDirectory === 'yes'}
                  onChange={handleChange}
                />
                <RadioText>{t(`privacy.yes`)}</RadioText>
              </RadioDiv>
              <RadioDiv>
                <Radio
                  name="hideDirectory"
                  value={'no'}
                  checked={values.hideDirectory === 'no'}
                  onChange={handleChange}
                />
                <RadioText>{t(`privacy.no`)}</RadioText>
              </RadioDiv>
            </RadioWrap>
          </FormGroup>
          <FormGroup>
            <Label>
              {t(`privacy.showOnlineStatus`)}
              <Tooltip
                arrow
                disableFocusListener
                enterTouchDelay={0}
                title={t(`myaccount:privacy.tooltips.tip3`)}
                placement="right-end"
              >
                <div className="QuestionTootip">
                  <BsFillQuestionCircleFill />
                </div>
              </Tooltip>
            </Label>
            <RadioWrap>
              <RadioDiv>
                <Radio
                  name="showOnlineStatus"
                  value={'yes'}
                  checked={values.showOnlineStatus === 'yes'}
                  onChange={handleChange}
                />
                <RadioText>{t(`privacy.yes`)}</RadioText>
              </RadioDiv>
              <RadioDiv>
                <Radio
                  name="showOnlineStatus"
                  value={'no'}
                  checked={values.showOnlineStatus === 'no'}
                  onChange={handleChange}
                />
                <RadioText>{t(`privacy.no`)}</RadioText>
              </RadioDiv>
            </RadioWrap>
          </FormGroup>
          <FormGroup>
            <Label>{t(`privacy.activityWall`)}</Label>
            <Select name="activityWall" onChange={handleChange} value={values.activityWall}>
              <option value="everyone">{t(`privacy.activityWallOptions.public`)}</option>
              <option value="onlyMe">{t(`privacy.activityWallOptions.onlyMe`)}</option>
              <option value="followers">{t(`privacy.activityWallOptions.followers`)}</option>
              {userData.userRoleType === 'personal' && (
                <option value="following">{t(`privacy.activityWallOptions.following`)}</option>
              )}
            </Select>
          </FormGroup>
          <FormGroup>
            <Label>{t(`privacy.privateMessage`)}</Label>
            <Select name="privateMessage" onChange={handleChange} value={values.privateMessage}>
              <option value="everyone">{t(`privacy.privateMessageOptions.everyone`)}</option>
              <option value="nobody">{t(`privacy.privateMessageOptions.nobody`)}</option>
              {userData.userRoleType === 'personal' && (
                <option value="following">{t(`privacy.privateMessageOptions.following`)}</option>
              )}
              <option value="followers">{t(`privacy.privateMessageOptions.followers`)}</option>
              {userData.userRoleType === 'personal' && (
                <option value="connections">{t(`privacy.privateMessageOptions.connections`)}</option>
              )}
            </Select>
          </FormGroup>
          {userData.userRoleType === 'personal' && (
            <FormGroup>
              <Label>
                {t(`privacy.downloadData`)}
                <Tooltip
                  arrow
                  disableFocusListener
                  enterTouchDelay={0}
                  title={t(`myaccount:privacy.tooltips.tip4`)}
                  placement="right-end"
                >
                  <div className="QuestionTootip">
                    <BsFillQuestionCircleFill />
                  </div>
                </Tooltip>
              </Label>
              <Label className="SecLabel">{t(`privacy.downloadDataDescription`)}</Label>
              <Input type="password" value={downloadPass} onChange={(e) => setDownloadPass(e.target.value)} />
              <BlockDiv>
                <ButtonBlue onClick={(e) => downloadDataHandler(e)} disabled={!downloadPass}>
                  {t(`privacy.downloadDataButton`)}
                </ButtonBlue>
                {!userData.IsPassword && userData.userRoleType === 'personal' && (
                  <p>*You need to set your password before downloading your data</p>
                )}
              </BlockDiv>
            </FormGroup>
          )}
          {userData.userRoleType === 'personal' && (
            <FormGroup>
              <Label>
                {t(`privacy.eraseData`)}
                <Tooltip
                  arrow
                  disableFocusListener
                  enterTouchDelay={0}
                  title={t(`myaccount:privacy.tooltips.tip5`)}
                  placement="right-end"
                >
                  <div className="QuestionTootip">
                    <BsFillQuestionCircleFill />
                  </div>
                </Tooltip>
              </Label>
              <Label className="SecLabel">{t(`privacy.eraseDataDescription`)}</Label>
              <Input value={oldPassword} type="password" onChange={handlePasswordChange} />
              <BlockDiv>
                <ButtonBlue disabled={!oldPassword} onClick={deleteDataHandler}>
                  {t(`myaccount:privacy.eraseDataButton`)}
                </ButtonBlue>
                {!userData.IsPassword && userData.userRoleType === 'personal' && (
                  <p>*You need to set your password before erasing the data</p>
                )}
              </BlockDiv>
            </FormGroup>
          )}
          <FormGroup>
            <Button type="submit">{t(`privacy.updatePrivacyButton`)}</Button>
          </FormGroup>
        </form>
      </CommonSection>
    </>
  )
}

export default PrivacySection
