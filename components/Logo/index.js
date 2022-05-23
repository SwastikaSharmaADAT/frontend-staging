import React from 'react'
import styled from 'styled-components'
import Link from 'next/link'

const LogoWrapper = styled.div`
cursor: pointer;
  display: flex;
  a {
    display: flex;
  }
  @media (max-width: 767px) {
    display: flex;
    max-width: 80px;
  }
  @media (max-width: 479px) {
    max-width: 60px;
  }
`

const Logo = () => (
  <>
    <LogoWrapper>
      <Link href="/">
        <img src='/assets/logo.png' alt="Logo" />
      </Link>
    </LogoWrapper>
  </>
)

export default Logo
