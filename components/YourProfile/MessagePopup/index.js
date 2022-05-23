import React from 'react'
import styled from 'styled-components'
import SectionContent from './SectionContent'

const FollowingPopupWrap = styled.div`
  width: 100%;
  position: absolute;
  max-width: 500px;
  min-height: 200px;
  height: auto;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  //display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -100px;
  z-index: 1;
  border: 2px solid #dadada;
  &.singleUserProf {
    left: 195px ;
    //top: 10% ;
    margin-top: 20px;
    @media ( max-width: 450px ) {
      left: 10px;
    }
    @media (min-width: 451px) and (max-width: 1100px) {
      left: 100px;
    }
  }
  &.listing{
    margin-top: 0;
    bottom: 185px;
    left: 241px;
    &.userView{
      position: static ;
      @media( max-width: 767px ) {
        height: 225px  ;
      }
    }
    @media (min-width: 768px) and (max-width: 991px) {
      left: 185px;
    }
    @media (max-width: 767px) {
      left: 0;
    }
    @media (max-width: 767px) and (orientation: landscape) {
      left: 95px;
    }
  }
  &.description{
    margin-top: 10px;
    //left: 241px;
    left: 0px;
    right: 0px;
    &.articleView{
      margin-top: 80%;
      @media( max-width: 767px ) {
        margin-top: 100%;
        min-height: 225px;
        top: 150vh;
      }
    }
    
    @media (min-width: 768px) and (max-width: 991px) {
      left: 100px;
    }
    @media (max-width: 767px) and (orientation: landscape) {
      left: 70px;
    }
    @media (max-width: 1024px) and (orientation: landscape) {
      left: 50px;
    }
  }
  @media (max-width: 479px) {
    min-width: 280px;
    max-width: 320px;
    min-height: 180px;
  }
`

const MessagePopup = ({className}) =>{
  
  return(
  <>
    <FollowingPopupWrap className={className}>
      <SectionContent />
    </FollowingPopupWrap>
  </>
)}

export default MessagePopup
