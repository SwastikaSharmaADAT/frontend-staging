import React, { useEffect } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useSelector, useDispatch } from 'react-redux'
import { useRouter } from 'next/router'
import ProgressBar from '@ramonak/react-progress-bar'
import { useTranslation } from 'next-i18next'
import { profileCompleteness } from '../../../../modules/profile/myProfileSlice'
import { profileCompleteObj } from '../../../../utilities/profileCompleteUtils'


const ProfileCompletionWrap = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  flex-wrap: wrap;
  div > div > div > span {
    display: none;
  }
  @media (max-width: 767px) {
    max-width: 100%;
  }
  &.profileCompleted{
    display: none;
    @media( max-width: 1023px ) {
      display: none;
    }
  }
`

const SectionHeading = styled.h1`
  font-style: normal;
  font-weight: normal;
  font-size: 20px;
  line-height: 24px;
  color: #222222;
  padding: 0;
  margin: 0 0 15px;
  font-family: 'Montserrat-Regular';
  justify-content: space-between;
  flex: 0 0 48%;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    margin: 0 0 10px;
    flex: 0 0 100%;
  }
  &.ProgressBarHeading {
    display: flex;
    justify-content: space-between;
    @media (max-width: 767px) {
      flex-direction: column;
    }
    span {
      @media (max-width: 767px) {
        margin: 10px 0;
      }
    }
  }
`

// const Progress = styled.div`
//   background: #eee;
//   justify-content: flex-start;
//   border-radius: 0;
//   align-items: center;
//   position: relative;
//   padding: 0;
//   display: flex;
//   height: 10px;
//   width: 100%;
//   margin: 0 0 10px;
// `

// const ProgressValue = styled.div`
//   animation: load 3s normal forwards;
//   box-shadow: 0 10px 40px -10px #fff;
//   border-radius: 0;
//   background: #222;
//   height: 10px;
//   width: 0;
//   @keyframes load {
//     0% {
//       width: 0;
//     }
//     100% {
//       width: 60%;
//     }
//   }
// `

const ProgressMessage = styled.div`
  font-size: 12px;
  line-height: 17px;
  color: #222222;
  padding: 0;
  margin: 0 0 15px;
  font-family: 'Montserrat-Regular';
  a {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    margin: 0 0 10px;
    line-height: normal;
  }
`

const ProgressContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex: 0 0 100%;
  margin-top: 5px;
  > div {
    width: 100%;
  }
  @media (min-width: 767px) {
    flex: 0 0 48%;
  }
`

const ProfileCompletion = (props) => {
  const { t } = useTranslation('profile')

  const dispatch = useDispatch()
  const profileMeasure = useSelector((state) => state.root.myProfile.profileMeasure)
  const router = useRouter()
  const { username } = router.query

  useEffect(() => {
    dispatch(profileCompleteness())
  }, [dispatch, username])

  const splitPercentage = (str) => {
    const fields = str.split('%')
    return parseInt(fields[0])
  }

  const arrLength = profileMeasure && profileMeasure.incompleteSections && profileMeasure.incompleteSections.length

  const handleClick = (section, func) => {
    props.scrollTo(section, func)
  }
  return (
    <>
      <ProfileCompletionWrap className={ profileMeasure && profileMeasure.completeness === '100%' ? 'profileCompleted' : '' }>
        <SectionHeading className="ProgressBarHeading">
          {t(`profileCompleteness.title`)} <span>{profileMeasure && profileMeasure.completeness}</span>
        </SectionHeading>
        {/* <Progress>
          <ProgressValue></ProgressValue>
        </Progress> */}
        <ProgressContainer>
        <ProgressBar
          completed={profileMeasure && profileMeasure.completeness ? splitPercentage(profileMeasure.completeness) : 0}
          bgColor="#222"
          margin="0 0 10px"
          height="15px"
          borderRadius="0"
          isLabelVisible={false}
        />
        <ProgressMessage>
          {profileMeasure && profileMeasure.incompleteSections && profileMeasure.incompleteSections.length > 0
            ? t(`profileCompleteness.incompleteLabel`) + ': '
            : null}
          {profileMeasure &&
            profileMeasure.incompleteSections &&
            profileMeasure.incompleteSections.map((item, index) => {
              const itemLabel = item.label
              if (index + 1 === arrLength) {
                return (
                  <a
                    key={index}
                    onClick={() =>
                      handleClick(profileCompleteObj[itemLabel].section, profileCompleteObj[itemLabel].func)
                    }
                  >
                    {t(`profileCompleteness.${profileCompleteObj[itemLabel].name}`)}
                  </a>
                )
              } else {
                return (
                  <a
                    key={index}
                    onClick={() =>
                      handleClick(profileCompleteObj[itemLabel].section, profileCompleteObj[itemLabel].func)
                    }
                  >
                    {t(`profileCompleteness.${profileCompleteObj[itemLabel].name}`)},{' '}
                  </a>
                )
              }
            })}
        </ProgressMessage>
        </ProgressContainer>
      </ProfileCompletionWrap>
    </>
  )
}

ProfileCompletion.propTypes = {
  scrollTo: PropTypes.func,
}

export default ProfileCompletion
