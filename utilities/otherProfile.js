export const getUserName = (userData) =>
  userData.firstName && userData.lastName
    ? userData.firstName + ' ' + userData.lastName
    : userData.firstName
    ? userData.firstName
    : userData.username

// Method to check whether user is viewing news feed page as other user or not
export const checkOtherUser = (username) => {
  const userInfo = localStorage.getItem('user_info')
  const loggedInUsername = userInfo && JSON.parse(userInfo).username

  if (loggedInUsername !== username) {
    return true
  } else {
    return false
  }
}
export const getArtworkOwner = (artwork) => {
  return artwork && !artwork.isAdmin
    ? artwork.nameOfArtist &&
        artwork.nameOfArtist.firstName &&
        `${artwork.nameOfArtist.firstName} ${artwork.nameOfArtist.lastName}`
    : artwork.userId && artwork.userId.firstName && artwork.userId.lastName
    ? `${artwork.userId.firstName} ${artwork.userId.lastName}`
    : artwork.userId && artwork.userId.username
    ? artwork.userId.username
    : ''
}

export const checkPageUser = (userType) => {
  if (userType !== 'artist' && userType !== 'member') {
    return true
  } else {
    return false
  }
}
