const showSection = (myProfile, type) => {
  const { userData, userActivities, userVideos, userArtworks, userLikedArtworks, userAlbums, userGroups } = myProfile
  const {
    technique,
    expertise,
    awards,
    news,
    faculty,
    pastExhibitions,
    publications,
    aboutMyBusinessProfession,
    city,
    country,
    languages,
    dob,
    gender,
    industry,
    website,
    company,
    email,
    skype,
    mobile,
    twitter,
    linkedin,
    youtube,
    instagram,
    facebook,
    vkontakte
  } = userData
  if (userData.userIdentity !== 'verifiedUser') {
    if (type === 'about') {
      if (
        userData.aboutMe &&
          (userData.aboutMe.description || (userData.aboutMe.images && userData.aboutMe.images.length))
      )
        return true
      return false
    } else if (type === 'biography') {
      if (
        userData.biography &&
          (userData.biography.description || (userData.biography.images && userData.biography.images.length))
      )
        return true
      return false
    }
    else if (type === 'activity') {
      if (userActivities && userActivities.length > 0) return true
      return false
    } else if (type === 'contact') {
      if (
        (email && email.value) ||
          (skype && skype.value) ||
          (mobile && mobile.value) ||
          (twitter && twitter.value) ||
          (linkedin && linkedin.value) ||
          (youtube && youtube.value) ||
          (facebook && facebook.value) ||
          (instagram && instagram.value) ||
          (vkontakte && vkontakte.value)
      )
        return true
      return false
    } else if (type === 'videos') {
      if (userVideos && userVideos.length > 0) return true
      return false
    } else if (type === 'artworks') {
      if (userArtworks && userArtworks.length > 0) return true
      return false
    } else if (type === 'likedArtworks') {
      if (userLikedArtworks && userLikedArtworks.length > 0) return true
      return false
    } else if (type === 'albums') {
      if (userAlbums && userAlbums.length > 0) return true
      return false
    } else if (type === 'groups') {
      if (userGroups && userGroups.length > 0) return true
      return false
    } else if (type === 'techniques') {
      if (technique && ((technique.images && technique.images.length > 0) || technique.description)) return true
      return false
    } else if (type === 'expertise') {
      if (expertise && ((expertise.images && expertise.images.length > 0) || expertise.description)) return true
      return false
    } else if (type === 'awards') {
      if (awards && ((awards.images && awards.images.length > 0) || awards.description)) return true
      return false
    } else if (type === 'news') {
      if (news && ((news.images && news.images.length > 0) || news.description)) return true
      return false
    } else if (type === 'faculty') {
      if (faculty && ((faculty.images && faculty.images.length > 0) || faculty.description)) return true
      return false
    } else if (type === 'pastExhibitions') {
      if (
        pastExhibitions &&
          ((pastExhibitions.images && pastExhibitions.images.length > 0) || pastExhibitions.description)
      )
        return true
      return false
    } else if (type === 'publications') {
      if (publications && ((publications.images && publications.images.length > 0) || publications.description))
        return true
      return false
    } else if (type === 'business') {
      if (
        aboutMyBusinessProfession &&
          (aboutMyBusinessProfession.value ||
            (aboutMyBusinessProfession.images && aboutMyBusinessProfession.images.length))
      )
        return true
      return false
    } else if (type === 'personalInfo') {
      if (
        (city && city.value) ||
          (country && country.value) ||
          (languages && languages.value && languages.value.length > 0) ||
          (dob && dob.value) ||
          (gender && gender.value) ||
          (industry && industry.value) ||
          (website && website.value) ||
          (company && company.value)
      )
        return true
      return false
    }
  } else return true
}
export default showSection
  