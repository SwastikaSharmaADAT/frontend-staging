import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getType } from '../../modules/articles/articleSlice';

function OldUrlRedirection({oldUrl,articleSlugFromUrl}) {
    const router = useRouter()
    const dispatch=useDispatch()

  useEffect(()=>{
    const getArticleType=async()=>{
      const resultAction=await dispatch(getType({articleSlug:articleSlugFromUrl}))
      const response=await unwrapResult(resultAction)
      if(response&&response.data&&response.data.type){
        router.push(`/${response.data.type}/${articleSlugFromUrl}`)
      }else router.push(`/articles`)
    }
    if(oldUrl) getArticleType()
  },[])
    return (
        <>
            
        </>
    );
}

export default OldUrlRedirection;