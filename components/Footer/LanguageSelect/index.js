import { unwrapResult } from '@reduxjs/toolkit'
import { useTranslation } from 'next-i18next'
import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { default as ReactSelect } from 'react-select'
import { customMultiSelectStyles } from '../../UI/shared/styles'
import { createFlagUrl } from '../../../utilities/imageUtils'
import { getLanguages, setLanguage } from '../../../modules/staticContent/staticContentSlice'
import router from 'next/router'

const LanguageSelect = ({ footer }) => {
  const dropdownIndicatorStyles = (base) => {
    let changes = {
      background: `url(${
        footer ? '/assets/language-select-arrow.png' : '/assets/select_arrow.png'
      }) no-repeat center center`,
      width: '30px',
      color: '#fff',
    }
    return Object.assign(base, changes)
  }

  const customStyles = {
    singleValue: () => ({
      paddingLeft: footer ? '' : '5px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: footer ? '67%' : '85px',
      color: '#fff',
      '@media only screen and (min-width: 992px) and (max-width: 1024px)': {
        paddingLeft: footer ? '100px' : '5px',
      },
      '@media only screen and (max-width: 767px)': {
        paddingLeft: '0px',
      },
    }),
    input: () => ({
      paddingLeft: '60px',
      caretColor: 'transparent',
      margin: '3px 0 0',
    }),
    valueContainer: () => ({
      flexWrap: 'nowrap',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '10px',
      width: '230px',
      position: 'relative',
      zIndex: '0',
      '@media only screen and (max-width: 767px)': {
        paddingLeft: '0px',
        width: '140px',
      },
    }),
    indicatorsContainer: () => ({
      right: '0px',
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }),
    control: () => ({
      justifyContent: 'space-between',
      display: 'flex',
      minHeight: '36px',
      alignItems: 'center',
    }),
    menu: (styles) => ({
      ...styles,
      backgroundColor: 'black',
      cursor: 'pointer',
    }),
    dropdownIndicator: dropdownIndicatorStyles,
    option: (styles, { isFocused, isSelected }) => ({
      ...styles,
      backgroundColor: isSelected ? '#666' : isFocused ? '#222' : 'black',
      ':active': {
        ...styles[':active'],
        backgroundColor: isSelected ? '#666' : '#222',
      },
    }),
  }

  const dispatch = useDispatch()
  const { languagesData, appLanguage } = useSelector((state) => state.root.staticContent)
  const { i18n } = useTranslation()
  const { t } = useTranslation('translation')

  useEffect(() => {
    const langFunc = async () => {
      if (languagesData && languagesData.length === 0) {
        const resultAction = await dispatch(getLanguages({ t }))
        const result = await unwrapResult(resultAction)
        let _id = localStorage.getItem('appLanguage')
        let languageCode = localStorage.getItem('appLanguageCode')
        if (_id && languageCode) {
          await dispatch(setLanguage({ _id, languageCode }))
          // i18n.changeLanguage(languageCode)
        } else {
          const englishObj = result.data.languagesData.find((data) => data.languageCode === 'en')
          await dispatch(
            setLanguage({
              _id: englishObj._id,
              languageCode: englishObj.languageCode,
            })
          )
          // i18n.changeLanguage(englishObj.languageCode)
          router.replace({path:router.pathname,query:router.query},'',{locale:englishObj.languageCode})
        }
      }
    }
    langFunc()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [languagesData])
  /** updated language settings from dropdown */
  const setAppLanguage = async (e) => {
    let lang = languagesData.find((data) => data._id === e.value)
    await dispatch(setLanguage(lang))
    // await i18n.changeLanguage(lang.languageCode)
    router.replace({path:router.pathname,query:router.query},'',{locale:lang.languageCode})
  }

  const options = languagesData.map((o) => ({
    value: o._id,
    label: o.title,
    langCode: o.languageCode,
    flag: o.flagUrl,
  }))

  const formatOptionLabel = ({ label, langCode }) => (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <img
        width={footer ? '20px' : '16px'}
        height={footer ? '15px' : '12px'}
        src={createFlagUrl(langCode)}
        alt={`${langCode} language flag`}
      />
      <div className="LanguageLabel" style={{ marginLeft: '10px' }}>
        {label}
      </div>
    </div>
  )

  return (
    <ReactSelect
      className="CustomBoxSelect my-react-select"
      styles={{ ...customMultiSelectStyles, ...customStyles }}
      name="languages"
      options={options}
      components={{
        IndicatorSeparator: () => null,
      }}
      placeholder=""
      formatOptionLabel={formatOptionLabel}
      value={options ? options.find((item) => item.value === appLanguage) : ''}
      onChange={(val) => setAppLanguage(val)}
      menuPlacement="top"
      isSearchable={false}
      //maxMenuHeight={footer ? 170 : 310}
      maxMenuHeight={500}
    />
  )
}

LanguageSelect.propTypes = {
  footer: PropTypes.bool,
}

export default LanguageSelect
