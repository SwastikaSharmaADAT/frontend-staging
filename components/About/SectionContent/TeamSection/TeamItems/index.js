import React from 'react'
import styled from 'styled-components'
import { FaUserAlt } from 'react-icons/fa'
import CoverPhoto from '../../../../../public/assets/cover_photo_1.jpg'
import MemberPhoto from '../../../../../public/assets/profile_photo-1.jpg'

const ItemsWrapper = styled.div`
  position: relative;
  margin: 0 6px 15px;
  padding: 0 0 10px 0;
  background: #ffffff;
  border: 2px solid #eeeeee;
  text-align: center;
  max-width: 264px;
  @media (min-width: 1025px) and (max-width: 1399px) {
    max-width: 31%;
    margin: 0 6px 15px;
  }
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 32%;
    margin: 0 auto 15px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 32%;
    margin: 0 auto 15px;
  }
  @media (min-width: 464px) and (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 15px;
  }
  @media (max-width: 464px) {
    max-width: 264px;
    margin: 0 auto 15px;
  } 
`
const CoverImg = styled.div`
  position: relative;
  margin: 0;
  max-height: 92px;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  overflow: hidden;
  img {
    max-height: 120px;
    @media (max-width: 1280px) {
      width: 100%;
    }
  }
`
const MemberImg = styled.div`
  position: relative;
  margin: -50px auto 10px;
  border: 2px solid #eeeeee;
  width: 80px;
  height: 80px;
  img {
    width: 100%;
    height: 100%;
  }
`
const Username = styled.h1`
  font-family: 'Montserrat-Regular';
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #000;
`
const Followers = styled.h1`
  padding: 0;
  margin: 0 auto 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 15px;
  text-align: center;
  color: #222;
  font-family: 'Montserrat-Regular';
`
const FollowButton = styled.button`
  background: #222;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 7px 11px;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  margin: 0 auto 10px;
  display: flex;
  justify-content: center;
  min-width: 95px;
  :hover,
  :focus {
    background: #222;
    outline: none;
  }
  svg {
    margin-right: 4px;
  }
`
const Desgination = styled.h2`
  padding: 0;
  margin: 0 auto 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  text-align: center;
  color: #666;
`

const TeamItems = () => (
  <>
    <ItemsWrapper>
      <CoverImg>
        <img src={CoverPhoto} alt="Cover" />
      </CoverImg>
      <MemberImg>
        <img src={MemberPhoto} alt="Cover" />
      </MemberImg>
      <Username>Mexa Gavos</Username>
      <Followers>130 followers</Followers>
      <FollowButton>
        <FaUserAlt /> Follow
      </FollowButton>
      <FollowButton>
        <FaUserAlt /> Connect
      </FollowButton>
      <Desgination>Founder | CEO</Desgination>
    </ItemsWrapper>
  </>
)

export default TeamItems
