//static file, confirm deletion

import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { IoIosSquare } from 'react-icons/io'
import Input from '../../../UI/Input'
import Textarea from '../../../UI/Textarea'
import Radio from '../../../UI/Radio'
import Checkbox from '../../../UI/Checkbox'
import Select from '../../../UI/Select'
import Button from '../../../UI/Button'
import { useSelector } from 'react-redux'


const GroupFormWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
`
const FormContainer = styled.div`
  margin: 0 0 15px;
  display: flex;
  flex-direction: column;
`
const LabelText = styled.label`
  margin: 0 0 5px;
  color: #848484;
  font-size: 16px;
  &.rtl-ar-content {
    direction: rtl;
  }
`
const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
`
const PrivacyContent = styled.div`
  margin: 0 0 15px;
  padding: 5px 0px 0 40px;
  @media (max-width: 767px) {
    padding: 5px 0px 0 15px;
  }
  ul {
    list-style: none;
    margin: 0 0 0 55px;
    padding: 0;
    @media (max-width: 767px) {
      margin: 0;
    }
    li {
      margin: 0;
      padding: 0;
      display: flex;
      align-items: center;
      color: #848484;
      font-size: 16px;
      @media (max-width: 767px) {
        align-items: flex-start;
        font-size: 14px;
      }
      svg {
        color: #848484;
        font-size: 9px;
        margin: 0 10px 0 0;
        width: 15px;
        @media (max-width: 767px) {
          margin: 3px 10px 0 0;
          width: 15px;
          max-width: 9px;
        }
      }
    }
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

const UpdateGroupForm = (props) => {
  const { handleSubmit, handleChange, values, errors, touched, handleBlur } = props

  const { t } = useTranslation(['translation','groups'])
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <GroupFormWrapper>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('groups.labels.title')}</LabelText>
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder={t('groups.labels.name')}
              placeholderColor="#aaa"
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <ErrorText>{t(`groups.validationErrors.${errors.title}`, { field: 'Name', length: 200 })}</ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('groups.labels.description')}</LabelText>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder={t('groups.labels.description')}
              placeholderColor="#aaa"
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <ErrorText>
                {t(`groups.validationErrors.${errors.description}`, { field: 'Description', length: 1000 })}
              </ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('groups:createGroup.privacyTitle')}</LabelText>
            <PrivacyContent className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <Radio
                name="privacy"
                labelName="Public"
                onChange={handleChange}
                value={'public'}
                checked={values.privacy === 'public'}
              />
              <ul>
                <li>
                  <IoIosSquare />{t('groups:createGroup.privacyPublicContent.point1')}
                </li>
                <li>
                  <IoIosSquare />
                  {t('groups:createGroup.privacyPublicContent.point2')}
                </li>
                <li>
                  <IoIosSquare />
                  {t('groups:createGroup.privacyPublicContent.point3')}
                </li>
              </ul>
            </PrivacyContent>
            <PrivacyContent className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <Radio
                name="privacy"
                labelName="Private"
                value={'private'}
                checked={values.privacy === 'private'}
                onChange={handleChange}
              />
              <ul>
                <li>
                  <IoIosSquare /> {t('groups:createGroup.privacyPrivateContent.point1')}
                </li>
                <li>
                  <IoIosSquare />
                  {t('groups:createGroup.privacyPrivateContent.point2')}
                </li>
                <li>
                  <IoIosSquare />
                  {t('groups:createGroup.privacyPrivateContent.point3')}
                </li>
              </ul>
            </PrivacyContent>
            <PrivacyContent className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
              <Radio
                name="privacy"
                labelName="Hidden"
                value={'hidden'}
                checked={values.privacy === 'hidden'}
                onChange={handleChange}
              />
              <ul>
                <li>
                  <IoIosSquare />{t('groups:createGroup.privacyHiddenContent.point1')}
                </li>
                <li>
                  <IoIosSquare />
                  {t('groups:createGroup.privacyHiddenContent.point1')}
                </li>
                <li>
                  <IoIosSquare />
                  {t('groups:createGroup.privacyHiddenContent.point1')}
                </li>
              </ul>
            </PrivacyContent>
            {errors.privacy && (
              <ErrorText>{t(`groups.validationErrors.${errors.privacy}`, { field: 'Privacy' })}</ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('groups:createGroup.postModeration')}</LabelText>
            <Select name="postModeration" value={values.postModeration} onChange={handleChange}>
              <option value="" disabled>
              {t('groups:createGroup.moderationTypes.option1')}
              </option>
              <option value="autoPublished"> {t('groups:createGroup.moderationTypes.option2')}</option>
              <option value="publishedUponReview"> {t('groups:createGroup.moderationTypes.option3')}</option>
            </Select>
            {errors.postModeration && (
              <ErrorText>
                {t(`groups.validationErrors.${errors.postModeration}`, { field: 'Post Moderation', length: 1000 })}
              </ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <Checkbox
              name="inviteFeature"
              checked={values.inviteFeature}
              onChange={handleChange}
              labelName="Enable Invites feature"
            />
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}> {t('groups:createGroup.whoCanInvite')}</LabelText>
            <Select name="invitationType" value={values.invitationType} onChange={handleChange}>
              <option value="" disabled>
              {t('groups:createGroup.inviteOptions.option1')}
              </option>
              <option value="admin">{t('groups:createGroup.inviteOptions.option2')}</option>
              <option value="adminModerators">{t('groups:createGroup.inviteOptions.option3')}</option>
              <option value="everyone">{t('groups:createGroup.inviteOptions.option4')}</option>
            </Select>
            {errors.invitationType && (
              <ErrorText>
                {t(`groups.validationErrors.${errors.invitationType}`, { field: 'Invitation Type' })}
              </ErrorText>
            )}
          </FormContainer>
          <Button>{t('groups:createGroup.update')}</Button>
        </form>
      </GroupFormWrapper>
    </>
  )
}

UpdateGroupForm.propTypes = {
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  isValid: PropTypes.bool,
}

export default UpdateGroupForm
