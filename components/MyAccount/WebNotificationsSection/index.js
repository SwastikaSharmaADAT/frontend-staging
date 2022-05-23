import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFormik } from 'formik'
import { useTranslation } from 'next-i18next'
import { BsBellFill } from 'react-icons/bs'
import Label from '../../../components/UI/Label'
import Button from '../../../components/UI/Button'
import Checkbox from '../../../components/UI/Checkbox'
import { getWebNotificationSettings, updateWebNotificationSettings } from '../../../modules/myAccount/myAccountSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import { CommonSection, LeftDiv, IconWrap, TabsName, FormGroup, RowWrap, InputText } from './styled'

const WebNotificationsSection = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation('myaccount')

  const webSettings = useSelector((state) => state.root.myAccount.webNotificationSettings)
  const userData = useSelector((state) => state.root.myProfile.userData)

  /**get web notification settings on component mount */
  useEffect(() => {
    if (isEmptyObj(webSettings)) {
      dispatch(getWebNotificationSettings())
    }
  }, [dispatch, webSettings])

  const initialValues = {
    newReplies: webSettings && webSettings.newReplies,
    newComments: webSettings && webSettings.newComments,
    viewProfile: webSettings && webSettings.viewProfile,
    privateMessage: webSettings && webSettings.privateMessage,
    newFollower: webSettings && webSettings.newFollower,
    newConnection: webSettings && webSettings.newConnection,
    acceptConnection: webSettings && webSettings.acceptConnection,
    newLike: webSettings && webSettings.newLike,
    newMention: webSettings && webSettings.newMention,
    groupRequestApproved: webSettings && webSettings.groupRequestApproved,
    newGroupRequest: webSettings && webSettings.newGroupRequest,
    groupInvitation: webSettings && webSettings.groupInvitation,
    groupRole: webSettings && webSettings.groupRole,
    likeArtwork: webSettings && webSettings.likeArtwork,
  }

  const { handleSubmit, setFieldValue, values } = useFormik({
    enableReinitialize: true,
    initialValues,
    onSubmit(values) {
      dispatch(updateWebNotificationSettings(values, t))
    },
  })

  return (
    <>
      <CommonSection>
        <LeftDiv>
          <IconWrap>
            <BsBellFill />
          </IconWrap>
          <TabsName>{t(`webNotifications.title`)}</TabsName>
        </LeftDiv>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>{t(`webNotifications.description`)}</Label>
          </FormGroup>
          <FormGroup>
            <RowWrap>
              <Checkbox
                name="newReplies"
                checked={values.newReplies}
                onChange={(e) => setFieldValue('newReplies', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.newReplies`)}</InputText>
            </RowWrap>
            <RowWrap>
              <Checkbox
                name="newComments"
                checked={values.newComments}
                onChange={(e) => setFieldValue('newComments', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.newComments`)}</InputText>
            </RowWrap>
            <RowWrap>
              <Checkbox
                name="viewProfile"
                checked={values.viewProfile}
                onChange={(e) => setFieldValue('viewProfile', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.viewProfile`)}</InputText>
            </RowWrap>
            <RowWrap>
              <Checkbox
                name="privateMessage"
                checked={values.privateMessage}
                onChange={(e) => setFieldValue('privateMessage', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.privateMessage`)}</InputText>
            </RowWrap>
            <RowWrap>
              <Checkbox
                name="newFollower"
                checked={values.newFollower}
                onChange={(e) => setFieldValue('newFollower', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.newFollower`)}</InputText>
            </RowWrap>
            {userData.userRoleType === 'personal' && (
              <>
                <RowWrap>
                  <Checkbox
                    name="newConnection"
                    checked={values.newConnection}
                    onChange={(e) => setFieldValue('newConnection', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.newConnection`)}</InputText>
                </RowWrap>
                <RowWrap>
                  <Checkbox
                    name="acceptConnection"
                    checked={values.acceptConnection}
                    onChange={(e) => setFieldValue('acceptConnection', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.acceptConnection`)}</InputText>
                </RowWrap>
              </>
            )}
            <RowWrap>
              <Checkbox
                name="newLike"
                checked={values.newLike}
                onChange={(e) => setFieldValue('newLike', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.newLike`)}</InputText>
            </RowWrap>
            <RowWrap>
              <Checkbox
                name="newMention"
                checked={values.newMention}
                onChange={(e) => setFieldValue('newMention', e.target.checked)}
              />
              <InputText>{t(`webNotifications.checkboxLabels.newMention`)}</InputText>
            </RowWrap>
            {userData.userRoleType === 'personal' && (
              <>
                <RowWrap>
                  <Checkbox
                    name="groupRequestApproved"
                    checked={values.groupRequestApproved}
                    onChange={(e) => setFieldValue('groupRequestApproved', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.groupRequestApproved`)}</InputText>
                </RowWrap>
                <RowWrap>
                  <Checkbox
                    name="newGroupRequest"
                    checked={values.newGroupRequest}
                    onChange={(e) => setFieldValue('newGroupRequest', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.newGroupRequest`)}</InputText>
                </RowWrap>
                <RowWrap>
                  <Checkbox
                    name="groupInvitation"
                    checked={values.groupInvitation}
                    onChange={(e) => setFieldValue('groupInvitation', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.groupInvitation`)}</InputText>
                </RowWrap>
                <RowWrap>
                  <Checkbox
                    name="groupRole"
                    checked={values.groupRole}
                    onChange={(e) => setFieldValue('groupRole', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.groupRole`)}</InputText>
                </RowWrap>
                <RowWrap>
                  <Checkbox
                    name="likeArtwork"
                    checked={values.likeArtwork}
                    onChange={(e) => setFieldValue('likeArtwork', e.target.checked)}
                  />
                  <InputText>{t(`webNotifications.checkboxLabels.likeArtwork`)}</InputText>
                </RowWrap>
              </>
            )}
          </FormGroup>
          <FormGroup>
            <Button type="submit">{t(`webNotifications.updateSettingsButton`)}</Button>
          </FormGroup>
        </form>
      </CommonSection>
    </>
  )
}

export default WebNotificationsSection
