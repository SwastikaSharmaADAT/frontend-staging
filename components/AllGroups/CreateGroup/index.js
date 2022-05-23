import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
// import cloneDeep from 'lodash'
import _ from 'lodash'
import { useRouter } from 'next/router'
import RightSection from '../../NewsFeed/RightSection'
import GroupBarHeading from '../CreateGroup/GroupBarHeading'
import CreateGroupForm from '../CreateGroup/CreateGroupForm'
import { getGroupCategoriesTags, createGroup } from '../../../modules/groups/groupsSlice'
import { useTranslation } from 'next-i18next'
import Head from 'next/head'

const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
const YourProfileContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`
const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 880px;
  margin-right: 15px;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
  @media (min-width: 991px) and (max-width: 1024px) {
    max-width: 620px;
  }
  @media (max-width: 1024px) {
    margin-right: 0px;
  }
`
const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 350px;
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 350px;
    margin: 0 auto;
  }
  @media (max-width: 500px) {
    margin: 0 auto;
  }
  @media (max-width: 767px) {
    margin: 0 auto;
  }
`
// Privacy
const privacy = ['public', 'private', 'hidden']
//group post moderation type
const postModerationType = ['autoPublished', 'publishedUponReview']
// invitations type (Who can invite members to group)
const invitationType = ['admin', 'adminModerators', 'everyone']

const validationSchema = Yup.object().shape({
  title: Yup.string().required('required').max(200, 'maxLength'),
  description: Yup.string().required('required').max(1000, 'maxLength'),
  privacy: Yup.string().required('required').oneOf(privacy, 'invalidValue'),
  postModeration: Yup.string().required('required').oneOf(postModerationType, 'invalidValue'),
  inviteFeature: Yup.boolean().required('required'),
  invitationType: Yup.string().required('required').oneOf(invitationType, 'invalidValue'),
  categories: Yup.array()
    .of(Yup.object().shape({ value: Yup.string().required('required'), label: Yup.string().required('required') }))
    .nullable()
    .required('required'),
})

/**
 * Create Group
 * @returns
 */
const CreateGroup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const {t} = useTranslation('translation')

  const groupTags = useSelector((state) => state.root.groups.groupTags)
  const groupCategories = useSelector((state) => state.root.groups.groupCategories)

  //group
  const groupDefaultValues = {
    title: '',
    description: '',
    privacy: 'public',
    postModeration: 'autoPublished',
    inviteFeature: true,
    invitationType: 'everyone',
    categories: null,
    tags: [],
  }

  //Fetch categories & tags
  useEffect(() => {
    dispatch(getGroupCategoriesTags('categories'))
    dispatch(getGroupCategoriesTags('tags'))

    return () => {
      // TODO: clear state
    }
  }, [dispatch])

  // Formik form
  const { handleSubmit, values, errors, touched, isValid, setFieldValue, handleChange, handleBlur } = useFormik({
    initialValues: groupDefaultValues,
    validateOnChange: false,
    validationSchema,
    onSubmit(inputs) {
      const data = _.cloneDeep(inputs)
      data.categories = data.categories.map((o) => o.value)
      data.tags = data.tags.map((o) => o.value)
      dispatch(createGroup(data, router, t))
    },
  })

  return (
    <>
    <Head>
        <title>Create Group | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <GroupBarHeading type="create" />
            <CreateGroupForm
              groupCategories={groupCategories}
              groupTags={groupTags}
              handleSubmit={handleSubmit}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isValid={isValid}
              setFieldValue={setFieldValue}
            />
          </LeftContainer>

          <RightContainer>
            <RightSection />
          </RightContainer>
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default CreateGroup
