import React from 'react'
import styled from 'styled-components'

const CreateBackgroundBg = styled.div`
  color: #222;
  width: 322px;
  position: relative;
  padding: 0px;
  line-height: normal;
  font-size: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  text-align: left;
  background: url('/assets/university-1.png') no-repeat left center;
  background-size: 100% 100%;
  @media (max-width: 550px) {
    display: none;
  }
  @media (max-width: 991px) and (orientation: landscape) {
    display: none;
  }
`

const CreateBackground = () => (
  <>
    <CreateBackgroundBg></CreateBackgroundBg>
  </>
)

export default CreateBackground
