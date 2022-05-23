import styled from 'styled-components'

export const TopWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 6px 0 0;
  width: 100%;
  height: 100%;
  &.leftTabs {
    //max-width: 160px;
    max-width: 160px;
    height: 99%;
    @media (max-width: 1399px) {
      max-width: 160px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      min-height: 768px;
    }
    @media (max-width: 1024px) {
      max-width: 150px;
    }
    @media (max-width: 767px) {
      width: 93px;
      max-width: 100%;
    }
    ul {
      width: 100%;
      min-height: 100%;
    }
  }
  .VendorVerticalTabs {
    width: 100%;
    display: flex;
    height: 100%;
  }

  .VendorVerticalTabs .react-tabs {
    display: flex;
    margin-left: 0;
    width: 100%;
    height: auto;
  }

  .VendorVerticalTabs .react-tabs__tab-list {
    display: flex;
    flex-direction: column;
    max-width: 360px;
    width: 100%;
    margin: 0;
    padding: 30px 0 0 0;
    height: 100%;
  }
  @media screen and (-webkit-min-device-pixel-ratio: 0) {
    .VendorVerticalTabs .react-tabs__tab-list {
      height: 100vh;
    }
  }
  .VendorVerticalTabs .react-tabs__tab {
    list-style: none;
    padding: 3px 6px;
    cursor: pointer;
    color: #444;
    min-height: 35px;
    text-transform: uppercase;
    font-size: 16px;
  }

  /* .VendorVerticalTabs .react-tabs__tab--selected {
  
  } */

  .VendorVerticalTabs .react-tabs__tab-panel {
    display: none;
    width: 100%;
    padding: 0 0px 0 20px;
    background: #fff;
  }

  .VendorVerticalTabs .react-tabs__tab-panel--selected {
    display: block;
  }

  .VendorVerticalTabs .react-tabs__tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    padding: 0 0 35px 0px;
    //margin-left: 200px;
  }

  .VendorVerticalTabs .react-tabs__tab.LabelArtwork .hide {
    display: none;
    transition: 0.3s;
  }

  .VendorVerticalTabs .react-tabs__tab.LabelArtwork:hover {
    display: block;
  }

  .VendorVerticalTabs .react-tabs__tab.LabelArtwork:hover .hide {
    position: absolute;
    background: #fff;
    height: auto;
    width: auto;
    top: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: row;
    right: -90px;
    border: 1px solid #eee;
    text-transform: capitalize;
    padding: 8px 15px;
    font-size: 14px;
    font-family: 'Montserrat-Medium';
    z-index: 2;
  }

  .VendorVerticalTabs .react-tabs__tab--selected:before {
    background: url('/assets/Right_polygon.png') no-repeat top center;
    width: 16px;
    height: 31px;
    content: ' ';
    top: 10px;
    position: relative;
    display: flex;
    text-align: center;
    margin: 0 auto;
    position: absolute;
    right: -15px;
  }

  .VendorVerticalTabs .react-tabs__tab.removeArrow:before {
    display: none;
  }

  .VendorVerticalTabs .react-tabs__tab:focus {
    outline: 0;
  }

  /* .VendorVerticalTabs .react-tabs__tab:hover {
  
  } */

  .VendorVerticalTabs .panel-content {
    padding: 40px;
  }

  @media (max-width: 1499px) {
    .VendorVerticalTabs .react-tabs__tab {
      padding: 0 0 35px 0px;
      margin-left: 0;
    }

    .VendorVerticalTabs .react-tabs__tab-list {
      max-width: 100%;
    }
  }

  @media (max-width: 1024px) {
    .VendorVerticalTabs .react-tabs__tab-list {
      max-width: 150px;
    }

    .VendorVerticalTabs .panel-content {
      padding: 20px;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .VendorVerticalTabs .react-tabs__tab-list,
    .VendorVerticalTabs .react-tabs__tab-panel {
      min-height: 750px;
    }
  }

  @media (max-width: 767px) {
    /* .VendorVerticalTabs {
          flex-direction: column;
      } */
    .VendorVerticalTabs .react-tabs__tab-panel {
      width: calc(100% - 93px);
      padding: 0px 0 0;
    }

    .VendorVerticalTabs .react-tabs__tab-list {
      max-width: 100%;
      width: 93px;
    }

    .VendorVerticalTabs .panel-content {
      padding: 20px;
    }

    .VendorVerticalTabs .react-tabs__tab {
      padding: 0 0 25px 0px;
      margin-left: 0;
    }
  }

  @media (min-width: 992px) and (max-width: 1024px) {
    .VendorVerticalTabs .react-tabs__tab-list {
      min-height: 600px;
    }
  }

  @media (min-width: 768px) and (max-width: 991px) {
    .VendorVerticalTabs .react-tabs__tab-list {
      min-height: 768px;
    }
  }

  @media (min-width: 1400px) and (max-width: 1499px) {
    .VendorVerticalTabs .react-tabs__tab {
      //margin-left: 200px;
    }
  }
`

export const ModalContainer = styled.div`
  background: #fff;
  padding: 20px;
  @media (max-width: 768px) {
    max-width: 100vw;
    box-sizing: border-box;
  }
`
export const ModalHeading = styled.div`
margin: 0 0 15px;
padding: 0;
color: #222;
line-height: normal;
font-size: 20px;
font-weight: 100;
@media (max-width: 767px) {
  font-size: 18px;
}
@media (max-width: 991px) and (orientation: landscape) {
  font-size: 18px;
}
`

export const FullWidthContainer = styled.div`
  position: relative;
  padding: 0;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
  height: 100%;
  @media (max-width: 1280px) {
    width: auto;
  }
  @media (min-width: 600px) and (max-width: 1024px) {
    flex-direction: row;
    flex-wrap: wrap;
  }
  @media (max-width: 599px) {
    flex-direction: column;
  }
`

export const IconWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  @media (max-width: 767px) {
    width: 30px;
  }
  svg {
    font-size: 32px;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
`
export const LeftDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`
export const TabsName = styled.div`
  line-height: 28px;
  font-size: 15px;
  text-align: center;
  @media (max-width: 767px) {
    padding-left: 0px;
    font-size: 10px;
    margin-left: 0px;
    line-height: normal;
    margin-top: 5px;
  }
`

export const CommonSection = styled.div`
  width: 100%;
  &.customPanelContent {
    padding: 40px 40px 0px;
    background: #fff;
    height: 99%;
    @media (min-width: 992px) and (max-width: 1024px) {
      min-height: 600px;
    }
    @media (min-width: 768px) and (max-width: 991px) {
      min-height: 768px;
    }
    @media (max-width: 1024px) {
      padding: 20px;
    }
    @media (max-width: 767px) {
      //max-width: calc(100% - 93px);
      max-width: 100%;
    }
  }
  .link {
    font-weight: bold;
    cursor: pointer;
  }
`

export const HeadingSection = styled.div`
  font-size: 28px;
  line-height: 34px;
  display: flex;
  align-items: center;
  color: #222222;
  border-bottom: 1px solid #e7e9ec;
  padding: 0 0 5px 0;
  margin: 0 0 20px;
  justify-content: space-between;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`
export const UpgradeModal = styled.button`
  background: #fff;
  padding: 20px;
`
export const LearnMoreBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: #eeeeee;
  border: 0;
  padding: 8px 13px;
  font-size: 15px;
  color: #222;
  font-family: 'Montserrat-Medium';
  cursor: pointer;
  margin: 0 0 5px 0;
  svg {
    font-size: 20px;
    margin: 0 0 0 5px;
    @media (max-width: 479px) {
      font-size: 15px;
    }
  }
  @media (max-width: 479px) {
    font-size: 14px;
    margin: 5px 0 0;
    padding: 5px 13px;
  }
  :hover,
  :focus {
    border: 0;
    outline: 0;
  }
`
export const SectionRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  @media (max-width: 479px) {
    flex-direction: column;
  }
  &.RowflexStart {
    justify-content: flex-start;
  }
  &.InnerSecRow {
    justify-content: flex-start;
    @media (max-width: 479px) {
      flex-direction: row;
      flex-wrap: wrap;
    }
  }
`
export const SectionCols = styled.div`
  display: flex;
  flex-direction: column;
  background: #ffffff;
  border: 1px solid #ffffff;
  box-sizing: border-box;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  max-width: 49%;
  padding: 18px;
  margin: 0 0 20px;
  @media (max-width: 479px) {
    max-width: 100%;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

export const SecHeading = styled.div`
  font-size: 15px;
  line-height: 22px;
  padding: 0 0 5px 0;
  margin: 0;
  color: #222;
  span {
    &.link {
      cursor: pointer;
      font-weight: bold;
    }
  }
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`
export const SecDescription = styled.p`
  font-size: 15px;
  line-height: 22px;
  padding: 0;
  margin: 0;
  color: #222;
  @media (max-width: 767px) {
    font-size: 14px;
    line-height: normal;
  }
`
export const FormSection = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
  width: 100%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
  margin: 0 0 15px;
  .CustomBoxSelect {
    width: 100%;
  }
  @media (max-width: 991px) {
    flex-direction: column;
  }
  input,
  textarea {
    margin: 0;
    @media (max-width: 991px) {
      width: auto;
    }
  }
  label {
    max-width: 300px;
    width: 100%;
    align-items: flex-start;
    padding: 8px 0 0;
    color: #222;
    @media (max-width: 991px) {
      width: auto;
    }
  }
  select {
    margin: 0 0 15px;
    @media (max-width: 991px) {
      max-width: 100%;
    }
  }
  button {
    font-family: 'Montserrat-Regular';
    margin: 30px 0 0;
  }
  &.BtnWrap {
    align-items: flex-end;
    justify-content: flex-end;
    button {
      max-width: 200px;
    }
  }
  .Checkboxcontainer {
    margin: 10px 0 10px 0;
    .checkmarkTwo {
      background-color: #fff;
      border: 2px solid #eee;
    }
  }
  .checkmark {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
    border: 2px solid #8c8c8c;
  }
  .container input:checked ~ .checkmark {
    background-color: #fff;
    border: 2px solid #000;
  }
  .container {
    .checkmark {
      background-color: #fff;
      border: 2px solid #eee;
      :after {
        width: 16px;
        height: 16px;
      }
    }
  }
  &.CheckboxLandscape {
    .PositionCheckbox {
      margin-top: 10px;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      flex-direction: row;
    }
    .Checkboxcontainer {
      @media (max-width: 991px) and (orientation: landscape) {
        margin: 10px 0 10px 15px;
      }
    }
  }
  &.RadioLandscape {
    @media (max-width: 991px) and (orientation: landscape) {
      flex-direction: row;
    }
    .Checkboxcontainer {
      @media (max-width: 991px) and (orientation: landscape) {
        margin: 10px 0 10px 15px;
      }
    }
  }
`
export const InnerTabsName = styled.div`
  line-height: 28px;
  font-size: 15px;
  text-align: center;
  @media (max-width: 767px) {
    font-size: 12px;
    line-height: normal;
  }
`

export const TopHeading = styled.div`
  font-size: 24px;
  line-height: 29px;
  color: #000000;
  padding: 0 0 25px 0;
  margin: 0;
  @media (max-width: 767px) {
    font-size: 18px;
    line-height: normal;
  }
  &.InnerHeading {
    display: flex;
    justify-content: center;
    flex-direction: column;
    text-align: center;
    max-width: 380px;
    align-items: center;
    @media (max-width: 767px) {
      max-width: 100%;
    }
    span {
      font-size: 15px;
      line-height: normal;
      text-align: center;
      margin: 10px 0 0;
      max-width: 196px;
    }
  }
`
export const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  @media (max-width: 1024px) {
    margin: 0 0px 30px 0;
  }
  > :first-child {
    margin: 3px 10px 0 0;
  }
  &.RadioLandscapeIpad {
    @media (max-width: 1024px) {
      margin-right: 25px;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      margin-right: 25px;
    }
  }
`
export const RadioLabelText = styled.div`
  font-size: 15px;
  color: #000000;
  padding: 0;
  margin: 3px 0 0 20px;
  &.quick-edit-modal {
    margin: 3px 0 0 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

export const SectionHalfCols = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 380px;
  margin: 0 0 20px;
  width: 100%;
  &.subscription-table {
    max-width: 330px;
  }
  @media (max-width: 1399px) {
    max-width: 320px;
  }
  @media (max-width: 1024px) {
    max-width: 250px;
  }
  @media (max-width: 991px) {
    max-width: 100%;
  }
  &.P-L-80 {
    padding-left: 80px;
    @media (max-width: 1399px) {
      padding-left: 15px;
    }
    @media (max-width: 1024px) {
      padding-left: 15px;
    }
    @media (max-width: 991px) {
      padding-left: 0px;
    }
  }
`
export const ColsListing = styled.div`
  background: #f5f5f5;
  display: flex;
  align-items: center;
  padding: 15px;
  margin: 0 0 3px;
  min-height: 30px;
  justify-content: space-between;
`
export const ColsListingText = styled.div`
  font-size: 13px;
  line-height: normal;
  color: #000000;
  padding: 0;
  margin: 0;
  max-width: 175px;
  width: 100%;
`
export const ImgDiv = styled.div`
  display: flex;
  width: 50%;
  align-items: center;
  justify-content: center;
`
export const PaymemtsWrap = styled.div`
  display: flex;
  margin: 0 0 30px;
  flex-direction: column;
`

export const PaymemtsSection = styled.div`
  display: flex;
  align-items: center;
  margin: 0 0 12px;
  justify-content: flex-start;
  flex-direction: row;
  font-size: 18px;
  line-height: normal;
  color: #000000;
  &.reactivatePayment {
    justify-content: center;
  }
  button {
    max-width: 205px;
    font-family: 'Montserrat-Regular';
  }
  span {
    margin: 0 0 0 5px;
    @media (max-width: 767px) {
      margin: 0;
    }
    @media (max-width: 991px) and (orientation: landscape) {
      margin: 0 0 0 5px;
    }
  }
  @media (max-width: 1024px) {
    font-size: 14px;
  }
  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    flex-direction: row;
  }
`

export const DowngradeLink = styled.a`
  font-size: 14px;
  line-height: normal;
  color: #000000;
  cursor: pointer;
  margin: 10px 0;
`

export const InputWarp = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 300px);
  margin: 0 0 15px;
  .select-option {
    option {
      padding-left: 200px;
    }
  }
  @media (max-width: 991px) {
    width: auto;
  }
  span {
    color: #d62d1e;
    font-size: 13px;
    margin-top: 5px;
  }
  &.TimeSelect {
    .MuiFormControl-root {
      margin: 0;
    }
    .MuiSelect-select {
      padding: 0 10px;
      min-height: 32px;
      border-radius: 0;
      background: #fff;
      border: 2px solid #eee;
      margin: 0;
      font-size: 15px;
      font-family: 'Montserrat-Regular';
    }
    .MuiFilledInput-underline:before,
    .MuiFilledInput-underline:after {
      display: none;
    }
  }
`
export const SectionHalfColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 0 20px;
  width: 100%;
  max-width: 48%;
  @media (max-width: 991px) {
    max-width: 100%;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
  &.margin-l-15 {
    margin-top: 15px;
  }
`
export const ArtworkTypeNote = styled.p`
color: #666;
font-size: 14px;
line-height: 1.8;
`
export const ImgMainContainer = styled.div`
  display: flex;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px;
  width: 100%;
  border: 2px solid #eeeeee;
  height: auto;
  min-height: 350px;
  @media (max-width: 991px) {
    height: 200px;
    widht: 100%;
  }
  svg {
    font-size: 48px;
    color: #ccc;
    @media (max-width: 991px) {
      font-size: 48px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

export const SubHeader = styled.div`
  font-size: 18px;
  text-align: center;
  margin-top: 20px;
`

export const SubSectionHeader = styled.div`
  font-size: 15px;
  margin: 36px 0 12px;
  font-family: 'Montserrat-Medium';
`

export const ImgSmContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px 20px 0;
  width: 160px;
  border: 2px solid #eeeeee;
  height: 80px;
  cursor: pointer;
  position: relative;
  @media (max-width: 479px) {
    width: 80px;
  }
  @media (max-width: 343px) {
    width: 90px;
    height: 90px;
  }
  .delete-img {
    position: absolute;
    right: 5px;
    top: 5px;
    width: auto;
    height: auto;
    border-radius: 50%;
    background: #fff;
    padding: 2px;
    font-size: 12px;
    color: #000;
    cursor: pointer;
  }
  svg {
    font-size: 48px;
    color: #ccc;
    @media (max-width: 991px) {
      font-size: 24px;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`
export const AddImgContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0 20px;
  width: 60px;
  border: 0;
  height: 80px;
  cursor: pointer;
  svg {
    font-size: 24px;
    color: #222;
    @media (max-width: 991px) {
      font-size: 18px;
    }
  }
`
export const FormGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 0 0 15px;
  .react-autosuggest__container {
    border: 2px solid #eee;
    border-color: ${(props) => (props.hasError ? '#d62d1e' : '#eee')};
    color: #666;
    font-size: 15px;
    font-weight: 400;
    height: 36px;
    margin: 0 0 10px;
    padding: 0 15px;
    appearance: none;
    border-radius: 0;
    :focus {
      outline: none;
    }
    ::placeholder {
      color: ${(props) => (props.placeholderColor ? props.placeholderColor : '#666')};
      font-weight: 400;
    }
  }
  .hide {
    visibility: hidden;
  }
  .fade {
    opacity: 0.5;
    pointer-events: none;
  }
  .reqCheckArtist {
    border: 2px solid #d30700;
  }
  @media (max-width: 991px) {
    flex-direction: column;
  }
  &.AddFrame {
    min-width: 130px;
  }
  &.MarginTop {
    margin-top: 20px;
  }
  &.WithErr {
    flex-direction: column;
  }
  &.FlexWrap {
    flex-wrap: wrap;
  }
  &.FlexStart {
    justify-content: flex-start;
    align-items: center;
    > :first-child {
      margin: -2px 30px 0 0;
    }
    // .PositionCheckbox {
    //   margin-top: -15px !important;
    // }
  }
  &.SmFlexStart {
    @media (max-width: 991px) {
      flex-direction: row;
      margin: 0 0 15px 0;
    }
  }
  &.AlignCenter {
    justify-content: center;
  }
  &.artistDetails {
    flex-direction: row !important ;
    .InnerSectionHalfColumn {
      width: 49%;
    }
  }
  &.Mdwidth {
    @media (max-width: 1450px) {
      flex-direction: column;
    }
    &.SmMdWidth {
      @media (max-width: 1024px) {
        flex-direction: row;
        justify-content: flex-start;
      }
      @media (max-width: 479px) {
        flex-direction: column;
      }
      .InnerSectionHalfColumn {
        @media (max-width: 1024px) {
          max-width: 150px;
          margin-right: 10px;
        }
        @media (max-width: 479px) {
          max-width: 100%;
          margin-right: 0px;
        }
      }
    }
  }
  &.Smallwidth {
    @media (min-width: 992px) and (max-width: 1024px) {
      flex-direction: column;
      align-items: flex-start;
    }
    > :first-child {
      @media (max-width: 1024px) {
        margin-bottom: 10px;
      }
    }
    @media (max-width: 991px) {
      flex-direction: row;
    }
    @media (max-width: 767px) {
      flex-direction: column;
      align-items: flex-start;
    }
  }
  &.MobileRow {
    @media (max-width: 1024px) {
      flex-direction: row;
      align-items: center;
    }
  }
  input {
    /* width: 100%; */
    @media (max-width: 767px) {
      font-size: 14px;
    }
    :placeholder {
      color: #666;
    }
  }
  select {
    height: 40px;
    @media (max-width: 767px) {
      font-size: 14px;
      padding-right: 30px;
    }
  }
  textarea {
    //padding: 10px 15px 10px;
    //height: 40px;
    padding: 10px;
    // height: 40px;
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  .w100 {
    width: 100%;
    @media (max-width: 991px) {
      width: auto;
    }
  }
  &.IpadHalf {
    @media (min-width: 1400px) and (max-width: 1850px) {
      flex-direction: row;
    }
    @media (max-width: 1399px) {
      flex-direction: column;
      align-items: center;
    }
    .InnerSectionHalfColumn {
      @media (max-width: 1399px) {
        margin-bottom: 10px;
      }
    }
  }
  .InnerSectionHalfColumn {
    margin-bottom: 0;
    &.hdFieldsSpc {
      margin-bottom: 15px;
    }
    @media (min-width: 1400px) and (max-width: 1850px) {
      &:first-of-type {
        margin-right: 10px;
      }
    }
    input {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 90%;
      @media (min-width: 1400px) and (max-width: 1850px) {
        max-width: 90%;
      }
    }
    @media (min-width: 1400px) and (max-width: 1850px) {
      max-width: 100%;
    }
    @media (max-width: 1399px) {
      max-width: 100%;
    }
    .max-width-100 {
      @media (min-width: 1400px) and (max-width: 1850px) {
        max-width: 100%;
      }
      @media (min-width: 320px) and (max-width: 1399px) {
        max-width: 100%;
      }
      &.margin-l-15 {
        @media (min-width: 1400px) and (max-width: 1850px) {
          margin-left: 15px;
        }
      }
    }
    &.margin-b-15 {
      input {
        max-width: inherit;
      }
      @media (max-width: 1450px) {
        margin-bottom: 15px;
      }
    }
    &.YearWrap {
      flex-direction: row;
      @media (min-width: 1400px) and (max-width: 1850px) {
        display: flex;
        align-items: flex-end;
      }
      .wd100 {
        width: 100% !important ;
      }
      input {
        flex: 1;
        max-width: 100%;
      }
    }
  }
  &.FrameDimension {
    flex: 1;
    justify-content: flex-start;
    &.FrameDimension {
      flex-direction: row;
      @media (max-width: 768px) {
        flex-direction: column;
      }
    }
    .InnerSectionHalfColumn {
      width: 49%;
      max-width: none!important;
      &:last-of-type {
        margin-right: 0px;
      }
      
      input {
        max-width: 100%;
        box-sizing: border-box;
      }
    }
  }
  .Checkboxcontainer {
    margin: 0px 0 30px 0;
    .checkmarkTwo {
      background-color: #fff;
      border: 2px solid #eee;
    }
  }
  .checkmark {
    position: absolute;
    top: 2px;
    left: 0;
    height: 20px;
    width: 20px;
    background-color: #eee;
    border-radius: 50%;
    border: 2px solid #8c8c8c;
  }
  .container input:checked ~ .checkmark {
    background-color: #fff;
    border: 2px solid #000;
  }
  .container {
    .checkmark {
      background-color: #fff;
      border: 2px solid #eee;
      :after {
        width: 16px;
        height: 16px;
      }
    }
  }
  .InnerText {
    margin: 3px 0 0 0px;
    display: flex;
    align-items: center;
    svg {
      margin: 0 0 0 10px;
      width: 24px;
    }
  }
  .CheckboxText {
    margin: 0 0 0 0px;
    display: flex;
    align-items: center;
    position: relative;
    svg {
      margin: 0 0 0 10px;
      width: 28px;
    }
    @media (max-width: 767px) {
      font-size: 14px;
    }
  }
  &.InputFormGroup {
    justify-content: flex-start;
    margin: 0 0 12px;
    @media (min-width: 768px) and (max-width: 991px) {
      flex-direction: row;
    }
    .InputFormGroupDiv {
      align-items: center;
    }
    .InputGroup {
      display: flex;
      justify-content: flex-start;
      @media (max-width: 479px) {
        flex-direction: column;
      }
      input {
        margin-left: 5px;
        margin-right: 5px;
        max-width: 70px;
        @media (max-width: 1024px) {
          padding: 0 5px;
        }
        @media (max-width: 767px) {
          max-width: 100%;
          padding: 0 10px;
        }
        @media (max-width: 479px) {
          max-width: 100%;
          padding: 0 10px;
        }
      }
    }
  }
  .PriceErrorDiv {
    padding: 16px 0 0 0;
    width: 45%;
    @media (max-width: 1024px) {
      width: 35%;
      input {
        width: 100%;
      }
    }
  }
  &.shippingPrice {
    .InnerSectionHalfColumn {
      margin-bottom: 15px !important;
    }
  }
  .reqInp {
    border-left: 4px solid #d30700 !important ;
    &.wd100 {
      width: 100% !important ;
    }
  }
`

export const MainSizer = styled.div`
  display: flex;
  flex: 0 0 100%;
  align-items: center;
  margin: 10px 0;
  flex-wrap: wrap;
`

export const OrDivider = styled.div`
  font-size: 15px;
  line-height: 19px;
  color: #000000;
  margin: 0 20px;
  .fade {
    opacity: 0.5;
  }
  @media (max-width: 991px) {
    margin: 5px 20px 5px;
  }
  @media (max-width: 479px) {
    margin: 5px 20px 5px;
  }
`
export const CheckboxContainerMain = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  > :first-child {
    margin: 0 10px 0 0;
  }
  &.quick-edit-modal {
    margin: 0 0 10px 0;
    > :first-child {
      margin: 0;
    }
  }
  .CheckboxText {
    top: 1px;
    left: 20px;
  }
`
export const OptionsWrapper = styled.div`
  display: flex;
  margin: 10px -5px 30px;
`

export const CustomCheckBoxWrap = styled.div`
  font-size: 15px;
  min-width: 130px;
  line-height: 19px;
  margin: 0 0 10px;
  color: #000000;
  display: flex;
  justify-content: flex-start;
  > :nth-child(2) {
    margin: 0 8px 0;
    padding-top: 7px;
  }
`
export const CustomCheckBoxLabel = styled.label`
  font-size: 15px;
  line-height: 22px;
  color: #000000;
  margin: 0;
  padding: 0;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

export const FormSectionWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  margin: 0 0 8px;
  @media (max-width: 991px) {
    flex-direction: column;
  }
  input {
    margin: 0 0 15px;
    @media (max-width: 991px) {
      width: auto;
    }
  }
  label {
    max-width: 120px;
    font-family: 'Montserrat-Medium';
    width: 100%;
    align-items: flex-start;
    padding: 8px 0 0;
    color: #000;
    text-transform: uppercase;
    font-size: 15px;
    @media (max-width: 991px) {
      width: auto;
    }
  }
  .mkWid-100 {
    width: 100%;
  }
  .CustomBoxSelect {
    width: 100%;
    background: #eee;
    border: 0;
  }
  .width-min {
    background-color: transparent;
  }
  .width-max:focus,
  .width-max:hover {
    background-color: transparent;
  }
  .tagsInput {
    width: auto;
    .chip-margin {
      background: #ffffff;
      box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
      font-size: 15px;
      color: #222222;
      border-radius: 0;
    }
    @media (max-width: 991px) {
      width: auto;
      padding: 5px 10px;
    }
    .Checkboxcontainer {
      margin: 10px 0 10px 0;
      .checkmarkTwo {
        background-color: #fff;
        border: 2px solid #eee;
      }
    }
  }
`
export const BottomBtnsWrap = styled.div`
  font-size: 15px;
  line-height: 19px;
  color: #000000;
  margin: 30px 0 10px;
  display: flex;
  justify-content: center;
  @media (max-width: 767px) {
    flex-direction: column;
  }
  .SubmitBtn {
    min-width: 180px;
    margin: 0 0 0 15px;
    @media (max-width: 767px) {
      max-width: 100%;
      margin: 0;
    }
  }
  .DraftBtn {
    min-width: 180px;
    @media (max-width: 767px) {
      max-width: 100%;
      margin: 0 0 15px;
    }
  }
`
export const FormStep = styled.div`
  max-height: 400px;
  max-width: 600px;
  padding: 0 30px;
  box-sizing: border-box;
  width: 100%;
  margin: auto;
  overflow: scroll;
  margin-bottom: 20px;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  &.MaxWidth {
    max-width: none;
  }
  p {
    line-height: 2;
  }
`
export const FirstStepOption = styled.div`
  padding: 20px 20px 5px;
  margin: 0 5px;
  box-sizing: border-box;
  border: 2px solid #eee;
  width: 50%;
  cursor: pointer;
  text-align: center;
  &.marked {
    border: 2px solid #222;
  }
`

export const SearchRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  @media (max-width: 479px) {
    flex-direction: column;
    align-items: flex-start;
  }
`
export const Pagination = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  font-size: 14px;
  color: #000000;
  select {
    width: 60px;
    margin: 0 12px;
    padding: 0 10px;
    color: #000000;
  }
`
export const HeaderSearchBar = styled.div`
  display: flex;
  width: 219px;
  height: 36px;
  margin: 0 0 0 21px;
  background: #fff;
  border: 2px solid #eee;
  @media (max-width: 991px) {
    width: 170px;
  }
  @media (max-width: 479px) {
    margin: 15px 0 0;
    width: 100%;
  }
`
export const SearchIcon = styled.div`
  width: 32px;
  height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 22px;
    color: #000;
    font-weight: bold;
  }
