import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import useTimestamp from '../../../../hooks/useTimestamp'

const relativeTime={
  future: 'in %s',
  past: '%s',
  s: 'now',
  ss: '%ss',
  m: '1min',
  mm: '%dmins',
  h: '1h',
  hh: '%dh',
  d: '1d',
  dd: '%dd',
  M: '1mon',
  MM: '%dmon',
  y: '1y',
  yy: '%dy',
}
function MessageTimeStamp({ stamp }) {
  const timeStamp=useTimestamp(stamp,relativeTime)

  return <>{timeStamp}</>
}
MessageTimeStamp.propTypes = {
  stamp: PropTypes.string,
}
export default MessageTimeStamp
