import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import PropTypes from 'prop-types'
import { createImageUrl, createResizeImageUrl, imageErrorHandler } from '../../../utilities/imageUtils'

const type = 'Image' // Need to pass which type element can be draggable

const AlbumImage = ({ image, index, moveImage }) => {
  const ref = useRef(null)

  const [, drop] = useDrop({
    accept: type,
    hover(item) {
      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index
      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }
      // Move the content
      moveImage(dragIndex, hoverIndex)
      // Update the index for dragged item directly to avoid flickering when half dragged
      item.index = hoverIndex
    },
  })

  const [{ isDragging }, drag] = useDrag({
    type,
    item: { type, id: image._id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  })

  // initialize drag and drop into the element
  drag(drop(ref))

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0 : 1 }}>
      <img
        src={createResizeImageUrl(image.pictureUrl, 150, 150, 'mediaLibrary')}
        onError={(e) => {
          imageErrorHandler(e, createImageUrl(image.pictureUrl), '/assets/mo-fallback-image.png', 'mediaLibrary', '')
        }}
        alt=""
      />
    </div>
  )
}
AlbumImage.propTypes = {
  image: PropTypes.object,
  index: PropTypes.number,
  moveImage: PropTypes.func,
}

export default AlbumImage