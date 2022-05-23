import styled from 'styled-components'

export const TopWrapper = styled.div`
  position: relative;
  margin: 0;
  padding: 0;
  width: 100%;
  @media (max-width: 991px) {
    margin: 0;
  }
  &.detail-section {
    margin-top: 37px;
  }
`

export const FullWidthBanner = styled.div`
  position: relative;
  padding: 0;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  display: flex;
  width: 100%;
  height: 160px;
  background: url(${(props) => props.banner});
  background-color: black;
  background-size: cover;
  background-position: center;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(127, 127, 127, 0.5);
    background-image: radial-gradient(black 33%, transparent 33%);
    background-size: 2px 2px;
  }
  img {
    width: 100%;
    height: 100%;
    max-height: 160px;
  }
`
export const ArtworkBannerName = styled.div`
  position: absolute;
  font-size: 35px;
  text-transform: uppercase;
  color: #ffffff;
  text-align: center;
  padding: 0 30px;
  @media (max-width: 1024px) {
    font-size: 35px;
    padding: 0 15px;
  }
`

export const CommonWrapper = styled.div`
  position: relative;
  margin: 18px 0 0 0;
  padding: 0;
  width: 100%;
`

export const CommonContainer = styled.div`
  width: 100%;
  max-width: 1290px;
  padding: 0 15px;
  margin: 0 auto;
  flex-direction: row;
  justify-content: space-between;
  display: flex;
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
export const LeftContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 350px;
  /* @media (min-width: 1025px) and (max-width: 1199px) {
    max-width: 350px;
    margin: 0 auto 20px;
  } */
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 28%;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 100%;
    margin: 0 auto 20px;
  }
  @media (max-width: 767px) {
    margin: 0 auto 20px;
    max-width: 100%;
  }
`
export const RightContainer = styled.div`
  width: 100%;
  position: relative;
  max-width: 980px;
  margin-left: 15px;
  margin-bottom: 30px;
  /* @media (min-width: 1025px) and (max-width: 1199px) {
    max-width: 625px;
  } */
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 675px;
  }
  @media (max-width: 991px) {
    margin: 0 auto;
    max-width: 100%;
  }
`
export const FiltersWrap = styled.div`
  width: 300px;
  //margin-top: 30px;
  padding: 0 15px 0 0;
  @media (max-width: 1023px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  &.make-sticky {
    // position: -webkit-sticky;
    position: fixed;
    top: 10%;
    height: calc(100vh - 100px);
    overflow: auto;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
  // &.addScr {
  //   height: calc(100vh - 100px);
  //   overflow: auto;
  //   overflow-x: hidden;
  // }
  & .filterLoc {
    margin: ${(props) => (props.isLogin ? '0 auto 70px' : '0 auto 7px')};
    font-size: 12px;
    min-height: 40px;
    min-width: 100%;
    > svg {
      font-size: 15px!important;
    }
  }
  & .filterSec{
    min-height: 40px;
    div {
      min-height: 40px;
      font-size: 13px;
    }
    @media( max-width: 1024px ) {
      min-width: 100% ;
    }
  }
  &.detailPgFilter{
    margin-top: 30px ;
  }
`
export const FiltersBox = styled.div`
  padding: 0px 15px;
  background: #fff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  margin: 0 0 7px;
  .sizeSlider {
    margin: 12px 0;
  }
  & .sizeValue {
    font-size: 12px ;
  }
  .size {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px ;
  }
  .rc-slider {
    width: calc(100% - 12px);
    margin: 0 6px;
  }
  .rc-slider-handle {
    border: solid 2px #000000;
    background-color: #000;
  }
  .rc-slider-handle-dragging {
    box-shadow: none;
    border-color: #000;
  }
  .rc-slider-handle:hover,
  :focus,
  :active {
    /* box-shadow: none; */
    border-color: none;
  }
  .rc-slider-track {
    background-color: grey;
  }
  @media (max-width: 767px) {
    padding: 0px 10px;
  }
  &.TopPadding {
    //padding: 15px;
    padding: 11px 15px ;
    @media (max-width: 767px) {
      padding: 10px;
    }
  }
  &.resetBox {
    background-color: #9e9e9e !important;
    background: #9e9e9e;
    background-color: rgb(158, 158, 158);
    color: #fff;
    text-transform: capitalize;
    border: 0px;
    border-radius: 0px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    padding: 5px;
  }
  &.SizeSelect {
    min-height: 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    .size {
      width: 100%;
      align-items: center;
      font-size: 12px ;
      span {
        svg {
          font-size: 24px;
          cursor: pointer;
        }
      }
    }
    select {
      border: 0;
      font-size: 16px;
      color: #222;
      padding: 0 10px 0 0;
      margin: 0;
      background: url('/assets/black-arrow.png') no-repeat right 10px center;
      @media (max-width: 767px) {
        font-size: 14px;
      }
    }
  }
`
export const GiftCardButton = styled.button`
  font-weight: 100;
  font-size: 18px;
  line-height: 22px;
  text-align: center;
  color: #fff;
  background: #222;
  width:auto;
  padding:7px 15px;
  border: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin: 0 auto;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    color: #fff;
    background: #222;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    padding: 5px 10px;
    margin-bottom: 20px;
    width:100px;
  }
`
export const HeadingRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin: 0 0 7px;
  select {
    width: 70px;
    font-size: 13px;
    height: 25px;
    color: #222;
    padding: 0 10px;
    margin: 0;
    text-transform: uppercase;
    background-size: 10px;
    @media (max-width: 767px) {
      font-size: 12px;
    }
  }