`

export const HeadingBtnWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 479px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const SearchInput = styled.input`
  width: calc(100% - 32px);
  height: 36px;
  color: #222;
  background: transparent;
  border: 0;
  font-size: 15px;
  font-weight: 400;
  padding: 0;
  ::placeholder {
    color: #666;
  }
  :focus,
  :hover {
    outline: none;
    border: 0;
  }
`

export const ErrorText = styled.span`
  color: #d62d1e;
  font-size: 12px;
  line-height: 15px;
  display: flex;
  align-items: center;
  padding-bottom: 2px;
  &.checkBoxError {
    position: relative;
    bottom: 15px;
  }
`
export const CustomTabsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  height: 100%;
  @media (max-width: 767px) {
    justify-content: flex-start;
  }
`
export const AddNewBtn = styled.div`
  background: #222222;
  font-style: normal;
  color: #fff;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 15px;
  margin: 0px 0 0 15px;
  cursor: pointer;
  width: 100%;
  font-family: 'Montserrat-Medium';
  font-weight: 100;
  text-transform: capitalize;
  text-align: center;
  align-items: center;
  justify-content: center;
  display: flex;
  padding: 1px 13px;
  :hover,
  :focus {
    background: #222222;
    outline: none;
  }
  svg {
    font-size: 22px;
    color: #fff;
    font-weight: bold;
    margin: 0 0 0 5px;
    @media (max-width: 479px) {
      font-size: 15px;
    }
  }
  @media (max-width: 479px) {
    font-size: 14px;
    margin: 5px 0;
    padding: 5px 10px;
  }
`
export const QuickEditModalWrapper = styled.div`
  min-width: 283px;
  max-width: 283px;
  padding: 30px;
  background: #fff;
  @media (max-width: 479px) {
    padding: 15px;
    min-width: 270px;
    max-width: 270px;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    max-height: 60vh;
    overflow-y: auto;
  }
`
export const TopHeaderBar = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  color: #222222;
  margin-bottom: 20px;
  @media (max-width: 767px) {
    margin-top: 10px;
  }
  @media (max-width: 479px) {
    font-size: 15px;
  }
  img {
    width: 35px;
    height: 35px;
    object-fit: cover;
    @media (max-width: 479px) {
      width: 24px;
      height: 24px;
    }
  }
