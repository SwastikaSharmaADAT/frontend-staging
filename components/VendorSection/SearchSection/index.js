import React from 'react'
import { BiSearch } from 'react-icons/bi'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { useTranslation } from 'next-i18next'
import { SearchRow, HeaderSearchBar, SearchIcon, SearchInput } from '../styled.js'
import { toggleArtworksLoader } from '../../../modules/dashboard/dashboardSlice'

const SearchSection = ({ keyword, setKeyword }) => {
  const { t } = useTranslation('dashboard')

  const dispatch = useDispatch()
  return (
    <>
      <SearchRow>
        <HeaderSearchBar>
          <SearchIcon>
            <BiSearch />
          </SearchIcon>
          <SearchInput
            value={keyword}
            onChange={(e) => {
              if (e.target.value.length > 2 || e.target.value.length === 0) dispatch(toggleArtworksLoader(true))
              setKeyword(e.target.value)
            }}
            placeholder={t(`artworks.placeholderSearch`)}
          />
        </HeaderSearchBar>
      </SearchRow>
    </>
  )
}
SearchSection.propTypes = {
  keyword: PropTypes.string,
  setKeyword: PropTypes.func,
}
export default SearchSection
