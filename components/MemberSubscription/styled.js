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
    max-width: 970px;
    margin: 0 auto 15px;
    @media (max-width: 767px) {
      flex-direction: row;
    }
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
  display: inline;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`

export const SectionColsSm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 24.5%;
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
        //text-transform: capitalize;
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
        font-size: 14px;
        min-height: 70px;
      }
      @media (max-width: 767px) {
        font-size: 14px;
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
    max-width: 32.5%;
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
  @media (max-width: 767px) {
    font-size: 24px;
  }
`
export const MiddleHeadWrap = styled.div`
  color: #222;
  font-size: 24px;
  text-transform: uppercase;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 500;
  min-height: 147px;
  flex-direction: column;
  padding: 0 20px;
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
`
export const Price = styled.div`
  color: #222;
  font-size: 24px;
  font-weight: 600;
  @media (max-width: 1024px) {
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
    line-height: 22px!important;
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
  @media (max-width: 767px) {
    font-size: 24px;
    line-height: normal;
    padding: 15px;
  }
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
    font-size: 24px;
  }
  @media (max-width: 767px) {
    font-size: 24px;
  }
  span {
    font-size: 18px;
    font-weight: 600;
  }
`