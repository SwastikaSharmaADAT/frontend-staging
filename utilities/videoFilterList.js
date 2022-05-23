import {capitalize} from 'lodash'

export const convertToLabelValue = (categories) => {
  let resArray = []
  for (let i = 0; i < categories.length; i++) {
    resArray.push({ label: capitalize(categories[i].title), value: categories[i]._id, ...categories[i] })
  }
  return resArray
}
export const userTypeList = [
  { label: 'All', value: '' },
  { label: 'Artist', value: 'artist' },
  { label: 'Gallery', value: 'gallery' },
  { label: 'Member', value: 'member' },
  { label: 'University', value: 'university' },
  { label: 'Museum', value: 'museum' },
  { label: 'Company', value: 'company' },
]

export const showList = [
  { label: 'All', value: '' },
  { label: 'Current', value: 'current' },
  { label: 'Past', value: 'past' },
  { label: 'Future', value: 'future' },
  {label: 'Permanent', value: 'permanent'}
]

export const sortByList = [
  { label: 'Last Login', value: 'last_login' },
  { label: 'Most Connections', value: 'most_connections' },
  { label: 'Most Followers', value: 'most_followers' },
]
