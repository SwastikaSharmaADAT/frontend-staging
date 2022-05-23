import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import getTranslatedContent from '../utilities/getTranslatedContent'

const useTranslateArray = () => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const [translatedText, setTranslate] = useState([])

  const translate = useCallback(
    async (newText, key) => {
      let arr1 = []
      if (newText && newText.length > 0) {
        newText.map((item) => arr1.push(Object.assign({}, item)))
      }
      try {
        if (appLanguageCode === 'en') setTranslate(arr1)
        else {
         // let newItem = []
          // for (let i of arr1) {
          //   const field = i
          //   const val = await getTranslatedContent(field[key], appLanguageCode)
          //   const newObject = { ...field }
          //   newObject[key] = val
          //   newItem.push(newObject)
          // }
          // setTranslate(newItem)
          setTranslate(arr1)
        }
      } catch (err) {
        setTranslate(arr1)
      }
    },
    [appLanguageCode]
  )
  useEffect(() => {
    translate()
  }, [translate, appLanguageCode])

  return [translatedText, translate]
}
export default useTranslateArray