`
export const PriceHeading = styled.div`
  font-size: 12px;
  color: #222;
  @media (max-width: 767px) {
    font-size: 12px;
  }
`
export const SearchBar = styled.div`
  display: flex;
  width: 100%;
  height: auto;
  margin: 0;
  background: #fff;
  font-size: 12px;
  max-height: 40px;
  align-items: center;
  justify-content: space-between;
  .CustomBoxSelect {
    width: 100%;
    display: flex;
    align-items: center;
  }
  // &.type-rad{
  //   margin: 0px;
  //   @media( min-width: 1025px){
  //     margin-left: 10px ;
  //   }
  // }
  &.resetLink {
    display: flex;
    justify-content: center;
    align-items: center;
    background: transparent;
    span {
      cursor: pointer;
    }
  }
`
export const SearchIcon = styled.div`
  width: 15px;
  height: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 22px;
    color: #222;
    font-weight: bold;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
`

export const SearchInput = styled.input`
  width: calc(100% - 32px);
  height: 40px;
  color: rgb(34, 34, 34);
  background: transparent;
  border: 0px;
  font-size: 12px;
  font-weight: 400;
  padding: 0px;
  ::placeholder {
    color: #aaa;
  }
  :focus,
  :hover {
    outline: none;
    border: 0;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
`

export const ListingWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  /* justify-content: space-between; */
  .infinite-scroll-component {
    /* display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start; */
    .MasonryGrid {
      @media (max-width: 991px) {
        text-align: center;
      }
    }
  }
  .infinite-scroll-component__outerdiv {
    width: 100%;
  }
  .end-message-container {
    margin: 0 auto;
  }
  &.Loading {
    justify-content: flex-start;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`

export const BackButton = styled.div`
  background: #000;
  position: absolute;
  top: 100px;
  left: 0;
  color: #fff;
  font-size: 50px;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 5px;
  z-index: 1;
  height: 50px;
  cursor: pointer;
  @media (max-width: 767px) {
    display: none;
  }
`

export const GhostStyling = styled.div`
  position: relative;
  max-width: 270px;
  width: 100%;
  /* margin: 0 10px 20px 0; */
  margin: 0 5px 20px 0;
  /* justify-content: flex-start; */
  @media (min-width: 992px) and (max-width: 1024px) {
    max-width: 270px;
    margin: 0 auto 20px;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    max-width: 270px;
    margin: 0 auto 20px;
  }
  @media (max-width: 767px) {
    max-width: 45%;
    margin: 0 auto 20px;
  }
  @media (max-width: 479px) {
    max-width: 275px;
    margin: 0 auto 20px;
  }
`

export const MuseumLabel = styled.div`
  background: #fff;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 5px;
  padding: 12px 24px;
  margin-bottom: 20px;
`

export const ArtworkDetailWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 30px;
  @media( max-width: 1023px ) {
    margin-top: 5px ;
  }
`

export const FollowButton = styled.div`
  background: #eee;
  font-style: normal;
  color: #222;
  margin-left: 10px;
  text-transform: capitalize;
  border: 0;
  outline: 0;
  align-items: center;
  font-size: 14px;
  cursor: pointer;
  padding: 4px 11px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  display: flex;
  justify-content: center;
  svg {
    margin-right: 4px;
  }
  @media (max-width: 767px) {
    margin: 20px 0 10px;
  }
`
export const ImageOverlay = styled.div`
  width: 100%;
  position: absolute;
  height: 100%;
  cursor: ${(props) => (props.artworkType === 'digital' ? '' : 'zoom-in!important')};
`
export const ArtworkImageSectionWrap = styled.div`
  width: 100%;
  margin: 10px 0;
  //background: #000;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  //box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  .magnifierDiv {
    z-index: 0;
    width: 100%;
    height: 100%;
    > div {
      width: 100%;
      //height: 100%;
      display: flex;
      align-items: center;
      justify-content: center; 
    }
  }
  img {
    max-width: inherit;
    max-height: inherit;
    width: 100%;
    height: 100%;
    object-fit: contain;
    @media (max-width: 1024px) {
      width: auto;
      max-height: inherit;
    }
  }
  // @media (min-width: 1025px) and (max-width: 1399px) {
  //   width: 44%;
  // }
  @media (min-width: 1025px) and (max-width: 1152px) {
    //width: 300px;
  }
  @media (max-width: 1024px) {
    width: auto;
  }
