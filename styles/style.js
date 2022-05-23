import { createGlobalStyle } from 'styled-components'
import PreviousArrow from '../public/assets/previous_arrow.png'
import NextArrow from '../public/assets/next_arrow.png'
//import MontserratTTF from '../public/fonts/Montserrat-Regular.ttf'
//import MontserratEOT from '../public/fonts/Montserrat-Regular.eot'
//import MontserratWOFF from '../public/fonts/Montserrat-Regular.woff'
//import MontserratSVG from '../public/fonts/Montserrat-Regular.svg'
// MontserratMediumTTF from '../public/fonts/Montserrat-Medium.ttf'
//import MontserratMediumEOT from '../public/fonts/Montserrat-Medium.eot'
//import MontserratMediumWOFF from '../public/fonts/Montserrat-Medium.woff'
//import MontserratMediumSVG from '../public/fonts/Montserrat-Medium.svg'

const GlobalStyle = createGlobalStyle`
  
  @font-face {
    font-family: 'Montserrat-Regular';
    src: url('/fonts/Montserrat-Regular.eot');
    src: local('☺'), url('fonts/Montserrat-Regular.woff') format('woff'), url('/fonts/Montserrat-Regular.ttf') format('truetype'), url('public/fonts/Montserrat-Regular.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  
  @font-face {
    font-family: 'Montserrat-Medium';
    src: url('fonts/Montserrat-Medium.eot');
    src: local('☺'), url('fonts/Montserrat-Medium.woff') format('woff'), url('fonts/Montserrat-Medium.ttf') format('truetype'), url('fonts/Montserrat-Medium.svg') format('svg');
    font-weight: normal;
    font-style: normal;
  }
  body{
    font-family: 'Montserrat-Regular';
    margin:0px; 
    padding:0px;
    overflow-x:hidden;
    background:#f3f4f8;
    counter-reset: section;
  }
  
  h1{
    font-family: 'Montserrat-Medium';
  }
  
  p, a, input, button, ::placeholder, select, option, span, textarea{
    font-family: 'Montserrat-Regular';
  }
  .signup-link {
    color: #000
  }  
  img{
    max-width:100%;
  }

  input, textarea, button, select{
    border-radius:0;
    appearance: none;
  }

  input::-ms-reveal, input::-ms-clear {
    display: none;
  }

  html, body{
    height:100%;
  }

  #root{
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  .react-multi-carousel-list{
    margin: 0 -6px;
    padding: 60px 0 0;
  }
  .react-multiple-carousel__arrow {
    position: absolute;
    outline: 0;
    transition: all .5s;
    border-radius: 0;
    z-index: 0;
    border: 0;
    background: transparent;
    min-width: 30px;
    min-height: 30px;
    opacity: 1;
    cursor: pointer;
    border: 2px solid #fff;
  }
  .react-multiple-carousel__arrow--left {
    left: 6px;
    top: 24px;
  }
  .react-multiple-carousel__arrow--right {
    right: 6px;
    top: 24px;
    @media (min-width: 767px ) and (max-width: 1280px){
      right: 8px ;
    }
  }
  .react-multiple-carousel__arrow::before{
    font-size: 16px;
  }
  .ReactModal__Overlay.ReactModal__Overlay--after-open{
    z-index: 90;
  }
  .ReactModal__Overlay.ReactModal__Overlay--after-open.sidebarLangPoup {
    z-index: 1400;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
  .SideBar .MuiPaper-root{
    background: #222;
    padding: 0px;
    max-width: 270px;
    width: 100%;
    display: flex;
    flex-direction: column; 
    
  }
  .SideBarMob {
    z-index: 1 !important;
  }
  .SideBarMob .MuiPaper-root {
    
    background: #000 !important;
    @media ( max-width: 450px ){
      top: 45px ;
    }
    @media (min-width: 450px ) and ( max-width: 767px ){
      top: 49px ;
    }
  }
  .CloseSideBar{
    color: #fff;
    font-size: 32px;
    order: 2; 
    cursor: pointer;
    @media (max-width: 991px) {
      font-size: 24px;
    }
  }
  .alice-carousel__stage-item{
    width: 100% !important;
    vertical-align: middle;
  }
  .alice-carousel__wrapper{
    width: 80%;
    margin: 0 auto;
    height: 100%;
  }
  .alice-carousel__prev-btn {
    text-align: right;
    position: absolute;
    top: 45%;
    width: auto;
    padding: 0;
    left: 10px;
    @media (max-width: 991px) {
      left: 0px;
      top: 35%;
    }
    @media (min-width: 768px) and (max-width: 990px) {
      top: 45%;
    }
  }
  .alice-carousel__next-btn{
    position: absolute;
    top: 45%;
    width: auto;
    padding: 0;
    right: 10px;
    @media (max-width: 991px) {
      right: 0px;
      top: 35%;
    }
    @media (min-width: 768px) and (max-width: 990px) {
      top: 45%;
    }

  }
  .alice-carousel__prev-btn-item, .alice-carousel__next-btn-item{
    font-size:0;
    width:44px;
    height:66px;
    padding:0;
    @media (max-width: 991px) {
      width:30px;
      height:30px;

    }
  }
  .alice-carousel__prev-btn-item{
    background:url('/public/assets/previous_arrow.png') no-repeat center center;
    background-size:cover;
    @media (max-width: 991px) {
      background-size:contain;
    }
  }
  .alice-carousel__next-btn-item{
    background:url('/public/assets/next_arrow.png') no-repeat center center;
    background-size:cover;
    @media (max-width: 991px) {
      background-size:contain;
    }
  }
  .alice-carousel{
    height: 100%;
  }
  .alice-carousel > div:first-child{
    width: 100%;
    height: 100%;
  }
  .alice-carousel__stage-item{
    text-align: center;
  }
  .alice-carousel__stage-item img {
    max-height: 80vh;
    @media (min-width: 768px) {
      text-align: center;
      margin: 0 auto;
      max-height: 100%;
      width: auto;
      overflow: hidden;
      max-height: 80vh;
    }
  }
  .alice-carousel__dots{
    display: none;
  }
  body.ReactModal__Body--open{
    overflow:hidden;
    @media (max-width: 991px) {
      overflow:hidden;
    }
  }
  #simple-popper{
    z-index:9999999999;
    a{
      cursor:pointer;
    }
  }
  #simple-menu{
    .MuiPaper-root{
      top: 69px !important;
      border-radius: 0;
      color:#666;
      font-size:13px;
      .MuiList-padding {
        padding-top: 0;
        padding-bottom: 0;
      }
      .MuiMenuItem-root{
        color:#666;
        font-size:13px;
        border-bottom: 1px solid #eee;
      }
    }
  }
  .MuiTypography-body1{
    font-size:13px;
  }
  .MuiTooltip-tooltipPlacementBottom {
    margin: 8px 0 0;
    transform-origin: center top;
    padding: 5px;
    border-radius:0;
  }
  .PopoverBtn{
    padding: 0;
    min-width: inherit;
    position: relative;
    top: -3px;
  }
  .react-toast-success {
    background: #222;
    @media (max-width: 767px) {
      width: 80%;
      margin: 0 auto;
    }
  }
  .Toastify__toast-container {
    width: auto;
    text-align: center;
    min-width: 320px;
  }

  .Toastify__toast-container--top-center {
    @media (max-width: 767px) {
      padding: 20px;
      width: 100%;
    }
  }
  .react-toast-error {
    background: #fa4236;
    @media (max-width: 767px) {
      width: 80%;
      margin: 0 auto;
    }
  }
  .selected-media {
    border: 2px solid #ffffff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
  }
//hide editor warning
.tox-notification.tox-notification--in.tox-notification--warning {
  display: none !important;
}
  .tox-dialog{
    .tox-dialog__footer {
      .tox-button {
        background-color: #222;
        border-radius: 0;
        border-color: #000;
        color: #fff;
        border: 0;
        :hover, :focus{
          background-color: #222;
          color: #fff;
          :not(:disabled){
            background-color: #222;
            color: #fff;
          }
        }
      }
      .tox-button--secondary{
        color: #222;
        background-color: #eee;
        :hover, :focus{
          color: #222;
          background-color: #eee;
          :not(:disabled){
            color: #222;
            background-color: #eee;
          }
        }
      }
      .tox-button--naked.tox-button--icon:hover:not(:disabled){
        color: #fff;
      }
    }
  }
  .tox-mbtn__select-label, .tox-mbtn {
    font-family: 'Montserrat-Medium' !important;
  }
  .group-popover{
    .MuiPaper-root {
    &.MuiPopover-paper {
      border-radius: 0 !important;
      max-width: 140px !important;
      min-width: 140px !important;
      .menu-item {
        text-align: center;
        padding: 5px 10px;
        font-size: 13px;
        margin: 0;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        :hover {
          background: #ccc;
        }
      }
      .disabledItem {
        color: #666;
        font-style: normal;
        cursor: auto;
        :hover {
          background: #fff;
        }
      }
    }
  }
}

`
export { GlobalStyle }
