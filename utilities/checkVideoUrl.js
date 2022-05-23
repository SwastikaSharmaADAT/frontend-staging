export const checkVideoURL = (url) => {
  let validURL = false
  if (
    url.toLowerCase().includes('youtube') ||
    url.toLowerCase().includes('vimeo') ||
    url.toLowerCase().includes('youtu.be')
  ) {
    validURL = true
  }
  return validURL
}