`
export const ModalForm = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  flex-direction: column;
  input {
    font-size: 15px;
    height: 32px;
    padding: 0 10px;
    color: #222;
  }
  textarea {
    color: #222;
    padding-left: 10px;
  }
`

export const CustomOption = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin: 10px 0 0 0;
`
export const CustomOptionLabel = styled.label`
  font-size: 15px;
  color: #000;
  text-transform: capitalize;
  &.M-Left {
    margin: 0 12px 0 0;
  }
`
export const CloseWrap = styled.div`
  position: absolute;
  top: 9px;
  right: 6px;
  @media (max-width: 767px) {
    top: 3px;
    right: 3px;
  }
`
export const DimensionsInput = styled.div`
  display: flex;
  width: calc(100% - 107px);
  justify-content: flex-start;
  @media (max-width: 991px) {
    width: 100%;
    margin-left: 10px;
  }
  @media (max-width: 767px) {
    width: 100%;
    margin-left: 0px;
  }
  &.digital {
    width: 100%;
  }
  &.DimensionsInput {
    div {
      width: 33.3%;
    }
  }
  div {
    width: 50%;
    padding: 0;
    box-sizing: border-box;
    margin: 0 10px 0 0;
    &:last-child {
      margin-right: 0px;
    }
    input {
      width: 100%;
      box-sizing: border-box;
      @media (min-width: 992px) and (max-width: 1024px) {
        font-size: 12px;
        padding: 0 5px;
      }
      @media (max-width: 767px) {
        font-size: 12px;
        padding: 0 5px;
      }
    }
  }
