import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { isLoginToken } from '../../../utilities/authUtils'
import { useRouter } from 'next/router'
import { getGroups } from '../../../modules/groups/groupsSlice'
import { useSelector, useDispatch } from 'react-redux'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'

const CollectionWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 40px 0;
  width: 100%;
  background: #0a0a0a !important;
`

const CollectionContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1435px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  @media ( min-width: 1280px ) and ( max-width: 1500px){
    max-width: 1290px;
  }
  @media (min-width: 1153px ) and (max-width: 1280px) {
    width: 1176px;
  }
  @media( min-width: 1025px ) and ( max-width: 1152px){
    width: 1094px ;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
`
const CollectionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  flex-direction: column;
  ul {
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (min-width: 768px) and (max-width: 991px) {
      display: flex;
      flex-flow: row wrap;
      -webkit-box-pack: justify;
      justify-content: space-between;
    }
    @media (max-width: 767px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
    li {
      text-align: center;
      margin: 15px;
      padding: 0;
      max-width: 347px;
      background: linear-gradient(210deg, #222222 0%, #121212 100%);
      border: 1px solid rgba(255,255,255,0.02);
      width: 100%;
      display: inline-block;
      overflow: hidden;
      @media ( min-width: 1280px ) and ( max-width: 1500px){
        max-width: 300px;
      }
      @media (min-width: 1153px ) and (max-width: 1280px) {
        width: 267px;
      }
      @media( min-width: 1025px ) and ( max-width: 1152px){
        width: 236px ;
      }
      @media (max-width: 1024px) {
        width: auto;
      }
      @media (min-width: 768px) and (max-width: 991px) {
        flex: 0 0 calc(50% - 5px);
        margin: 10px;
      }
      @media (max-width: 767px) {
        max-width: 48%;
      }
      @media (max-width: 479px) {
        max-width: 46%;
      }
      @media (max-width: 767px) {
        flex: 0 0 calc(50% - 10px);
        margin: 5px
      }
      a {
        color: #fff;
        font-size: 14px;
        line-height: 17px;
        cursor: pointer;
        text-transform: uppercase;
        img {
          width: 100%;
          display: block;
          object-fit: cover;
          transition: transform 0.3s ease-in-out;
          height: 100px ;
          @media (max-width: 767px) {
            min-height: 100px;
          }
        }
        h1 {
          transition: all 0.2s ease-in-out;
        }
        :hover {
          img {
            transform: scale(1.05);
          }
          h1 {
            background: #666;
            transition: all 0.2s ease-in-out;
          }
        }
      }
    }
  }
`

const CollectionHeading = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 8px 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 22px;
`

const CollectionSection = () => {
  const { t } = useTranslation('landingPageB')
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username
  const dispatch = useDispatch()
  const allGroups = useSelector((state) => state.root.groups.allGroups)

  useEffect(() => {
    dispatch(getGroups({ page: 1 }, 'all',t))
  }, [dispatch])

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])
  
  return (
    <>
      <CollectionWrapper>
        <CollectionContainer>
          <CollectionWrap>
            <ul>
            {allGroups &&
              allGroups.length > 0 &&
              allGroups.map((group, index) => (
                <li>
                  <a onClick={() => openInNewTab(`/users`)}>
                    <img
                      src={
                        group && group.profilePicUrl
                          ? createResizeImageUrl(group.profilePicUrl, 150, 150, 'profileCover') +
                        '?' +
                        new Date(group.dateUpdated).getTime()
                          : '/assets/artmo-default.png'
                      }
                      onError={(e) => {
                        const timeSuffix = '?' + new Date(group.dateUpdated).getTime()
                        imageErrorHandler(e, createImageUrl(group.profilePicUrl), '/assets/mo-fallback-image.png', 'profileCover', timeSuffix)
                      }}
                      alt={`${group.title} group`}
                    />
                    <CollectionHeading>{t(`gridSection.users`)}</CollectionHeading>
                  </a>
                </li>
              ))}
            </ul>
          </CollectionWrap>
        </CollectionContainer>
      </CollectionWrapper>
    </>
  )
}

export default CollectionSection
