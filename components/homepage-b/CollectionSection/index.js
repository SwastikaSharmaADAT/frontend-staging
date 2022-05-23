import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'next-i18next'
import { openInNewTab } from '../../../utilities/newTabUtils'
import { isLoginToken } from '../../../utilities/authUtils'
import { useRouter } from 'next/router'

const CollectionWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 70px 0;
  width: 100%;
  background: linear-gradient( 90deg,rgba(0,0,0,0) 0%,rgba(60,60,60,1) 100%); 
`

const CollectionContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1200px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  height: 100%;
  box-sizing: border-box;
`
const CollectionWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 767px) {
    flex-wrap: wrap;
  }
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

const CollectionItem = styled.div`
  flex: 0 0 49%;
  display: flex;
  align-items: center;
  background: linear-gradient(210deg,#222222 0%,#121212 100%);
  box-shadow: 1px 1px 5px 5px rgb(0 0 0 / 25%);
  position: relative;
  @media (max-width: 460px) {
    flex: 0 0 100%;
    margin: 5px 0;
  }
  :hover {
    cursor: pointer;
    background: linear-gradient(210deg,#444 0%,#121212 100%);
  }
`

const ItemImage = styled.div`
  flex: 0 0 40%;
  padding: 30px 10px 30px 10px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  background: repeating-linear-gradient(
    45deg,
    rgba(50,50,50,0.5) 0px,
    rgba(50,50,50,0.5) 2px,
    rgba(0,0,0,0.5) 2px,
    rgba(0,0,0,0.5) 6px
  );
  img {
    max-width: 150px;
    @media (max-width: 460px) {
      max-width: 100px;
    }
  }
`

const ItemDescr = styled.div`
  color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  h1 {
    margin-bottom: 0;
    font-weight: 300;
  }
  @media (max-width: 460px) {
    font-size: 0.75em;
  }
`

const NewDiv = styled.div`
    background: #fff;
    width: 50px;
    height: 50px;
    position: absolute;
    right: -10px;
    top: -10px;
    color: #222;
    text-align: center;
    line-height: 50px;
    transform: scale(0.8) rotate(20deg);
  &:before {
    content: "NEW";
    font-size: 16px;
    position: absolute;
    top: 0;
    left: 0;
    background: #fff;
    width: 50px;
    height: 50px;
    -webkit-transform: rotateX(-45deg);
    -ms-transform: rotateX(-45deg);
    transform: rotate(-45deg);
  }
`


const CollectionSection = () => {
  const { t } = useTranslation('landingPageB')
  const router = useRouter()
  const [userInfo, setUserInfo] = useState(null)
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  useEffect(()=>{
    setUserInfo(localStorage.getItem('user_info'))
  },[])

  return (
    <>
      <CollectionWrapper>
        <CollectionContainer>
          <CollectionWrap> 
            <CollectionItem onClick={() => {router.push('/buzz/selling-digital-art-made-social')}}>
              <ItemImage>
                <img style={{filter: 'invert(1)'}} src="/assets/add-artwork-digital.svg"/>
              </ItemImage>
              <ItemDescr>
                <NewDiv>NEW</NewDiv>
                <h1>Digital Artworks</h1>
                <h3>Buy and Sell.</h3>
                <h5>See More...</h5>
              </ItemDescr>
            </CollectionItem>
            <CollectionItem onClick={() => {router.push('/giftcard')}}>
              <ItemImage>
                <img src="/assets/item2.svg"/>
              </ItemImage>
              <ItemDescr>
                <h1>Gift Cards</h1>
                <h3>Make a unique art gift.</h3>
                <h5>View options...</h5>
              </ItemDescr>
            </CollectionItem>
          </CollectionWrap>
        </CollectionContainer>
      </CollectionWrapper>
    </>
  )
}

export default CollectionSection
