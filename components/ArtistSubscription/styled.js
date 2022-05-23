import styled from 'styled-components'

export const FeedWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 36px 0 0;
  width: 100%;
`
export const FullWidthContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  @media (max-width: 1280px) {
    width: auto;
  }
`

export const GroupBarHeadWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: #ffffff;
  display: flex;
  flex-direction: column;
  width: 100%;
  @media (max-width: 479px) {
    flex-direction: column;
  }
`

export const BannerBar = styled.div`
  position: relative;
  padding: 0;
  background: #222;
  font-weight: normal;
  font-size: 36px;
  line-height: normal;
  color: #ffffff;
  padding: 15px 30px;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
  }
`

export const SectionContentWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 15px 0;
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const SectionPara = styled.p`
  color: #222;
  font-size: 16px;
  margin: 0 0 20px;
  padding: 0;
  line-height: 22px;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`
export const SectionRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  margin: 0 0 15px;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  &.MemberTable {
    max-width: 100%;
    margin: 0 auto 15px;
    @media (max-width: 767px) {
      flex-direction: row;
    }
  }
  &.FlexWrap {
    flex-wrap: wrap;
  }
`
export const SectionCols = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 32.5%;
  border: 1px solid #dadbdd;
  background: #fff;
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 0 15px;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
export const SectionColsHead = styled.div`
  color: #000;
  font-size: 16px;
  text-transform: uppercase;
  text-align: center;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  &.YellowBg {
    background: #ddae67;
  }
  &.BlueBg {
    background: #809fbf;
  }
  &.GreenBg {
    background: #aed691;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
export const SectionColsDescription = styled.div`
  color: #000;
  font-size: 16px;
  line-height: 22px;
  padding: 15px;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
export const SectionFullWidthCols = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #dadbdd;
  background: #fff;
  margin: 0 0 15px;
  font-size: 14px;
  line-height: 20px;
  padding: 10px;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

export const SectionColsSm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24%;
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 0 15px;
  }
`

export const SectionColsTop = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 210px;
  align-items: center;
  justify-content: center;
  padding: 15px 30px;
  @media (max-width: 991px) {
    padding: 15px;
  }
  @media (max-width: 767px) {
    max-width: 100%;
    margin: 0 0 15px;
    min-height: 195px;
  }
  select {
    background-color: #fff;
    font-size: 14px;
    height: 30px;
  }
`

export const LabelText = styled.label`
  color: #222;
  font-size: 16px;
  margin: 0 0 10px;
  padding: 0;
  line-height: normal;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`
export const SectionColsBottom = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  justify-content: center;
  ul {
    margin: 0;
    padding: 0;
    li {
      &.mkBigText {
        font-size: 20px !important;
        background: #000 !important;
        color: #fff ;
        @media( max-width: 767px ) {
          font-size: 14px !important;
        }
        @media screen and (max-width: 1100px) and (min-width: 767px) {
          font-size: 17px !important;
          text-align: center;
        }
      }
      &.disabled {
        pointer-events: none;
        color: #fff !important ;
        background-color: #a0a0a0 !important;
        font-size: 14px!important;
      }
      border: 1px solid #d9d9db;
      text-align: left;
      min-height: 34px;
      padding: 10px;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      background: #fff;
      color: #000;
      font-size: 13px;
      border-bottom: 0;
      @media (max-width: 1024px) {
        font-size: 13px;
        min-height: 70px;
      }
      @media (max-width: 767px) {
        font-size: 13px;
        min-height: 70px;
      }
      :last-child {
        border-bottom: 1px solid #d9d9db;
      }
      &.DarkYellow {
        background: #ddc5a4;
      }
      &.DarkBlue {
        background: #9cacbf;
      }
      &.DarkGreen {
        background: #b1d6b1;
      }
      &.DarkYellowSec {
        background: #e9eccf;
      }
    }
  }
