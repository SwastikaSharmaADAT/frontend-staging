import React from 'react'
import styled from 'styled-components'
import { FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Formik, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { useTranslation } from 'next-i18next'
import Label from '../../../components/UI/Label'
import Input from '../../../components/UI/Input'
import Button from '../../../components/UI/Button'
import { editProfile } from '../../../modules/profile/myProfileSlice'

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
    margin-top: 5px;
  }
`

const AccountSection = () => {
  const { t } = useTranslation(['myaccount', 'successResponses', 'translation'])

  const dispatch = useDispatch()
  const userData = useSelector((state) => state.root.myProfile.userData)

  const initPersonal = {
    firstName: userData.firstName ? userData.firstName : '',
    lastName: userData.lastName ? userData.lastName : '',
  }
  const initPage = {
    pagename: userData.firstName ? userData.firstName : '',
  }
  const validationSchemaPersonal = Yup.object({
    firstName: Yup.string()
      .required(t(`account.validationErrors.firstname`))
      .max(50, t(`account.validationErrors.firstnameLength`)),
    lastName: Yup.string()
      .required(t(`account.validationErrors.lastname`))
      .max(50, t(`account.validationErrors.lastnameLength`)),
  })
  const validationSchemaPage = Yup.object({
    pagename: Yup.string()
      .required(t(`account.validationErrors.pagename`))
      .max(50, t(`account.validationErrors.pagenameLength`)),
  })
  return (
    <>
      {userData && (
        <Formik
          enableReinitialize
          initialValues={userData.userRoleType === 'personal' ? initPersonal : initPage}
          validationSchema={userData.userRoleType === 'personal' ? validationSchemaPersonal : validationSchemaPage}
          onSubmit={(values) => {
            const type = 'head'
            const aboutImages = userData.aboutMe && userData.aboutMe.images ? userData.aboutMe.images : []
            const data = {
              ...values,
              bio: userData.bio,
              profileSwitchTo: userData.userRoleType === 'page' ? '' : userData.userRole,
              aboutMe: userData.aboutMe && userData.aboutMe.description ? userData.aboutMe.description : '',
              images: aboutImages,
              biography: userData.biography && userData.biography.description ? userData.biography.description : '',
              biographyImages: userData.biography && userData.biography.images ? userData.biography.images : [],
            }
            if (userData.userRoleType !== 'personal') {
              data.firstName = data.pagename
              delete data.pagename
            }
            dispatch(editProfile({ section: 'others', sectionData: data }, type, '', '', '', t))
          }}
        >
          {(formik) => (
            <Form>
              <CommonSection>
                <LeftDiv>
                  <IconWrap>
                    <FaUser />
                  </IconWrap>
                  <TabsName>{t(`account.title`)}</TabsName>
                </LeftDiv>
                <FormGroup>
                  <Label>{t(`account.username`)}</Label>
                  <Input value={userData.username} disabled />
                </FormGroup>
                {userData.userRoleType === 'personal' ? (
                  <>
                    <FormGroup>
                      <Label>{t(`account.firstname`)}</Label>
                      <Input
                        name="firstName"
                        value={formik.values.firstName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <span>
                        <ErrorMessage name="firstName" />
                      </span>
                    </FormGroup>
                    <FormGroup>
                      <Label>{t(`account.lastname`)}</Label>
                      <Input
                        name="lastName"
                        value={formik.values.lastName}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                      />
                      <span>
                        <ErrorMessage name="lastName" />
                      </span>
                    </FormGroup>
                  </>
                ) : (
                  <FormGroup>
                    <Label>{t(`account.pagename`)}</Label>
                    <Input
                      name="pagename"
                      value={formik.values.pagename}
                      onBlur={formik.handleBlur}
                      onChange={formik.handleChange}
                    />
                    <span>
                      <ErrorMessage name="pagename" />
                    </span>
                  </FormGroup>
                )}
                <FormGroup>
                  <Label>{t(`account.email`)}</Label>
                  <Input value={userData && userData.email && userData.email.value} disabled />
                </FormGroup>
                <FormGroup>
                  <Button type="submit">{t(`account.updateAccount`)}</Button>
                </FormGroup>
              </CommonSection>
            </Form>
          )}
        </Formik>
      )}
    </>
  )
}

export default AccountSection
