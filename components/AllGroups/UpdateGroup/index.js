import React, { useEffect } from 'react'
import styled from 'styled-components'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { useRouter } from 'next/router'
import GroupBarHeading from '../CreateGroup/GroupBarHeading'
import UpdateGroupForm from '../UpdateGroup/UpdateGroupForm'
import { getGroupDetails, editGroup } from '../../../modules/groups/groupsSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import RightSection from '../../NewsFeed/RightSection'
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
  align-items: flex-start;
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
})

/**
 * Update Group
 * @returns
 */
const UpdateGroup = () => {
  const dispatch = useDispatch()
  const router = useRouter()
  const { groupId } = router.query
  const {t} = useTranslation('translation')

  const groupDetail = useSelector((state) => state.root.groups.groupDetail)

  //Fetch group details
  useEffect(() => {
    dispatch(getGroupDetails(groupId))

    return () => {
      // TODO: clear state
    }
  }, [dispatch, groupId])

  //group
  const groupDefaultValues = {
    title: !isEmptyObj(groupDetail) && groupDetail.title ? groupDetail.title : '',
    description: !isEmptyObj(groupDetail) && groupDetail.description ? groupDetail.description : '',
    privacy: !isEmptyObj(groupDetail) && groupDetail.privacy ? groupDetail.privacy : 'public',
    postModeration:
      !isEmptyObj(groupDetail) && groupDetail.postModeration ? groupDetail.postModeration : 'autoPublished',
    inviteFeature:
      !isEmptyObj(groupDetail) && groupDetail.inviteFeature !== undefined ? groupDetail.inviteFeature : true,
    invitationType: !isEmptyObj(groupDetail) && groupDetail.invitationType ? groupDetail.invitationType : 'everyone',
  }

  // Formik form
  const { handleSubmit, values, errors, isValid, handleChange, touched, handleBlur } = useFormik({
    initialValues: groupDefaultValues,
    validateOnChange: false,
    enableReinitialize: true,
    validationSchema,
    onSubmit(inputs) {
      const data = _.cloneDeep(inputs)
      dispatch(editGroup(groupId, data, router, t))
    },
  })

  return (
    <>
      <Head>
        <title>Edit Group | ARTMO | The Art Network | Connecting The Art World</title>
      </Head>
      <FeedWrapper>
        <YourProfileContainer>
          <LeftContainer>
            <GroupBarHeading type="edit" />
            <UpdateGroupForm
              handleSubmit={handleSubmit}
              values={values}
              errors={errors}
              touched={touched}
              handleChange={handleChange}
              handleBlur={handleBlur}
              isValid={isValid}
            />
          </LeftContainer>

          <RightSection />
        </YourProfileContainer>
      </FeedWrapper>
    </>
  )
}

export default UpdateGroup