`
export const ArtworkImageLeftIcons = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  min-height: 33px;
  min-width: 100px;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
  z-index: 1;
  padding: 0 10px;
  svg {
    color: #000;
    font-size: 18px;
    cursor: pointer;
  }
`

export const MagnifierDiv = styled.div`
  display: flex;
  flex-direction: row;
  background: #fff;
  height: 35px;
  width: 35px;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 20px;
  top: 15px;
  z-index: 1;
  padding: 0;
  border-radius: 50%;
  svg {
    color: #222;
    font-size: 18px;
    cursor: pointer;
  }
`
export const DescriptionSection = styled.div`
  width: 420px;
  margin: 15px;
  position: relative;
  .added-button {
    display: flex;
    justify-content: center;
    align-items: center;
    svg {
      margin-left: 5px;
    }
  }
  @media (min-width: 1025px) {
    width: 40%;
  }
  @media (max-width: 1024px) {
    width: 100%;
  }
  @media( max-width: 450px ){
    margin: 0;
    position: relative;
    box-sizing: border-box;
  }
  &.rtl-ar-content {
    direction: rtl;
  }
`
export const ArtworkName = styled.h1`
  font-family: Montserrat-Regular;
  margin: 10px 0px 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: normal;
  text-align: left;
  color: rgb(34, 34, 34);
  padding: 0px;
  max-width: calc(100% - 45px);
  display: inline-block;
  align-items: flex-end;
  vertical-align: middle;
  @media (max-width: 767px) {
    font-size: 20px;
  }
`
export const Location = styled.h1`
  padding: 0;
  margin: 10px 0 5px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  color: #222;
  font-family: 'Montserrat-Regular';
  display: flex;
  align-items: center;
  img {
    margin-right: 7px;
    &:first-of-type {
      width: 25px;
      height: 25px;
    }
  }
  span {
    text-decoration: underline;
    cursor: pointer;
    margin: 0 5px;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    flex-wrap: wrap;
  }
  &.rtl-ar-content {
    direction: rtl;
    text-align: right;
  }
`

