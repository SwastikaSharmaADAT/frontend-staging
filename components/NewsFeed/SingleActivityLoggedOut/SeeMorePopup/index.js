import React from 'react'
import styled from 'styled-components'
import SectionContent from './SectionContent'

const FollowingPopupWrap = styled.div`
  width: 100%;
  position: absolute;
  max-width: 400px;
  min-height: 200px;
  height: auto;
  background: #ffffff;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);
  margin: 15px auto;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 50px;
  margin-left: 90px;
  z-index: 1;
  border: 2px solid #dadada;
  @media (max-width: 767px) {
    min-width: 280px;
    max-width: 320px;
    min-height: 180px;
    margin: 50px auto;
  }
`

const SeeMorePopup = () => (
  <>
    <FollowingPopupWrap>
      <SectionContent />
    </FollowingPopupWrap>
  </>
)

export default SeeMorePopup
