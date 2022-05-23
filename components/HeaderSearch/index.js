import React, { useState } from 'react'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { BiSearch } from 'react-icons/bi'
import { useTranslation } from 'next-i18next'
import { setEnableUserSearch } from '../../modules/profile/myProfileSlice'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'

const HeaderSearchBar = styled.div`
  display: flex;
  width: 267px;
  height: 35px;
  margin: 0 0 0 21px;
  background: #000;
  &.rtl-ar-content {
    direction: rtl;
  }
  @media (max-width: 991px) {
    width: 170px;
  }
  @media (max-width: 767px) {
    display: none;
  }
`
const SearchIcon = styled.div`
  width: 32px;
  height: 35px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  svg {
    font-size: 22px;
    color: #fff;
    font-weight: bold;
  }
`

const SearchInput = styled.input`
  width: calc(100% - 32px);
  height: 35px;
  color: #fff;
  background: transparent;
  border: 0;
  font-size: 14px;
  font-weight: 400;
  padding: 0;
  ::placeholder {
    color: #fff;
  }
  :focus,
  :hover {
    outline: none;
    border: 0;
  }
`

const HeaderSearch = () => {
  const { t } = useTranslation('header')

  const router = useRouter()
  const dispatch = useDispatch()

  const pathname = router.pathname

  const [text, setText] = useState('')

  const handleTextChange = (e) => {
    setText(e.target.value)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && text && text.length < 21) {
      if (pathname.includes('/users')) {
        dispatch(setEnableUserSearch(true))
      }
      const params = router.query
      params.search = JSON.stringify(text)
      router.push({ pathname: '/users', query: params })
      setText('')
    }
  }

  const appLanguageCode = useSelector((state) => state.root.staticContent.appLanguageCode)

  return (
    <>
      <HeaderSearchBar className={appLanguageCode === 'ar' ? 'rtl-ar-content' : ''}>
        <SearchIcon>
          <BiSearch />
        </SearchIcon>
        <SearchInput
          type="text"
          placeholder={t(`search`)}
          value={text}
          onChange={handleTextChange}
          maxLength="20"
          onKeyDown={handleKeyPress}
        />
      </HeaderSearchBar>
    </>
  )
}

export default HeaderSearch
