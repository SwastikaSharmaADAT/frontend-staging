import { unwrapResult } from '@reduxjs/toolkit';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getType } from '../modules/articles/articleSlice';

function checkOldUrl(Child) {
  // eslint-disable-next-line react/display-name
  return (props) => {
      const dispatch=useDispatch()
    const router = useRouter()
    const params = router.query
    useEffect(() => {
        const getArticleType=async()=>{
            const resultAction=await dispatch(getType({articleSlug:params.activityId}))
            const response=await unwrapResult (resultAction)
            if(response&&response.data&&response.data.type){
              // window.location.href=`${process.env.NEXT_PUBLIC_REACT_APP_WEB_APP_URL}/${response.data.type}/${params.activityId}?lang=${router.locale}`
              router.push(`/${response.data.type}/${params.activityId}`,'',{locale:router.locale})
            }else router.push(`/articles`)
          }
          if(params.articleType&&params.articleType.length===4&&!isNaN(parseInt(params.articleType))&&params.articleSlug&&params.activityId)
           getArticleType()
    }, [params.activityId])

    return <Child {...props}></Child>
  }
}

export default checkOldUrl