`

export const SectionColsSmWrap = styled.div`
  display: flex;
  max-width: calc(100% - 25%);
  width: 100%;
  justify-content: space-between;
  @media (max-width: 767px) {
    overflow-x: scroll;
  }
  .InnerSmWrap {
    /* max-width: 32.5%; */
    @media (max-width: 767px) {
      max-width: 250px;
      min-width: 250px;
    }
    li {
      justify-content: center;
      :last-child {
        border-bottom: 1px solid #d9d9db;
        color: #222;
        font-size: 18px;
        text-transform: uppercase;
        text-align: center;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 500;
        background: #222;
        letter-spacing: 1px;
        cursor: pointer;
        min-height: inherit;
        @media (min-width: 767px) and (max-width: 991px) {
          font-size: 14px;
        }
      }
      &.DarkYellow {
        background: #ddc5a4;
      }
      &.DarkBlue {
        background: #9cacbf;
      }
      &.DarkGreen {
        background: #b1d6b1;
      }
      &.LightYellow {
        background: #000;
      }
      &.DarkYellowSec {
        background: #eeedb1;
      }
    }
  }
`

export const InnerSectionColsTop = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 239px;
  padding: 0;
  border: 1px solid #d9d9db;
  border-bottom: 0;
  @media (max-width: 479px) {
    max-width: 100%;
  }
`

