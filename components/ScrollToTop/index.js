import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function ScrollToTop(props) {
    const router=useRouter()
    const {pathname}=router

    useEffect(()=>{
        document.body.scrollTop = 0
    },[pathname])
    return <></>
}

export default ScrollToTop;