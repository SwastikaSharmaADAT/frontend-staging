import React from 'react'
import styled from 'styled-components'

const SignupBackgroundBg = styled.div`
  color: rgb(34, 34, 34);
  width: 322px;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  -webkit-box-pack: start;
  justify-content: flex-start;
  text-align: left;
  //background: url("/assets/member-1.png") left center / 100% 100% no-repeat;
  //background: url("/assets/signup-image.jpg") center center / 100% 100% no-repeat;
  background: url("/assets/signup-image-crop.jpg") center center / 100% 100% no-repeat;
  background-size: cover;
  @media (max-width: 550px) {
    display: none;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    display: none;
  }
`

const SignupBackground = () => (
  <>
    <SignupBackgroundBg></SignupBackgroundBg>
  </>
)

export default SignupBackground
