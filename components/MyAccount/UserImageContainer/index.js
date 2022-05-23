import React, { useEffect, useState } from 'react'
import { useTranslation } from 'next-i18next'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/router'
import styled from 'styled-components'
import useTranslateContent from '../../../hooks/useTranslateContent'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'
import { isEmptyObj } from '../../../utilities/checkEmptyObject'

const UserImage = styled.div`
  width: 100%;
  margin: 0 auto 20px;
  text-align: center;
`
const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 120px;
  }
`
const UserName = styled.div`
  font-size: 18px;
  margin: 0 0 5px 0;
  padding: 0;
  font-family: 'Montserrat-Regular';
  color: #222;
`
const ViewProfileLink = styled.div`
  font-size: 14px;
  margin: 0 0 5px 0;
  padding: 0;
  color: #666;
  span {
    cursor: pointer;
  }
`

const UserImageContainer = () => {
  const { t } = useTranslation('myaccount')

  const router = useRouter()
  const userData = useSelector((state) => state.root.myProfile.userData)
  const viewProfileHandler = () => {
    router.push(`/user/${userData.username}`)
  }
  const name =
    userData.firstName && userData.lastName
      ? userData.firstName + ' ' + userData.lastName
      : userData.firstName
      ? userData.firstName
      : userData.username

  const [nameTitle, translateNameTitle] = useState(name)

  useEffect(() => {
    if (!isEmptyObj(userData)) translateNameTitle(name)
  }, [name])
  return (
    <>
      <UserImage>
        <ImageContainer>
          <img
            src={
              userData.profilePicUrl
                ? createResizeImageUrl(userData.profilePicUrl, 150, 150, 'profileCover') +
                  '?' +
                  new Date(userData.dateUpdated).getTime()
                : '/assets/artmo-default.png'
            }
            onError={(e) => {
              const timeSuffix = '?' + new Date(userData.dateUpdated).getTime()
              imageErrorHandler(
                e,
                createImageUrl(userData.profilePicUrl),
                '/assets/artmo-default.png',
                'profileCover',
                timeSuffix
              )
            }}
            alt="ArtworkImg"
          />
        </ImageContainer>
        <UserName> {nameTitle ? nameTitle : !isEmptyObj(userData) && name} </UserName>
        <ViewProfileLink>
          <span onClick={viewProfileHandler}> {t(`imageContainer.viewProfile`)} </span>
        </ViewProfileLink>
      </UserImage>
    </>
  )
}

export default UserImageContainer
