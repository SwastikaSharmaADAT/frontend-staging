import moment from 'moment'

export const convertDate = (dateStr) => {
  const date = new Date(dateStr)
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()

  if (day < 10) {
    day = '0' + day
  }

  if (month < 10) {
    month = '0' + month
  }

  const finalDate = day + '/' + month + '/' + year
  return finalDate
}

export const getMaxDate = () => {
  const currentDate = new Date()
  currentDate.setFullYear(currentDate.getFullYear() - 16)
  currentDate.setHours(23, 59, 59, 59)
  return currentDate
}

export const dateFromNow = (dateObj) => {
  const currentYear = new Date().getFullYear()
  const actualYear = new Date(dateObj).getFullYear()

  const newDate = moment(dateObj).calendar({
    lastDay: '[Yesterday]',
    sameDay: '[Today]',
    lastWeek: function () {
      if (actualYear === currentYear) {
        return 'MMM D'
      } else {
        return 'MMM D YYYY'
      }
    },
    sameElse: function () {
      if (actualYear === currentYear) {
        return 'MMM D'
      } else {
        return 'MMM D YYYY'
      }
    },
  })
  return newDate
}

/* To convert date object to required format to show activity date on news feed page */
export const getActivityDate = (dateObj) => {
  const currentYear = new Date().getFullYear()
  const actualYear = new Date(dateObj).getFullYear()

  const newDate = moment(dateObj).calendar({
    lastDay: '[Yesterday at] h[:]mm A',
    sameDay: '[Today at] h[:]mm A',
    lastWeek: function () {
      if (actualYear === currentYear) {
        return 'MMM D [at] h[:]mm A'
      } else {
        return 'MMM D YYYY [at] h[:]mm A'
      }
    },
    sameElse: function () {
      if (actualYear === currentYear) {
        return 'MMM D [at] h[:]mm A'
      } else {
        return 'MMM D YYYY [at] h[:]mm A'
      }
    },
  })
  return newDate
}
