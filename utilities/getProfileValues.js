import { isEmptyObj } from './checkEmptyObject'
import { checkPageUser } from './otherProfile'
import {languagesData} from './languagesList'

export const getValuesToPrefill = (userData, field) => {
  if (field === 'languages') {
    if (userData) {
      if (!isEmptyObj(userData[field]) && userData[field].value && userData[field].value.length) {
        return userData[field].value
      } else {
        if (userData[field] && Array.isArray(userData[field]) && userData[field].length) {
          return userData[field]
        } else {
          return []
        }
      }
    } else {
      return []
    }
  } else {
    if (userData) {
      if (!isEmptyObj(userData[field]) && userData[field].value) {
        return userData[field].value
      } else {
        if (userData[field] && typeof userData[field] === 'string') {
          return userData[field]
        } else {
          return field === 'dob' ? null : ''
        }
      }
    } else {
      return field === 'dob' ? null : ''
    }
  }
}

export const getVisibilityToPrefill = (userData, field, defaultValue) => {
  if (userData) {
    if (!isEmptyObj(userData[field]) && userData[field].visibility) {
      return userData[field].visibility
    } else {
      return defaultValue
    }
  } else {
    return defaultValue
  }
}

export const mapLangauge=(listOfLanguages)=>{
  let newArr=[]
  languagesData.forEach((item)=>{
    if(listOfLanguages.includes(item.value))
      newArr.push(item.label)
  })
  return newArr
}

export const getValuesToShow = (userData, field, type) => {
  if (field === 'languages') {
    if (!isEmptyObj(userData[field]) && userData[field].value && userData[field].value.length) {
      if (type === 'condition') {
        return true
      } else if (type === 'value') {
        return userData[field].value
      } else if (type === 'length') {
        return userData[field].value.length
      }
    } else {
      if (userData[field] && Array.isArray(userData[field]) && userData[field].length) {
        if (type === 'condition') {
          return true
        } else if (type === 'value') {
          return userData[field]
        } else if (type === 'length') {
          return userData[field].length
        }
      } else {
        if (type === 'condition') {
          return false
        } else if (type === 'value') {
          return []
        }
      }
    }
  } else {
    if (!isEmptyObj(userData[field]) && userData[field].value) {
      if (type === 'condition') {
        return true
      } else if (type === 'value') {
        return userData[field].value
      }
    } else {
      if (userData[field] && typeof userData[field] === 'string') {
        if (type === 'condition') {
          return true
        } else if (type === 'value') {
          return userData[field]
        }
      } else {
        if (type === 'condition') {
          return false
        } else if (type === 'value') {
          return ''
        }
      }
    }
  }
}

const checkValue = (userData, field) =>
  isEmptyObj(userData[field]) || !userData[field].value || (typeof userData[field] === 'string' && !userData[field])

export const checkContactSectionVal = (userData) =>
  checkValue(userData, 'linkedin') &&
  checkValue(userData, 'instagram') &&
  checkValue(userData, 'facebook') &&
  checkValue(userData, 'youtube') &&
  checkValue(userData, 'twitter') &&
  checkValue(userData, 'vkontakte')

export const checkPersonalSectionVal = (userData) =>
  checkValue(userData, 'dob') && checkValue(userData, 'gender') && checkValue(userData, 'maritalStatus')

const checkLangValue = (userData, field) =>
  isEmptyObj(userData[field]) ||
  !userData[field].value ||
  (Array.isArray(userData[field].value) && userData[field].value.length === 0) ||
  (Array.isArray(userData[field]) && userData[field].length === 0)

export const checkPersonalSectionEmpty = (userData) => {
  let value =
    checkValue(userData, 'city') &&
    checkValue(userData, 'country') &&
    checkValue(userData, 'company') &&
    checkValue(userData, 'industry') &&
    checkValue(userData, 'website') &&
    checkLangValue(userData, 'languages')
  if (!checkPageUser(userData.userRole)) {
    value =
      value && checkValue(userData, 'dob') && checkValue(userData, 'gender') && checkValue(userData, 'maritalStatus')
  }

  if (userData.userRole === 'member') {
    return value && checkValue(userData, 'profession')
  } else {
    return value
  }
}

export const checkContactSectionEmpty = (userData) => {
  let value =
    checkValue(userData, 'email') &&
    checkValue(userData, 'skype') &&
    checkValue(userData, 'mobile') &&
    checkContactSectionVal(userData)
  if (userData.userRoleType === 'page') {
    return value && checkValue(userData, 'address') && checkValue(userData, 'openingHours')
  } else {
    return value
  }
}

export const checkVisibility = (userData, field) => {
  if (userData.userIdentity === 'verifiedUser') {
    return true
  } else if (userData.userIdentity === 'authUser' || userData.userIdentity === 'guestUser') {
    let visibility = ''
    if (!isEmptyObj(userData[field]) && userData[field].visibility) {
      visibility = userData[field].visibility
    }
    if (visibility === 'public') {
      return true
    } else if (visibility === 'private') {
      return false
    } else if (visibility === 'connections') {
      if (userData.haveConnection === 'true') {
        return true
      } else {
        return false
      }
    }
  }
}

export const checkContactSectionVisibility = (userData) => {
  let visibility =
    checkVisibility(userData, 'email') ||
    checkVisibility(userData, 'skype') ||
    checkVisibility(userData, 'mobile') ||
    checkVisibility(userData, 'facebook')
  if (userData.userRoleType === 'page') {
    return visibility || checkVisibility(userData, 'address') || checkVisibility(userData, 'openingHours')
  } else {
    return visibility
  }
}

export const checkPersonalSectionVisibility = (userData) => {
  let visibility =
    checkVisibility(userData, 'city') ||
    checkVisibility(userData, 'country') ||
    checkVisibility(userData, 'company') ||
    checkVisibility(userData, 'industry') ||
    checkVisibility(userData, 'website') ||
    checkVisibility(userData, 'languages')
  if (!checkPageUser(userData.userRole)) {
    visibility =
      visibility ||
      checkVisibility(userData, 'dob') ||
      checkVisibility(userData, 'gender') ||
      checkVisibility(userData, 'maritalStatus')
  }
  if (userData.userRole === 'member') {
    return visibility || checkVisibility(userData, 'profession')
  } else {
    return visibility
  }
}
