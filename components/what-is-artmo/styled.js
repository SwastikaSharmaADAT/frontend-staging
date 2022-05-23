import styled from 'styled-components'

export const SectionWrapperBanner = styled.div`
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  height: calc(100vh - 64px - 100px);
  margin-top: 64px;
  & * {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  @media( max-width: 991px){
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
    height: auto ;
  }
`
export const SectionLeft = styled.div`
  background-image: url('/assets/banner1.jpg');
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  position: relative;
  z-index: 1;
  &.w40 {
    width: 40%;
    @media( max-width: 991px){
      width:100%;
      margin-top: -12px
    }
  }
  @media( max-width: 991px){
    background-image: url('/assets/banner.jpg');
    height: 350px;
  }
  @media( max-width: 767px ){

    height: 210px;
  }
  @media( max-width: 575px ){
    height: 180px;
  }
`
export const SectionRight = styled.div`
  background: #e6e9ec;
  padding: 0;
  text-align: center;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  &.w60{
    width: 60%;
    @media( max-width: 991px){
      width:100%;
    }
  }
  & p{
    color: #222;
    width: 100%;
  }
`
export const TopListing = styled.div`
  background: #fff;
  padding: 20px;
  width: 100%;
  height: 105px;
  & .mobHide{
    font-weight: 500;
    font-family: 'Montserrat-Medium';
    @media( max-width: 767px ) {
      display: none ;
    }
  }
  & .mobDisp{
    display: none ;
    @media( max-width: 767px ){
      display: block ;
      line-height: 1.2;
      font-size: 14px;
    }
  }
  & p{
    font-size: 30px;
    margin-top: 8px;
    line-height: 1.2;
    font-weight: 500;
    font-family: 'Montserrat-Medium';
    
    @media (max-width:1199px) { 
      font-size: 22px;
    }
    @media (max-width:575px) {
      font-size: 18px;
    }
  }
  & ul{
    padding: 0;
    margin: 0;
    list-style: none;
    width: 100%;
    text-align: center;
    & li{
      font-family: 'Montserrat-Medium';
      color: #222;
      display: inline-block;
      padding: 0 15px;
      font-size: 30px;
      font-weight: 500;
      border-right: 3px solid #222;
      line-height: 1;
      @media (max-width:1199px) { 
        font-size: 22px;
      }
      @media (max-width:575px) {
        padding: 0 5px;
        font-size: 18px;
      }
    }
    & li:last-child{
      border: none;
    }
  }
  @media (max-width:1199px) { 
    height: 92px;
  }
  @media (max-width:575px) {
    padding: 5px 5px 0px 5px;
	  height: auto;
    
  }
`
export const MainContentBox = styled.div`
  height: calc(100% - 105px);
  padding: 15px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  width: 100%;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  @media ( max-width: 1199px ) {
    height: calc(100% - 92px);
  }
  @media ( max-width: 575px ) {
    height: auto;
  }
`
export const ContentBoxInner = styled.div`
& p:first-child{
  @media( max-width: 767px ) {
    display: none;
  }
}
& p{
  margin: 0 0 30px 0;
  font-size: 38px;
  @media only screen and ( min-width: 2210px ) and (max-width: 3000px ) {
    font-size: 50px ;
  }
  @media( max-width: 2210px ){
    font-size: 36px; 
  }
  @media( max-width: 1920px ){
    font-size: 30px; 
  } 
  @media( max-width: 1700px ){
    font-size: 24px; 
  }
  @media ( max-width: 1550px ) {
    margin-bottom: 15px;
    font-size: 22px;
  }
  @media only screen and ( min-width: 1300px ) and (max-width: 1400px ) {
    margin-bottom: 15px;
    font-size: 26px;
  }
  @media only screen and ( min-width: 1400px ) and (max-width: 1500px ) {
    margin-bottom: 15px;
    font-size: 20px;
  }
  @media only screen and ( min-width: 1120px ) and (max-width: 1299px ) {
    margin-bottom: 15px;
    font-size: 16px;
  }
  @media only screen and ( min-width: 1080px ) and (max-width: 1200px ) {
    margin-bottom: 15px;
    font-size: 16px;
  }

  // @media ( max-width: 1199px ) {
  //   // font-size: 18px;
  //   // line-height: 1.4;
  //   font-size: 14px;
  //   line-height: 1.2
  // }
  @media ( max-width: 575px ) {
    font-size: 14px;
    & br {
      display: none;
    }
  }
}
`
export const SignInButton = styled.div`
  background: #fff;
  color: #222;
  text-align:center;
  font-family: 'Montserrat-Regular';
  border: 2px solid #ccc;
  font-size: 30px;
  font-weight: 500;
  max-width: 390px;
  margin: 0 auto 30px;
  width: 100%;
  cursor: pointer;
  padding: 10px;
  line-height: 1.2;
  &.tabSectionContent{
    margin-top: 20px ; 
  }
  @media( max-width: 1550px){
    margin-bottom: 15px;
    font-size: 26px;
    max-width: 330px;
  }
  @media( max-width: 1199px){
    font-size: 16px;
    max-width: 245px;
  }
  &:hover{
    background: #222;
    color: #fff ;
  }
  @media only screen and ( min-width: 1120px ) and (max-width: 1299px ) {
    margin-bottom: 15px;
    font-size: 16px;
    padding: 8px;
    max-width: 245px;
  }
`
export const ArtmoLinks = styled.div`
  width: 100%;
  font-size: 18px;
  color: #222;
  @media ( max-width: 1199px ){
    font-size: 16px;
  }
  & div {
    color: #222;
    font-size: 18px;
    cursor: pointer ;
    @media ( max-width: 1299px ) {
      font-size: 16px;
    }
    @media( min-width: 2000px ){
      font-size: 22px ;
    }
    @media( min-width: 2300px ){
      font-size: 28px
    }
  }
  & br{
    @media only screen and ( min-width: 1024px ) and (max-width: 1200px ) {
        display: none ;
    }
  }
 
`
export const SectionWrapperLearnMore = styled.div`
  padding: 30px 0;
  @media( max-width: 767px ){
    padding: 15px 0;
  }
`
export const LearnMoreContainer = styled.div`
  margin: auto;
  padding: 0 15px;
  @media (min-width:576px) {
        max-width: 540px;
  }
  @media (min-width:768px) {
    max-width: 720px;
  }
  @media (min-width:992px) {
    max-width: 960px;
  }
  @media (min-width:1200px) {
    max-width: 1170px;
  }
`
export const LearnMoreBtn = styled.div`
  text-align: center; 
  & span{
    color: #222;
    font-weight: bold;
    font-family: 'Montserrat-Regular';
    font-size: 22px;
    line-height: 1;
    cursor: pointer;
    @media( max-width: 1024px ){
      font-size: 18px ;
    }
  }
`
export const LearnMoreTabbingOuter = styled.div`
margin: 20px 0 0 0;
&.showSection{
    display: block ;
}
&.hideSection{
    display: none ;
}
`
export const LearnMoreTabbingUl = styled.ul`
  padding: 0;
  margin: 0;
  list-style: none;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: start;
  -ms-flex-align: start;
  align-items: flex-start;
  @media( max-width: 575px ) {
    -ms-flex-wrap: wrap;
    flex-wrap: wrap;
  }
  & li{
    font-family: 'Montserrat-Regular';
    font-weight: 500;
    line-height: 1;
    font-size: 22px;
    border: 2px solid #e6e9ec;
    padding: 10px 10px;
    cursor: pointer;
    min-width: calc(25% - 30px);
    text-align: center;
    background: #fff;
    &.active{
      background: #222;
      border-color: #222;
      color: #fff;
      // padding-bottom: 20px;
      @media( max-width: 575px ) {
        // padding-bottom: 10px;
      }
    }
    @media ( max-width: 767px ) {
      font-size: 20px;
      padding: 10px;
    }
    @media( max-width: 575px ) {
      padding: 10px;
      min-width: 40%;
      margin: 0 0 20px 0;
    }
  }
`
export const TabingContent = styled.div``

export const TabingSingleContent = styled.div`
  display: none ; 
  border: 2px solid #e6e9ec;  
  background: #e6e9ec;
  padding: 20px;
  &.active{
    display:block;
  }
  & ul{
    padding: 0 0 0 20px;
    margin: 0;
    & li {
      list-style: circle;
      font-size: 16px;
      line-height: 1.5;
      font-family: 'Montserrat', sans-serif;
      margin: 0 0 8px 0;
      color: #222;
    }
  }
`
export const LearnMoreTabbingLi = styled.li`
      font-size: 16px;
      line-height: 1.5;
      margin: 0 0 8px 0;
      color: #222;
      padding-bottom: 10px ;    
`