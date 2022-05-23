import React from 'react'
import { useRouter } from 'next/router'
import { openInNewTab } from '../../utilities/newTabUtils'
import { badgeSizes } from '../../utilities/badgeSizes'

const BadgeIframe = () => {
  const router = useRouter()
  const {username, color, size, type} = router.query

  BadgeIframe.getInitialProps = async () => ({})

  const imgObj = {
    square: {
      black: '/assets/badges/ARTMO-Black-square.png',
      white: '/assets/badges/ARTMO-White-square.png',
    },
    rectangle: {
      black: '/assets/badges/ARTMO-Black-rectangle.png',
      white: '/assets/badges/ARTMO-White-rectangle.png',
    },
    normal: {
      black: '/assets/badges/ARTMO-Logo-Black.png',
      white: '/assets/badges/ARTMO-Logo-White.png',
    },
    favicon: {
      black: '/assets/badges/MO-favicon-Black.png',
      white: '/assets/badges/MO-favicon-White.png',
    },
  }

  return (
    <a onClick={() => openInNewTab(`/user/${username}`)} style={{ cursor: 'pointer' }}>
      {username && <img
        src={imgObj[type][color]}
        alt="badge icon"
        width={badgeSizes[type][size]['width']}
        height={badgeSizes[type][size]['height']}
        style={color === 'black' ? { background: 'white' } : { background: 'black' }}
      />}
    </a>
  )
}

export default BadgeIframe
