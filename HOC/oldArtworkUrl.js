import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

function oldArtworkUrl(Child) {
  // eslint-disable-next-line react/display-name
  return (props) => {
    const router = useRouter()
    const params = router.query
    useEffect(() => {
      if(params.articleType==='product'&&params.articleSlug)
      router.push(`/artworks/${params.articleSlug}`)
    }, [params.articleSlug])

    return <Child {...props}></Child>
  }
}

export default oldArtworkUrl
