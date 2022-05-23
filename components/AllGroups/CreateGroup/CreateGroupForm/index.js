import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { IoIosSquare } from 'react-icons/io'
import ReactSelect from 'react-select'
import Input from '../../../UI/Input'
import Textarea from '../../../UI/Textarea'
import Radio from '../../../UI/Radio'
import Checkbox from '../../../UI/Checkbox'
import Select from '../../../UI/Select'
import Button from '../../../UI/Button'
import { customMultiSelectStyles } from '../../../UI/shared/styles'
import useTranslateArray from '../../../../hooks/useTranslateArray'
import { useSelector } from 'react-redux'

const GroupFormWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 30px;
  display: flex;
  flex-direction: column;
  @media (max-width: 767px) {
    padding: 15px;
  }
`
const FormContainer = styled.div`
  margin: 0 0 15px;
  display: flex;
  flex-direction: column;
  &.CustomWidth {
    max-width: 200px;
  }
  .RadioWrapText {
    .InnerText {
      max-width: 85px;
    }
  }
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

const CreateGroupForm = (props) => {
  const {
    groupTags,
    groupCategories,
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    setFieldValue,
    touched,
  } = props

  const { t } = useTranslation(['groups','translation'])
  const tags = groupTags.map((o) => ({ value: o._id, label: o.title }))
  const categories = groupCategories.map((o) => ({ value: o._id, label: o.title }))
  const [tagsArr, translateTagsArr] = useTranslateArray(tags, 'label')
  const [categoryArr, translateCategoryArr] = useTranslateArray(categories, 'label')
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  useEffect(() => {
    translateTagsArr(tags, 'label')
    translateCategoryArr(categories, 'label')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories.length, tags.length, translateCategoryArr, translateTagsArr])
  return (
    <>
      <GroupFormWrapper>
        <form onSubmit={handleSubmit}>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('createGroup.placeholderName')}</LabelText>
            <Input
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder={t(`createGroup.placeholderName`)}
              placeholderColor="#aaa"
              onBlur={handleBlur}
            />
            {errors.title && touched.title && (
              <ErrorText>{t(`translation:groups.validationErrors.${errors.title}`, { field: 'Name', length: 200 })}</ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t('createGroup.placeholderDescription')}</LabelText>
            <Textarea
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder={t(`createGroup.placeholderDescription`)}
              placeholderColor="#aaa"
              onBlur={handleBlur}
            />
            {errors.description && touched.description && (
              <ErrorText>
                {t(`translation:groups.validationErrors.${errors.description}`, { field: 'Description', length: 1000 })}
              </ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`createGroup.privacyTitle`)}</LabelText>
            <PrivacyContent className={appLanguageCode === 'ar' ? 'rtl-ar-content RadioWrapText' : 'RadioWrapText'}>
              <Radio
                name="privacy"
                labelName={t(`createGroup.privacyPublic`)}
                onChange={handleChange}
                value={'public'}
                checked={values.privacy === 'public'}
              />
              <ul>
                <li>
                  <IoIosSquare /> {t(`createGroup.privacyPublicContent.point1`)}
                </li>
                <li>
                  <IoIosSquare />
                  {t(`createGroup.privacyPublicContent.point2`)}
                </li>
                <li>
                  <IoIosSquare />
                  {t(`createGroup.privacyPublicContent.point2`)}
                </li>
              </ul>
            </PrivacyContent>
            <PrivacyContent className={appLanguageCode === 'ar' ? 'rtl-ar-content RadioWrapText' : 'RadioWrapText'}>
              <Radio
                name="privacy"
                labelName={t(`createGroup.privacyPrivate`)}
                value={'private'}
                checked={values.privacy === 'private'}
                onChange={handleChange}
              />
              <ul>
                <li>
                  <IoIosSquare /> {t(`createGroup.privacyPrivateContent.point1`)}
                </li>
                <li>
                  <IoIosSquare />
                  {t(`createGroup.privacyPrivateContent.point2`)}
                </li>
                <li>
                  <IoIosSquare />
                  {t(`createGroup.privacyPrivateContent.point3`)}
                </li>
              </ul>
            </PrivacyContent>
            <PrivacyContent className={appLanguageCode === 'ar' ? 'rtl-ar-content RadioWrapText' : 'RadioWrapText'}>
              <Radio
                name="privacy"
                labelName={t(`createGroup.privacyHidden`)}
                value={'hidden'}
                checked={values.privacy === 'hidden'}
                onChange={handleChange}
              />
              <ul>
                <li>
                  <IoIosSquare /> {t(`createGroup.privacyHiddenContent.point1`)}
                </li>
                <li>
                  <IoIosSquare />
                  {t(`createGroup.privacyHiddenContent.point2`)}
                </li>
                <li>
                  <IoIosSquare />
                  {t(`createGroup.privacyHiddenContent.point3`)}
                </li>
              </ul>
            </PrivacyContent>
            {errors.privacy && (
              <ErrorText>{t(`translation:groups.validationErrors.${errors.privacy}`, { field: 'Privacy' })}</ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`createGroup.postModeration`)}</LabelText>
            <Select name="postModeration" value={values.postModeration} onChange={handleChange}>
              <option value="" disabled>
                {t(`createGroup.moderationTypes.option1`)}
              </option>
              <option value="autoPublished"> {t(`createGroup.moderationTypes.option2`)}</option>
              <option value="publishedUponReview"> {t(`createGroup.moderationTypes.option3`)}</option>
            </Select>
            {errors.postModeration && (
              <ErrorText>
                {t(`translation:groups.validationErrors.${errors.postModeration}`, { field: 'Post Moderation', length: 1000 })}
              </ErrorText>
            )}
          </FormContainer>
          <FormContainer className="CustomWidth">
            <Checkbox
              name="inviteFeature"
              checked={values.inviteFeature}
              onChange={handleChange}
              labelName={t(`createGroup.inviteFeature`)}
            />
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`createGroup.whoCanInvite`)}</LabelText>
            <Select name="invitationType" value={values.invitationType} onChange={handleChange}>
              <option value="" disabled>
                {t(`createGroup.inviteOptions.option1`)}
              </option>
              <option value="admin">{t(`createGroup.inviteOptions.option2`)}</option>
              <option value="adminModerators">{t(`createGroup.inviteOptions.option3`)}</option>
              <option value="everyone">{t(`createGroup.inviteOptions.option4`)}</option>
            </Select>
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`createGroup.category`)}</LabelText>
            <ReactSelect
              className="CustomBoxSelect"
              styles={customMultiSelectStyles}
              name="categories"
              options={categoryArr}
              components={{
                IndicatorSeparator: () => null,
                ClearIndicator: null,
              }}
              isMulti={true}
              isRtl={appLanguageCode === 'ar' ? true : false}
              placeholder={t(`createGroup.placeholderCategory`)}
              value={categoryArr ? categoryArr.find((item) => item.value === values.tags) : ''}
              onChange={(item) => setFieldValue('categories', item)}
              onBlur={handleBlur}
            />
            {errors.categories && touched.categories && (
              <ErrorText>{t(`translation:groups.validationErrors.${errors.categories}`, { field: 'Category' })}</ErrorText>
            )}
          </FormContainer>
          <FormContainer>
            <LabelText className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>{t(`createGroup.tags`)}</LabelText>
            <ReactSelect
              className="CustomBoxSelect"
              styles={customMultiSelectStyles}
              name="tags"
              placeholder={t(`groups:createGroup.placeholderTags`)}
              options={tagsArr}
              components={{
                IndicatorSeparator: () => null,
                ClearIndicator: null,
              }}
              isMulti={true}
              isRtl={appLanguageCode === 'ar' ? true : false}
              value={tagsArr ? tagsArr.find((item) => item.value === values.tags) : ''}
              onChange={(item) => setFieldValue('tags', item)}
            />
          </FormContainer>
          <Button>{t(`createGroup.save`)}</Button>
        </form>
      </GroupFormWrapper>
    </>
  )
}

CreateGroupForm.propTypes = {
  groupTags: PropTypes.arrayOf(PropTypes.any),
  groupCategories: PropTypes.arrayOf(PropTypes.any),
  values: PropTypes.object,
  errors: PropTypes.object,
  touched: PropTypes.object,
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  setFieldValue: PropTypes.func,
  isValid: PropTypes.bool,
}

export default CreateGroupForm
