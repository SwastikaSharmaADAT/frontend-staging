export const sortOptionsList = [
  {
    value: 'random',
    label: 'Random',
  },
  {
    value: 'mostLiked',
    label: 'Most Liked',
  },
  {
    value: 'lowestPriceFirst',
    label: 'Lowest Price First',
  },
  {
    value: 'highestPriceFirst',
    label: 'Highest Price First',
  },
  {
    value: 'latest',
    label: 'Latest',
  },
  {
    value: 'priceOnRequest',
    label: 'Price On Request',
  },
]

export const sortOptions = (t) => sortOptionsList.map((o) => ({ ...o, label: t(`sortOptions:${o.value}`) }))

export const getParamObject = (search) => {
  JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', function (key, value) {
    return key === '' ? value : decodeURIComponent(value)
  })
}

export const renderOwnerName = (obj) => {
  if (obj.firstName) return `${obj.firstName} ${obj.lastName}`
  else return `${obj.username}`
}


export const setSortUsingDay = () => {
  const sortFilter = ['random', 'mostLiked', 'latest']
  let today = new Date()
    let day = today.getDay()
    if ( day === 0 || day === 3 ) {
      return sortFilter[0] 
    } else if ( day === 1 || day === 4 ) {
      return sortFilter[1] 
    } else if ( day === 2 || day === 5 ) {
      return  sortFilter[2]
    } else {
      const randomNumber = Math.floor(Math.random() * 3)
      return sortFilter[randomNumber] 
    }
}

export const removeQueryParamsFromRouter = (router, removeList = []) => {
  if (removeList.length > 0) {
      removeList.forEach((param) => delete router.query[param]);
  } else {
      // Remove all
      Object.keys(object).forEach((param) => delete object[param]);
  }
  router.replace(
      {
          pathname: router.pathname,
          query: router.query
      },
      undefined,
      /**
       * Do not refresh the page
       */
      { shallow: true }
  );
};
