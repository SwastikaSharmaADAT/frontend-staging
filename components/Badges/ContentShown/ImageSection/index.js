import React from 'react'
import PropTypes from 'prop-types'
import { ImgSecWrap } from '../styled.js'
import { badgeSizes } from '../../../../utilities/badgeSizes.js'

const ImageSection = ({ loggedInUsername, colorValue, type, sizeValue }) => (
  <>
    <ImgSecWrap showBlack={colorValue === 'white' ? true : false}>
      <iframe
        title={`${type}-${colorValue}`}
        className="profile-embed"
        src={typeof window !== 'undefined' && `${window.location.origin}/profile-embed?username=${loggedInUsername}&color=${colorValue}&type=${type}&size=${sizeValue}`}
        style={badgeSizes[type][sizeValue]}
        scrolling="no"
      ></iframe>
    </ImgSecWrap>
  </>
)

ImageSection.propTypes = {
  loggedInUsername: PropTypes.string,
  colorValue: PropTypes.string,
  type: PropTypes.string,
  sizeValue: PropTypes.string,
}

export default ImageSection