export const InnerColsHead = styled.div`
  color: #fff;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 600;
  background: #222;
  @media (min-width: 767px) and (max-width: 991px) {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
export const MiddleHeadWrap = styled.div`
  color: #222;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-weight: 500;
  min-height: 147px;
  flex-direction: column;
  padding: 30px 20px 0px;
  box-sizing: border-box;
  position: relative;
  @media (min-width: 768px) and (max-width: 991px) {
    padding: 0 10px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  &.LightYellow {
    background: #e1d8c8;
  }
  &.LightBlue {
    background: #c3cad6;
  }
  &.LightGreen {
    background: #cde3cf;
  }
  &.LightYellowSec {
    background: #e9eccf;
  }
  select {
    background-color: #fff;
    border: 0;
    margin: 10px 0 0;
    font-size: 14px;
    height: 30px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    padding-right: 25px;
  }
  .TopSpan {
    margin: 10px 0 0;
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
  }
`
export const Price = styled.div`
  color: #222;
  font-size: 24px;
  font-weight: 600;
  margin: 10px 0 0;
  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 24px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
  span {
    font-size: 16px;
    text-transform: lowercase;
    font-weight: 400;
  }
  &.OldPrice {
    text-decoration: line-through;
  }
`

export const BottomColsBar = styled.div`
  color: #222;
  font-size: 18px;
  text-transform: uppercase;
  text-align: center;
  min-height: 46px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  background: #222;
  letter-spacing: 1px;
  cursor: pointer;
  &.disabled {
    pointer-events: none;
    color: #fff !important ;
    background-color: #a0a0a0 !important;
    font-size: 14px!important;
    line-height: 22px;
  }
  @media (min-width: 767px) and (max-width: 991px) {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  &.DarkYellow {
    background: #ddc5a4;
  }
  &.DarkBlue {
    background: #9cacbf;
  }
  &.DarkGreen {
    background: #b1d6b1;
  }
  &.DarkYellowSec {
    background: #eeedb1;
  }
`

export const InnerBannerBar = styled.div`
  position: relative;
  padding: 0;
  background: #000;
  font-weight: normal;
  font-size: 36px;
  line-height: normal;
  color: #ffffff;
  padding: 15px 30px;
  text-transform: uppercase;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
  }
  @media (max-width: 479px) {
    font-size: 18px;
  }
`

export const AskQuestion = styled.div`
  color: white;
  font-size: 24px;
  display: flex;
  align-items: center;
  cursor: pointer;
  svg {
    margin-right: 8px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    margin-top: 8px;
  }
  @media (max-width: 767px) {
    font-size: 18px;
    margin-top: 8px;
  }
`

export const SectionHalfCols = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 47%;
  border: 1px solid #dadbdd;
  background: #fff;
  padding: 15px;
  margin: 0 0 15px;
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 46%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 45%;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-width: 45%;
  }
  @media (max-width: 767px) and (orientation: landscape) {
    max-width: 44%;
  }
  @media (max-width: 600px) and (orientation: landscape) {
    max-width: 43%;
  }
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 0 15px;
    width: auto;
  }
`

export const TopHeading = styled.div`
  padding: 0 0 10px;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  color: #222;
`

export const TopDescription = styled.div`
  padding: 0;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: #222;
`

export const BottomDiv = styled.div`
  color: #222;
  font-size: 16px;
  font-weight: 400;
  display: flex;
  flex-direction: column;
  text-transform: initial;
  position: absolute;
  bottom: 10px;
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 13px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  span {
    font-size: 18px;
    font-weight: 600;
  }
`

export const ModalWrapper = styled.div`
  position: relative;
  max-width: 430px;
  margin: 0 auto;
  background: #fff;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 80vh;
    overflow-y: auto;
  }
  @media (max-width: 767px) {
    max-height: 80vh;
    max-width: 85vw;
  }
  .accordion {
    margin: 0;
  }
`
export const HeaderBar = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 27px;
  color: #222;
  @media (max-width: 767px) {
    font-size: 18px;
  }
  span {
    font-family: 'Montserrat-Medium';
    margin: 0 0 0 10px;
  }
  &.terms-modal-footer {
    flex-direction: column;
    p {
      font-size: 16px;
      color: #222;
      line-height: 28px;
      margin: 0 0 10px;
      padding-left: 10px;
    }
  }
`

export const MiddleSection = styled.div`
  position: relative;
  background: #f3f4f8;
  display: flex;
  flex-direction: column;
  padding: 15px;
  max-height: 400px;
  overflow-y: auto;
  overflow-x: hidden;
  ul {
    margin: 0;
    padding: 0;
    li {
      background: #fff;
      padding: 15px;
      margin: 0 0 10px;
      font-family: 'Montserrat-Medium';
      font-size: 16px;
      color: #222;
      list-style: none;
      display: flex;
      .RadioText {
        font-family: 'Montserrat-Medium';
        font-size: 16px;
        color: #222;
        padding: 0px;
      }
      > :first-child {
        margin: 0px 10px 0 0;
      }
      img {
        margin: 0px 0 0 10px;
      }
    }
  }
`
export const FooterBar = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  line-height: 27px;
  color: #222;
`
export const PaymentPrice = styled.div`
  padding: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: #222;
  span {
    font-family: 'Montserrat-Medium';
    margin: 0 0 0 10px;
  }
`
export const FullWidthWrap = styled.div`
  position: relative;
  margin: 0;
  padding: 0px 0 0;
  width: 100%;
  &.secondaryWrap{
    background: #fff ;
  }
`
export const MainHeading = styled.h1`
  color: #222;
  font-size: 50px;
  margin: 0 auto 30px;
  padding: 0 15px;
  line-height: normal;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-weight: 400;
  &.BottomHeading {
    margin: 30px 0 0 0;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
`
export const SliderContainerWrap = styled.div`
  position: relative;
  margin: 0 0 30px;
  padding: 0px 0 0;
  width: 100%;
  .react-multiple-carousel__arrow {
    display: none;
  }
  .react-multi-carousel-list {
    padding: 0px 0 10px;
    @media (max-width: 767px) {
      padding: 10px 0 10px;
      &.center-align {
        justify-content: center;
      }
    }
  }
`

export const SecondaryHeading = styled.h1`
  margin: 20px 0 0 0 ;
  padding-top: 60px;
  font-size: 50px;
  color: #222;
  line-height: normal;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`
export const FullWidthWhiteBG = styled.div`
  position: relative;
  margin: 0;
  padding: 40px 0;
  width: 100%;
  background: #fff;
`

export const ColumnOneContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (max-width: 991px) {
    flex-flow: row wrap;
  }
  @media (max-width: 479px) {
  }
`

export const ColumnOne = styled.div`
  max-width: 300px;
  padding: 0 15px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media (max-width: 991px) {
    max-width: 40%;
    margin: 0 0 30px;
    width: auto;
  }
  @media (max-width: 767px) {
    max-width: 40%;
    margin: 0 0 30px;
    width: auto;
  }
  @media (max-width: 479px) {
    max-width: 100%;
    margin: 0 0 30px;
    width: 100%;
  }
`
export const ColumnHeading = styled.h1`
  color: #222;
  font-size: 22px;
  margin: 15px auto;
  padding: 0;
  line-height: normal;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 18px;
  }
`
export const ColumnPara = styled.p`
  color: #222;
  font-size: 16px;
  line-height: 1.8;
  margin: 0 auto;
  padding: 0;
  line-height: normal;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-weight: 400;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
export const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: flex-end;
  margin-bottom: ${(props) => (props.editing ? '20px' : '0px')};
