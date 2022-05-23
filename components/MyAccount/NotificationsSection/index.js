import React, { useEffect } from 'react'
import { FaEnvelope } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form } from 'formik'
import { useTranslation } from 'next-i18next'
import Label from '../../../components/UI/Label'
import Button from '../../../components/UI/Button'
import Checkbox from '../../../components/UI/Checkbox'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

import { getNotificationSettings, updateNotificationSettings } from '../../../modules/myAccount/myAccountSlice'
import { CommonSection, LeftDiv, IconWrap, TabsName, FormGroup, RowWrap, InputHeading, InputText } from './styled'

const NotificationsSection = () => {
  const { t } = useTranslation(['myaccount','successResponses','translation'])

  const dispatch = useDispatch()
  /** fetch initial values from store */
  const settings = useSelector((state) => state.root.myAccount.notificationSettings)
  const userData = useSelector((state) => state.root.myProfile.userData)

  /**get current settings on component mount */
  useEffect(() => {
    if (isEmptyObj(settings)) dispatch(getNotificationSettings(t))
  }, [dispatch, settings])
  return (
    <>
      {settings && !isEmptyObj(settings) && (
        <Formik
          initialValues={{
            newFollowers: settings.newFollowers,
            newConnectionAdded: settings.newConnectionAdded,
            newConnectionRequest: settings.newConnectionRequest,
            groupPost: settings.groupPost,
            groupComments: settings.groupComments,
            privateMessage: settings.privateMessage,
            unreadMessage: settings.unreadMessage,
          }}
          onSubmit={(values) => {
            /** call the update settings API */
            dispatch(updateNotificationSettings({...values, t:t}))
          }}
        >
          {(formik) => (
            <Form>
              <CommonSection>
                <LeftDiv>
                  <IconWrap>
                    <FaEnvelope />
                  </IconWrap>
                  <TabsName>{t(`notifications.title`)}</TabsName>
                </LeftDiv>

                <FormGroup>
                  <Label>{t(`notifications.description`)}</Label>
                </FormGroup>
                <FormGroup>
                  <InputHeading>{t(`notifications.headings.followers`)}</InputHeading>
                  <RowWrap>
                    <Checkbox
                      name="newFollowers"
                      checked={formik.values.newFollowers}
                      onChange={(e) => formik.setFieldValue('newFollowers', e.target.checked)}
                    />
                    <InputText>{t(`notifications.checkboxLabels.newFollowers`)}</InputText>
                  </RowWrap>
                </FormGroup>
                {userData.userRoleType === 'personal' && (
                  <>
                    <FormGroup>
                      <InputHeading>{t(`notifications.headings.friends`)}</InputHeading>
                      <RowWrap>
                        <Checkbox
                          name="newConnectionAdded"
                          checked={formik.values.newConnectionAdded}
                          onChange={(e) => formik.setFieldValue('newConnectionAdded', e.target.checked)}
                        />
                        <InputText>{t(`notifications.checkboxLabels.newConnectionAdded`)}</InputText>
                      </RowWrap>
                      <RowWrap>
                        <Checkbox
                          name="newConnectionRequest"
                          checked={formik.values.newConnectionRequest}
                          onChange={(e) => formik.setFieldValue('newConnectionRequest', e.target.checked)}
                        />
                        <InputText>{t(`notifications.checkboxLabels.newConnectionRequest`)}</InputText>
                      </RowWrap>
                    </FormGroup>
                    <FormGroup>
                      <InputHeading>{t(`notifications.headings.posts`)}</InputHeading>
                      <RowWrap>
                        <Checkbox
                          name="groupPost"
                          checked={formik.values.groupPost}
                          onChange={(e) => formik.setFieldValue('groupPost', e.target.checked)}
                        />
                        <InputText>{t(`notifications.checkboxLabels.groupPost`)}</InputText>
                      </RowWrap>
                      <RowWrap>
                        <Checkbox
                          name="groupComments"
                          checked={formik.values.groupComments}
                          onChange={(e) => formik.setFieldValue('groupComments', e.target.checked)}
                        />
                        <InputText>{t(`notifications.checkboxLabels.groupComments`)}</InputText>
                      </RowWrap>
                    </FormGroup>
                  </>
                )}
                <FormGroup>
                  <InputHeading>{t(`notifications.headings.messages`)}</InputHeading>
                  <RowWrap>
                    <Checkbox
                      name="privateMessage"
                      checked={formik.values.privateMessage}
                      onChange={(e) => formik.setFieldValue('privateMessage', e.target.checked)}
                    />
                    <InputText>{t(`notifications.checkboxLabels.privateMessage`)}</InputText>
                  </RowWrap>
                  <RowWrap>
                    <Checkbox
                      name="unreadMessage"
                      checked={formik.values.unreadMessage}
                      onChange={(e) => formik.setFieldValue('unreadMessage', e.target.checked)}
                    />
                    <InputText>{t(`notifications.checkboxLabels.unreadMessage`)}</InputText>
                  </RowWrap>
                </FormGroup>

                <FormGroup>
                  <Button type="submit">{t(`notifications.updateNotifications`)}</Button>
                </FormGroup>
              </CommonSection>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default NotificationsSection
