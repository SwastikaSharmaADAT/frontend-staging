import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { FaStarOfLife } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import Label from '../../../components/UI/Label'
import Input from '../../../components/UI/Input'
import Button from '../../../components/UI/Button'
import { changePassword } from '../../../modules/myAccount/myAccountSlice'
import { getUserData } from '../../../modules/profile/myProfileSlice'

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
  button {
    max-width: 200px;
  }
  span {
    color: #d62d1e;
    font-size: 13px;
  }
`

const ChangePassword = () => {
  const { t } = useTranslation(['myaccount', 'successResponses', 'translation'])

  const dispatch = useDispatch()

  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(() => {
    setUserInfo(localStorage.getItem('user_info'))
  }, [])

  const userData = useSelector((state) => state.root.myProfile.userData)
  const initChange = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  }
  const initSet = {
    newPassword: '',
    confirmPassword: '',
  }
  const validationSchemaChange = Yup.object({
    oldPassword: Yup.string().required(t(`changePassword.validationErrors.currentPassword`)),
    newPassword: Yup.string()
      .required(t(`changePassword.validationErrors.newPassword`))
      .matches(/^(?=.*)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$/, t(`changePassword.validationErrors.passConditions`)),
    confirmPassword: Yup.string()
      .required(t(`changePassword.validationErrors.confirmPassword`))
      .test('', t(`changePassword.validationErrors.passNotMatch`), function (value) {
        if (!this.parent.newPassword) return true
        if (value === this.parent.newPassword) return true
      }),
  })
  const validationSchemaSet = Yup.object({
    newPassword: Yup.string()
      .required(t(`changePassword.validationErrors.newPassword`))
      .matches(/^(?=.*)(?=.*[a-z])(?=.*[0-9])(?=.*[A-Z]).{8,}$/, t(`changePassword.validationErrors.passConditions`)),
    confirmPassword: Yup.string()
      .required(t(`changePassword.validationErrors.confirmPassword`))
      .test('', t(`changePassword.validationErrors.passNotMatch`), function (value) {
        if (value === this.parent.newPassword) return true
      }),
  })
  return (
    <>
      {userData && (
        <Formik
          initialValues={userData.IsPassword ? initChange : initSet}
          validationSchema={userData.IsPassword ? validationSchemaChange : validationSchemaSet}
          onSubmit={async (values, { resetForm }) => {
            const resultAction = await dispatch(
              changePassword(userData.IsPassword ? { ...values, t: t } : { newPassword: values.newPassword, t: t })
            )
            const result = await unwrapResult(resultAction)
            if (result.success && loggedInUsername) {
              dispatch(getUserData(loggedInUsername, 'fetchData',t))
              resetForm({})
            }
          }}
        >
          {(formik) => (
            <Form>
              <CommonSection>
                <LeftDiv>
                  <IconWrap>
                    <FaStarOfLife />
                  </IconWrap>
                  <TabsName>
                    {userData.IsPassword ? t(`changePassword.changeTitle`) : t(`changePassword.setTitle`)}
                  </TabsName>
                </LeftDiv>
                {userData.IsPassword && (
                  <FormGroup>
                    <Label>{t(`changePassword.currentPassword`)}</Label>
                    <Input
                      type="password"
                      name="oldPassword"
                      value={formik.values.oldPassword}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <span>
                      <ErrorMessage name="oldPassword" />
                    </span>
                  </FormGroup>
                )}
                <FormGroup>
                  <Label>{t(`changePassword.newPassword`)}</Label>
                  <Input
                    type="password"
                    name="newPassword"
                    value={formik.values.newPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <span>
                    <ErrorMessage name="newPassword" />
                  </span>
                </FormGroup>
                <FormGroup>
                  <Label>{t(`changePassword.confirmPassword`)}</Label>
                  <Input
                    type="password"
                    name="confirmPassword"
                    value={formik.values.confirmPassword}
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                  />
                  <span>
                    <ErrorMessage name="confirmPassword" />
                  </span>
                </FormGroup>
                <FormGroup>
                  <Button type="submit">{t(`changePassword.updatePassword`)}</Button>
                </FormGroup>
              </CommonSection>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default ChangePassword
