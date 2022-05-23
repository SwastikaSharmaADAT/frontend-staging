import React from 'react'
import styled from 'styled-components'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import PropTypes from 'prop-types'
import Checkbox from '@material-ui/core/Checkbox'
import { RiCheckboxCircleFill, RiCheckboxBlankCircleLine } from 'react-icons/ri'
import { isNil, find } from 'lodash'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../../../utilities/imageUtils'

const ImgWrap = styled.div`
  width: 142px;
  height: 142px;
  position: relative;
  margin: 0 5px 5px 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 2px solid #eee;
  @media (max-width: 479px) {
    width: 100px;
    height: 100px;
  }
  :hover {
    border: 2px solid #ffffff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
  }
  .select {
    border: 2px solid #ffffff;
    box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.25);
  }
  img {
    max-height: 142px;
    @media (max-width: 479px) {
      max-height: 80px;
    }
  }
  .CheckboxCheck {
    position: absolute;
    left: 5px;
    top: 5px;
    cursor: pointer;
    margin: 0;
    .MuiIconButton-root {
      padding: 0;
      font-size: 16px;
    }
    .MuiCheckbox-colorSecondary.Mui-checked {
      color: #000;
    }
  }
`
/**
 *
 * @description: Component to render Image seperately in media library menu
 */
function ImageDiv({ chosenMedia, selectMedia, photo }) {
  const checked = !isNil(find(chosenMedia, { _id: photo._id }))
  return (
    <ImgWrap
      className={checked ? 'selected-media' : ''}
      onClick={(e) => {
        selectMedia(photo, e.ctrlKey)
      }}
      key={photo._id}
    >
      <FormControlLabel
        className="CheckboxCheck"
        control={
          <Checkbox
            icon={<RiCheckboxBlankCircleLine />}
            checked={checked}
            checkedIcon={<RiCheckboxCircleFill />}
            name="checkedH"
          />
        }
        label=""
      />
      <img
        src={createResizeImageUrl(photo.pictureUrl, 150, 150, 'mediaLibrary')}
        onError={(e) => {
          imageErrorHandler(e, createImageUrl(photo.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
        }}
        alt=""
      />
    </ImgWrap>
  )
}
ImageDiv.propTypes = {
  userMedia: PropTypes.any,
  selectMedia: PropTypes.any,
  chosenMedia: PropTypes.any,
  photo: PropTypes.any,
  limit: PropTypes.number,
  setCheckedLength: PropTypes.func,
  checkedLength: PropTypes.number,
  index: PropTypes.number,
}
export default ImageDiv