export const ArtworkDescription = styled.h1`
  padding: 0;
  margin: 10px 0 8px;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 1.7;
  text-align: left;
  color: #666;
  font-family: 'Montserrat-Regular';
  max-width: 260px;
  &.fullWidth {
    max-width: 100%;
  }
  @media (max-width: 1024px) {
    max-width: 100%;
  }
  @media (max-width: 767px) {
    font-size: 13px;
  }
  &.rtl-ar-content {
    direction: rtl;
    text-align: right;
  }
`
export const BorderBottomSec = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 5px 0;
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
  /* @media (max-width: 1024px) {
    max-width: 100%;
  } */
  @media (min-width: 768px) and (max-width: 991px) {
  }
  select {
    max-width: 70px;
    margin: 0;
    color: #222;
    text-transform: uppercase;
    padding: 0 10px;
  }
  &.FlexStartDivFirst {
    justify-content: flex-start;
    margin: 15px 0;
    max-width: 400px;
    @media (max-width: 479px) {
      flex-direction: row;
      align-items: center;
    }
  }
  &.FlexStartDiv {
    justify-content: flex-start;
    margin: 15px 0;
    max-width: 400px;
    @media (max-width: 479px) {
      flex-direction: column;
      align-items: flex-start;
    }
    button {
      margin: 0 5px 0 0;
      font-family: 'Montserrat-Regular';
      font-size: 16px;
      width: auto;
      padding: 8px 15px;
      align-items: center;
      display: flex;
      svg {
        margin-right: 5px;
      }
      @media (max-width: 767px) {
        font-size: 14px;
        padding: 4px 10px;
      }
      @media (max-width: 479px) {
        width: 100%;
        margin: 0 0 10px;
        justify-content: center;
      }
    }
  }
`
export const LikeDiv = styled.div`
  display: flex;
  flex-direction: row;
`

export const UsersButton = styled.button`
  font-weight: bold;
  font-size: 16px;
  line-height: 22px;
  text-align: center;
  color: #222;
  background: transparent;
  width: auto;
  border: 0;
  padding: 0px;
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-right: 0px;
  font-family: 'Montserrat-Regular';
  font-weight: 100;
  :hover,
  :focus {
    outline: 0;
    border: 0;
    background: transparent;
  }
  @media (min-width: 768px) and (max-width: 991px) {
    font-size: 14px;
  }
  svg {
    margin: 0 5px 0 0;
    font-size: 18px;
    color: #aaa;
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
  }
`

export const ConnectionsUl = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

export const ConnectionsLi = styled.div`
  width: 35px;
  height: 35px;
  margin: 0 0 0 5px;
  :first-child {
    width: auto;
    height: auto;
    margin: 0;
    align-items: center;
    display: flex;
    justify-content: center;
    font-size: 16px;
    color: #222;
    padding: 0 5px;
    @media (min-width: 768px) and (max-width: 991px) {
      font-size: 14px;
    }
  }
  a {
    cursor: pointer;
  }
  @media (max-width: 767px) {
    font-size: 14px;
  }
  img {
    width: 35px;
    height: 35px;
  }
`

export const ArtworkPrice = styled.h1`
  padding: 0;
  margin: ${(props) => (props.showMargin ? '0 0 0 0' : '0 0 0 15px')};
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: normal;
  text-align: center;
  color: #000;
  font-family: 'Montserrat-Regular';
  svg {
    cursor: pointer;
    margin-left: 5px;
  }
  @media (max-width: 767px) {
    font-size: 16px;
  }
`
export const TagsWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0;
  flex-direction: row;
  align-items: flex-start;
  margin: 0 0 12px;
  @media (max-width: 767px) {
    align-items: flex-start;
    -webkit-box-align: start;
    -ms-flex-align: start;
        align-items: flex-start;
-ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
`
export const LabeLTags = styled.label`
  padding: 7px 0 0 0;
  margin: 0;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: normal;
  text-align: left;
  color: #000;
  font-family: 'Montserrat-Regular';
  min-width: 120px;
  text-transform: uppercase;
  @media (max-width: 767px) {
    font-size: 14px;
  }
`
export const TagsInputWrap = styled.div`
  width: calc(100% - 120px);
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
`
export const TagsDiv = styled.div`
  display: inline-block;
  justify-content: center;
  padding: 7px 10px;
  cursor: pointer;
  margin: 0 5px 5px 0;
  align-items: center;
  background: #ffffff;
  box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
  color: #666666;
  font-size: 16px;
  max-width: 120px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  &:empty {
    display: none;
  }
  @media (max-width: 767px) {
    font-size: 14px;
    
  }
`

