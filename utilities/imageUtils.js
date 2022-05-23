import axios from 'axios'

export const createImageUrl = (path) => `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_S3_URL}/${path}`

export const createResizeImageUrl = (path, width, height, type) => {
  const delimiter = '/'
  let start = 0
  if (type === 'profileCover') {
    start = 1
  } else if (type === 'mediaLibrary') {
    start = 2
  }
  const prefix = path.split(delimiter).slice(0, start).join(delimiter)
  const suffix = path.split(delimiter).slice(start).join(delimiter)

  const resizePath = `${prefix}/${width}x${height}/${suffix}`

  return `${process.env.NEXT_PUBLIC_REACT_APP_RESIZE_IMAGE_S3_URL}/${resizePath}`
}

export const checkOldImage = (path, width, height, type, articleType, articleInfo) => {
  let useResolution = true

  if (articleType === 'buzz' && articleInfo && articleInfo.oldBuzzId) {
    useResolution = false
  } else if (articleType === 'potd' && articleInfo && articleInfo.oldPotDId) {
    useResolution = false
  } else if (articleType === 'exhibition' && articleInfo && articleInfo.oldExhibitionId) {
    useResolution = false
  }

  return useResolution ? createResizeImageUrl(path, width, height, type) : createImageUrl(path)
}

/**
 *
 * @param {path, login, age, genreList} info
 * @returns
 */
export const createNsfwImageUrl = (info, width, height, type, defaultType) => {
  const { path, login, age, genreList } = info
  let nude = checkGenre(genreList)
  if (nude && ((login && age < 16) || !login)) return '/assets/nsfw-content.png'
  else {
    if (defaultType) return createImageUrl(path)
    else return createResizeImageUrl(path, width, height, type)
  }
}

export const checkGenre = (genreList) => {
  let nude = false
  if (genreList && genreList.length > 0) {
    genreList.forEach((genre) => {
      if (genre.title === 'Nude & Erotic') nude = true
    })
  }
  return nude
}

export const showDefaultImg = (event, defaultImage) => {
  event.target.src = defaultImage
}
export const checkIfImageExists = (url, callback) => {
  const img = new Image()
  img.src = url
  if (img.complete) {
    callback(true)
  } else {
    img.onload = () => {
      callback(true)
    }
    img.onerror = () => {
      callback(false)
    }
  }
}

export const imageErrorHandler = async (e, imgUrl, placeholderImg, type, timeSuffix) => {
  let fallbackImg = placeholderImg
  showDefaultImg(e, fallbackImg)

  await checkIfImageExists(imgUrl, (exists) => {
    if (exists) {
      if (type === 'profileCover') {
        fallbackImg = imgUrl + timeSuffix
      } else if (type === 'mediaLibrary') {
        fallbackImg = imgUrl
      }
      showDefaultImg(e, fallbackImg)
    } else {
      fallbackImg = placeholderImg
      showDefaultImg(e, fallbackImg)
    }
    return
  })
}

export const uploadImageToMediaLibrary = async (blob, filename) => {
  const formData = new FormData()
  formData.append('images', blob, filename)
  try {
    const token = localStorage.getItem('auth_token')
    const response = await axios.post(process.env.NEXT_PUBLIC_REACT_APP_USER_SERVICE_API_ENDPOINT + 'user/media-library/upload', formData, {
      headers: {
        Authorization: token,
        'Content-Type': 'multipart/form-data',
      },
    })
    return response
  } catch (err) {
    //Return an error
    return err
  }
}

export const createFlagUrl = (langCode) =>
  `${process.env.NEXT_PUBLIC_REACT_APP_IMAGE_S3_URL}/${process.env.NEXT_PUBLIC_REACT_APP_LANGUAGE_FLAGS_FOLDER}/${langCode}.png`
