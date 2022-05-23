import { useCallback, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import getTranslatedContent from '../utilities/getTranslatedContent'

const useTranslateContent = (txt) => {
  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)
  const text = useRef(txt)
  const [translatedText, setTranslate] = useState('')

  const translate = useCallback(
    async (newText) => {
      if (newText) {
        text.current = newText
      }
      try {
        if (appLanguageCode === 'en') setTranslate(text.current)
        else {
          if (newText) {
            // const val = await getTranslatedContent(text.current, appLanguageCode)
            // setTranslate(val)
            return text.current
          }
        }
      } catch (err) {
        setTranslate(text.current)
      }
    },
    [appLanguageCode]
  )

  useEffect(() => {
    translate()
  }, [translate, appLanguageCode])
// console.log(translatedText)
  return [translatedText, translate]
}
export default useTranslateContent
