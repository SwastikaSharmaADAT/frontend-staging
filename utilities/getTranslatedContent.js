import * as AWS from '@aws-sdk/client-translate'
import { getArtworkOwner, getUserName } from './otherProfile'
import { stringTruncate } from './stringTruncate'
const client = new AWS.Translate({
  region: 'eu-central-1',
  credentials: {
    accessKeyId: process.env.NEXT_PUBLIC_REACT_APP_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_REACT_APP_SECRET_ACCESS_KEY,
  },
})

const getTranslatedContent = async (Text, langCode) => {
  if (!Text) return
  let tryAgain = true
  let retry = 0
  let translatedText = ''
  while (tryAgain && retry < 3) {
    try {
      if (!langCode) return
      translatedText = await client.translateText({
        SourceLanguageCode: 'auto',
        TargetLanguageCode: langCode,
        Text,
      })
      tryAgain = false
      return translatedText.TranslatedText
    } catch (err) {
      if (err.message !== 'Rate exceeded') {
        tryAgain = false
        retry++
      }
    }
  }
}
export default getTranslatedContent

export const getString = (lang,arr, field, type) => {
  if (!arr.length) return
  let response = ''
  let fieldArr = []
  if (field.includes('.')) {
    fieldArr = field.split('.')
  }
  for (let i = 0; i < arr.length; i++) {
    if (type === 'name') {
      response = response.concat(
        `${getUserName(arr[i])} ${i !== arr.length - 1 ? `<span translate="no"></span>;${i}` : ''} `
      )
    } else if (type === 'artwork') {
      response = response.concat(
        `${getArtworkOwner(arr[i])} ${i !== arr.length - 1 ? `<span translate="no"></span>;${i}` : ''} `
      )
    } else {
      if (fieldArr.length)
        response = response.concat(
          `${arr[i][fieldArr[0]] && arr[i][fieldArr[0]][fieldArr[1]]} ${
            i !== arr.length - 1 ? `<span translate="no"></span>;${i}` : ''
          } `
        )
      else
        response = response.concat(`${arr[i][field]} ${i !== arr.length - 1 ? `<span translate="no"></span>;${i}` : ''} `)
    }
  }
  return response
}

export const getArray = (str) => {
  if(str){
  // console.log(str && str.replace(/; +\d+/g,'').split('<span translate="no"><\/span>'))
  str = str.replace(/; +\d+/g,'')
  str = str.replace(/;+\d+/g,'')
  str = str.replace(/；+\d+/g,'')
  str = str.replace(/； +\d+/g,'')
  str = str.replace(/؛+\d+/g,'')
  str = str.replace(/؛ +\d+/g,'')
  return str && str.split('<span translate="no"><\/span>')
  }
  else 
  return ''
}
