import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { getActivityDetails } from '../../../modules/newsFeed/newsFeedSlice'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'
import SinglePost from '../SinglePost'

const CenterContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 610px;
  .no-activity {
    font-style: normal;
    color: #666;
    display: flex;
    justify-content: center;
    font-size: 22px;
  }
  @media (max-width: 1279px) {
    margin: 0 15px;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    max-width: 70%;
    margin: 0;
  }
  @media (min-width: 600px) and (max-width: 767px) {
    max-width: 67%;
    margin-right: 0;
  }
  @media (max-width: 599px) {
    max-width: 100%;
    margin: 0;
  }
`

const SingleActivitySection = ({ username, activityType, activityId }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation(['newsFeed','translation'])

  const singleActivity = useSelector((state) => state.root.newsFeed.singleActivity)
  const noSingleActivityFound = useSelector((state) => state.root.newsFeed.noSingleActivityFound)

  useEffect(() => {
    dispatch(getActivityDetails(username, activityId, activityType,t))
    // eslint-disable-next-line
  }, [dispatch, username, activityId, activityType])

  return (
    <CenterContainer>
      {!noSingleActivityFound ? (
        <>
          {singleActivity && !isEmptyObj(singleActivity) && (
            <SinglePost singleActivityType postType="newsfeed" item={singleActivity} />
          )}
        </>
      ) : (
        <span className="no-activity">{t(`singleActivity.activityNotAvailable`)}</span>
      )}
    </CenterContainer>
  )
}

SingleActivitySection.propTypes = {
  username: PropTypes.string,
  activityType: PropTypes.string,
  activityId: PropTypes.string,
}

export default SingleActivitySection
