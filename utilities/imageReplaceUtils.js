/**
 *
 * @param {String} str String from which images are to be removed
 * @param {Function} callback SetState method passed as a callback method to set images extracted from string in state
 * @returns String with images removed from it and an identifier added in its place
 */
export const removeImagesFromStr = (str, callback) => {
  const imagesCollection = str.match(/<img[^>]+src="([^>]+)"/g)
  const replacedStr = str.replace(/<img[^>]+src="([^>]+)"/g, '<wbr')
  const replacedStr2 = replacedStr.replace(/data-style="([^"]+)"/g, '')
  callback(imagesCollection)
  return replacedStr2
}

/**
 *
 * @param {String} str String to which images are to be added
 * @param {Array} images Images array to put them back in string
 * @returns String with images added to it in place of identifier
 */
export const addImagesInStr = (str, images) => {
  let updatedStr = str
  if (images && images.length > 0) {
    images.forEach((img) => {
      updatedStr = updatedStr.replace('<wbr', img)
    })
  }
  updatedStr = replaceWordpressImage(updatedStr)
  return updatedStr
}

export const replaceWordpressImage = (str) => {
  return str.replace(/https:\/\/artmo.com\/wp-content\/uploads/g, 'https://artmo1-media.s3.eu-central-1.amazonaws.com')
}
