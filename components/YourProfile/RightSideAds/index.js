import React, { useEffect } from 'react'
import styled from 'styled-components'

import gif1 from '../../../public/assets/internations/rightside.gif'

const UserProfileWrap = styled.div`
  width: auto;
  position: relative;
  margin: 0 0 30px;
  display: flex;
  flex-direction: row;
  padding: 0;
  max-width: 350px;
  margin: 0 auto 30px;
  text-align: center;
  box-shadow: 1px 1px 6px rgba(0, 0, 0, 0.1);

  ins{
    width: 100%;
    height: 300px;
  }
  @media (max-width: 767px) {
    max-width: 360px;
  }
`

const RightSideAds = (props) => {
    useEffect(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.log(err)
      }
    }, []);

    const rate = props.rate ? props.rate : Math.random() * 10
    
    return(<>
    <UserProfileWrap>
      {
        (rate > 3) || props.interNations ? 
        <a href="https://www.internations.org/?utm_source=partners&utm_medium=cpc&utm_term=banner&utm_content=sidebar-2022-02&utm_campaign=artmo" target="_blank"><img style={{height: '100%'}} src='/assets/internations/rightside.gif' alt="ads" /></a>
        :
        <ins
          className="adsbygoogle adbanner-customize"
          style={{
            display: "block"
          }}
          data-ad-client={process.env.NEXT_PUBLIC_REACT_APP_DATA_AD_CLIENT}
          data-ad-slot={process.env.NEXT_PUBLIC_REACT_APP_DATA_AD_SLOT}
        />
      }
      

    </UserProfileWrap>
  </>
)}

export default RightSideAds
