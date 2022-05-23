export const checkSocialUrl = (url) => {
  const regex = /(http(s?)):\/\/|(www\.)/i
  return regex.test(url)
}
