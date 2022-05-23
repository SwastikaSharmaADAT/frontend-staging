import React from 'react'
import Autosuggest from 'react-autosuggest'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const SeriesName = styled.div`
  .react-autosuggest__container {
    padding: 0px;
  }
  input {
    height: 36px;
    width: 100%;
    box-sizing: border-box;
    border: 0;
    padding: 0 15px;
    font-size: 16px;
    font-weight: 400;
    color: #666;
    &.react-autosuggest__input {
      outline: none;
    }
  }
  .react-autosuggest__container {
    position: relative;
  }
  .react-autosuggest__input--focused {
    outline: none;
  }

  .react-autosuggest__input--open {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  .react-autosuggest__suggestions-container {
    display: none;
  }

  .react-autosuggest__suggestions-container--open {
    display: block;
    position: absolute;
    top: 35px;
    width: 100%;
    border: 1px solid #eee;
    background-color: #fff;
    font-size: 14px;
    border-bottom-left-radius: 4px;
    border-bottom-right-radius: 4px;
    z-index: 2;
  }

  .react-autosuggest__suggestions-list {
    margin: 0;
    padding: 0;
    list-style-type: none;
    max-height: 185px;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .react-autosuggest__suggestion {
    cursor: pointer;
    padding: 10px 20px;
  }

  .react-autosuggest__suggestion--highlighted {
    background-color: #ddd;
  }

  .container {
    display: flex;
  }
`

const SeriesAutoSuggest = ({ name, type, placeholder, value, setFieldValue, setSuggest }) => {
  const languages = useSelector((state) => state.root.dashboard.seriesName)
  const renderSuggestion = (languages) => <div>{languages.seriesName}</div>

  const onChangeSuggest = (e, { newValue, method }) => {
    if (method === 'click' || method === 'Enter') {
      setSuggest(false)
      setFieldValue('seriesDetails', newValue)
      return
    }
    setSuggest(true)
    setFieldValue('seriesDetails', newValue)
  }
  const onSuggestionsFetchRequested = () => {}
  const getSuggestionValue = (languages) => languages.seriesName
  const onSuggestionsClearRequested = () => {}
  const inputProps = {
    value,
    name,
    placeholder,
    type,
    onChange: onChangeSuggest,
  }

  return (
    <SeriesName>
      <Autosuggest
        suggestions={languages}
        onSuggestionsFetchRequested={onSuggestionsFetchRequested}
        onSuggestionsClearRequested={onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
    </SeriesName>
  )
}
SeriesAutoSuggest.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  setFieldValue: PropTypes.func,
  setSuggest: PropTypes.func,
}
export default SeriesAutoSuggest
