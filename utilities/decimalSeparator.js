export const decimalSeparatorMethod = (value, separator) => {
    if (separator === 'comma') {
      let newValue = value
      newValue = newValue.replace(/\./g, ',')
      return newValue
    } else if (separator === 'dot') {
      let newValue = value
      newValue = newValue.replace(/,/g, '.')
      return newValue
    }
  }
  export const numberWithCommas = ( xval ) => { 
    let value = xval.toFixed(0) ;
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') 
  }