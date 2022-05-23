import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const BelowContentWrap = styled.div`
  width: 100%;
  margin-top: ${(props) => (props.inContainer ? '0' : '30px')};
  margin-bottom: ${(props) => (props.inContainer ? '0' : '50px')};
  box-shadow: ${(props) => (props.inContainer ? 'none' : '1px 1px 6px rgba(0, 0, 0, 0.1)')};
  img {
    height: 100%;
  }
  //border: 1px solid #000 ;
  &.adLeftContainer{
    margin-bottom: 0px;
  }
  // ins{
  //   width: 100%;
  //   height: 275px;
  // }
  @media (max-width: 767px) {
    max-width: 360px;
  }

`
 
const BelowContentAds = ( props ) => {
    
    useEffect(() => {
      try {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      } catch (err) {
        console.log(err)
      }
    }, []);

    const rate = props.rate ? props.rate : Math.random() * 10
    
    return(
    <>
      <BelowContentWrap inContainer={props.inContainer} className={props.className}>
          <ins
              className="adsbygoogle adbanner-customize"
              style={{
                display: "block"
              }}
              data-ad-format="auto"
              data-full-width-responsive="true"
              data-ad-client={process.env.NEXT_PUBLIC_REACT_APP_DATA_AD_CLIENT}
              data-ad-slot="1810081595"
          />
      </BelowContentWrap>
  </>
)}

export default BelowContentAds