`
export const FormGroup = styled.div`
  position: relative;
  display: flex;
  width: 100%;
  flex-direction: column;
  .Inputauto {
    width: auto;
  }
  &.BottomDiv {
    flex-direction: row;
    margin: 10px 15px 10px 0;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  svg {
    position: relative;
    top: 2px;
  }
  input[type='checkbox'].ios-switch + div {
    width: 55px;
    height: 20px;
    margin: -1px 0 0 0;
    cursor: pointer;
  }
  input[type='checkbox'].ios-switch + div > div {
    background-color: #222;
    border: 1px solid #222;
    cursor: pointer;
  }
  input[type='checkbox'].ios-switch + div > div {
    width: 14px;
    height: 14px;
    margin-top: 2px;
    margin-left: 3px;
    cursor: pointer;
  }
  input[type='checkbox'].green.ios-switch:checked + div > div {
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3), 0 0 0 1px #222;
    margin-left: 12px;
    cursor: pointer;
    @-moz-document url-prefix() {
      margin-left: 16px;
    }
  }
  input[type='checkbox'].green.ios-switch:checked + div {
    box-shadow: inset 0 0 0 15px #fff;
    cursor: pointer;
  }
  .PopoverBtn {
    color: #000;
    font-size: 16px;
  }
`
export const ChooseProfile = styled.div`
  width: 100% ;
  margin: 0 auto ;
  text-align: center ;
  box-sizing: border-box;
  &.subscription-pg {
    width: 100%;
    height: auto;
    box-sizing: border-box;
    margin: 0 auto 60px ;
  }
  & .title{
    font-size: 50px ;
    color: #222;
    margin-bottom: 15px;
    @media (max-width: 767px ) {
      font-size: 24px ;
    }
  }
  & .helpSection{
    box-sizing: border-box;
    font-size: 20px;
    //font-weight: bold;
    margin-top: 20px;
    @media( max-width: 767px ){
      font-size: 15px ; 
    }
  }
  & .cPorfileForm{
    color: #222;
    font-size: 16px;
    font-weight: 400;
    display: flex;
    flex-direction: row;
    text-transform: initial;
    justify-content: center;
    align-items: center ;
    margin: 10px 0;
    
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 13px;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
    span {
      font-size: 24px;
      font-weight: normal;
      font-family: 'Montserrat-Regular';
      background: #fff;
      border: none;
      color: #a9a9a9;
      padding: 5px 35px;
      text-transform: uppercase ;
      cursor:pointer;
      border: 1px solid #a9a9a9;
      &.boldTxt{
        font-weight: bold;
        background: #000;
        color: #fff;
      }
      @media ( max-width: 767px ) {
        font-size: 18px;
        padding: 5px 20px;
      }
    }
    & .CustomCheckbox__Customcheckboxtext-sc-1i1rpp3-0 {
      margin: 0 30px;
      @media( max-width: 767px ) {
        margin: 0 15px;
      }
      & #CustomCheckbox_test__1D4GK + div {
        width: 80px;
        height: 19px;
        @media( max-width: 767px ) {
          width: 50px ;
        }
      }
      & #CustomCheckbox_test__1D4GK:checked + div > div {
        -webkit-transform: translate3d(56px, 0, 0);
        -moz-transform: translate3d(56px, 0, 0);
        background-color: #222;
        -webkit-box-shadow: none;
        box-shadow: none;
        @media( max-width: 767px ) {
          -webkit-transform: translate3d(28px, 0, 0);
        -moz-transform: translate3d(28px, 0, 0);
        }
      }
    }
  }
`
export const ToggleContent = styled.div`
  position: relative;
  margin: 0 auto 30px;
  text-align: center;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .firstspan {
    text-transform: uppercase;
    margin: 0 15px 0 0;
  }
  .popoverDiv {
    text-transform: uppercase;
  }
  .popoverDiv {
    display: flex;
    .PopoverBtn {
      margin: 0 0 0 5px;
    }
    .MuiIconButton-root {
      align-items: flex-start;
      padding: 0;
    }
  }
`
export const LabelSpan = styled.p`
  color: #222;
  font-size: 18px;
  padding: 0;
  line-height: normal;
  text-align: center;
  font-family: 'Montserrat-Regular';
  font-weight: 400;
  margin: 0 20px 0 0;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
export const SvgIcon = styled.div`
  height: 150px;
  width: 150px;
`

export const TermsPopupSubHeading = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  background: #fff;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: normal;
  padding: 10px;
  margin-bottom: 10px;
  color: #222;
`