`
export const SectionLabel = styled.label`
  color: #000;
  font-size: 15px;
  font-weight: bold;
  margin: 5px 0 15px;
  padding: 0;
  text-transform: uppercase;
  &.margin-t-15 {
    margin-top: 15px;
  }
`

export const TimePeriodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`
export const TabsWrapperMob = styled.div`
  width: 100% !important;
  position: fixed;
  bottom: 0;
  left: 0;
  padding-bottom: 0px;
  top: auto;
  text-align: center !important;
  border-top: #cccccc 1px solid;
  border-right: 0px;
  display: flex;
  justify-content: space-evenly;
  z-index: 999;
  background: #ccc;
  height: 56px;
  padding: 5px 10px;
  padding-bottom: 5px;
  overflow: hidden;
  box-sizing: border-box;
  .menuName {
    list-style: none;
    padding: 0;
    box-sizing: border-box;
    position: relative;
    bottom: 15px;
    li {
      width: 59px;
      height: 60px;
      margin: 0;
      display: inline-block;
      box-sizing: border-box;
      cursor: pointer;
      div {
        height: 50px;
        border: 0px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 0px;
        padding-left: 0px;
        box-shadow: none;
        svg {
          font-size: 20px;
        }
        .menuLabel {
          font-size: 6px;
        }
      }
    }
  }
`

export const ProfileCompletionModalWrap = styled.div`
  background: #fff;
  margin: 20x;
  padding: 15px;
  width: auto; 
  max-width: 350px;
  @media( max-width: 767px ) {
    margin: 0 10px ;
  }
  & div {
    flex-direction: column ;
    
    & h1 {
      font-size: 18px ;
      @media( max-width: 767px ) {
        flex-direction: row !important ; 
      }
      & span {
        margin-left: 2px;
        @media( max-width: 767px ) {
          margin: 0px !important 
        }
      }
    }
  }
`

export const ProfileIncompleteText = styled.h2`
font-size: 18px;
text-align: center;
margin-top: 25px;
`
export const ProfileIncompleteSubText = styled.p`
  font-size: 14px;
  text-align: center;
  margin-top: 10px auto;
`

export const ProfileButton = styled.button`
background: #000;
color: #fff;
padding: 20px;
border: 1px solid #fff;
text-align: center;
margin: 10px auto;
display: block;
`
export const StepHeader = styled.div`
  text-align: center;
  font-size: 28px;
  margin-bottom: 30px;
  flex: 0 0 100%;
  line-height: 1.8;
  @media (max-width: 768px) {
    font-size: 20px;
  }
`
