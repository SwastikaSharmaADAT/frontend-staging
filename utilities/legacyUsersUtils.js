/** Method to check if the user is legacy user and has placeholder email */
export const checkLegacyUserTestEmail = (userInfo) => {
  if (
    (userInfo.isOldArtmoUser && userInfo.email && userInfo.email.value.includes('@no-email.com')) ||
    (userInfo.email && userInfo.email.value === '')
  ) {
    return true
  }
  return false
}
