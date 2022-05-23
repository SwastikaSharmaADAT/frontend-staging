// method to open a url in new tab
export const openInNewTab = (url) => {
  if (process.browser) {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }
}

export const isTouchDevice = () => {
  if (process.browser) {
    if ('ontouchstart' in window) {
      return true
    }
    return false
  }
}
