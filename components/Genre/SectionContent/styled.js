import styled from 'styled-components'

export const CommonWrapper = styled.div`
  margin: 0;
  padding: 20px 0;
  .MuiAppBar-colorPrimary {
    box-shadow: none !important;
    background: transparent;
    margin-top: 0px !important;
  }
  .MuiButtonBase-root.MuiTab-root {
    border: 1px solid #ccc;
    border-bottom: 0;
  }
  .InnerTabContent {
    border: 1px solid #ccc;
    margin-top: -1px;
    padding: 0 20px;
  }
`

export const InnerCommonHeading = styled.div`
  margin: 0 0 20px;
  padding: 0 0 10px;
  color: #222;
  font-size: 24px;
  line-height: normal;
  font-family: 'Montserrat-Regular';
  border-bottom: 1px solid #dadada;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 18px;
  }
  &.HeadingIcon {
    display: flex;
    justify-content: space-between;
    svg {
      color: #000;
      cursor: pointer;
    }
    span {
      max-width: calc(100% - 30px);
    }
  }
`

export const RowSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`
export const ColumnSection = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 48%;
  @media (max-width: 767px) {
    max-width: 100%;
  }
`
export const InnerRowSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
  &.ButtonRow {
    width: 100%;
  }
`

export const InnerHeading = styled.div`
  margin: 0;
  padding: 0 0 10px;
  color: #222;
  font-size: 18px;
  line-height: normal;
  font-family: 'Montserrat-Regular';
  sup {
    font-size: 10px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`

export const DescriptionText = styled.p`
  margin: 0;
  padding: 0 0 10px;
  color: #666;
  font-size: 14px;
  line-height: normal;
  font-family: 'Montserrat-Regular';
  a {
    color: #000;
    text-decoration: none;
  }
  .ThoughtLine {
    border-left: 1px solid #666;
    padding: 0 0 0 13px;
    font-size: 18px;
    line-height: 24px;
    display: block;
    margin: 0 0 0 10px;
    font-style: normal;
  }
  ul {
    list-style-type: circle;
    margin: 0 0 0 20px;
    padding: 0;
    li {
      margin: 0;
      padding: 0 0 5px;
    }
  }
`

export const BtnWrap = styled.div`
  button {
    width: auto;
    padding: 8px 15px;
    height: auto;
    font-family: 'Montserrat-Regular';
    background: #000;
    @media (min-width: 992px) and (max-width: 1024px) {
      font-size: 12px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
  }
  &.ButtonRowCol {
    display: flex;
    justify-content: space-between;
    width: 100%;
    @media (max-width: 767px) {
      flex-direction: column;
    }
  }
`
export const InnerBanner = styled.div`
  width: 100%;
  margin: 0 0 30px;
  img {
    max-height: 200px;
    width: 100%;
  }
`
export const BannerLabel = styled.div`
  text-align: right;
  font-size: 12px;
  color: #666;
  margin: 5px 0 0;
`

export const InnerImgWrap = styled.div`
  max-width: 200px;
  margin: 20px auto;
  img {
    width: 100%;
  }
`

export const MailIcon = styled.div`
  cursor: pointer;
  svg {
    color: #000;
    font-size: 24px;
  }
`

export const MailBtn = styled.div`
  cursor: pointer;
  svg {
    color: #000;
    font-size: 24px;
  }
`
export const LeftSection = styled.div`
  width: 210px;
  @media (max-width: 767px) {
    margin: 0 auto 15px;
  }
`

export const ImageSec = styled.div`
  border: 1px solid #ccc;
  background: #eee;
  width: 100%;
  margin: 0 0 20px;
`

export const ImgSec = styled.div`
  width: 100%;
  img {
    width: 100%;
  }
`

export const ImgLabel = styled.div`
  width: 100%;
  text-align: center;
  font-size: 12px;
  color: #666;
  margin: 0 0 5px;
`
export const RightContentSection = styled.div`
  max-width: calc(100% - 225px);
  width: 100%;
  padding-left: 15px;
  @media (max-width: 767px) {
    max-width: 100%;
    padding-left: 0px;
  }
`

export const ButtonBottom = styled.div`
  width: 100%;
  display: flex;
  button {
    width: auto;
    margin: 0 10px 0 0;
    height: auto;
    padding: 7px 15px;
    background: #000;
  }
`