export const DigitalSpan = styled.span`
  background: #eee;
  padding: 2px 4px;
  text-transform: uppercase;
  font-size: 12px;
  margin-left: 10px;
  display: inline-block;
  vertical-align: middle;
`

export const SoldDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0px;
  margin: 0;
  align-items: center;
  background: #ff0000;
  color: #fff;
  font-size: 14px;
  text-transform: uppercase;
  width: 45px;
  height: 45px;
  border-radius: 50%;
`
export const TopDiv = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`

export const SectionRow = styled.div`
  margin: 10px ;  
  @media( max-width: 1024px ) {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    margin: 0 -1%;
    &.RowflexStart {
      justify-content: flex-start;
    }
    &.InnerSecRow {
      justify-content: flex-start;
      @media (max-width: 1024px) {
        max-width: 100%;
      }
      @media (max-width: 479px) {
        flex-direction: row;
        flex-wrap: wrap;
      }
    }
  }
  @media (max-width: 479px) {
    flex-direction: row;
    align-content: flex-start;
    justify-content: flex-start;
  }
`
export const VerticalSectionRow = styled.div`
margin: 10px ;
`

export const ImgSmContainer = styled.div`
  width: 100%;
  cursor: pointer;
  display: block;
  max-width: 125px;
  @media( max-width: 1024px ) {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 1% 20px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.1);
    background: #fff;
    flex: 1;
  }
  img {
    max-height: 125px;
    width: 100%;
    height: auto;
    object-fit: cover;
    @media (max-width: 343px) {
      max-height: 90px;
    }
  }
`
export const ImgWrapper = styled.div`
  display: flex;
  flex-direction: row-reverse;
  width: 55%;
  justify-content: flex-end ;
  .magnifierDiv img {
    cursor: zoom-in!important;
  }
  .magnifierDiv.digital > div:before{
    content: '';
    display: block;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
  }
  @media (max-width: 1024px) {
    width: 100%;
    flex-direction: column;
    justify-content: flex-start ;
  }
`
export const ValuesContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  span {
    color: white;
    font-size: 12px;
    background-color: #b0b0b0;
    padding: 2px 5px;
  }
`

export const InputBar = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  input {
    max-width: 40%;
    width: 100%;
    border: 2px solid #eee;
    padding: 5px;
    :hover,
    :focus {
      outline: 0;
    }
  }
`

export const RadioWrap = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  .checkmark {
    top: -5px;
  }
  &:not(last-child) {
    margin-right: 10px;
  }
  > :first-child {
    margin-right: -2px;
  }
  img {
    margin-top: 2px;
    margin-left: 10px;
  }
`

export const RadioWrapper = styled.div`
  display: flex;
  flex-direction: row;
  @media (min-width: 1250px) {
    margin-left: 10px;
  }
`

export const DescriptionToggleIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  svg {
    cursor: pointer;
    font-size: 22px;
    color: #222;
    font-weight: bold;
    @media (max-width: 767px) {
      font-size: 18px;
    }
  }
`
export const IconWrap = styled.span`
  display: flex;
`
export const FilterButton = styled.div`
  font-size: 14px;
  padding: 0.5em 1em;
  background: #222;
  color: #fff;
  width: 75px;
  margin: -7px auto;
  text-transform: uppercase;
  cursor: pointer;
  svg {
    vertical-align: middle;
    &.angle-up {
      position: relative;
      bottom: 1px;
    }
  }
  &.detailPage {
    @media ( max-width: 1023px ) {
      display: none !important ;
    }
  }
  &.toggled{
    @media( max-width: 1023px ) {
      margin-top: 10px;
    }
  }
  `

export const ArtworkWishlist = styled.div`
  margin: 0 5px 0 0;
  font-family: 'Montserrat-Regular';
  font-size: 16px;
  width: auto;
  padding: 8px 15px;
  -webkit-align-items: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  display: -webkit-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  border: 1px solid #000;
  margin: 0 10px;
  background: #000;
  color: #fff;
  cursor: pointer;
  &:hover{
    background: #fff;
  color: #000;
  }
`