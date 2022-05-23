import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import ReactHtmlParser from 'react-html-parser'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { stripNonTextTags } from '../../../../utilities/parseHtmlUtils'
import SingleActivity from '../SingleActivity'

const PostSection = styled.div`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-between;
  .DefaultText {
    font-style: normal;
    color: #666;
  }
`

const SectionContent = (props) => {
  const { t } = useTranslation('profile')
  const router = useRouter()
  const { username } = router.query

  const renderDecription = (activity, description) => {
    if (activity.type === 'userPosts') {
      if (activity.title) return activity.title
      else return <span className="DefaultTitle">{t(`profile:activity.descriptionNotAdded`)}</span>
    } else {
      if (activity.title) return activity.title
      //if (description) return ReactHtmlParser(description, { transform: stripNonTextTags })
      else return <span className="DefaultTitle">{t(`profile:activity.descriptionNotAdded`)}</span>
    }
  }

  const redirectHandler = (activity) => {
    if (activity.type === 'userPosts') {
      router.push(`/${username}/post/${activity._id}`)
    } else {
      router.push(`/${activity.type.slice(0, -1)}/${activity.articleSlug}`)
    }
  }

  return (
    <>
      <PostSection>
        {props.userActivities ? (
          <>
            {props.userActivities.length > 0 ? (
              <>
                {props.userActivities.map((activity) => (
                  <SingleActivity
                    setAddPostModal={props.setAddPostModal}
                    setEditData={props.setEditData}
                    editData={props.editData}
                    editType={props.editType}
                    setEditType={props.setEditType}
                    key={activity._id}
                    activity={activity}
                    renderDecription={renderDecription}
                    redirectHandler={redirectHandler}
                  />
                ))}
              </>
            ) : (
              <span className="DefaultText">{t(`profile:activity.noActivityText`)}</span>
            )}
          </>
        ) : null}
      </PostSection>
    </>
  )
}

SectionContent.propTypes = {
  userActivities: PropTypes.array,
  setAddPostModal: PropTypes.func,
  setEditData: PropTypes.func,
  editData: PropTypes.object,
  editType: PropTypes.string,
  setEditType: PropTypes.func,
}

export default SectionContent