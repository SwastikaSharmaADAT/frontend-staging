import React, { useEffect, useState } from 'react'
import { BsChevronUp } from 'react-icons/bs'
import styled from 'styled-components'

const ScrollWrapper = styled.div`
    position: fixed;
    bottom: 60px;
    right: 20px;
    background: #000000;
    padding: 20px;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    text-decoration: none;
    cursor: pointer ;
    transform: scale(1, 1);
    opacity: 0.4;
    transform: scale(1, 1);
    box-sizing: border-box ;
    &:hover{
        opacity: 0.8 ;
    }
    svg {
        font-size: 18px;
        display: block;
        width: 18px;
        height: 18px;
        color: #ffffff;
    }
`

const ScrollToTop = () => {
    const [ isVisible , setIsVisible ]  = useState(false) ;
    useEffect( () => {
        document.addEventListener('scroll', () =>  {
            toggleVisibility();
        });
    }, [])
    const scrollToTopHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
    const toggleVisibility = () =>  {
        if (window.pageYOffset > 300) {
            setIsVisible(true)
        } else {
            setIsVisible(false);
        }
      }
    return (
        <>
            {
                isVisible && (<ScrollWrapper onClick={scrollToTopHandler}><div >
                    <BsChevronUp/>
                  </div></ScrollWrapper> )
            }
        </>
      );
}

export default ScrollToTop ;