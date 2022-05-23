import axios from 'axios'

// export const convertCurrency = async (val, returnConversionRate, callbackFun, resetOnErr) => {
//   const date = new Date()
//   date.setDate(0)
//   const datesArr = last5DaysDates(date)

//   let result = false
//   let response = ''

//   let i = 0
//   while (!result && i < datesArr.length) {
//     result = await callCurrencyAPI(val, datesArr[i])
//     i++
//     if (result === 'error') {
//       break
//     } else if (result) {
//       response = result
//       break
//     }
//     if (!result && i === datesArr.length) {
//       break
//     }
//   }

//   if (!result || result === 'error') {
//     return resetOnErr()
//   }
//   if (
//     response &&
//     response.data &&
//     response.data.dataSets &&
//     response.data.dataSets[0] &&
//     response.data.dataSets[0].series &&
//     response.data.dataSets[0].series['0:0:0:0:0'] &&
//     response.data.dataSets[0].series['0:0:0:0:0'].observations &&
//     response.data.dataSets[0].series['0:0:0:0:0'].observations[0] &&
//     response.data.dataSets[0].series['0:0:0:0:0'].observations[0][0]
//   ) {
//     let objLength = Object.keys(response.data.dataSets[0].series['0:0:0:0:0'].observations).length - 1
//     returnConversionRate(response.data.dataSets[0].series['0:0:0:0:0'].observations[objLength][0])
//   }
//   callbackFun()
// }

// const callCurrencyAPI = async (val, date) => {
//   try {
//     //create new instance of axios as we donot need Refrest-Token here
//     const axiosInstance = axios.create();
//     const response = await axiosInstance.get(
//       `https://sdw-wsrest.ecb.europa.eu/service/data/EXR/M.${val}.EUR.SP00.A`
//     )
//     if (response) {
      
//       return response
//     }
//   } catch (err) {
//     if (err && err.response && err.response.status === 404) {
//       return false
//     } else {
//       return 'error'
//     }
//   }
// }

export const convertCurrency = async (val, returnConversionRate, callbackFun, resetOnErr) => {
  // const date = new Date()
  // date.setDate(0)
  // const datesArr = last5DaysDates(date)


  let result = false
  //let response = ''
  result = await callNewCurrencyAPI(val)
  if (!result || result === 'error') {
    return resetOnErr()
  }
  if ( result ) {
    returnConversionRate( result.data['EUR_'+val] )
  }
  callbackFun()
}

const callNewCurrencyAPI = async ( val ) => {
  try {
    //create new instance of axios as we donot need Refrest-Token here
    let currency = 'EUR_'+val
    const axiosInstance = axios.create();
    const response = await axiosInstance.get(
      `https://api.currconv.com/api/v7/convert?q=${currency}&compact=ultra&apiKey=9bca487e2e074648a777417a1c7e4fa0`
    )
    if (response) {
      return response
    }
  } catch (err) {
    if (err && err.response && err.response.status === 404) {
      return false
    } else {
      return 'error'
    }
  }
}

const last5DaysDates = (dateStr) => {
  const result = []
  for (let i = 0; i < 6; i++) {
    const date = new Date(dateStr)
    date.setDate(date.getDate() - i)
    result.push(date)
  }
  return result
}
